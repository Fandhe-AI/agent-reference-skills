# Windows ML Runtime API concepts

Core concepts of the experimental Windows ML Runtime API: runtime, model, execution target, pipeline, stage, tensor, tokenizer, backends and ONNX Runtime compatibility.

## Signature / Usage

```text
IWinMLRuntime
  |-- loads --> IWinMLModel
  |-- creates -> IWinMLExecutionTarget
  `-- creates -> IWinMLPipelineBuilder
                   |-- adds/connects -> IWinMLStage
                   `-- Build() ------> IWinMLPipeline

IWinMLExecutionTarget -- creates --> IWinMLTensor
IWinMLStage ----------- binds -----> IWinMLTensor
IWinMLPipeline -------- Run() -----> stage outputs
```

Running a GGUF model:

```cpp
ComPtr<IWinMLRuntime> runtime;
THROW_IF_FAILED(WinMLCreateRuntime(IID_PPV_ARGS(runtime.GetAddressOf())));
ComPtr<IWinMLExecutionTarget> target;
THROW_IF_FAILED(runtime->CreateCpuExecutionTarget(target.GetAddressOf()));

ComPtr<IWinMLModel> model;
THROW_IF_FAILED(runtime->LoadModelFromFile(
    L"C:\\models\\qwen2.5-0.5b-instruct.gguf", nullptr, model.GetAddressOf()));

ComPtr<IWinMLPipelineBuilder> builder;
THROW_IF_FAILED(runtime->CreatePipelineBuilder(builder.GetAddressOf()));

ComPtr<IWinMLStage> stage;
THROW_IF_FAILED(builder->AddModelStage(
    model.Get(), target.Get(), L"decoder", stage.GetAddressOf()));
THROW_IF_FAILED(stage->RequestOutput(0));

// Set the llama.cpp context length before Build.
ComPtr<IWinMLStatefulStageOptions> stateOptions;
THROW_IF_FAILED(stage->QueryInterface(IID_PPV_ARGS(stateOptions.GetAddressOf())));
THROW_IF_FAILED(stateOptions->SetSequenceCapacityHint(4096));

ComPtr<IWinMLPipeline> pipeline;
THROW_IF_FAILED(builder->Build(pipeline.GetAddressOf()));

THROW_IF_FAILED(stage->BindInput(0, tokenIdsTensor.Get()));
THROW_IF_FAILED(pipeline->Run());

ComPtr<IWinMLTensor> logits;
THROW_IF_FAILED(stage->GetOutput(0, logits.GetAddressOf()));

// Start an independent sequence on the same pipeline.
THROW_IF_FAILED(pipeline->ResetExecutionState());
```

## Options / Props

### Backend capabilities

| Capability | ONNX Runtime | llama.cpp |
| --- | --- | --- |
| Stage shape | Any ONNX graph; several stages can be connected in one pipeline | One decoder stage per GGUF file: token IDs in (input 0), logits out (output 0) |
| Sequence state (KV cache) | Declare state tensor pairs with `IWinMLStatefulStageOptions`; Runtime manages them | Owned by the backend |
| Context length | `SetSequenceCapacityHint` before `Build`, or the model's declared capacity | `SetSequenceCapacityHint` before `Build` sets the llama.cpp context length |
| Provider pinning and ORT stage options | Supported (`WinMLRuntimeOrt.h`) | Not supported; `Build` returns `HRESULT_FROM_WIN32(ERROR_NOT_SUPPORTED)` |
| Placement report after `Build` | `IWinMLOrtStageDiagnostics` names requested and selected providers | `IWinMLStage::GetExecutionTarget` reports CPU or GPU |

### Execution target resolution at `Build`

| Stage target | ONNX Runtime | llama.cpp |
| --- | --- | --- |
| `nullptr` passed to `AddModelStage` | Automatic placement selects a compatible GPU EP when available, with CPU fallback | Offloads to the CUDA module when deployed and the model fits; otherwise CPU |
| `CreateCpuExecutionTarget` | Compatible CPU EP, ORT CPU provider as baseline | CPU |
| `CreateExecutionTarget` (GPU kind), `CreateExecutionTargetFromAdapter`, `CreateExecutionTargetFromD3D12` | Maps adapter identity to a compatible GPU EP device; `Build` fails if none matches | Requires at least partial CUDA offload; `ERROR_NOT_SUPPORTED` if no CUDA module, `ERROR_NOT_ENOUGH_MEMORY` if the model doesn't fit; the module chooses the GPU |
| `CreateExecutionTarget` (NPU kind) or NPU adapter | Maps to a compatible NPU EP device | Not supported (`ERROR_NOT_SUPPORTED`) |
| `IWinMLOrtCompatibility::CreateExecutionTarget(provider, kind, hardwareTarget)` | Pins one registered EP; `nullptr` hardwareTarget pairs the provider with one of its own devices | Not supported (`ERROR_NOT_SUPPORTED`) |

### Optional ONNX interfaces in `WinMLRuntimeOrt.h`

| Interface | Purpose |
| --- | --- |
| `IWinMLOrtCompatibility` | Select an already-registered EP |
| `IWinMLOrtModelSchema` | Input/output names |
| `IWinMLOrtNamedBindings` | Bind by name |
| `IWinMLOrtStageDiagnostics` | Requested/selected providers after `Build` |

## Notes

- Experimental and **not supported** for production use.
- Every method returns `HRESULT`; interface pointers follow COM reference counting. Optional capabilities are discovered with `QueryInterface`; an unavailable capability returns `E_NOINTERFACE`.
- Model loading verifies only that the artifact is recognized and structurally readable; target compatibility is committed when `Build` succeeds. A successful load does not guarantee every target can execute every operator.
- Free dimensions in a declared schema are represented by `UINT64_MAX`; a concrete `IWinMLTensor` always has resolved dimensions. Fixed or bounded shapes are the optimized design center.
- `IWinMLPipelineBuilder` is one-shot: add stages, connect ports by ordinal index, call `Build` once. Input bindings persist across runs; call `BindOutput` before execution to supply output storage.
- `IWinMLPipeline::Run` is synchronous; call `ResetExecutionState` between independent sequences. One pipeline can mix backends (for example a Whisper ONNX stage feeding a GGUF model).
- Call `IWinMLTensor::Lock` before accessing tensor bytes on the CPU; the pointer from `GetData` is valid only while the returned `IWinMLTensorDataLock` is alive.
- `CreateExecutionTargetFromD3D12` retains the caller's device and queue, but ORT execution uses only the adapter identity for EP selection.
- Ahead-of-time compilation is exposed through `IWinMLModelCompiler`; external weights through `IWinMLResourceMapReader`.
- `IWinMLTokenizer` provides low-level encode/decode; `IWinMLTokenizerDecoder` keeps an incremental-decode cursor per sequence.
- llama.cpp backend is app-local: when a project opts in, the NuGet package copies the llama.cpp adapter, core, and CPU module next to the app; GPU needs the optional CUDA module built for the same llama.cpp revision. The GGUF tokenizer and conversation formatting come from the GGUF file.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/runtime/concepts (retrieved 2026-10-16)

## Related

- [Windows ML Runtime API overview](./runtime-overview.md)
- [Run a model with the Windows ML Runtime API](./runtime-tutorial.md)
- [Generate text with your own language model](./runtime-text-generation.md)
