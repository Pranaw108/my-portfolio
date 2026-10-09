// Vercel serverless function that emails a project enquiry.
//
// Needs two environment variables set in the Vercel dashboard:
//   RESEND_API_KEY  - from resend.com (free tier covers this comfortably)
//   INQUIRY_TO      - the address enquiries are forwarded to
//
// Without them the function returns a clear error so the form can fall back to
// a prefilled mailto. It never reports success for an email it did not send.

const MIN_FILL_SECONDS = 3;
const MAX_MESSAGE_LENGTH = 5000;

// Resend's sandbox sender works without verifying a domain.
const FROM_ADDRESS = process.env.INQUIRY_FROM || "Portfolio <onboarding@resend.dev>";

const SERVICE_LABELS = {
  recommendations: "Recommendation & personalization",
  "data-pipelines": "Data pipelines & analysis",
  dashboards: "Dashboards & reporting",
  "ml-apis": "ML-backed APIs & app features",
  other: "Something else",
};

/** Re-check everything the browser checked. Client-side validation is a convenience, not a guard. */
function validate(body) {
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const service = String(body.service || "").trim();
  const timeline = String(body.timeline || "").trim();
  const message = String(body.message || "").trim();

  if (name.length < 2) return { error: "Please include your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please include a valid email address." };
  if (!SERVICE_LABELS[service]) return { error: "Please choose what you need." };
  if (message.length < 20) return { error: "Please describe the project in a sentence or two." };
  if (message.length > MAX_MESSAGE_LENGTH) return { error: "That message is too long to send." };
  if (Number(body.secondsOnForm) < MIN_FILL_SECONDS) return { error: "That submission looked automated." };

  return { data: { name, email, service, timeline, message } };
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => {
    const replacements = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return replacements[char];
  });
}

function buildEmail({ name, email, service, timeline, message }) {
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Needs", SERVICE_LABELS[service]],
    ["Timeline", timeline || "No preference"],
  ];
  const html = `
    <h2 style="font-family:system-ui,sans-serif">New project enquiry</h2>
    <table style="font-family:system-ui,sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:system-ui,sans-serif;margin-top:24px">About the project</h3>
    <p style="font-family:system-ui,sans-serif;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
  `;
  const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", message].join("\n");
  return { html, text };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO;
  if (!apiKey || !to) {
    // Logged for the owner; the visitor just sees that it didn't send.
    console.error("inquiry: RESEND_API_KEY or INQUIRY_TO is not set");
    return response.status(503).json({ error: "The form isn't connected yet. Please email me directly." });
  }

  // Vercel parses JSON bodies already, but be tolerant of a raw string.
  let body = request.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ error: "Could not read that submission." });
    }
  }

  const { error, data } = validate(body || {});
  if (error) return response.status(400).json({ error });

  const { html, text } = buildEmail(data);

  try {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [to],
        reply_to: data.email,
        subject: `Project enquiry — ${SERVICE_LABELS[data.service]} — ${data.name}`,
        html,
        text,
      }),
    });

    if (!sent.ok) {
      const detail = await sent.text();
      console.error("inquiry: Resend rejected the send", sent.status, detail);
      return response.status(502).json({ error: "Your message didn't send. Please email me directly." });
    }

    return response.status(200).json({ ok: true });
  } catch (cause) {
    console.error("inquiry: send failed", cause);
    return response.status(502).json({ error: "Your message didn't send. Please email me directly." });
  }
}
