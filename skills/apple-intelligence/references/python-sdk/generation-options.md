---
source: https://apple.github.io/python-apple-fm-sdk/api/generation_options.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/generation_options.py
---

# GenerationOptions (Python)

Options that control how the model generates its response to a prompt: sampling strategy, temperature, and maximum response tokens.

## Signature / Usage

```python
@dataclass
class GenerationOptions:
    sampling: Optional[SamplingMode] = None
    temperature: Optional[float] = None
    maximum_response_tokens: Optional[int] = None
```

```python
import apple_fm_sdk as fm

options = fm.GenerationOptions(
    sampling=fm.SamplingMode.random(top=50, seed=42),
    temperature=0.8,
    maximum_response_tokens=1000
)
```

```python
class SamplingModeType(str, Enum):
    GREEDY = "greedy"
    RANDOM = "random"

@dataclass
class SamplingMode:
    mode_type: SamplingModeType
    top: Optional[int] = None
    probability_threshold: Optional[float] = None
    seed: Optional[int] = None

    @classmethod
    def greedy(cls) -> "SamplingMode"

    @classmethod
    def random(
        cls,
        top: Optional[int] = None,
        probability_threshold: Optional[float] = None,
        seed: Optional[int] = None,
    ) -> "SamplingMode"
```

## Options / Props

### GenerationOptions

| Name | Type | Description |
|------|------|-------------|
| sampling | Optional[SamplingMode] | Sampling strategy for how the model picks tokens. Defaults to None (uses model default). |
| temperature | Optional[float] | Higher values (e.g., 1.0) make output more random and creative, lower values (e.g., 0.1) more focused and deterministic. Defaults to None (uses model default). Must be a non-negative number. |
| maximum_response_tokens | Optional[int] | Maximum number of tokens the model may produce. Defaults to None (no explicit limit). Must be a positive integer. |

### SamplingMode

| Name | Type | Description |
|------|------|-------------|
| mode_type | SamplingModeType | `GREEDY` always selects the most likely token; `RANDOM` randomly selects from high-probability tokens. |
| top | Optional[int] | For random sampling with fixed top-k, the number of high-probability tokens to consider. Must be a positive integer. |
| probability_threshold | Optional[float] | For random sampling with variable threshold, the cumulative probability threshold (0.0 to 1.0). |
| seed | Optional[int] | Random seed for reproducible random sampling. |

## Notes

- Package: `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`). Swift equivalent: GenerationOptions (see sessions/generation-options.md).
- Only use `maximum_response_tokens` to protect against unexpectedly verbose responses. A strict token limit can lead to malformed or grammatically incorrect results.
- All input to the model (instructions, prompt, tool definitions, Generable types, and the model's responses) contributes tokens to the context window. Exceeding it raises `ExceededContextWindowSizeError`.
- `SamplingMode.random()` raises `ValueError` if both `top` and `probability_threshold` are given, or if values are out of range; if neither is given, all tokens are considered.
- `GenerationOptions.__post_init__` raises `ValueError` for a non-numeric or negative `temperature`, a non-positive or non-integer `maximum_response_tokens`, or a `sampling` that is not a `SamplingMode`.
- `to_dict()` serializes the options for the C bindings layer (for example `sampling` becomes `{'mode': 'random', 'top_k': ...}`).
- Options passed to `respond()` / `stream_response()` apply to that request.

## Related

- [LanguageModelSession (Python)](./session.md)
- [Errors (Python)](./errors.md)
- [GenerationOptions (Swift)](../sessions/generation-options.md)
