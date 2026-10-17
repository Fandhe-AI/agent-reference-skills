---
source: https://ai-sdk.dev/docs/reference/ai-sdk-errors
---

# AI SDK Errors (aggregated)

Typed error classes exposed by the AI SDK so applications can handle expected failure modes without matching error message strings. One row per error; each row corresponds to an official page `https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-<kebab-case-name>-error` (the two rows marked "troubleshooting" live under `/docs/troubleshooting/`).

## Signature / Usage

The application package is named `ai`, not `@ai-sdk/ai`. It re-exports common provider-level errors from `@ai-sdk/provider` together with the higher-level errors raised by AI SDK Core:

```typescript
import { APICallError, NoObjectGeneratedError } from 'ai';
```

Provider implementations that depend directly on `@ai-sdk/provider` can import provider-level errors from that package instead:

```typescript
import { APICallError, InvalidResponseDataError } from '@ai-sdk/provider';
```

Replace message matching or a generic `catch` with the most specific static `isInstance` guard. Check `AISDKError` last as a fallback for any AI SDK error:

```typescript
import { AISDKError, APICallError, generateText } from 'ai';

try {
  await generateText({
    model,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });
} catch (error) {
  if (APICallError.isInstance(error)) {
    console.error('Provider request failed:', error.statusCode);
    return;
  }

  if (AISDKError.isInstance(error)) {
    console.error('AI SDK error:', error.name);
    return;
  }

  throw error;
}
```

## Common failure modes

| Failure mode | Error to check |
| --- | --- |
| A provider request fails because of a network error or non-success response | `APICallError` |
| Automatic retries are exhausted | `RetryError` |
| A provider reports an error after a response stream has started | `StreamProviderError` |
| A structured output cannot be parsed or validated | `NoObjectGeneratedError`; inspect its `cause` for `JSONParseError` or `TypeValidationError` |
| A generation call returns no usable output | `NoOutputGeneratedError` or the modality-specific `No*GeneratedError` |
| A model calls a missing tool or supplies invalid tool input | `NoSuchToolError` or `InvalidToolInputError` |
| Tool-call repair fails | `ToolCallRepairError` |
| A response violates an enforced `toolChoice` | `ToolChoiceViolationError` |
| Message history contains unresolved tool calls or invalid approvals | `MissingToolResultsError`, `InvalidToolApprovalError`, or `InvalidToolApprovalSignatureError` |
| A provider or model cannot be resolved | `NoSuchProviderError`, `NoSuchModelError`, or `NoSuchProviderReferenceError` |
| A provider response is empty, malformed, or invalid | `EmptyResponseBodyError`, `JSONParseError`, or `InvalidResponseDataError` |
| The requested model or provider does not support a capability or specification version | `UnsupportedFunctionalityError` or `UnsupportedModelVersionError` |
| UI messages cannot be converted or a UI message stream is invalid | `MessageConversionError` or `UIMessageStreamError` |

## Error reference

Base class: `AISDKError` is the base class and broad type guard for AI SDK errors. `InvalidStreamPartError` is listed in the official index without its own page. All errors below are imported from `ai` and checked with `<Name>.isInstance(error)`, except where an alias is shown.

### Provider requests and responses

