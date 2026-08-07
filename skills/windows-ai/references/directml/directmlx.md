# DirectMLX

`DirectMLX.h` is a C++ header-only helper library for DirectML that provides convenient wrappers and operator overloads for `DML_OPERATOR_TYPE`s, making it simpler to instantiate and chain DirectML operators into graphs.

## Signature / Usage

```cpp
#include <DirectML.h>
#include <DirectMLX.h>

IDMLDevice* device;
dml::Graph graph(device);

// Input tensor of type FLOAT32 and sizes { 1, 2, 3, 4 }
auto x = dml::InputTensor(graph, 0, dml::TensorDesc(DML_TENSOR_DATA_TYPE_FLOAT32, {1, 2, 3, 4}));

// Create an operator to compute the square root of x
auto y = dml::Sqrt(x);

DML_EXECUTION_FLAGS flags = DML_EXECUTION_FLAG_NONE;
ComPtr<IDMLCompiledOperator> op = graph.Compile(flags, { y });
// Now initialize and dispatch the DML operator as usual
```

## Options / Props

| Compile-time option | Description |
|---|---|
| `DMLX_NO_EXCEPTIONS` | Errors call `std::abort` instead of throwing; defined by default when exceptions are unavailable. |
| `DMLX_USE_WIL` | Exceptions are thrown using Windows Implementation Library (WIL) types instead of standard exception types. |
| `DMLX_USE_ABSEIL` | Uses Abseil (`absl::optional`, `absl::Span`, `absl::InlinedVector`) as drop-in replacements for C++11-unavailable standard library types. |
| `DMLX_USE_GSL` | Uses GSL's `gsl::span` as the replacement for `std::span` on compilers without a native implementation. |

## Notes

- Distributed as open-source (MIT license) on the DirectML GitHub, under `Libraries`; not shipped in `DirectML.h`.
- Requires DirectML version 1.4.0+ and a C++11-capable compiler (Visual Studio 2017/2019, Clang 10); C++17+ is recommended, since C++11 needs third-party libraries (GSL, Abseil) for missing standard library functionality.
- `dml::Expression` supports operator overloads (e.g. `a*c` is equivalent to `dml::Multiply(a, c)`), simplifying composition of expressions like the quadratic formula.
- Output tensor layout (Strides, TotalTensorSizeInBytes, GuaranteedBaseOffsetAlignment) is customizable via a `TensorPolicy` callback set on `dml::Graph::SetTensorPolicy` or on a `TensorDesc`; a built-in `TensorPolicy::InterleavedChannel()` produces NHWC-ordered output.
- Complete samples using DirectMLX are on the DirectML GitHub repo under `Samples`.

## Related

- [DirectML Tools](./directml-tools.md)
- [DirectML helper functions](./helper-functions.md)
- [Using strides to express padding, memory layout](./strides-padding-layout.md)
