# Computer Use (Agents API)

Computer use lets an agent navigate websites and interact with browser interfaces. The Agents API runs the browser in an OpenAI-hosted environment; your application starts the session, follows events, and handles approvals.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()
session = client.beta.agents.sessions.create(
    agent={
        "model": "gpt-6-astra",
        "instructions": "Read public documentation in the browser. Do not sign in or change any website data. Report the page title and URL you find.",
        "tools": [{"type": "computer_use", "include_screenshots": True}],
    },
    environment={
        "type": "openai_hosted",
        "desktop": {"enabled": True},
        "network": {"access": "enabled"},
    },
)
print("Session ID:", session.id, flush=True)
```

Respond to a browser origin approval:

```bash
curl --fail-with-body "https://api.openai.com/v1/agents/sessions/$session_id/events" \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "events": [{
      "type": "agent.session.input.computer_use_approval_request_result",
      "request_id": "REQUEST_ID",
      "response": { "type": "browser_origin_access", "decision": "approve" }
    }]
  }'
```

Submit sign-in input (omit `turn_id`):

```json
{
  "events": [
    {
      "type": "agent.session.input.computer_use_approval_request_result",
      "request_id": "REQUEST_ID",
      "response": {
        "type": "browser_authentication",
        "action": "submit",
        "fields": [{ "field_id": "email", "value": "USER_ENTERED_VALUE" }]
      }
    }
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `agent.tools[].type: "computer_use"` | tool | Enables browser access |
| `include_screenshots` | boolean | Include screenshots in API output (excluded by default; the agent can still observe them) |
| `environment.type` | `openai_hosted` | Required, with `environment.desktop.enabled: true` |
| `environment.network.access` | string | Outbound access policy for the browser and environment code |
| `computer_use_approval_request` / `request.type` | `browser_origin_access` \| `browser_authentication` | Pending entries in `required_actions` |
| origin response `decision` | `approve` \| `deny` \| `cancel` | Reply with the same `request_id` and `response.type: "browser_origin_access"` |
| auth response `action` | `submit` \| `cancel` | With `fields` (`field_id`, `value`) and `selected_option` when the request offers options |
| `computer_use_call` item | item | Fields `id`, `turn_id`, `title` (or null), `status` (`in_progress` / `completed` / `failed` / `incomplete`), `output` (screenshot, when available) |

## Notes

- The browser requires user approval before accessing each new website origin, including public sites. Enabling network access does not approve these requests. On `agent.session.requires_action`, retrieve the session and inspect `required_actions`; show `origin` and `reason`.
- Origin approval does not enforce confirmation before individual actions (purchases, destructive changes). For such guarantees restrict the hosted browser or use a browser runtime you control. Treat website content as untrusted.
- Sign-in: only the main agent (not subagents) can request browser authentication. Supports email addresses, passwords, and verification codes; not passkeys or QR-code sign-in. Render the UI from `request.reason`, `credential_origin`, `fields` (`id`, `label`, `type`, `required`), and `options` (`id`, `label`, `field_ids`). Only enter credentials for a verifiable destination; otherwise cancel. Send sign-in values only through the dedicated event; they stay out of model input and are omitted from history. Mask values, keep them out of logs, and do not send credentials in ordinary messages or function-tool results.
- A `202` with empty body means accepted, not that sign-in succeeded. Disable automatic HTTP/SDK retries for credential submissions. Auth submission limits: up to six field values (each once), each up to 16,384 characters, serialized fields plus selected option within 120 KiB; include at least one field when the request lists fields.
- Recovery: after a disconnect retrieve the session and rebuild forms only for pending requests. Statuses: `400` check type/option/field IDs (omit fields for cancel and origin), `404` check IDs and re-retrieve, `409` refresh (expired, turn ended, or another response accepted), lost connection means acceptance unknown. Authentication requests expire after five minutes; an identical retry (same `request_id`, option, values) does not refill the form, changed values after acceptance return `409`. Origin requests stay pending for their owning turn and have no five-minute timeout.
- Screenshots: a completed activity item holds the last screenshot as `{"type": "computer_screenshot", "image_url": "data:image/jpeg;base64,..."}`; some operations return `output: null`. Capture from `agent.session.turn.item.done` events because retrieved history can omit image bytes. Screenshots may contain sensitive data; show only to authorized users and keep out of logs.
- History: authentication requests and accepted responses appear in session history (without credential values); origin approvals have no history items.
- Asking the user questions: define a function tool (e.g. `request_user_response`) and answer via `agent.session.input.tool_result`; function-tool results are visible to the model, so collect passwords and codes through browser authentication instead.
- Network: the environment `network` config controls outbound access; allow the destination site and domains for resources or redirects. Origin approval does not override the network policy.
- Reuse the same session for follow-ups that need browser state; login cookies can expire and recycling the environment clears state. Delete the session to request cleanup.
- Source: https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use (fetched 2026-10). Distinct from the Responses API computer use tool in this skill's `tools` category.

## Related

- [Session Webhooks](./session-webhooks.md)
- [Events and Items](./session-events.md)
- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
- [Functions](./functions.md)
