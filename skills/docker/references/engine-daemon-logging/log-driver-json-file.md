---
source: https://docs.docker.com/engine/logging/drivers/json-file/
---

# JSON File logging driver

Default driver: writes each container's stdout/stderr to JSON files annotated with stream and timestamp.

## Signature / Usage

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

```console
$ docker run \
      --log-driver json-file --log-opt max-size=10m \
      alpine echo hello world
```

Log line format:

```json
{
  "log": "Log line is here\n",
  "stream": "stdout",
  "time": "2019-01-01T11:11:11.111111111Z"
}
```

## Options / Props

| Option | Description | Example value |
| --- | --- | --- |
| `max-size` | Maximum size of the log before it is rolled. Positive integer plus unit (`k`, `m`, `g`). Defaults to -1 (unlimited). | `--log-opt max-size=10m` |
| `max-file` | Maximum number of log files; the oldest is removed when rolling creates excess. Only effective when `max-size` is also set. Defaults to 1. | `--log-opt max-file=3` |
| `labels` | Applies when starting the daemon. Comma-separated list of logging-related labels this daemon accepts. | `--log-opt labels=production_status,geo` |
| `labels-regex` | Regular expression to match logging-related labels. | `--log-opt labels-regex=^(production_status\|geo)` |
| `env` | Applies when starting the daemon. Comma-separated list of logging-related environment variables this daemon accepts. | `--log-opt env=os,customer` |
| `env-regex` | Regular expression to match logging-related environment variables. | `--log-opt env-regex=^(os\|customer)` |
| `compress` | Toggles compression for rotated logs. Defaults to `false`. | `--log-opt compress=true` |

## Notes

- Files are designed to be exclusively accessed by the Docker daemon; interacting with them via external tools may interfere with Docker's logging system.
- `log-opts` values in `daemon.json` must be strings (quote numbers and booleans). Restart Docker; existing containers keep their old configuration.
- Docker Desktop: edit under Settings > Docker Engine.

## Related

- [Configure logging drivers](./logging-configure.md)
- [Local file logging driver](./log-driver-local.md)
- [Customize log driver output](./log-tags.md)
