---
source: https://docs.docker.com/engine/logging/drivers/fluentd/
---

# Fluentd logging driver

Sends container logs to a Fluentd collector as structured log data.

## Signature / Usage

```json
{
  "log-driver": "fluentd",
  "log-opts": {
    "fluentd-address": "fluentdhost:24224"
  }
}
```

```console
$ docker run --log-driver=fluentd --log-opt fluentd-address=unix:///path/to/fluentd.sock alpine echo hello
```

Test collector (`test.conf`) and container:

```text
<source>
  @type forward
</source>

<match *>
  @type stdout
</match>
```

```console
$ docker run -it -p 24224:24224 -v /path/to/conf/test.conf:/fluentd/etc/test.conf -e FLUENTD_CONF=test.conf fluent/fluentd:latest
```

## Options / Props

| Option | Description |
| --- | --- |
| `fluentd-address` | Socket address of the Fluentd daemon; default `localhost:24224`. `tcp` (default) and `unix` supported. |
| `tag` | Tag for Fluentd messages; default is the first 12 characters of the container ID. Supports Go templates such as `{{.ID}}`, `{{.FullID}}`, `{{.Name}}`. |
| `labels`, `labels-regex`, `env`, `env-regex` | Add extra attributes; on a `label`/`env` key collision, `env` wins. |
| `fluentd-async` | Connect in the background; messages buffered until connected. Defaults to `false`. |
| `fluentd-async-reconnect-interval` | With `fluentd-async`, interval in milliseconds for re-establishing the connection. |
| `fluentd-buffer-limit` | Number of events buffered in memory. Default 1048576; when full, the call to record logs fails. |
| `fluentd-retry-wait` | Wait between retries. Defaults to 1 second. |
| `fluentd-max-retries` | Maximum number of retries. Defaults to `4294967295` (2**32 - 1). |
| `fluentd-sub-second-precision` | Nanosecond resolution event logs. Defaults to `false`. |
| `fluentd-write-timeout` | Timeout for writes to the daemon. By default writes have no timeout and block indefinitely. |

Metadata fields sent: `container_id` (full 64-char ID), `container_name` (name at start), `source` (`stdout` or `stderr`), `log`.

## Notes

- Adapted: an image and command were added to the official `docker run` example.
- If the container cannot connect to the Fluentd daemon, it stops immediately unless `fluentd-async` is used.
- Start a Fluentd daemon before using the driver (the `fluent/fluentd` image is recommended).
- `log-opts` values in `daemon.json` must be strings (quote `fluentd-async`, `fluentd-max-retries`). Restart Docker for changes.
- `docker rename` is not reflected in `container_name`.

## Related

- [Configure logging drivers](./logging-configure.md)
- [Customize log driver output](./log-tags.md)
