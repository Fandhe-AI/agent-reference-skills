# Group Applications Under a Start Menu Folder

Group multiple packaged applications (in one MSIX or across packages of one suite) under a single Start menu folder using the `VisualGroup` attribute. Available on Windows 11.

## Signature / Usage

```xml
<Package ...
     xmlns:uap3="http://schemas.microsoft.com/appx/manifest/uap/windows10/3"
     IgnorableNamespaces="... uap3">
  <Applications>
      <Application>
          <uap3:VisualElements DisplayName="App1"
                               Square150x150Logo="images/150x150.png"
                               Square44x44Logo="images/44x44.png"
                               Description="App1"
                               BackgroundColor="#777777"
                               AppListEntry="default"
                               VisualGroup="MyFolder">
              <uap:SplashScreen BackgroundColor="#777777"
                                Image="images/splash.png"/>
          </uap3:VisualElements>
      </Application>
  </Applications>
</Package>
```

## Options / Props

| Item | Description |
|------|-------------|
| `uap3` namespace | Must be declared on `<Package>` and listed in `IgnorableNamespaces` |
| `uap3:VisualElements` | Use the `uap3` prefix on both opening and closing tags |
| `VisualGroup` | Name of the Start menu folder; use the same value across `Application` entries (and other packages) to group them |

## Notes

- The page states the feature is available on Windows 11; the MSIX supported-platforms table lists Start menu groups from Windows 10 21H1 (see supported-platforms.md).
- In the MSIX Packaging Tool, use the Open manifest button in Package Editor to edit the manifest.
- Source: https://learn.microsoft.com/en-us/windows/msix/packaging-tool/create-start-group, last updated 04/15/2026 (ms.date).

## Related

- [MSIX Packaging Tool Package Editor](./packaging-tool-package-editor.md)
- [Package Manifest Schema](./package-manifest-schema.md)
- [MSIX Features and Supported Platforms](./supported-platforms.md)
