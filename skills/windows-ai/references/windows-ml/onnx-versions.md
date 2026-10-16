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
| `Microsoft.Windows.AI.MachineLearning` (Windows ML 2.x) `2.4.89` (released 9/22/2026) | [1.27.1](https://github.com/microsoft/onnxruntime/releases/tag/v1.27.1) (7/10/2026) | [Microsoft.Windows.AI.MachineLearning](https://www.nuget.org/packages/Microsoft.Windows.AI.MachineLearning) |
| `Microsoft.WindowsAppSDK.ML` (Windows ML 1.8.x) `1.8.2197` (released 5/12/2026) | 1.23.5 (`840c8d7`) | [Microsoft.WindowsAppSDK.ML](https://www.nuget.org/packages/Microsoft.WindowsAppSDK.ML) |

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
- **2.x ORT floor**: the 2.x line ships ORT 1.24 or higher via `Microsoft.Windows.AI.MachineLearning`. When using `Microsoft.WindowsAppSDK.ML`, check that package's dependency on `Microsoft.Windows.AI.MachineLearning` to determine which ORT version applies.
- **Release history**: the 2.x history table also lists preview / experimental / rc builds (e.g. `2.7.2021-experimental` and `2.6.74-rc` → ORT 1.30.0, `2.5.83-rc` → ORT 1.28.2); only the current release is officially supported.
- **Running multiple ORT versions in one app**: see [Multiple ONNX Runtime versions](./multiple-onnx-versions.md).
- Framework-dependent deployment lets an app receive ORT/EP revision updates automatically without recompiling; minor/major Windows App SDK version bumps still require a manual app update.

## Related

- [Migrate to Windows ML](./migrate-to-windows-ml.md)
- [Windows ML execution providers](./supported-execution-providers.md)
- [Install and deploy Windows ML](./deployment-bootstrap.md)
- [Register execution providers](./register-execution-providers.md)
- [Multiple ONNX Runtime versions](./multiple-onnx-versions.md)
