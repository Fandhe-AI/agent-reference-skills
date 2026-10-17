---
source: https://ai.google.dev/gemini-api/docs/generate-content
---

# generateContent overview

The Gemini API is the fastest path from prompt to production with Gemini, Veo, Nano Banana, and more. This page shows the basic `generateContent` request in each SDK language and REST.

## Signature / Usage

```python
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Explain how AI works in a few words",
)

print(response.text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'
```

## Notes

- API surface: generateContent (`client.models.generate_content(...)`, REST `v1beta/models/<model>:generateContent`). This is the legacy tree; the Interactions API (`client.interactions.create(...)`) is the recommended surface for new projects (see the get-started page of this category).
- The page also shows Go (`client.Models.GenerateContent`), Java (`client.models.generateContent`) and C# (`client.Models.GenerateContentAsync`) variants of the same request.
- Distinct from OpenAI Responses API (openai-api-core skill) and Anthropic Messages API (anthropic-api-core skill).
- Docs fetched 2026-10-16. Model cards and capability links on the source page: models, Nano Banana image generation, long context, structured outputs, function calling, Veo 3.1 video, Live API voice agents, tools (Google Search, URL Context, Google Maps, Code Execution, Computer Use), document understanding, thinking.

## Related

- [Getting started (generateContent)](./get-started.md)
- [Text generation (generateContent)](./text-generation.md)
