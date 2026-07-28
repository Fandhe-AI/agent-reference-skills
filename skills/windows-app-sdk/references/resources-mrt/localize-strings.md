# Localization (Resources Files / x:Uid)

Move hardcoded string literals from code, XAML markup, and the app package manifest into a Resources File (`.resw`), then reference them by resource identifier so translated copies can be loaded per display language.

## Signature / Usage

```xaml
<TextBlock x:Uid="Greeting"/>
```

```csharp
var resourceLoader = new Microsoft.Windows.ApplicationModel.Resources.ResourceLoader();
this.myXAMLTextBlockElement.Text = resourceLoader.GetString("Farewell");
```

```xml
<!-- Package.appxmanifest -->
<Resources>
    <Resource Language="en-US"/>
    <Resource Language="es-ES"/>
</Resources>
```

## Options / Props

| Concept | Description |
|------|--------------|
| `Strings\<lang>\Resources.resw` | Default string resource file location and naming, e.g. `Strings\en-US\Resources.resw`, `Strings\de-DE\Resources.resw`. |
| `x:Uid` directive | Associates a XAML element with a string resource identifier; resolves property identifiers such as `Greeting.Text`, `Greeting.Width`. |
| `ms-resource:` URI scheme | References a string resource identifier from the app package manifest, e.g. `ms-resource:AppDisplayName`. |
| `/<resources-file-name>/<identifier>` | Scopes an identifier reference to a non-default `.resw` file, e.g. `x:Uid="/ErrorMessages/PasswordTooWeak"`. |

## Notes

- Resource identifiers are case-insensitive and must be unique per resource file. Don't rename identifiers after strings are sent for translation ("resource identifier shift" causes retranslation).
- Segmented identifiers (containing `.`) become `/`-separated when loaded from code: `"Fare.Well"` → `resourceLoader.GetString("Fare/Well")`. Segmented **file** names keep their dots (don't substitute `/`).
- Attached properties need special `.resw` Name-column syntax, e.g. `Greeting.[using:Microsoft.UI.Xaml.Automation]AutomationProperties.Name`.
- Class libraries can call the same code to get a `ResourceLoader`; at runtime it resolves against the hosting app's resources, using an identifier of the form `LibraryName/ResourcesFileName/ResourceIdentifier`.
- Unpackaged apps use the system display language (not the user's preferred language list) for language resolution, and require manually generating `resources.pri` via `MakePri.exe` (see resources.pri / MakePri).
- WinUI 3 packaged apps must declare each supported language in `package.appxmanifest`'s `<Resources>` element for it to appear in the generated `AppxManifest.xml`.

## Related

- [ResourceLoader](./resource-loader.md)
- [ResourceQualifiers](./resource-qualifiers.md)
- [resources.pri and MakePri](./resources-pri-makepri.md)
