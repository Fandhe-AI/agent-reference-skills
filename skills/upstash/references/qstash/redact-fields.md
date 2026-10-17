# Redact Fields

Redact message body and headers so they appear as `REDACTED:<SHA256>` in the Upstash Console and API responses, while the original values are still delivered to your endpoint.

## Signature / Usage

```ts
import { Client } from "@upstash/qstash";

const client = new Client({ token: "<QSTASH_TOKEN>" });

const res = await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  redact: {
    body: true,
    header: ["Authorization"], // or `header: true` to redact all headers
  },
});
```

cURL: `-H "Upstash-Redact-Fields: body, header[Authorization]"`. Schedules accept the same option:

```ts
await client.schedule.create({
  name: "my-schedule",
  cron: "0 * * * *",
  url: "https://my-api...",
  body: { hello: "world" },
  redact: { body: true, header: ["Authorization"] },
});
```

## Options / Props

| Option | Description |
| --- | --- |
| body | Redact the body of the message |
| headers | Redact the headers of the message |
| headers[header_name] | Redact a specific header (e.g. `headers[Authorization]`) |

## Notes

- Redaction is one-way; the original cannot be retrieved from the API or dashboard. The SHA256 hash lets you compare values without revealing them.
- Configured per message. For schedules, all messages produced by the schedule are redacted, and schedule get/list endpoints apply redaction too.
- A message moved to the DLQ stays redacted there, but retrying a DLQ message delivers the original values to your endpoint.
- Updating a redacted schedule via dashboard or API requires providing the original values; otherwise the fields are saved as the literal `REDACTED:<SHA256>`.
- The TypeScript and Python examples on the official page use `header` (singular) in the `redact` object, while the cURL header and options table use `header[...]` / `headers`; follow the SDK form shown in the snippet.
- Source: https://upstash.com/docs/qstash/howto/redact-fields (fetched 2026-10-17; no version pin on the site).

## Related

- [publish.md](./publish.md)
- [schedules.md](./schedules.md)
- [dlq.md](./dlq.md)
