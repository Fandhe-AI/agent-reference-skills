---
source: https://ai.google.dev/gemini-api/docs/generate-content/tokens
---

# Understand and count tokens (generateContent)

All input to and output from the Gemini API is tokenized. For Gemini models a token is about 4 characters; 100 tokens is about 60-80 English words. Count with `count_tokens` (input only) or read `usage_metadata` on the response.

## Signature / Usage

```python
from google import genai

client = genai.Client()
prompt = "The quick brown fox jumps over the lazy dog."

total_tokens = client.models.count_tokens(
    model="gemini-3.8-flash", contents=prompt
)
print("total_tokens: ", total_tokens)

response = client.models.generate_content(
    model="gemini-3.8-flash", contents=prompt
)

print(response.usage_metadata)
```

```javascript
const countTokensResponse = await ai.models.countTokens({
  model: "gemini-3.8-flash",
  contents: prompt,
});
console.log(countTokensResponse.totalTokens);

const generateResponse = await ai.models.generateContent({
  model: "gemini-3.8-flash",
  contents: prompt,
});
console.log(generateResponse.usageMetadata);
```

Multimodal (uploaded image) and thought tokens:

```python
prompt = "Tell me about this image"
your_image_file = client.files.upload(file=media / "organ.jpg")

print(
    client.models.count_tokens(
        model="gemini-3.8-flash", contents=[prompt, your_image_file]
    )
)

print("Thoughts tokens:", response.usage_metadata.thoughts_token_count)
print("Output tokens:", response.usage_metadata.candidates_token_count)
```

Context window:

```python
model_info = client.models.get(model="gemini-3.8-flash")
print(f"{model_info.input_token_limit=}")
print(f"{model_info.output_token_limit=}")
```

## Options / Props

`usage_metadata` fields named in the source:

| Field | Description |
| --- | --- |
| `prompt_token_count` | Input tokens |
| `cached_content_token_count` | Cached content tokens (context caching) |
| `candidates_token_count` | Output tokens |
| `thoughts_token_count` (`thoughtsTokenCount`) | Thinking tokens (when thinking is on) |
| `tool_use_prompt_token_count` | Tokens loaded on demand by tools (agentic video: transcript, frames, audio) |
| `total_token_count` | Input plus output |

Video token usage by processing mode:

| Processing mode | Token calculation | Typical usage |
| --- | --- | --- |
| Static (default) | ~100 tokens/second by default (low resolution) or ~300 tokens/second (high resolution); frames sampled at 1 FPS | Predictable, proportional to video duration |
| Agentic | Varies by content complexity; loads only the transcript and/or frames and/or audio needed | Up to 88% fewer tokens for long-form content |

## Notes

- API surface: generateContent tree (`models.countTokens`; `count_tokens` in Python, `countTokens` in JavaScript, `CountTokens` in Go).
- Image inputs with both dimensions <=384 pixels count as 258 tokens; larger images are cropped and scaled into 768x768 tiles of 258 tokens each. The multimodal section also says video 263 tokens per second and audio 32 tokens per second for static processing (the video-understanding section of the same site states approximately 100 or 300 tokens per second for video; both statements are in the source).
- Agentic video example from the source: a 1-hour lecture of ~1.08M tokens in static mode might use ~108K tokens in agentic mode. Agentic tokens: initial prompt in `prompt_token_count`, navigation thinking in `thoughts_token_count`, on-demand data in `tool_use_prompt_token_count`, final answer in `candidates_token_count`.
- Thinking pricing is based on the full thought tokens; summaries are in free and paid tiers; thought signatures sent back increase input tokens. For Gemini 3 `media_resolution` bounds per-image or per-frame tokens.
- For multi-turn counting, append the next turn to the history when calling `count_tokens`.

## Related

- [Thinking (generateContent)](./thinking.md)
- [Multimodal understanding (generateContent)](./multimodal-understanding.md)
