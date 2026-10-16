# Deduplication

Prevent duplicate messages from being enqueued, using an explicit ID or an automatic content-based ID.

## Signature / Usage

```ts
import { Client } from "@upstash/qstash";

const client = new Client({ token: "<QSTASH_TOKEN>" });
const res = await client.publishJSON({
  url: "https://my-api...",
  body: { hello: "world" },
  deduplicationId: "abcdef",
});
```

## Options / Props

| Name | Header | Description |
| --- | --- | --- |
| `deduplicationId` (`deduplication_id` in Python) | `Upstash-Deduplication-Id` | Explicit deduplication ID |
| `contentBasedDeduplication` (`content_based_deduplication` in Python) | `Upstash-Content-Based-Deduplication` | `true` to derive the ID automatically |

Content-based deduplication ID is derived from: destination (URL Group or endpoint), body, and headers (`Content-Type` and all headers forwarded with the `Upstash-Forward-` prefix).

## Notes

- A duplicate is accepted by QStash but not enqueued. The response returns the messageID of the existing message with HTTP `202 Accepted`.
- Useful when the connection fails and the acknowledgement is lost: re-publishing is safe.
- The deduplication window is 10 minutes. After that, messages with the same ID or content can be sent again.

## Related

- [publish.md](./publish.md)
- [queues.md](./queues.md)
