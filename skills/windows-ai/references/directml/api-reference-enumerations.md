# DirectML enumerations

Index of all enumerations declared in `DirectML.h`.

## Options / Props

| Enumeration | Description |
|-------------|-------------|
| `DML_AXIS_DIRECTION` | Direction of an operation along a given axis (for example, summation or top-k selection). |
| `DML_BINDING_TYPE` | Nature of the resource(s) referred to by a `DML_BINDING_DESC`. |
| `DML_CONVOLUTION_DIRECTION` | Direction (forward/backward) for the convolution operator (`DML_CONVOLUTION_OPERATOR_DESC`). |
| `DML_CONVOLUTION_MODE` | Mode (cross-correlation/convolution) for the convolution operator. |
| `DML_CREATE_DEVICE_FLAGS` | Additional device-creation options passed to `DMLCreateDevice`. |
| `DML_DEPTH_SPACE_ORDER` | Transform order for `DML_OPERATOR_DEPTH_TO_SPACE1` / `DML_OPERATOR_SPACE_TO_DEPTH1`. |
| `DML_EXECUTION_FLAGS` | Options controlling operator execution. |
| `DML_FEATURE` | Optional features/capabilities queryable from the DirectML device. |
| `DML_GRAPH_EDGE_TYPE` | Type of graph edge, used by `DML_GRAPH_EDGE_DESC`. |
| `DML_GRAPH_NODE_TYPE` | Type of graph node, used by `DML_GRAPH_NODE_DESC`. |
| `DML_INTERPOLATION_MODE` | Mode for the upsample 2-D operator (`DML_UPSAMPLE_2D_OPERATOR_DESC`). |
| `DML_MATRIX_TRANSFORM` | Matrix transform applied to a DirectML tensor. |
| `DML_OPERATOR_TYPE` | Type of an operator description (`DML_OPERATOR_DESC.Type`). |
| `DML_PADDING_MODE` | Mode for the pad operator (`DML_PADDING_OPERATOR_DESC`). |
| `DML_RANDOM_GENERATOR_TYPE` | Type of random-number generator. |
| `DML_RECURRENT_NETWORK_DIRECTION` | Direction for a recurrent DirectML operator. |
| `DML_REDUCE_FUNCTION` | Reduction algorithm used by the reduce operator (`DML_REDUCE_OPERATOR_DESC`). |
| `DML_TENSOR_DATA_TYPE` | Data type of the values in a tensor. |
| `DML_TENSOR_FLAGS` | Additional options in a tensor description. |
| `DML_TENSOR_TYPE` | Type of tensor description. |

## Notes

- All enumerations are declared in `DirectML.h`.

## Related

- [Key operators](./operators.md)
- [Tensors: DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC](./tensors.md)
- [DirectML structures](./api-reference-structures.md)
