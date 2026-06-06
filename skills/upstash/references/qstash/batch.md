# batchJSON

Publish multiple messages in a single API call. Each message is independent—if one fails, others still process.

## Signature / Usage

```ts
const res = await client.batchJSON([
  { url: "https://example.com/worker1", body: { task: "a" } },
  { url: "https://example.com/worker2", body: { task: "b" } },
  { urlGroup: "my-group", body: { broadcast: true } },
]);
```

## Options / Props

Each element of the array accepts the same options as `publishJSON`:

| Name | Type | Description |
| --- | --- | --- |
| `url` | `string` | Destination URL (mutually exclusive with `urlGroup`) |
| `urlGroup` | `string` | URL Group name for fan-out delivery |
| `body` | `unknown` | Message payload (serialized to JSON) |
| `headers` | `Record<string, string>` | Per-message custom headers |
| `delay` | `number \| string` | Per-message delivery delay |
| `callback` | `string` | Per-message success/failure callback URL |
| `failureCallback` | `string` | Per-message failure-only callback URL |

## Notes

- Returns an array of responses, one per message in input order
- URL Group entries expand to an array of responses (one per subscribed endpoint)
- Can mix URLs, URL Groups, and queue targets in one batch request

## Related

- [publish.md](./publish.md)
- [url-groups.md](./url-groups.md)
- [queues.md](./queues.md)
