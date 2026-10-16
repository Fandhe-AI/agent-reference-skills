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
| `keyboardType` | `KeyboardType` | `Unspecified` | Layout shown; one of the 26 `KeyboardType` values listed under Notes. |
| `imeAction` | `ImeAction` | `Unspecified` | Action button hint requested from the IME (`Done`, `Go`, `Next`, `Previous`, `Search`, `Send`, `None`). |
| `platformImeOptions` | `PlatformImeOptions?` | `null` | Platform-specific IME options. |
| `showKeyboardOnFocus` | `Boolean?` | `null` | Whether the keyboard shows immediately on focus. |
| `hintLocales` | `LocaleList?` | `null` | Language hints for multilingual keyboard switching. |
| `onDone` / `onGo` / `onNext` / `onPrevious` / `onSearch` / `onSend` | `(KeyboardActionScope.() -> Unit)?` | `null` | Callback invoked when the matching IME action button is pressed; `KeyboardActionScope.defaultKeyboardAction(imeAction)` runs the built-in default behavior. |

## Notes

- Package: `androidx.compose.foundation.text`; `ImeAction` and `KeyboardType` live in `androidx.compose.ui.text.input`.
- On the `TextFieldState`-based `TextField`/`BasicTextField` overload, use `onKeyboardAction: KeyboardActionHandler?` instead of `keyboardActions: KeyboardActions`.
- It is not guaranteed that a given keyboard/IME will render the requested `imeAction`.
- `KeyboardType` values (1.12.1, `androidx.compose.ui.text.input`). Compose UI 1.12.0 (from 1.12.0-alpha01) added options to complete the set of supported keyboard options on Android (date, time, datetime, signed decimal, and more); descriptions below are the KDoc lines, each prefixed "A keyboard type used to request an IME that":
  - `Unspecified`: The keyboard type is not specified. (no prefix)
  - `Text`: shows regular keyboard.
  - `Ascii`: is capable of inputting ASCII characters.
  - `Number`: is capable of inputting digits. IME may provide inputs other than digits but it is not guaranteed.
  - `Phone`: is capable of inputting phone numbers.
  - `Uri`: is capable of inputting URIs.
  - `Email`: is capable of inputting email addresses.
  - `Password`: is capable of inputting password.
  - `NumberPassword`: is capable of inputting number password.
  - `Decimal`: is capable of inputting decimals. IME should explicitly provide a decimal separator as input, which is not assured by `KeyboardType.Number`.
  - `PasswordVisible`: is capable of inputting visible password.
  - `PostalAddress`: is capable of inputting postal address.
  - `PersonName`: is capable of inputting person name.
  - `EmailSubject`: is capable of inputting email subject.
  - `ShortMessage`: is capable of inputting short message.
  - `LongMessage`: is capable of inputting long message.
  - `Filter`: is capable of filtering text.
  - `Phonetic`: is capable of inputting phonetic text.
  - `DateTime`: is capable of inputting date and time.
  - `Date`: is capable of inputting date.
  - `Time`: is capable of inputting time.
  - `NumberSigned`: is capable of inputting signed digits.
  - `DecimalSigned`: is capable of inputting signed decimals.
  - `DecimalPassword`: is capable of inputting a decimal password.
  - `NumberPasswordSigned`: is capable of inputting a signed number password.
  - `DecimalPasswordSigned`: is capable of inputting a signed decimal password.

## Related

- TextField / OutlinedTextField — owned by the `android-compose-components` skill (`references/inputs/textfield.md`)
- [BasicTextField](./basictextfield.md)
