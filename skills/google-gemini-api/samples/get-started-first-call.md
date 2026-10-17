---
source: https://ai.google.dev/gemini-api/docs/get-started
---

# First Interactions API Call

Install the SDK and generate text with a single `interactions.create` call.

```bash
export GEMINI_API_KEY="YOUR_API_KEY"
pip install -U google-genai
```

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
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Explain how AI works in a few words"
  }'
```

## Notes

- Interactions API (recommended for new projects). The JavaScript package is `@google/genai`; the Python package is `google-genai`.
- Model ID `gemini-3.8-flash` is kept as written in the official guide.
- REST returns the full `Interaction` resource (metadata, usage, step history); the SDKs expose `output_text`.
- Variable expansions use the `"${var}"` form; the official snippet writes `$GEMINI_API_KEY`.
- Distinct from the OpenAI Responses API (openai-api-core) and the Anthropic Messages API (anthropic-api-core).
