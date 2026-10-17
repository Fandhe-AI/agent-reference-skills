---
source: https://docs.docker.com/engine/daemon/alternative-runtimes/
---

# Alternative container runtimes

Use runtimes other than runc (default under containerd) with Docker Engine: containerd shims, or runc drop-in replacements.

## Signature / Usage

Shim installed on `PATH`:

```console
$ docker run --runtime io.containerd.kata.v2 hello-world
```

Register a shim outside `PATH` in `daemon.json`:

```json
{
  "runtimes": {
    "foo": {
      "runtimeType": "/path/to/containerd-shim-foobar-v1"
    }
  }
}
```

Shim with options (reload with `systemctl reload docker`, then `docker run --runtime gvisor hello-world`):

```json
{
  "runtimes": {
    "gvisor": {
      "runtimeType": "io.containerd.runsc.v1",
      "options": {
        "TypeUrl": "io.containerd.runsc.v1.options",
        "ConfigPath": "/etc/containerd/runsc.toml"
      }
    }
  }
}
```

runc drop-in replacement (youki):

```json
{
  "runtimes": {
    "youki": {
      "path": "/usr/local/bin/youki"
    }
  }
}
```

## Notes

- Runtimes implementing their own containerd shim (examples: Wasmtime, gVisor, Kata Containers) need no extra daemon configuration when the shim is on `PATH`. Runc drop-ins (example: youki) depend on the runc shim and must be registered manually.
- Wasmtime: enable the containerd image store (`"features": {"containerd-snapshotter": true}`), restart the daemon, install `containerd-shim-wasmtime-v1` on `PATH`, then `docker run --rm --runtime io.containerd.wasmtime.v1 --platform wasi/wasm32 michaelirwin244/wasm-example`.
- The default runtime is set with `default-runtime` / `--default-runtime`; see the dockerd reference.

## Related

- [dockerd](./dockerd.md)
- [Docker daemon configuration overview](./daemon-overview.md)
