---
source: https://ai.google.dev/gemini-api/docs/maps-grounding
---

# Grounding with Google Maps

Grounding with Google Maps connects Gemini with Google Maps data so the model can give factual, up-to-date, location-aware answers. Enable it with the `google_maps` tool, optionally passing `latitude` and `longitude`.

## Signature / Usage

```python
# This will only work for SDK newer than 2.0.0
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="What are the best Italian restaurants within a 15-minute walk from here?",
    tools=[{
        "type": "google_maps",
        "latitude": 34.050481,
        "longitude": -118.248526
    }]
)

# Print the model's text response and annotations
for step in interaction.steps:
    if step.type == "model_output":
        for content_block in step.content:
            if content_block.type == "text":
                print(content_block.text)
                if content_block.annotations:
                    print("\nSources:")
                    for annotation in content_block.annotations:
                        if annotation.type == "place_citation":
                            print(f"  - {annotation.name}: {annotation.url}")
```

```javascript
// This will only work for SDK newer than 2.0.0
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "Is there a cafe near the corner of 1st and Main that has outdoor seating?",
    tools: [{
      type: "google_maps",
      latitude: 34.050481,
      longitude: -118.248526
    }]
  });

  for (const step of interaction.steps) {
    if (step.type === 'model_output') {
      for (const contentBlock of step.content) {
        if (contentBlock.type === 'text') {
          console.log(contentBlock.text);
          if (contentBlock.annotations) {
            console.log("\nSources:");
            for (const annotation of contentBlock.annotations) {
              if (annotation.type === 'place_citation') {
                console.log(`  - ${annotation.name}: ${annotation.url}`);
              }
            }
          }
        }
      }
    }
  }
}

main();
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "What are the best Italian restaurants within a 15-minute walk from here?",
    "tools": [{
      "type": "google_maps",
      "latitude": 34.050481,
      "longitude": -118.248526
    }]
  }'
```

## Options / Props

`google_maps` tool fields (from the examples):

| Name | Type | Description |
|------|------|-------------|
| `type` | string | `"google_maps"` |
| `latitude` | number | Optional user latitude. Local queries ("near me") use the coordinates; specific or non-local queries are unlikely to be influenced |
| `longitude` | number | Optional user longitude |

Pricing:

| Models | Billing |
|---|---|
| Gemini 3 and newer | Billed for each search query the model executes; 5,000 free requests per month shared across all Gemini 3 and newer models, then $14 per 1,000 search queries |
| Gemini 2.5 and older | Billed per search prompt ($25 per 1,000 grounded prompts); billed only if the prompt returns at least one Google Maps grounded result |

Supported models: Gemini 3.8 Flash, Gemini 3.6 Flash, Gemini 3.5 Flash-Lite, Gemini 3.1 Pro Preview, Gemini 3.1 Flash-Lite, Gemini 3 Flash Preview, Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.5 Flash-Lite.

## Notes

- The tool is a textual search tool and behaves similarly to searching on Maps. The response contains inline annotations (`place_citation`, with `name` and `url`) on the `model_output` step's content blocks.
- Service usage requirements: Google Maps sources must immediately follow the generated content they support and be viewable within one user interaction. For each source annotation, generate a link preview: attribute to Google Maps per the text attribution guidelines, display the source name, and link using the annotation `url`.
- Attribution text: do not change the capitalization of Google Maps, do not wrap it onto multiple lines, do not localize it; prevent browser translation with the HTML attribute `translate="no"`.
- Best practices: include `latitude` and `longitude` when the user's location is known; inform end-users that Google Maps data is used; the tool is off by default, so enable it (`"tools": [{"type": "google_maps"}]`) only for queries with a clear geographical context.
- Limitations: currently only English language prompts and responses; results vary with location accuracy and Maps data; off by default. The source states both that the tool "may not be available in all regions" and that its geographical scope is "globally available" (data coverage); check availability for your region.
- Quota typically aligns with the underlying Gemini model rate limits.
- Can be combined with Grounding with Google Search (Gemini 3.5 Flash-Lite and later); Gemini 3 models can also combine built-in tools with function calling (see tool-combination). Tool-specific data in combination flows: call args `queries`, response `places` and `google_maps_widget_context_token`.
- API surface: Interactions API; generateContent version is under `generate-content/` (grounding-tools). Docs fetched 2026-10-16.

## Related

- [tools-overview](./tools-overview.md)
- [google-search](./google-search.md)
- [tool-combination](./tool-combination.md)
