# TextField

Filled Material Design text field allowing users to enter and edit text.

## Signature / Usage

```kotlin
@Composable
public fun TextField(
    state: TextFieldState,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    textStyle: TextStyle = LocalTextStyle.current,
    labelPosition: TextFieldLabelPosition = TextFieldLabelPosition.Inside(),
    label: @Composable (TextFieldLabelScope.() -> Unit)? = null,
    placeholder: @Composable (() -> Unit)? = null,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    prefix: @Composable (() -> Unit)? = null,
    suffix: @Composable (() -> Unit)? = null,
    supportingText: @Composable (() -> Unit)? = null,
    isError: Boolean = false,
    inputTransformation: InputTransformation? = null,
    outputTransformation: OutputTransformation? = null,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    onKeyboardAction: KeyboardActionHandler? = null,
    lineLimits: TextFieldLineLimits = TextFieldLineLimits.Default,
    onTextLayout: (Density.(getResult: () -> TextLayoutResult?) -> Unit)? = null,
    scrollState: ScrollState = rememberScrollState(),
    shape: Shape = TextFieldDefaults.shape,
    colors: TextFieldColors = TextFieldDefaults.colors(),
    contentPadding: PaddingValues = TextFieldDefaults.defaultContentPadding(label, labelPosition),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
TextField(
    state = rememberTextFieldState(),
    label = { Text("Label") },
    lineLimits = TextFieldLineLimits.SingleLine,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TextFieldState` | — | Manages the text content, cursor, and selection. |
| `modifier` | `Modifier` | `Modifier` | Applied to this text field. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `readOnly` | `Boolean` | `false` | Controls the editable state; when `true`, text is displayed but not editable. |
| `textStyle` | `TextStyle` | `LocalTextStyle.current` | Style applied to the input text. |
| `labelPosition` | `TextFieldLabelPosition` | `TextFieldLabelPosition.Inside()` | Where the label is positioned relative to the field. |
| `label` | `@Composable (TextFieldLabelScope.() -> Unit)?` | `null` | Label displayed above/inside the field. |
| `placeholder` | `@Composable (() -> Unit)?` | `null` | Shown when the field is empty and focused. |
| `leadingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the start of the field. |
| `trailingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the end of the field. |
| `prefix` | `@Composable (() -> Unit)?` | `null` | Prefix shown before the input text. |
| `suffix` | `@Composable (() -> Unit)?` | `null` | Suffix shown after the input text. |
| `supportingText` | `@Composable (() -> Unit)?` | `null` | Supporting text below the field. |
| `isError` | `Boolean` | `false` | Indicates the field content has an error, changing colors. |
| `inputTransformation` | `InputTransformation?` | `null` | Filters/transforms user input before it reaches `state`. |
| `outputTransformation` | `OutputTransformation?` | `null` | Formats the displayed text without changing the underlying state (e.g. phone number formatting). |
| `keyboardOptions` | `KeyboardOptions` | `KeyboardOptions.Default` | Configures the software keyboard (type, IME action, etc). |
| `onKeyboardAction` | `KeyboardActionHandler?` | `null` | Handles IME action events. |
| `lineLimits` | `TextFieldLineLimits` | `TextFieldLineLimits.Default` | Controls min/max lines (`SingleLine` or `MultiLine`). |
| `onTextLayout` | `(Density.(getResult: () -> TextLayoutResult?) -> Unit)?` | `null` | Callback invoked on text layout. |
| `scrollState` | `ScrollState` | `rememberScrollState()` | Scroll state for the field's internal scrolling. |
| `shape` | `Shape` | `TextFieldDefaults.shape` | Shape of the container. |
| `colors` | `TextFieldColors` | `TextFieldDefaults.colors()` | Resolves colors in different states. |
| `contentPadding` | `PaddingValues` | `TextFieldDefaults.defaultContentPadding(label, labelPosition)` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- A legacy overload accepts `value: String` / `onValueChange: (String) -> Unit` with `visualTransformation` / `keyboardActions` / `singleLine` / `maxLines` / `minLines` instead of `state` / `inputTransformation` / `outputTransformation` / `onKeyboardAction` / `lineLimits`; prefer the `TextFieldState` overload for cursor/selection access.
- `OutlinedTextField` is the bordered, lower-emphasis variant with the same parameter shape.
- `BasicTextField` (foundation, not material3) has no decorations; use it for fully custom designs.
- Package: `androidx.compose.material3`.

## Related

- [OutlinedTextField](./outlinedtextfield.md)
- BasicTextField / TextFieldState — owned by the `android-compose-ui` skill (`references/text-input/basictextfield.md`, `references/text-input/textfieldstate.md`)
