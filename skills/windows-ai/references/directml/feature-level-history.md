# DirectML Feature Level History

Per-feature-level changelog of operators, data types, and enhancements added to DirectML, from `DML_FEATURE_LEVEL_1_0` (introduction) through `DML_FEATURE_LEVEL_6_4`.

## Options / Props

| Feature level | Introduced in DirectML version | Notable additions |
|---|---|---|
| `DML_FEATURE_LEVEL_6_4` | 1.15.0 | `DML_OPERATOR_RESAMPLE3`, `DML_OPERATOR_FOLD`, `DML_OPERATOR_UNFOLD`; `DML_PADDING_MODE_WRAP` for Padding/Padding1; `DML_OPERATOR_ACTIVATION_SOFTPLUS` Steepness < 1. |
| `DML_FEATURE_LEVEL_6_3` | 1.15.0 | `DML_OPERATOR_MEAN_VARIANCE_NORMALIZATION2`, `MULTIHEAD_ATTENTION1`, `QUANTIZE`/`DEQUANTIZE`; `DML_TENSOR_DATA_TYPE_UINT4`/`INT4`; INT4 Dequantize+GEMM fusion, Multihead Attention fusion. |
| `DML_FEATURE_LEVEL_6_2` | 1.13.0 | `ACTIVATION_HARD_SWISH`, `ACTIVATION_SWISH`, `AVERAGE_POOLING1`, `LP_POOLING1`, `MATRIX_MULTIPLY_INTEGER_TO_FLOAT`, `QUANTIZED_LINEAR_AVERAGE_POOLING`; new graph node type `DML_GRAPH_NODE_TYPE_CONSTANT`. |
| `DML_FEATURE_LEVEL_6_1` | 1.12.0 | `DML_OPERATOR_MULTIHEAD_ATTENTION`; GEMM `FusedActivation` gains Softmax/Softmax1 support. |
| `DML_FEATURE_LEVEL_6_0` | 1.11.0 | UINT64/INT64 support for Divide/ModulusFloor/ModulusTruncate; FLOAT16 in QuantizeLinear/DequantizeLinear; `ELEMENT_WISE_CLIP` added to fused-activation list. |
| `DML_FEATURE_LEVEL_5_2` | 1.10.0 | Tensor dimension range 1-4 for MatrixMultiplyInteger/QuantizedLinearConvolution params; independent-null ScaleTensor/BiasTensor for MeanVarianceNormalization(1). |
| `DML_FEATURE_LEVEL_5_1` | 1.9.0 | `ACTIVATION_GELU`, `ACTIVATION_SOFTMAX1`, `LOG_SOFTMAX1`, `HARDMAX1`, `RESAMPLE2`, `RESAMPLE_GRAD1`, `DIAGONAL_MATRIX1`; extended data-type support for several ops. |
| `DML_FEATURE_LEVEL_5_0` | 1.8.0 | `ELEMENT_WISE_CLIP1`/`CLIP_GRAD1`, `ELEMENT_WISE_NEGATE`, `PADDING1`; extended data types for pooling, cumulative, gather, top-k, ROI-align, etc. |
| `DML_FEATURE_LEVEL_4_1` | 1.7.0 | `ROI_ALIGN_GRAD`, `BATCH_NORMALIZATION_TRAINING(_GRAD)`; extended data-type support for many elementwise/logical/gather/slice/scatter operators. |
| `DML_FEATURE_LEVEL_4_0` | 1.6.0 | `ELEMENT_WISE_QUANTIZED_LINEAR_ADD`, `DYNAMIC_QUANTIZE_LINEAR`, `ROI_ALIGN1`; extended data type/dimension support for Convolution, GEMM, Adam optimizer, etc. |
| `DML_FEATURE_LEVEL_3_1` | 1.5.0 | `ATAN_YX`, `CLIP_GRAD`, `DIFFERENCE_SQUARE`, `LOCAL_RESPONSE_NORMALIZATION_GRAD`, `CUMULATIVE_PRODUCT`, `BATCH_NORMALIZATION_GRAD`; max dimensions raised from 4 to 8 for several operators. |
| `DML_FEATURE_LEVEL_3_0` | 1.4.0 | Bitwise/logical ops, `ACTIVATION_CELU`, pooling-grad ops, `RANDOM_GENERATOR`, `ROI_ALIGN`; max tensor dimensions raised from 5 to 8; `FLOAT64`/`UINT64`/`INT64` types added; `DML_REDUCE_FUNCTION_ARGMIN`/`ARGMAX` deprecated in favor of standalone ArgMin/ArgMax operators. |
| `DML_FEATURE_LEVEL_2_1` | 1.2.0 | `IDMLDevice1` interface and operator-graph support (`IDMLDevice1::CompileGraph`); many new operator types; `D3D12_HEAP_TYPE_CUSTOM` legal for operator-initializer input binding; UINT8 output for logical boolean operators; strides on 5D activation input/output. |
| `DML_FEATURE_LEVEL_2_0` | 1.1.0 | `DMLCreateDevice1`, `DML_FEATURE_LEVEL` enum, feature-level queries (`DML_FEATURE_QUERY_FEATURE_LEVELS`); new operators including `ELEMENT_WISE_IF`, `MAX_POOLING1`, `RESAMPLE`. |
| `DML_FEATURE_LEVEL_1_0` | 1.0.0 | The feature level in which DirectML was introduced. |

## Notes

- Each feature level's operator additions are documented under `DML_OPERATOR_TYPE`, which links to the corresponding operator description structure.
- For DirectML *version* history (as opposed to feature level), see the version-history page.

## Related

- [DirectML version history and hardware requirements](./version-history.md)
- [Key operators](./operators.md)
