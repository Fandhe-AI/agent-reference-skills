# Background Mode

Runs long-running tasks on the Responses API asynchronously so requests are not bound by client-side timeouts; applications poll (or stream) the response object for status until it reaches a terminal state.

## Signature / Usage

```javascript
import OpenAI from "openai";
const client = new OpenAI();

let resp = await client.responses.create({
  model: "gpt-6-astra",
  input: "Write a very long novel about otters in space.",
  background: true,
});

while (resp.status === "queued" || resp.status === "in_progress") {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  resp = await client.responses.retrieve(resp.id);
}

console.log("Final status: " + resp.status + "\nOutput:\n" + resp.output_text);
```

```python
from time import sleep
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="gpt-6-astra",
    input="Write a very long novel about otters in space.",
    background=True,
)

while resp.status in {"queued", "in_progress"}:
    sleep(2)
    resp = client.responses.retrieve(resp.id)

print(f"Final status: {resp.status}\nOutput:\n{resp.output_text}")
```

Cancelling:

```bash
curl -X POST https://api.openai.com/v1/responses/resp_123/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

Streaming with resume support — track both the response id and the last `sequence_number` while streaming, then reconnect via the `GET` endpoint if the connection drops:

```typescript
import OpenAI from "openai";
const client = new OpenAI();

const stream = await client.responses.create({
  model: "gpt-6-astra",
  input: "Write a very long novel about otters in space.",
  background: true,
  stream: true,
});

let cursor = null;
let responseId = null;
for await (const event of stream) {
  console.log(event);
  // Keepalives use connection counters, not stored-event resume positions.
  if (String(event.type) !== "keepalive") cursor = event.sequence_number;
  if ("response" in event && event.response?.id) responseId = event.response.id;
}

// If the connection drops, resume streaming from the last stored-event cursor:
// const resumedStream = await client.responses.retrieve(responseId, {
//   stream: true,
//   starting_after: cursor,
// });
// for await (const event of resumedStream) { ... }
```

```bash
curl https://api.openai.com/v1/responses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
  "model": "gpt-6-astra",
  "input": "Write a very long novel about otters in space.",
  "background": true,
  "stream": true
}'

// To resume:
curl "https://api.openai.com/v1/responses/resp_123?stream=true&starting_after=42" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `background` | boolean | Set `true` to execute the task asynchronously instead of waiting for completion. |
| `stream` | boolean | Combine with `background: true` to stream events immediately while processing continues. |
| `starting_after` | integer | Query param on `GET /v1/responses/{id}?stream=true` — cursor (`sequence_number` of the last received event) used to resume an interrupted stream. |
| `status` | string (response field) | `queued` / `in_progress` while running, moving to a terminal state (e.g. completed/failed/cancelled) when done. |

## Notes

- Source: https://developers.openai.com/api/docs/guides/background (fetched 2026-11-14).
- Limits: background requests can use `store=false`, but response data is temporarily stored to support asynchronous execution and polling. To cancel a synchronous (non-background) response, terminate the connection.
- Cancellation via `POST /v1/responses/{id}/cancel` is idempotent — subsequent calls return the final Response object.
- Zero Data Retention (ZDR) projects run background requests with `store=false`; response data is temporarily stored to disk for roughly 10 minutes to enable asynchronous execution and polling.
- Modified Abuse Monitoring (including enhanced): foreground requests follow standard retention when `store` is omitted or `true`. Background responses are retained after the polling period only when `store=true` is explicitly provided; if `store` is omitted or `false`, the response is deleted after roughly 10 minutes.
- Time to first token from a background response is currently higher than from a synchronous one (official docs: being reduced).
- You can only start a new stream from a background response if it was created with `stream=true`.
- Keepalive events use connection counters, not stored-event resume positions: do not update the cursor from events of type `keepalive`.
- Resume helpers differ per SDK in the official snippets: TypeScript `client.responses.retrieve(responseId, { stream: true, starting_after: cursor })`, Python `client.responses.stream(response_id=response_id, starting_after=cursor)`, Go `GetStreaming` with `StartingAfter`, Ruby `client.responses.stream(response_id:, starting_after:)`.
- Official docs inconsistency: the official page's Python streaming snippet assigns `response_id` twice and its Java/C# examples also include polling at 1 s; only the TypeScript/Python/cURL forms are kept here.

## Related

- [Multi-agent orchestration](./multi-agent.md)