| Name | Properties | Description |
| --- | --- | --- |
| `APICallError` | `url`; `requestBodyValues`; `statusCode` (optional); `responseHeaders` (optional); `responseBody` (optional); `isRetryable`; `data` (optional); `cause` (optional) | An API call fails. For an AI SDK UI chat transport or completion request, `requestBodyValues` is `undefined` so prompts and messages are not copied into the client-facing error object. |
| `DownloadError` | `url`; `statusCode` (optional); `statusText` (optional); `cause` (optional); `message` (optional, auto-generated) | A download fails. |
| `EmptyResponseBodyError` | `message` | The server returns an empty response body. |
| `InvalidPromptError` | `prompt`; `message` (required in constructor); `cause` (optional) | The prompt provided is invalid. |
| `InvalidResponseDataError` | `data`; `message` | The server returns a response with invalid data content. |
| `JSONParseError` | `text`; `cause` (required in constructor) | JSON fails to parse. |
| `LoadAPIKeyError` | `message` | The API key is not loaded successfully. |
| `LoadSettingError` | `message` | A setting is not loaded successfully. |
| `NoContentGeneratedError` | `message` (optional, defaults to `'No content generated.'`) | The AI provider fails to generate content. |
| `NoSuchModelError` | `modelId`; `modelType` (`'languageModel'`, `'embeddingModel'`, `'imageModel'`, `'transcriptionModel'`, `'speechModel'`, or `'rerankingModel'`); `message` (optional, auto-generated from `modelId` and `modelType`) | A model ID is not found. |
| `NoSuchProviderReferenceError` | `provider`; `reference`; `message` | A provider reference cannot be resolved because the specified provider is not found in the provider reference mapping. `provider` is the provider that was not found; `reference` is the full provider reference mapping that was searched. |
| `RetryError` | `reason`; `lastError`; `errors`; `message` | A retry operation fails. `lastError` is the most recent error; `errors` is an array of all errors that occurred during retry attempts. |
| `StreamProviderError` | `message`; `type` (optional); `code` (optional, string or number); `statusCode` (optional); `isRetryable`; `data` (optional); `cause` (optional) | A well-formed error event reported by a provider after a model response stream has started. Exposed in streaming error parts and callbacks such as the `streamText` `onError` callback. `isRetryable` is a retry classification, not an automatic retry. |
| `TooManyEmbeddingValuesForCallError` | `provider`; `modelId`; `maxEmbeddingsPerCall`; `values` | Too many values are provided in a single embedding call. |
| `TypeValidationError` | `value`; `cause` (required in constructor) | Type validation fails. |
| `UnsupportedFunctionalityError` | `functionality`; `message` (optional, auto-generated from `functionality`) | Functionality is not supported. |

### Inputs and message streams

| Name | Properties | Description |
| --- | --- | --- |
| `InvalidArgumentError` | `parameter`; `value`; `message` | An invalid argument was provided. |
| `InvalidDataContentError` | `content`; `cause` (optional); `message` (optional, auto-generated) | The data content provided in a multi-modal message part is invalid. |
| `InvalidMessageRoleError` | `role`; `message` (optional, auto-generated from `role`) | An invalid message role is provided. |
| `MessageConversionError` | `originalMessage`; `message` | Message conversion fails. |
| `UIMessageStreamError` | `chunkType`; `chunkId` (empty string for chunks without an ID, such as completion `error` chunks); `message` | A UI message stream reports an error or contains invalid or out-of-sequence chunks (for example `text-delta` without a preceding `text-start`, `reasoning-delta` / `reasoning-end` without `reasoning-start`, `tool-input-delta` without `tool-input-start`). Often surfaces when an upstream request fails before any tokens are streamed and a custom transport writes an inline error message without the proper start chunk. |

### Generated output

| Name | Properties | Description |
| --- | --- | --- |
| `NoImageGeneratedError` | `message` (optional, defaults to `'No image generated.'`); `calls` (optional); `responses` (optional); `cause` (optional) | The AI provider fails to generate an image. |
| `NoObjectGeneratedError` | `message` (optional, defaults to `'No object generated.'`); `text` (optional); `response` (required in constructor); `usage` (required in constructor); `finishReason` (required in constructor); `cause` (optional) | The AI provider fails to generate a parsable object that conforms to the schema. `finishReason` of `'length'` can result in a JSON parsing error. |
| `NoOutputGeneratedError` | `message` (optional, defaults to `'No output generated.'`); `cause` (optional) | No LLM output was generated. For `generateText`, accessing `result.output` throws this error when the final step does not finish with a `stop` reason (for example `tool-calls`); `output` is a getter, so destructuring it also triggers the access. |
| `NoSpeechGeneratedError` | `responses` (required in constructor) | No audio could be generated from the input. |
| `NoTranscriptGeneratedError` | `responses` (required in constructor) | No transcript could be generated from the input. |
| `NoTranslationGeneratedError` | `response` (required in constructor) | No translation could be generated from the input audio: no `audio` part was emitted and the final output text is empty, or the stream ended without a finish event. |
| `NoVideoGeneratedError` | `message` (optional, defaults to `'No video generated.'`); `responses` (optional); `cause` (optional) | The AI provider fails to generate a video. |

