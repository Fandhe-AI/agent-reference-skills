# Using Fused Operators to Improve Performance

Operator fusion merges an activation function into a preceding operator (e.g. Convolution, GEMM) so both execute together without a memory roundtrip, via the optional `FusedActivation` member available on supporting operator descriptors.

## Signature / Usage

```cpp
DML_ACTIVATION_LEAKY_RELU_OPERATOR_DESC leakyReluDesc;
leakyReluDesc.InputTensor = nullptr;   // must be NULL for the fused activation
leakyReluDesc.OutputTensor = nullptr;  // must be NULL for the fused activation
leakyReluDesc.Alpha = 0.01f;

DML_OPERATOR_DESC activationDesc = { DML_OPERATOR_ACTIVATION_LEAKY_RELU, &leakyReluDesc };

DML_CONVOLUTION_OPERATOR_DESC convDesc;
// ...
convDesc.FusedActivation = &activationDesc;
```

## Options / Props

| Category | Members |
|---|---|
| Operators supporting `FusedActivation` | `BATCH_NORMALIZATION`, `BATCH_NORMALIZATION_TRAINING`, `CONVOLUTION`, `ELEMENT_WISE_ADD1`, `GEMM`, `MEAN_VARIANCE_NORMALIZATION`, `MEAN_VARIANCE_NORMALIZATION1` |
| Activations supported for fusion | `ACTIVATION_LINEAR`, `SIGMOID`, `HARD_SIGMOID`, `TANH`, `SCALED_TANH`, `RELU`, `LEAKY_RELU`, `THRESHOLDED_RELU`, `ELU`, `CELU`, `SCALED_ELU`, `SOFTPLUS`, `PARAMETRIC_SOFTPLUS`, `SOFTSIGN`, `IDENTITY`, `SHRINK`, `GELU`, `ELEMENT_WISE_CLIP` (Convolution/GEMM only) |

## Notes

- Fusing eliminates a graphics-memory roundtrip: without fusion, the GPU must wait for a preceding operator's output to be written to memory before computing a small activation like Relu, which is a common performance bottleneck.
- When constructing the fused activation's operator description, its `InputTensor` and `OutputTensor` must be set to `NULL`.
- Operators not listed in the supported-operators/activations tables do not support fusion.

## Related

- [DirectML Programming Guide](./programming-guide.md)
- [Key operators](./operators.md)
- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
