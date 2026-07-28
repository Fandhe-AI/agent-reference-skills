# ApplicationLanguages

Specifies the language-related preferences that the app can use and maintain: the user's runtime language list, the app's manifest-declared languages, and a persisted primary-language override.

Namespace: `Windows.Globalization` (WinRT). Static class.

## Signature / Usage

```csharp
// Read the user-preferred runtime languages (BCP-47 tags)
IReadOnlyList<string> languages = Windows.Globalization.ApplicationLanguages.Languages;

// Override the app's preferred language (persisted)
Windows.Globalization.ApplicationLanguages.PrimaryLanguageOverride = "en-US";
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Languages | `IReadOnlyList<string>` (static, get) | Ranked list of current runtime language values preferred by the user, filtered by the app's manifest languages. |
| ManifestLanguages | `IReadOnlyList<string>` (static, get) | The app's declared list of supported languages (from the package manifest and installed language resource packages). |
| PrimaryLanguageOverride | `string` (static, get/set) | Overrides the app's preferred language as a BCP-47 tag. Persisted across app launches. Should only be set to a language present in `ManifestLanguages`. |

## Notes

- Language tags are BCP-47 (e.g. `en-US`, `ja-JP`), not locale names; they make no claim about measurement system or currency.
- `Languages` can include regional variants not listed in the manifest (e.g. `en-CA`) when the user's profile prefers them and the app supports any variant of the base language.
- `GetLanguagesForUser(User)` retrieves language preferences for a specific user, for multi-user app (MUA) scenarios.
- Passing these tags to National Language Support (Win32) functions requires first calling `ResolveLocaleName`.

## Related

- [Language](./language.md)
- [package-manifest-languages](./package-manifest-languages.md)
