---
source: https://ai.google.dev/gemini-api/docs/generate-content/get-started
---

# Getting started (generateContent)

Quickstart for the legacy `generateContent` API: install the SDK, make a first request, stream, multi-turn chat, and tools.

## Signature / Usage

```python
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Explain how AI works in a few words"
)

print(response.text)
```

Install and key setup:

```bash
pip install -q -U google-genai
npm install @google/genai
export GEMINI_API_KEY="YOUR_API_KEY"
```

Streaming:

```python
response = client.models.generate_content_stream(
    model="gemini-3.8-flash",
    contents="Explain how AI works in detail"
)

for chunk in response:
    print(chunk.text, end="", flush=True)
```

```javascript
async function main() {
  const responseStream = await ai.models.generateContentStream({
    model: "gemini-3.8-flash",
    contents: "Explain how AI works in detail",
  });

  for await (const chunk of responseStream) {
    process.stdout.write(chunk.text);
  }
}

main();
```

Multi-turn with the `chats` helper:

```python
chat = client.chats.create(model="gemini-3.8-flash")

response1 = chat.send_message("I have 2 dogs in my house.")
print("Response 1:", response1.text)

response2 = chat.send_message("How many paws are in my house?")
print("Response 2:", response2.text)
```

Google Search tool:

```python
from google import genai
from google.genai import types

config = types.GenerateContentConfig(
    tools=[types.Tool(google_search=types.GoogleSearch())]
)

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Who won the euro 2024?",
    config=config
)

print(response.text)
```

Custom function declaration:

```python
weather_function = {
    "name": "get_current_temperature",
    "description": "Gets the current temperature for a given location.",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The city name, e.g. San Francisco",
            },
        },
        "required": ["location"],
    },
}

tools = types.Tool(function_declarations=[weather_function])
config = types.GenerateContentConfig(tools=[tools])
```

```bash
# REST is stateless. You must pass the full conversation history in the request.
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "I have 2 dogs in my house."}]
      },
      {
        "role": "model",
        "parts": [{"text": "That is nice! Two dogs mean you have plenty of company."}]
      },
      {
        "role": "user",
        "parts": [{"text": "How many paws are in my house?"}]
      }
    ]
  }'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `model` | string | Model ID, e.g. `gemini-3.8-flash` |
| `contents` | string / Content[] | Prompt or full conversation history |
| `config` | `types.GenerateContentConfig` (Python) / object (JS) | Holds `tools` and other options |
| `tools` | Tool[] | `google_search` / `googleSearch`, `function_declarations` / `functionDeclarations` |

## Notes

- Source text: "This guide will help you get started using the legacy **generateContent** API. For new projects and applications, we strongly recommend using the new **Interactions API** instead."
- API surface: generateContent. REST endpoints: `:generateContent` and `:streamGenerateContent` (use `--no-buffer`).
- Python 3.9+ and Node.js v18+ are the stated prerequisites.
- Paid tier: set up Cloud Billing and prepay a minimum of $5 (or currency equivalent) in paid credits, per the source text.
- Other built-in tools named on the page: Code execution, URL context, File search, Google Maps, Computer use.
- Function calling: the model returns a `functionCall`; append the model content and a `functionResponse` part (with the call `id`), then call again.
- Distinct from OpenAI Responses API (openai-api-core skill) and Anthropic Messages API (anthropic-api-core skill).

## Related

- [generateContent overview](./overview.md)
- [Text generation (generateContent)](./text-generation.md)
- [Function calling (generateContent)](./function-calling.md)
