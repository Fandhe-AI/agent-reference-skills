# Windows ML Runtime API overview (experimental)

The Windows ML Runtime API is a native C/C++ local AI inferencing framework for Windows: load a model, choose a CPU/GPU/NPU execution target, bind tensors, compose stages into a pipeline, build and run it.

## Signature / Usage

```cpp
ComPtr<IWinMLExecutionTarget> target;
HRESULT hr = runtime->CreateExecutionTarget(
    WINML_EXECUTION_TARGET_KIND_NPU,
    WINML_EXECUTION_TARGET_PREFERENCE_EFFICIENCY,
    target.GetAddressOf());
if (hr == HRESULT_FROM_WIN32(ERROR_NOT_FOUND) ||
    hr == HRESULT_FROM_WIN32(ERROR_NOT_SUPPORTED))
{
    THROW_IF_FAILED(runtime->CreateExecutionTarget(
        WINML_EXECUTION_TARGET_KIND_GPU,
        WINML_EXECUTION_TARGET_PREFERENCE_PERFORMANCE,
        target.GetAddressOf()));
}
else
{
    THROW_IF_FAILED(hr);
}
```

## Options / Props

### Core object model

| Concept | Primary API | Description |
| --- | --- | --- |
| Runtime | `IWinMLRuntime` | Returned by `WinMLCreateRuntime`; loads model files, creates execution targets and pipeline builders. |
| Model | `IWinMLModel` | Immutable, opaque model artifact loaded from a file or buffer. Schema via `IWinMLModelSchema`. |
| Execution target | `IWinMLExecutionTarget` | CPU, GPU, or NPU placement token used to build stages and create tensors. |
| Pipeline builder | `IWinMLPipelineBuilder` | Adds model and processor stages, connects them, builds a prepared pipeline. |
| Pipeline | `IWinMLPipeline` | Prepared, runnable graph that executes bound tensors and produces output tensors. |
| Stage | `IWinMLStage` | Pipeline step owning positional input/output bindings and its resolved execution target. |
| Tensor | `IWinMLTensor` | Typed multi-dimensional data bound to stage inputs and outputs. |
| Text generation / speech recognition | Text Generation and Speech Recognition APIs | Higher-level workflows composed over caller-owned Runtime objects. |

### Backend selection by model file extension (`LoadModelFromFile`)

| Model file | Backend | Hardware acceleration |
| --- | --- | --- |
| `.onnx`, `.ort` | ONNX Runtime | Execution providers (EPs) that Windows installs and keeps up to date through the Windows ML EP catalog |
| `.gguf` | llama.cpp | App-local CPU module, plus optional CUDA module for NVIDIA GPUs deployed alongside the app. CPU and CUDA are the only llama.cpp backends validated for this release. |

## Notes

- The Runtime API is experimental and **not supported** for production; apps trying it should not be published to the Microsoft Store.
- Available in C++ and Python; **C# is currently not supported**.
- Use the Runtime API if the app targets only Windows and accepts experimental APIs (explicit control over hardware selection, tensor residency, pipeline placement, compilation). For cross-platform apps or existing ONNX Runtime session code, use the ONNX Runtime APIs included in Windows ML instead.
- Reusing one execution target expresses same-target affinity; distinct targets make cross-target transfer boundaries explicit. `Build` places each stage on the backend for its target.
- `CreateCpuExecutionTarget` is equivalent to requesting the CPU kind. `CreateExecutionTargetFromAdapter` and `CreateExecutionTargetFromD3D12` bind a target to a specific DXCore adapter or D3D12 device.
- The llama.cpp backend for `.gguf` requires at least partial GPU offload to honor a GPU target, and does not support NPU targets or provider pinning.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/runtime/overview (retrieved 2026-10-16)

## Related

- [Set up a C++ project for the Windows ML Runtime API](./runtime-get-started.md)
- [Windows ML Runtime API concepts](./runtime-concepts.md)
- [Run a model with the Windows ML Runtime API](./runtime-tutorial.md)
- [Generate text with your own language model](./runtime-text-generation.md)
- [Recognize speech with your own Whisper model](./runtime-speech-recognition.md)
