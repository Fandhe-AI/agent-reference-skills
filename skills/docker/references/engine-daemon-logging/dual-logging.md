---
source: https://docs.docker.com/engine/logging/dual-logging/
---

# Use docker logs with remote logging drivers

Dual logging: Docker Engine uses the `local` driver as a cache so `docker logs` works even when the configured driver can't read logs.

## Signature / Usage

Disable the cache (daemon default for new containers):

```console
$ cat /etc/docker/daemon.json
{
  "log-driver": "splunk",
  "log-opts": {
    "cache-disabled": "true",
    ... (options for "splunk" logging driver)
  }
}
```

Without the cache, reading fails with:

```console
$ docker logs 7d6ac83a89a0
Error response from daemon: configured logging driver does not support reading
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `cache-disabled` | `"false"` | Disable local caching. Boolean as a string (`true`, `1`, `0`, `false`). |
| `cache-max-size` | `"20m"` | Maximum cache size before rotation. Positive integer plus unit (`k`, `m`, `g`). |
| `cache-max-file` | `"5"` | Maximum number of cache files; the oldest is removed when rotating creates excess. |
| `cache-compress` | `"true"` | Enable or disable compression of rotated log files. |

## Notes

- Enabled automatically when the configured driver doesn't support reading. By default the cache rotates, up to 5 files of 20 MB (before compression) per container.
- Options match the `local` driver with a `cache-` prefix; they can be set per container or as daemon defaults.
- For drivers that support reading (`local`, `json-file`, `journald`) dual logging isn't used and disabling it has no effect.
- Limitations: no cache write occurs if a remote-driver container has a network issue; failed cache writes (file system full, permissions) are logged in the daemon log and not retried; some logs may be lost from the cache because a ring buffer prevents blocking container stdio on slow writes.

## Related

- [Configure logging drivers](./logging-configure.md)
- [Local file logging driver](./log-driver-local.md)
- [View container logs](./logging-overview.md)
