# Windows ML execution providers

The set of execution providers included with, or dynamically downloadable for, the ONNX Runtime shipped in Windows ML.

## Signature / Usage

```text
Included with Windows ML's ONNX Runtime:
- CPU
- DirectML (legacy)

Dynamically downloadable via ExecutionProviderCatalog (Windows 11 24H2 / build 26100+):
Windows ML 2.x:
- AMD GPU (AMD)
- NvTensorRtRtx (NVIDIA)
- OpenVINO (Intel)
- QNN (Qualcomm)
- VitisAI (AMD)
- WebGPU (Experimental) (Microsoft)
- MIGraphX (Deprecated) (AMD)
Windows ML 1.8.x:
- MIGraphX (AMD)
- NvTensorRtRtx (NVIDIA)
- OpenVINO (Intel)
- QNN (Qualcomm)
- VitisAI (AMD)
```

## Options / Props

### Execution providers

Windows ML 2.x (`Microsoft.WindowsAppSDK.ML` or `Microsoft.Windows.AI.MachineLearning` version `2.x`):

| Execution provider | EpName | Vendor |
|------|-------------|------|
| AMD GPU | `AMDGPUExecutionProvider` | AMD |
| NvTensorRtRtx | `NvTensorRtRtxExecutionProvider` | NVIDIA |
| OpenVINO | `OpenVINOExecutionProvider` | Intel |
| QNN | `QNNExecutionProvider` | Qualcomm |
| VitisAI | `VitisAIExecutionProvider` | AMD |
| WebGPU (Experimental) | `WebGpuExecutionProvider` | Microsoft |
| MIGraphX (Deprecated) | `MIGraphXExecutionProvider` | AMD |

Windows ML 1.8.x (`Microsoft.WindowsAppSDK.ML` version `1.8.x`):

| Execution provider | EpName | Vendor |
|------|-------------|------|
| MIGraphX | `MIGraphXExecutionProvider` | AMD |
| NvTensorRtRtx | `NvTensorRtRtxExecutionProvider` | NVIDIA |
| OpenVINO | `OpenVINOExecutionProvider` | Intel |
| QNN | `QNNExecutionProvider` | Qualcomm |
| VitisAI | `VitisAIExecutionProvider` | AMD |

### Per-EP requirements

| Execution provider | Requirements |
|------|-------------|
| AMD GPU | Minimum `Microsoft.Windows.AI.MachineLearning` version `2.5.96`; Adrenalin Edition 24.12.1 or later |
| NvTensorRtRtx | NVIDIA GeForce RTX 30XX and above with minimum recommended driver version 32.0.15.5585 + Cuda version 12.5 |
| OpenVINO | See [Intel Windows ML support](https://www.intel.com/content/www/us/en/developer/articles/guide/windows-ml-support.html) |
| QNN | Snapdragon(R) X Elite - X1Exxxxx and Snapdragon(R) X Plus - X1Pxxxxx: Qualcomm(R) Hexagon(TM) NPU with driver version 30.0.140.0 or later |
| VitisAI | Adrenalin Edition 25.6.3 or later with NPU driver version 32.00.0203.280 or later |
| WebGPU (Experimental) | Any DirectX 12-capable GPU with up-to-date drivers (roughly 11th-gen Intel integrated graphics or NVIDIA Turing-class and newer recommended) |
| MIGraphX (Deprecated) | AMD RDNA 3 or later GPU; AMD GPU driver version 25.10.13.09 or later; not supported for GenAI scenarios today |

### WebGPU EP detail

| Item | Value |
|------|-------------|
| EpName | `WebGpuExecutionProvider` |
| Package family name | `Microsoft.WinML.ONNX.WebGPU.EP.2` |
| Minimum `Microsoft.Windows.AI.MachineLearning` | `2.4.66-preview` |
| Availability | Not available in Windows ML 1.8.x; requires experimental NuGet packages |

| MSIX version | WebGPU EP release notes |
|------|-------------|
| 0.4.0.0 | `0.4.0` |
| 0.3.0.0 | `0.3.0` |
| 0.2.1.0 | `0.2.1` |
| 0.1.0.0 | `0.1.0` |

## Notes

- Included providers: CPU and DirectML (legacy). All other providers are not included with Windows ML and are downloaded on demand.
- Dynamic download via `ExecutionProviderCatalog` is available on Windows 11 version 24H2 (build 26100) or greater, depending on device and driver compatibility.
- `MIGraphXExecutionProvider` is deprecated in Windows ML 2.x. AMD recommends transitioning to `AMDGPUExecutionProvider` for all AMD GPU devices. `MIGraphXExecutionProvider` will be retired from the Windows ML API interface with a new Windows ML major release.
- WebGPU EP is **experimental** and requires installing experimental NuGet packages; it is not available in Windows ML 1.8.x. See [WebGPU EP (experimental)](./webgpu-ep-experimental.md).
- Per-EP documentation: AMD GPU https://github.com/onnxruntime/onnxruntime-ep-amdgpu; NvTensorRtRtx https://onnxruntime.ai/docs/execution-providers/TensorRTRTX-ExecutionProvider.html; OpenVINO https://onnxruntime.ai/docs/execution-providers/OpenVINO-ExecutionProvider.html; QNN https://onnxruntime.ai/docs/execution-providers/QNN-ExecutionProvider.html; VitisAI https://onnxruntime.ai/docs/execution-providers/Vitis-AI-ExecutionProvider.html; MIGraphX https://onnxruntime.ai/docs/execution-providers/MIGraphX-ExecutionProvider.html.
- Version and release history of every EP: [Windows ML Execution Provider Releases](https://github.com/microsoft/WindowsML/wiki/Windows-ML-Execution-Provider-Releases).
- Before your app uses an execution provider, read the corresponding license terms; see [Windows ML third-party notices](./third-party-notices.md).
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/supported-execution-providers (retrieved 2026-11-14; page updated 2026-11-13)

## Related

- [Accelerate AI models with Windows ML](./accelerate-ai-models.md)
- [Windows ML third-party notices](./third-party-notices.md)
- [Execution providers overview](./execution-providers-overview.md)
- [Install execution providers](./install-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
