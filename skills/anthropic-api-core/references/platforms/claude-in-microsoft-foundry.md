<!-- source: https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry / last verified: 2026-08-07 -->

# Claude in Microsoft Foundry

Azure-native access to Claude, billed as Claude Consumption Units (CCUs) through Azure Marketplace. Two hosting options per deployment: **Hosted on Azure** (Anthropic-operated service on Azure infra, prompts/completions stay in Azure) and **Hosted on Anthropic** (runs on Anthropic infrastructure, all models/features available).

## Signature / Usage

```python
import os
from anthropic import AnthropicFoundry

client = AnthropicFoundry(
    api_key=os.environ.get("ANTHROPIC_FOUNDRY_API_KEY"),
    resource="example-resource",
)

message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}],
)
```

```bash
curl https://{resource}.services.ai.azure.com/anthropic/v1/messages \
  -H "api-key: YOUR_AZURE_API_KEY" -H "anthropic-version: 2023-06-01" \
  -d '{"model": "claude-opus-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello!"}]}'
```

## Options / Props

| Model | Deployment name | Hosted on Azure | Hosted on Anthropic |
|---|---|---|---|
| Claude Opus 5 | `claude-opus-5` | ✓ | ✓ |
| Claude Opus 4.8 | `claude-opus-4-8` | ✓ | ✓ |
| Claude Sonnet 5 | `claude-sonnet-5` | ✓ | ✓ |
| Claude Haiku 4.5 | `claude-haiku-4-5` | ✓ | ✓ |
| Claude Fable 5, Opus 4.7/4.6/4.5, Sonnet 4.6/4.5 | — | — | ✓ only |

Env vars: `ANTHROPIC_FOUNDRY_API_KEY`, `ANTHROPIC_FOUNDRY_RESOURCE` (or `ANTHROPIC_FOUNDRY_BASE_URL`). Install: `pip install -U "anthropic"` (+ `azure-identity` for Entra ID) / `npm install @anthropic-ai/foundry-sdk`. Supported natively by C#, Java, PHP, Python, TypeScript SDKs (not Go/Ruby — use the standard SDK with `option.WithBaseURL` as a workaround).

## Notes

- Auth: API key (`api-key`/`x-api-key` header) or Microsoft Entra ID bearer token (`Authorization: Bearer`).
- Not supported (any hosting): Admin API, Advisor tool, Claude Managed Agents, Compliance API, Models API, Message Batches API, server-side fallback.
- Additionally not supported when **hosted on Azure**: structured outputs, server-side tools (web search/fetch, code execution, tool search), MCP connector, Agent Skills, programmatic tool calling, Files API — these requests 400 by design; Claude Code auto-detects Azure hosting and adapts.
- No standard `anthropic-ratelimit-*` headers; manage rate limits via Azure monitoring tools instead.
- Context window: 1M tokens on Fable 5, Opus 5/4.8/4.7/4.6, Sonnet 5/4.6; 200k on other models (e.g. Sonnet 4.5).
- Claude Code からの Bedrock/Vertex/Foundry 利用は anthropic-claude-code-deploy スキルを参照。

## Related

- [claude-on-vertex-ai.md](./claude-on-vertex-ai.md)
- [claude-platform-on-aws.md](./claude-platform-on-aws.md)
