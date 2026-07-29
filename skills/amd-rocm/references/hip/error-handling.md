# Error Handling

Functions to retrieve, peek at, and translate HIP runtime error codes into human-readable strings.

## Signature / Usage

```cpp
hipError_t err = hipMalloc(&ptr, size);
if (err != hipSuccess) {
    fprintf(stderr, "hipMalloc failed: %s\n", hipGetErrorString(err));
}
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipError_t hipGetLastError(void)` | Returns the last error from a runtime call on this thread and resets it to `hipSuccess` |
| `hipError_t hipExtGetLastError(void)` | Extended variant, functionally identical to `hipGetLastError` |
| `hipError_t hipPeekAtLastError(void)` | Returns the last error without resetting the saved error code |
| `const char* hipGetErrorName(hipError_t hip_error)` | Converts an error code to its name string |
| `const char* hipGetErrorString(hipError_t hipError)` | Returns a descriptive message explaining the error |
| `hipError_t hipDrvGetErrorName(hipError_t hipError, const char** errorString)` | Driver-level error name retrieval via output parameter |
| `hipError_t hipDrvGetErrorString(hipError_t hipError, const char** errorString)` | Driver-level error message retrieval via output parameter |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Since exceptions are unavailable in device code (see `kernel-language-cpp-support.md`), host-side return-code checking is the primary error-handling mechanism.

## Related

- [debugging-logging.md](./debugging-logging.md)
- [deprecated-apis.md](./deprecated-apis.md)
