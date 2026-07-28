# IDMLOperator / DML_OPERATOR_DESC

`IDMLOperator` represents an uncompiled DirectML operator, created via `IDMLDevice::CreateOperator` from a `DML_OPERATOR_DESC`. `DML_OPERATOR_DESC` is a generic, type-erased container that wraps one of the many concrete `DML_*_OPERATOR_DESC` structures (for example `DML_CONVOLUTION_OPERATOR_DESC`, `DML_GEMM_OPERATOR_DESC`, `DML_ACTIVATION_RELU_OPERATOR_DESC`).

## Signature / Usage

```cpp
struct DML_OPERATOR_DESC {
  DML_OPERATOR_TYPE Type;
  const void        *Desc;
};
```

```cpp
DML_ACTIVATION_RELU_OPERATOR_DESC reluDesc{ &inputTensorDesc, &outputTensorDesc };
DML_OPERATOR_DESC opDesc{ DML_OPERATOR_ACTIVATION_RELU, &reluDesc };

ComPtr<IDMLOperator> dmlOperator;
dmlDevice->CreateOperator(&opDesc, IID_PPV_ARGS(&dmlOperator));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Type` | `DML_OPERATOR_TYPE` | The operator kind (for example `DML_OPERATOR_CONVOLUTION`, `DML_OPERATOR_GEMM`, `DML_OPERATOR_ACTIVATION_RELU`). Determines which concrete struct `Desc` must point to. |
| `Desc` | `const void*` | Pointer to the concrete `DML_*_OPERATOR_DESC` struct whose type matches `Type`. |

## Notes

- `IDMLOperator` inherits from `IDMLDeviceChild`; it is uncompiled and cannot be dispatched directly — call `IDMLDevice::CompileOperator` to obtain an `IDMLCompiledOperator`, or reference it as a node in a `DML_GRAPH_DESC` and call `IDMLDevice1::CompileGraph`.
- DirectML exposes roughly 150 concrete operator descriptor structs covering activation, element-wise, convolution, pooling, reduction, and neural-network layer (GEMM/GRU/LSTM/RNN) categories; see [Key operators](./operators.md) for the most commonly used ones.

## Related

- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
- [IDMLCompiledOperator](./idmlcompiledoperator.md)
- [Key operators](./operators.md)
- [Tensors: DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC](./tensors.md)
- [DML_GRAPH_DESC / IDMLDevice1::CompileGraph](./graphs.md)
