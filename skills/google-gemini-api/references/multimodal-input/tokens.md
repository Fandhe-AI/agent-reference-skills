---
source: https://ai.google.dev/gemini-api/docs/tokens
---

# Understand and count tokens

Gemini input and output are processed in tokens: about 4 characters per token; 100 tokens is about 60-80 English words. Count tokens before sending with `count_tokens`, or read `usage` from the interaction response.

## Signature / Usage

Python:

```python
# This will only work for SDK newer than 2.0.0
from google import genai

client = genai.Client()
prompt = "The quick brown fox jumps over the lazy dog."

# Count tokens before sending
total_tokens = client.models.count_tokens(
    model="gemini-3.8-flash",
    contents=prompt
)
print("total_tokens:", total_tokens.total_tokens)

# Get usage from interaction
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=prompt
)
print(interaction.usage)
```

JavaScript:

```javascript
// This will only work for SDK newer than 2.0.0
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({});
const prompt = "The quick brown fox jumps over the lazy dog.";

// Count tokens before sending
const countResponse = await client.models.countTokens({
    model: "gemini-3.8-flash",
    contents: prompt,
});
console.log(countResponse.totalTokens);

// Get usage from interaction
const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
});
console.log(interaction.usage);
```

REST:

```bash
# Specifies the API revision to avoid breaking changes when they become default
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:countTokens" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents": [{"parts": [{"text": "The quick brown fox."}]}]}'
```

Multimodal (image + text), Python:

```python
# This will only work for SDK newer than 2.0.0
uploaded_file = client.files.upload(file="path/to/image.jpg")

# Count tokens for image + text
total_tokens = client.models.count_tokens(
    model="gemini-3.8-flash",
    contents=["Tell me about this image", uploaded_file]
)
print(f"Total tokens: {total_tokens}")

# Generate with image
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "Tell me about this image"},
        {"type": "image", "uri": uploaded_file.uri, "mime_type": uploaded_file.mime_type}
    ]
)
print(interaction.usage)
```

System instructions and tools count as input tokens (Python):

```python
# This will only work for SDK newer than 2.0.0
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Hello!",
    system_instruction="You are a helpful assistant who speaks like a pirate."
)

# system_instruction tokens included in total_input_tokens
print(f"Input tokens: {interaction.usage.total_input_tokens}")
```

```python
tools = [
    {
        "type": "function",
        "name": "get_weather",
        "description": "Get current weather",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string"}
            }
        }
    }
]

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="What's the weather in Tokyo?",
    tools=tools
)

print(f"Input tokens: {interaction.usage.total_input_tokens}")
print(f"Tool use tokens: {interaction.usage.total_tool_use_tokens}")
```

Context window size from model info (Python / JavaScript):

```python
# This will only work for SDK newer than 2.0.0
model_info = client.models.get(model="gemini-3.8-flash")
print(f"Input token limit: {model_info.input_token_limit}")
print(f"Output token limit: {model_info.output_token_limit}")
```

```javascript
// This will only work for SDK newer than 2.0.0
const modelInfo = await client.models.get({ model: "gemini-3.8-flash" });
console.log(`Input token limit: ${modelInfo.inputTokenLimit}`);
console.log(`Output token limit: ${modelInfo.outputTokenLimit}`);
```

## Options / Props

`interaction.usage` fields:

| Name | Description |
|------|-------------|
| `total_input_tokens` | Input tokens (includes system instruction and tool definitions) |
| `total_output_tokens` | Output tokens |
| `total_thought_tokens` | Thinking tokens |
| `total_cached_tokens` | Cached content tokens |
| `total_tool_use_tokens` | Tool use tokens |
| `total_tokens` | Total |

Video token usage by processing mode:

| Processing mode | Token calculation | Typical usage |
|---|---|---|
| Static (default) | ~100 tokens/second by default (low resolution) or ~300 tokens/second (high resolution). All frames sampled at 1 FPS. | Predictable, proportional to video duration. |
| Agentic | Varies by content complexity. The model loads only the transcript and/or frames and/or audio needed to answer the prompt. | Up to 88% fewer tokens for long-form content. |

## Notes

- For Gemini 3 models media-resolution.md lists different per-media token counts (e.g. audio 25 tokens/s vs 32 tokens/s here).
- `count_tokens` returns the total number of tokens in the input only; call it before sending to check request size. Multi-turn counting works across conversation history using `previous_interaction_id`.
- Multimodal tokenization: images <= 384 pixels in both dimensions count as 258 tokens, larger images are tiled into 768x768 tiles of 258 tokens each; video 263 tokens per second (static processing); audio 32 tokens per second.
- Agentic video: a 1-hour lecture that would use ~1.08M tokens in static mode might use ~108K tokens. Agentic tokens are reported in `total_input_tokens` (video reference + prompt), `total_thought_tokens` (navigation thinking), `total_tool_use_tokens` (transcript, frames, audio loaded on demand) and `total_output_tokens` (final answer). Static estimates assume 1 FPS; a custom frame rate scales token usage proportionally.
- Audio example from the page: a 60-second clip is approximately `32 * 60 = 1,920` tokens; a 60-second video is approximately `100 * 60 = 6,000` tokens. The ~100 tokens/s video figure (code comment and processing-mode table on the source page) is inconsistent with the 263 tokens per second rate stated on the same page (static processing).
- The context window defines the combined limit of input and output tokens; sizes are on the Models page.
- The `count_tokens` snippets are marked "This will only work for SDK newer than 2.0.0".
- Page also has Java and Go examples; not reproduced here.
- API availability: `models.countTokens` (v1beta REST) alongside Interactions API `usage`. A separate tokens page exists in the generate-content category. Docs fetched 2026-10-16.

## Related

- [media-resolution](./media-resolution.md)
- [long-context](./long-context.md)
- [video-understanding](./video-understanding.md)
