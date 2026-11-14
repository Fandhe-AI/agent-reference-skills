---
source: https://apple.github.io/python-apple-fm-sdk/api/systemmodel.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.2/src/apple_fm_sdk/core.py
---

# SystemLanguageModel (Python)

Interface to the on-device foundation model used by Apple Intelligence, with use case and guardrail configuration, availability check, token counting, and model variant.

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

    @property
    def variant(self) -> Optional[SystemLanguageModelVariant]

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

```python
@dataclass(frozen=True)
class SystemLanguageModelVariant:
    display_name: str
```

```python
import apple_fm_sdk as fm

model = fm.SystemLanguageModel()
if model.variant:
    print(f"Model variant: {model.variant.display_name}")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| use_case | SystemLanguageModelUseCase | Optimizes the model for a task. Defaults to `GENERAL`. |
| guardrails | SystemLanguageModelGuardrails | Content filtering and safety settings. Defaults to `DEFAULT`. |
| is_available() | tuple[bool, Optional[SystemLanguageModelUnavailableReason]] | Availability and, if unavailable, the reason. Call before using the model. |
| context_size | int (property) | Maximum context window size in tokens (prompt, instructions, tools, and response combined). |
| variant | Optional[SystemLanguageModelVariant] (property) | The variant of the on-device model backing this instance, or `None` if the current OS does not support it or the package was built without macOS 27 SDKs. Added in 0.2.2. |
| token_count(value) | async, int | Counts tokens a prompt (`str` or list of prompt components), a list of `Tool`, a `GenerationSchema`, or a `Transcript` would consume, without generating. |
| token_count(instructions=) | async, int | Counts tokens for instructions text. Mutually exclusive with `value`. |

### SystemLanguageModelVariant (frozen dataclass)

| Name | Type | Description |
|------|------|-------------|
| display_name | str | The user-facing name of the variant, for example `"AFM 3 Core"` or `"AFM 3 Core Advanced"`. |

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

- Package: `apple-fm-sdk` 0.2.2 (GitHub tag `v0.2.2`). Swift equivalent: SystemLanguageModel (see models/system-language-model.md); the enums correspond to its UseCase, Guardrails, and Availability types (models/use-case.md, models/guardrails.md, models/availability.md).
- `variant` (0.2.2): when the package was built with an older SDK and run on macOS 27 or later, `variant` is `None`. Check that `xcrun --sdk macosx --show-sdk-version` reports 27 or later (switch Xcode with `sudo xcode-select --switch <path>` if not), then reinstall the package so the bindings are rebuilt. `SystemLanguageModelVariant` is exported from `apple_fm_sdk` and documented under the same API page. Swift equivalent: `SystemLanguageModel.Variant` (see models/variant.md).
- Source: https://github.com/apple/python-apple-fm-sdk/releases/tag/v0.2.2 (release notes: "Expose `SystemLanguageModel` variant name (#20)") and the tag's `src/apple_fm_sdk/core.py` (retrieved 2026-11-14).
- `token_count()` raises `ValueError` if both `value` and `instructions` are given, or if neither is; `FoundationModelsError` if counting fails.
- Compare the `token_count()` result against `context_size` to gauge how much of the context window an input occupies.
- The v0.2.2 sample in the module docstring for `token_count` and `context_size` uses `await model.token_count(...)` inside an async context.

## Related

- [LanguageModelSession (Python)](./session.md)
- [Errors (Python)](./errors.md)
- [SystemLanguageModel (Swift)](../models/system-language-model.md)
