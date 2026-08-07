# Logs

Retrieve request/message delivery logs for debugging—message lifecycle state, delivery attempts, and response details.

## Signature / Usage

```ts
import { Client } from "@upstash/qstash";

const client = new Client({ token: process.env.QSTASH_TOKEN! });

// Paginate through all logs
const logs = [];
let cursor: string | undefined;
while (true) {
  const res = await client.logs({ cursor });
  logs.push(...res.logs);
  cursor = res.cursor;
  if (!cursor) break;
}

// Filter by state and limit count
const res = await client.logs({ filter: { state: "DELIVERED", count: 50 } });
```

```
GET https://qstash.upstash.io/v2/logs
Authorization: Bearer <QSTASH_TOKEN>
```

## Options / Props

**`client.logs()` params:**

| Name | Type | Description |
| --- | --- | --- |
| `cursor` | `string` | Pagination cursor for the next page |
| `count` | `number` | Number of entries to return (default 100, max 100) |
| `filter.state` | `"CREATED" \| "ACTIVE" \| "RETRY" \| "ERROR" \| "IN_PROGRESS" \| "DELIVERED" \| "CANCEL_REQUESTED" \| "CANCELLED"` | Filter by message state |
| `filter.messageId` | `string` | Filter by a specific message ID |
| `filter.url` | `string` | Filter by destination URL |
| `filter.topicName` | `string` | Filter by URL Group name |
| `filter.scheduleId` | `string` | Filter by schedule ID |
| `filter.queueName` | `string` | Filter by queue name |
| `filter.fromDate` / `filter.toDate` | `number` (ms, Unix timestamp) | Inclusive date range filter |
| `filter.label` | `string[]` | Filter by labels (multi-value OR logic) |
| `messageIds` | `string[]` | Retrieve logs for specific message IDs |

**Response `logs[]` entry fields (partial):** `time`, `messageId`, `state`, `url`, `header`, `body` (base64), `responseStatus`, `responseBody` (base64), `responseHeaders`, `error`, `nextDeliveryTime`, `topicName`, `endpointName`, `scheduleId`, `queueName`, `timeout`, `method`, `callback`, `failureCallback`, `maxRetries`, `retryDelayExpression`, `labels`

## Notes

- Message lifecycle states: `ACTIVE` (ready for execution) → `DELIVERED` (HTTP 200–299) or `RETRY` (failed, retries remaining) → `FAILED`/`ERROR` (retries exhausted, moved to DLQ); `CANCEL_REQUESTED` then `CANCELLED` on user cancellation
- Older logs are removed automatically; retention window depends on the pricing plan
- Logs are also viewable in the Upstash Console under the "Logs" tab
- REST equivalent: `GET /v2/logs` on `https://qstash-{region}.upstash.io`, authenticated via bearer token or `qstash_token` query parameter

## Related

- [messages.md](./messages.md)
- [dlq.md](./dlq.md)
- [publish.md](./publish.md)
