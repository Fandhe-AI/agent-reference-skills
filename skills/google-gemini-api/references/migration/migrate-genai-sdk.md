---
source: https://ai.google.dev/gemini-api/docs/migrate
---

# Migrate to the Google GenAI SDK

Before-and-after guide for moving from the legacy Gemini libraries (`google-generativeai`, `@google/generative-ai`, `github.com/google/generative-ai-go`, `com.google.ai.client.generativeai`) to the Google GenAI SDK, introduced with the Gemini 2.0 release in late 2024 and now GA across all supported platforms.

## Signature / Usage

Installation (before / after):

```bash
# Before
pip install -U -q "google-generativeai"
npm install @google/generative-ai
go get github.com/google/generative-ai-go

# After
pip install -U -q "google-genai"
npm install @google/genai
go get google.golang.org/genai
```

Client architecture: the old SDK handled the API client implicitly; the new SDK uses a central `Client` object (`models`, `chats`, `files`, `tunings`, ...).

```python
# Before
import google.generativeai as genai

genai.configure(api_key=...)
model = genai.GenerativeModel('gemini-3.8-flash')
response = model.generate_content('Tell me a story in 300 words')
```

```python
# After
from google import genai

client = genai.Client() # Set the API key using the GEMINI_API_KEY env var.
                        # Alternatively, you could set the API key explicitly:
                        # client = genai.Client(api_key="YOUR_API_KEY")

response = client.models.generate_content(
    model='gemini-3.8-flash',
    contents='Tell me a story in 300 words.'
)
print(response.text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```

```go
import "google.golang.org/genai"

client, err := genai.NewClient(ctx, &genai.ClientConfig{
        Backend:  genai.BackendGeminiAPI,
})
```

Configuration: optional inputs move to a `config` argument (dict or `google.genai.types` `Config` classes; all `types` are `pydantic` classes).

```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
  model='gemini-3.8-flash',
  contents='Tell me a story in 100 words.',
  config=types.GenerateContentConfig(
      system_instruction='you are a story teller for kids under 5 years old',
      max_output_tokens= 400,
      top_k= 2,
      top_p= 0.5,
      temperature= 0.5,
      response_mime_type= 'application/json',
      stop_sequences= ['\n'],
      seed=42,
  ),
)
```

Chat:

```python
from google import genai

client = genai.Client()

chat = client.chats.create(model='gemini-3.8-flash')

response = chat.send_message(
    message='Tell me a story in 100 words')
response = chat.send_message(
    message='What happened after that?')
```

Function calling: automatic function calling is the default in `generate_content`; disable it explicitly.

```python
response = client.models.generate_content(
  model='gemini-3.8-flash',
  contents="What is the weather like in Boston?",
  config=types.GenerateContentConfig(
      tools=[get_current_weather],
      automatic_function_calling={'disable': True},
  ),
)

function_call = response.candidates[0].content.parts[0].function_call
```

## Options / Props

Sections covered by the guide (each with before/after snippets per language):

| Section | Notes from the source |
|---------|-----------------------|
| Installation | Java dependency changes from `com.google.ai.client.generativeai:generativeai` (`0.9.0`) to `com.google.genai:google-genai` (`1.67.0` as written in the source) |
| API access | Single `Client` entry point; JS used to need separate `GoogleAIFileManager` / `GoogleAICacheManager` classes |
| Authentication | Both legacy and new libraries use API keys; new Python SDK reads `GEMINI_API_KEY`; Go uses `genai.ClientConfig{Backend: genai.BackendGeminiAPI}` |
| Generate content | Text, image, streaming |
| Configuration | `system_instruction`, `generation_config` -> `config=types.GenerateContentConfig(...)` |
| Safety settings, Async | Covered with before/after |
| Chat | `model.start_chat()` -> `client.chats.create(model=...)`; `send_message(message=...)` |
| Function calling | Automatic function calling default; old SDK supported it only in chat |
| Code execution, Search grounding, JSON response | Covered with before/after |
| Files, Context caching, Count tokens | Covered with before/after |
| Generate images, Embed content | Covered with before/after |

## Notes

- Availability: `generateContent` API surface of the Google GenAI SDK (the guide's snippets use `client.models.generate_content`). For moving from `generateContent` to the Interactions API see `migrate-to-interactions.md`.
- Except for a few stateful special cases (`chat` and live-api `session`s), the new SDK's functions are stateless.
- The source passes the literal string `"GEMINI_API_KEY"` as `apiKey`; it is read from the `GEMINI_API_KEY` environment variable here.
- The Configuration example sets `temperature` / `top_p` / `top_k` on `gemini-3.8-flash` as in the source; from Gemini 3.6 onward these sampling parameters are deprecated and ignored (future generations return HTTP 400), so drop them when migrating (see models/whats-new-gemini-3-6.md).
- All required arguments are keyword arguments; all optional inputs go in `config`.
- The Go examples omit imports and other boilerplate (as stated in the source).
- Java version `1.67.0` is transcribed from the source; SDK versions measured on 2026-10-16 were `com.google.genai:google-genai` 1.57.0 (Maven), `google-genai` 2.31.0 (PyPI), `@google/genai` 2.30.0 (npm), `google.golang.org/genai` v1.75.0, `Google.GenAI` 1.26.1 (NuGet). Do not treat the source's example version as current.
- This is a client SDK migration for the Gemini Developer API; the OpenAI SDK compatibility layer is a separate page (see `openai-compatibility.md`; OpenAI's own SDK is covered by openai-api-core).

## Related

- [migrate-to-interactions.md](./migrate-to-interactions.md)
- [developer-api-vs-platform.md](./developer-api-vs-platform.md)
- [openai-compatibility.md](./openai-compatibility.md)
