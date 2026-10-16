# Numerical Precision

By default MLX may run `float32` matrix-multiplication family operations at reduced precision on hardware with dedicated matrix-multiplication units; two environment variables restore full precision.

## Signature / Usage

```shell
MLX_ENABLE_TF32=0 python my_script.py
MLX_CONV_WINOGRAD=0 python my_script.py
```

## Options / Props

| Variable | Default | Effect |
| --- | --- | --- |
| `MLX_ENABLE_TF32` | `1` | Set to `0` to keep matmul, quantized matmul, grouped matmul, convolution and attention in full `float32` |
| `MLX_CONV_WINOGRAD` | `1` | Set to `0` to disable the Winograd algorithm for Metal `conv2d` |

## Notes

- Inputs and outputs stay `float32`, but results can differ from a full-precision reference by several orders of magnitude more than `float32` rounding alone would explain. Which operations take the reduced-precision path, and how large the difference is, depends on the backend and the hardware.
- On Metal, `conv2d` can use Winograd for 3x3 convolutions with stride 1. It is faster for large inputs, but its `float32` rounding error can be approximately 10 times larger. MLX selects Winograd from the total input size, including the batch size, so the same image can give different results in a batch of 3 and in a batch of 1.
- For MSL-level floating-point behavior (fast-math, rounding), see the msl numerical compliance page of this skill.
- Source: https://ml-explore.github.io/mlx/build/html/usage/precision.html (pinned source: https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/usage/precision.rst; new in 0.32.4)

## Related

- [Environment Variables](./environment-variables.md)
- [Data Types](./data-types.md)
- [Numerical Compliance (MSL)](../msl/numerical-compliance.md)
