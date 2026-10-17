---
source: https://docs.docker.com/reference/cli/docker/container/wait/
---

# docker container wait

Block until one or more containers stop, then print their exit codes. Alias: `docker wait`.

## Signature / Usage

```console
$ docker container wait CONTAINER [CONTAINER...]

$ docker run -dit --name=my_container ubuntu bash
$ docker wait my_container
# in another terminal: docker stop my_container
0
```

## Notes

- Blocks until the container exits; after `docker stop my_container` in another terminal, the `wait` command returns the exit code (`0` in the example).
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container stop](./container-stop.md)
- [docker container run](./container-run.md)
