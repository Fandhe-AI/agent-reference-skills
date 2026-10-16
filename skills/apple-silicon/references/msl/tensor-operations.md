# Tensor Operations (Metal Performance Primitives)

Metal Performance Primitives (MPP) TensorOps in `mpp::tensor_ops`: `matmul2d` and `convolution2d` class templates that run cooperatively over tensors and cooperative tensors at a chosen execution scope.

## Signature / Usage

```metal
#include <metal_tensor>
#include <MetalPerformancePrimitives/MetalPerformancePrimitives.h>
using namespace metal;
using namespace mpp;

[[ kernel ]] void matrixMultiply(
  tensor<device half, dextents<int, 2>> a [[ buffer(0) ]],
  tensor<device half, dextents<int, 2>> b [[ buffer(1) ]],
  tensor<device half, dextents<int, 2>> c [[ buffer(2) ]],
  uint2 tgid [[threadgroup_position_in_grid]]) {

    // Create a matmul op for a threadgroup made of 4 SIMD-groups.
    constexpr auto matmulDescriptor =
      tensor_ops::matmul2d_descriptor(64, 32, 0);

    tensor_ops::matmul2d<matmulDescriptor,
                         execution_simdgroups<4>> matmulOp;

    // Create the appropriate slice for this threadgroup to work on.
    auto mA = a.slice(0, tgid.y * 64);
    auto mB = b.slice(tgid.x * 32, 0);
    auto mC = c.slice(tgid.x * 32, tgid.y * 64);

    // Execute the operation assuming C is initialized to zero.
    matmulOp.run(mA, mB, mC);
}
```

Cooperative-tensor destination (from the Apple sample "Running inline ML operations in a shader with Metal 4"):

```metal
constexpr auto descriptor = matmul2d_descriptor(TileSize,
                                                TileSize,
                                                dynamic_length_v<int>);
matmul2d<descriptor, execution_simdgroups<4>> operation;

auto cooperativeTensor = operation.get_destination_cooperative_tensor<decltype(sliceA),
                                                                      decltype(sliceB),
                                                                      half>();
operation.run(sliceA, sliceB, cooperativeTensor);

auto threadElements = cooperativeTensor.get_capacity();
for (int element = 0; element < threadElements; element++)
{
    auto value = cooperativeTensor[element];
    cooperativeTensor[element] = relu(value);
}
cooperativeTensor.store(destinationSlice);
```

## Options / Props

Execution scopes (header `<MetalPerformancePrimitives/MetalPerformancePrimitives.h>`, namespace `mpp`; `tensor_ops` beneath it):

| Scope | Description |
| --- | --- |
| `execution_thread` | A single thread |
| `execution_simdgroups<N>` | N SIMD-groups cooperate. TensorOps support N of 1 or `simdgroups_per_threadgroup` |
| `execution_simdgroup` | Alias for N == 1 |

TensorOp template classes:

| Class | Description |
| --- | --- |
| `matmul2d<matmul2d_descriptor Desc, typename Scope, class... Args>` | Generalized matrix multiplication: `C = A*B` (mode `multiply`, default) or `C = A*B + C` (mode `multiply_accumulate`). A and B: host-bound, origin-shifted, or shader-allocated tensors. C: those, or a `cooperative_tensor` |
| `convolution2d<convolution2d_descriptor Desc, typename Scope, typename... ConvArgs>` | 2D convolution (width x height) over a 4D tensor. Only supported scope is `execution_simdgroups<N>` with N = `simdgroups_per_threadgroup` |

`matmul2d_descriptor(int M, int N, int K = dynamic_length_v<int>, bool transpose_left = false, bool transpose_right = false, bool relaxed_precision = false, mode matmul_mode = mode::multiply)`:

| Parameter | Description |
| --- | --- |
| M, N, K | A is M x K, B is K x N, C is M x N |
| transpose_left / transpose_right | Transpose A / B before multiplying (default false) |
| relaxed_precision | Allow truncating the mantissa of `float` before multiplication (default false) |
| matmul_mode | `multiply` (default) or `multiply_accumulate` (`tensor_ops::matmul2d_descriptor::mode`) |

