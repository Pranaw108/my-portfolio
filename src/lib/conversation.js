import { useSyncExternalStore } from "react";
import { OPENING, ask } from "./assistant";

/**
 * One conversation shared by the Ask section and the floating dialog, kept for
 * the browser session. sessionStorage can be missing or throw (private mode,
 * blocked storage); then it simply lasts until the page is closed.
 */
const KEY = "assistant-conversation-v1";
const START = [{ from: "bot", ...OPENING }];
const listeners = new Set();
const SERVER_SNAPSHOT = { messages: START, thinking: false };

function load() {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(KEY) ?? "null");
    return Array.isArray(saved) && saved.length ? saved : START;
  } catch {
    return START;
  }
}

// Long enough to read as thinking, short enough not to feel like waiting.
const REPLY_DELAY_MS = 450;

let messages = typeof window === "undefined" ? START : load();
let thinking = false;
let snapshot = { messages, thinking };

function save() {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(messages));
  } catch {
    // Storage unavailable: the conversation still works for this page view.
  }
}

function emit() {
  snapshot = { messages, thinking };
  listeners.forEach((listener) => listener());
}

/**
 * Ask a question. The reply is added by this module, not a component, so it
 * still lands if the dialog that asked is closed mid-reply.
 */
export function sendQuestion(question) {
  const text = question.trim();
  if (!text || thinking) return;
  messages = [...messages, { from: "visitor", text }];
  thinking = true;
  save();
  emit();
  setTimeout(() => {
    messages = [...messages, { from: "bot", ...ask(text) }];
    thinking = false;
    save();
    emit();
  }, REPLY_DELAY_MS);
}

export function resetConversation() {
  if (thinking) return;
  messages = START;
  save();
  emit();
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useConversation() {
  return useSyncExternalStore(subscribe, () => snapshot, () => SERVER_SNAPSHOT);
}
