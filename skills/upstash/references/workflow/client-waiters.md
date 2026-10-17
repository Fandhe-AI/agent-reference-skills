# client.getWaiters()

Retrieves all waiters currently listening for a given event. A waiter is a workflow run paused at a `context.waitForEvent` step waiting for the specified `eventId`.

## Signature / Usage

```javascript
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<QSTASH_TOKEN>" });

const result = await client.getWaiters({
  eventId: "my-event-id",
});
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | `string` | yes | Identifier of the event to look up |

### Response: Waiter[]

| Name | Type | Description |
|------|------|-------------|
| `url` | `string` | URL to call upon notify |
| `deadline` | `number` | Unix timestamp for when the wait will time out |
| `headers` | `Record<string, string[]>` | Headers sent in case of notify |
| `timeoutUrl` | `string` (optional) | URL to call upon timeout |
| `timeoutBody` | `unknown` (optional) | Body used in the timeout request |
| `timeoutHeaders` | `Record<string, string[]>` (optional) | Headers sent in case of timeout |

## Notes

- Source: fetched 2026-10 from https://upstash.com/docs/workflow/basics/client/waiters

## Related

- [client](./client.md)
- [client-notify](./client-notify.md)
- [context-wait-for-event](./context-wait-for-event.md)
- [wait-for-event](./wait-for-event.md)
