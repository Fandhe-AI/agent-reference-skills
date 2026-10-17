---
source: https://apple.github.io/python-apple-fm-sdk/api/errors.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/errors.py
---

# Errors (Python)

Exception classes of the Foundation Models SDK for Python.

## Signature / Usage

```python
class FoundationModelsError(Exception): ...
class GenerationError(FoundationModelsError): ...
class InvalidGenerationSchemaError(FoundationModelsError): ...
class ExceededContextWindowSizeError(GenerationError): ...
class AssetsUnavailableError(GenerationError): ...
class GuardrailViolationError(GenerationError): ...
class UnsupportedGuideError(GenerationError): ...
class UnsupportedLanguageOrLocaleError(GenerationError): ...
class DecodingFailureError(GenerationError): ...
class RateLimitedError(GenerationError): ...
class ConcurrentRequestsError(GenerationError): ...
class RefusalError(GenerationError):
    def __init__(self, message: str, debug_description: Optional[str] = None, explanation_entries=None)
class ToolCallError(FoundationModelsError):
    def __init__(self, tool_name: str, underlying_error: Exception)
```

```python
import apple_fm_sdk as fm

session = fm.LanguageModelSession()

try:
    async for chunk in session.stream_response("Hello"):
        print(chunk)
except fm.FoundationModelsError as e:
    print(f"Streaming error: {e}")
```

## Options / Props

| Name | Base | Description |
|------|------|-------------|
| FoundationModelsError | Exception | Base exception for all Foundation Models SDK errors. |
| GenerationError | FoundationModelsError | Base class for errors that occur during text generation. |
| ExceededContextWindowSizeError | GenerationError | Raised when the input exceeds the model's context window size. |
| AssetsUnavailableError | GenerationError | Raised when required model assets are not available. |
| GuardrailViolationError | GenerationError | Raised when content violates safety guardrails. |
| UnsupportedGuideError | GenerationError | Raised when an unsupported guide constraint is used. |
| UnsupportedLanguageOrLocaleError | GenerationError | Raised when the requested language or locale is not supported. |
| DecodingFailureError | GenerationError | Raised when decoding the model's output fails. |
| RateLimitedError | GenerationError | Raised when rate limits are exceeded. |
| ConcurrentRequestsError | GenerationError | Raised when too many concurrent requests are made. |
| RefusalError | GenerationError | Raised when the model refuses to generate a response specifically for safety reasons on a generable output. Documented attribute: `reason` (str), the reason for refusal. The source also defines `explanation_entries`. |
| InvalidGenerationSchemaError | FoundationModelsError | Raised when a generation schema is invalid. |
| ToolCallError | FoundationModelsError | Raised when a `Tool` call fails. Attributes: `tool_name` (str), `underlying_error` (Exception). |

### GenerationErrorCode (IntEnum, maps to C status codes)

| Name | Value |
|------|-------|
| SUCCESS | 0 |
| EXCEEDED_CONTEXT_WINDOW_SIZE | 1 |
| ASSETS_UNAVAILABLE | 2 |
| GUARDRAIL_VIOLATION | 3 |
| UNSUPPORTED_GUIDE | 4 |
| UNSUPPORTED_LANGUAGE_OR_LOCALE | 5 |
| DECODING_FAILURE | 6 |
| RATE_LIMITED | 7 |
| CONCURRENT_REQUESTS | 8 |
| REFUSAL | 9 |
| INVALID_SCHEMA | 10 |
| UNKNOWN_ERROR | 255 |

## Notes

- Package: `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`). Swift equivalents: `GenerationError` corresponds to LanguageModelSession.GenerationError (sessions/session-errors.md); `ToolCallError` corresponds to LanguageModelSession.ToolCallError (tools/tool-call-error.md). `InvalidGenerationSchemaError` is unique to the Python SDK and has no direct Swift equivalent: it means a schema failed to compile in the underlying Swift.
- `GuardrailViolationError` and `RefusalError`: for the guardrails and refusals, see the Swift article "Improving the safety of generative model output" (guides/safety.md).
- `RateLimitedError`: rate limits do not apply to the on-device `SystemLanguageModel` on macOS, so you should not encounter this error.
- `ConcurrentRequestsError`: the Python SDK does not enforce concurrency limits, so you should not encounter this error.
- `InvalidGenerationSchemaError` most commonly occurs when an invalid JSON schema is given to the `json_schema` parameter of `respond()`, or when `@generable` is used on a class with properties that cannot be serialized to a JSON schema. To validate a JSON schema, run this in Swift (the same validation step the Python SDK uses): `let schema = try JSONDecoder().decode(GenerationSchema.self, from: Data(jsonSchemaString.utf8))`. Valid examples are the tester schemas in the GitHub repo, such as `tests/tester_schemas/hedgehog.json`.
- `@fm.generable` misuse raises `GenerableDecoratorError`, a subclass of `InvalidGenerationSchemaError` defined in `generable_utils.py` (not in the Sphinx page).
- Unknown C status codes are mapped to a plain `GenerationError`.
- Prompt-related errors (`PromptError`, `ImagePromptError`) are documented in attachment.md.

## Related

- [LanguageModelSession (Python)](./session.md)
- [generable / guide / GenerationSchema (Python)](./generable.md)
- [Tool (Python)](./tools.md)
- [Attachment (Python)](./attachment.md)
- [LanguageModelSession.GenerationError (Swift)](../sessions/session-errors.md)
- [LanguageModelSession.ToolCallError (Swift)](../tools/tool-call-error.md)
