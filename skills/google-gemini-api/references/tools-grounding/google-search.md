---
source: https://ai.google.dev/gemini-api/docs/google-search
---

# Grounding with Google Search

Grounding with Google Search connects the Gemini model to real-time web content, works with all available languages, and lets the model cite verifiable sources beyond its knowledge cutoff. Enable it with the `google_search` tool.

## Signature / Usage

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Who won the euro 2024?",
    tools=[{"type": "google_search"}]
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: "Who won the euro 2024?",
    tools: [{ type: "google_search" }]
});

console.log(interaction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Who won the euro 2024?",
    "tools": [{"type": "google_search"}]
  }'
```

Grounded response (steps) with inline `url_citation` annotations:

```json
{
  "steps": [
    {
      "type": "thought",
      "summary": [
        {
          "type": "text",
          "text": "The user is asking for the winner of Euro 2024. I need to search for the result of the Euro 2024 final."
        }
      ],
      "signature": "CoMDAXLI2nynRYojJIy6B1Jh9os2crpWLfB0..."
    },
    {
      "type": "google_search_call",
      "arguments": {
        "queries": ["UEFA Euro 2024 winner"]
      }
    },
    {
      "type": "google_search_result",
      "call_id": "search_001",
      "result": [
        {
          "search_suggestions": "<!-- HTML and CSS for the search widget -->"
        }
      ]
    },
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "Spain won Euro 2024, defeating England 2-1 in the final. This victory marks Spain's record fourth European Championship title.",
          "annotations": [
            {
              "type": "url_citation",
              "url": "https://www.aljazeera.com/sports/euro-2024-final",
              "title": "aljazeera.com",
              "start_index": 0,
              "end_index": 56
            },
            {
              "type": "url_citation",
              "url": "https://www.uefa.com/euro2024/news/spain-wins-euro-2024",
              "title": "uefa.com",
              "start_index": 57,
              "end_index": 124
            }
          ]
        }
      ]
    }
  ]
}
```

Extract citations:

```python
for step in interaction.steps:
    if step.type == "model_output":
        for content_block in step.content:
            if content_block.type == "text":
                print(content_block.text)
                if content_block.annotations:
                    print("\nCitations:")
                    for annotation in content_block.annotations:
                        if annotation.type == "url_citation":
                            cited_text = content_block.text[annotation.start_index:annotation.end_index]
                            print(f"  [{annotation.title}]({annotation.url})")
                            print(f"    Cited text: \"{cited_text}\"")
```

```javascript
for (const step of interaction.steps) {
  if (step.type === 'model_output') {
    for (const contentBlock of step.content) {
      if (contentBlock.type === 'text') {
        console.log(contentBlock.text);
        if (contentBlock.annotations) {
          console.log("\nCitations:");
          for (const annotation of contentBlock.annotations) {
            if (annotation.type === 'url_citation') {
              const citedText = contentBlock.text.slice(annotation.start_index, annotation.end_index);
              console.log(`  [${annotation.title}](${annotation.url})`);
              console.log(`    Cited text: "${citedText}"`);
            }
          }
        }
      }
    }
  }
}
```

## Options / Props

Key response fields:

| Name | Type | Description |
|------|------|-------------|
| `google_search_call` | step | Contains the search `queries` the model executed |
| `google_search_result` | step | Contains `search_suggestions`, an HTML snippet for rendering search suggestions in your UI (usage requirements in the Terms of Service, `https://ai.google.dev/gemini-api/terms#grounding-with-google-search`) |
| `text` with `annotations` | content block | Synthesized answer with inline citations; each `url_citation` links a text segment (`start_index` to `end_index`) to a source URL |

Supported models (Grounding with Google Search):

| Model | Grounding with Google Search |
|---|---|
| Gemini 3.8 Flash | ✔️ |
| Gemini 3.6 Flash | ✔️ |
| Gemini 3.5 Flash-Lite | ✔️ |
| Gemini 3.1 Flash Image Preview | ✔️ |
| Gemini 3.1 Pro Preview | ✔️ |
| Gemini 3 Pro Image Preview | ✔️ |
| Gemini 3 Flash Preview | ✔️ |
| Gemini 2.5 Pro | ✔️ |
| Gemini 2.5 Flash | ✔️ |
| Gemini 2.5 Flash-Lite | ✔️ |
| Gemini 2.0 Flash | ✔️ |

## Notes

- Flow: the model analyzes the prompt, automatically generates one or more search queries when it decides search helps, processes the results, and returns a grounded response with inline `annotations` plus `google_search_call` / `google_search_result` steps.
- Pricing (Gemini 3 and newer): billed for each search query the model executes; 5,000 free search requests per month shared across all Gemini 3 and newer models, then $14 per 1,000 search requests. Multiple queries in one call count as multiple billable uses; empty web search queries are ignored. Gemini 2.5 or older models are billed per prompt.
- The source JS example reads `annotation.startIndex` / `annotation.endIndex`; changed to `start_index` / `end_index` to match the response JSON and the `URLCitation` type in `@google/genai` 2.30.0 (`startIndex` would be undefined and `slice` would silently return the whole text).
- Older models use a `google_search_retrieval` tool; for all current models use `google_search`.
- Can be combined with code execution, URL context, and Grounding with Google Maps (Gemini 3.5 Flash-Lite and later). Gemini 3 models can also combine built-in tools with function calling (see tool-combination).
- Migration (May 2026 breaking changes): server-side tool results are now tool-specific steps in `steps` (`google_search_call`, `google_search_result`) rather than content types in the legacy `outputs` array.
- Distinct from `anthropic-api-tools-mcp` (Claude web search server tool) and `openai-agents` (OpenAI built-in web search); this is Gemini's `google_search` grounding tool.
- API surface: Interactions API; generateContent version is under `generate-content/` (grounding-tools). Docs fetched 2026-10-16.

## Related

- [tools-overview](./tools-overview.md)
- [url-context](./url-context.md)
- [maps-grounding](./maps-grounding.md)
- [tool-combination](./tool-combination.md)
