---
source: https://docs.docker.com/engine/containers/resource_constraints/
---

# Resource constraints

By default, a container has no resource constraints and can use as much of a given resource as the host's kernel scheduler allows. Docker provides `docker run` flags to control memory and CPU use.

## Signature / Usage

```console
$ docker run -it -m 300M --memory-swap 1G ubuntu /bin/bash
$ docker run -it --cpus=".5" ubuntu /bin/bash
$ docker run -it --cpu-period=100000 --cpu-quota=50000 ubuntu /bin/bash
```

Real-time scheduler on an individual container:

```console
$ docker run -it \
    --cpu-rt-runtime=950000 \
    --ulimit rtprio=99 \
    --cap-add=sys_nice \
    debian:jessie
```

## Options / Props

Memory (values take a positive integer with suffix `b`, `k`, `m`, `g`):

| Option | Description |
| --- | --- |
| `-m` or `--memory=` | The maximum amount of memory the container can use. Minimum allowed value is `6m`. |
| `--memory-swap` | The amount of memory this container is allowed to swap to disk. |
| `--memory-swappiness` | Value between 0 and 100 to tune the percentage of anonymous pages the kernel can swap out. |
| `--memory-reservation` | Soft limit smaller than `--memory`, activated when Docker detects contention or low memory. Must be lower than `--memory` to take precedence; doesn't guarantee the limit isn't exceeded. |
| `--oom-kill-disable` | Disable the kernel OOM killer for the container. Only use together with `-m/--memory`. |

CPU, default CFS scheduler:

| Option | Description |
| --- | --- |
| `--cpus=<value>` | How much of the available CPU resources a container can use. `--cpus="1.5"` on a 2-CPU host is equivalent to `--cpu-period="100000"` and `--cpu-quota="150000"`. |
| `--cpu-period=<value>` | CPU CFS scheduler period, used with `--cpu-quota`. Defaults to 100000 microseconds. |
| `--cpu-quota=<value>` | CFS quota: microseconds per `--cpu-period` before throttling. |
| `--cpuset-cpus` | Specific CPUs or cores, comma-separated list or hyphen range (`0-3`, `1,3`). First CPU is 0. |
| `--cpu-shares` | Weight relative to the default of 1024. Only enforced when CPU cycles are constrained (soft limit). |

CPU, real-time scheduler (per container):

| Option | Description |
| --- | --- |
| `--cap-add=sys_nice` | Grants `CAP_SYS_NICE`: raise process `nice` values, set real-time scheduling policies, set CPU affinity. |
| `--cpu-rt-runtime=<value>` | Maximum microseconds the container can run at real-time priority within the daemon's real-time period. Requires `--cap-add=sys_nice`. |
| `--ulimit rtprio=<value>` | Maximum real-time priority allowed. Requires `--cap-add=sys_nice`. |

## Notes

- Check kernel support with `docker info`; a missing capability shows e.g. `WARNING: No swap limit support`.
- On Linux, an OOME can kill any process, including Docker. Docker adjusts the OOM priority on the daemon but not on containers. Don't set `--oom-score-adj` to an extreme negative number or use `--oom-kill-disable` to circumvent this.
- `--memory-swap` is a modifier that only has meaning if `--memory` is set:
  - Positive integer: both must be set; it is total memory + swap (`--memory=300m --memory-swap=1g` gives 300m memory and 700m swap).
  - `0`: ignored, treated as unset.
  - Same as `--memory` (positive): no swap access.
  - Unset with `--memory` set: swap up to the `--memory` value if the host has swap (`300m` gives 600m total).
  - `-1`: unlimited swap, up to host availability.
  - Tools like `free` inside the container report the host's swap.
- `--memory-swappiness`: 0 turns off anonymous page swapping, 100 makes all anonymous pages swappable; unset inherits the host value.
- `--cpu-shares` doesn't prevent containers from being scheduled in Swarm mode and doesn't reserve any CPU.
- Real-time scheduler: requires `CONFIG_RT_GROUP_SCHED` in the host kernel (check `zcat /proc/config.gz | grep CONFIG_RT_GROUP_SCHED` or the file `/sys/fs/cgroup/cpu.rt_runtime_us`) and the daemon run with `--cpu-rt-runtime` (e.g. `--cpu-rt-runtime=950000` with the default 1000000 microsecond period). Incorrect values can make the host unstable. If the kernel or daemon isn't configured correctly, an error occurs.
- For NVIDIA GPU access see the GPU access page.

## Related

- [Running containers](./running-containers.md)
- [GPU access](./gpu.md)
- [Runtime metrics](./runmetrics.md)
- [docker container update](../cli-container/container-update.md)
