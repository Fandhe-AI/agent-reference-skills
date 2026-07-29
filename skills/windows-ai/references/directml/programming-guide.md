# DirectML Programming Guide

The application-facing patterns for writing DirectML code: the get-started workflow, resource binding, UAV barriers/synchronization, tensor strides for layout and padding, fused activations, helper functions, and the debug layer.

## Signature / Usage

```cpp
// Binding pattern (see IDMLBindingTable / DML_BINDING_DESC for the interfaces)
DML_BINDING_PROPERTIES props = dispatchable->GetBindingProperties();
// 1. Create a D3D12 descriptor heap sized for props.RequiredDescriptorCount.
// 2. dmlDevice->CreateBindingTable(&bindingTableDesc, IID_PPV_ARGS(&bindingTable));
// 3. bindingTable->BindTemporaryResource(&tempBindingDesc);   // if props.TemporaryResourceSize > 0
// 4. bindingTable->BindInputs(...); bindingTable->BindOutputs(...);
// 5. commandRecorder->RecordDispatch(commandList.Get(), dispatchable.Get(), bindingTable.Get());
```

## Options / Props

| Topic | Summary |
|-------|---------|
| Get started (3-step workflow) | Convert a model to ONNX (via ONNXMLTools or Olive), optimize it with Olive (DirectML-powered), then integrate it into the app with ONNX Runtime + DirectML (or the ONNX Runtime Generate() API for generative AI models). |
| Binding | Attaching resources (input/output tensors, temporary/persistent buffers) to a dispatchable (operator initializer or compiled operator) via `IDMLBindingTable`, a D3D12 descriptor heap, and `DML_BUFFER_BINDING`/`DML_BINDING_DESC` structures. |
| UAV barriers & synchronization | `RecordDispatch` inserts no UAV barriers itself; the app must insert UAV barriers on inputs/outputs whenever a data dependency exists between dispatches, and must not overwrite/release a bound descriptor heap or resource while GPU work using it is still in flight. |
| Strides (padding & layout) | `DML_BUFFER_TENSOR_DESC` has `Sizes` (logical shape) and `Strides` (physical memory layout); packed strides equal the product of lower-order dimension sizes, a stride of 0 expresses broadcasting, and larger-than-packed strides express padding. `Strides = nullptr` means packed NCHW/NCDHW. |
| Fused activations | Operators such as Convolution, GEMM, and batch/mean-variance normalization accept an optional `FusedActivation` operator description, letting an activation (Relu, LeakyRelu, Sigmoid, Tanh, GELU, etc.) execute without a memory roundtrip; the fused activation's `InputTensor`/`OutputTensor` must be `NULL`. |
| Helper functions | `DMLCalcBufferTensorSize` computes the minimum buffer size (bytes) for a tensor given its type, sizes, and strides; a `CalculateStrides` example computes NCHW/NHWC strides with optional broadcasting. |
| Debug layer | `DML_CREATE_DEVICE_FLAG_DEBUG` (passed to `DMLCreateDevice`) enables `DirectML.Debug.dll`, which emits detailed D3D12-info-queue or `OutputDebugStringA` messages for invalid API usage; enabling the Direct3D 12 debug layer alongside it is strongly recommended (required up to `DML_FEATURE_LEVEL_5_2`). |

## Notes

- DirectML is in sustained engineering; new Windows ONNX Runtime deployments are directed to Windows ML, which wraps the same ONNX Runtime APIs. See DirectML Overview.
- Temporary resources are scratch memory needed only during a dispatch and may be released/overwritten between dispatches; persistent resources must be supplied identically on every execute after operator-initializer time, and both must have buffer offsets aligned to `DML_TEMPORARY_BUFFER_ALIGNMENT` / `DML_PERSISTENT_BUFFER_ALIGNMENT` on a `D3D12_HEAP_TYPE_DEFAULT` heap.
- `DML_TENSOR_FLAG_OWNED_BY_DML` on an input tensor means DirectML copies and owns that tensor's data at operator-initialization time (bind it during initialization, not execution) — useful for weights that never change.
- Late binding (`DML_EXECUTION_FLAG_DESCRIPTORS_VOLATILE` passed to `CompileOperator`) lets bindings be set/changed after an operator is recorded into a command list, up until the list is submitted; without it, all bindings must be set before recording.
- Only operators in the `DML_OPERATOR_TYPE` enum that declare a `FusedActivation` member support fusion (for example Convolution, GEMM); any operator not in that list does not support it.
- Enabling the DirectML debug layer requires the Graphics Tools Feature-on-Demand package (`Add-WindowsCapability -Online -Name "Tools.Graphics.DirectX~~~~0.0.1.0"`) when DirectML is used as a system component, or is bundled with the `Microsoft.AI.DirectML` NuGet package when used as a standalone redistributable.

## Related

- [DirectML Overview](./directml-overview.md)
- [IDMLBindingTable / DML_BINDING_DESC](./idmlbindingtable.md)
- [IDMLCommandRecorder](./idmlcommandrecorder.md)
- [Tensors (DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC)](./tensors.md)
- [Handling errors and device-removal in DirectML](./errors-and-device-removal.md)
