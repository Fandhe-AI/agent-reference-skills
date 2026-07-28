# Resources File (.resw) and ResourceLoader

Moves hardcoded string literals out of code, XAML markup, and the package manifest into a `.resw` Resources File so each supported language can ship a translated copy. Strings are then referenced from XAML via `x:Uid`, from code via `ResourceLoader`, and from the manifest via `ms-resource:` URIs.

## Signature / Usage

```xaml
<!-- Strings/en-US/Resources.resw contains "Greeting.Text" -->
<TextBlock x:Uid="Greeting"/>
```

```csharp
var resourceLoader = new Microsoft.Windows.ApplicationModel.Resources.ResourceLoader();
this.myXAMLTextBlockElement.Text = resourceLoader.GetString("Farewell");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Resource identifier | string, in `.resw` | Simple identifier (e.g. `Farewell`) loadable from code; property identifier (e.g. `Greeting.Text`, `Greeting.Width`) applied automatically via `x:Uid` matching. |
| `x:Uid="Name"` | XAML directive | Associates a XAML element with all property identifiers in the `.resw` sharing prefix `Name`; matched property identifiers override values set locally in markup. |
| `ms-resource:Identifier` | manifest string | References a `.resw` string resource from `Package.appxmanifest` (e.g. Display name). |

## Notes

- Default project layout: `\Strings\<language-tag>\Resources.resw`, e.g. `\Strings\en-US\Resources.resw`, `\Strings\de-DE\Resources.resw`. Resource identifiers are case-insensitive and must be unique per file; don't rename them after translation begins (causes "resource identifier shift").
- Resources outside the default `Resources.resw` file need a `/<FileName>/` prefix when referenced: `x:Uid="/ErrorMessages/PasswordTooWeak"` or `new ResourceLoader(ResourceLoader.GetDefaultResourceFilePath(), "ErrorMessages")`.
- Segmented resource names (containing `.`) become `/`-separated when loaded from code (`GetString("Fare/Well")` for a `.resw` entry named `Fare.Well`), but keep the dots when the segmentation is in the *file* name.
- To override the runtime language/qualifier used for a specific lookup, build a `ResourceContext` from `ResourceManager.CreateResourceContext()` and set `QualifierValues["Language"]` (or `resourceContext.Languages`), then call `ResourceMap.GetValue(name, resourceContext)`.
- Class libraries load their own resources the same way; resource identifiers from a library typically look like `LibraryName/ResourcesFileName/ResourceIdentifier`.
- Unpackaged apps can also use the Resource Management System (Windows 1903+): generate `resources.pri` manually with `MakePri.exe` and copy it next to the `.exe`; unpackaged apps resolve by system display language, not the user's preferred language list.
- For a packaged WinUI 3 app, declare each supported language explicitly in `package.appxmanifest`'s `<Resources>` element (replacing `<Resource Language="x-generate"/>`) so the build produces the corresponding `AppxManifest.xml` language list.

## Related

- [resource-qualifiers](./resource-qualifiers.md)
- [package-manifest-languages](./package-manifest-languages.md)
- [ApplicationLanguages](./application-languages.md)
