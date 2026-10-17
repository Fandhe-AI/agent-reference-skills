---
source: https://docs.docker.com/reference/cli/docker/container/pause/
---

# docker container pause

Pause all processes within one or more containers. Alias: `docker pause`.

## Signature / Usage

```console
$ docker container pause CONTAINER [CONTAINER...]
$ docker pause my_container
```

## Notes

- Suspends all processes in the specified containers. On Linux this uses the freezer cgroup. Unlike `SIGSTOP` (observable by the process), with the freezer cgroup the process is unaware of, and unable to capture, being suspended and resumed.
- On Windows, only Hyper-V containers can be paused.
- `docker exec` on a paused container fails; unpause first.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container unpause](./container-unpause.md)
- [docker container exec](./container-exec.md)
