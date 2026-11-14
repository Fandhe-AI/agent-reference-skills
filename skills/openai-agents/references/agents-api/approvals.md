# Automatic review (Agents API)

Automatic review approves or denies supported approval requests as an Agents API agent works, much like the automatic approval function in ChatGPT and Codex. Configure it with the session-level `review` field; the setting applies to root turns and any subagents they create.

## Signature / Usage

Create a session with automatic review (use an existing agent and an environment template that provides Node.js and a project containing `/workspace/package.json`):

```python
from openai import OpenAI

client = OpenAI()
session = client.beta.agents.sessions.create(
    agent_id="agt_123",
    environment={
        "type": "openai_hosted",
        "environment_template_id": "envtmpl_123",
    },
    review="auto_review",
    input="Run npm install in /workspace.",
)
print(session.id)
```

Turn automatic review off between tasks:

```python
updated_session = client.beta.agents.sessions.update("sess_123", review="none")
print(updated_session.id)
```

The same update over HTTP:

```bash
curl --fail-with-body https://api.openai.com/v1/agents/sessions/sess_123 \
  -X POST \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "review": "none"
  }'
```

## Options / Props

| `review` value | Behavior |
|----------------|----------|
| `"auto_review"` | Automatically approve or deny supported requests based on the action's risks and the user's instructions in the conversation |
| `"none"` | Automatic review is not applied; most actions execute directly, subject to the environment's permissions and restrictions |

| API resource | Path | Role |
|--------------|------|------|
| Sessions | `/v1/agents/sessions` | Set the review mode and inspect pending actions |
| Agents | `/v1/agents` | Reuse the instructions and tools for the task |
| Environment templates | `/v1/agents/environments/templates` | Reuse the execution environment's configuration |
| Session events | `/v1/agents/sessions/{session_id}/events` | Follow progress and check how the turn ended |

## Notes

- Omitting `review` defaults to `"none"`. The setting persists when the session resumes. To change it send `"auto_review"` or `"none"`; `null` is not accepted. Setting `"none"` does not send actions to your application for manual approval.
- Requests that can arise: shell commands and terminal input that require approval (permission escalation, potentially dangerous commands); file changes that require approval; additional permission requests (broader filesystem or network access); network access requests that trigger approval, subject to the environment's network restrictions; MCP tool calls whose approval rules require confirmation.
- An OpenAI-managed reviewer model uses the conversation context to assess what the action would do, its risks, and whether it aligns with the user's intent, then approves or denies. Tokens used for review are billed in addition to the agent's model usage.
- Your application still handles browser origin-access and sign-in requests; MCP forms that require input and requests that direct the user to a URL follow their existing flows. No new approval event handlers are required.
- Execution environment: for OpenAI-hosted execution create the session with a new environment, optionally from an environment template; automatic review is not supported when reusing an existing hosted environment through `environment_id`. For self-hosted execution follow the self-hosted environment setup and the sandbox prerequisites for your operating system before enabling it; setting `review` alone does not configure sandboxing.
- Automatic review does not change the environment's outbound network restrictions, and browser origin approval does not override them.
- Availability: your project must have access to automatic review; otherwise the API rejects requests to enable it and identifies `review` as the affected parameter.
- Changing the mode: the main task must be idle and input submission must have settled. The update returns `200 OK` and the updated session; omit `review` from other session updates to leave it unchanged. A change while the main task is active or input has not settled returns `409 Conflict` and none of that request's updates are applied; retry later, and handle `409` even after checking status. Sending the current value is allowed while work is active.
- Retrieve or list sessions to inspect the saved `review` value; if the response omits the field, treat it as `"none"`.
- Source: https://developers.openai.com/api/docs/guides/agents-api/sessions/approvals (fetched 2026-11-14).

## Related

- [Run and Continue Sessions](./sessions.md)
- [Events and Items](./session-events.md)
- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
- [Sandbox Security](./sandbox-security.md)
- [Manage Sessions](./manage-sessions.md)
