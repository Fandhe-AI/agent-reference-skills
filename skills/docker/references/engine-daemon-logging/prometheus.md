---
source: https://docs.docker.com/engine/daemon/prometheus/
---

# Collect Docker metrics with Prometheus

Expose the Docker daemon as a Prometheus target via `metrics-addr`.

## Signature / Usage

`daemon.json` (restart Docker afterwards):

```json
{
  "metrics-addr": "127.0.0.1:9323"
}
```

Prometheus scrape job for the daemon (from the stock `prometheus.yml` example):

```yml
  - job_name: docker
      # metrics_path defaults to '/metrics'
      # scheme defaults to 'http'.

    static_configs:
      - targets: ["host.docker.internal:9323"]
```

Run Prometheus as a container with that file:

```console
$ docker run --name my-prometheus \
    --mount type=bind,source=/tmp/prometheus.yml,destination=/etc/prometheus/prometheus.yml \
    -p 9090:9090 \
    --add-host host.docker.internal=host-gateway \
    prom/prometheus
```

## Notes

- Warning: available metrics and their names are in active development and may change at any time. Only Docker itself can be monitored, not your application.
- Default daemon config locations: Linux `/etc/docker/daemon.json`, Windows Server `C:\ProgramData\docker\config\daemon.json`, Docker Desktop via Settings > Docker Engine.
- Metrics are exposed on port 9323 on the loopback interface; `0.0.0.0` exposes it to the wider network, so consider your threat model.
- With Docker Desktop the `--add-host` flag is optional; target URLs on the Prometheus targets page can't be opened directly.
- Verify the target at `http://localhost:9090/targets/`; example metric: `engine_daemon_network_actions_seconds_count`. Default scrape interval in the example is 15 seconds.
- For remote Prometheus, add the daemon address as a scrape endpoint: `targets: ["docker.daemon.example:<PORT>"]`.

## Related

- [dockerd](./dockerd.md)
- [Docker daemon configuration overview](./daemon-overview.md)
