# CuTe DSL Kernel with Compile-Time Guards

Write a CuTe DSL kernel with `@cute.kernel` / `@cute.jit`, using `cutlass.Constexpr` parameters and `cutlass.const_expr` branches so optional code paths (like a fused epilogue) are only emitted into the compiled kernel when the flag is `True`, rather than checked at runtime.

```python
import cutlass
import cutlass.cute as cute


@cute.kernel
def gemm_kernel(a, b, c, do_relu: cutlass.Constexpr):
    # cutlass.const_expr branches on a compile-time constant: when
    # do_relu is False, the ReLU instructions are never emitted into the
    # generated kernel at all (not just skipped at runtime).
    if cutlass.const_expr(do_relu):
        cute.printf("emitting ReLU epilogue\n")


@cute.jit
def gemm(a, b, c, do_relu: cutlass.Constexpr, bound: cutlass.Int32):
    # cutlass.range_constexpr unrolls at compile time and requires a
    # compile-time-constant bound; a dynamic value here is a compile error.
    for stage in cutlass.range_constexpr(3):
        cute.printf("prefetch stage %d\n", stage)

    # A plain Python range() with a *dynamic* bound instead emits an actual
    # IR loop that executes `bound` times at run time.
    for i in range(bound):
        cute.printf("main loop iter %d\n", i)

    gemm_kernel(a, b, c, do_relu)


# Two distinct compiled kernels are generated from the same Python source —
# one with the ReLU epilogue instructions present, one without.
gemm(a=None, b=None, c=None, do_relu=False, bound=8)
gemm(a=None, b=None, c=None, do_relu=True, bound=8)
```

## Notes

- `@cute.jit` marks a Python function for JIT compilation into a CUDA kernel via CuTe DSL's MLIR-based pipeline; `@cute.kernel` marks the device-side kernel body it launches.
- `cutlass.Constexpr` parameters (like `do_relu` above) are resolved at compile time: `cutlass.const_expr(do_relu)` branches are evaluated during compilation, so calling `gemm(..., do_relu=False)` and `gemm(..., do_relu=True)` produces two separate compiled kernels, with the `False` one never containing the ReLU instructions.
- `cutlass.range_constexpr(n)` requires `n` to be a compile-time constant and unrolls the loop into repeated inline code; passing a dynamic (`cutlass.Int32`) value to it is a compile error — use a plain Python `range(dynamic_bound)` instead, which emits a real IR loop.
- Early-exit (`break`), `return`, and `raise` from inside a *dynamic* (non-constexpr) control-flow body are not allowed by the DSL, since a dynamic branch's effect on subsequent code must be statically determinable; only compile-time (`const_expr`) branches can freely use ordinary Python control flow.
- Derived from the official CUTLASS documentation pages "Control Flow" (`media/docs/pythonDSL/cute_dsl_general/dsl_control_flow.html`) and "Overview" (`media/docs/pythonDSL/overview.html`).
