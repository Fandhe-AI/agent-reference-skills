# Resource Qualifiers (language / scale / contrast / theme...)

A qualifier tailors a resource (file, folder, or string) to a runtime context such as display language, scale factor, or high-contrast setting. A qualifier is formed as `<qualifier name>-<qualifier value>` (e.g. `contrast-standard`, `scale-200`, `language-de-DE`), applied to folder or file names. `KnownResourceQualifierName` exposes the well-known qualifier name strings.

## Signature / Usage

```console
\Assets\Images\scale-100\<logo.png, ...>
\Assets\Images\scale-200\<logo.png, ...>
\Assets\Images\logo.contrast-high.png
\Strings\language-en\Resources.resw
\Strings\en\Resources.resw            (language- prefix may be omitted in folder names only)

\Assets\Images\contrast-high\scale-400\<logo.png, ...>      (multiple qualifiers, nested folders)
\Assets\Images\contrast-high_scale-400\<logo.png, ...>      (multiple qualifiers, underscore-joined)
```

```csharp
var resourceContext = resourceManager.CreateResourceContext();
resourceContext.QualifierValues[Microsoft.Windows.ApplicationModel.Resources.KnownResourceQualifierName.Language] = "de-DE";
```

## Options / Props

| Qualifier name | Values | Description |
|------|------|--------------|
| `language` | BCP-47 language tag (e.g. `en-US`, `ja`) | Display language setting. `language-` prefix can be omitted in folder names only. |
| `scale` | `100`, `200`, `400`, ... | Display scale factor; matches `DisplayInformation.ResolutionScale` or the next-largest scale. |
| `contrast` | `standard`, `high`, `black`, `white` | High contrast setting. |
| `theme` | app mode value | Matches `Application.RequestedTheme` or the system light/dark mode setting. |
| `homeregion` | ISO 3166-1 alpha-2 / M49 numeric region code | User's country/region setting. |
| `layoutdirection` | direction value | Layout direction of the display language (e.g. RTL for Arabic/Hebrew), beyond simple `FlowDirection` mirroring. |
| `targetsize` | integer (pixels) | Side length of a square icon, primarily for file type association / protocol icons in File Explorer. |
| `dxfeaturelevel` | — | Legacy Direct3D downlevel hardware qualifier; not recommended for new apps. |
| `configuration` | arbitrary string | Matches `MS_CONFIGURATION_ATTRIBUTE_VALUE` environment variable; used for authoring-time-only resources (e.g. `test`, `designer`). |
| `alternateform` | e.g. `msft-phonetic` | Alternate resource form, reserved value `msft-phonetic` used for Japanese furigana strings. |
| `altform-unplated` / `altform-lightunplated` | — | Taskbar/Alt+Tab icon variants for dark vs. light Windows shell theme; don't combine `theme-light` with `altform-unplated`. |

## Notes

- Package: `Microsoft.Windows.ApplicationModel.Resources` (Windows App SDK). `KnownResourceQualifierName` (properties: `Contrast`, `Custom`, `DeviceFamily`, `HomeRegion`, `Language`, `LayoutDirection`, `Scale`, `TargetSize`, `Theme`) supplies these names as constants for use with `ResourceContext.QualifierValues`.
- Qualifier names and values are case-insensitive.
- A resource file/folder with no qualifier is a *neutral* match, used as a fallback when no qualifier value is an *actual* match for the current context.
- Multiple qualifiers combine either as nested folders or joined by `_` in a single folder/file name: `<qualifier1>[_<qualifier2>...]`.
- See `ResourceContext.QualifierValues` for the full reference of possible qualifier values.

## Related

- [ResourceContext](./resource-context.md)
- [Localization](./localize-strings.md)
- [resources.pri and MakePri](./resources-pri-makepri.md)
