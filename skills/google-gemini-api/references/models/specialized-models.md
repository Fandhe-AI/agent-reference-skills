---
source: https://ai.google.dev/gemini-api/docs/models/gemini-2.5-computer-use-preview-10-2025
---

# Computer use / Robotics ER model cards

Aggregated cards for the specialized Gemini 2.5 Computer Use model and the Gemini Robotics ER models. One section per source page.

## Signature / Usage

The cards contain no code; model codes as listed on the pages:

```text
gemini-2.5-computer-use-preview-10-2025
gemini-robotics-er-2-preview
gemini-robotics-er-2-streaming-preview
gemini-robotics-er-1.6-preview
gemini-robotics-er-1.5-preview
```

## Options / Props

| Model code | Inputs / Output | Input / output token limit | Status | Latest update |
| --- | --- | --- | --- | --- |
| `gemini-2.5-computer-use-preview-10-2025` | Image, text / Text | 128,000 / 64,000 | Shut down on July 28, 2026 | October 2025 |
| `gemini-robotics-er-2-preview` | Text, images, video, audio / Text | 131,072 / 65,536 | Preview | July 2026 |
| `gemini-robotics-er-2-streaming-preview` | Text, images, video, audio / Text | 131,072 / 65,536 | Preview | July 2026 |
| `gemini-robotics-er-1.6-preview` | Text, images, video, audio / Text | 131,072 / 65,536 | Preview (card); shutdown August 31, 2026 per deprecations, migrate to `gemini-robotics-er-2-preview` | December 2025 |
| `gemini-robotics-er-1.5-preview` | Text, images, video, audio / Text | 1,048,576 / 65,536 | Preview (card, "planned for deprecation soon"); shutdown April 30, 2026 per deprecations | September 2025 |

Capabilities (as listed):

| Model code | Caching | Code execution | Computer use | File search | Function calling | Live API | Thinking | Batch API |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `gemini-robotics-er-2-preview` | Supported | Supported | Supported | Supported | Supported | Not supported | Supported | Supported |
| `gemini-robotics-er-2-streaming-preview` | Not supported | Not supported | Not supported | Not supported | Supported | Supported | Supported | Not supported |
| `gemini-robotics-er-1.6-preview` | Supported | Supported | Supported | Supported | Supported | Not supported | Supported | Supported |
| `gemini-robotics-er-1.5-preview` | Not supported | Supported | not listed | not listed | Supported | Not supported | Supported | Not supported |

`gemini-robotics-er-2-preview`, `-1.6-preview` also list Maps grounding, Search grounding, Structured outputs and URL context as Supported; Flex and Priority inference Not supported on ER 2 / ER 2 Streaming / ER 1.6 (Flex and Priority Supported on the 1.6 card's own page).

## Notes

- Source pages (one per section): https://ai.google.dev/gemini-api/docs/models/gemini-2.5-computer-use-preview-10-2025, https://ai.google.dev/gemini-api/docs/models/gemini-robotics-er-2-preview, https://ai.google.dev/gemini-api/docs/models/gemini-robotics-er-2-streaming-preview, https://ai.google.dev/gemini-api/docs/models/gemini-robotics-er-1.6-preview, https://ai.google.dev/gemini-api/docs/models/gemini-robotics-er-1.5-preview
- The model cards still show ER 1.6 / 1.5 as Preview, but the deprecations page lists shutdown dates of August 31, 2026 (ER 1.6, replacement `gemini-robotics-er-2-preview`) and April 30, 2026 (ER 1.5); see migration/deprecations.md.
- Gemini 2.5 Computer Use warning: "This model was shut down on July 28, 2026; migrate to Gemini 3.8 Flash or other Gemini 3 models with built-in computer use support". Gemini 3.x models support Computer Use as a built-in tool (labelled Supported (Preview) on several 3.x cards).
- Gemini Robotics ER 2: vision-language model for robotics accepting text, image, video and audio input; spatial reasoning, video understanding, agentic code execution, multi-step tool orchestration and multi-robot coordination. ER 2 Streaming is optimized for real-time text streaming using the Live API with bidirectional streaming and function calling (guide: "Live API for robotics"). ER 1.6 / 1.5: bring Gemini's agentic capabilities to robotics; interpret visual data, spatial reasoning, plan actions from natural language commands.
- Page-level inconsistency: the ER 2 Preview card page lists the three ER models under sub-headings (ER 2 Preview, ER 2 Streaming Preview, ER 1.6 Preview), and the ER 2 Streaming page repeats the same three tables with the same Live API / Batch API values as above; the 1.6 Preview card's own page lists Flex and Priority inference as Supported while the combined tables list Not supported.
- Robotics guides (overview / agentic / orchestration / spatial / streaming / video progress) are aggregated in `multimodal-input/robotics-er.md` and `generate-content/robotics.md`; the catalog links Gemini Robotics ER 2 to the robotics-overview guide.
- Docs fetched 2026-10-16. API surface: Computer Use and Robotics ER are generateContent/Interactions model features per their guides; ER 2 Streaming uses the Live API (v1beta only).
- Distance: Computer Use tool comparisons with anthropic-api-tools-mcp and openai-agents (built-in computer use) are conceptual only; the APIs differ.

## Related

- [Models](./models-catalog.md)
- [Antigravity / Deep Research agent model cards](./agent-models.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
