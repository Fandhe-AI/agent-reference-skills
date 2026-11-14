# Windows ML third-party notices

License terms for the optional, dynamically downloaded third-party components of Windows ML: execution providers and the Llama.cpp / GGML / CUDA runtime components.

## Signature / Usage

Adapted (not in the official docs): the page contains no code; the following lists the two license groups it covers.

```text
Execution provider licenses          -> MIGraphX, NvTensorRtRtx, OpenVINO, QNN, VitisAI, WebGPU (experimental)
Llama.cpp and GGML component licenses -> Llama.cpp Core, GGML, CUDA GGML backend, NVIDIA CUDA runtime dependencies
```

## Options / Props

Execution provider licenses:

| Execution provider | Vendor | License terms |
|------|-------------|------|
| MIGraphX | AMD | [Ryzen AI Licensing Information](https://ryzenai.docs.amd.com/en/latest/licenses.html) |
| NvTensorRtRtx | NVIDIA | [NVIDIA SOFTWARE LICENSE AGREEMENT](https://docs.nvidia.com/deeplearning/tensorrt-rtx/latest/reference/sla.html) and [License Agreement for NVIDIA Software Development Kits — EULA](https://docs.nvidia.com/cuda/eula/index.html) |
| OpenVINO | Intel | [Intel OBL Distribution Commercial Use License Agreement v2025.02.12](https://cdrdv2.intel.com/v1/dl/getContent/849090?explicitVersion=true) |
| QNN | Qualcomm | Download the [Qualcomm Neural Processing SDK](https://www.qualcomm.com/developer/software/neural-processing-sdk-for-ai), extract the ZIP, and open the *LICENSE.pdf* file |
| VitisAI | AMD | [Ryzen AI Licensing Information](https://ryzenai.docs.amd.com/en/latest/licenses.html) |
| WebGPU (experimental) | Microsoft | WebGPU EP for Windows App SDK License and [ONNX Runtime License](https://github.com/microsoft/onnxruntime/blob/main/LICENSE) |

Llama.cpp and GGML component licenses:

| Component | License | License terms |
|------|-------------|------|
| Llama.cpp Core | MIT | [llama.cpp LICENSE](https://github.com/ggml-org/llama.cpp/blob/master/LICENSE) |
| GGML | MIT | [ggml LICENSE](https://github.com/ggml-org/ggml/blob/master/LICENSE) |
| CUDA GGML backend | MIT | [llama.cpp LICENSE](https://github.com/ggml-org/llama.cpp/blob/master/LICENSE) |
| NVIDIA CUDA runtime dependencies | NVIDIA CUDA Toolkit EULA | [License Agreement for NVIDIA Software Development Kits — EULA](https://docs.nvidia.com/cuda/eula/) |

## Notes

- Each component is governed by its own license terms, separate from the license that applies to Windows ML itself. Read the corresponding license terms before your app uses any of them.
- The NVIDIA CUDA runtime dependencies are CUDA Toolkit dependencies shipped as part of the CUDA GGML backend. This includes the dynamically loaded cuBLAS library, which your app acquires only after you set a flag indicating that you accept its license terms.
- The official table lists MIGraphX but not AMD GPU (`AMDGPUExecutionProvider`), which `supported-execution-providers` documents with the license link Ryzen AI Licensing Information.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/third-party-notices (retrieved 2026-11-14; page updated 2026-10-05)

## Related

- [Windows ML execution providers](./supported-execution-providers.md)
- [Accelerate AI models with Windows ML](./execution-providers-overview.md)
