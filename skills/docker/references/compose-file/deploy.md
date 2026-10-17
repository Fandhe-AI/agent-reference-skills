---
source: https://docs.docker.com/reference/compose-file/deploy/
---

# Compose Deploy Specification

Deploy is an optional part of the Compose Specification. It provides deployment specifications for managing the behavior of containers across different environments.

## Signature / Usage

```yml
services:
  frontend:
    image: example/webapp
    deploy:
      mode: replicated
      replicas: 6
      resources:
        limits:
          cpus: '0.50'
          memory: 50M
          pids: 1
        reservations:
          cpus: '0.25'
          memory: 20M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
```

Note: the snippet merges `mode` / `replicas`, `resources`, and `restart_policy` examples that the official page shows separately.

## Options / Props

| Name | Description |
| --- | --- |
| `endpoint_mode` | Service discovery method for external clients. `vip` assigns a virtual IP that fronts the service; `dnsrr` sets up DNS round-robin entries so a DNS query for the service name returns a list of IPs. |
| `labels` | Metadata set only on the service, not on any containers for the service. |
| `mode` | Replication model: `global` (one task per physical node), `replicated` (specified number of tasks across nodes; default), `replicated-job` (number of tasks run to completion with exit code 0; total set by `replicas`), `global-job` (one task per node run to completion; automatically runs on new nodes). |
| `placement` | Constraints and preferences for node selection (`constraints`, `preferences`). |
| `replicas` | If the service is `replicated` (default), the number of containers that should be running at any given time. |
| `resources` | Physical resource constraints: `limits` (platform must prevent allocating more) and `reservations` (platform must guarantee at least this amount). |
| `restart_policy` | If and how to restart containers when they exit. If not set, Compose considers the service-level `restart` field. |
| `rollback_config` | How the service is rolled back in case of a failing update. |
| `update_config` | How the service is updated; useful for rolling updates. |

`placement`:

```yml
deploy:
  placement:
    constraints:
      - node.labels.disktype==ssd
    preferences:
      - spread: node.labels.zone
```

`constraints` defines a required property a node must fulfill; `preferences` defines a strategy (currently `spread` is the only supported strategy) to spread tasks evenly over the values of the node label.

`resources` sub-keys: `cpus` (limit or reservation as number of cores), `memory` (byte-value string), `pids` (integer PIDs limit), `devices` (reservations of devices).

`devices` entries have `capabilities` (required list; generic `gpu` = graphics accelerator and `tpu` = AI accelerator; driver-specific capabilities must be prefixed with the driver name), `driver`, `count`, `device_ids`, and `options`. `count` (integer or `all`; `all` or unspecified reserves all devices satisfying the capabilities) and `device_ids` (list of strings) are exclusive; Compose errors if both are specified.

```yml
deploy:
  resources:
    reservations:
      devices:
        - capabilities: ["nvidia-compute"]
          driver: nvidia
```

```yml
deploy:
  resources:
    reservations:
      devices:
        - capabilities: ["gpu"]
          device_ids: ["GPU-f123d1c9-26bb-df9b-1c23-4a731f61d8c7"]
```

`restart_policy` fields: `condition` (`none`, `on-failure`, `any` default), `delay` (duration; default 0), `max_attempts` (default unlimited; a failed attempt counts only if the container does not restart successfully within `window`), `window` (time to wait after a restart to decide success; default evaluates immediately).

`rollback_config` fields: `parallelism` (0 = all at once), `delay` (default 0s), `failure_action` (`continue` or `pause`, default `pause`), `monitor` (default 0s), `max_failure_ratio` (default 0), `order` (`stop-first` default or `start-first`).

`update_config` fields: `parallelism`, `delay`, `failure_action` (`continue`, `rollback`, or `pause`; default `pause`), `monitor` (default 0s), `max_failure_ratio`, `order` (`stop-first` default or `start-first`).

```yml
deploy:
  update_config:
    parallelism: 2
    delay: 10s
    order: stop-first
```

## Notes

- Job modes (`replicated-job`, `global-job`) are for tasks that complete and exit with code 0; completed tasks remain until explicitly removed. `max-concurrent` is supported only via the CLI, not in Compose.
- If `deploy` is not implemented by the platform, it is ignored and the Compose file is still valid.
- GPU device reservations here are a Compose-file concern; installing the NVIDIA Container Toolkit is covered by dgx-spark; the ROCm container setup by amd-rocm.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: cpu / memory / blkio / devices / gpus](./services-resources.md)
- [services: depends_on / healthcheck / restart / lifecycle hooks](./services-lifecycle.md)
- [Extensions (byte values and durations)](./extension.md)
