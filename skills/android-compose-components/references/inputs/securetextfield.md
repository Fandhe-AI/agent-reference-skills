# SecureTextField

Text field specifically designed for password entry, built on the state-based text field APIs with configurable character obfuscation.

## Signature / Usage

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
public fun SecureTextField(
    state: TextFieldState,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
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
    textObfuscationMode: TextObfuscationMode = TextObfuscationMode.RevealLastTyped,
    textObfuscationCharacter: Char = DefaultObfuscationCharacter,
    keyboardOptions: KeyboardOptions = SecureTextFieldKeyboardOptions,
    onKeyboardAction: KeyboardActionHandler? = null,
    onTextLayout: (Density.(getResult: () -> TextLayoutResult?) -> Unit)? = null,
    shape: Shape = TextFieldDefaults.shape,
    colors: TextFieldColors = TextFieldDefaults.colors(),
    contentPadding: PaddingValues = if (label == null || labelPosition is TextFieldLabelPosition.Above) {
        TextFieldDefaults.contentPaddingWithoutLabel()
    } else {
        TextFieldDefaults.contentPaddingWithLabel()
    },
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
SecureTextField(
    state = rememberTextFieldState(),
    label = { Text("Password") },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TextFieldState` | — | Manages the entered password text, cursor, and selection. |
| `modifier` | `Modifier` | `Modifier` | Applied to this text field. |
| `enabled` | `Boolean` | `true` | Controls the enabled state. |
| `textStyle` | `TextStyle` | `LocalTextStyle.current` | Style applied to the (obfuscated) text. |
| `labelPosition` | `TextFieldLabelPosition` | `TextFieldLabelPosition.Inside()` | Where the label is positioned. |
| `label` | `@Composable (TextFieldLabelScope.() -> Unit)?` | `null` | Label displayed for the field. |
| `placeholder` | `@Composable (() -> Unit)?` | `null` | Shown when the field is empty and focused. |
| `leadingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the start of the field. |
| `trailingIcon` | `@Composable (() -> Unit)?` | `null` | Icon at the end, commonly a show/hide-password toggle. |
| `prefix` | `@Composable (() -> Unit)?` | `null` | Prefix shown before the input text. |
| `suffix` | `@Composable (() -> Unit)?` | `null` | Suffix shown after the input text. |
| `supportingText` | `@Composable (() -> Unit)?` | `null` | Supporting text below the field. |
| `isError` | `Boolean` | `false` | Indicates an error state. |
| `inputTransformation` | `InputTransformation?` | `null` | Filters/transforms user input before it reaches `state`. |
| `textObfuscationMode` | `TextObfuscationMode` | `TextObfuscationMode.RevealLastTyped` | Controls how much of the password is masked (e.g. reveal last typed character, hidden, or visible). |
| `textObfuscationCharacter` | `Char` | `DefaultObfuscationCharacter` | Character used to mask input. |
| `keyboardOptions` | `KeyboardOptions` | `SecureTextFieldKeyboardOptions` | Preconfigured for password entry (e.g. `KeyboardType.Password`). |
| `onKeyboardAction` | `KeyboardActionHandler?` | `null` | Handles IME action events. |
| `onTextLayout` | `(Density.(getResult: () -> TextLayoutResult?) -> Unit)?` | `null` | Callback invoked on text layout. |
| `shape` | `Shape` | `TextFieldDefaults.shape` | Shape of the container. |
| `colors` | `TextFieldColors` | `TextFieldDefaults.colors()` | Resolves colors in different states. |
| `contentPadding` | `PaddingValues` | `contentPaddingWithoutLabel()` if `label == null` or `labelPosition is Above`, else `contentPaddingWithLabel()` | Spacing between the container and content. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting `Interaction`s. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- Does not support `outputTransformation`, `lineLimits`, or `visualTransformation`-style parameters found on `TextField`, since obfuscation is handled via `textObfuscationMode`/`textObfuscationCharacter`.
- Package: `androidx.compose.material3`.

## Related

- [TextField](./textfield.md)
