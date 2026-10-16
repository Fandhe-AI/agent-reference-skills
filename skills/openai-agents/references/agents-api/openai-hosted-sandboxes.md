# OpenAI-hosted Sandboxes

An OpenAI-hosted sandbox gives the agent a Linux workspace with Python, Node.js, and command-line tools. OpenAI provisions and connects it; your application supplies the task and retrieves results.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()
stream = client.beta.agents.sessions.create(
    agent={"model": "gpt-6-astra"},
    environment={
        "type": "openai_hosted",
        "network": {"access": "disabled"},
        "files": [
            {
                "type": "inline",
                "path": "/workspace/amounts.csv",
                "data": "YW1vdW50CjEwCjIwCjMwCg==",
            }
        ],
    },
    input="Use Python to sum the amount column in /workspace/amounts.csv. Write a JSON object with the total to /workspace/outputs/summary.json, then read it back to verify it.",
    stream=True,
)

with stream.with_result_collection():
    for event in stream:
        print(event.model_dump_json())
    result = stream.get_final_result()

client.beta.agents.sessions.artifacts.for_result(result).download(
    "/workspace/outputs/summary.json", to="summary.json"
)
```

Select a container size:

```json
{
  "environment": {
    "type": "openai_hosted",
    "container_size": "small"
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `environment.type` | `openai_hosted` | Working directory is `/workspace` |
| `container_size` | `small` \| `medium` (default) \| `large` | small = 1 vCPU / 1 GB; medium = 2 vCPU / 4 GB; large = 4 vCPU / 16 GB. Reported in `environment.container_size` |
| `packages` | object | `python`, `system`, `npm` lists; pin versions (e.g. `pandas==2.2.3`) |
| `files` | array | Input files by Files API ID or inline base64 |
| `setup_commands` | array | Shell commands run in order before the agent starts; each may set `cwd` (default `/workspace`), e.g. `[{ "command": "mkdir -p reports" }]` |
| `env` | object | String-valued environment variables |
| `network.access` | `enabled` (default) \| `disabled` \| `restricted` | `restricted` allows only hosts in `allowed_domains` |
| `skills`, `plugins`, `capability_directories` | fields | Add skills and plugins |
| `environment_template_id` | string | Reuse saved configuration; omitted settings inherit the template |

## Notes

- Packages and input files are prepared before setup commands run; a nonzero setup exit status prevents the agent from starting.
- `env` values can be read by agent-generated code; for secrets use vault credentials. Reserved names (`PATH`, `CODEX_*`, `OPENAI_API_KEY`) are rejected.
- Restricted mode accepts 1-100 exact host names (no wildcards, protocols, paths, ports); subdomains and redirect destinations need their own entries. Hosted stdio MCP servers currently require `enabled` access.
- Template network overrides cannot broaden its policy; templates save configuration, not a running workspace.
- Check setup: the create-session response means setup has started; retrieve `GET /v1/agents/environments/{environment_id}` using the session's `environment.id`. Status `provisioning` (wait), `connected` (setup succeeded; can add/list live files), `failed` (read `environment.error` in `agent.session.environment.failed`).
- Each session has a separate workspace when the environment is provisioned at session creation; files persist across turns while the sandbox exists. Files under `/workspace/outputs` are published as immutable artifacts when a turn completes and stay downloadable after the sandbox expires.
- Expiry: connected sandboxes receive keep-alives; if activity and keep-alives stop for an hour the sandbox can be deleted (not configurable). Delete the session to request cleanup; a `409` during setup or execution means wait and retry with a limit. Closing an event stream does not cancel the task.
- Shared environments: sessions attached to the same prepared `environment_id` (up to 128) share files, processes, installed packages, and environment configuration, use a 20-minute idle lifetime, and deleting a session does not delete the shared workspace; see [Pre-warm Sandboxes](./prewarmed-sandboxes.md).
- Pricing: standard container rates; model usage billed separately.
- Troubleshooting: setup failures (inspect the environment-failure event), blocked requests (check `network` and redirects), live file operations fail (confirm `connected`; if expired, create a new session), `5xx` on status or file-list (retry with increasing delays and a deadline, keep the request ID).
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted (fetched 2026-10).

## Related

- [Pre-warm Sandboxes](./prewarmed-sandboxes.md)
- [Files and Artifacts](./files-and-artifacts.md)
- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Computer Use (Agents API)](./computer-use.md)
- [Vaults](./vaults.md)
