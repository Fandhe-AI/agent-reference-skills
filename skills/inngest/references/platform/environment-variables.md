# Environment Variables

All environment variables recognized by the Inngest SDK for configuration and authentication.

## Options / Props

| Variable | Description |
|----------|-------------|
| `INNGEST_BASE_URL` | Host for SDK communication with Inngest (include protocol and port, e.g., `http://localhost:8288`). Defaults to Inngest Cloud; set for self-hosted or dev server routing |
| `INNGEST_DEV` | SDK mode: `1` for dev mode (routes to local dev server), `0` for cloud mode, or a URL like `http://localhost:8288`. Explicitly setting either mode changes the communication URLs |
| `INNGEST_ENV` | Target Inngest environment for events and syncs. Auto-detected on Vercel; must be set manually on Netlify, Cloudflare Pages, Railway, and Render |
| `INNGEST_EVENT_KEY` | Authentication key for sending events to Inngest. See [Event Keys](./event-keys.md) |
| `INNGEST_SERVE_ORIGIN` | Origin URL through which Inngest Cloud accesses your app (e.g., `https://my.tunnel.com`). Use when automatic URL inference fails |
| `INNGEST_SERVE_PATH` | URL path for Inngest Cloud access (must start with `/`, e.g., `/api/inngest`) |
| `INNGEST_SIGNING_KEY` | Signing key for secure bidirectional communication. See [Signing Keys](./signing-keys.md) |
| `INNGEST_SIGNING_KEY_FALLBACK` | Fallback signing key for zero-downtime key rotation (requires TypeScript SDK 3.18.0+) |
| `INNGEST_STREAMING` | Enable streaming support (`true`/`false`, default `false`). Helps overcome request timeout limitations on some platforms |

## Notes

- `INNGEST_BASE_URL` is recommended to be left unset in most production deployments; set it only when directing production builds to a local dev server or self-hosted instance
- For branch environment routing, set `INNGEST_ENV` to the branch name using platform-provided variables (e.g., `INNGEST_ENV=$BRANCH` on Netlify)

## Related

- [Signing Keys](./signing-keys.md)
- [Event Keys](./event-keys.md)
- [Dev Server](./dev-server.md)
- [Self-Hosting](./self-hosting.md)
