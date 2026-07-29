# Task Manager NPU view

On Copilot+ PC devices, Task Manager's Performance tab adds an NPU entry alongside CPU, GPU, Memory, Wi-Fi/Ethernet, and Disk, showing real-time NPU utilization for a first look at whether a process is using the NPU.

## Signature / Usage

```text
Task Manager > Performance tab > NPU
```

## Options / Props

| Field | Description |
|------|-------------|
| Utilization % | Real-time NPU load, alongside the equivalent CPU/GPU/Memory/Disk/network graphs |
| Driver version | NPU driver version in use |
| Physical location | Which physical NPU the counters refer to (for multi-accelerator systems) |

## Notes

- Task Manager's NPU view is the quickest way to confirm whether a process is engaging the NPU at all before reaching for WPR/WPA or GPUView for deeper analysis.
- For an idle-power baseline before capturing a trace, also check that CPU utilization is under 5% in Task Manager (see the general performance guidance in windows-testing-performance for that workflow) — this page covers the Copilot+ PC-specific NPU column only.

## Related

- [Copilot+ PC and NPU hardware overview](./npu-hardware-overview.md)
- [WPR/WPA NPU profiling](./wpr-wpa-npu-profiling.md)
