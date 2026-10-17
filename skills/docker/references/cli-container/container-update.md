---
source: https://docs.docker.com/reference/cli/docker/container/update/
---

# docker container update

Update configuration of one or more containers. Alias: `docker update`.

## Signature / Usage

```console
$ docker container update [OPTIONS] CONTAINER [CONTAINER...]
$ docker update --cpu-shares 512 -m 300M abebf7571666 hopeful_morse
$ docker update --restart=on-failure:3 abebf7571666 hopeful_morse
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--blkio-weight` |  | Block IO (relative weight), between 10 and 1000, or 0 to disable (default 0) |
| `--cpu-period` |  | Limit CPU CFS (Completely Fair Scheduler) period |
| `--cpu-quota` |  | Limit CPU CFS (Completely Fair Scheduler) quota |
| `--cpu-rt-period` |  | API 1.25+ Limit the CPU real-time period in microseconds |
| `--cpu-rt-runtime` |  | API 1.25+ Limit the CPU real-time runtime in microseconds |
| `-c`, `--cpu-shares` |  | CPU shares (relative weight) |
| `--cpus` |  | API 1.29+ Number of CPUs |
| `--cpuset-cpus` |  | CPUs in which to allow execution (0-3, 0,1) |
| `--cpuset-mems` |  | MEMs in which to allow execution (0-3, 0,1) |
| `-m`, `--memory` |  | Memory limit |
| `--memory-reservation` |  | Memory soft limit |
| `--memory-swap` |  | Swap limit equal to memory plus swap: -1 to enable unlimited swap |
| `--pids-limit` |  | API 1.40+ Tune container pids limit (set -1 for unlimited) |
| `--restart` |  | Restart policy to apply when a container exits |

## Notes

- Dynamically updates container configuration, e.g. to prevent containers from consuming too many host resources. Provide a space-separated list of names or IDs to update several containers.
- Not supported for Windows containers.
- A changed restart policy takes effect immediately on a running container.
- A container started with `--rm` cannot have its restart policy updated: `AutoRemove` and `RestartPolicy` are mutually exclusive.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container run](./container-run.md)
- [docker container create](./container-create.md)
