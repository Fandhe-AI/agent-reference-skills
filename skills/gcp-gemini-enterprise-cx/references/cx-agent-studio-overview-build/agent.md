---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/agent
---

# Agents and Agent Applications

In a multi-agent system the whole agent tree is the agent application. It is made of a root agent (steering agent, the entry point and orchestrator) and sub-agents (child agents) specialized for a task, domain or capability. Root agents can invoke sub-agents, and sub-agents can invoke other sub-agents.

## Signature / Usage

### Inline tag example (Composite V2 response)

```text
<calm><empathetic> I'm so sorry your flight was canceled. <positive> The good news is that I've already rebooked you on the next flight out.
```

## Options / Props

### Supported models

| Model | Optimization | Launch stage |
|---|---|---|
| [`gemini-composite-v2`](https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/agent#composite-v2) | Voice Optimized | GA |
| [`gemini-composite-v1`](https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/agent#composite-v1) | Voice Optimized | GA |
| [`gemini-3.7-flash`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-7-flash) | Text Optimized | GA |
| [`gemini-3.5-flash`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash) | Text Optimized | GA |
| [`gemini-3-flash`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) | Text Optimized | Preview |
| [`gemini-2.5-flash`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) | Text Optimized | GA |
| `gemini-3.1-flash-live` | Voice Optimized | GA |

### Common inline tags

| Tag type | Examples | Effect |
|---|---|---|
| Pause | `<short pause>`, `<long pause>` | Adds a short or long silence. |
| Sound | `<breath>`, `<sigh>`, `<chuckles>`, `<exhales>` | Adds a non-verbal sound once, where you place it. |
| Tone | `<warm>`, `<calm>`, `<empathetic>`, `<positive>`, `<clear>` | Sets the tone until the next tone tag. |

## Notes

- Create an agent application: open the CX Agent Studio console (https://ces.cloud.google.com), select your project, click **Create your first AI agent** or **Create agent**, name it, click **Create**; add instructions and tools for the root agent. Alternatives in the dropdown: **Import as new** (import an exported agent) and **Create from template** (templates for common scenarios). Add a sub-agent with the plus sign at the bottom of the root agent, then **Add sub-agent**.
- Agent application list columns: **Deployed to** (number of channels), **Sessions** (sessions in the past 24 hours that use a deployment channel), **Escalation** (escalations in the past 24 hours that use a deployment channel), latest update time; the context menu offers **Import agent**, **Export agent**, **Delete agent** (deleting is destructive; try it in a disposable project first).
- Language: design agents in English; agents detect the language of end-user input and respond in the same language. Settings are described on the settings page.
- Models are Gemini foundation models. Select a global model for the agent application or override it for specific sub-agents. Models in CX Agent Studio are performance-tuned for customer experience, potentially differing from standard Gemini Enterprise Agent Platform offerings. All models are GA unless marked "Preview" in the UI; this launch stage is specific to CX Agent Studio and independent of a model's status in other Google Cloud products.
- Composite V2 (`gemini-composite-v2`): next version of Composite V1 for enterprise voice agents; same Listener and Thinking models as V1 with an upgraded Speaker model (more natural speech, precise delivery control with inline tags, improved alphanumeric accuracy). Select it as the global model for the agent application.
- Composite V1 (`gemini-composite-v1`): combines a Listener model (audio to transcripts with real-time noise rejection), a Thinking model (processes inputs, enforces instructions, executes backend tools) and a Speaker model (text to natural, low-latency speech). Automatic updates may change the minor version of the composite model or its sub-components.
- Speaking style (voice settings): start empty, keep it short (about a dozen words), describe who the speaker is rather than how they feel, avoid long prompts (they can cause voice drift and conflict with inline tags). Example from the source: `Friendly woman in her early 30s, warm mid-pitch voice, relaxed conversational pace`.
- Inline tags: tell the agent in its instructions when to add tags; use angle brackets (`<sigh>`, not `[sigh]`); put tags at the start of a sentence (only pause tags go mid-sentence, after punctuation, for example `I checked your account, <short pause> everything is in order.`); one or two tags per turn; no closing tags such as `</warm>`; keep tags in English even when responding in another language; capitalize a word to stress it and use an ellipsis for hesitation. The full tag list is in the Gemini TTS prompting guide.
- Numbers and identifiers: add text normalization rules to the global instructions (for example speak `$87.25` as "eighty-seven dollars and twenty-five cents", read `XED1234` one character at a time), state that they apply only to spoken responses so original values such as `XED1234` are still passed to tools.
- Migrate from Composite V1 to V2: replace a long speaking style with a short description or leave it empty; change square-bracket tags to angle brackets in instructions and tools (`[sigh]` to `<sigh>`); set the model to `gemini-composite-v2` for the application and for sub-agents that override the global model; run evaluations and user acceptance testing before deploying.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [instruction.md](./instruction.md)
- [handoff.md](./handoff.md)
- [guardrail.md](./guardrail.md)
- [quick-create-agent.md](./quick-create-agent.md)
