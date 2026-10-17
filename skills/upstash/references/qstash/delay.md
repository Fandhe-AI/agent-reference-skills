# Delay

Delay a message before delivery, either relative to publish time (`Upstash-Delay`) or until an absolute time (`Upstash-Not-Before`).

## Signature / Usage

```ts
import { Client } from "@upstash/qstash";

const client = new Client({ token: "<QSTASH_TOKEN>" });

// Relative
await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  delay: 60,
});

// Absolute (unix timestamp in seconds, UTC)
await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  notBefore: 1657104947,
});
```

## Options / Props

| Name | Header | Description |
| --- | --- | --- |
| `delay` | `Upstash-Delay` | Relative delay. Format `<number><unit>`: `10s`, `1m`, `30m`, `2h`, `7d`. TypeScript example passes seconds as a number; Python example passes `"60s"` |
| `notBefore` (`not_before` in Python) | `Upstash-Not-Before` | Absolute time as unix timestamp in seconds, UTC |

## Notes

- Maximum delay: free 7 days; pay-as-you-go 1 year; fixed pricing custom.
- `Upstash-Not-Before` overrides `Upstash-Delay` when both are used together.
- In schedules, a delay is only possible via `Upstash-Delay`. It affects the messages created by the schedule, not the schedule itself (e.g. a `30s` delay: messages are created at trigger time and delivered 30 seconds later).
- Source: https://upstash.com/docs/qstash/features/delay (fetched 2026-10-17; no version pin on the site).

## Related

- [publish.md](./publish.md)
- [schedules.md](./schedules.md)
