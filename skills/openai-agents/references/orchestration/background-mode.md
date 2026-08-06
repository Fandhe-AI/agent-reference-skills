# Background Mode

Runs long-running tasks on the Responses API asynchronously so requests are not bound by client-side timeouts; applications poll (or stream) the response object for status until it reaches a terminal state.

## Signature / Usage

```javascript
import OpenAI from "openai";
const client = new OpenAI();

let resp = await client.responses.create({
  model: "gpt-5.6",
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
    model="gpt-5.6",
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

Streaming with resume support:

```javascript
const stream = await client.responses.create({
  model: "gpt-5.6",
  input: "Write a very long novel about otters in space.",
  background: true,
  stream: true,
});

let cursor = null;
for await (const event of stream) {
  cursor = event.sequence_number;
}
// On drop, resume with: client.responses.stream(resp.id, { starting_after: cursor })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `background` | boolean | Set `true` to execute the task asynchronously instead of waiting for completion. |
| `stream` | boolean | Combine with `background: true` to stream events immediately while processing continues. |
| `starting_after` | integer | Cursor (`sequence_number` of the last received event) used to resume an interrupted stream. |
| `status` | string (response field) | `queued` / `in_progress` while running, moving to a terminal state (e.g. completed/failed/cancelled) when done. |

## Notes

- Cancellation via `POST /v1/responses/{id}/cancel` is idempotent — subsequent calls return the final Response object.
- For Zero Data Retention projects, responses are held in temporary disk storage for approximately 10 minutes to enable polling.
- Time to first token from a background response is higher than from a synchronous one.
- SDK-level resume of a dropped background stream (`client.responses.stream(id, { starting_after })`) is noted as forthcoming; manual reconnect via the cursor works in the meantime.

## Related

- [Multi-agent orchestration](./multi-agent.md)
