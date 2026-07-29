# Check for Installed Versions of the Windows App SDK Runtime

How to list the Windows App SDK runtime packages (Framework, Main, Singleton, DDLM) installed on a development computer, using PowerShell's `Get-AppxPackage`.

## Signature / Usage

```powershell
# 1.0 and later (Preview and stable)
Get-AppxPackage *appruntime*

# Shorter output, PackageFullName only
(Get-AppxPackage micro*win*appruntime*).packagefullname

# 1.0 Experimental
Get-AppxPackage *WindowsAppSDK*

# 0.8
Get-AppxPackage *reunion*
```

## Options / Props

| Field (in `Get-AppxPackage` output) | Meaning |
|---|---|
| `Name` | Package identity name, e.g. `Microsoft.WindowsAppRuntime.1.0` (Framework), `MicrosoftCorporationII.WindowsAppRuntime.Main.1.0` (Main), `Microsoft.WindowsAppRuntime.Singleton` (Singleton), `Microsoft.WinAppRuntime.DDLM.<version>-<arch>` (DDLM). |
| `Architecture` | `X64` / `X86` / `Arm64` — each installed architecture appears as a separate package entry. |
| `Version` | Windows App SDK runtime version installed. |
| `PackageFullName` | Full identity string (name_version_arch__publisherid); the value needed to target a specific package for removal. |
| `IsFramework` | `True` only for the Framework package. |
| `Dependencies` | For Main/Singleton/DDLM packages, lists the Framework package `PackageFullName` they depend on. |

## Notes

- The Framework, Main, Singleton, and DDLM packages each appear as separate entries; a machine with multiple installed Windows App SDK versions/architectures shows multiple sets.
- Use the `PackageFullName` values from this command's output as input to `Remove-AppxPackage` when cleaning up outdated versions.

## Related

- [Remove Outdated Windows App SDK Runtime Versions](./remove-windows-app-sdk-versions.md)
- [DeploymentManager](./deploymentmanager.md)
- [Deployment Architecture](./deployment-architecture.md)
