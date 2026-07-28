# Deployment Guide for Packaged Apps

Guidance for deploying framework-dependent packaged (MSIX) apps that use the Windows App SDK: declaring the Framework package dependency and calling the Deployment API for Main/Singleton packages.

## Signature / Usage

Two main requirements for a framework-dependent packaged app:

1. Deploy the Windows App SDK Framework package (declared automatically by WinUI 3 project templates via a `PackageDependency` element, or manually via `PackageReference` in a `.wapproj`).
2. Call the Deployment API (`DeploymentManager.GetStatus` / `DeploymentManager.Initialize`) to deploy the Main and Singleton packages, which cannot be expressed as package-manifest dependencies.

```xml
<ItemGroup>
   <PackageReference Include="Microsoft.WindowsAppSDK" Version="1.8.260209005">
       <IncludeAssets>build</IncludeAssets>
   </PackageReference>
</ItemGroup>
```

## Options / Props

| Item | Description |
|---|---|
| `DeploymentManager.GetStatus()` | Returns current deployment status of the loaded Windows App SDK runtime; identifies whether install work is needed. |
| `DeploymentManager.Initialize()` | Verifies required packages meet the minimum version, registers missing packages; call once at app startup, after process init but before using Singleton-backed features (e.g. push notifications). |
| `WindowsAppSdkDeploymentManagerInitialize` | Project property; default `true`. Set `false` to suppress the auto-initializer and call `Initialize` explicitly yourself. |

### Common Deployment API error codes

| Error code | Name | Common cause |
|---|---|---|
| 0x80070005 | ACCESS_DENIED | App isn't full trust or lacks the `packageManagement` restricted capability. |
| 0x80073CF0 | ERROR_INSTALL_OPEN_PACKAGE_FAILED | MSIX package corrupted or inaccessible. |
| 0x80073CF3 | ERROR_INSTALL_PREREQUISITE_FAILED | A required dependency (e.g. VCLibs) is missing/incompatible. |
| 0x80073D06 | ERROR_PACKAGES_IN_USE | Packages in use, cannot update; close apps using the runtime. |
| 0x80073CFB | ERROR_PACKAGE_ALREADY_EXISTS | Package version already registered (informational). |
| 0x80073CF9 | ERROR_INSTALL_FAILED | General installation failure; check event logs. |

## Notes

- Only packaged apps that are full trust, or that declare the `packageManagement` restricted capability, may use the Deployment API to install Main/Singleton package dependencies.
- Stable-channel Framework package deployment differs from preview: preview versions are deployed at build time as a NuGet dependency.
- Event logs: **Applications and Services Logs > Microsoft > Windows > AppxDeployment-Server**.

## Related

- [Deployment Architecture](./deployment-architecture.md)
- [DeploymentManager](./deploymentmanager.md)
- [DeploymentResult](./deploymentresult.md)
- [Deployment Guide for Unpackaged Apps](./deploy-unpackaged-apps.md)
