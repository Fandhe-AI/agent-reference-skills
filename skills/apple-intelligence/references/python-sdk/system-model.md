---
source: https://apple.github.io/python-apple-fm-sdk/api/systemmodel.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/core.py
---

# SystemLanguageModel (Python)

Interface to the on-device foundation model used by Apple Intelligence, with use case and guardrail configuration, availability check, and token counting.

## Signature / Usage

```python
class SystemLanguageModel(_ManagedObject):
    def __init__(
        self,
        use_case: SystemLanguageModelUseCase = SystemLanguageModelUseCase.GENERAL,
        guardrails: SystemLanguageModelGuardrails = SystemLanguageModelGuardrails.DEFAULT,
        _ptr=None,
    )

    def is_available(
        self,
    ) -> tuple[bool, Optional[SystemLanguageModelUnavailableReason]]

    @property
    def context_size(self) -> int

    async def token_count(
        self,
        value: "Optional[Union[Prompt, GenerationSchema, Transcript, list[Tool]]]" = None,
        *,
        instructions: Optional[str] = None,
    ) -> int
```

```python
import apple_fm_sdk as fm

model = fm.SystemLanguageModel()
is_available, reason = model.is_available()
if is_available:
    # Use the model
    pass
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| use_case | SystemLanguageModelUseCase | Optimizes the model for a task. Defaults to `GENERAL`. |
| guardrails | SystemLanguageModelGuardrails | Content filtering and safety settings. Defaults to `DEFAULT`. |
| is_available() | tuple[bool, Optional[SystemLanguageModelUnavailableReason]] | Availability and, if unavailable, the reason. Call before using the model. |
| context_size | int (property) | Maximum context window size in tokens (prompt, instructions, tools, and response combined). |
| token_count(value) | async, int | Counts tokens a prompt (`str` or list of prompt components), a list of `Tool`, a `GenerationSchema`, or a `Transcript` would consume, without generating. |
| token_count(instructions=) | async, int | Counts tokens for instructions text. Mutually exclusive with `value`. |

### SystemLanguageModelUseCase (IntEnum)

| Name | Value | Description |
|------|-------|-------------|
| GENERAL | 0 | General-purpose use case suitable for a wide range of natural language processing tasks. |
| CONTENT_TAGGING | 1 | Specialized use case optimized for content classification and tagging tasks. |

### SystemLanguageModelGuardrails (IntEnum)

| Name | Value | Description |
|------|-------|-------------|
| DEFAULT | 0 | Standard guardrails with balanced content filtering appropriate for general use cases. |
| PERMISSIVE_CONTENT_TRANSFORMATIONS | 1 | More permissive guardrails for content transformation tasks while maintaining basic safety measures. |

### SystemLanguageModelUnavailableReason (IntEnum)

| Name | Value | Description |
|------|-------|-------------|
| APPLE_INTELLIGENCE_NOT_ENABLED | 0 | Apple Intelligence features are not enabled on this device or for this user. |
| DEVICE_NOT_ELIGIBLE | 1 | The device does not meet the requirements for running the system language model. |
| MODEL_NOT_READY | 2 | The model is still being downloaded or prepared and is not yet ready for use. |
| UNKNOWN | 0xFF | The reason for unavailability is unknown or not specified. |

## Notes

- Package: `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`). Swift equivalent: SystemLanguageModel (see models/system-language-model.md); the enums correspond to its UseCase, Guardrails, and Availability types (models/use-case.md, models/guardrails.md, models/availability.md).
- `token_count()` raises `ValueError` if both `value` and `instructions` are given, or if neither is; `FoundationModelsError` if counting fails.
- Compare the `token_count()` result against `context_size` to gauge how much of the context window an input occupies.
- The v0.2.1 sample in the module docstring for `token_count` and `context_size` uses `await model.token_count(...)` inside an async context.

## Related

- [LanguageModelSession (Python)](./session.md)
- [Errors (Python)](./errors.md)
- [SystemLanguageModel (Swift)](../models/system-language-model.md)
