# context.call()

Makes an HTTP request as a workflow step. Upstash handles the request on the caller's behalf, allowing responses up to 12 hours without consuming compute resources.

## Signature / Usage

```typescript
const { status, body, headers } = await context.call<ResultType>("fetch-data", {
  url: "https://api.example.com/data",
  method: "POST",
  body: JSON.stringify({ key: "value" }),
  headers: { "Content-Type": "application/json" },
  retries: 3,
  timeout: 30,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stepName` | `string` | Unique step identifier |
| `url` | `string` | Target endpoint URL |
| `method` | `string` | HTTP verb; defaults to `"GET"` |
| `body` | `string` | Request payload as a string |
| `headers` | `Record<string, string>` | Custom request headers |
| `retries` | `number` | Number of retry attempts |
| `retryDelay` | `number \| string` | Delay between retries in ms; supports expressions using `retried` variable |
| `timeout` | `number` | Response wait duration in seconds |
| `flowControl` | `object` | Rate limiting and concurrency controls (key, rate, parallelism, period) |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `status` | `number` | HTTP response status code |
| `body` | `T` | Parsed JSON or raw string response body |
| `headers` | `Record<string, string>` | Response headers |

## Notes

- Returns responses for all status codes including non-2xx; inspect `status` to handle errors
- Cannot reach `localhost` or internal Upstash QStash services without a local tunnel
- Use the generic type parameter `context.call<MyType>(...)` for type-safe response bodies

## Related

- [context](./context.md)
- [flow-control](./flow-control.md)
- [parallel-steps](./parallel-steps.md)
