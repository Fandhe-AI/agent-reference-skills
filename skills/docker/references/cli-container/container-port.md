---
source: https://docs.docker.com/reference/cli/docker/container/port/
---

# docker container port

List port mappings or a specific mapping for the container. Alias: `docker port`.

## Signature / Usage

```console
$ docker container port CONTAINER [PRIVATE_PORT[/PROTO]]

$ docker port test
7890/tcp -> 0.0.0.0:4321
9876/tcp -> 0.0.0.0:1234

$ docker port test 7890/tcp
0.0.0.0:4321
```

## Notes

- Omit `PRIVATE_PORT` to list all mapped ports, or pass one to show a specific mapping.
- If the requested port/protocol is not published, an error is printed: `Error: No public port '7890/udp' published for test`.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container ls](./container-ls.md)
- [docker container run](./container-run.md)
