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

- The deprecated API list (`reference/deprecated_api_list`) is unchanged between the 7.14.0 and 10.1.0 documentation; the deprecation history above (through ROCm 6.1.0) is the authoritative list as of HIP 7.16.0. Behavior, signature, struct, and error-code changes that came with HIP 7.0 (for example `hipGetLastError` semantics with `hipExtGetLastError` for the prior behavior, `hipRTC` symbols removed from the HIP runtime library so applications must link `hipRTC` explicitly, `HIP_MEMSET_NODE_PARAMS` removed in favor of `hipMemsetParams`) are documented on the separate "HIP API 7.0 changes" page (`hip-7-changes`)
- Texture-reference (`hipTexRef*`) APIs are broadly superseded by the texture object API; prefer `hipCreateTextureObject` (see `texture-surface.md`) in new code.
- Documented against HIP 7.16.0 (ROCm Core SDK 10.1.0), `rocm.docs.amd.com/projects/HIP/en/latest/` as of 2026-10.

## Related

- [texture-surface.md](./texture-surface.md)
- [module-context-management.md](./module-context-management.md)
- [error-handling.md](./error-handling.md)
