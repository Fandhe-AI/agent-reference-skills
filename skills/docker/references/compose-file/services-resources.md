---
source: https://docs.docker.com/reference/compose-file/services/#cpus
---

# services: cpu / memory / blkio / devices / gpus

CPU, memory, block I/O, PID, ulimit, device, and GPU resource attributes at service level.

## Signature / Usage

```yml
services:
  foo:
    image: busybox
    blkio_config:
       weight: 300
       weight_device:
         - path: /dev/sda
           weight: 400
       device_read_bps:
         - path: /dev/sdb
           rate: '12mb'
       device_read_iops:
         - path: /dev/sdb
           rate: 120
       device_write_bps:
         - path: /dev/sdb
           rate: '1024k'
       device_write_iops:
         - path: /dev/sdb
           rate: 30
```

## Notes

### `blkio_config`

Block I/O limits for a service.

| Key | Description |
| --- | --- |
| `device_read_bps`, `device_write_bps` | Limit in bytes per second for read / write on a device. Each item has `path` (symbolic device path) and `rate` (integer bytes or a byte-value string). |
| `device_read_iops`, `device_write_iops` | Limit in operations per second. Each item has `path` and `rate` (integer). |
| `weight` | Proportion of bandwidth relative to other services. Integer 10 to 1000, default 500. |
| `weight_device` | Per-device bandwidth. Each item has `path` and `weight` (integer 10 to 1000). |

### CPU attributes

| Attribute | Description |
| --- | --- |
| `cpu_count` | Number of usable CPUs for the service container. |
| `cpu_percent` | Usable percentage of the available CPUs. |
| `cpu_shares` | Integer relative CPU weight versus other containers. |
| `cpu_period` | CPU CFS (Completely Fair Scheduler) period on Linux-kernel platforms. |
| `cpu_quota` | CPU CFS quota on Linux-kernel platforms. |
| `cpu_rt_runtime` | Real-time scheduler allocation; integer microseconds or a duration (e.g. `'400ms'`, `'95000'`). |
| `cpu_rt_period` | Real-time scheduler allocation; integer microseconds or a duration (e.g. `'1400us'`, `'11000'`). |
| `cpus` | Number of (potentially virtual) CPUs to allocate; fractional number, `0.000` means no limit. When set, must be consistent with the `cpus` attribute in the Deploy Specification. |
| `cpuset` | Explicit CPUs in which to permit execution; a range `0-3` or list `0,1`. |

### Memory attributes

| Attribute | Description |
| --- | --- |
| `mem_limit` | Limit on memory a container can allocate, as a byte-value string. Must be consistent with `limits.memory` in the Deploy Specification. |
| `mem_reservation` | Reservation on memory, as a byte-value string. Must be consistent with `reservations.memory` in the Deploy Specification. |
| `mem_swappiness` | Percentage 0 to 100 for the host kernel to swap out anonymous memory pages. `0` turns off swapping, `100` makes all anonymous pages swappable. Default is platform specific. |
| `memswap_limit` | Amount of memory the container may swap to disk; only meaningful if `memory` is also set. |
| `oom_kill_disable` | If set, Compose configures the platform so it won't kill the container on memory starvation. |
| `oom_score_adj` | Tunes the preference for containers to be killed on memory starvation; within -1000 to 1000. |

`memswap_limit` rules:

- Positive integer: both `memory` and `memswap_limit` must be set; `memswap_limit` is the total of memory and swap. With `memory`="300m" and `memswap_limit`="1g", the container can use 300m of memory and 700m swap.
- `0`: the setting is ignored (treated as unset).
- Same value as `memory` (positive): the container has no access to swap.
- Unset with `memory` set: the container can use as much swap as the `memory` setting if the host has swap (`memory`="300m" gives 600m total).
- `-1`: unlimited swap, up to the amount available on the host.

### Other limits

| Attribute | Description |
| --- | --- |
| `pids_limit` | Container PIDs limit; `-1` for unlimited. When set, must be consistent with `pids` in the Deploy Specification. |
| `ulimits` | Overrides default `ulimits`; an integer for a single limit or a mapping for soft/hard limits. |

```yml
ulimits:
  nproc: 65535
  nofile:
    soft: 20000
    hard: 40000
```

### `devices`

Device mappings for created containers, in the form `HOST_PATH:CONTAINER_PATH[:CGROUP_PERMISSIONS]`. Can also use the CDI syntax to let the runtime select a device.

```yml
devices:
  - "/dev/ttyUSB0:/dev/ttyUSB0"
  - "/dev/sda:/dev/xvda:rwm"
```

```yml
devices:
  - "vendor1.com/device=gpu"
```

### `device_cgroup_rules`

A list of device cgroup rules for this container, in the format of the Linux kernel Control Groups Device Whitelist Controller.

```yml
device_cgroup_rules:
  - 'c 1:3 mr'
  - 'a 7:* rmw'
```

### `gpus`

Specifies GPU devices to be allocated for container usage. Equivalent to a device request with an implicit `gpu` capability.

```yaml
services:
  model:
    gpus:
      - driver: 3dfx
        count: 2
```

`gpus` can also be the string `all` to allocate all available GPU devices.

```yaml
services:
  model:
    gpus: all
```

### Other notes

- Installing the NVIDIA Container Toolkit or ROCm is out of scope here: see dgx-spark for the NVIDIA Container Toolkit and amd-rocm for the ROCm container setup.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Compose Deploy Specification](./deploy.md)
- [services: capabilities / security_opt / namespaces / runtime](./services-security-runtime.md)
- [Extensions (byte values and durations)](./extension.md)
