# QStash Overview

Serverless messaging and scheduling solution. Acts as middleware between services—handles durable message delivery, automatic retries, scheduling, and fan-out without managing infrastructure.

## Signature / Usage

```ts
import { Client } from "@upstash/qstash";

const client = new Client({ token: process.env.QSTASH_TOKEN! });
```

## Options / Props

**`Client` constructor options:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `token` | `string` | — | QStash token from Upstash Console |
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

## Related

- [publish.md](./publish.md)
- [receiver.md](./receiver.md)
