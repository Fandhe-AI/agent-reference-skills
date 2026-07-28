# TextFieldState / rememberTextFieldState

`TextFieldState` is a hoistable class that holds and manages editable text content, selection, and IME composition for `BasicTextField` / `TextField` / `OutlinedTextField`. `rememberTextFieldState` creates and retains one across recomposition (via `rememberSaveable`).

## Signature / Usage

```kotlin
@Stable
public class TextFieldState(
    initialText: String = "",
    initialSelection: TextRange = TextRange(initialText.length),
)

@Composable
public fun rememberTextFieldState(
    initialText: String = "",
    initialSelection: TextRange = TextRange(initialText.length),
): TextFieldState
```

```kotlin
val state = rememberTextFieldState(initialText = "Hello")
TextField(state = state, label = { Text("Label") })

// Editing programmatically
state.edit { insert(state.text.length, "!") }
state.setTextAndPlaceCursorAtEnd("I really love Android")
state.clearText()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialText` | `String` | `""` | Initial text content. |
| `initialSelection` | `TextRange` | `TextRange(initialText.length)` | Initial cursor/selection position. Start inclusive, end exclusive; `TextRange(n, n)` places a cursor with no selection. |

## Notes

- Package: `androidx.compose.foundation.text.input`.
- `edit(block: TextFieldBuffer.() -> Unit)` runs a `StringBuilder`-like editing block (`insert`, `replace`, `append`, `selectAll`, `placeCursorAtEnd`, `revertAllChanges`); concurrent/reentrant calls are prevented.
- `setTextAndPlaceCursorAtEnd(text)` and `clearText()` are convenience extensions for common operations.
- Prefer this over the legacy `TextFieldValue` + `onValueChange` pattern; it survives recomposition/configuration changes, avoids manual offset-mapping, and can be hoisted to a ViewModel.

## Related

- [BasicTextField](./basictextfield.md)
- TextField / OutlinedTextField — owned by the `android-compose-components` skill (`references/inputs/textfield.md`)
- [VisualTransformation / InputTransformation / OutputTransformation](./visualtransformation.md)
