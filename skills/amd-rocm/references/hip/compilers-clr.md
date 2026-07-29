# Compilers and AMD CLR

HIP source is compiled by `amdclang++`/`hipcc` for a target GPU architecture (GFX IP), and executed through the AMD CLR (Compute Language Runtimes) runtime layer.

## Signature / Usage

```bash
# Offline compilation targeting a specific GPU architecture (GFX IP)
amdclang++ --offload-arch=gfx942 kernel.cpp -o kernel
```

## Options / Props

| Component | Role |
| --- | --- |
| `amdclang++` | Standalone compiler; compiles host and device code in one invocation |
| `hipcc` | Alternative compiler driver with equivalent capabilities and HIP/ROCm default include/lib configuration |
| Offline compilation | Two-step: host compilation, then device code compiled and embedded into the host object (assembly or binary) |
| Runtime compilation (HIPRTC) | `hiprtc*` API compiles kernel source text at runtime for portability across unknown target hardware, at some overhead cost; see `hiprtc.md` |
| `--offload-arch=<gfxNNN>` | Targets a GFX IP version, e.g. `gfx90a` (CDNA2/MI250), `gfx942` (CDNA3/MI300), `gfx1100` (RDNA3/RX7900) |
| CLR: `hipamd` | Implements the HIP language specification for AMD platforms |
| CLR: `opencl` | Provides OpenCL support on AMD hardware |
| CLR: `rocclr` | Shared ROCm compute runtime abstraction used by both HIP and OpenCL, providing streams/events/memory operations |

## Notes

- CLR sits between the HIP-Clang compiler output and ROCm hardware: the compiler generates code that CLR's runtime layer executes on the device.
- Building CLR from source uses the `rocm-hip-libraries` meta package and CMake flags such as `-DCLR_BUILD_HIP=ON`.

## Related

- [hiprtc.md](./hiprtc.md)
- [hardware-implementation.md](./hardware-implementation.md)
- [debugging-logging.md](./debugging-logging.md)
