---
source: https://docs.docker.com/reference/cli/docker/container/unpause/
---

# docker container unpause

Unpause all processes within one or more containers. Alias: `docker unpause`.

## Signature / Usage

```console
$ docker container unpause CONTAINER [CONTAINER...]
$ docker unpause my_container
my_container
```

## Notes

- Un-suspends all processes in the specified containers. On Linux it does this using the freezer cgroup.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container pause](./container-pause.md)
