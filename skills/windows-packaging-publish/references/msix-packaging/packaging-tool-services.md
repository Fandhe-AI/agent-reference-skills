# Convert an Installer That Includes Services

The MSIX Packaging Tool can convert an installer that includes Windows services (Windows 10 version 2004 supports running MSIX packages with services). The resulting package requires admin privileges to install.

## Signature / Usage

Convert as with any application package. A **Services** report page appears before the final step. To add a service manually, add a `desktop6:Service` element to the app manifest (requires a restricted capability):

```xml
<!-- see the desktop6:Service manifest element reference -->
<desktop6:Service ... />
```

## Options / Props

Service details editable via double-click in the Services report:

| Field | Description |
|-------|-------------|
| Key name | Service name; not editable |
| Description | Service description |
| Display name | Service display name |
| Image path | Location of the service executable; not editable |
| Start account | Start account |
| Startup type | Automatic, Manual, Disabled, or Delayed |
| Arguments | Arguments run when the service starts |
| Dependencies | Service dependencies |

## Notes

- Support began with the January 2020 release of the MSIX Packaging Tool (1.2019.1220.0).
- Supported services with all needed information appear in the **Included** table; services needing information, a fix, or unsupported appear in **Excluded**. A fixed service can be moved to Included or left excluded.
- Limitations: the image path is not editable (fix the path before conversion, or edit the manifest afterward in Package Editor); the Services report is not available in Package Editor, so edit the manifest manually; services with dependencies outside the package are not supported.
- Source: https://learn.microsoft.com/en-us/windows/msix/packaging-tool/convert-an-installer-with-services, last updated 12/19/2019 (ms.date).

## Related

- [Know Your Installer (Conversion Readiness)](./know-your-installer.md)
- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [MSIX Packaging Tool Package Editor](./packaging-tool-package-editor.md)
