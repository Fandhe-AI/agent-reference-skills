# Copilot+ PCs developer guide

Developer guidance for Windows 11 Copilot+ PCs — a hardware class with a 40+ TOPS Neural Processing Unit (NPU) — covering device prerequisites, NPU access, ONNX Runtime/Windows ML programmatic access, and performance measurement of models running on the NPU.

## Signature / Usage

No API surface — this is a hardware/tooling guide. The recommended way to programmatically access the NPU has shifted from DirectML to Windows ML (WinML), which still uses ONNX Runtime under the hood but automates execution-provider (EP) discovery and delivery.

## Options / Props

| Topic | Key guidance |
|------|-------------|
| Device prerequisites | Requires an NPU capable of 40+ TOPS (e.g. Snapdragon X Elite, AMD Ryzen AI 300 series, Intel Core Ultra 200V series). |
| NPU access | Windows ML auto-detects hardware, selects the best EP (e.g. QNN for Qualcomm, OpenVINO for Intel), loads it automatically, and falls back to GPU/CPU if the preferred EP is unavailable. |
| Model formats | Models are often quantized (e.g. to INT8) for NPU execution; use pre-converted models from Qualcomm AI Hub or the ONNX Model Zoo, or bring-your-own via the Olive optimization tool. |
| Performance measurement | Use Task Manager (NPU tab), Windows Performance Recorder/Analyzer (with the Neural Processing profile), GPUView, and ONNX Runtime ETW events to trace load time, per-inference time, and EP parameters. |

## Notes

- Windows AI APIs (Phi Silica, imaging, OCR, etc.) are the ready-to-use layer that ships in Windows and runs on the NPU via Microsoft Foundry on Windows; this guide covers the underlying hardware/runtime layer beneath them.
- DirectML is in sustained engineering; Windows ML's IHV-specific execution providers are its replacement path.
- Task Manager on NPU-equipped devices shows NPU utilization alongside CPU/GPU/Memory/Disk.

## Related

- [Device requirements and fallback](./device-requirements.md)
- [Choose your Windows AI solution](./choose-your-windows-ai-solution.md)
- [Ready-to-use local LLMs on Windows](./local-llms.md)
