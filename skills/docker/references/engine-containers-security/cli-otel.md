---
source: https://docs.docker.com/engine/cli/otel/
---

# OpenTelemetry for the Docker CLI

The Docker CLI can emit OpenTelemetry metrics about command invocations. This is disabled by default and opt-in: you choose where data is sent by specifying a collector endpoint.

## Signature / Usage

```bash
DOCKER_CLI_OTEL_EXPORTER_OTLP_ENDPOINT=<endpoint>
```

Example setup (`compose.yaml` with an OpenTelemetry collector and Prometheus):

```yaml
name: cli-otel
services:
  prometheus:
    image: prom/prometheus
    command:
      - "--config.file=/etc/prometheus/prom.yml"
    ports:
      # Publish the Prometheus frontend on localhost:9091
      - 9091:9090
    restart: always
    volumes:
      # Store Prometheus data in a volume:
      - prom_data:/prometheus
      # Mount the prom.yml config file
      - ./prom.yml:/etc/prometheus/prom.yml
  otelcol:
    image: otel/opentelemetry-collector
    restart: always
    depends_on:
      - prometheus
    ports:
      - 4317:4317
    volumes:
      # Mount the otelcol.yml config file
      - ./otelcol.yml:/etc/otelcol/config.yaml

volumes:
  prom_data:
```

`otelcol.yml`:

```yaml
# Receive signals over gRPC and HTTP
receivers:
  otlp:
    protocols:
      grpc:
      http:

# Establish an endpoint for Prometheus to scrape from
exporters:
  prometheus:
    endpoint: "0.0.0.0:8889"

service:
  pipelines:
    metrics:
      receivers: [otlp]
      exporters: [prometheus]
```

`prom.yml`:

```yaml
# Configure Prometheus to scrape the OpenTelemetry collector endpoint
scrape_configs:
  - job_name: "otel-collector"
    scrape_interval: 1s
    static_configs:
      - targets: ["otelcol:8889"]
```

Run it:

```console
$ docker compose up
$ export DOCKER_CLI_OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
$ docker version
```

Then open `http://localhost:9091/graph` and query `command_time_milliseconds_total`.

## Options / Props

The CLI exports a single metric, `command.time` (execution duration in milliseconds), with attributes:

| Attribute | Description |
| --- | --- |
| `command.name` | The name of the command |
| `command.status.code` | The exit code of the command |
| `command.stderr.isatty` | True if stderr is attached to a TTY |
| `command.stdin.isatty` | True if stdin is attached to a TTY |
| `command.stdout.isatty` | True if stdout is attached to a TTY |

## Notes

- The CLI emits nothing unless `DOCKER_CLI_OTEL_EXPORTER_OTLP_ENDPOINT` is set. You need a collector listening on that endpoint and a backend (e.g. Prometheus, InfluxDB; Grafana for visualization).

## Related

- [Docker CLI (docker)](../cli-image-system/docker.md)
