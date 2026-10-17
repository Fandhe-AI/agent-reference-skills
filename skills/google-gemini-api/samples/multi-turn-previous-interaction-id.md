---
source: https://ai.google.dev/gemini-api/docs/text-generation
---

# Multi-turn Conversation with previous_interaction_id

Chain interactions with `previous_interaction_id` so the API manages conversation history server-side.

```python
from google import genai

client = genai.Client()

interaction1 = client.interactions.create(
    model="gemini-3.8-flash",
    input="I have 2 dogs in my house.",
)
print(interaction1.output_text)

interaction2 = client.interactions.create(
    model="gemini-3.8-flash",
    input="How many paws are in my house?",
    previous_interaction_id=interaction1.id,
)
print(interaction2.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const interaction1 = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "I have 2 dogs in my house.",
  });
  console.log("Response 1:", interaction1.output_text);

  const interaction2 = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "How many paws are in my house?",
    previous_interaction_id: interaction1.id,
  });
  console.log("Response 2:", interaction2.output_text);
}

await main();
```

```bash
RESPONSE1=$(curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "I have 2 dogs in my house."
  }')

INTERACTION_ID=$(echo "${RESPONSE1}" | jq -r '.id')

curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "How many paws are in my house?",
    "previous_interaction_id": "'"${INTERACTION_ID}"'"
  }'
```

## Notes

- Each turn is a separate interaction; pass the previous `id` to continue the conversation.
- The official REST tab restates the first turn in the second input; it is aligned with the Python/JS examples here so the context comes from `previous_interaction_id`.
- Variable expansions use the `"${var}"` form; the official snippet writes `$GEMINI_API_KEY`.
- Streaming can be combined with `previous_interaction_id` for multi-turn conversations.
- The same guide also documents a stateless mode (resending history yourself) as an alternative.
