# NVCC: The NVIDIA CUDA Compiler

Covers CUDA source file/header conventions, the nvcc compilation workflow, PTX/cubin generation and architecture targeting flags, separate compilation of GPU code, and common compiler options.

## Signature / Usage

```bash
nvcc example.cu -arch=compute_80 -gpu-code=sm_86,compute_80
```

This generates PTX for the virtual architecture `compute_80` and compiles it to a cubin for the real architecture `sm_86`, while also preserving the PTX output for forward compatibility.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `.cu` | file extension | CUDA source file, may contain both host and device code |
| `.cuh` | file extension | CUDA header file |
| `-arch` | compiler option | Specifies the virtual GPU architecture to target (e.g. `compute_80`) |
| `-gencode` | compiler option | Specifies a virtual/real architecture pair to generate code for; may be repeated for multiple targets |
| `-gpu-code` / `-code` | compiler option | Specifies the real GPU architecture(s) to generate cubin for (e.g. `sm_86`), optionally alongside a PTX target |
| `-dc` / `-rdc=true` | compiler option | Enables separate compilation of device code, allowing device-code linking across multiple files (with `extern` declarations for shared variables) |

## Notes

- File types: `.cu` / `.cuh` are CUDA source/header files (may mix host and device code); `.c` / `.cpp` etc. are treated as host-only code.
- Compilation workflow: `nvcc` separates device and host code, compiles device code to PTX, then generates a cubin for the target hardware ISA(s); a single build can target multiple architectures.
- Architecture flags: `-arch`/`-gencode`/`-gpu-code` select the virtual and real architectures to target, with options to emit PTX-only, cubin-only, or both.
- Separate compilation (`-dc` / `-rdc=true`) enables device code linking across multiple translation units; variables shared across files need `extern` declarations, as in host-side C/C++ separate compilation.
- Other option categories exposed by `nvcc`: language features, debugging, optimization, link-time optimization (LTO), profiling, fatbin compression, and compiler performance controls (e.g. parallel compilation).
- Section 5.5 of the CPG (Improving CUDA Compilation Time) is an in-depth guide to strategies and techniques for improving the compile time of CUDA code; see the Improving CUDA Compilation Time page.
- Source: https://docs.nvidia.com/cuda/cuda-programming-guide/02-basics/nvcc.html (CPG v13.5, retrieved 2026-11-14)

## Related

- [The CUDA platform](./cuda-platform.md)
- [Intro to CUDA C++](./intro-to-cuda-cpp.md)
- [Improving CUDA Compilation Time](../advanced/appendices/compile-time.md)
