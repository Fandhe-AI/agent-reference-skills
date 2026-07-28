# KeyboardOptions / KeyboardActions / ImeAction

`KeyboardOptions` configures the soft keyboard shown for a text field (layout, capitalization, IME action hint). `KeyboardActions`/`onKeyboardAction` defines what happens when the IME action button is pressed. `ImeAction` enumerates the action hints a keyboard can display.

## Signature / Usage

```kotlin
public class KeyboardOptions(
    public val capitalization: KeyboardCapitalization = KeyboardCapitalization.Unspecified,
    public val autoCorrectEnabled: Boolean? = null,
    public val keyboardType: KeyboardType = KeyboardType.Unspecified,
    public val imeAction: ImeAction = ImeAction.Unspecified,
    public val platformImeOptions: PlatformImeOptions? = null,
    public val showKeyboardOnFocus: Boolean? = null,
    public val hintLocales: LocaleList? = null,
)

public class KeyboardActions(
    public val onDone: (KeyboardActionScope.() -> Unit)? = null,
    public val onGo: (KeyboardActionScope.() -> Unit)? = null,
    public val onNext: (KeyboardActionScope.() -> Unit)? = null,
    public val onPrevious: (KeyboardActionScope.() -> Unit)? = null,
    public val onSearch: (KeyboardActionScope.() -> Unit)? = null,
    public val onSend: (KeyboardActionScope.() -> Unit)? = null,
)

@JvmInline
public value class ImeAction private constructor(private val value: Int) {
    public companion object {
        public val Default: ImeAction
        public val None: ImeAction
        public val Go: ImeAction
        public val Search: ImeAction
        public val Send: ImeAction
        public val Previous: ImeAction
        public val Next: ImeAction
        public val Done: ImeAction
        public val Unspecified: ImeAction
    }
}
```

```kotlin
TextField(
    state = rememberTextFieldState(),
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Email,
        imeAction = ImeAction.Send,
    ),
    onKeyboardAction = { defaultKeyboardAction(ImeAction.Send) },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `capitalization` | `KeyboardCapitalization` | `Unspecified` | Auto-capitalize characters, words, or sentences (text keyboards only). |
| `autoCorrectEnabled` | `Boolean?` | `null` | Enables auto-correct suggestions; `null` uses platform default. |
| `keyboardType` | `KeyboardType` | `Unspecified` | Layout shown, e.g. `Text`, `Number`, `Phone`, `Email`, `Password`, `Decimal`, `Uri`. |
| `imeAction` | `ImeAction` | `Unspecified` | Action button hint requested from the IME (`Done`, `Go`, `Next`, `Previous`, `Search`, `Send`, `None`). |
| `platformImeOptions` | `PlatformImeOptions?` | `null` | Platform-specific IME options. |
| `showKeyboardOnFocus` | `Boolean?` | `null` | Whether the keyboard shows immediately on focus. |
| `hintLocales` | `LocaleList?` | `null` | Language hints for multilingual keyboard switching. |
| `onDone` / `onGo` / `onNext` / `onPrevious` / `onSearch` / `onSend` | `(KeyboardActionScope.() -> Unit)?` | `null` | Callback invoked when the matching IME action button is pressed; `KeyboardActionScope.defaultKeyboardAction(imeAction)` runs the built-in default behavior. |

## Notes

- Package: `androidx.compose.foundation.text`; `ImeAction` and `KeyboardType` live in `androidx.compose.ui.text.input`.
- On the `TextFieldState`-based `TextField`/`BasicTextField` overload, use `onKeyboardAction: KeyboardActionHandler?` instead of `keyboardActions: KeyboardActions`.
- It is not guaranteed that a given keyboard/IME will render the requested `imeAction`.

## Related

- TextField / OutlinedTextField — owned by the `android-compose-components` skill (`references/inputs/textfield.md`)
- [BasicTextField](./basictextfield.md)
