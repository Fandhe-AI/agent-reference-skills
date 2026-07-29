# IDE Setup for CUTLASS Development

## Signature / Usage

```yaml
# clangd global config example (SM90 host build)
CompileFlags:
  Compiler: /usr/local/cuda/bin/nvcc
  Add:
    - --cuda-path=/usr/local/cuda
    - --cuda-gpu-arch=sm_90a
    - -I/usr/local/cuda/include
    - "-xcuda"
    - "-ferror-limit=0"
    - --std=c++17
    - "-D__INTELLISENSE__"
    - "-D__CLANGD__"
    - "-DCUDA_12_0_SM90_FEATURES_SUPPORTED"
    - "-DCUTLASS_ARCH_MMA_SM90_SUPPORTED=1"
    - "-D_LIBCUDACXX_STD_VER=12"
    - "-D__CUDACC_VER_MAJOR__=12"
    - "-D__CUDACC_VER_MINOR__=3"
    - "-D__CUDA_ARCH__=900"
    - "-D__CUDA_ARCH_FEAT_SM90_ALL"
    - "-Wno-invalid-constexpr"
  Remove:
    - "-Xfatbin*"
    - "-gencode*"
    - "--generate-code*"
    - "-ccbin*"
    - "--compiler-options*"
    - "--expt-extended-lambda"
    - "--expt-relaxed-constexpr"
    - "-forward-unknown-to-host-compiler"
    - "-Werror=cross-execution-space-call"
Hover:
  ShowAKA: No
InlayHints:
  Enabled: No
Diagnostics:
  Suppress:
    - "variadic_device_fn"
    - "attributes_not_allowed"
```

```yaml
# clangd local config (per-checkout include paths)
CompileFlags:
  Add:
    - -I</absolute/path/to/cutlass>/include/
    - -I</absolute/path/to/cutlass>/tools/util/include/
    - -I</absolute/path/to/cutlass>/cutlass/examples/common/
```

## Options / Props

| Item | Description |
| --- | --- |
| Include paths | `${workspaceFolder}/include`, `${workspaceFolder}/tools/util/include`, `${workspaceFolder}/examples/common` |
| C++ standard | `c++17` / `gnu++17` or equivalent |
| Preprocessor variables | `__CUDACC_VER_MAJOR__`, `__CUDA_ARCH__`, `__CUDA_ARCH_FEAT_SM90_ALL`, and CUTLASS arch-support macros |

## Notes

- Two supported paths: VSCode with the official C/C++ extension (`C/C++ Edit Configurations (UI)`), or a `clangd` language server (works with Vim, Emacs, NeoVim, Sublime Text).
- `compile_commands.json` auto-configuration is **not** recommended for CUDA projects — clang does not understand many `nvcc`-specific flags, so an explicit `CompileFlags` config (global or local) is preferred.

## Related

- [Getting Started](./getting-started.md)
- [Build](./build.md)
