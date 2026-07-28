# Sparse Packages and External Location Packages

"Packaging with external location" (also called a **sparse package**) grants **package identity** to an existing unpackaged Win32/WPF/WinForms app without replacing its installer or moving its binaries. A minimal identity-only MSIX package is registered and bound to the app's existing install directory via `uap10:AllowExternalContent`. Introduced in Windows 10, version 2004 (build 19041).

## Signature / Usage

```xml
<Package IgnorableNamespaces="uap uap10"
  xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
  xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
  xmlns:uap10="http://schemas.microsoft.com/appx/manifest/uap/windows10/10"
  xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities">
  <Identity Name="ContosoApp" Publisher="CN=Contoso" Version="1.0.0.0" ProcessorArchitecture="neutral" />
  <Properties>
    <DisplayName>Contoso App</DisplayName>
    <PublisherDisplayName>Contoso</PublisherDisplayName>
    <Logo>Assets\storelogo.png</Logo>
    <uap10:AllowExternalContent>true</uap10:AllowExternalContent>
  </Properties>
  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.19041.0" MaxVersionTested="10.0.26100.0" />
  </Dependencies>
  <Capabilities>
    <rescap:Capability Name="runFullTrust" />
    <rescap:Capability Name="unvirtualizedResources"/>
  </Capabilities>
  <Applications>
    <Application Id="ContosoApp" Executable="ContosoApp.exe" uap10:TrustLevel="mediumIL" uap10:RuntimeBehavior="win32App">
      <uap:VisualElements AppListEntry="none" DisplayName="Contoso App" Description="Contoso App"
        BackgroundColor="transparent" Square150x150Logo="Assets\Square150x150Logo.png" Square44x44Logo="Assets\Square44x44Logo.png" />
    </Application>
  </Applications>
</Package>
```

```csharp
using Windows.Management.Deployment;

var packageManager = new PackageManager();
var options = new AddPackageOptions { ExternalLocationUri = new Uri(externalLocation) };
var result = await packageManager.AddPackageByUriAsync(new Uri(packagePath), options);
if (result.ExtendedErrorCode != 0)
{
    throw new Exception($"Package registration failed: {result.ErrorText} (0x{result.ExtendedErrorCode:X8})");
}
```

## Options / Props

| Element / Attribute | Description |
|------|-------------|
| `uap10:AllowExternalContent` | Set to `true` in `Properties` — required so the package manifest can reference content outside the MSIX package (the app's own install directory). |
| `Identity` (`Name`, `Publisher`, `Version`, `ProcessorArchitecture="neutral"`) | Standard identity attributes; `Publisher` must match the signing cert subject; version cannot be re-registered without first unregistering the existing one. |
| `rescap:Capability Name="runFullTrust"` | Required capability for Win32 compatibility. |
| `rescap:Capability Name="unvirtualizedResources"` | Required so the app isn't subject to file/registry virtualization. |
| `Application/@uap10:TrustLevel="mediumIL"` and `@uap10:RuntimeBehavior="win32App"` | Required for Win32 apps declared in the identity package. |
| `VisualElements/@AppListEntry="none"` | Prevents the identity package itself from appearing in the Start menu / installed apps list. |
| `AddPackageOptions.ExternalLocationUri` / `StagePackageOptions.ExternalLocationUri` | Absolute `file:///` URI of the app's existing install directory; binds the identity package to that external location. |
| Application manifest `<msix>` element (`publisher`, `packageName`, `applicationId`) | Placed in the app EXE's side-by-side manifest; values must match the identity package's `Identity` and `Application` `Id` exactly, or identity is silently missing at runtime. |

## Notes

- Per-user registration: `Add-AppxPackage -Path <pkg> -ExternalLocation <dir>` (PowerShell) or `PackageManager.AddPackageByUriAsync` with `ExternalLocationUri` (API); unregister with `Get-AppxPackage <name> | Remove-AppxPackage` or `RemovePackageAsync`.
- Per-machine/provisioned registration: `Add-AppxPackage -Stage ... -ExternalLocation ...` + `Add-AppxProvisionedPackage -Online` (PowerShell) or `StagePackageByUriAsync` + `ProvisionPackageForAllUsersAsync` (API); unregister with `DeprovisionPackageForAllUsersAsync` + `RemovePackageAsync(..., RemovalOptions.RemoveForAllUsers)`.
- Self-signed certificates used for local development must be imported into the **Trusted People** store, or registration fails with `CERT_E_UNTRUSTEDROOT` (`0x800B0109`).
- `0x80073CF9` ("version already registered") means the exact package version is already registered; unregister first before re-registering the same version.
- If `Package.Current` is null / identity is absent at runtime with no error, verify the `ExternalLocationUri` passed at registration exactly matches the app's actual install directory.
- This is distinct from full MSIX packaging: the binaries remain outside the package (`ExternalLocation`), the existing installer keeps managing them, and updates continue to go through the app's own update mechanism rather than MSIX update.

## Related

- [Package Identity Overview](./package-identity-overview.md)
- [PackageManager Class](./package-manager.md)
- [APIs Requiring Package Identity](./apis-requiring-package-identity.md)
- [Detecting Package Identity](./detect-package-identity.md)
