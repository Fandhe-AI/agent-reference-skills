# Package manifest language declarations

Describes the three related language lists a Windows app deals with — the **user profile language list**, the **app manifest language list**, and the **app runtime language list** — and how the package manifest (`Package.appxmanifest` / built `AppxManifest.xml`) declares supported languages.

## Signature / Usage

```csharp
// User profile language list (Settings > Time & Language)
IReadOnlyList<string> userLanguages = Windows.System.UserProfile.GlobalizationPreferences.Languages;

// App manifest language list (declared support)
IReadOnlyList<string> manifestLanguages = Windows.Globalization.ApplicationLanguages.ManifestLanguages;

// App runtime language list (intersection, or fallback to default)
IReadOnlyList<string> runtimeLanguages = Windows.Globalization.ApplicationLanguages.Languages;
```

```xml
<!-- Package.appxmanifest: let Visual Studio auto-generate the language list from resource qualifiers found in the project -->
<Resources>
  <Resource Language="x-generate" />
</Resources>

<!-- Built AppxManifest.xml after language resources for en-US, ja-JP, fr-FR exist -->
<Resources>
  <Resource Language="EN-US" />
  <Resource Language="JA-JP" />
  <Resource Language="FR-FR" />
</Resources>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| GlobalizationPreferences.Languages | `IReadOnlyList<string>` (static, get) | User profile language list, configured in Windows Settings. |
| ApplicationLanguages.ManifestLanguages | `IReadOnlyList<string>` (static, get) | App manifest language list — languages the app declares support for. |
| ApplicationLanguages.Languages | `IReadOnlyList<string>` (static, get) | App runtime language list — intersection of user profile and manifest lists (or the app default if empty). |
| ApplicationLanguages.PrimaryLanguageOverride | `string` (static, get/set) | Optional override folded into the runtime language list ahead of the intersection. |
| `<Resource Language="x-generate"/>` | manifest XML | Auto-expands to the union of language qualifiers found across the project's resource files at build time. |

## Notes

- Even resources in the app's default language must carry an explicit language qualifier (e.g. `\Assets\Images\en-US\logo.png`).
- Prefer a script sub-tag where no Suppress-Script value is defined for the language (e.g. `zh-Hant`, `zh-Hans` rather than bare `zh-CN`/`zh-TW`); omit the region sub-tag for languages with a single standard dialect (`ja` rather than `ja-JP`).
- The undetermined tag `und` acts as a wildcard fallback resource matched after any more specific language match; `und-<script>` (e.g. `und-Latn`) scopes a fallback to a writing system.
- `Windows.Globalization` APIs use the app runtime language list by default, falling back to the user's system/region locale (the same one used for the system clock) if no runtime language has a matching format; most also accept an explicit language-list override.
- If the user profile language and a manifest-supported language are regional variants of the same base language, the user's regional variant becomes the runtime language even though localized resources still load from the manifest-supported variant (e.g. user `en-GB` + app `en-US` → runtime `en-GB`, resources `en-US`).

## Related

- [ApplicationLanguages](./application-languages.md)
- [resource-qualifiers](./resource-qualifiers.md)
- [resource-loader-resw](./resource-loader-resw.md)