### Providers and model compatibility

| Name | Properties | Description |
| --- | --- | --- |
| `NoSuchProviderError` | `providerId`; `availableProviders`; `modelId`; `modelType`; `message` | A provider ID is not found. |
| `UnsupportedModelVersionError` (troubleshooting) | see the `UnsupportedModelVersionError` row in `troubleshooting.md` | A model implements an unsupported specification version. |

### Tools and approvals

| Name | Properties | Description |
| --- | --- | --- |
| `InvalidToolApprovalError` | `approvalId` | A tool approval response references an unknown `approvalId`; no matching `tool-approval-request` was found in the message history. |
| `InvalidToolApprovalSignatureError` | `approvalId`; `toolCallId` | `experimental_toolApprovalSecret` is configured and a tool approval replayed from the message history has a missing or invalid HMAC signature. The server rejects the approval before the tool executes. |
| `InvalidToolInputError` | `toolName`; `toolInput`; `message`; `cause` | Invalid tool input was provided. |
| `MissingToolResultsError` (troubleshooting) | see the `AI_MissingToolResultsError` row in `troubleshooting.md` | A new message is sent while tool calls from a previous turn are unresolved. |
| `NoSuchToolError` | `toolName`; `availableTools` (optional); `message` (optional, auto-generated from `toolName` and `availableTools`) | A model tries to call an unavailable tool. |
| `ToolCallNotFoundForApprovalError` | `toolCallId`; `approvalId` | A tool approval request references a tool call that was not found, for example when processing provider-emitted approval requests (MCP flows) where the referenced tool call ID does not exist. |
| `ToolCallRepairError` | `originalError` (either `NoSuchToolError` or `InvalidToolInputError`); `message`; `cause` | A failure while attempting to repair an invalid tool call. |
| `ToolChoiceViolationError` | `toolChoice`; `finishReason`; `provider`; `modelId`; `content`; `message` | A `generateText` response does not satisfy an enforced tool choice: `toolChoice` is `'required'` but the response contains no structured tool call, or a specifically selected tool was not called. The error does not interpret text or reasoning as an executable tool call; inspect `content` for opt-in recovery and validate the schema before executing any recovered call. |

### Decision errors (experimental)

Exported from `ai` and `@ai-sdk/provider` with an `Experimental_` prefix; the official pages import them with an alias.

| Name | Properties | Description |
| --- | --- | --- |
| `Experimental_DecisionRefusalError` (alias `DecisionRefusalError`) | `questionIds`; `provider`; `modelId`; `message` | Identifies questions that a decision model declined to answer. Decision models report a refusal as an answer with `type: 'refusal'`; `experimental_decide` throws this error when any answer is a refusal, after the provider call and without retrying it. |
| `Experimental_DecisionUnsupportedQuestionTypeError` (alias `DecisionUnsupportedQuestionTypeError`) | `questionId`; `questionType`; `provider`; `modelId`; `message` (providers can supply a custom message) | Identifies a question whose type is unsupported by a decision model. |

## Checking for an error

```typescript
import { APICallError } from 'ai';

if (APICallError.isInstance(error)) {
  // Handle the error
}
```

## Notes

- Prefer `ErrorClass.isInstance(error)` over `error instanceof ErrorClass` when the class provides it. The static guard also works when multiple AI SDK package versions are loaded.
- Aliased import for the experimental decision errors: `import { Experimental_DecisionRefusalError as DecisionRefusalError } from 'ai';`.
- Common solutions for `UIMessageStreamError`: always send a `*-start` chunk before any `*-delta` or `*-end` chunk for the same ID; make the `id` of `*-delta` / `*-end` chunks match the `*-start` chunk; on error paths in custom transports emit the full start / delta / end sequence; review stream producer logic when operations are concurrent or streams are merged.
- Experimental: the decision errors belong to `experimental_decide`, whose API may change in patch releases.

## Related

- [Error Handling](./error-handling.md)
- [Troubleshooting](./troubleshooting.md)
