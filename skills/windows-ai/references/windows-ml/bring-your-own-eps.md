# Bring your own execution providers

When you cannot rely on Windows ML EPs — for example, in offline environments or when you need strict version control — carry execution provider (EP) binaries directly in your project and register them with ONNX Runtime.

## Signature / Usage

```csharp
// Point ORT at the EP library you shipped
// The path depends on how you package and ship the EP
OrtEnv.Instance().RegisterExecutionProviderLibrary("XYZExecutionProvider", "XYZ.EP.dll");

// And then inference using ORT
...
```

```cpp
// Point ORT at the EP library you shipped
// The path depends on how you package and ship the EP
env.RegisterExecutionProviderLibrary("XYZExecutionProvider", L"XYZ.EP.dll");

// And then inference using ORT
...
```

## Options / Props

Known EP packages:

| EP | Package |
|------|-------------|
| AMDGPU (AMD) | `onnxruntime/onnxruntime-ep-amdgpu` (GitHub; must be built from source) |
| NvTensorRtRtx (NVIDIA) | `NVIDIA/TensorRT-RTX-EP-ABI` (GitHub) |
| OpenVINO (Intel) | `Intel.ML.OnnxRuntime.EP.OpenVINO` (NuGet) |
| QNN (Qualcomm) | `Qualcomm.ML.OnnxRuntime.QNN` (NuGet) |

## Notes

- The EP you reference must be compatible with the ORT version that ships with the Windows ML version your app targets. See [ONNX versions](./onnx-versions.md).
- Windows ML doesn't guarantee that an EP you bring will remain compatible with future Windows ML or ORT releases. When you update Windows ML, confirm that the EP supports the included ORT version, then test EP registration, session creation, and representative inference workloads before releasing your app.
- App distribution: each EP package adds approximately 80 MB or more to your app package size; you are responsible for updating EP packages and for validating each combination of your Windows ML, ORT, and EP versions; EP binaries must be included in your app package or installer — they are not downloaded at runtime.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/bring-your-own-eps (retrieved 2026-11-14)

## Related

- [Windows ML EPs vs. bring your own](./eps-vs-bring-your-own.md)
- [Windows ML execution providers](./supported-execution-providers.md)
- [Accelerate AI models with Windows ML](./execution-providers-overview.md)
- [Register execution providers](./register-execution-providers.md)
