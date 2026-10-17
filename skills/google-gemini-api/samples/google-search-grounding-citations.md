---
source: https://ai.google.dev/gemini-api/docs/google-search
---

# Google Search Grounding with Citations

Enable the `google_search` tool and read inline `url_citation` annotations from the response.

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Who won the euro 2024?",
    tools=[{"type": "google_search"}]
)

print(interaction.output_text)

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
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Who won the euro 2024?",
    "tools": [{"type": "google_search"}]
  }'
```

## Notes

- The model decides whether to search; `url_citation` annotations on the text block carry `start_index` / `end_index`, `title`, and `url`.
- The Python and JavaScript snippets are separate official examples; the citation loop reads the `interaction` returned by the first call.
- Variable expansions use the `"${var}"` form; the official snippet writes `$GEMINI_API_KEY`.
- Can be combined with the URL context tool.
- Built-in grounding tool; not comparable to MCP-based tools in anthropic-api-tools-mcp or openai-agents.
