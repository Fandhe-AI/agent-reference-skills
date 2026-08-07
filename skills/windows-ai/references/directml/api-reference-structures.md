# DirectML structures

Index of the roughly 150 structures declared in `DirectML.h`, most of which are concrete `DML_*_OPERATOR_DESC` operator descriptors wrapped by the generic `DML_OPERATOR_DESC`. Grouped here by category; see [Key operators](./operators.md) for detailed signatures of the most commonly used ones.

## Options / Props

| Category | Approx. count | Representative structures |
|----------|---------------|----------------------------|
| Activation | ~30 | `DML_ACTIVATION_RELU_OPERATOR_DESC`, `DML_ACTIVATION_SIGMOID_OPERATOR_DESC`, `DML_ACTIVATION_TANH_OPERATOR_DESC` |
| Element-wise | ~60 | `DML_ELEMENT_WISE_ADD_OPERATOR_DESC`, `DML_ELEMENT_WISE_MULTIPLY_OPERATOR_DESC`, `DML_ELEMENT_WISE_LOG_OPERATOR_DESC` |
| Convolution & pooling | ~10 | `DML_CONVOLUTION_OPERATOR_DESC`, `DML_MAX_POOLING2_OPERATOR_DESC`, `DML_AVERAGE_POOLING_OPERATOR_DESC` |
| Normalization | ~8 | `DML_BATCH_NORMALIZATION_OPERATOR_DESC`, `DML_MEAN_VARIANCE_NORMALIZATION_OPERATOR_DESC`, `DML_LOCAL_RESPONSE_NORMALIZATION_OPERATOR_DESC` |
| RNN / recurrent networks | ~4 | `DML_LSTM_OPERATOR_DESC`, `DML_GRU_OPERATOR_DESC`, `DML_RNN_OPERATOR_DESC` |
| Quantization | ~8 | `DML_DYNAMIC_QUANTIZE_LINEAR_OPERATOR_DESC`, `DML_ELEMENT_WISE_QUANTIZE_LINEAR_OPERATOR_DESC`, `DML_QUANTIZED_LINEAR_CONVOLUTION_OPERATOR_DESC` |
| Tensor & binding | ~10 | `DML_BUFFER_TENSOR_DESC`, `DML_BINDING_DESC`, `DML_BUFFER_BINDING` |
| Graph compilation | ~6 | `DML_GRAPH_DESC`, `DML_GRAPH_NODE_DESC`, `DML_INPUT_GRAPH_EDGE_DESC` |
| Data reorganization | ~15 | `DML_GATHER_OPERATOR_DESC`, `DML_SCATTER_OPERATOR_DESC`, `DML_SLICE_OPERATOR_DESC` |
| Reduction & selection | ~8 | `DML_ARGMAX_OPERATOR_DESC`, `DML_TOP_K_OPERATOR_DESC`, `DML_REDUCE_OPERATOR_DESC` |

## Notes

- Every `DML_*_OPERATOR_DESC` is wrapped by the generic `DML_OPERATOR_DESC { DML_OPERATOR_TYPE Type; const void *Desc; }` container and gated to a minimum `DML_FEATURE_LEVEL`.
- For exact field-level signatures, check the individual structure page on Microsoft Learn (`ns-directml-dml_<operator>_operator_desc`).

## Related

- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
- [Key operators](./operators.md)
- [Tensors: DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC](./tensors.md)
- [DirectML enumerations](./api-reference-enumerations.md)
