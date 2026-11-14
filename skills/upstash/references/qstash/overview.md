# QStash Overview

Serverless messaging and scheduling solution. Acts as middleware between services—handles durable message delivery, automatic retries, scheduling, and fan-out without managing infrastructure.

## Signature / Usage

```ts
import { Client } from "@upstash/qstash";

const client = new Client({ token: process.env.QSTASH_TOKEN! });
```

```ts
// Without a `token`, the client reads QSTASH_TOKEN and QSTASH_URL from the environment
const client = Client.fromEnv();
```

## Options / Props

**`Client` constructor options:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `token` | `string` | env `QSTASH_TOKEN` | QStash token from Upstash Console; `QSTASH_URL` is read from the environment too |
| `retry` | `{ retries: number; backoff: (n: number) => number } \| false` | 6 attempts w/ exponential backoff | SDK-level retry for API calls |
| `devMode` | `boolean` | `false` | Starts a local QStash dev server automatically; no credentials required |
| `enableTelemetry` | `boolean` | `true` | Sends SDK version, platform, runtime info to Upstash |

## Notes

- Install: `npm install @upstash/qstash`
- Requires a publicly accessible HTTP endpoint to receive messages
- Message payload max size: 1 MB
- Supported payload formats: JSON, XML, binary, plain text
- Get `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, and `QSTASH_NEXT_SIGNING_KEY` from the Upstash Console
- Opt out of telemetry via `UPSTASH_DISABLE_TELEMETRY=1` env var or `enableTelemetry: false`
- `Client.fromEnv()` creates the client from the environment explicitly; without a `token` the constructor falls back to `QSTASH_TOKEN` / `QSTASH_URL`
- `devMode: true` (or `QSTASH_DEV=true`) also works on the receiving side: pass `devMode: true` to `Receiver` or `verifySignature*` to verify with the dev server's keys; see local-development.md
- Source: https://upstash.com/docs/qstash/sdks/ts/gettingstarted (fetched 2026-11-14; no version pin on the site)

### Release notes (checked 2026-11-14)

- `@upstash/qstash` 2.12.1: adds `messages.runNow`, `Client.fromEnv`, dev-mode hints in missing-credential error messages, respects dev mode in the h3 / svelte / solid `verifySignature` helpers; `batchJSON` / `publishJSON` no longer mutate the caller's input
- `@upstash/qstash` 2.12.2: sets fetch `duplex` for stream request bodies; the package bundles docs
- Source: https://github.com/upstash/qstash-js/releases (release notes, checked 2026-11-14)

## Related

- [publish.md](./publish.md)
- [receiver.md](./receiver.md)
- [local-development.md](./local-development.md)
- [changelog.md](./changelog.md)
