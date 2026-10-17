---
source: https://docs.docker.com/engine/logging/drivers/syslog/
---

# Syslog logging driver

Routes container logs to a `syslog` server using the RFC 5424 format.

## Signature / Usage

```json
{
  "log-driver": "syslog",
  "log-opts": {
    "syslog-address": "udp://1.2.3.4:1111"
  }
}
```

```console
$ docker run \
      --log-driver syslog --log-opt syslog-address=udp://1.2.3.4:1111 \
      alpine echo hello world
```

## Options / Props

| Option | Description | Example value |
| --- | --- | --- |
| `syslog-address` | Address of an external `syslog` server. URI: `[tcp\|udp\|tcp+tls]://host:port`, `unix://path`, or `unixgram://path`. Default port `514` for tcp/udp/tcp+tls. | `--log-opt syslog-address=tcp+tls://192.168.1.3:514` |
| `syslog-facility` | The `syslog` facility to use (number or name). | `--log-opt syslog-facility=daemon` |
| `syslog-tls-ca-cert` | Absolute path to CA-signed trust certificates. Ignored unless protocol is `tcp+tls`. | `--log-opt syslog-tls-ca-cert=/etc/ca-certificates/custom/ca.pem` |
| `syslog-tls-cert` | Absolute path to the TLS certificate file. Ignored unless `tcp+tls`. | `--log-opt syslog-tls-cert=/etc/ca-certificates/custom/cert.pem` |
| `syslog-tls-key` | Absolute path to the TLS key file. Ignored unless `tcp+tls`. | `--log-opt syslog-tls-key=/etc/ca-certificates/custom/key.pem` |
| `syslog-tls-skip-verify` | If `true`, TLS verification is skipped. Defaults to `false`. Ignored unless `tcp+tls`. | `--log-opt syslog-tls-skip-verify=false` |
| `tag` | String appended to `APP-NAME`. Defaults to the first 12 characters of the container ID. | `--log-opt tag=mailer` |
| `syslog-format` | Message format: unset (local Unix syslog format, no hostname), `rfc3164`, `rfc5424`, or `rfc5424micro` (microsecond timestamps). | `--log-opt syslog-format=rfc5424micro` |
| `labels` | Applies when starting the daemon. Comma-separated labels this daemon accepts. | `--log-opt labels=production_status,geo` |
| `labels-regex` | Regular expression matching logging-related labels. | `--log-opt 'labels-regex=^(production_status\|geo)'` |
| `env` | Applies when starting the daemon. Comma-separated environment variables this daemon accepts. | `--log-opt env=os,customer` |
| `env-regex` | Regular expression matching logging-related environment variables. | `--log-opt 'env-regex=^(os\|customer)'` |

## Notes

- Adapted: the official example value for `syslog-tls-skip-verify` is `true`, but that disables verification of the destination's certificate, so `false` is shown. To trust a private CA, use `syslog-tls-ca-cert` instead of skipping verification.
- Receivers can extract priority, timestamp, hostname, facility, and process name/PID from a valid message.
- `log-opts` values in `daemon.json` must be strings (quote booleans and numbers such as `syslog-tls-skip-verify`). Restart Docker for changes. Docker Desktop: Settings > Docker Engine.

## Related

- [Configure logging drivers](./logging-configure.md)
- [Customize log driver output](./log-tags.md)
