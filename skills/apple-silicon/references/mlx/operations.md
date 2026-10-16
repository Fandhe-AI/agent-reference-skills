# Operations

`mlx.core` operations index (`docs/src/python/ops.rst`, MLX 0.32.4). The official page is an autosummary list of function names; the family grouping below is for readability and is not part of the source.

## Signature / Usage

```python
import mlx.core as mx

a = mx.array([[1.0, 5.0], [3.0, 2.0]])
lo, hi = mx.minmax(a, axis=0)                       # min and max in one call
idx = mx.searchsorted(mx.array([1, 2, 2, 4]), mx.array([0, 2, 3, 5]))
vals = mx.unique(mx.array([2, 1, 2, 3, 1]), 3)      # size is mandatory
```

## Options / Props

Op families (names as listed in `ops.rst`):

| Family | Ops |
| --- | --- |
| Arithmetic / elementwise | `abs`, `add`, `subtract`, `multiply`, `divide`, `divmod`, `floor_divide`, `remainder`, `power`, `negative`, `positive`, `reciprocal`, `square`, `sqrt`, `rsqrt`, `sign`, `ceil`, `floor`, `round`, `trunc`, `clip`, `maximum`, `minimum`, `nan_to_num` |
| Exp / log / trig | `exp`, `expm1`, `log`, `log2`, `log10`, `log1p`, `logaddexp`, `sin`, `cos`, `tan`, `sinh`, `cosh`, `tanh`, `arcsin`, `arccos`, `arctan`, `arctan2`, `arcsinh`, `arccosh`, `arctanh`, `degrees`, `radians`, `erf`, `erfinv`, `sigmoid`, `softmax` |
| Comparison / logical / bitwise | `equal`, `not_equal`, `greater`, `greater_equal`, `less`, `less_equal`, `allclose`, `isclose`, `array_equal`, `isfinite`, `isinf`, `isnan`, `isneginf`, `isposinf`, `logical_and`, `logical_or`, `logical_not`, `logical_xor`, `bitwise_and`, `bitwise_or`, `bitwise_xor`, `bitwise_invert`, `left_shift`, `right_shift`, `where` |
| Reductions / scans | `all`, `any`, `sum`, `prod`, `mean`, `median`, `var`, `std`, `max`, `min`, `minmax`, `argmax`, `argmin`, `logsumexp`, `count_nonzero`, `cumsum`, `cumprod`, `cummax`, `cummin`, `logcumsumexp` |
| Sorting / searching | `sort`, `argsort`, `partition`, `argpartition`, `topk`, `searchsorted`, `unique` |
| Shape / indexing | `reshape`, `flatten`, `unflatten`, `squeeze`, `expand_dims`, `transpose`, `permute_dims`, `swapaxes`, `moveaxis`, `broadcast_to`, `broadcast_arrays`, `broadcast_shapes`, `concatenate`, `concat`, `stack`, `unstack`, `split`, `repeat`, `tile`, `pad`, `roll`, `flip`, `take`, `take_along_axis`, `put_along_axis`, `slice`, `slice_update`, `as_strided`, `contiguous`, `atleast_1d`, `atleast_2d`, `atleast_3d` |
| Creation | `arange`, `linspace`, `zeros`, `zeros_like`, `ones`, `ones_like`, `full`, `full_like`, `eye`, `identity`, `tri`, `tril`, `triu`, `diag`, `diagonal`, `meshgrid`, `asarray`, `from_dlpack` |
| Linear algebra / contraction | `matmul`, `addmm`, `inner`, `outer`, `kron`, `tensordot`, `einsum`, `einsum_path`, `vecdot`, `trace`, `block_masked_mm`, `gather_mm`, `segmented_mm`, `hadamard_transform` |
| Convolution | `convolve`, `conv1d`, `conv2d`, `conv3d`, `conv_transpose1d`, `conv_transpose2d`, `conv_transpose3d`, `conv_general` |
| Quantization | `quantize`, `dequantize`, `quantized_matmul`, `gather_qmm`, `qqmm`, `to_fp8`, `from_fp8` |
| Types | `astype`, `view`, `can_cast`, `result_type`, `isdtype`, `issubdtype` |
| Complex | `real`, `imag`, `conj`, `conjugate` |
| Windows | `bartlett`, `blackman`, `hamming`, `hanning` |
| Gradient control / misc | `stop_gradient`, `depends`, `diff` |
| I/O | `load`, `save`, `savez`, `savez_compressed`, `save_gguf`, `save_safetensors` |

Newer per-op signatures (from `python/src/ops.cpp`, 0.32.4):

| Op | Signature |
| --- | --- |
| `minmax` | `minmax(a: array, /, axis: None \| int \| Sequence[int] = None, keepdims: bool = False, *, stream: StreamOrDevice = None) -> tuple[array, array]` |
| `searchsorted` | `searchsorted(sorted_sequence: array, values: array, /, side: str = 'left', *, stream: StreamOrDevice = None) -> array` |
| `unique` | `unique(a: array, /, size: int, return_index: bool = False, return_inverse: bool = False, return_counts: bool = False, fill_value: scalar \| array \| None = None, *, stream: StreamOrDevice = None) -> array \| tuple[array, ...]` |

## Notes

- `minmax` returns the minimum and maximum over the given axes; it is equivalent to calling `min` and `max` separately. The result tuple is `(min, max)`.
- `searchsorted` finds the indices that keep `sorted_sequence` (1-D, ascending) sorted when inserting `values`. `side='left'` returns the number of elements strictly less than the value; `side='right'` returns the number of elements less than or equal to it. The result is a `uint32` array shaped like `values`.

  ```python
  a = mx.array([1, 2, 2, 4])
  mx.searchsorted(a, mx.array([0, 2, 3, 5]))                # array([0, 1, 3, 4], dtype=uint32)
  mx.searchsorted(a, mx.array([0, 2, 3, 5]), side="right")  # array([0, 3, 3, 4], dtype=uint32)
  ```

- `unique` returns the sorted unique elements of the flattened array. Unlike NumPy the output size is never inferred and `size` must be given, so `a` is not evaluated. A larger `size` pads with `fill_value` (default: the first sorted unique element) with a count of `0`; a smaller `size` truncates to the smallest `size` unique elements, after which `index`, `inverse` and `counts` no longer describe all of `a`. With any `return_*` flag set, the result is a tuple ordered values, index, inverse, counts. It builds on `mx.sort`, so a `bool` input needs the CPU stream.

  ```python
  a = mx.array([2, 1, 2, 3, 1])
  mx.unique(a, 3)   # array([1, 2, 3], dtype=int32)
  mx.unique(a, 5)   # array([1, 2, 3, 1, 1], dtype=int32)
  ```

- `minmax`, `searchsorted` and `unique` are new relative to earlier pages of this skill; other ops are only indexed here, see the official per-op pages under `python/_autosummary/` for details.
- Source: https://ml-explore.github.io/mlx/build/html/python/ops.html (pinned source: https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/python/ops.rst)

## Related

- [Array](./array.md)
- [Data Types](./data-types.md)
- [Indexing](./indexing.md)
- [Linear Algebra](./linalg.md)
- [FFT](./fft.md)
