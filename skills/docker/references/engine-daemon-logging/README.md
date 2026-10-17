# engine-daemon-logging

| Name | Description | Path |
|------|-------------|------|
| Alternative container runtimes | Use runtimes other than runc (default under containerd)… | [alternative-runtimes.md](./alternative-runtimes.md) |
| Read the daemon logs | Where to find daemon logs, how to enable debugging, and… | [daemon-logs.md](./daemon-logs.md) |
| Docker daemon configuration overview | How to customize the Docker daemon, `dockerd`, with a JSON… | [daemon-overview.md](./daemon-overview.md) |
| Daemon proxy configuration | Configure the Docker daemon to reach Docker Hub, other… | [daemon-proxy.md](./daemon-proxy.md) |
| Start the daemon | Start the Docker daemon either through operating system… | [daemon-start.md](./daemon-start.md) |
| Troubleshooting the Docker daemon | Common daemon, networking, and volume problems and their fixes. | [daemon-troubleshoot.md](./daemon-troubleshoot.md) |
| dockerd | `dockerd` is the persistent process that manages containers;… | [dockerd.md](./dockerd.md) |
| Use docker logs with remote logging drivers | Dual logging: Docker Engine uses the `local` driver as a… | [dual-logging.md](./dual-logging.md) |
| Live restore | Keep containers running when the daemon becomes unavailable… | [live-restore.md](./live-restore.md) |
| Amazon CloudWatch Logs logging driver | Sends container logs to Amazon CloudWatch Logs. | [log-driver-awslogs.md](./log-driver-awslogs.md) |
| Fluentd logging driver | Sends container logs to a Fluentd collector as structured… | [log-driver-fluentd.md](./log-driver-fluentd.md) |
| Graylog Extended Format logging driver | Writes logs in GELF format, understood by Graylog, Logstash,… | [log-driver-gelf.md](./log-driver-gelf.md) |
| Journald logging driver | Sends container logs to the `systemd` journal; read them with… | [log-driver-journald.md](./log-driver-journald.md) |
| JSON File logging driver | Default driver: writes each container's stdout/stderr to JSON… | [log-driver-json-file.md](./log-driver-json-file.md) |
| Local file logging driver | Writes stdout/stderr to internal storage optimized for… | [log-driver-local.md](./log-driver-local.md) |
| Syslog logging driver | Routes container logs to a `syslog` server using the RFC 5424 format. | [log-driver-syslog.md](./log-driver-syslog.md) |
| Customize log driver output | The `tag` log option formats the tag that identifies a… | [log-tags.md](./log-tags.md) |
| Configure logging drivers | Logging drivers collect container output. Each daemon has a… | [logging-configure.md](./logging-configure.md) |
| View container logs | `docker logs` shows what a running container wrote to… | [logging-overview.md](./logging-overview.md) |
| Collect Docker metrics with Prometheus | Expose the Docker daemon as a Prometheus target via `metrics-addr`. | [prometheus.md](./prometheus.md) |
| Configure remote access for Docker daemon | Make the daemon listen on an IP address and port in addition… | [remote-access.md](./remote-access.md) |
