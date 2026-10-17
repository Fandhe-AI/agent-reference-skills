---
source: https://docs.docker.com/reference/cli/docker/container/commit/
---

# docker container commit

Create a new image from a container's changes. Alias: `docker commit`.

## Signature / Usage

```console
$ docker container commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
$ docker commit --change "ENV DEBUG=true" c3f279d17e0a svendowideit/testimage:version3
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--author` |  | Author (e.g., `John Hannibal Smith <hannibal@a-team.com>`) |
| `-c`, `--change` |  | Apply Dockerfile instruction to the created image |
| `-m`, `--message` |  | Commit message |
| `--no-pause` |  | Disable pausing container during commit |

## Notes

- Useful to debug a container by running an interactive shell, or to export a working dataset to another server.
- Commits do not include any data contained in mounted volumes.
- By default the container and its processes are paused while the image is committed, to reduce the likelihood of data corruption. Use `--no-pause` to disable.
- `--change` supports these Dockerfile instructions: `CMD` | `ENTRYPOINT` | `ENV` | `EXPOSE` | `LABEL` | `ONBUILD` | `USER` | `VOLUME` | `WORKDIR`.
- Multiple instructions: `docker commit --change='CMD ["apachectl", "-DFOREGROUND"]' -c "EXPOSE 80" c3f279d17e0a svendowideit/testimage:version4`.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container export](./container-export.md)
- [docker container diff](./container-diff.md)
