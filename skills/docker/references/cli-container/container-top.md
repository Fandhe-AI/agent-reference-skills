---
source: https://docs.docker.com/reference/cli/docker/container/top/
---

# docker container top

Display the running processes of a container. Alias: `docker top`.

## Signature / Usage

```console
$ docker container top CONTAINER [ps OPTIONS]
```

## Notes

- The saved source gives only the usage line and the one-line description; it lists no options and no examples. Extra `ps OPTIONS` are passed through per the usage line.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container stats](./container-stats.md)
