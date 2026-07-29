# CUTLASS C++ Device GEMM

Instantiate `cutlass::gemm::device::Gemm` as a template alias fixing element types, layouts, and target architecture, then invoke it as a callable device operator to run `D = alpha * A * B + beta * C`.

```cpp
#include <cutlass/numeric_types.h>
#include <cutlass/gemm/device/gemm.h>
#include <cutlass/util/host_tensor.h>

int main(void)
{
    // The type alias IS the kernel configuration: element types, matrix
    // layouts, accumulator precision, and the Tensor Core op class/target
    // architecture are all fixed at compile time via template parameters.
    using Gemm = cutlass::gemm::device::Gemm<
        cutlass::half_t,               // ElementA
        cutlass::layout::ColumnMajor,  // LayoutA
        cutlass::half_t,               // ElementB
        cutlass::layout::ColumnMajor,  // LayoutB
        cutlass::half_t,               // ElementOutput
        cutlass::layout::ColumnMajor,  // LayoutOutput
        float,                         // ElementAccumulator
        cutlass::arch::OpClassTensorOp,
        cutlass::arch::Sm75>;

    Gemm gemmOp;

    int M = 512, N = 256, K = 128;
    float alpha = 1.25f, beta = -1.25f;

    cutlass::HostTensor<cutlass::half_t, cutlass::layout::ColumnMajor> A({M, K});
    cutlass::HostTensor<cutlass::half_t, cutlass::layout::ColumnMajor> B({K, N});
    cutlass::HostTensor<cutlass::half_t, cutlass::layout::ColumnMajor> C({M, N});

    // gemmOp is callable — operator() takes an Arguments struct built from
    // the problem size, TensorRefs to each operand, and the epilogue
    // scalars, and launches the kernel on the current stream.
    cutlass::Status status = gemmOp({
        {M, N, K},
        A.device_ref(),  // TensorRef to A device tensor
        B.device_ref(),  // TensorRef to B device tensor
        C.device_ref(),  // TensorRef to C device tensor (input, beta term)
        C.device_ref(),  // TensorRef to D device tensor (output, may alias C)
        {alpha, beta}    // epilogue operation arguments
    });

    if (status != cutlass::Status::kSuccess) {
        return -1;
    }
    return 0;
}
```

## Notes

- The `Gemm` alias's template parameters are the kernel's actual configuration surface — changing `ElementA`/`ElementB` precision or `LayoutA`/`LayoutB` (row- vs column-major) selects a different generated kernel, not a runtime code path.
- `cutlass::arch::Sm75` is the minimum architecture tag the instantiated kernel targets; running it on an older device than the tag specifies is undefined, and running it on a newer device works but does not exploit newer Tensor Core generations.
- `HostTensor::device_ref()` returns a `TensorRef` bundling the device pointer with its layout's stride, which is what the GEMM operator's `Arguments` expects for each operand — avoid passing a raw pointer plus a separately-tracked leading dimension unless using the lower-level `TensorRef{ptr, ld}` constructor form.
- The C operand doubles as both the epilogue's `beta`-scaled input and, when its `TensorRef` is reused for D, the output — pass a distinct tensor for D when the source C must not be overwritten.
- Derived from the official CUTLASS documentation page "CUTLASS C++ Quickstart" (`media/docs/cpp/quickstart.html`), the "Instantiating a basic GEMM kernel" example.
