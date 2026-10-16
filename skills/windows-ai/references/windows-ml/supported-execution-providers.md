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
- WebGPU (Microsoft, experimental; Windows ML 2.x only)
```

## Options / Props

### Execution providers

Windows ML 2.x (`Microsoft.WindowsAppSDK.ML` or `Microsoft.Windows.AI.MachineLearning` 2.x) offers all six below; Windows ML 1.8.x (`Microsoft.WindowsAppSDK.ML` 1.8.x) offers the first five (no WebGPU).

| Execution provider | EpName | Vendor | Requirements (summary) |
|------|-------------|------|------|
| MIGraphX | `MIGraphXExecutionProvider` | AMD | AMD RDNA 3 or later GPU; AMD GPU driver version 25.10.13.09 or later; not supported for GenAI scenarios today |
| NvTensorRtRtx | `NvTensorRtRtxExecutionProvider` | NVIDIA | NVIDIA GeForce RTX 30XX and above, minimum recommended driver 32.0.15.5585 + CUDA 12.5 |
| OpenVINO | `OpenVINOExecutionProvider` | Intel | See Intel's Windows ML support page (https://www.intel.com/content/www/us/en/developer/articles/guide/windows-ml-support.html) |
| QNN | `QNNExecutionProvider` | Qualcomm | Snapdragon X Elite (X1Exxxxx) / X Plus (X1Pxxxxx), Hexagon NPU minimum driver 30.0.140.0 and above |
| VitisAI | `VitisAIExecutionProvider` | AMD | Min: Adrenalin Edition 25.6.3 with NPU driver 32.00.0203.280; Max: Adrenalin Edition 25.9.1 with NPU driver 32.00.0203.297 |
| WebGPU (Experimental) | `WebGpuExecutionProvider` | Microsoft | Any DirectX 12-capable GPU with up-to-date drivers (roughly 11th-gen Intel integrated graphics or NVIDIA Turing-class and newer recommended) |

### WebGPU EP detail

| Item | Value |
|------|-------------|
| Package family name | `Microsoft.WinML.ONNX.WebGPU.EP.2` |
| Minimum `Microsoft.Windows.AI.MachineLearning` | `2.4.66-preview` |
| Availability | Not available in Windows ML 1.8.x; requires experimental NuGet packages |
| MSIX versions | 0.1.0.0, 0.2.1.0, 0.3.0.0, 0.4.0.0 (EP releases 0.1.0, 0.2.1, 0.3.0, 0.4.0) |

## Notes

- Only the current version listed for each EP is supported; upcoming versions are preview-only, and past versions are shown for release history only.
- EP versions and release history: GitHub wiki "Windows ML Execution Provider Releases" (https://github.com/microsoft/WindowsML/wiki/Windows-ML-Execution-Provider-Releases).
- Updated EP versions ship via Windows Update's optional nonsecurity preview ("D week") releases.
- Before use, review the license terms for each EP; the full list is in the "Windows ML third-party notices" page (execution provider licenses section).
- `DirectML` is called out as **legacy** — new development should prefer the IHV-specific EPs (QNN/OpenVINO/VitisAI for NPU, NvTensorRtRtx/MIGraphX for GPU) where available.
- WebGPU EP is **experimental**; see the official "WebGPU EP" page for usage.

## Related

- [Execution providers overview](./execution-providers-overview.md)
- [Install execution providers](./install-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
