---
source: https://ai.google.dev/gemini-api/docs/custom-agents
---

# Building managed agents

Extend the Antigravity agent with your own instructions, skills, and data, either inline at interaction time or by saving the configuration as a managed agent invoked by ID.

## Signature / Usage

Inline customization (no registration step):

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Analyze the Q1 revenue data and create a slide deck.",
    system_instruction="You are a data analyst. Always include visualizations and export results as PDF.",
    environment={
        "type": "remote",
        "sources": [
            {
                "type": "inline",
                "target": ".agents/AGENTS.md",
                "content": "Always use matplotlib for charts. Include a summary table in every report.",
            },
            {
                "type": "inline",
                "target": ".agents/skills/slide-maker/SKILL.md",
                "content": "---\nname: slide-maker\n---\n# Slide Maker\nCreate HTML slide decks from data analysis results.",
            },
        ],
    },
)

print(interaction.output_text)
```

Save a managed agent (REST), then invoke it by ID:

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/agents" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "id": "data-analyst",
    "base_agent": "antigravity-preview-09-2026",
    "agent_config": {
        "type": "antigravity",
        "model": "gemini-3.8-flash"
    },
    "system_instruction": "You are a data analyst. Always include visualizations and export results as PDF.",
    "base_environment": {
        "type": "remote",
        "sources": [
            {
                "type": "inline",
                "target": ".agents/AGENTS.md",
                "content": "Always use matplotlib for charts. Include a summary table in every report."
            },
            {
                "type": "repository",
                "source": "https://github.com/my-org/analysis-templates",
                "target": "/workspace/templates"
            }
        ]
    }
}'
```

```python
result = client.interactions.create(
    agent="data-analyst",
    input="Analyze Q1 revenue data from /workspace/templates/sample.csv and create a slide deck.",
    environment="remote",
)

print(result.output_text)
```

Fork an existing environment into a managed agent:

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Install pandas, matplotlib, and seaborn. Create an analysis template at /workspace/template.py.",
    environment="remote",
)

agent = client.agents.create(
    id="my-data-analyst",
    base_agent="antigravity-preview-09-2026",
    system_instruction="You are a data analyst. Use the template at /workspace/template.py for all reports.",
    base_environment=interaction.environment_id,
)

print(f"Forked agent successfully: {agent.id}")
```

Network rules on a saved agent:

```python
agent = client.agents.create(
    id="issue-resolver",
    base_agent="antigravity-preview-09-2026",
    system_instruction="You resolve GitHub issues. Clone the repo, find the bug, write the fix, run the tests, and open a PR.",
    base_environment={
        "type": "remote",
        "sources": [
            {
                "type": "repository",
                "source": "https://github.com/my-org/backend",
                "target": "/workspace/repo",
            }
        ],
        "network": {
            "allowlist": [
                {
                    "domain": "github.com",
                    "transform": {
                        "Authorization": "Basic YOUR_BASE64_TOKEN"
                    },
                },
                {
                    "domain": "api.github.com",
                    "transform": {
                        "Authorization": "Basic YOUR_BASE64_TOKEN"
                    },
                },
                {"domain": "pypi.org"},
            ]
        },
    },
)
```

Override at invocation (system instruction and tools):

```python
result = client.interactions.create(
    agent="data-analyst",
    input="Analyze Q1 revenue data, but do not create a slide deck. Just output a summary table.",
    system_instruction="You are a data analyst. Focus ONLY on summary tables. Ignore default instructions about slides.",
    tools=[{"type": "code_execution"}], # Override to only use code execution
    environment="remote",
)
print(result.output_text)
```

Manage agents: `client.agents.list()` (`GET /v1beta/agents`), get (`client.agents.get`), delete (`DELETE /v1beta/agents/{id}`).

```bash
curl -X GET "https://generativelanguage.googleapis.com/v1beta/agents" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

## Options / Props

Agent definition reference:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique agent identifier within the Google Cloud project. Used to invoke the agent. Must not use reserved prefixes |
| `description` | string | No | Human-readable description of the agent |
| `base_agent` | string | Yes | Base agent ID (e.g., `antigravity-preview-09-2026`) |
| `agent_config` | object | No | Configuration for the base agent, including model selection (`{"type": "antigravity", "model": "gemini-3.8-flash"}`). Defaults to `gemini-3.8-flash` if omitted. Cannot be overridden at interaction time for named agents |
| `system_instruction` | string | No | System prompt defining behavior and persona |
| `tools` | array | No | Tools the agent can use. If omitted, defaults to `code_execution`, `google_search`, and `url_context`. Supported: `code_execution`, `google_search`, `url_context`, `mcp_server`, and custom `function` definitions |
| `base_environment` | string or object | No | `"remote"`, an `environment_id`, or a config object with `sources` and `network` |

Reserved `id` prefixes (case-insensitive; creation fails): `antigravity-`, `veo-`, `omni-`, `lyria-`, `imagen-`, `gemma-`, `gemini-`, `google-`, `youtube-`, `android-`, `chrome-`, `pixel-`, `waze-`, `fitbit-`, `nest-`, `kaggle-`.

## Notes

- The official example allowlists only `api.github.com` and `pypi.org`; since an allowlist permits only listed domains and source downloads authenticate via the network config, `github.com` is added here so the repository source can be cloned.

- Ways to extend: model selection via `agent_config` (defaults to Gemini 3.8 Flash), inline `system_instruction`, tools (override defaults, register remote MCP servers, define custom functions), and mounted files such as `AGENTS.md` and `SKILL.md`.
- `system_instruction` and `AGENTS.md` are additive; both apply when present.
- The agent automatically loads `.agents/AGENTS.md` (or `/.agents/AGENTS.md`) as system instructions on startup. Skills placed under `.agents/skills/<skill-name>/SKILL.md` are auto-discovered and registered. The runtime scans `.agents/` and the root of the environment.
- Recommended project layout: `my-agent/` with `AGENTS.md`, `skills/<name>/SKILL.md`, `workspace/`. An experimental open-source Gemini API CLI can scaffold, test, and deploy this structure.
- Each invocation of a saved agent forks the base environment, so every run starts clean. Overrides at invocation (`system_instruction`, `tools`, `environment.network`) do not change the stored definition. A new `network` fully replaces the previous rules for that interaction; base environment sources are preserved. If the base environment references a stored credential, rotate it with `PATCH` instead of overriding.
- Limitations: Preview; only `antigravity-preview-09-2026` is supported as `base_agent`; supported `agent_config` models are `gemini-3.8-flash` (default), `gemini-3.6-flash`, `gemini-3.5-flash-lite`; no agent versioning or rollback; no subagent nesting; up to 1000 managed agents.
- Iteration workflow: prototype inline, stabilize the environment, persist as a managed agent (from sources or by forking), update the definition (next invocation picks it up).
- The source page also links a separate Managed Agents API on Agent Platform (Google Cloud, organizational governance); that Google Cloud product is out of scope for this skill.
- `SKILL.md` here is a file mounted into the Gemini agent's sandbox, not a Claude Code Agent Skill (see anthropic-claude-code-extend) and not this repository's skills. Distinct from anthropic-managed-agents, anthropic-agent-sdk, openai-agents, hermes-agent.
- API surface: managed agents via the Interactions API / REST `v1beta/agents`. Java and Go tabs exist on the official page.
- Docs fetched 2026-10-16.

## Related

- [Agents overview](./agents-overview.md)
- [Managed agents quickstart](./quickstart.md)
- [Antigravity agent](./antigravity-agent.md)
- [Environments in managed agents](./environments.md)
- [Credentials in managed agents](./credentials.md)
