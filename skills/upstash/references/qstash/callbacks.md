# Callbacks

Receive delivery results at a specified URL. `callback` fires on every delivery attempt result; `failureCallback` fires only after all retries are exhausted.

## Signature / Usage

```ts
await client.publishJSON({
  url: "https://my-api.example.com/handler",
  body: { hello: "world" },
  callback: "https://my-api.example.com/on-delivered",
  failureCallback: "https://my-api.example.com/on-failed",
});
```

## Options / Props

**Publish options:**

| Name | Type | Description |
| --- | --- | --- |
| `callback` | `string` | URL that receives a POST with delivery result on every attempt |
| `failureCallback` | `string` | URL that receives a POST only after all retries are exhausted |

**Callback request body (JSON):**

| Field | Type | Description |
| --- | --- | --- |
| `status` | `number` | HTTP response code returned by destination |
| `body` | `string` | Base64-encoded response body from destination |
| `header` | `Record<string, string[]>` | Response headers from destination |
| `retried` | `number` | Number of retry attempts made |
| `maxRetries` | `number` | Maximum configured retry count |
| `sourceMessageId` | `string` | ID of the original published message |
| `url` | `string` | Destination URL that was called |
| `method` | `string` | HTTP method used |
| `dlqId` | `string` | DLQ message ID (present in `failureCallback` only) |
| `createdAt` | `number` | Unix timestamp when message was created |
| `notBefore` | `number` | Unix timestamp before which delivery was not attempted |
| `topicName` | `string` | URL Group name (if published to a URL Group) |
| `scheduleId` | `string` | Schedule ID (if triggered by a schedule) |
| `callerIP` | `string` | IP address of the original publisher |

## Notes

- Callback endpoints are themselves delivered via QStash and support the same per-callback configuration headers: `Upstash-Callback-Timeout`, `Upstash-Callback-Retries`, `Upstash-Callback-Delay`, `Upstash-Callback-Method`
- Use `Upstash-Callback-Forward-<Header>` to attach custom headers to callback deliveries
- Apply the same prefix pattern for failure callbacks: `Upstash-Failure-Callback-*`
- Decode `body` with `Buffer.from(body, "base64").toString()` or `atob(body)`

## Related

- [publish.md](./publish.md)
- [dlq.md](./dlq.md)
