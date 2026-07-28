# BasicTextField

Foundation-level composable for editable text with hardware/software keyboard support but no decorations (no hint, placeholder, border). Two API styles exist: the recommended `TextFieldState`-based overload, and legacy value-based overloads (`String` / `TextFieldValue` + `onValueChange`).

## Signature / Usage

```kotlin
@Composable
public fun BasicTextField(
    state: TextFieldState,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    inputTransformation: InputTransformation? = null,
    textStyle: TextStyle = TextStyle.Default,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    onKeyboardAction: KeyboardActionHandler? = null,
    lineLimits: TextFieldLineLimits = TextFieldLineLimits.Default,
    onTextLayout: (Density.(getResult: () -> TextLayoutResult?) -> Unit)? = null,
    interactionSource: MutableInteractionSource? = null,
    cursorBrush: Brush = BasicTextFieldDefaults.CursorBrush,
    outputTransformation: OutputTransformation? = null,
    decorator: TextFieldDecorator? = null,
    scrollState: ScrollState = rememberScrollState(),
)
```

```kotlin
val state = rememberTextFieldState()
BasicTextField(state = state, modifier = Modifier.fillMaxWidth())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TextFieldState` | — | Hoisted state holding text, selection and composition (recommended overload). |
| `value` / `onValueChange` | `String` or `TextFieldValue` | — | Legacy value-based overloads; the value fed back may differ from what was passed to `onValueChange`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this field. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `readOnly` | `Boolean` | `false` | Content can be selected/copied but not modified when `true`. |
| `inputTransformation` | `InputTransformation?` | `null` | Filters/rejects user input as it is typed (`state`-based overload only). |
| `outputTransformation` | `OutputTransformation?` | `null` | Formats displayed text without changing the underlying state (`state`-based overload only). |
| `textStyle` | `TextStyle` | `TextStyle.Default` | Text styling. |
| `keyboardOptions` | `KeyboardOptions` | `KeyboardOptions.Default` | IME configuration such as `keyboardType` and `imeAction`. |
| `onKeyboardAction` / `keyboardActions` | `KeyboardActionHandler?` / `KeyboardActions` | `null` / `KeyboardActions.Default` | Custom IME action handling (`onKeyboardAction` on `state`-based overload, `keyboardActions` on value-based). |
| `lineLimits` / `singleLine` / `maxLines` / `minLines` | `TextFieldLineLimits` or `Boolean` + `Int` | `TextFieldLineLimits.Default` / `false` | Line count constraints; `state`-based overload uses `TextFieldLineLimits`, value-based uses `singleLine`/`maxLines`/`minLines`. |
| `visualTransformation` | `VisualTransformation` | `VisualTransformation.None` | Value-based overload only; changes visual output (e.g. password masking). |
| `cursorBrush` | `Brush` | `BasicTextFieldDefaults.CursorBrush` / `SolidColor(Color.Black)` | Brush used to draw the cursor. |
| `decorator` / `decorationBox` | `TextFieldDecorator?` / composable lambda | `null` / identity | Adds decorations (borders, placeholders, hints) and increases the hit target area. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |
| `scrollState` | `ScrollState` | `rememberScrollState()` | Controls the internal scroll state (`state`-based overload). |

## Notes

- Package: `androidx.compose.foundation.text`.
- `TextField` and `OutlinedTextField` (material3) wrap `BasicTextField` and add Material decoration.
- Prefer the `TextFieldState`-based overload for new code; it separates input filtering (`InputTransformation`) from display formatting (`OutputTransformation`) and avoids async state issues inherent to the callback-based overloads.

## Related

- TextField / OutlinedTextField — owned by the `android-compose-components` skill (`references/inputs/textfield.md`)
- [TextFieldState](./textfieldstate.md)
- [VisualTransformation / InputTransformation / OutputTransformation](./visualtransformation.md)
- [KeyboardOptions / KeyboardActions / ImeAction](./keyboardoptions.md)
