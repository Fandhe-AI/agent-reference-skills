# Protocol and FileTypeAssociation (package manifest extensions)

Package manifest `<uap:Extension>` declarations that register an app as a handler for a custom URI scheme (`windows.protocol`) or for specific file types (`windows.fileTypeAssociation`).

## Signature / Usage

```xml
<Package
  xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
  ...>
  <Applications>
    <Application Id="App" ...>
      <Extensions>
        <!-- URI scheme association -->
        <uap:Extension Category="windows.protocol">
          <uap:Protocol Name="alsdk">
            <uap:Logo>images\icon.png</uap:Logo>
            <uap:DisplayName>SDK Sample URI Scheme</uap:DisplayName>
          </uap:Protocol>
        </uap:Extension>

        <!-- File type association -->
        <uap:Extension Category="windows.fileTypeAssociation">
          <uap:FileTypeAssociation Name="mysampletype">
            <uap:DisplayName>Sample file type</uap:DisplayName>
            <uap:SupportedFileTypes>
              <uap:FileType>.mysample</uap:FileType>
            </uap:SupportedFileTypes>
          </uap:FileTypeAssociation>
        </uap:Extension>
      </Extensions>
    </Application>
  </Applications>
</Package>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `uap:Protocol/@Name` | string (2-2048 chars) | The URI scheme name (e.g. `mailto`); must be unique within the package. |
| `uap:Protocol/@DesiredView` | string | Preferred window size on launch: `default`, `useLess`, `useHalf`, `useMore`, `useMinimum`. |
| `uap:Protocol/@ReturnResults` | string | Whether the app returns a value on URI activation: `none`, `always`, `optional`. |
| `uap:Protocol` child `uap:Logo` / `uap:DisplayName` | element | Icon/name shown in Default Programs / Set Default Apps UI. |
| `uap:FileTypeAssociation/@Name` | string (1-64 chars, lowercase, no spaces) | Groups the file types under a name usable for default-app registration. |
| `uap:FileTypeAssociation/@DesiredView` | string | Same values as `Protocol`'s `DesiredView`. |
| `uap:FileTypeAssociation` child `uap:SupportedFileTypes` / `uap:FileType` | element | One or more `.ext` entries handled by the app. |
| `uap:FileTypeAssociation` child `uap:DisplayName` / `uap:Logo` / `uap:InfoTip` | element | Friendly name, icon, and tooltip text shown in File Explorer. |

## Notes

- Namespace: `http://schemas.microsoft.com/appx/manifest/uap/windows10` (package manifest schema), minimum Windows 10 1511 (10586).
- Certain URI scheme names and file extensions are reserved/forbidden by the OS and registration attempts for them are silently ignored — check the "Reserved URI scheme names and file types" reference before picking a scheme.
- The extension only grants **eligibility**; the user (or a call to `Launcher.LaunchUriAsync` / `LaunchFileAsync` with the app already chosen) still decides which registered app actually opens a given URI/file.
- Corresponding activation is received in `App.OnActivated` — see [Protocol activation](./protocol-activation.md).

## Related

- [Launcher](./launcher.md)
- [Protocol activation](./protocol-activation.md)
