# Windows App SDK: Deploy Unpackaged / Packaged-with-External-Location Apps

Deployment guidance for desktop apps (WinUI 3, WPF, WinForms, or other) that are packaged with external location or fully unpackaged and use the Windows App SDK.

## Signature / Usage

```console
:: Deploy the Windows App SDK runtime silently
WindowsAppRuntimeInstall.exe --quiet

:: Force-update and restart any running Windows App SDK processes (1.1+)
WindowsAppRuntimeInstall.exe --force
```

```csharp
// Check whether the runtime is registered for the current user
bool registered = WindowsAppSDKRuntime.IsPackageRegisteredForCurrentUser(
    packageFamilyName, minVersion, architecture, PackageTypes.Framework);
```

## Options / Props

| Option | Description |
| --- | --- |
| Option 1: Installer | Silent `.exe` installer (per-architecture: x64/x86/Arm64) deploys Framework, Main, Singleton, DDLM MSIX packages; can be chained into a custom app setup via `ShellExecute`. |
| Option 2: Install packages directly | Existing setup/MSI installs the MSIX packages itself; check registration via `PackageManager.FindPackagesForUserWithPackageTypes`. |
| System-wide install | Requires elevation + admin rights; calls `ProvisionPackageForAllUsersAsync`; falls back to per-current-user if not possible. |

Installer return codes:

| Return code | Description |
| --- | --- |
| `0x0` | Success |
| `0x80073d06` | One or more packages failed to install |
| `0x80070005` | Not running elevated / insufficient admin privileges |

## Notes

- Experimental/preview Windows App SDK versions require sideloading enabled to install the runtime (Developer mode on Windows 11 at **Settings > Privacy & security > For developers**, or **Sideload apps**/**Developer mode** on Windows 10 1909 and earlier).
- Apps must additionally call the **Bootstrapper API** at startup to reference the Framework package — see the bootstrapper API reference.
- Deploy `.winmd` metadata files alongside the app unless disk size is a critical concern; their absence can silently limit or break functionality (e.g. cross-apartment marshaling).
- An enterprise policy may block sideloading/Developer mode settings — in that case, an IT administrator must enable it.

## Related

- [Windows App SDK deployment architecture](./windows-app-sdk-deployment-architecture.md)
- [Use the Windows App SDK bootstrapper API](./windows-app-sdk-bootstrapper-api.md)
- [Sideloading prerequisites](./sideloading-prerequisites.md)
- [Windows App SDK deployment guide for self-contained apps](./windows-app-sdk-self-contained-deploy.md)
