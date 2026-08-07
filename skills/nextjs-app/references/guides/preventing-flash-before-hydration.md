# Preventing Flash Before Hydration

Use a synchronous inline `<script>` (via `dangerouslySetInnerHTML`) that runs during HTML parsing to correct server-rendered content — dates, themes, persisted UI state — before the browser's first paint, avoiding hydration errors and visible flashes.

## Signature / Usage

```tsx filename="app/events/page.tsx"
<p id="event-date" suppressHydrationWarning>
  {new Date(event.date).toLocaleDateString()}
</p>
<script
  dangerouslySetInnerHTML={{
    __html: `document.getElementById("event-date").textContent=new Date("${event.date}").toLocaleDateString()`,
  }}
/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `suppressHydrationWarning` | boolean prop | Tells React to keep the DOM value (set by the inline script) instead of the server-rendered payload for that element |
| `dangerouslySetInnerHTML` on `<script>` | prop | Injects an inline script the browser executes synchronously while parsing, before first paint |

## Notes

- Without `suppressHydrationWarning`, React treats a mismatch as a hydration error and client-renders from the nearest error/Suspense boundary, discarding other inline-script corrections within that boundary.
- Reusable component pattern uses `useId()` for stable per-instance IDs, and toggles `type="text/javascript"` (server) vs `type="text/plain"` (client, ignored) so soft navigations format directly in the browser instead.
- Theme preference: read `localStorage` (or a cookie, for SSR-visible values) in a `<script>` inside `<head>` and set a `data-theme` attribute on `<html>` before paint; reading a cookie via `cookies()` in the root layout opts the whole app out of static prerendering.
- Sync React state (e.g. an accordion's open section) with a **lazy `useState` initializer** reading the same source (`localStorage`) as the inline script so initial state matches the DOM.
- In development, React Strict Mode's remount resets `<html>`/`<head>`/`<body>` to only JSX-managed attributes, clearing what the script set — re-apply in a `useLayoutEffect` (no-op in production).
- Inline scripts with `dangerouslySetInnerHTML` are blocked by strict CSPs without `'unsafe-inline'`; use a nonce.
- Use `headers()`/`cookies()` server-side instead when the date depends on request data, or `useEffect` + `suppressHydrationWarning` for live-updating clocks/timers.

## Related

- [Public Static Pages](./public-static-pages.md)
- [Internationalization](./internationalization.md)
