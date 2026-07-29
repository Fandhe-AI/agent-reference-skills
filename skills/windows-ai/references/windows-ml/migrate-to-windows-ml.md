# Migrate from standalone ONNX Runtime to Windows ML

Step-by-step guide for switching an app from the standalone (NuGet/GitHub-distributed) ONNX Runtime to the ONNX Runtime included in Windows ML, without changing ONNX API usage.

## Signature / Usage

```text
Step 1: Check ONNX Runtime version compatibility (see onnx-versions.md)
Step 2: Check Windows ML requirements (OS, x64/ARM64, Windows App SDK support)
Step 3: Remove standalone ONNX Runtime; install Windows ML
Step 4: (optional) Switch to Windows ML execution providers, or bring your own EPs
Step 5: Run your app
```

## Options / Props

| C++ header option | Effect |
|------|-------------|
| Use headers under the `winml/` directory | Explicit Windows ML ONNX Runtime headers, avoids conflicts with any bundled standalone ORT |
| Set `WinMLEnableDefaultOrtHeaderIncludePath=true` (project property) | Keeps the same unprefixed header include paths (`<onnxruntime_cxx_api.h>`) as the standalone ONNX Runtime you were using |

## Notes

- C# and Python code needs no changes: the ONNX APIs in Windows ML are identical to the standalone ONNX Runtime APIs.
- Models can be migrated incrementally — some models can keep using your current standalone ONNX Runtime copy while others use Windows ML, by [running multiple ONNX Runtime versions in one app](./onnx-versions.md) via a separate process.
- Reasons to switch: identical ONNX APIs, Windows-team support, smaller app size (EPs and ORT can be shared system-wide instead of bundled), and optional evergreen updates to both EPs and ONNX Runtime for framework-dependent deployment.

## Related

- [ONNX Runtime versions in Windows ML](./onnx-versions.md)
- [ONNX Runtime inference in Windows ML](./onnx-runtime-inference.md)
- [Install and deploy Windows ML](./deployment-bootstrap.md)
- [Windows ML execution providers](./supported-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
