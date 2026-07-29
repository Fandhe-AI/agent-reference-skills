# Default apps platform

Platform for registering a packaged or unpackaged app as a candidate handler for file types and URI (link) types, and for directing users to the **Default apps** page in Windows Settings to make that app the chosen default.

## Signature / Usage

```xml
<!-- Package.appxmanifest: eligibility to be a default handler is declared via
     the same windows.fileTypeAssociation / windows.protocol extensions used
     for activation -- see protocol-file-association.md -->
```

```csharp
// Direct the user to the system Default Apps settings page (or the app's
// own entry within it) instead of changing the default programmatically.
await Windows.System.Launcher.LaunchUriAsync(new Uri("ms-settings:defaultapps"));
```

```cpp
// Win32: query which app is currently the default handler for a given
// ProgID / file extension / URI scheme.
IApplicationAssociationRegistration* pAAR;
CoCreateInstance(CLSID_ApplicationAssociationRegistration, NULL, CLSCTX_INPROC,
    IID_IApplicationAssociationRegistration, (void**)&pAAR);

LPWSTR pszAppName = NULL;
pAAR->QueryCurrentDefault(L".mysample", AT_FILEEXTENSION, AL_EFFECTIVE, &pszAppName);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ms-settings:defaultapps` | URI | Launches the **Default apps** settings page (or the app's own page within it) via `Launcher.LaunchUriAsync`; the only supported way to change a default programmatically is through this system UI. |
| `IApplicationAssociationRegistration::QueryCurrentDefault` | Win32 COM method | Queries which app is currently registered as the default handler for a file extension, ProgID, or URI scheme (`AT_FILEEXTENSION`, `AT_URLPROTOCOL`). |
| `uap:FileTypeAssociation` / `windows.protocol` | manifest extension | Declares the file types / URI schemes an app is eligible to handle (see [Protocol and FileTypeAssociation](./protocol-file-association.md)); required before an app can appear as a candidate in Default Apps. |
| ApplicationDefaults Policy CSP / Group Policy | MDM/GP policy | Lets IT admins control app default associations on managed devices; works with roaming user profiles. |

## Notes

- Windows requires default-app changes to go through the system **Default apps** Settings UI — apps cannot programmatically set themselves as the default; user setting data is obfuscated in the registry and protected by a filter driver (`UCPD.sys`) that blocks direct writes.
- Distinct from [Protocol and FileTypeAssociation](./protocol-file-association.md), which only declares an app's *eligibility* to be a handler via manifest extensions. This platform covers the separate concerns of directing users to Settings (`ms-settings:defaultapps`), querying the current default programmatically (`QueryCurrentDefault`), and default-apps policy in managed environments.
- Apps distributed via the Microsoft Store must follow Store Policy section 10.2.8, which requires using only supported methods (i.e. the system UI) for updating default-app settings.
- Both Windows desktop apps and WinUI apps can register as a default handler candidate.

## Related

- [Protocol and FileTypeAssociation](./protocol-file-association.md)
- [Launcher](./launcher.md)
- [Protocol activation](./protocol-activation.md)
