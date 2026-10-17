---
source: https://ai.google.dev/api/generate-content
---

# Generating content (models.generateContent / streamGenerateContent)

REST reference for `models.generateContent` (full response) and `models.streamGenerateContent` (streamed response), plus the `GenerateContentResponse`, `Candidate`, `Content` / `Part`, and `GenerationConfig` data models.

## Signature / Usage

```text
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:generateContent
POST https://generativelanguage.googleapis.com/v1beta/{model=models/*}:streamGenerateContent
```

Python:

```python
from google import genai

client = genai.Client()
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Write a story about a magic backpack.",
)
print(response.text)
```

Node.js:

```javascript
// Make sure to include the following import:
// import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'Write a story about a magic backpack.',
});
console.log(response.text);
```

Shell (REST):

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
      "contents": [{
        "parts":[{"text": "Write a story about a magic backpack."}]
        }]
       }' 2> /dev/null
```

Streaming (Shell, SSE):

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}" \
        -H 'Content-Type: application/json' \
        --no-buffer \
        -d '{ "contents":[{"parts":[{"text": "Write a story about a magic backpack."}]}]}'
```

## Options / Props

Path parameter:

| Name | Type | Description |
|------|------|-------------|
| model | string | Required. The name of the `Model` to use for generating the completion. Format: `models/{model}`. |

Request body (identical for both methods):

| Name | Type | Description |
|------|------|-------------|
| contents[] | object (Content) | Required. The content of the current conversation with the model. For single-turn queries, this is a single instance. For multi-turn queries like chat, this is a repeated field that contains the conversation history and the latest request. |
| tools[] | object (Tool) | Optional. A list of `Tools` the `Model` may use to generate the next response. Supported `Tool`s are `Function` and `codeExecution`. |
| toolConfig | object (ToolConfig) | Optional. Tool configuration for any `Tool` specified in the request. |
| safetySettings[] | object (SafetySetting) | Optional. A list of unique `SafetySetting` instances for blocking unsafe content. No more than one setting for each `SafetyCategory` type. Harm categories HARM_CATEGORY_HATE_SPEECH, HARM_CATEGORY_SEXUALLY_EXPLICIT, HARM_CATEGORY_DANGEROUS_CONTENT, HARM_CATEGORY_HARASSMENT, HARM_CATEGORY_CIVIC_INTEGRITY, HARM_CATEGORY_JAILBREAK are supported. |
| continuationToken | string (base64) | Optional. An opaque continuation token used to resume generation from a previous response that stopped with `finishReason` set to `CONTINUATION`. `contents` is mandatory and must identically replicate the prompt and conversation history from the initial request. |
| labels | map (key: string, value: string) | Optional. Labels with user-defined metadata (keys start with a letter; keys and values up to 63 characters; lowercase letters, numbers, underscores, dashes). Use the key `safety_identifier` for safety identifiers from aggregators. |
| systemInstruction | object (Content) | Optional. Developer set system instruction(s). Currently, text only. |
| generationConfig | object (GenerationConfig) | Optional. Configuration options for model generation and outputs. |
| cachedContent | string | Optional. The name of the content cached to use as context. Format: `cachedContents/{cachedContent}`. |
| serviceTier | enum (ServiceTier) | Optional. The service tier of the request: `unspecified` (default, standard), `standard`, `flex`, `priority`. |
| store | boolean | Optional. Configures the logging behavior for a given request. If set, it takes precedence over the project-level logging config. |

`GenerationConfig` fields:

| Name | Type | Description |
|------|------|-------------|
| stopSequences[] | string | Up to 5 character sequences that stop output generation. |
| responseMimeType | string | `text/plain` (default), `application/json`, `text/x.enum`. |
| responseSchema (deprecated) | object (Schema) | Deprecated. Use `responseFormat` instead. |
| _responseJsonSchema (deprecated) | value | Deprecated. Use `responseFormat` instead. |
| responseJsonSchema | value | Described in the source as "An internal detail. Use `responseJsonSchema` rather than this field." |
| responseModalities[] | enum (Modality) | The requested modalities of the response; an empty list is equivalent to requesting only text. |
| candidateCount | integer | Number of generated responses to return. Defaults to 1. |
| maxOutputTokens | integer | The maximum number of tokens to include in a response candidate. |
| temperature | number | Range [0.0, 2.0]. No longer supported and silently ignored on Gemini 3.6 Flash and newer models. |
| topP | number | Maximum cumulative probability of tokens to consider. Silently ignored on Gemini 3.6 Flash and newer models. |
| topK | integer | Maximum number of tokens to consider. Silently ignored on Gemini 3.6 Flash and newer models. |
| seed | integer | Seed used in decoding. |
| presencePenalty / frequencyPenalty | number | Penalties applied to the next token's logprobs. |
| responseLogprobs / logprobs | boolean / integer | Export logprobs; `logprobs` range [0, 20]. |
| enableEnhancedCivicAnswers | boolean | Enables enhanced civic answers. May not be available for all models. |
| speechConfig | object | The speech generation config. |
| thinkingConfig | object | Config for thinking features. Error if set for models that don't support thinking. |
| imageConfig | object | Config for image generation. |
| mediaResolution | enum | Media resolution to use. |
| enableAffectiveDialog | boolean | If enabled, the model will detect emotions and adapt its responses accordingly. |
| responseFormat | object (ResponseFormatConfig) | Configuration for the response output format, per modality (text, audio, image). |
| translationConfig | object | Config for translation. |
| audioTranscriptionConfig | object | Config for audio transcription (speech recognition). |

