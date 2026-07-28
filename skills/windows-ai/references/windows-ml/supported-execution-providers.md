# Windows ML execution providers

The set of execution providers included with, or dynamically downloadable for, the ONNX Runtime shipped in Windows ML.

## Signature / Usage

```text
Included with Windows ML's ONNX Runtime:
- CPU
- DirectML (legacy GPU EP)

Dynamically downloadable via ExecutionProviderCatalog (Windows 11 24H2 / build 26100+):
- MIGraphX (AMD)
- NvTensorRtRtx (NVIDIA)
- OpenVINO (Intel)
- QNN (Qualcomm)
- VitisAI (AMD)
```

## Options / Props

| Execution provider | EpName | Requirements (summary) |
|------|-------------|------|
| MIGraphX (AMD) | `MIGraphXExecutionProvider` | GPU with driver version 25.10.13.09 (exact); not supported for GenAI scenarios |
| NvTensorRtRtx (NVIDIA) | `NvTensorRtRtxExecutionProvider` | NVIDIA GeForce RTX 30XX+, driver >= 32.0.15.5585, CUDA 12.5 |
| OpenVINO (Intel) | `OpenVINOExecutionProvider` | CPU: 11th Gen Intel Core+ (8GB+); GPU: 12th Gen Intel Core+ (16GB+, latest driver); NPU: Intel Core Ultra Series 1+ (16GB+, latest driver) |
| QNN (Qualcomm) | `QNNExecutionProvider` | Snapdragon X Elite / X Plus, Hexagon NPU driver >= 30.0.140.0 |
| VitisAI (AMD) | `VitisAIExecutionProvider` | Adrenalin Edition 25.6.3–25.9.1 with NPU driver 32.00.0203.280–297 |

## Notes

- Only the current version listed for each EP is supported; upcoming versions are preview-only, and past versions are shown for release history only.
- Updated EP versions ship via Windows Update's optional nonsecurity preview ("D week") releases.
- Before use, review the license terms for each EP (Ryzen AI, Intel OBL, NVIDIA SLA, Qualcomm license) — they differ per vendor.
- `DirectML` is called out as **legacy** — new development should prefer the IHV-specific EPs (QNN/OpenVINO/VitisAI for NPU, NvTensorRtRtx/MIGraphX for GPU) where available.

## Related

- [Execution providers overview](./execution-providers-overview.md)
- [Install execution providers](./install-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
