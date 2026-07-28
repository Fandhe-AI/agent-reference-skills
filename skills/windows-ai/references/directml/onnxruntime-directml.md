# ONNX Runtime DirectML Execution Provider

The DirectML execution provider (EP) lets ONNX Runtime accelerate ONNX model inference on Windows using DirectML, without hand-writing DirectML operator graphs. It works across any commodity DirectX 12-capable GPU (NVIDIA Kepler+, AMD GCN 1st Gen+, Intel Haswell integrated graphics+, Qualcomm Adreno 600+).

## Signature / Usage

```csharp
// C#
SessionOptions sessionOptions = new SessionOptions();
sessionOptions.GraphOptimizationLevel = GraphOptimizationLevel.ORT_ENABLE_ALL;
sessionOptions.AppendExecutionProvider_DML(0); // 0 = default adapter (device ID)
```

```c
// C API
OrtSessionOptionsAppendExecutionProvider_DML(sessionOptions, deviceId);
// Or, to supply a custom IDMLDevice / ID3D12CommandQueue:
// SessionOptionsAppendExecutionProvider_DML1(sessionOptions, dmlDevice, commandQueue);
```

## Options / Props

| Name | Description |
|------|-------------|
| `AppendExecutionProvider_DML(deviceId)` | C# API to enable the DirectML EP; `deviceId` selects the DXGI/D3D12 adapter index (0 = default). |
| `OrtSessionOptionsAppendExecutionProvider_DML` | C API equivalent. |
| `SessionOptionsAppendExecutionProvider_DML1` | C API variant accepting an application-owned `IDMLDevice` and `ID3D12CommandQueue`, for interop with existing Direct3D 12 / DirectML resources. |
| NuGet package | `Microsoft.ML.OnnxRuntime.DirectML` |

## Notes

- Requires a DirectX 12-capable device and Windows 10 version 1903 or later; the EP currently targets DirectML 1.15.2 and ONNX opset 20 (with a small number of unsupported ops, for example GridSample-20 and DeformConv).
- Does not support memory-pattern optimizations or parallel execution: disable `enable_mem_pattern` and set the execution mode to `ORT_SEQUENTIAL`. Only one thread may call `Run()` on a given session at a time.
- Best performance requires tensor shapes to be known at session-creation time; for models with free/dynamic dimensions, supply named dimension overrides during session creation.
- DirectML is in sustained engineering — new Windows ONNX Runtime deployments are directed toward Windows ML, which wraps the same ONNX Runtime APIs and dynamically selects the best execution provider for the hardware.

## Related

- [DirectML Overview](./directml-overview.md)
- [PyTorch with DirectML](./pytorch-directml.md)
- [DirectML version history](./version-history.md)
