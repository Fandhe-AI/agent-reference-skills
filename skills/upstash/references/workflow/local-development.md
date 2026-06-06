# Local Development

Two approaches to run and test Upstash Workflow without using production QStash credentials: automatic dev server mode and manual local tunnel setup.

## Signature / Usage

```bash
# Option 1 — Automatic dev server (recommended)
# .env.local
QSTASH_DEV=true
# Start your app normally; the SDK auto-downloads and connects to the local QStash server
npm run dev

# Option 2 — Manual local QStash server
npx @upstash/qstash-cli dev
# Copy the output QSTASH_URL, QSTASH_TOKEN, and signing keys to .env.local
```

```typescript
// Avoid hardcoding localhost in workflow trigger URLs
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

await client.trigger({ url: `${BASE_URL}/api/workflow` })
```

## Options / Props

### Automatic dev server (QSTASH_DEV=true)

| Name | Type | Description |
|------|------|-------------|
| `QSTASH_DEV` | `"true"` | Enables automatic local server mode; no tokens or signing keys needed |

### Manual setup environment variables

| Name | Description |
|------|-------------|
| `QSTASH_URL` | Local server URL (typically `http://127.0.0.1:8080`) |
| `QSTASH_TOKEN` | Token output by the CLI |
| `QSTASH_CURRENT_SIGNING_KEY` | Signing key for request verification |
| `QSTASH_NEXT_SIGNING_KEY` | Rotation signing key |

## Notes

- Automatic mode (`QSTASH_DEV=true`): signature verification works end-to-end without extra configuration; runs do not appear in the Upstash Console
- Manual local tunnel: uses production QStash credentials; runs are visible in the Console dashboard
- Local server runs are not billed
- Use `UPSTASH_WORKFLOW_URL` env var to explicitly set the workflow's public URL when using a tunnel

## Related

- [overview](./overview.md)
- [security](./security.md)
