---
source: https://ai.google.dev/gemini-api/docs/migrate-to-interactions
---

# Migrate generateContent to Interactions

Before/after pairs for basic text generation and multi-turn conversations.

```python
# Before (generateContent): basic
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.5-flash-lite", contents="Tell me a joke."
)
print(response.text)
```

```python
# After (Interactions API): basic
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash", input="Tell me a joke."
)

print(interaction.output_text)
```

```python
# Before (generateContent): multi-turn with the chat helper
from google import genai

client = genai.Client()

chat = client.chats.create(model="gemini-2.5-flash-lite")
response1 = chat.send_message("Hi, my name is Phil.")
print(response1.text)

response2 = chat.send_message("What is my name?")
print(response2.text)
```

```python
# After (Interactions API): multi-turn
from google import genai

client = genai.Client()

interaction1 = client.interactions.create(
    model="gemini-3.8-flash", input="Hi, my name is Phil."
)
print("Response 1:", interaction1.output_text)

interaction2 = client.interactions.create(
    model="gemini-3.8-flash",
    previous_interaction_id=interaction1.id,
    input="What is my name?",
)
print("Response 2:", interaction2.output_text)
```

```javascript
// Before (generateContent)
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents: "Tell me a joke.",
});
console.log(response.text);

// After (Interactions API)
const client = new GoogleGenAI({});

let interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: 'Tell me a joke.'
});

console.log(interaction.output_text);
```

## Notes

- `generateContent` remains fully supported; Interactions is recommended for new development. The Interactions API stores interactions by default (`store=true`); set `store=false` for stateless behavior.
- `generateContent` wraps output in `candidates` / `content` / `parts`; Interactions returns an `Interaction` with a `steps` timeline and convenience properties such as `.output_text`.
- `.output_text` joins only the trailing text blocks; for interleaved multimodal output iterate over `steps`.
- Model IDs (`gemini-2.5-flash-lite` before, `gemini-3.8-flash` after) are kept as written in the official guide. The guide also covers multimodal inputs, structured output, multimodal generation, and server-side tools.
