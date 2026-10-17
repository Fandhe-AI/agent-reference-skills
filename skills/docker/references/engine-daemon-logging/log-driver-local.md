---
source: https://docs.docker.com/engine/logging/drivers/local/
---

# Local file logging driver

Writes stdout/stderr to internal storage optimized for performance and disk use; rotates and compresses by default.

## Signature / Usage

```json
{
  "log-driver": "local",
  "log-opts": {
    "max-size": "10m"
  }
}
```

```console
$ docker run -it --log-driver local --log-opt max-size=10m --log-opt max-file=3 alpine ash
```

## Options / Props

| Option | Description | Example value |
| --- | --- | --- |
| `max-size` | Maximum size of the log before it's rolled. Positive integer plus unit (`k`, `m`, `g`). Defaults to 20m. | `--log-opt max-size=10m` |
| `max-file` | Maximum number of log files; the oldest is removed when rolling creates excess. Defaults to 5. | `--log-opt max-file=3` |
| `compress` | Toggle compression of rotated log files. Enabled by default. | `--log-opt compress=false` |

## Notes

- Default retention is 100MB per container (20M per file x 5 files), with automatic compression.
- Files are designed to be exclusively accessed by the Docker daemon; external tools may interfere with Docker's logging system.
- `local` is a bash reserved keyword, so you may need to quote it in scripts.
- Restart Docker for `daemon.json` changes; existing containers keep their old configuration. Docker Desktop: Settings > Docker Engine.

## Related

- [Configure logging drivers](./logging-configure.md)
- [JSON File logging driver](./log-driver-json-file.md)
- [Use docker logs with remote logging drivers](./dual-logging.md)
