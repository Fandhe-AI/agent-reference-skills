---
source: https://docs.docker.com/reference/cli/docker/container/diff/
---

# docker container diff

Inspect changes to files or directories on a container's filesystem. Alias: `docker diff`.

## Signature / Usage

```console
$ docker container diff CONTAINER
$ docker diff 1fdfd1f54c1b

C /dev
C /dev/console
A /run/nginx.pid
A /var/log/nginx/access.log
```

## Notes

- Lists changed files and directories since the container was created. Three change types are tracked:

| Symbol | Description |
| --- | --- |
| `A` | A file or directory was added |
| `D` | A file or directory was deleted |
| `C` | A file or directory was changed |

- Accepts the full or shortened container ID, or the name set with `docker run --name`.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container commit](./container-commit.md)
- [docker container export](./container-export.md)
