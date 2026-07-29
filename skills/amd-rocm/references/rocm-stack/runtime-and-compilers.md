# Runtime and Compilers

The programming interfaces and compilation tools that let application code target AMD GPUs: the HIP language/runtime, the CUDA-to-HIP porting tool, and the underlying LLVM-based compiler and runtime layers.

## Signature / Usage

```bash
# Port an existing CUDA source file to HIP
hipify-perl mykernel.cu > mykernel.hip.cpp

# Compile a HIP source file
hipcc mykernel.hip.cpp -o mykernel
```

## Options / Props

| Component | Role |
| --- | --- |
| HIP | C++ runtime API and kernel programming language designed for AMD GPUs |
| HIPIFY | Translates CUDA source code into portable HIP C++ |
| LLVM | AMD's LLVM-based compiler infrastructure, including the ROCm device compiler |
| ROCr Runtime | Low-level ROCm runtime that HIP and other language runtimes are built on top of |
| SPIRV-LLVM-Translator | Bidirectional translator between LLVM IR and SPIR-V, used in the ROCm compiler toolchain |

## Notes

- ROCm 7.14.0
- HIP is the layer application/library code is written against; ROCr Runtime and LLVM sit underneath it and are not typically called directly by application authors
- HIPIFY is the standard entry point for porting existing CUDA codebases; the CUDA-side language it translates from belongs to the `nvidia-cuda` skill, not this one

## Related

- [Core SDK Overview](./core-sdk-overview.md)
- [Math and Compute Libraries](./math-compute-libraries.md)
