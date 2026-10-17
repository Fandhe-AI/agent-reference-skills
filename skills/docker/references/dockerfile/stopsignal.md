---
source: https://docs.docker.com/reference/dockerfile/#stopsignal
---

# STOPSIGNAL

Sets the system call signal that will be sent to the container to exit.

## Signature / Usage

```dockerfile
STOPSIGNAL signal
```

## Notes

- The signal can be a name in the format `SIG<NAME>` (e.g. `SIGKILL`) or an unsigned number matching a position in the kernel's syscall table (e.g. `9`). The default is `SIGTERM`.
- It applies to the signal sent by `docker stop` (and by the Docker daemon when stopping a container). It does not affect signals sent by keyboard shortcuts such as Ctrl+C, which sends `SIGINT` directly regardless of `STOPSIGNAL`.
- The image's default stop signal can be overridden per container with `--stop-signal` on `docker run` and `docker create`.

## Related

- [entrypoint.md](./entrypoint.md)
- [healthcheck.md](./healthcheck.md)
