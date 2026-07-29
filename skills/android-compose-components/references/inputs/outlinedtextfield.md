# OutlinedTextField

Outlined Material Design text field. Lower visual emphasis than `TextField`, useful when many fields appear together (e.g. forms).

## Signature / Usage

```kotlin
@Composable
public fun OutlinedTextField(
    state: TextFieldState,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    textStyle: TextStyle = LocalTextStyle.current,
    labelPosition: TextFieldLabelPosition = TextFieldLabelPosition.Cutout(),
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
    shape: Shape = OutlinedTextFieldDefaults.shape,
    colors: TextFieldColors = OutlinedTextFieldDefaults.colors(),
    contentPadding: PaddingValues = OutlinedTextFieldDefaults.defaultContentPadding(label, labelPosition),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
OutlinedTextField(
    state = rememberTextFieldState(),
    label = { Text("Label") },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TextFieldState` | — | Manages the text content, cursor, and selection. |
| `modifier` | `Modifier` | `Modifier` | Applied to this text field. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `readOnly` | `Boolean` | `false` | Controls the editable state. |
| `textStyle` | `TextStyle` | `LocalTextStyle.current` | Style applied to the input text. |
| `labelPosition` | `TextFieldLabelPosition` | `TextFieldLabelPosition.Cutout()` | Where the label is positioned; default cuts into the outline border. |
| `label` | `@Composable (TextFieldLabelScope.() -> Unit)?` | `null` | Label displayed for the field. |
| `placeholder` | `@Composable (() -> Unit)?` | `null` | Shown when the field is empty and focused. |
| `leadingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the start of the field. |
| `trailingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the end of the field. |
| `prefix` | `@Composable (() -> Unit)?` | `null` | Prefix shown before the input text. |
| `suffix` | `@Composable (() -> Unit)?` | `null` | Suffix shown after the input text. |
| `supportingText` | `@Composable (() -> Unit)?` | `null` | Supporting text below the field. |
| `isError` | `Boolean` | `false` | Indicates an error state. |
| `inputTransformation` | `InputTransformation?` | `null` | Filters/transforms user input. |
| `outputTransformation` | `OutputTransformation?` | `null` | Formats displayed text without changing state. |
| `keyboardOptions` | `KeyboardOptions` | `KeyboardOptions.Default` | Configures the software keyboard. |
| `onKeyboardAction` | `KeyboardActionHandler?` | `null` | Handles IME action events. |
| `lineLimits` | `TextFieldLineLimits` | `TextFieldLineLimits.Default` | Controls min/max lines. |
| `onTextLayout` | `(Density.(getResult: () -> TextLayoutResult?) -> Unit)?` | `null` | Callback invoked on text layout. |
| `scrollState` | `ScrollState` | `rememberScrollState()` | Scroll state for internal scrolling. |
| `shape` | `Shape` | `OutlinedTextFieldDefaults.shape` | Shape of the outline/container. |
| `colors` | `TextFieldColors` | `OutlinedTextFieldDefaults.colors()` | Resolves colors in different states. |
| `contentPadding` | `PaddingValues` | `OutlinedTextFieldDefaults.defaultContentPadding(label, labelPosition)` | Spacing between the outline and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- A legacy overload accepts `value: String` / `onValueChange: (String) -> Unit` with `visualTransformation` / `keyboardActions` / `singleLine` / `maxLines` / `minLines` instead of the `state`-based parameters.
- Package: `androidx.compose.material3`.
- This is the Jetpack Compose (Kotlin) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend components.

## Related

- [TextField](./textfield.md)
