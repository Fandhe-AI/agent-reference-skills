# VisualTransformation / InputTransformation / OutputTransformation

Three complementary interfaces that change how text field content is filtered or displayed. `VisualTransformation` is used by the legacy value-based `TextField`/`BasicTextField` overloads to change the *visual* representation only (e.g. password masking). `InputTransformation` and `OutputTransformation` are the `TextFieldState`-based replacements: the former filters/rejects raw input as it's typed, the latter formats what's displayed without touching the underlying state.

## Signature / Usage

```kotlin
@Immutable
public fun interface VisualTransformation {
    public fun filter(text: AnnotatedString): TransformedText
    public companion object {
        public val None: VisualTransformation
    }
}

@Stable
public fun interface InputTransformation {
    public fun TextFieldBuffer.transformInput()
}

@Stable
public fun interface OutputTransformation {
    public fun TextFieldBuffer.transformOutput()
}
```

```kotlin
// InputTransformation: reject non-digit input, cap at 10 chars
val digitsOnly = InputTransformation.maxLength(10).then {
    if (!asCharSequence().isDigitsOnly()) revertAllChanges()
}

// OutputTransformation: format as (123) 456-7890 without altering stored digits
val phoneFormat = OutputTransformation {
    if (length > 0) insert(0, "(")
    if (length > 4) insert(4, ")")
    if (length > 8) insert(8, "-")
}

TextField(
    state = rememberTextFieldState("1234567890"),
    inputTransformation = digitsOnly,
    outputTransformation = phoneFormat,
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `VisualTransformation.filter` | `(AnnotatedString) -> TransformedText` | Returns transformed display text plus an `OffsetMapping` for cursor/selection translation. `VisualTransformation.None` is the identity transform. |
| `InputTransformation.transformInput` | `TextFieldBuffer.() -> Unit` | Runs after every user-driven change (keyboard, paste, drag-drop, accessibility) to a `TextFieldState`; can modify or `revertAllChanges()`. |
| `InputTransformation.maxLength(n)` | built-in factory | Rejects input exceeding `n` characters and configures accessibility announcements. |
| `InputTransformation.then(next)` | chaining | Runs `next` after this transformation; changes are visible to the following transformation in the chain. |
| `OutputTransformation.transformOutput` | `TextFieldBuffer.() -> Unit` | Reformats presented text on every recomposition without changing the underlying `TextFieldState`; discarded after each render. |

## Notes

- `VisualTransformation` lives in `androidx.compose.ui.text.input`; `InputTransformation`/`OutputTransformation` live in `androidx.compose.foundation.text.input`.
- Prefer `InputTransformation`/`OutputTransformation` (state-based fields) over `VisualTransformation` (value-based fields) in new code — they separate what is stored from what is shown and avoid manual offset-mapping.

## Related

- [TextFieldState](./textfieldstate.md)
- TextField / OutlinedTextField — owned by the `android-compose-components` skill (`references/inputs/textfield.md`)
- [BasicTextField](./basictextfield.md)
