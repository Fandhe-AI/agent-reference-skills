---
source: https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.6
---

# What's new in Gemini 3.6 Flash and 3.5 Flash-Lite

Gemini 3.6 Flash (`gemini-3.6-flash`) and Gemini 3.5 Flash-Lite (`gemini-3.5-flash-lite`) are previous-generation releases in the Gemini 3 series that remain available for production use, with API changes that apply to these and all future Gemini model releases.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.6-flash",
    input="Write a three.js script that renders an interactive 3D robot."
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: "Write a three.js script that renders an interactive 3D robot.",
  });
  console.log(interaction.output_text);
}

main();
```

Replace a prefilled model turn with `system_instruction`:

```python
# ✅ RECOMMENDED: Use system_instruction in the Interactions API to specify output format
interaction = client.interactions.create(
    model="gemini-3.6-flash",
    input="Translate 'Hello world' to Spanish.",
    system_instruction="Output only the translation without introductory text.",
)
```

## Options / Props

| Model | Model ID | Default thinking level | Pricing | Description |
| --- | --- | --- | --- | --- |
| Gemini 3.6 Flash | `gemini-3.6-flash` | `medium` | $1.50/1M input tokens and $7.50/1M output tokens | Balances speed with intelligence for agentic and multimodal tasks. |
| Gemini 3.5 Flash-Lite | `gemini-3.5-flash-lite` | `minimal` | $0.30/1M input tokens and $2.50/1M output tokens | The fastest, lowest-cost 3.5 model for high-throughput execution. |

| Model | Primary use cases | Recommended to migrate from |
| --- | --- | --- |
| Gemini 3.6 Flash | Code generation, spatial/multimodal reasoning, multi-step agentic workflows | Gemini 3.5 Flash, Gemini 3 Flash (Preview), or Gemini 3.1 Pro |
| Gemini 3.5 Flash-Lite | Autonomous subagent execution, high-volume data analysis and document extraction, structured JSON parsing | Gemini 3.1 Flash-Lite or Gemini 2.5 Flash |

## Notes

- The source table header reads 'Recommended migration target', but the listed models are the ones to migrate from (the deprecations page routes gemini-3.5-flash to gemini-3.6-flash); the header is renamed here.
- The source JS sample reads `interaction.outputText`; @google/genai exposes `output_text`, used here.
- Both models support the 1M token context window, 64k max output tokens, thinking, and the full suite of built-in tools including Computer Use.
- API changes starting with these models, applying to all future Gemini model releases: `temperature`, `top_p`, `top_k` are deprecated; the API ignores them and returns an HTTP 400 error in future model generations. Prefilled model turns are no longer supported: if the last non-empty turn is a `model` turn, the API returns a `400` error (use `system_instruction` or structured outputs instead).
- Migrate to `gemini-3.6-flash`: update model ID; remove deprecated sampling parameters, `candidate_count` (unsupported in Gemini 3 and later), and prefilled model turns; replace `thinking_budget` with `thinking_level` (`"medium"` or `"high"`); audit function calling (multimodal assets inside the response payload, inline instructions separated by `\n\n`; see "Workarounds for pre-tool text requirements" on the function-calling page for `Malformed_Function_Call`).
- Migrate to `gemini-3.5-flash-lite`: leave `thinking_level` at `"minimal"` for extraction, routing, classification; set `"medium"` or `"high"` for autonomous subagents with tool calls to prevent premature tool termination.
- 3.6 Flash reduces output price ($7.50/1M versus $9.00/1M for 3.5 Flash); input remains $1.50/1M.
- Gemini 3.6 Flash introduced support for the Antigravity agent in Gemini Managed Agents.
- The source describes a coding-agent migration shortcut using an externally distributed `gemini-interactions-api` skill (`npx skills add google-gemini/gemini-skills ...`). That is a Gemini-side coding-agent artifact, not a skill of this repository and not a Claude Code Agent Skill (anthropic-claude-code-extend).
- Docs fetched 2026-10-16. API surface: Interactions API; the generateContent prefill example is shown in the source only to illustrate the disallowed form.

## Related

- [What's new in Gemini 3.5 Flash](./whats-new-gemini-3-5.md)
- [What's new in Gemini 3.7 Flash](./whats-new-gemini-3-7.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
