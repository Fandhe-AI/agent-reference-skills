# Install and deploy Windows ML

Windows ML supports two deployment modes for the Windows ML Runtime: **self-contained** (bundled in the app) and **framework-dependent** (shared system-wide, auto-updated). Applies to both packaged (MSIX) and unpackaged apps.

## Signature / Usage

```powershell
# Framework-dependent, Python
pip install wasdk-Microsoft.Windows.AI.MachineLearning[all] wasdk-Microsoft.Windows.ApplicationModel.DynamicDependency.Bootstrap onnxruntime-windowsml
```

```python
# Bootstrap: all Windows ML calls must happen after Windows App SDK initialization
from winui3.microsoft.windows.applicationmodel.dynamicdependency.bootstrap import (
    InitializeOptions,
    initialize
)
with initialize(options=InitializeOptions.ON_NO_MATCH_SHOW_UI):
    # Your Windows ML code here
    ...
```

## Options / Props

| Mode | App size | Updates | Supported languages | NuGet packages |
|------|-------------|------|------|------|
| Self-contained | Larger (~41 MB bundled) | Manual | C#, C++/WinRT, C/C++ | `Microsoft.Windows.AI.MachineLearning` or `Microsoft.WindowsAppSDK.ML` (do NOT add `Microsoft.WindowsAppSDK.Runtime` or main `Microsoft.WindowsAppSDK`) |
| Framework-dependent | Smaller | Automatic via Windows App SDK servicing | C#, C++/WinRT, Python | `Microsoft.WindowsAppSDK.ML` + `Microsoft.WindowsAppSDK.Runtime` (or main `Microsoft.WindowsAppSDK` >= 1.8.1 with `WindowsAppSDKSelfContained=false`) |

| Runtime binary | Description | Approx. size |
|------|-------------|------|
| `Microsoft.Windows.AI.MachineLearning.dll` | Windows ML APIs (`ExecutionProviderCatalog`, etc.) | ~1 MB |
| `onnxruntime.dll` | The ONNX Runtime engine | ~20 MB |
| `DirectML.dll` | DirectML — the included GPU execution provider | ~20 MB |

## Notes

- Vendor execution providers (QNN, VitisAI, OpenVINO, NvTensorRtRtx, MIGraphX) are not part of the Windows ML Runtime binaries above; they're obtained separately via `ExecutionProviderCatalog` at runtime or bundled yourself (see [Bring your own execution providers](./bring-your-own-eps.md)).
- C/C++ only supports self-contained deployment (framework-dependent is not available for C/C++). The NuGet package ships CMake config under `build/cmake/`, exposing targets `WindowsML::WindowsML`, `WindowsML::Api`, `WindowsML::OnnxRuntime`, `WindowsML::DirectML`.
- Python only supports framework-dependent deployment (`wasdk-*` pip packages + matching Windows App SDK Runtime install); self-contained is not applicable.
- With .NET 6, `Microsoft.Windows.AI.MachineLearning` can install EPs, but `Microsoft.ML.OnnxRuntime` APIs require .NET 8+.

## Related

- [Get started with Windows ML](./get-started.md)
- [Execution provider catalog (ExecutionProviderCatalog)](./execution-provider-catalog.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
