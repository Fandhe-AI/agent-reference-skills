# Custom Properties for App Extensions

App extension properties are custom metadata declared in the extension's app manifest that a host can read without loading any extension content.

## Signature / Usage

Declare properties in `Package.appxmanifest` under `<uap3:AppExtension>`:

```xml
<uap3:AppExtension Name="com.microsoft.edge.extension" Id="FirstExtension" PublicFolder="Extension" DisplayName="MyExtension">
  <uap3:Properties>
    <Capabilities>
      <Capability Name="websiteContent" />
      <Capability Name="websiteInfo" />
      <Capability Name="browserWebRequest" />
      <Capability Name="browserStorage" />
    </Capabilities>
  </uap3:Properties>
</uap3:AppExtension>
```

Read them at runtime with `GetExtensionPropertiesAsync()`:

```csharp
string extensionVersion = "Unknown";
var properties = await ext.GetExtensionPropertiesAsync() as PropertySet;
if (properties != null)
{
    if (properties.ContainsKey("Version"))
    {
        PropertySet versionProperty = properties["Version"] as PropertySet;
        extensionVersion = versionProperty["#text"].ToString();
    }
}
```

For a property such as:

```xml
<uap3:Properties>
    <Version>1.0.0.0</Version>
</uap3:Properties>
```

## Notes

- Properties are optional; the host defines which properties exist and communicates them to extension developers. Properties form a property set and can be nested.
- Useful for versioning, permissions, capabilities, supported file types; a host can require a `version` property and vary loading behavior.
- A root version property is recommended in case the format changes; `Version` was intentionally not made an attribute of app extensions.
- The Visual Studio manifest designer cannot define properties; edit `Package.appxmanifest` directly.
- Because values live in the manifest, they can be indexed and exposed via API in the future.
- Source page last updated 02/06/2020 (ms.date).

## Related

- [Package Manifest Schema](./package-manifest-schema.md)
- [Package Extensions Guide](./package-extensions-guide.md)
- [MSIX SDK on Linux and Cross-Platform Distribution](./msix-sdk-linux.md)
