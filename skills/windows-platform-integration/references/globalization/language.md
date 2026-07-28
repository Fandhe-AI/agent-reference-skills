# Language

Provides information related to a BCP-47 language tag, such as its display name, native name, script, and layout direction.

Namespace: `Windows.Globalization` (WinRT). Sealed class.

## Signature / Usage

```csharp
// Get the top user-preferred language and its display name.
var topUserLanguage = Windows.System.UserProfile.GlobalizationPreferences.Languages[0];
var language = new Windows.Globalization.Language(topUserLanguage);
var displayName = language.DisplayName;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| LanguageTag | `string` (get) | The normalized BCP-47 language tag for this language. |
| DisplayName | `string` (get) | Localized string suitable for display to the user. |
| NativeName | `string` (get) | Name of the language in the language itself. |
| Script | `string` (get) | Four-letter ISO 15924 script code. |
| AbbreviatedName | `string` (get) | Three-letter abbreviation, e.g. `en-US` → `eng`. |
| LayoutDirection | `LanguageLayoutDirection` (get) | Content layout direction most appropriate for the language (e.g. right-to-left for Arabic/Hebrew). |
| CurrentInputMethodLanguageTag | `string` (get) | BCP-47 tag for the currently enabled keyboard layout / IME (static). |

## Notes

- Constructed with `Language(string languageTag)`.
- `IsWellFormed(String)` (static) validates whether a BCP-47 tag is well-formed.
- `TrySetInputMethodLanguageTag(String)` sets the normalized language tag of the current input method.
- Language tags support Unicode extensions `ca-` (calendar) and `nu-` (numbering system), which affect `Calendar` and number-formatting objects.

## Related

- [ApplicationLanguages](./application-languages.md)
- [Calendar](./calendar.md)
- [bidirectional-text](./bidirectional-text.md)
