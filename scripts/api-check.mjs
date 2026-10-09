// Smoke test for api/inquiry.js — the enquiry form's backend.
//
// Checks the guards WITHOUT sending real email: wrong method, missing config,
// and every validation rule. Each case also proves the handler can reject, so a
// passing run means the guards actually fire rather than never being reached.
//
// Run: npm run check:api

import handler from "../api/inquiry.js";

/** Minimal stand-in for Vercel's response object. */
function mockResponse() {
  const res = {
    statusCode: null,
    body: null,
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

const validBody = {
  name: "Jane Sharma",
  email: "jane@company.com",
  service: "data-pipelines",
  timeline: "1–3 months",
  message: "We have two years of order history in Postgres and no idea which customers are about to churn.",
  secondsOnForm: 40,
};

async function call(body, method = "POST") {
  const res = mockResponse();
  await handler({ method, body }, res);
  return res;
}

const cases = [
  ["GET is rejected", () => call(validBody, "GET"), 405],
  ["missing config is reported, not faked", () => call(validBody), 503],
  ["empty name rejected", () => call({ ...validBody, name: "" }), 400],
  ["bad email rejected", () => call({ ...validBody, email: "not-an-email" }), 400],
  ["unknown service rejected", () => call({ ...validBody, service: "crypto-mining" }), 400],
  ["short message rejected", () => call({ ...validBody, message: "hi" }), 400],
  ["over-long message rejected", () => call({ ...validBody, message: "x".repeat(5001) }), 400],
  ["instant submit rejected as a bot", () => call({ ...validBody, secondsOnForm: 0.2 }), 400],
  ["unparsable body rejected", () => call("{not json", "POST"), 400],
];

// Validation must run BEFORE the config check, otherwise a misconfigured
// deployment would hide every validation bug behind a 503.
process.env.RESEND_API_KEY = "";
process.env.INQUIRY_TO = "";

let failed = 0;
for (const [name, run, expected] of cases) {
  // Validation cases need config present so they are not short-circuited by the 503.
  const needsConfig = expected === 400;
  if (needsConfig) {
    process.env.RESEND_API_KEY = "test-key-not-used";
    process.env.INQUIRY_TO = "test@example.com";
  } else {
    process.env.RESEND_API_KEY = "";
    process.env.INQUIRY_TO = "";
  }

  const res = await run();
  const ok = res.statusCode === expected;
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name} — expected ${expected}, got ${res.statusCode}`);
  if (!ok) console.log(`        body: ${JSON.stringify(res.body)}`);
  // A rejection must never look like a success to the browser.
  if (res.statusCode >= 400 && res.body?.ok) {
    failed++;
    console.log("FAIL  rejection returned ok:true");
  }
}

console.log(`\n${cases.length - failed} / ${cases.length} passed`);
process.exitCode = failed ? 1 : 0;
