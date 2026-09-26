// make skill sample (node-pnpm): @make-sample/core
//
// Deliberately dependency-free so `pnpm install` in this sample does not
// need to resolve anything beyond the workspace itself (plus the optional
// devDependency turbo, used only for the turbo:* scripts).

export function sum(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError(`sum expects two finite numbers, got ${JSON.stringify(a)} and ${JSON.stringify(b)}`);
  }
  return a + b;
}

export function formatGreeting(name) {
  const trimmed = String(name ?? "").trim();
  if (trimmed.length === 0) {
    throw new RangeError("formatGreeting requires a non-empty name");
  }
  return `Hello, ${trimmed}!`;
}
