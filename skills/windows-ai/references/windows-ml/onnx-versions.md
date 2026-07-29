# ONNX Runtime versions in Windows ML

Which ONNX Runtime (ORT) version ships with each Windows ML release, how to check/update the ORT and execution-provider (EP) versions on a device, and how to run more than one ORT version in a single app.

## Signature / Usage

```powershell
# Check your own device's installed EP version
Get-AppxPackage MicrosoftCorporationII.WinML.*
```

```csharp
// Check an end-user device's EP version programmatically
var providers = ExecutionProviderCatalog.GetDefault().FindAllProviders();
foreach (var provider in providers)
{
    Debug.WriteLine($"Windows ML EP: {provider.Name}");
    if (provider.PackageId != null)
    {
        var v = provider.PackageId.Version;
        Debug.WriteLine($"Version: {v.Major}.{v.Minor}.{v.Build}.{v.Revision}");
    }
}
```

## Options / Props

| Windows ML package | Current ORT version | NuGet package |
|------|-------------|------|
| `Microsoft.Windows.AI.MachineLearning` (Windows ML 2.x) | 1.24.6 (`800ac32`) | [Microsoft.Windows.AI.MachineLearning](https://www.nuget.org/packages/Microsoft.Windows.AI.MachineLearning) |
| `Microsoft.WindowsAppSDK.ML` (Windows ML 1.8.x) | 1.23.5 (`840c8d7`) | [Microsoft.WindowsAppSDK.ML](https://www.nuget.org/packages/Microsoft.WindowsAppSDK.ML) |

Only the current release of each package line is officially supported; preview/experimental and past versions are shown in the docs' release-history tables for reference only.

| API | Description |
|------|-------------|
| [`ExecutionProvider.PackageId`](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.ai.machinelearning.executionprovider.packageid) | Version info for an installed EP; `null` if the EP isn't installed yet |

| Windows App SDK version change | Automatic update for framework-dependent apps? |
|------|-------------|
| Revision (`x.y.Z`) | Yes — bug fixes/patches applied automatically |
| Minor (`x.Y.z`) | No — requires manually retargeting the app |
| Major (`X.y.z`) | No — breaking changes, requires manual update |

## Notes

- **Checking versions**: use `ExecutionProviderCatalog.GetDefault().FindAllProviders()` (C#/C++/Python/C, via `PackageId`/`WinMLEpInfo.version`) for end-user devices, or `Get-AppxPackage MicrosoftCorporationII.WinML.*` in PowerShell on your own dev device.
- **Updating EPs**: there is no app-programmatic way to force an EP update — EPs are updated automatically via Windows Update's optional nonsecurity preview ("D week") releases; see the release-history section of [Windows ML execution providers](./supported-execution-providers.md) for each EP's version history.
- **Running multiple ORT versions in one app**: Windows ML's ORT can run alongside a different standalone ORT copy by launching Windows ML in a **separate process** (e.g. via `System.Diagnostics.Process`) and exchanging results over stdout/IPC; this pattern only suits single-shot, string-in/string-out model invocations — persistent workers or richer data types need a proper [interprocess communication mechanism](https://learn.microsoft.com/en-us/windows/win32/ipc/interprocess-communications).
- Framework-dependent deployment lets an app receive ORT/EP revision updates automatically without recompiling; minor/major Windows App SDK version bumps still require a manual app update.

## Related

- [Migrate to Windows ML](./migrate-to-windows-ml.md)
- [Windows ML execution providers](./supported-execution-providers.md)
- [Install and deploy Windows ML](./deployment-bootstrap.md)
- [Register execution providers](./register-execution-providers.md)
