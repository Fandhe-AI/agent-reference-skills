# Copilot+ PC and NPU hardware overview

Copilot+ PCs are a class of Windows 11 hardware powered by a high-performance Neural Processing Unit (NPU) capable of 40+ trillion operations per second (TOPS), enabling on-device AI features with all-day battery life. Supported silicon spans the Arm-based Qualcomm Snapdragon X Elite, AMD Ryzen AI 300 series, and Intel Core Ultra 200V series.

## Signature / Usage

```text
Prerequisite check for Copilot+ PC developer guidance:
- NPU capable of 40+ TOPS
- One of: Qualcomm Snapdragon X Elite, AMD Ryzen AI 300 series, Intel Core Ultra 200V series
- Windows 11 (Copilot+ PC SKU)
```

## Options / Props

| Silicon | Vendor | Architecture |
|------|-------------|------|
| Snapdragon X Elite | Qualcomm | Arm64 |
| Ryzen AI 300 series | AMD | x64 |
| Core Ultra 200V series | Intel | x64 |

## Notes

- The NPU works alongside the CPU and GPU; Windows 11 assigns AI workloads to whichever processor is most appropriate.
- The Qualcomm Snapdragon X Elite NPU processes data in parallel and uses energy on AI tasks more efficiently than a CPU or GPU, extending battery life.
- Windows AI APIs (`Microsoft.Windows.AI` namespace, covered in the ai-apis category of this skill) are the highest-level way to consume NPU-accelerated features; Windows ML is the recommended way to programmatically target the NPU directly.

## Related

- [Task Manager NPU view](./task-manager-npu.md)
- [WPR/WPA NPU profiling](./wpr-wpa-npu-profiling.md)
