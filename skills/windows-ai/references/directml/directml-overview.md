# DirectML Overview

Direct Machine Learning (DirectML) is a low-level, hardware-accelerated API for machine learning (ML) inferencing on Windows. It has a native C++, nano-COM, DirectX 12-style programming interface and workflow, and is supported by all DirectX 12-compatible hardware.

> DirectML is in sustained engineering: it continues to be supported, but new feature development has moved to Windows ML for Windows-based ONNX Runtime deployments.

## Signature / Usage

DirectML is built directly on top of Direct3D 12. A DirectML device is always associated with exactly one underlying `ID3D12Device`, and DirectML records its work (operator initialization and dispatch) into the same `ID3D12GraphicsCommandList` used for rendering, then executes it on an `ID3D12CommandQueue` chosen by the application.

High-level workflow:

```text
Initialization
1. Create Direct3D 12 device, command queue, command list, descriptor heaps.
2. Create the DirectML device (DMLCreateDevice) and operator instances.
3. Record binding/initialization of operators into the command list; execute the queue.

Execution
1. Upload weight tensors into Direct3D 12 buffer resources.
2. Bind those resources as input/output tensors; record binding + dispatch into the command list.
3. Close and execute the command list.
```

DirectML never allocates or manages Direct3D 12 resources, command lists, or queues on its own — resource lifetime, synchronization, and scheduling are entirely the application's responsibility, exactly as with raw Direct3D 12.

## Options / Props

| Concept | Description |
|---------|-------------|
| Operator | A single hardware-accelerated ML primitive (activation, convolution, pooling, GEMM, etc.). See `IDMLOperator`. |
| Layer-by-layer execution | The application creates, initializes, and dispatches each operator individually, giving maximal scheduling control (for example, interleaving with rendering work). |
| Graph-based execution | The application describes a directed acyclic graph of operators (`DML_GRAPH_DESC`) and compiles it as a single unit via `IDMLDevice1::CompileGraph`, letting DirectML choose traversal order and apply cross-operator optimizations. |
| DirectMLX | A header-only C++ helper library that provides a more convenient syntax for building graphs of DirectML operators. |

## Notes

- Namespace/API surface: native C++ COM API declared in `directml.h` (Win32), distinct from WinRT/UWP media or graphics APIs and from ML frameworks such as PyTorch or ONNX Runtime that can use DirectML as a backend.
- DirectML was introduced in Windows 10, version 1903, and the corresponding Windows SDK.
- Two consumption models exist besides raw DirectML: the ONNX Runtime DirectML execution provider (model-level, cross-platform ONNX format) and PyTorch with DirectML (`torch-directml` package).

## Related

- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
- [DML_GRAPH_DESC / IDMLDevice1::CompileGraph](./graphs.md)
- [DirectML version history](./version-history.md)
