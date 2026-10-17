---
source: https://ai.google.dev/api/tokens
---

# Counting tokens (models.countTokens)

Runs a model's tokenizer on input `Content` and returns the token count.

## Signature / Usage

```text
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:countTokens
```

```python
from google import genai

client = genai.Client()
prompt = "The quick brown fox jumps over the lazy dog."

# Count tokens using the new client method.
total_tokens = client.models.count_tokens(
    model="gemini-3.8-flash", contents=prompt
)
print("total_tokens: ", total_tokens)
# ( e.g., total_tokens: 10 )
```

```javascript
// Make sure to include the following import:
// import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const prompt = 'The quick brown fox jumps over the lazy dog.';
const countTokensResponse = await ai.models.countTokens({
  model: 'gemini-3.8-flash',
  contents: prompt,
});
console.log(countTokensResponse.totalTokens);
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:countTokens" \
    -H "x-goog-api-key: ${GEMINI_API_KEY}" \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
      "contents": [{
        "parts":[{
          "text": "The quick brown fox jumps over the lazy dog."
          }]
        }]
      }'
```

## Options / Props

Path parameter and request body:

| Name | Type | Description |
|------|------|-------------|
| model (path) | string | Required. The model's resource name; should match a name returned by `models.list`. Format: `models/{model}`. |
| contents[] | object (Content) | Optional. The input given to the model as a prompt. Ignored when `generateContentRequest` is set. |
| generateContentRequest | object (GenerateContentRequest) | Optional. The overall input given to the `Model`, including system instructions and function declarations. `Content`s and `generateContentRequest` are mutually exclusive: send one or the other, never both. |

Response body (`CountTokensResponse`):

| Name | Type | Description |
|------|------|-------------|
| totalTokens | integer | The number of tokens that the `Model` tokenizes the `prompt` into. Always non-negative. |
| cachedContentTokenCount | integer | Number of tokens in the cached part of the prompt (the cached content). |
| promptTokensDetails[] | object (ModalityTokenCount) | Output only. List of modalities that were processed in the request input. |
| cacheTokensDetails[] | object (ModalityTokenCount) | Output only. List of modalities that were processed in the cached content. |

## Notes

- Availability: v1beta. The source page also shows example requests for Text, Chat, Inline media, Video, PDF, Cache, System Instruction, and Tools.
- For how images, audio and video are counted, see the Token counting guide referenced from the source page.
- The REST example quotes the URL, sends the key as a header, and removes the trailing commas that the source's JSON body contains.
- Docs fetched 2026-10-16.

## Related

- [Generating content](./generate-content.md)
- [Caching](./caching.md)
- [Models](./models.md)
