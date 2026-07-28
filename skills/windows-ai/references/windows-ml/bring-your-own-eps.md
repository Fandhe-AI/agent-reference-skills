# Bring your own execution providers

An alternative to Windows ML's `ExecutionProviderCatalog` download path: carry execution provider (EP) binaries directly in your app project, for managed enterprise devices with restricted Windows Update, offline environments, or strict version-pinning requirements.

## Signature / Usage

```csharp
// Point ORT at the EP library you shipped yourself
OrtEnv.Instance().RegisterExecutionProviderLibrary("XYZExecutionProvider", "XYZ.EP.dll");
// Then inference using ORT as usual
```

## Options / Props

| EP | Package |
|------|-------------|
| NvTensorRtRtx (NVIDIA) | `NVIDIA/TensorRT-RTX-EP-ABI` (GitHub) |
| OpenVINO (Intel) | `Intel.ML.OnnxRuntime.EP.OpenVINO` (NuGet) |
| QNN (Qualcomm) | `Qualcomm.ML.OnnxRuntime.QNN` (NuGet) |

## Notes

- The EP binary you reference must be compatible with the ONNX Runtime version shipped in the Windows ML version your app targets.
- Each bundled EP package adds approximately 80 MB or more to your app package.
- You are responsible for updating EP packages yourself when new versions are released — EP binaries are not downloaded at runtime with this approach.
- Compare against the catalog-based path in [Execution providers overview](./execution-providers-overview.md) before choosing.

## Related

- [Execution providers overview](./execution-providers-overview.md)
- [Install execution providers](./install-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
