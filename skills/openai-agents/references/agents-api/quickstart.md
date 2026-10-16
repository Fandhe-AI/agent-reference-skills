# Agents API Quickstart

Build a coding assistant that writes `tree.py`, runs it, and shows a directory tree. OpenAI manages the agent, its conversation, and the sandbox.

## Signature / Usage

```bash
export OPENAI_API_KEY="your-api-key"
pip install --upgrade openai
```

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

Delete the session when finished:

```bash
curl -X DELETE "https://api.openai.com/v1/agents/sessions/sess_123" \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Notes

- Prerequisites: an application API key granting `api.agents.read` and `api.agents.write` (session operations) plus `api.responses.write` (model inference). Keep the key outside the agent's sandbox.
- Requests require the `OpenAI-Beta: agents=v1` header. The OpenAI SDKs add it automatically; include it explicitly with cURL.
- SDK examples use the `beta.agents` namespace (Python, JavaScript, Go, Java, Ruby, cURL are shown in the source; JavaScript uses `stream: true`, `events.withResultCollection()`, `events.finalResult()`).
- No sandbox needed: set `environment.type` to `none`.
- Following progress: look for `agent.session.turn.completed`, then check the reported execution result. A completed turn does not guarantee every tool succeeded. Events ending in `turn.failed`, `turn.cancelled`, or `session.failed` indicate failure or cancellation; `agent.session.idle` alone does not mean success. If the stream disconnects early, retrieve the session and its saved items before retrying.
- Continue: save the `session_id`, open the event stream before sending follow-up input so early events are not missed.
- Clean up: keep the session for more tasks or delete it; save needed files first.
- Source: https://developers.openai.com/api/docs/guides/agents-api/quickstart (fetched 2026-10).

## Related

- [Agents API](./overview.md)
- [Run and Continue Sessions](./sessions.md)
- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
- [Files and Artifacts](./files-and-artifacts.md)
