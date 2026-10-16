# Session Webhooks

Webhooks respond to session state changes without keeping an event stream open. A handler can start or reconnect sandbox compute, update your application, or trigger a workflow.

## Signature / Usage

```python
import json
import os

import uvicorn
from fastapi import FastAPI, Request, Response
from openai import AsyncOpenAI, InvalidWebhookSignatureError

app = FastAPI()
webhooks = AsyncOpenAI(webhook_secret=os.environ["OPENAI_WEBHOOK_SECRET"])


@app.post("/webhooks/openai")
async def handle_webhook(request: Request):
    payload = await request.body()
    try:
        webhooks.webhooks.verify_signature(payload=payload, headers=request.headers)
    except (InvalidWebhookSignatureError, ValueError):
        return Response("Invalid signature", status_code=400)

    event = json.loads(payload)
    if event["type"] == "agent.session.idle":
        session_id = event["data"]["id"]
        session = await webhooks.beta.agents.sessions.retrieve(session_id, timeout=10)
        print("session idle event:", session.id)
    else:
        print("session event:", event["type"], event["data"]["id"])
    return Response(status_code=200)


if __name__ == "__main__":
    uvicorn.run(app, port=int(os.environ.get("PORT", "8000")))
```

Start the executor for a self-hosted session from `agent.session.created`:

```bash
CODEX_API_KEY="$OPENAI_ENVIRONMENT_KEY" \
codex exec-server \
  --remote "$REMOTE_URL" \
  --environment-id "$ENVIRONMENT_ID"
```

## Options / Props

| Event | When it fires |
|-------|---------------|
| `agent.session.created` | A session is created |
| `agent.session.action_required` | The session needs a function result, environment connection, or computer-use approval |
| `agent.session.in_progress` | The session starts processing a turn |
| `agent.session.idle` | The session is idle and ready for more input |
| `agent.session.failed` | The session enters a failed state |

## Notes

- Setup: follow the shared webhook setup guide to create an endpoint and select Agents API events; store the signing secret for signature verification. OpenAI sends a signed HTTP POST per subscribed event (payload: `id`, `object: "event"`, `created_at`, `type`, `data`).
- `agent.session.action_required` includes the session ID and `required_action.type` of `function_call`, `environment_connection`, or `computer_use_approval_request`. The webhook omits call IDs, arguments, environment IDs, and approval details; retrieve the session and inspect `required_actions`.
- For self-hosted sessions, `agent.session.created` carries `data.environment_id` and `data.connect.remote_url` (same URL as `environment.remote_url` on the session); save and reuse both on reconnect. Use an environment key as `CODEX_API_KEY`; keep your application API key outside the environment.
- Retrieve the session's current state before provisioning a sandbox. In production, queue slower work.
- Environment connection events: when input needs a disconnected self-hosted executor, an `environment_connection` required action is added and `agent.session.action_required` is emitted before waiting. That webhook does not include `connect.remote_url`; start the executor with `session.environment.id` and `session.environment.remote_url`. The API waits up to five minutes (configure client and proxy timeouts). If the wait expires the submission fails; initial input can fail asynchronously leaving the session `failed`. There is no durable input queue.
- `agent.session.idle` means ready for more input, not that the last turn succeeded; check turn status or stream events. `agent.session.failed` reports a failed session, not every failed turn. Session deletion has no webhook and does not stop provider compute.
- Source: https://developers.openai.com/api/docs/guides/agents-api/sessions/webhooks (fetched 2026-10).

## Related

- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Events and Items](./session-events.md)
- [Computer Use (Agents API)](./computer-use.md)
