<!-- source: https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai / last verified: 2026-08-07 -->

# Claude on Google Cloud (Agent Platform / Vertex AI)

Access Claude through Google Cloud's Agent Platform (formerly Vertex AI). API shape is nearly identical to the Messages API; `model` is part of the endpoint URL (not the body), and `anthropic_version: "vertex-2023-10-16"` is a body field (not a header).

## Signature / Usage

```python
from anthropic import AnthropicVertex

client = AnthropicVertex(project_id="MY_PROJECT_ID", region="global")

message = client.messages.create(
    model="claude-opus-5",
    max_tokens=100,
    messages=[{"role": "user", "content": "Hey Claude!"}],
)
```

```bash
MODEL_ID=claude-opus-5
PROJECT_ID=MY_PROJECT_ID
curl https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/publishers/anthropic/models/${MODEL_ID}:rawPredict \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -d '{"anthropic_version": "vertex-2023-10-16", "messages": [{"role": "user", "content": "Hey Claude!"}], "max_tokens": 100}'
```

## Options / Props

Model IDs match Claude API names without prefixes (e.g. `claude-opus-5`, `claude-sonnet-5`, `claude-opus-4-8`), except older models which use `@version` suffixes (e.g. `claude-sonnet-4-5@20250929`).

Install: `pip install -U "anthropic[vertex]"` / `npm install @anthropic-ai/vertex-sdk`.

## Notes

- Endpoint types: **global** (dynamic routing, no premium, recommended), **multi-region** (`"us"`/`"eu"`, dynamic within a geography, 10% premium), **regional** (e.g. `"us-east5"`, single-region, 10% premium; specific regional endpoints support Sonnet 4.6 and earlier only — newer models use global/multi-region).
- Supported: Messages API, prompt caching, thinking, tool use (bash/computer use/memory/text editor), web search tool, citations, structured outputs.
- Not supported: URL image/document sources, Files API, server-side code execution/web fetch/advisor, Agent Skills, MCP connector, programmatic tool calling, Message Batches/Models/Admin/Compliance/Usage APIs, Claude Managed Agents, server-side fallback.
- Context window: 1M tokens on Opus 5/4.8/4.7/4.6, Sonnet 5/4.6, Fable 5; 200k on other models (e.g. Sonnet 4.5). Payload limit: 30 MB.
- Claude Code からの Bedrock/Vertex/Foundry 利用は anthropic-claude-code-deploy スキルを参照。

## Related

- [claude-in-microsoft-foundry.md](./claude-in-microsoft-foundry.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)
