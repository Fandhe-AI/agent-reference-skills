---
source: https://docs.docker.com/engine/logging/drivers/gelf/
---

# Graylog Extended Format logging driver

Writes logs in GELF format, understood by Graylog, Logstash, and Fluentd.

## Signature / Usage

```json
{
  "log-driver": "gelf",
  "log-opts": {
    "gelf-address": "udp://1.2.3.4:12201"
  }
}
```

```console
$ docker run -dit \
    --log-driver=gelf \
    --log-opt gelf-address=udp://192.168.0.42:12201 \
    alpine sh
```

## Options / Props

| Option | Required | Description | Example value |
| --- | --- | --- | --- |
| `gelf-address` | required | Address of the GELF server. Only `tcp` and `udp` URI specifiers; port required. | `--log-opt gelf-address=udp://192.168.0.42:12201` |
| `gelf-compression-type` | optional | UDP only. `gzip` (default), `zlib`, or `none`. Compression leads to excessive CPU usage; setting `none` is highly recommended. | `--log-opt gelf-compression-type=gzip` |
| `gelf-compression-level` | optional | UDP only. Integer `-1` to `9`; default 1 (BestSpeed). `-1` or `0` disables compression. | `--log-opt gelf-compression-level=2` |
| `gelf-tcp-max-reconnect` | optional | TCP only. Maximum reconnection attempts. Default 3. | `--log-opt gelf-tcp-max-reconnect=3` |
| `gelf-tcp-reconnect-delay` | optional | TCP only. Seconds between reconnection attempts. Default 1. | `--log-opt gelf-tcp-reconnect-delay=1` |
| `tag` | optional | String appended to `APP-NAME`; default first 12 characters of the container ID. | `--log-opt tag=mailer` |
| `labels` | optional | Comma-separated label keys; adds keys to `extra` fields prefixed by `_`. | `--log-opt labels=production_status,geo` |
| `labels-regex` | optional | Regular expression matching logging-related labels. | `--log-opt 'labels-regex=^(production_status\|geo)'` |
| `env` | optional | Comma-separated environment variable keys; adds keys to `extra` fields prefixed by `_`. | `--log-opt env=os,customer` |
| `env-regex` | optional | Regular expression matching logging-related environment variables. | `--log-opt 'env-regex=^(os\|customer)'` |

## Notes

- A GELF message is a dict with version, host, timestamp, short and long message, and custom fields.
- The `gelf` driver doesn't support TLS for TCP connections; messages sent to TLS-protected inputs can silently fail.
- `log-opts` values in `daemon.json` must be strings (quote `gelf-tcp-max-reconnect`). Restart Docker for changes.

## Related

- [Configure logging drivers](./logging-configure.md)
- [Customize log driver output](./log-tags.md)
