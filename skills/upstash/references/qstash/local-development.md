# Local Development

Run QStash locally with the QStash CLI dev server (or let the JS SDK start it with `QSTASH_DEV=true`), or expose your local API through a tunnel (localtunnel.me, ngrok).

## Signature / Usage

```bash
# .env — JS SDK downloads and connects to the dev server automatically
QSTASH_DEV=true
```

```typescript
import { Client } from "@upstash/qstash";

const client = new Client({ devMode: true });

await client.publishJSON({
  url: "https://example.com/webhook",
  body: { hello: "world" },
});
```

Manual dev server:

```bash
npx @upstash/qstash-cli dev
npx @upstash/qstash-cli dev -port=8081 -log-port=9000

docker pull public.ecr.aws/upstash/qstash:latest
docker run -p 8080:8080 public.ecr.aws/upstash/qstash:latest qstash dev

./qstash dev   # binary from https://artifacts.upstash.com/#qstash/versions/
```

Next.js edge routes (SDK cannot spawn the server from the edge runtime):

```typescript
// instrumentation.ts
import { registerQStashDev } from "@upstash/qstash/nextjs";

export const register = () => registerQStashDev();
```

## Options / Props

`qstash dev` CLI flags (the only available command of the QStash CLI `@upstash/qstash-cli`; distinct from the `upstash qstash` subcommands of the Upstash CLI):

| Name | Env | Default | Description |
| --- | --- | --- | --- |
| `-port` | `QSTASH_DEV_PORT` | `8080` | Port of the QStash server |
| `-log-port` | `QSTASH_DEV_LOG_PORT` | port + 1 | Port of the log server (used by the Upstash Console and Logs API) |
| `-quota` | `QSTASH_DEV_QUOTA` | `payg` | Quota of users: `payg` or `pro` (simulates subscription-tier limits, no performance effect) |

## Notes

- Supports all QStash features including Schedules, URL Groups, Workflows and Event Logs. Fully in-memory: data resets on restart.
- JS SDK dev mode: downloads the latest `qstash` binary on first use (cached at `~/Library/Caches/upstash/qstash-dev` on macOS, `~/.cache/upstash/qstash-dev` on Linux, `%LOCALAPPDATA%\upstash\qstash-dev` on Windows); spawns on port `8080` (override `QSTASH_DEV_PORT`); skips spawning if already running; overrides the `baseUrl`, `token` and signing keys you provide with the dev server's. Also available as `{ devMode: true }` on `verifySignatureAppRouter`.
- Dev mode is a no-op when `NODE_ENV=production` and in browser/edge runtimes.
- After starting the server, enable local mode in the QStash tab of the Upstash Console to publish and monitor with it.
- Starting the dev server prints predefined test users (`QSTASH_URL`, `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`); copy the credentials from that output. They are not reproduced here.
- License: the dev server is under the Development Server License; development and testing only, not production.
- Local tunnel alternative: `npx localtunnel --port 3000` gives a public URL such as `https://good-months-leave.loca.lt`; if blocked, set the `Upstash-Forward-bypass-tunnel-reminder` header to any value. For ngrok: `ngrok config add-authtoken XXX`, then `ngrok http 3000`, and use the `Forwarding` URL plus your API path as the QStash destination (inspect traffic at `http://127.0.0.1:4040`).
- Source: https://upstash.com/docs/qstash/howto/local-development (fetched 2026-10-17; no version pin on the site).

## Related

- [publish.md](./publish.md)
- [receiver.md](./receiver.md)
- [overview.md](./overview.md)