`matmul2d` member functions:

| Member | Description |
| --- | --- |
| `run(left, right, destination)` | Execute the matmul into destination per `matmul_mode`: `C = A*B` for `multiply`, `C = A*B + C` for `multiply_accumulate` (all arguments `thread` references) |
| `get_destination_cooperative_tensor<LeftOperandType, RightOperandType, ElementType, CoordType = int>()` | Cooperative tensor that can store the result |
| `get_row_reduction_destination_cooperative_tensor<...>()` | Cooperative tensor for a row reduction of the result |
| `get_column_reduction_destination_cooperative_tensor<...>()` | Same for a column reduction. Only valid at `execution_simdgroup` scope. Metal 4 and OS 26.1+ |
| `get_left_input_cooperative_tensor<LeftElementType, RightElementType, ElementType, CoordType = int>()` | Cooperative tensor usable as left input. Only valid at `execution_simdgroup` scope |
| `get_right_input_cooperative_tensor<...>()` | Cooperative tensor usable as right input. Metal 4 and OS 26.1+ |
| `is_compatiable_as_left_input<...>(src)` / `is_compatiable_as_right_input<...>(src)` | True if the cooperative tensor can be used as a left / right input. Metal 4 and OS 26.1+ (spelling as in the spec) |

Reduction helpers (`execution_simdgroup` scope; reduce a cooperative tensor into a 1D destination cooperative tensor):

| Function | Description |
| --- | --- |
| `reduce_rows(source, destination, reduction_operation op = sum, ElementType identity = reduction_operation_identity<ElementType>::sum_identity)` | Per-row reduction |
| `reduce_columns(source, destination, op, identity)` | Per-column reduction |
| `is_iterator_compatible(source, destination)` | True if the reduction result can be used with another tensor via `map_iterator` |
| `enum class reduction_operation { sum, max, min }` | Reduction kind; `reduction_operation_identity<T>` provides `sum_identity` / `max_identity` / `min_identity` |

`matmul2d` supported data types (A, B -> C). Metal 4:

| A | B | C |
| --- | --- | --- |
| `char` | `char` | `int` |
| `char` | `half` | `half`, `float` |
| `char` | `float` | `float` |
| `half` | `char` | `half`, `float` |
| `half` | `half` | `half`, `float` |
| `half` | `float` | `float` |
| `float` | `char`, `half`, `float` | `float` |

Metal 4 and OS 26.1: `bfloat` x `bfloat` -> `bfloat` / `float`; `bfloat` x `float` -> `float`; `bfloat` x `char` -> `bfloat` / `float`; `float` x `bfloat` -> `float`; `char` x `bfloat` -> `bfloat` / `float`; `bfloat` x `half` -> `bfloat` / `half` / `float`; `half` x `bfloat` -> `bfloat` / `half` / `float`.

Metal 4 and OS 26.4: `half` x `uchar` -> `half` / `float`; `uchar` x `half` -> `half` / `float`; `float` x `uchar` -> `float`; `uchar` x `float` -> `float`; `uchar` x `uchar` -> `int`; `bfloat` x `uchar` -> `bfloat` / `float`; `uchar` x `bfloat` -> `bfloat` / `float`; B as `int4b_format` / `uint4b_format` with A `half` -> `half` / `float`, A `bfloat` -> `bfloat` / `float`; `char` x `int4b_format` -> `int`; `uchar` x `uint4b_format` -> `int`.

Metal 4.1 (this update): B as `int2b_format` / `uint2b_format` with A `char` / `uchar` -> `int`, A `half` -> `half` / `float`, A `bfloat` -> `bfloat` / `float`; A `half` with B `metal_fp4_e2m1_format`, `metal_fp8_e4m3_format`, or `metal_fp8_e5m2_format` -> `half` / `float`; both A and B the same `metal_fp4_e2m1_format` / `metal_fp8_e4m3_format` / `metal_fp8_e5m2_format` -> `half` / `float`.

