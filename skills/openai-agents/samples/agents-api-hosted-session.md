# Agents API Hosted Session

Run a task in an OpenAI-managed session (create and submit the task, follow progress, continue, delete) with `client.beta.agents.sessions`.

Step 1: create the session, submit the task, and stream progress (Python).

```python
from openai import OpenAI

with OpenAI() as client:
    with client.beta.agents.sessions.create(
        agent={
            "model": "gpt-6-astra",
            "instructions": "Write clean code, run it, and report the actual output.",
        },
        environment={"type": "openai_hosted"},
        input="Create tree.py, a Python script that prints a readable tree of the files in the current directory. Run it and show me the output.",
        stream=True,
    ).with_result_collection() as stream:
        for event in stream:
            print(event.to_json(indent=None), flush=True)
        result = stream.get_final_result()
    print(result.output_text)
    session_id = result.session_id
```

Step 1 (JavaScript):

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const events = await client.beta.agents.sessions.create({
  agent: {
    model: "gpt-6-astra",
    instructions: "Write clean code, run it, and report the actual output.",
  },
  environment: { type: "openai_hosted" },
  input:
    "Create tree.py, a Python script that prints a readable tree of the files in the current directory. Run it and show me the output.",
  stream: true,
});
events.withResultCollection();
try {
  for await (const event of events) {
    console.log(JSON.stringify(event));
  }
  const result = await events.finalResult();
  console.log(result.output_text);
  console.log("Session:", result.session_id);
} finally {
  events.controller.abort();
}
```

Step 2: follow progress of an existing session with `sessions.events.stream` (Python).

```python
# Pass your saved session ID to this helper.
def stream_session(client: OpenAI, session_id: str, handle_event):
    with client.beta.agents.sessions.events.stream(session_id) as events:
        for event in events:
            handle_event(event)
            match event.type:
                case "agent.session.idle":
                    continue
                case "error":
                    raise RuntimeError(event.error.message)
                case "agent.session.failed" | "agent.session.environment.failed":
                    raise RuntimeError(f"Agent lifecycle failure: {event.type}")
                case "agent.session.turn.failed":
                    if event.turn.subagent_id is None:
                        detail = event.turn.error.message if event.turn.error else ""
                        raise RuntimeError(f"{event.type}: {detail}")
                case "agent.session.turn.cancelled":
                    if event.turn.subagent_id is None:
                        raise RuntimeError("The agent turn was cancelled")
                case "agent.session.turn.completed":
                    if event.turn.subagent_id is None:
                        return
    raise RuntimeError("Stream closed before a turn ended. Retrieve the saved state.")
```

Step 3: continue the session with `sessions.events.create` (Python).

```python
def send_message(
    client: OpenAI, session_id: str, text: str, submission_key: str
) -> None:
    client.beta.agents.sessions.events.create(
        session_id,
        idempotency_key=submission_key,
        events=[
            {
                "type": "agent.session.input.message",
                "input": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "input_text",
                                "text": text,
                            }
                        ],
                    }
                ],
            }
        ],
    )
```

Step 4: delete the session when done (Python). Replace `sess_123` with the saved session ID.

```python
from openai import OpenAI


def delete_session(client: OpenAI, session_id: str):
    return client.beta.agents.sessions.delete(session_id)


if __name__ == "__main__":
    result = delete_session(OpenAI(), "sess_123")
    print(result.to_json())
```

## Notes

- Beta: requests need the `OpenAI-Beta: agents=v1` header. The OpenAI SDKs add it automatically; include it explicitly with cURL.
- The API key needs `api.agents.read` and `api.agents.write` for session operations, plus `api.responses.write` for model inference. Keep the key outside the agent's sandbox.
- `agent.session.turn.completed` does not guarantee every tool succeeded, and `agent.session.idle` alone does not mean success. Subscribe to the event stream before sending follow-up input to avoid missing early events.
- Save any files you need before deleting the session. `environment.type: "none"` skips the sandbox. Step 2 (stream helper) is from the sessions events guide and step 3 (follow-up message) from the sessions guide; the quickstart itself links to them.
- Source: https://developers.openai.com/api/docs/guides/agents-api/quickstart, https://developers.openai.com/api/docs/guides/agents-api/sessions/events, https://developers.openai.com/api/docs/guides/agents-api/sessions (fetched 2026-10).
