---
source: https://apple.github.io/python-apple-fm-sdk/api/session.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/session.py
---

# LanguageModelSession (Python)

Manages the lifecycle of a session with a foundation model: session history (transcript), tool calls, and both full and streaming responses.

## Signature / Usage

```python
class LanguageModelSession(_ManagedObject):
    def __init__(
        self,
        instructions: Optional[str] = None,
        model: Optional[SystemLanguageModel] = None,
        tools: Optional[list[Tool]] = None,
        _ptr=None,
    )

    @classmethod
    def from_transcript(
        cls,
        transcript: Transcript,
        model: Optional[SystemLanguageModel] = None,
        tools: Optional[list[Tool]] = None,
    ) -> "LanguageModelSession"

    @property
    def is_responding(self) -> bool

    async def respond(
        self,
        prompt: Prompt,
        generating: Optional[Union[Type[Generable], Generable]] = None,
        *,
        schema: Optional[GenerationSchema] = None,
        json_schema: Optional[dict] = None,
        options: Optional[GenerationOptions] = None,
    ) -> Union[str, Any, GeneratedContent]

    async def stream_response(
        self, prompt: Prompt, options: Optional[GenerationOptions] = None
    ) -> AsyncIterator
```

```python
import apple_fm_sdk as fm

session = fm.LanguageModelSession(
    instructions="You are a helpful bird expert. Provide concise, "
                "accurate information about birds."
)
response = await session.respond("What is a Swift?")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| instructions | Optional[str] | System instructions that persist across all requests in the session. |
| model | Optional[SystemLanguageModel] | Model configuration. If not provided, uses the default `SystemLanguageModel()`. |
| tools | Optional[list[Tool]] | Tool instances the model can invoke during generation. |
| transcript | Transcript | Attribute set at construction; session history, updated after each request. |
| is_responding | bool (property) | True if the session is currently processing a request. |
| respond(prompt, ...) | async method | Returns `str` (no constraint), an instance of the `generating` type, or `GeneratedContent` (`schema` / `json_schema`). |
| respond(..., generating=) | Type[Generable] / Generable | Constrains the response to a `Generable` type and converts it to an instance of that type. |
| respond(..., schema=) | GenerationSchema | Explicit schema-based guided generation; returns `GeneratedContent`. |
| respond(..., json_schema=) | dict | JSON Schema dictionary for guided generation; returns `GeneratedContent`. |
| respond(..., options=) | Optional[GenerationOptions] | Per-request options (temperature, sampling mode, maximum response tokens). |
| stream_response(prompt, options) | async iterator of str | Yields text snapshots (complete text so far, not deltas); text only. |
| from_transcript(transcript, model, tools) | classmethod | Creates a session from an existing transcript. |

## Notes

- Package: `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`). Swift equivalent: LanguageModelSession (see sessions/languagemodelsession.md).
- The session is thread-safe for sequential requests but does not support concurrent requests. Sessions use an internal lock; concurrent `respond()` calls on the same session are serialized. To handle multiple requests simultaneously, create multiple session instances.
- Only one of `generating`, `schema`, or `json_schema` can be specified. Passing both `generating` and `schema` raises `ValueError`, as does a `generating` type that is not a valid `Generable`.
- `stream_response()` supports basic text responses only; for guided generation use `respond()`. The transcript is updated only after streaming completes. Breaking out of the `async for` loop early cleans up resources.
- `respond()` raises `FoundationModelsError` if the response fails or times out, and `asyncio.CancelledError` if cancelled.
- `from_transcript()`: tool mentions loaded from a Transcript are historical only. Pass tool instances in `tools` to let the model make new tool calls. The transcript already contains the session instructions, so they need not be passed again. The new session shares the transcript object with the original.
- Prompt may be a string, an `Attachment`, or a list mixing the two (see attachment.md).

## Related

- [SystemLanguageModel (Python)](./system-model.md)
- [GenerationOptions (Python)](./generation-options.md)
- [generable / guide / GenerationSchema (Python)](./generable.md)
- [Tool (Python)](./tools.md)
- [Transcript (Python)](./transcript.md)
- [Attachment (Python)](./attachment.md)
- [Errors (Python)](./errors.md)
- [LanguageModelSession (Swift)](../sessions/languagemodelsession.md)
