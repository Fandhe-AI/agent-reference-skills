# msl

| Name | Description | Path |
| --- | --- | --- |
| Address Spaces | `device`, `constant`, `thread`, `threadgroup`, `ray_data`, `object_data` memory regions and coherence scopes | [address-spaces.md](./address-spaces.md) |
| Argument Attributes | `[[buffer(n)]]`, `[[texture(n)]]`, `[[sampler(n)]]`, `[[threadgroup(n)]]` bindings and `thread_position_in_grid` built-in inputs | [argument-attributes.md](./argument-attributes.md) |
| Atomic Functions | `<metal_atomic>` store, load, exchange, compare-exchange, fetch-modify, fence on `atomic<T>`; `memory_order`, `thread_scope` | [atomic-functions.md](./atomic-functions.md) |
| Data Types | Scalar, vector, matrix, SIMD-group matrix, packed, and atomic data types | [data-types.md](./data-types.md) |
| Function Qualifiers | `kernel`, `vertex`, `fragment`, `visible`, `stitchable`, `intersection`, `object`, `mesh` function roles | [function-qualifiers.md](./function-qualifiers.md) |
| Math Functions | `<metal_common>`, `<metal_integer>`, `<metal_relational>`, `<metal_math>`, `<metal_geometric>`; `metal::fast` and `metal::precise` | [math-functions.md](./math-functions.md) |
| Numerical Compliance | `half` / `bfloat` / `float` IEEE 754 behavior, rounding, ULP accuracy under precise vs `-ffast-math` | [numerical-compliance.md](./numerical-compliance.md) |
| SIMD-Group Functions | `simd_shuffle*`, `simd_ballot`, `simd_sum`, `quad_*`, `simdgroup_matrix` operations, and barriers | [simdgroup-functions.md](./simdgroup-functions.md) |
| Tensor Operations (Metal Performance Primitives) | MPP `mpp::tensor_ops` `matmul2d` and `convolution2d` over tensors and cooperative tensors | [tensor-operations.md](./tensor-operations.md) |
| Tensor Types | `extents` / `dextents` index types, format types, multiplane `PlaneTag` members (Metal 4.1) | [tensor-types.md](./tensor-types.md) |
