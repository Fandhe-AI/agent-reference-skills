---
source: https://docs.docker.com/engine/containers/runmetrics/
---

# Runtime metrics

Stream a container's metrics with `docker stats`, or read them from Linux control groups (cgroups), iptables counters and network namespaces.

## Signature / Usage

```console
$ docker stats redis1 redis2

CONTAINER           CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O
redis1              0.07%               796 KB / 64 MB        1.21%               788 B / 648 B       3.568 MB / 512 KB
redis2              0.07%               2.746 MB / 64 MB      4.29%               1.266 KB / 648 B    12.4 MB / 0 B
```

Find where cgroups are mounted:

```console
$ grep cgroup /proc/mounts
```

## Options / Props

Container cgroup paths for memory metrics (`<longid>` = full container ID from `docker inspect` or `docker ps --no-trunc`):

| cgroup version / driver | Path |
| --- | --- |
| v1, `cgroupfs` | `/sys/fs/cgroup/memory/docker/<longid>/` |
| v1, `systemd` | `/sys/fs/cgroup/memory/system.slice/docker-<longid>.scope/` |
| v2, `cgroupfs` | `/sys/fs/cgroup/docker/<longid>/` |
| v2, `systemd` | `/sys/fs/cgroup/system.slice/docker-<longid>.scope/` |

cgroup v1 metric files:

| File / metric | Description |
| --- | --- |
| `memory.stat` `cache` | Memory used by the cgroup's processes that can be associated with a block on a block device (includes `tmpfs`). |
| `memory.stat` `rss` | Memory that doesn't correspond to anything on disk: stacks, heaps, anonymous memory maps. |
| `memory.stat` `mapped_file` | Memory mapped by the processes in the cgroup. |
| `memory.stat` `pgfault`, `pgmajfault` | Counts of page faults and major faults. |
| `memory.stat` `swap` | Swap currently used. |
| `memory.stat` `active_anon`, `inactive_anon` | Anonymous memory identified as active / inactive. `rss` = `active_anon` + `inactive_anon` - `tmpfs`. |
| `memory.stat` `active_file`, `inactive_file` | Cache memory; `cache` = `active_file` + `inactive_file` + `tmpfs`. |
| `memory.stat` `unevictable` | Memory that cannot be reclaimed (e.g. `mlock`ed). |
| `cpuacct.stat` | CPU usage split into `user` and `system` time, in ticks of 1/100 second (`USER_HZ`). |
| `blkio.sectors` | 512-byte sectors read and written, device by device. |
| `blkio.io_service_bytes` | Bytes read and written (4 counters per device). |
| `blkio.io_serviced` | Number of I/O operations performed (4 counters per device). |
| `blkio.io_queued` | I/O operations currently queued for the cgroup. |

Network metrics can be gathered from iptables counters or from within the container's network namespace:

```console
$ iptables -I OUTPUT -p tcp --sport 80
$ iptables -nxvL OUTPUT

$ TASKS=/sys/fs/cgroup/devices/docker/$CID*/tasks
$ PID=$(head -n 1 $TASKS)
$ mkdir -p /var/run/netns
$ ln -sf /proc/$PID/ns/net /var/run/netns/$CID
$ ip netns exec $CID netstat -i
```

## Notes

- If `/sys/fs/cgroup/cgroup.controllers` exists you are on cgroup v2, otherwise v1. cgroup v2 is the default on Fedora (since 31), Debian GNU/Linux (since 11) and Ubuntu (since 21.10). On v2 `/proc/cgroups` isn't meaningful.
- The detailed metrics examples describe the cgroup v1 layout. On cgroup v2 hosts, find the container's cgroup directory and inspect `memory.*`, `cpu.*`, `io.*` controller files.
- Changing the cgroup version requires a reboot. On systemd hosts add `systemd.unified_cgroup_hierarchy=1` (v2) or `=0` (v1) to the kernel command line, e.g. `sudo grubby --update-kernel=ALL --args="systemd.unified_cgroup_hierarchy=1"`.
- Docker supports cgroup v2 since Docker 20.10; it requires containerd v1.4+, runc v1.0.0-rc91+, kernel v4.15+ (v5.2+ recommended). Differences on v2: default cgroup driver (`dockerd --exec-opt native.cgroupdriver`) is `systemd` (v1: `cgroupfs`); default `docker run --cgroupns` is `private` (v1: `host`); `--oom-kill-disable` is discarded.
- The memory cgroup adds overhead, so some distributions don't enable it by default; enable with kernel parameters `cgroup_enable=memory swapaccount=1`.
- Network metrics aren't exposed by cgroups because network interfaces live in network namespaces.
- For high-resolution collection use the `setns()` system call, but don't keep the namespace file descriptor open (the namespace and its virtual interface would never be destroyed).
- To collect metrics when a container exits, start a collection process per container, move it into the cgroups via the `tasks` file, wait until it is the last process, collect, move back to the root cgroup, and `rmdir` the container cgroup.

## Related

- [Resource constraints](./resource-constraints.md)
- [docker container stats](../cli-container/container-stats.md)
