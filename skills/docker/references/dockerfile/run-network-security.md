---
source: https://docs.docker.com/reference/dockerfile/#run---network
---

# RUN --network / RUN --security

Per-instruction control of the networking environment (`--network`) and the security mode (`--security`) of a `RUN` command.

## Signature / Usage

```dockerfile
RUN --network=<TYPE>
RUN --security=<sandbox|insecure>
```

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.6
ADD mypackage.tgz wheels/
RUN --network=none pip install --find-links wheels mypackage
```

## Options / Props

`--network` types (minimum Dockerfile version 1.3):

| Type | Description |
| --- | --- |
| `default` (default) | Run in the default network. Equivalent to not supplying the flag. |
| `none` | Run with no network access (`lo` is still available, but isolated to this process). |
| `host` | Run in the host's network environment (like `docker build --network=host`, per instruction). |

`--security` modes (minimum Dockerfile version 1.20):

| Mode | Description |
| --- | --- |
| `sandbox` | Default. Activating it explicitly via `--security=sandbox` is a no-op. |
| `insecure` | Runs the command without sandbox, allowing flows requiring elevated privileges (e.g. containerd). Equivalent to `docker run --privileged`. |

## Notes

- `--network=none` example: `pip` can only install packages provided in the tarfile, which can be controlled by an earlier build stage.
- `--network=host` is protected by the `network.host` entitlement: start buildkitd with `--allow-insecure-entitlement network.host` (or via buildkitd config) and pass `--allow network.host` on the build request.
- `--security=insecure` requires the `security.insecure` entitlement: start buildkitd with `--allow-insecure-entitlement security.insecure` (or via buildkitd config) and pass `--allow security.insecure` on the build request.
- Example check of entitlements:

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM ubuntu
  RUN --security=insecure cat /proc/self/status | grep CapEff
  ```

  Output: `#84 0.093 CapEff:	0000003fffffffff`

## Related

- [run.md](./run.md)
- [run-mount.md](./run-mount.md)