`convolution2d_descriptor(int4 destination_dimensions, int4 source_dimensions, int2 kernel_dimensions, convolution2d_activation_layout activation_layout = nhwc, convolution2d_weights_layout weight_layout = hwio, int2 strides = int2(1, 1), int2 dilations = int2(1, 1), int groups = 1, bool relaxed_precision = false, mode convolution2d_mode = mode::multiply)`:

| Parameter | Description |
| --- | --- |
| destination_dimensions / source_dimensions | Dimensions of the output / input tensor |
| kernel_dimensions | Size of the convolution window |
| activation_layout / weight_layout | `nhwc` / `hwio` (the only enumerators listed) |
| strides / dilations | Convolution stride / spacing between kernel elements |
| groups | Number of groups the input channel axis is split into |
| relaxed_precision | Allow mantissa truncation for `float` |
| convolution2d_mode | `multiply` or `multiply_accumulate` |

`convolution2d::run(activation, weights, destination)`: activation is NHWC (N batch slowest, C input channels fastest); weights are HWIO (O output channels fastest); a `tensor` destination is NHWO; destination may also be a `cooperative_tensor`.

## Notes

- Requires Metal 4 or later (All OS). Source: https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf, chapter 7, Metal Shading Language Specification 4.1 (document dated 2026-06-04), pages 349-367. Retrieved 2026-10-17. Sample: https://developer.apple.com/documentation/metal/running-inline-ml-operations-in-a-shader-with-metal-4
- The spec's class and run tables each show only one of the two formulas, so `matmul_mode` determines the behavior: choose `mode::multiply_accumulate` to accumulate into a nonzero C. The kernel comment "assuming C is initialized to zero" is verbatim from the spec. The spec's class-template table spells `matmul2d` as `matmuld2d`; the code examples use `matmul2d`.
- All threads in the scope must call `run`, otherwise the result is undefined. For example, with `execution_simdgroup` every thread of the SIMD-group must call it; different SIMD-groups may diverge. A TensorOp may use a barrier at its execution scope, so code must behave correctly if one is used.
- When a TensorOp writes into a tensor in `device` or `threadgroup` address space, insert a barrier at the matching scope before reading the result (for example `threadgroup_barrier(mem_flags::mem_threadgroup)` for `execution_simdgroups<2>` over threadgroup memory, `simdgroup_barrier(mem_flags::mem_device)` for `execution_simdgroup` over device memory). No barrier is needed for `thread` address space tensors or cooperative tensors.
- Tensors passed to tensor operations must use an `int` index type (Apple sample note).
- Passing static extents to `slice()` as template parameters lets the operation skip per-element bounds checks that dynamic extents require; `dynamic_length_v<int>` for K makes the operation infer the inner dimension from the input tensors at run time (Apple sample).
- Apple sample: a cooperative tensor keeps intermediate results in per-thread register memory, avoiding writes to device or threadgroup memory; Apple silicon GPUs do not need threadgroup-memory staging for tensor operations. For GPUs in the `apple10` GPU family and later, each core has a neural accelerator that runs tensor operations in hardware (chip lists are in Apple's Metal Feature Set Tables).
- The spec's table is Table 7.3; for further details see the headers `MPPTensorOpsMatMul2d.h` and `MPPTensorOpsConvolution2d.h`.
- MPP TensorOps are the MSL-side (`.metal` source) tensor primitives. They are distinct from MPSGraph and MPS kernels (`mps` category), MLX (`mlx` category), and CUDA / HIP matrix primitives in the separate `nvidia-cuda` / `amd-rocm` skills.

## Related

- [tensor-types.md](./tensor-types.md)
- [simdgroup-functions.md](./simdgroup-functions.md)
- [function-qualifiers.md](./function-qualifiers.md)
