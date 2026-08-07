# Windows ML APIs

Overview of the API surface behind Windows ML, shipped in the `Microsoft.WindowsAppSDK.ML` NuGet package: the superset of *Windows ML APIs* (`Microsoft.Windows.AI.MachineLearning` namespace, e.g. `ExecutionProviderCatalog`) and Windows ML's implementation of certain *ONNX Runtime APIs* (e.g. `OrtCompileApi`).

## Signature / Usage

```python
# Python: Windows App SDK must be initialized before any Windows ML calls
from winui3.microsoft.windows.applicationmodel.dynamicdependency.bootstrap import (
    InitializeOptions,
    initialize
)
with initialize(options=InitializeOptions.ON_NO_MATCH_SHOW_UI):
    # Your Windows ML code here
    pass
```

## Notes

- C#/C++ projects reference the Windows ML runtime `.winmd` files via `Microsoft.WindowsAppSDK.ML`; Python uses the `winui3-Microsoft.Windows.AI.MachineLearning` wheel (via the `pywinrt` project).
- Windows ML is a framework-dependent component: reference `Microsoft.WindowsAppSDK` (recommended), or both `Microsoft.WindowsAppSDK.ML` and `Microsoft.WindowsAppSDK.Runtime` directly.
- C# uses `Microsoft.ML.OnnxRuntime` for inference; C++ uses the ONNX Runtime C API directly; Python uses the `onnxruntime-windowsml` wheel.
- Python: registration is separate between native and Python ONNX Runtime environments — register EPs via the Python API directly, not native calls. Also remove the `msvcp140.dll` packed by `pywinrt`'s `winrt-runtime` package to avoid conflicts, and install the missing VC++ redistributable.

## Related

- [Windows ML walkthrough](./tutorial.md)
- [ONNX Runtime inference in Windows ML](./onnx-runtime-inference.md)
- [ExecutionProviderCatalog](./execution-provider-catalog.md)
