# Resource qualifiers (language, scale, contrast, theme, ...)

The MRT Core resource system selects the right resource file at runtime by matching folder or file name **qualifiers** (`<qualifier-name>-<qualifier-value>`, e.g. `language-ja`, `scale-200`, `contrast-high`) against the current runtime context (display language, DPI scale, high-contrast setting, app theme, etc.).

## Signature / Usage

```console
\Strings\language-ja\Resources.resw
\Assets\Images\scale-200\logo.png
\Assets\Images\contrast-high\logo.png

# Equivalent file-name form
\Strings\Resources.language-ja.resw
\Assets\Images\logo.scale-200.png
\Assets\Images\logo.contrast-high.png

# Multiple qualifiers combined with underscore
\Assets\Images\contrast-high_scale-400\logo.png
```

## Options / Props

| Qualifier name | Values | Description |
|------|------|-------------|
| language | any BCP-47 tag | Display-language match; typically names `\Strings\<lang>\` folders. The `language-` prefix can be omitted in folder names only (`\Strings\ja\`). |
| scale | 100, 200, 400, ... | Display scale factor, matched to `DisplayInformation.ResolutionScale` or the next-larger size. |
| contrast | standard, high, black, white | High-contrast theme setting. |
| theme | (light/dark, via `Application.RequestedTheme`) | App mode / theme setting. |
| layoutdirection | (LTR/RTL derived) | Reading-order/text-alignment direction; used when simple `FlowDirection` mirroring isn't sufficient. |
| homeregion | ISO 3166-1 alpha-2 / numeric | User's country/region setting. |
| targetsize | pixel side length | Icon size for File Explorer file-type/protocol icons. |
| alternateform | e.g. `msft-phonetic` | Alternate resource form; `msft-phonetic` is reserved for Japanese furigana. |
| configuration | free-form, matches `MS_CONFIGURATION_ATTRIBUTE_VALUE` | Authoring-time-only resource selection (e.g. `test`, `designer`). |

## Notes

- **Actual vs. neutral match**: a file/folder with no qualifier of a given name (e.g. plain `logo.png`) is a *neutral* fallback, used only when no qualifier value matches the current context.
- Folder-level qualifiers apply to every file inside; file-level qualifiers (`logo.contrast-high.png`) suit single-file cases.
- `altform-lightunplated` is the recommended qualifier for shell light-theme taskbar/switcher assets (introduced in the Windows 10 May 2019 Update), replacing reliance on `altform-unplated` + `theme-light` (which is unreliable on RS5 and earlier).
- Qualifier names/values are case-insensitive.
- See `ResourceContext.QualifierValues` for the full reference table of qualifier values recognized at runtime.

## Related

- [resource-loader-resw](./resource-loader-resw.md)
- [bidirectional-text](./bidirectional-text.md)