`GenerateContentResponse` fields: `candidates[]`, `promptFeedback` (`blockReason`, `safetyRatings[]`), `usageMetadata`, `modelVersion`, `responseId`, `modelStatus` (`modelStage`, `retirementTime`, `message`).

`UsageMetadata` fields: `promptTokenCount`, `cachedContentTokenCount`, `candidatesTokenCount`, `toolUsePromptTokenCount`, `thoughtsTokenCount`, `totalTokenCount`, `promptTokensDetails[]`, `cacheTokensDetails[]`, `candidatesTokensDetails[]`, `toolUsePromptTokensDetails[]`, `serviceTier`.

`Candidate` fields: `content`, `finishReason`, `safetyRatings[]`, `citationMetadata`, `tokenCount`, `groundingAttributions[]`, `groundingMetadata`, `avgLogprobs`, `logprobsResult`, `urlContextMetadata`, `continuationToken`, `index`, `finishMessage`.

`BlockReason` values: `BLOCK_REASON_UNSPECIFIED`, `SAFETY`, `OTHER`, `BLOCKLIST`, `PROHIBITED_CONTENT`, `IMAGE_SAFETY`.

`FinishReason` values: `FINISH_REASON_UNSPECIFIED`, `STOP`, `MAX_TOKENS`, `SAFETY`, `RECITATION`, `LANGUAGE`, `OTHER`, `BLOCKLIST`, `PROHIBITED_CONTENT`, `SPII`, `MALFORMED_FUNCTION_CALL`, `IMAGE_SAFETY`, `IMAGE_PROHIBITED_CONTENT`, `IMAGE_OTHER`, `NO_IMAGE`, `IMAGE_RECITATION`, `UNEXPECTED_TOOL_CALL`, `TOO_MANY_TOOL_CALLS`, `MISSING_THOUGHT_SIGNATURE`, `MALFORMED_RESPONSE`, `ESCALATION`, `PUP_LIMITED_DISABLED`, `CONTINUATION` (generation stopped at the per-request token limit but is not complete; continue with the returned `continuationToken`; `maxOutputTokens` is cumulative across continuation hops and must be monotonically increased or omitted).

`ModelStage` values: `MODEL_STAGE_UNSPECIFIED`, `UNSTABLE_EXPERIMENTAL` (deprecated), `EXPERIMENTAL`, `PREVIEW`, `STABLE`, `LEGACY`, `DEPRECATED` (deprecated), `RETIRED`.

`Content`: `parts[]` (ordered `Part`s) and `role` ("user" or "model"). `Part` fields: `thought`, `thoughtSignature`, `partMetadata`, `mediaResolution`, `mediaProcessing`, `audioTranscription`, `speechMetadata`, and a union `data` (`text`, `inlineData`, `functionCall`, `functionResponse`, `fileData`, `executableCode`, `codeExecutionResult`, `toolCall`, `toolResponse`) plus a `metadata` union (`videoMetadata`).

JSON representation of the response:

```json
{
  "candidates": [ { "...": "Candidate" } ],
  "promptFeedback": { "...": "PromptFeedback" },
  "usageMetadata": { "...": "UsageMetadata" },
  "modelVersion": "string",
  "responseId": "string",
  "modelStatus": { "...": "ModelStatus" }
}
```

(Shape condensed from the source's JSON representation table; field names are verbatim.)

## Notes

- The source examples use `gemini-2.0-flash`, which was shut down on June 1, 2026 (replacement: `gemini-3.6-flash`, see migration/deprecations); substitute a current model ID when running.

- The `tools[]` field description above still says only `Function` and `codeExecution` are supported, but the same source defines `GoogleSearch`, `UrlContext`, `FileSearch`, `McpServer`, `GoogleMaps`, and `ComputerUse` tools, and the generateContent tool guides use them.
- Availability: generateContent (v1beta). `streamGenerateContent` returns "a stream of `GenerateContentResponse` instances"; use `?alt=sse` for SSE. The source page also documents `Tool`, `FunctionDeclaration`, `Schema`, `CodeExecution`, `GoogleSearch`, `UrlContext`, `FileSearch`, `McpServer`, `GoogleMaps`, `ComputerUse`, `ThinkingConfig`, `SpeechConfig`, `ImageConfig`, Live `BidiGenerateContentSetup`, `RealtimeInputConfig`, and `auth_tokens.create` data models; consult the source for those.
- The first shell example in the source uses `gemini-2.0-flash` with `?key=` as written; the overview page uses the `x-goog-api-key` header instead.
- Source page lists further example requests (Image, Audio, Video, PDF, Chat, Cache, Tuned Model, JSON Mode, Code execution, Function Calling, Generation config, Safety Settings, System Instruction) in Python / Node.js / Go / Shell / Java.
- Distinct from openai-api-core (Responses / chat completions) and anthropic-api-core (Messages API). The newer recommended primitive is the Interactions API (see interactions-v1.md).
- Docs fetched 2026-10-16.

## Related

- [Interactions API (v1)](./interactions-v1.md)
- [Models](./models.md)
- [Counting tokens](./tokens.md)
- [Caching](./caching.md)
- [Batch API](./batch.md)
