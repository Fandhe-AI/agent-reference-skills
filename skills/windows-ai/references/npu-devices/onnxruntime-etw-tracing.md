# ONNX Runtime ETW tracing in WPA

Starting with ONNX Runtime 1.17 (enhanced in 1.18.1), ONNX Runtime emits Event Tracing for Windows (ETW) events that Windows Performance Analyzer (WPA) can display alongside CPU/Disk/Network/NPU graphs in a single timeline — model load and session-creation time, EP configuration parameters, per-inference times, and per-operator profiling.

## Signature / Usage

```powershell
# Download ort.wprp and etw_provider.wprp from the onnxruntime GitHub repo, then:
wpr -start ort.wprp -start etw_provider.wprp -start NeuralProcessing -start CPU
# reproduce the issue, letting ONNX Runtime run
wpr -stop onnx_NPU.etl -compress
wpa.exe onnx_NPU.etl
# In WPA, open: "Neural Processing -> NPU Utilization" and "Generic Events" (ONNX events)
```

## Options / Props

| Use case | What the ETW events show |
|------|-------------|
| Model load / session creation | Time to load an AI model and create an ONNX Runtime session |
| Runtime parameters | ONNX Runtime configuration and Execution Provider (EP) parameters affecting performance |
| Per-inference times | Individual inference times and sub-details from the NPU (e.g. QNN EP) |
| Profiler | Per-operator timing contribution to total inference time |

## Notes

- Requires `ort.wprp` and `etw_provider.wprp` from the `microsoft/onnxruntime` GitHub repository, combined with the built-in `NeuralProcessing` and `CPU` WPR profiles.
- Requires WPT v11+ (Windows ADK, May 2024+ release) for WPR/WPA.
- See ONNX Runtime's own Execution Provider (EP) profiling docs for lower-level per-EP profiling options beyond the WPA integration.

## Related

- [WPR/WPA NPU profiling](./wpr-wpa-npu-profiling.md)
- [GPUView NPU support](./gpuview-npu.md)
