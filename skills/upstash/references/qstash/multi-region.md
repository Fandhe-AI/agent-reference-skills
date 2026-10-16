# Multi-Region

QStash runs in two independent regions (EU and US). The SDK supports single-region mode (default) and a migration mode that handles both regions.

## Signature / Usage

```bash
# Migration mode configuration with US as primary
QSTASH_REGION="US_EAST_1"

US_EAST_1_QSTASH_URL="https://qstash-us-east-1.upstash.io"
US_EAST_1_QSTASH_TOKEN="your_us_token"
US_EAST_1_QSTASH_CURRENT_SIGNING_KEY="your_us_current_key"
US_EAST_1_QSTASH_NEXT_SIGNING_KEY="your_us_next_key"

EU_CENTRAL_1_QSTASH_URL="https://qstash-eu-central-1.upstash.io"
EU_CENTRAL_1_QSTASH_TOKEN="your_eu_token"
EU_CENTRAL_1_QSTASH_CURRENT_SIGNING_KEY="your_eu_current_key"
EU_CENTRAL_1_QSTASH_NEXT_SIGNING_KEY="your_eu_next_key"
```

```typescript
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver();

await receiver.verify({
  signature: request.headers.get("upstash-signature")!,
  body: await request.text(),
  // Pass the region header for multi-region support
  upstashRegion: request.headers.get("upstash-region") ?? undefined,
});
```

## Options / Props

| Region | URL |
| --- | --- |
| EU | `https://qstash-eu-central-1.upstash.io` or `https://qstash.upstash.io` |
| US | `https://qstash-us-east-1.upstash.io` |

| Mode | Condition | Behavior |
| --- | --- | --- |
| Single-region (default) | `QSTASH_REGION` not set | Uses `QSTASH_TOKEN` / `QSTASH_URL` (defaults to EU); outgoing messages go through that region; incoming verified with default signing keys |
| Migration | `QSTASH_REGION` = `US_EAST_1` or `EU_CENTRAL_1` | Uses region-prefixed credentials; detects the region of incoming requests; receives from both regions |

## Notes

- Each region is independent: separate infrastructure, pricing, resources, logs, tokens and signing keys. Messages, queues, schedules, URL groups and DLQ are region-specific.
- `QSTASH_URL` is optional; SDKs default to EU. For US set `QSTASH_URL` plus that region's `QSTASH_TOKEN` and signing keys (copy from Quickstart in the QStash Console).
- No active resources: just change the env vars. With active resources: use the **Migrate** button in the QStash tab of the Upstash Console (guided). It copies schedules, URL groups and queues; message logs and DLQ stay in the old region. A message published in one region is still delivered from that region after migration.
- QStash sends an `upstash-region` header (e.g. `US-EAST-1`) with every request; pass it to `verify` when `QSTASH_REGION` is set. Platform verifiers such as `verifySignatureAppRouter` handle it automatically.
- Migration mode requires `@upstash/qstash` >= 2.9.0 and reads `process.env`, so it does not work where `process.env` is unavailable (e.g. Cloudflare Workers).

## Related

- [receiver.md](./receiver.md)
- [overview.md](./overview.md)
