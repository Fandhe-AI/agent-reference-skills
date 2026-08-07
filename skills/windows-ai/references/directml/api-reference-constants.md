# DirectML constants

Constants declared in `DirectML.h`.

## Options / Props

| Constant | Value | Description |
|----------|-------|-------------|
| `DML_TENSOR_DIMENSION_COUNT_MAX` | 5 | Maximum tensor dimensions for `DML_TARGET_VERSION` < `DML_FEATURE_LEVEL_3_0`. |
| `DML_TENSOR_DIMENSION_COUNT_MAX1` | 8 | Maximum tensor dimensions for `DML_TARGET_VERSION` >= `DML_FEATURE_LEVEL_3_0`. |
| `DML_TEMPORARY_BUFFER_ALIGNMENT` | 256 | Base-address alignment (bytes) required for temporary buffers. |
| `DML_PERSISTENT_BUFFER_ALIGNMENT` | 256 | Base-address alignment (bytes) required for persistent buffers. |
| `DML_MINIMUM_BUFFER_TENSOR_ALIGNMENT` | 16 | Minimum base-address alignment (bytes) required for buffer tensors. |

## Notes

- Header: `DirectML.h`.

## Related

- [Tensors: DML_TENSOR_DESC / DML_BUFFER_TENSOR_DESC](./tensors.md)
- [DirectML structures](./api-reference-structures.md)
