# WPR/WPA NPU profiling (Neural Processing profile)

Since Windows Performance Toolkit (WPT) v11 (May 2024+), Windows Performance Recorder (WPR) ships a built-in **Neural Processing** profile that records Microsoft Compute Driver Model (MCDM) interactions with the NPU, and Windows Performance Analyzer (WPA) adds a dedicated NPU analysis table so you can see which processes use the NPU and the callstacks submitting work.

## Signature / Usage

```powershell
wpr -start NeuralProcessing -start CPU
# reproduce the AI workload
wpr -stop npu_trace.etl
wpa.exe npu_trace.etl
# In WPA: Neural Processing -> NPU Utilization graph
```

## Options / Props

| Profile / graph | Purpose |
|------|-------------|
| `NeuralProcessing` (WPR built-in profile) | Records MCDM interactions with the NPU |
| WPA "Neural Processing" NPU analysis table | Shows NPU utilization, processes using the NPU, and submitting callstacks in a single timeline alongside CPU/Disk/Network |
| Combine with `CPU`, `Disk`, etc. built-in profiles | Correlate pre/post-processing work on the CPU with NPU inference windows |

## Notes

- This NPU analysis table is additive to the general-purpose WPR/WPA workflow (recording profiles, symbol setup, choosing WPR/WPA vs Visual Studio Profiler vs PerfView) — that general guidance lives in the windows-testing-performance skill; this page covers only the Copilot+ PC-specific `NeuralProcessing` profile and NPU table.
- Requires Windows ADK (Windows Performance Toolkit, May 2024+ release) — download the Windows ADK Toolkit to get WPR UI, WPA, and GPUView.
- Combine with the ONNX Runtime ETW provider profiles to correlate NPU hardware activity with ONNX Runtime session/inference events in the same WPA timeline.
- For NPU sub-details beyond what WPA's NPU table exposes (sub-HW metrics, memory bandwidth), Microsoft's guidance also points to the third-party **Qualcomm Snapdragon Profiler** (`qprof`), a GUI system-wide profiler for Qualcomm SoC CPUs/GPUs/DSPs/NPUs.

## Related

- [ONNX Runtime ETW tracing in WPA](./onnxruntime-etw-tracing.md)
- [GPUView NPU support](./gpuview-npu.md)
- [Task Manager NPU view](./task-manager-npu.md)
