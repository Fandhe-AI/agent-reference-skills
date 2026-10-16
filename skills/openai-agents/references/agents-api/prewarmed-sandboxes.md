# Pre-warm Sandboxes

Pre-warmed environments let you create an OpenAI-hosted sandbox, install packages, load files, and run setup commands before creating an agent session, then attach the prepared environment when a task arrives.

## Signature / Usage

Create the environment (`POST /v1/agents/environments`), check readiness, then attach it:

```python
from openai import OpenAI

client = OpenAI()
environment = client.beta.agents.environments.create(
    environment={
        "type": "openai_hosted",
        "packages": {"python": ["pandas==2.2.3"]},
        "files": [
            {
                "type": "inline",
                "path": "/workspace/amounts.csv",
                "data": "YW1vdW50CjEwCjIwCjMwCg==",
            }
        ],
        "setup_commands": [
            {
                "command": 'python -c "import pandas; print(pandas.__version__)"',
                "cwd": "/workspace",
            }
        ],
    }
)
environment_id = environment.id

current = client.beta.agents.environments.retrieve(environment_id)
print(current.status)
```

Attach to a session:

```json
{
  "agent": { "model": "gpt-6-astra" },
  "environment": {
    "type": "openai_hosted",
    "environment_id": "$ENVIRONMENT_ID"
  },
  "input": "Use pandas to read /workspace/amounts.csv, calculate the sum of the amount column, and report the total.",
  "stream": true
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `environment.type` | `openai_hosted` | Required for a standalone environment |
| `environment_template_id` | string | Create the pre-warmed environment from a saved template |
| `desktop.enabled` | boolean | Prepare the managed browser and virtual display for computer use |
| `environment_id` (on session create) | string | Attach a prepared environment |
| `GET /v1/agents/environments` | endpoint | List active environments (`limit` 1-100, default 20; `order` `asc`/`desc`; `after` = previous `last_id`) |
| `Idempotency-Key` | header | Retry creation safely with the same key and same body |

## Notes

- Workflow: create the environment, wait for readiness (status `pending` then `ready`, or use a webhook), start a session with the environment ID. You can attach while setup is still running; the agent's workspace access waits for setup to finish. `ready` does not mean an agent is connected.
- Pricing: pre-warming is free, including container usage before attachment; unattached pre-warmed sandboxes expire after 5 minutes. After attachment, standard container pricing applies.
- Required SDK versions for this guide: Python 3.28.0, Node.js 7.32.0, Java 4.80.0, Ruby 0.103.0 or later.
- List statuses: `pending`, `ready`, `connected`, `disconnected`, `suspended`; failed, expired, deleted, and terminated are excluded. Listed environments may already be attached to sessions.
- Errors: attaching an expired environment (create a new one); `404` (check ID and use the same organization, project, and creating identity); `409` shared environment at its session limit (128 attached sessions; reuse a session or create another environment).
- Lifetime and reuse: multiple sessions can share one environment by passing the same `environment_id` (they share files, processes, packages, configuration; each keeps its own conversation; up to 128 sessions; applies to newly created standalone environments, older ones keep their lifecycle). Unattached environments expire after 5 minutes. Retrieval, listing, and attachment require the same organization, project, and identity (different API keys for that identity work, including after rotation). Shared environments: first attachment starts a 20-minute idle lifetime; activity in any attached session or the environment file API extends it; pending work and active turns prevent idle expiry; deleting a session does not delete the shared workspace; no standalone environment deletion endpoint.
- Idempotent creation: a retained key can return `409` if creation is in progress, its outcome is uncertain, the environment is no longer available, or parameters differ; keys are retained for 24 hours.
- Computer use: attach the saved environment and give the agent the `computer_use` tool; the session uses the saved desktop configuration.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/prewarmed (fetched 2026-10).

## Related

- [OpenAI-hosted Sandboxes](./openai-hosted-sandboxes.md)
- [Computer Use (Agents API)](./computer-use.md)
- [Files and Artifacts](./files-and-artifacts.md)
