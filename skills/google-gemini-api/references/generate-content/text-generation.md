---
source: https://ai.google.dev/gemini-api/docs/generate-content/text-generation
---

# Text generation (generateContent)

The Gemini API can generate text output from text, images, video, and audio inputs, via `generateContent` (single response) or `streamGenerateContent` (SSE chunks).

## Signature / Usage

```python
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="How does AI work?"
)
print(response.text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: "How does AI work?",
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
            "text": "How does AI work?"
          }
        ]
      }
    ]
  }'
```

Thinking level:

```python
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="How does AI work?",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_level="low")
    ),
)
```

System instruction and generation config:

```python
response = client.models.generate_content(
    model="gemini-3.8-flash",
    config=types.GenerateContentConfig(
        system_instruction="You are a cat. Your name is Neko."),
    contents="Hello there"
)
```

```javascript
const response = await ai.models.generateContent({
  model: "gemini-3.8-flash",
  contents: "Explain how AI works",
  config: {
    maxOutputTokens: 1000,
  },
});
```

Multimodal input (image):

```python
from PIL import Image
from google import genai

client = genai.Client()

image = Image.open("/path/to/organ.png")
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=[image, "Tell me about this instrument"]
)
print(response.text)
```

Streaming:

```python
response = client.models.generate_content_stream(
    model="gemini-3.8-flash",
    contents=["Explain how AI works"]
)
for chunk in response:
    print(chunk.text, end="")
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  --no-buffer \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works"
          }
        ]
      }
    ]
  }'
```

Multi-turn chat (SDK-only helper):

```python
chat = client.chats.create(model="gemini-3.8-flash")

response = chat.send_message("I have 2 dogs in my house.")
print(response.text)

response = chat.send_message("How many paws are in my house?")
print(response.text)

for message in chat.get_history():
    print(f'role - {message.role}',end=": ")
    print(message.parts[0].text)
```

```javascript
const chat = ai.chats.create({
  model: "gemini-3.8-flash",
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});

const response1 = await chat.sendMessage({
  message: "I have 2 dogs in my house.",
});
```

Typical response body:

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "At its core, Artificial Intelligence works by learning from vast amounts of data ..."
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 1
    }
  ]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `contents` | Content[] (REST) / string / parts (SDK) | One `Content` per conversation turn; `role` alternates `user` / `model` |
| `Content` | object | Top-level container for a message turn |
| `Part` | object | Piece of data in a `Content` (text, image, video URI, ...) |
| `inline_data` (`Blob`) | object | Raw media bytes and MIME type, for small embedded media |
| `file_data` | object | Reference to a file uploaded with the File API, for larger or reused files |
| `system_instruction` / `systemInstruction` | Content | Guides model behavior via `GenerateContentConfig` |
| `thinking_config` / `thinkingConfig` | ThinkingConfig | `thinking_level` (e.g. `"low"`) |
| `max_output_tokens` / `maxOutputTokens` | integer | Generation parameter override |
| `stopSequences` | string[] | REST `generationConfig` field |

## Notes

- API surface: generateContent. Compare with the Interactions API tree text-generation page (`client.interactions.create`) in interactions-core.
- Source note: "The `temperature`, `top_p`, and `top_k` parameters ... we strongly recommend keeping them at their default values for Gemini 3.x models. Changing these parameters (for example, setting the temperature below 1.0) can cause unexpected behavior, such as looping or degraded performance, particularly in complex mathematical or reasoning tasks."
- Source note: "Chat functionality is only implemented as part of the SDKs. Behind the scenes, it still uses the `generateContent` API. For multi-turn conversations, the full conversation history is sent to the model with each follow-up turn."
- REST is stateless: build `contents` by appending a `Content` per turn alternating `user` and `model`.
- Streaming and standard requests share an identical request body; streaming returns a stream of `GenerateContentResponse` instances tied by `responseId`. In Java, close the `ResponseStream` after consumption. Chat history for streaming is added after the stream is consumed.
- Live API (`BidiGenerateContent`, WebSocket) is a separate stateful bidirectional API.
- The page also has Go, Java, and Apps Script tabs (Apps Script is available only on this generateContent tree).
- Distinct from OpenAI Responses API (openai-api-core skill) and Anthropic Messages API (anthropic-api-core skill).

## Related

- [Thinking (generateContent)](./thinking.md)
- [Structured outputs (generateContent)](./structured-output.md)
- [Multimodal understanding (generateContent)](./multimodal-understanding.md)
