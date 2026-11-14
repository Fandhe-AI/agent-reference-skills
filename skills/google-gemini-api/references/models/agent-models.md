---
source: https://ai.google.dev/gemini-api/docs/models/antigravity-preview-09-2026
---

# Antigravity / Deep Research agent model cards

Aggregated cards for the Interactions API agents: the Antigravity managed agent and the Deep Research agents. One section per source page.

## Signature / Usage

Selecting an agent with `agent=` (Antigravity example from the Gemini 4 Argon guide, selecting Argon explicitly via `agent_config`):

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input="Audit https://web.dev for performance, Core Web Vitals, and SEO.",
    environment="remote",
    agent_config={
        "type": "antigravity",
        "model": "gemini-4-argon",
    },
)

print(interaction.output_text)
```

## Options / Props

| Agent code (Interactions API) | Inputs / Output | Input context window / output limit | Status | Latest update |
| --- | --- | --- | --- | --- |
| `antigravity-preview-09-2026` | Text, Image / Text | 1,048,576 (compacted at ~135k) / 65,536 | Preview | September 2026 |
| `antigravity-preview-05-2026` | Text, Image / Text | 1,048,576 (compacted at ~135k) / 65,536 | Deprecated; shut down on October 5, 2026; migrate to `antigravity-preview-09-2026` | May 2026 |
| `deep-research-max-preview-04-2026` | Text, Image, PDF, Audio, Video / Text (Cited Reports), Images | 1,048,576 / 65,536 | Preview | April 2026 |
| `deep-research-preview-04-2026` | Text, Image, PDF, Audio, Video / Text (Cited Reports), Images | 1,048,576 / 65,536 | Preview (also lists Max: `deep-research-max-preview-04-2026`) | April 2026 |
| `deep-research-pro-preview-12-2025` | Text, Image, PDF, Audio, Video / Text (Cited Reports) | 1,048,576 / 65,536 | Deprecated; shut down on October 23, 2026; migrate to `deep-research-preview-04-2026` or `deep-research-max-preview-04-2026` | December 2025 |

## Notes

- Source pages (one per section): https://ai.google.dev/gemini-api/docs/models/antigravity-preview-05-2026, https://ai.google.dev/gemini-api/docs/models/antigravity-preview-09-2026, https://ai.google.dev/gemini-api/docs/models/deep-research-preview-04-2026, https://ai.google.dev/gemini-api/docs/models/deep-research-max-preview-04-2026, https://ai.google.dev/gemini-api/docs/models/deep-research-pro-preview-12-2025
- Antigravity: "a powerful general-purpose managed agent designed for autonomous, multi-step workflows" that plans, reasons, runs code, manages files and searches the web inside a secure, isolated Linux sandbox hosted by Google. The September 2026 release upgrades the runtime harness with improved prompt caching, native code search tools and efficient line-range file editing.
- Deep Research: autonomous multi-step investigations synthesizing hundreds of public web sources (and private workspace data such as Gmail and Drive for the 12-2025 version, powered by Gemini 3.1 Pro) into cited reports; supports collaborative planning, visualization, MCP servers and File Search. Deep Research is for speed and efficiency; Deep Research Max for maximum comprehensiveness.
- Default model: the changelog entry of November 12, 2026 says `gemini-4-hydrogen` is now the default model for the Antigravity agent in Gemini Managed Agents (earlier, `gemini-3.8-flash` was the default per the 3.8 guide). The Antigravity agent guide confirms that for `antigravity-preview-09-2026` omitting `agent_config` defaults to `gemini-4-hydrogen`. The underlying model can be changed with `agent_config.model`; the Gemini 4 Carbon and Gemini 4 Argon guides show `gemini-4-carbon` / `gemini-4-argon` there. The 3.6 and 3.7 guides say Gemini 3.6 / 3.7 Flash introduced Antigravity agent support.
- The 05-2026 Antigravity and 12-2025 Deep Research deprecation dates are from the card warnings (fetched 2026-11-14); see the deprecations page in `migration/deprecations.md` for the table.
- Docs fetched 2026-11-14 (agent cards unchanged except as noted; the 05-2026 Antigravity card still says it will be shut down on October 5, 2026, and the 12-2025 Deep Research card October 23, 2026). API surface: Interactions API only (card header "Agent code Interactions API"); these are agents, not `generateContent` models.
- Distance: Gemini-hosted Managed Agents differ from anthropic-managed-agents, anthropic-agent-sdk, openai-agents and hermes-agent. MCP servers mentioned here are consumed by the Gemini agent; client-side MCP is covered by anthropic-api-tools-mcp and openai-agents.

## Related

- [Models](./models-catalog.md)
- [What's new in Gemini 4 Hydrogen](./whats-new-gemini-4-hydrogen.md)
- [Embedding model cards](./embedding-models.md)
- [Computer use / Robotics ER model cards](./specialized-models.md)
