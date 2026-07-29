# Error Log Management

Driver API for capturing and inspecting CUDA-internal error/warning log messages, either by directing them to a file/stream via the `CUDA_LOG_FILE` environment variable or by registering a callback (`cuLogsRegisterCallback`) to receive them programmatically.

## Signature / Usage

```c
// Callback signature invoked for each log entry (verbatim from the official page)
void callbackFunc(void *data, CUlogLevel logLevel, char *message, size_t length);
```

```bash
# Alternative activation without code changes
export CUDA_LOG_FILE=stderr
```

## Options / Props

| Name | Description |
| --- | --- |
| `CUDA_LOG_FILE` | Environment variable set to `stdout`, `stderr`, or a file path to activate log output without code changes. |
| `cuLogsRegisterCallback` / `cuLogsUnregisterCallback` | Register/unregister a callback invoked for each log entry with `(data, logLevel, message, length)`. |
| `cuLogsCurrent` | Retrieves an iterator/handle to the current position in the log buffer. |
| `cuLogsDumpToFile` / `cuLogsDumpToMemory` | Export buffered log entries to a file or an in-memory buffer. |
| `cuGetErrorString` | Converts a `CUresult` error code into a human-readable string (distinct from the log system itself). |

## Notes

- Log entries are formatted as `[Time][TID][Source][Severity][API Entry Point] Message`, e.g. `[22:21:32.099][25642][CUDA][E][cuLogsDumpToMemory] buffer cannot be NULL`.
- The internal log buffer holds a maximum of 100 entries; `cuLogsDumpToMemory` is capped at 25,600 bytes, and entries are newline-separated.
- Error log management is currently available only through the CUDA Driver API, not the Runtime API.
- The registration call itself (`cuLogsRegisterCallback`'s exact parameter list and its handle type) was not returned verbatim by the source fetch; only the callback signature above is quoted directly from the official page. Confirm the registration call's exact signature against the official page before relying on it.

## Related

- [The CUDA Driver API](../core/driver-api.md)
- [A Tour of CUDA Features](../core/feature-survey.md)
