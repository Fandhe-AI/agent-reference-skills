# Windows App SDK: Check for / Remove Runtime Versions

Verifies which versions of the Windows App SDK runtime (Framework, Main, Singleton, and DDLM packages) are installed on a development computer, and removes outdated versions that are no longer needed.

## Signature / Usage

```powershell
# Check installed versions (1.0 and later)
get-appxpackage *appruntime*
# Shorter output, PackageFullName only
(get-appxpackage micro*win*appruntime*).packagefullname

# Check installed versions (1.0 Experimental / 0.8)
get-appxpackage *WindowsAppSDK*
get-appxpackage *reunion*

# Remove a specific version by PackageFullName
remove-appxpackage -Package Microsoft.ProjectReunion.0.8-preview_8000.144.525.0_x86__8wekyb3d8bbwe
```

## Options / Props

| Command | Description |
| --- | --- |
| `get-appxpackage *appruntime*` | Lists installed Windows App SDK runtime packages (1.0 and 1.0 Preview releases and later), including Framework, Main, Singleton, and DDLM packages with `PackageFullName`, `Version`, `Architecture`, `InstallLocation`. |
| `get-appxpackage *WindowsAppSDK*` | Same, for the 1.0 Experimental release. |
| `get-appxpackage *reunion*` | Same, for version 0.8 (Project Reunion). |
| `remove-appxpackage -Package <PackageFullName>` | Uninstalls the specified runtime package; run once per package (Framework, Main, DDLM) using the `PackageFullName` values from the `get-appxpackage` output. |
| Settings > Apps & features | Alternative UI to remove Main, Singleton, and DDLM packages (search for "reunion"); the Framework package does not appear here and must be removed via PowerShell. |

## Notes

- The Windows App SDK runtime consists of the Framework, Main, Singleton, and Dynamic Dependency Lifetime Manager (DDLM) packages; `get-appxpackage`/`remove-appxpackage` operate on all of them, while Settings > Apps & features can remove Main, Singleton, and DDLM but not the Framework package (which shows up only via PowerShell).
- Do not remove Windows App SDK runtime packages from end-user machines after deployment — doing so breaks other apps that depend on those packages. This guidance targets development computers, not deployed devices.
- Only one runtime version is normally needed (the one your app references); older versions can generally be removed safely unless another app on the machine depends on them.

## Related

- [Windows App SDK deployment architecture](./windows-app-sdk-deployment-architecture.md)
- [Windows App SDK Bootstrapper API](./windows-app-sdk-bootstrapper-api.md)
- [Windows App SDK: Self-Contained Deployment](./windows-app-sdk-self-contained-deploy.md)
