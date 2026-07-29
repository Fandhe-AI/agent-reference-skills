# Building with Clang as Host Compiler

## Signature / Usage

```bash
# Required CMake options (Clang as host compiler, NVCC as device compiler)
cmake .. \
  -DCMAKE_CXX_COMPILER=<path-to-clang++> \
  -DCMAKE_CUDA_HOST_COMPILER=<path-to-clang++> \
  -DCMAKE_CUDA_COMPILER=${PATH_TO_CUDA_TOOLKIT}/bin/nvcc
```

## Options / Props

| Prerequisite | Version |
| --- | --- |
| Clang | 17 tested regularly; 10+ occasionally |
| CUDA Toolkit | 12.2 tested; other versions likely compatible |
| CMake | 3.18+ |
| Python | 3.6+ |
| `CMAKE_CXX_COMPILER` | Path to `clang++` (must be set together with `CMAKE_CUDA_HOST_COMPILER`) |
| `CMAKE_CUDA_HOST_COMPILER` | Path to `clang++` used as the CUDA host compiler |
| `CMAKE_CUDA_COMPILER` | Optional — path to a specific `nvcc` when multiple CUDA Toolkits are installed |

## Notes

- Since CUTLASS 3.2(.1), building with Clang as host compiler (device code still compiled by NVCC) is supported again — distinct from building with Clang for both host and device.
- Setting only `CMAKE_CXX_COMPILER` (or only the `CXX` environment variable) causes GCC's `cc1plus` to report incompatible command-line options; both `CMAKE_CXX_COMPILER` and `CMAKE_CUDA_HOST_COMPILER` must be set.
- On Ubuntu 22.04 LTS: `sudo apt-get install clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev libstdc++-12-dev`. Missing `libstdc++-12-dev` produces a linker error `/usr/bin/ld: cannot find -lstdc++: No such file or directory`.

## Related

- [Build](./build.md)
- [Building on Windows with Visual Studio](./build-windows-visual-studio.md)
