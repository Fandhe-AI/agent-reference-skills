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

Minimal `prometheus.yml` with the scrape job for the daemon (the official stock file also has `global` and `rule_files`):

```yml
scrape_configs:
  - job_name: docker
    scrape_interval: 15s
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9323"]
```

Run Prometheus as a container with that file:

```console
$ docker run --name my-prometheus \
    --mount type=bind,source=/tmp/prometheus.yml,destination=/etc/prometheus/prometheus.yml \
    --network host \
    prom/prometheus
```

## Notes

- Warning: available metrics and their names are in active development and may change at any time. Only Docker itself can be monitored, not your application.
- Default daemon config locations: Linux `/etc/docker/daemon.json`, Windows Server `C:\ProgramData\docker\config\daemon.json`, Docker Desktop via Settings > Docker Engine.
- Metrics are exposed on port 9323 on the loopback interface; `0.0.0.0` exposes it to the wider network, so consider your threat model.
- Adapted: the official example targets `host.docker.internal:9323` from a bridge-networked container, which cannot reach a loopback-bound `metrics-addr` on Linux Docker Engine (`host-gateway` resolves to the bridge gateway, not the host loopback); `--network host` with `localhost:9323` is shown instead.
- With `--network host` there is no port publishing: Prometheus listens directly on host port 9090. Alternatively, bind `metrics-addr` to a host address reachable from containers and restrict access with a firewall.
- With Docker Desktop, use the official form instead: target `host.docker.internal:9323`, with `-p 9090:9090` and `--add-host host.docker.internal=host-gateway` (the `--add-host` flag is optional there); target URLs on the Prometheus targets page can't be opened directly.
- Verify the target at `http://localhost:9090/targets/`; example metric: `engine_daemon_network_actions_seconds_count`. The example sets `scrape_interval: 15s` (the official stock file sets it under `global`; Prometheus default is 1 minute).
- For remote Prometheus, add the daemon address as a scrape endpoint: `targets: ["docker.daemon.example:<PORT>"]`.

## Related

- [dockerd](./dockerd.md)
- [Docker daemon configuration overview](./daemon-overview.md)
