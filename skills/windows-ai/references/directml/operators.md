# Key Operators

DirectML ships roughly 150 concrete `DML_*_OPERATOR_DESC` structs, wrapped by `DML_OPERATOR_DESC.Type` values such as `DML_OPERATOR_CONVOLUTION`, `DML_OPERATOR_GEMM`, and `DML_OPERATOR_ACTIVATION_RELU`. This page covers the most commonly used representative operators; the same pattern (a `DML_*_OPERATOR_DESC` struct referencing `DML_TENSOR_DESC` inputs/outputs) applies to the rest of the operator library (activation, element-wise, pooling, reduction, normalization, RNN/GRU/LSTM, and more).

## Signature / Usage

```cpp
// Convolution
struct DML_CONVOLUTION_OPERATOR_DESC {
  const DML_TENSOR_DESC     *InputTensor;
  const DML_TENSOR_DESC     *FilterTensor;
  const DML_TENSOR_DESC     *BiasTensor;      // optional
  const DML_TENSOR_DESC     *OutputTensor;
  DML_CONVOLUTION_MODE      Mode;
  DML_CONVOLUTION_DIRECTION Direction;
  UINT                      DimensionCount;
  const UINT                *Strides;
  const UINT                *Dilations;
  const UINT                *StartPadding;
  const UINT                *EndPadding;
  const UINT                *OutputPadding;
  UINT                      GroupCount;
  const DML_OPERATOR_DESC   *FusedActivation; // optional
};

// GEMM: Output = FusedActivation(Alpha * TransA(A) x TransB(B) + Beta * C)
struct DML_GEMM_OPERATOR_DESC {
  const DML_TENSOR_DESC   *ATensor;
  const DML_TENSOR_DESC   *BTensor;
  const DML_TENSOR_DESC   *CTensor;    // optional
  const DML_TENSOR_DESC   *OutputTensor;
  DML_MATRIX_TRANSFORM    TransA;
  DML_MATRIX_TRANSFORM    TransB;
  FLOAT                   Alpha;
  FLOAT                   Beta;
  const DML_OPERATOR_DESC *FusedActivation; // optional
};

// ReLU activation: f(x) = max(0, x)
struct DML_ACTIVATION_RELU_OPERATOR_DESC {
  const DML_TENSOR_DESC *InputTensor;
  const DML_TENSOR_DESC *OutputTensor;
};
```

## Options / Props

| Operator | `DML_OPERATOR_TYPE` | Description |
|----------|----------------------|-------------|
| Convolution | `DML_OPERATOR_CONVOLUTION` | Convolves `FilterTensor` with `InputTensor`; supports forward/backward (transposed) convolution via `Direction`/`Mode`, depth-wise convolution via `GroupCount`, and an optional fused bias + activation. Input layout `{BatchCount, InputChannelCount, [InputDepth], InputHeight, InputWidth}`. |
| GEMM | `DML_OPERATOR_GEMM` | General matrix multiplication with optional transpose of A/B, scalar `Alpha`/`Beta`, optional bias-like `CTensor`, and optional fused activation. Operates on 4D tensors `{BatchCount, ChannelCount, Height, Width}`, performing `BatchCount * ChannelCount` independent `{M,K} x {K,N} = {M,N}` multiplications. |
| ReLU activation | `DML_OPERATOR_ACTIVATION_RELU` | `f(x) = max(0, x)` element-wise; supports in-place execution (output may alias input). |

### DML_CONVOLUTION_OPERATOR_DESC key members

| Name | Type | Description |
|------|------|-------------|
| `Mode` | `DML_CONVOLUTION_MODE` | `DML_CONVOLUTION_MODE_CROSS_CORRELATION` (typical for inference) or `DML_CONVOLUTION_MODE_CONVOLUTION` (flips filter kernel order). |
| `Direction` | `DML_CONVOLUTION_DIRECTION` | `FORWARD` (inference) or `BACKWARD` (used together with `FORWARD` during training). |
| `GroupCount` | `UINT` | Number of groups to split the convolution into; set equal to input channel count for depth-wise convolution. |
| `FusedActivation` | `const DML_OPERATOR_DESC*` | Optional activation applied immediately after the convolution, for improved performance. |

### DML_GEMM_OPERATOR_DESC key members

| Name | Type | Description |
|------|------|-------------|
| `TransA` / `TransB` | `DML_MATRIX_TRANSFORM` | Whether to transpose `ATensor` / `BTensor` before multiplication. |
| `Alpha` / `Beta` | `FLOAT` | Scalar multipliers for the `A x B` product and the optional `CTensor`, respectively. |

## Notes

- All three operators require `DML_TENSOR_DESC` inputs/outputs of matching `DataType` and `DimensionCount` (see tensor constraints on each struct); supported dimension counts and data types vary by `DML_FEATURE_LEVEL`.
- Fused activation (`FusedActivation` member on convolution/GEMM and other operators) avoids a separate dispatch and improves performance versus a standalone activation operator.
- Every `DML_*_OPERATOR_DESC` is availability-gated to a minimum `DML_FEATURE_LEVEL`; check the specific operator page on Microsoft Learn (`ns-directml-dml_<operator>_operator_desc`) for exact feature-level and tensor-support tables.

## Related

- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
- [Tensors: DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC](./tensors.md)
- [DML_GRAPH_DESC / IDMLDevice1::CompileGraph](./graphs.md)
