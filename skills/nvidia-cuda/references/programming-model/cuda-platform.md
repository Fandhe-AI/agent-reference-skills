# The CUDA platform

## Signature / Usage

```sh
# Compile for a specific compute capability (embeds a cubin), and additionally
# embed PTX for forward compatibility with future GPUs (fatbin container):
nvcc -gencode=arch=compute_90,code=sm_90 \
     -gencode=arch=compute_90,code=compute_90 \
     -o app app.cu
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Compute Capability (CC) | version | `X.Y` format (major.minor) per NVIDIA GPU, indicating supported features and hardware parameters; e.g. CC 12.0 corresponds to SM version `sm_120` |
| NVIDIA Driver | component | Functions as the GPU's operating system; must be installed on the host; provides foundational GPU access for all uses, including display and graphics |
| CUDA Toolkit | component | Libraries, headers, and tools for writing, building, and analyzing GPU computing software |
| CUDA runtime | library | A special library within the CUDA Toolkit providing an API and language extensions for memory allocation, data copy between devices, and kernel launching |
| CUDA driver API | API | The lower-level API the NVIDIA Driver exposes; the CUDA runtime API is built on top of it. Either API can accomplish the same functionality, and both are interoperable |
| PTX (Parallel Thread Execution) | intermediate representation | A high-level assembly language for NVIDIA GPUs, abstracting over the physical GPU hardware ISA; compilers generate PTX for offline or JIT compilation into executable binary code |
| cubin (CUDA binary) | artifact | Binary code compiled from PTX for a specific SM version |
| fatbin | artifact | A container within an executable holding both CPU and GPU code, supporting multiple target architecture versions |

## Notes

- Binary compatibility: GPUs guarantee binary compatibility within the same major compute capability version. A cubin compiled for CC 8.6 runs on CC 8.6 or 8.9 GPUs, but not on CC 8.0 (a lower minor version).
- PTX compatibility: PTX embedded in an executable enables forward compatibility, since the device driver JIT-compiles it at runtime for equal or higher compute capabilities without needing to rebuild the application.
- Just-in-time compilation: the device driver JIT-compiles PTX to binary at runtime, which increases load time but allows the application to benefit from newer compiler improvements and to execute on future GPUs. The compute cache automatically stores compiled binaries and invalidates them upon driver upgrades.

## Related

- [Introduction](./introduction.md)
- [Programming Model](./programming-model.md)
- [NVCC: The NVIDIA CUDA Compiler](./nvcc.md)
