# Programming Guidelines

## Signature / Usage

```cpp
// East const convention
float const const_float = /* whatever */;
float const& reference_to_const_float = const_float;
int const& var;   // & and * flush left against the modified type
int const* var;

// Scoped enums: CamelCase type, k-prefixed enumerators
enum class MatrixOperation {
  kNone,
  kTranspose,
  kConjugate,
  kHermitian
};

// Aggregate return preferred over output parameters
return {val, err, ok};
```

## Options / Props

| Guideline | Rule |
| --- | --- |
| Indentation | 2 spaces, no tabs, max 100 chars/line |
| `const` placement | East const (`float const`, not `const float`) |
| Reference/pointer alignment | Left-aligned to the type (`int const& var`) |
| Class naming | `CamelCase` type names; `class` for invariant-holding types, `struct` for POD |
| Member naming | `snake_case`; private members/functions suffixed with `_` |
| Member order | type/const defs → data members → constructors → other methods |
| Namespaces | all-lowercase, `cutlass::gemm::device::` style hierarchical nesting |
| File names | `snake_case`; `.hpp` headers, `.cu` CUDA sources, `.cpp` host-only; legacy `.h` = CUTLASS 2.x |
| Macros | `CUTLASS_`-prefixed, all caps; `CUTLASS_HOST_DEVICE`, `CUTLASS_DEVICE`, `CUTLASS_PRAGMA_UNROLL`, `CUTLASS_PRAGMA_NO_UNROLL` |
| Formatting | no automatic formatters (no `clang-format`) on CUTLASS code |

## Notes

- CUTLASS 3.0 organizes by parallelization strategy rather than mirroring the GPU hardware hierarchy the way 2.x's thread block/warp/thread split does.
- `struct Params` holds grid-invariant state in constant memory; `struct SharedStorage` (with `union` aliasing for non-overlapping lifetimes) is the convention for declaring a class's shared-memory footprint.
- Prefer returning a `struct` of named fields or a `tuple` (`cute::tuple` in device code) over output reference parameters; for fallible functions prefer `std::expected`/`std::optional`/`std::variant` (or `cuda::std::` equivalents on device) over combined value+error out-params.
- Avoid direct use of `threadIdx`/`blockIdx`/`blockDim`/`gridDim` inside reusable components — accept linear IDs from the caller; only top-level kernels decide the thread/warp/block mapping.
- Detect the GEMM major mode via `cutlass::detail::is_major<0, Stride>()` / `is_k_major()` (from `include/cutlass/gemm/gemm.h`), not `get<0>(stride) == 1`, which is wrong for multimode shapes like `((X, Y), K)`.
- GCC 10 false-positive "missing return" warnings on `auto`-returning functions with exhaustive `if constexpr` branches should be suppressed with `CUTE_GCC_UNREACHABLE`, not by adding a spurious return.

## Related

- [Terminology](./terminology.md)
- [Efficient GEMM](./efficient-gemm.md)
