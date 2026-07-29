# GPUView NPU support

GPUView is a Windows Performance Toolkit tool that reads logged GPU and kernel events from an ETL trace and presents them graphically. Since WPT v11 (May 2024+), GPUView also reads NPU operations and DirectX events for Microsoft Compute Driver Model (MCDM) devices such as the NPU, alongside its existing GPU view.

## Signature / Usage

```text
# From an elevated command prompt, in the GPUView installation directory:
Log.cmd
# reproduce the AI/graphics workload (30s-1min)
Log.cmd
# merges the captured streams into Merged.etl in the GPUView directory
# Open Merged.etl in GPUView.exe to view GPU and NPU events graphically
```

## Options / Props

| Capability | Description |
|------|-------------|
| GPU operations | Original GPUView capability — per-frame/queue GPU scheduling and execution |
| NPU operations | New in WPT v11+ — NPU queue/execution events for MCDM devices |
| MCDM DirectX events | DirectX-level events for MCDM devices (the driver model the NPU uses), viewable alongside classic WDDM GPU events |

## Notes

- GPUView is part of the Windows Performance Toolkit (WPT); install it via the Windows ADK (May 2024+ release) alongside WPR UI and WPA.
- Use GPUView when you need queue-level scheduling detail for NPU/GPU work that WPA's higher-level NPU analysis table does not expose.

## Related

- [WPR/WPA NPU profiling](./wpr-wpa-npu-profiling.md)
- [ONNX Runtime ETW tracing in WPA](./onnxruntime-etw-tracing.md)
