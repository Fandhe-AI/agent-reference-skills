---
source: https://ai.google.dev/gemini-api/docs
---

# Gemini API overview

The Gemini API is the fastest path from prompt to production with Gemini, Veo, Nano Banana, and more. It lets you integrate these generative models into your applications to generate text and images, analyze multimodal inputs, and build conversational agents.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain how AI works in a few words"
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: "Explain how AI works in a few words",
});

console.log(interaction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Explain how AI works in a few words"
  }'
```

Managed agents (same endpoint, `agent` instead of `model`):

```python
interaction = client.interactions.create(
    agent="antigravity-preview-09-2026",
    input=(
        "Research the top 5 sustainable fashion brands, "
        "compare their materials and pricing tiers, and "
        "build an interactive dashboard in analysis.html."
    ),
    environment="remote"
)
```

## Notes

- The landing page states: "The **Interactions API** has become our default interface as of June 2026 and is the best way to build with Gemini models and agents going forward. If you're starting a new project, you should use the Interactions API. While it remains supported, the `generateContent` API is now considered legacy."
- Models highlighted on the page: Gemini 3.8 Flash, Gemini 3.8 Flash TTS, Gemini 3.5 Flash-Lite, Gemini 3.1 Pro, Nano Banana, Gemini Omni Flash, Gemini 3.5 Transcribe, Gemini Robotics.
- Capability entry points listed: Image Generation, Long Context, Structured Outputs, Function Calling, Video Generation with Veo 3.1, Voice Agents with Live API, Tools (Google Search, URL Context, Google Maps, Code Execution, Computer Use), Document Understanding (up to 1000 pages of PDF), Thinking.
- Managed Agents: "In a single request, Gemini can write and run code, search the web, and create files in a hosted sandbox environment. Start with our prebuilt Antigravity agent, or customize it with your own instructions and tools."
- Docs fetched 2026-10-16 (no version in URL). The REST example uses `v1beta`.
- API availability: Interactions API (this page's examples). Gemini CLI (handled by the gws skill) and Firebase AI Logic are out of scope for this skill.
- Distinct from OpenAI Responses API (openai-api-core skill) and Anthropic Messages API (anthropic-api-core skill).

## Related

- [get-started](./get-started.md)
- [interactions-overview](./interactions-overview.md)
- [libraries](./libraries.md)
- [api-key](./api-key.md)
