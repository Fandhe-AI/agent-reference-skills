# Environment Variables

Environment variables recognized by the Inngest TypeScript SDK. Most can also be configured programmatically on the Inngest client.

## Signature / Usage

```sh
# .env or hosting platform environment settings
INNGEST_EVENT_KEY=your-event-key
INNGEST_SIGNING_KEY=your-signing-key
INNGEST_BASE_URL=http://localhost:8288  # dev server
```

## Options / Props

| Variable | Description |
|----------|-------------|
| `INNGEST_EVENT_KEY` | Authentication key for sending events to Inngest. Prefer this over the `eventKey` client option. |
| `INNGEST_SIGNING_KEY` | Signing key for secure request verification between the SDK and Inngest. Prefer this over the `signingKey` client option. |
| `INNGEST_SIGNING_KEY_FALLBACK` | Fallback signing key used during key rotation (SDK v3.18.0+). |
| `INNGEST_BASE_URL` | Override the host for SDK communication with Inngest (e.g. `http://localhost:8288`). Useful for local integration testing against the dev server. |
| `INNGEST_DEV` | Set to `1` to enable dev mode (disables signature verification, targets local dev server). Set to `0` to force cloud mode. Also accepts a dev server URL. |
| `INNGEST_ENV` | Designates which Inngest Environment receives and transmits events (Branch Environments). Some platforms auto-detect this. |
| `INNGEST_SERVE_ORIGIN` | Origin used by Inngest Cloud to reach your app (e.g. `https://my.tunnel.com`). Helpful when auto-inference fails (e.g. AWS Lambda). |
| `INNGEST_SERVE_PATH` | URL path for the Inngest handler endpoint (e.g. `/api/inngest`). |
| `INNGEST_STREAMING` | Set to `true` to enable streaming responses. Defaults to `false`. |

## Notes

- All variables can be overridden by the corresponding option in the `new Inngest({ ... })` constructor.
- In **development**, set `INNGEST_DEV=1` to connect to the local dev server at `http://localhost:8288`; no credentials are required.
- In **production**, always set `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` in your hosting platform's environment settings.
- `INNGEST_BASE_URL` is useful for forcing a production build to talk to the dev server during local integration tests.

## Related

- [Inngest Client](./inngest-client.md)
- [serve()](./serve.md)
- [connect()](./connect.md)
