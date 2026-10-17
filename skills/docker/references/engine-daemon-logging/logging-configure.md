---
source: https://docs.docker.com/engine/logging/configure/
---

# Configure logging drivers

Logging drivers collect container output. Each daemon has a default driver (`json-file`) that containers use unless overridden with `--log-driver`.

## Signature / Usage

Daemon default in `daemon.json` (log-opts values must be strings):

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3",
    "labels": "production_status",
    "env": "os,customer"
  }
}
```

Per container:

```console
$ docker run -it --log-driver none alpine ash
$ docker run -it --log-opt mode=non-blocking --log-opt max-buffer-size=4m alpine ping 127.0.0.1
```

Inspect:

```console
$ docker info --format '{{.LoggingDriver}}'
$ docker inspect -f '{{.HostConfig.LogConfig.Type}}' <CONTAINER>
```

## Options / Props

Delivery mode options:

| Option | Description |
| --- | --- |
| `mode` | `blocking` (default, direct delivery) or `non-blocking` (per-container intermediate buffer). |
| `max-buffer-size` | Buffer size when `mode` is `non-blocking`. Default `1m`; accepts go-units formats such as `1KiB`, `2g`. |

Supported logging drivers:

| Driver | Description |
| --- | --- |
| `none` | No logs are available for the container and `docker logs` does not return any output. |
| `local` | Logs are stored in a custom format designed for minimal overhead. |
| `json-file` | The logs are formatted as JSON. The default logging driver for Docker. |
| `syslog` | Writes logging messages to the `syslog` facility. The `syslog` daemon must be running on the host machine. |
| `journald` | Writes log messages to `journald`. The `journald` daemon must be running on the host machine. |
| `gelf` | Writes log messages to a Graylog Extended Log Format (GELF) endpoint such as Graylog or Logstash. |
| `fluentd` | Writes log messages to `fluentd` (forward input). The `fluentd` daemon must be running on the host machine. |
| `awslogs` | Writes log messages to Amazon CloudWatch Logs. |
| `splunk` | Writes log messages to `splunk` using the HTTP Event Collector. |
| `etwlogs` | Writes log messages as Event Tracing for Windows (ETW) events. Only available on Windows platforms. |
| `gcplogs` | Writes log messages to Google Cloud Platform (GCP) Logging. |

## Notes

- Tip from the docs: `json-file` does no log rotation by default and can exhaust disk. It stays the default for backwards compatibility and for Kubernetes-runtime use; otherwise the `local` driver is recommended (rotates by default, more efficient format).
- Changing the default driver or options only affects containers created afterwards; re-create a container to change its driver. Restart the daemon (`sudo systemctl restart docker`; Docker Desktop: `docker desktop restart`) for `daemon.json` changes.
- In `non-blocking` mode, when the buffer is full new messages are not enqueued (dropping is often preferred to blocking the application).
- Some drivers add `--env`/`--label` values to log output, e.g. `"attrs":{"production_status":"testing","os":"ubuntu"}` for `json-file`.
- Limitations: reading rotated, compressed files temporarily increases disk and CPU use; host storage capacity bounds total log size.
- Splunk, etwlogs, gcplogs and logging driver plugins are not covered in this skill.

## Related

- [JSON File logging driver](./log-driver-json-file.md)
- [Local file logging driver](./log-driver-local.md)
- [Use docker logs with remote logging drivers](./dual-logging.md)
- [Customize log driver output](./log-tags.md)
