# Deprecated APIs

HIP APIs flagged for deprecation because they can produce errors or unexpected results, along with their recommended replacements.

## Signature / Usage

```cpp
// deprecated (ROCm 3.1.0+): hipMallocHost() / hipMemAllocHost()
// use instead:
hipHostAlloc(&ptr, size, flags);
```

## Options / Props

| Deprecated since | Function(s) | Replacement / reason |
| --- | --- | --- |
| ROCm 1.9.0 | `hipCtxCreate()`, `hipCtxDestroy()`, `hipCtxSetCurrent()`, and 16 other context-management functions | Use `hipSetDevice()` and stream-based APIs instead |
| ROCm 3.0.0 | `hipProfilerStart()`, `hipProfilerStop()` | Use `roctracer` or `rocTX` for profiling |
| ROCm 3.1.0 | `hipMallocHost()`, `hipMemAllocHost()` | Replaced by `hipHostAlloc()` |
| ROCm 3.8.0 | `hipBindTexture()`, `hipBindTexture2D()`, `hipBindTextureToArray()`, `hipMemcpyToArray()`, `hipMemcpyFromArray()`, `hipUnbindTexture()`, `hipGetTextureAlignmentOffset()` | Superseded by texture object APIs; see `texture-surface.md` |
| ROCm 4.3.0 | 12 texture-reference functions, e.g. `hipTexRefGetAddress()`, `hipTexRefSetAddress2D()`, `hipTexRefSetBorderColor()` | Superseded by texture object APIs |
| ROCm 5.3.0 | 9 texture-reference functions, e.g. `hipTexRefSetAddressMode()`, `hipTexRefSetArray()`, `hipTexRefSetFormat()` | Superseded by texture object APIs |
| ROCm 5.7.0 | `hipBindTextureToMipmappedArray()` | Superseded by texture object APIs |
| ROCm 6.1.0 | `hipTexRefGetBorderColor()`, `hipTexRefGetArray()` | Superseded by texture object APIs |

## Notes

- No breaking changes are called out specifically for HIP 7 in the current documentation; the officially documented deprecation history above (through ROCm 6.1.0) is the authoritative list as of HIP 7.14.x.
- Texture-reference (`hipTexRef*`) APIs are broadly superseded by the texture object API; prefer `hipCreateTextureObject` (see `texture-surface.md`) in new code.
- Documented against HIP 7.14.x (ROCm 7.x), `rocm.docs.amd.com/projects/HIP/en/latest/` as of 2026-07.

## Related

- [texture-surface.md](./texture-surface.md)
- [module-context-management.md](./module-context-management.md)
- [error-handling.md](./error-handling.md)
