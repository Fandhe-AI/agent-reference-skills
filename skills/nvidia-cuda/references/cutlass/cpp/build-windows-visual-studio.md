# Building on Windows with Visual Studio

## Signature / Usage

```bash
# git bash: clone, configure, build
cmake .. -DCUTLASS_NVCC_ARCHS=90a
cmake --build . --config Release -j 4
```

## Options / Props

| Prerequisite | Version |
| --- | --- |
| OS | Windows 10 or 11 |
| Visual Studio | 2019 16.11.27+, or 2022 |
| CUDA Toolkit | 12.2+ (earlier 12.x may work) |
| CMake | 3.18+ |
| Python | 3.6+ |
| `--config` | `Release` / `Debug` — build type passed to `cmake --build` |
| `CMAKE_SUPPRESS_REGENERATION` | `ON` | Prevents unnecessary CMake reruns (requires manual reruns when CMakeLists changes) |

## Notes

- Visual Studio must be installed **before** the CUDA Toolkit, otherwise Visual Studio's build system will not know about CUDA.
- Windows restricts file paths to 260 characters by default; CUTLASS is unlikely to build under this limit. Enable long paths via the registry key `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem\LongPathsEnabled = 1`, then reboot before cloning/building.
- A successful CMake configure produces a `CUTLASS.sln` solution file usable directly in the Visual Studio IDE, or buildable from the command line as shown above.

## Related

- [Build](./build.md)
- [Quickstart](./quickstart.md)
- [Building with Clang as host compiler](./build-clang-host-compiler.md)
