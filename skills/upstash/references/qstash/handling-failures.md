# Handling Failures and Webhooks

Options when a destination fails (failure callback, dead letter queue, retrying early) and how to use QStash as a webhook receiver.

## Signature / Usage

```typescript
import { Client } from "@upstash/qstash";

const client = new Client({ token: "<QSTASH_TOKEN>" });
const res = await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  failureCallback: "https://my-callback...",
});
```

Webhook receiver via publish URL:

```text
https://qstash.upstash.io/v2/publish/https://example.com/api/webhook?qstash_token=<QSTASH_TOKEN>
```

Default headers on a URL Group (for example forward all headers):

```bash
curl -X PATCH https://qstash.upstash.io/v2/topics/<URL_GROUP_NAME> \
    -H "Authorization: Bearer <QSTASH_TOKEN>"
    -d '{
        "headers": {
            "Upstash-Header-Forward": ["true"],
            "Upstash-Retries": "3"
        }
    }'
```

## Options / Props

| Mechanism | Description |
| --- | --- |
| Failure callback | `Upstash-Failure-Callback` header / `failureCallback`; run custom logic (log, alert), then delete the message from the DLQ |
| Dead letter queue | Failed messages move to the DLQ automatically; retry from the console or REST API |
| Retry early | A message waiting out its retry delay can be retried from the console |
| Webhook via publish | Wrap the webhook URL in a publish URL; configure retries, delay and so on with headers or lowercase query parameters (`?upstash-retries=3&upstash-delay=100s`) |
| Webhook via URL Group | Server-side template with default headers; multiple endpoints fan out one webhook call |

## Notes

- Headers prefixed `Upstash-Forward-` are forwarded to the endpoint by default; set `Upstash-Header-Forward: true` (or `?upstash-header-forward=true`) to forward all incoming request headers, since most webhook services cannot prefix headers
- The official page says the failure callback is called "if the message fails to be published"; see callbacks.md for the exact semantics (it fires after all retries are exhausted)
- Source: https://upstash.com/docs/qstash/howto/handling-failures (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/howto/webhook (fetched 2026-11-14; no version pin on the site)

## Related

- [callbacks.md](./callbacks.md)
- [dlq.md](./dlq.md)
- [retry.md](./retry.md)
- [url-groups.md](./url-groups.md)
- [messages.md](./messages.md)
