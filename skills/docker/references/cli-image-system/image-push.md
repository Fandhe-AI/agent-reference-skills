---
source: https://docs.docker.com/reference/cli/docker/image/push/
---

# docker image push

Upload an image to a registry (Docker Hub or a self-hosted one). Alias: `docker push`.

## Signature / Usage

```console
$ docker image push [OPTIONS] NAME[:TAG]
```

```console
$ docker image tag rhel-httpd:latest registry-host:5000/myadmin/rhel-httpd:latest
$ docker image push registry-host:5000/myadmin/rhel-httpd:latest
$ docker image push --all-tags registry-host:5000/myname/myimage
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all-tags` |  | Push all tags of an image to the repository |
| `--platform` |  | API 1.46+ Push a platform-specific manifest as a single-platform image to the registry. Image index won't be pushed, meaning that other manifests, including attestations won't be preserved. `os[/arch[/variant]]`: explicit platform (e.g. linux/amd64) |
| `-q`, `--quiet` |  | Suppress verbose output |

## Notes

- To push to a private registry, tag the image with the registry host name or IP and port first (see `docker image tag`). Only `a-z0-9-_.` are allowed when naming images.
- Progress bars show the uncompressed size; data is compressed before sending, so the uploaded size is not reflected.
- By default the daemon pushes five layers at a time; lower with the `--max-concurrent-uploads` daemon option on slow connections.
- Killing the process (e.g. `CTRL-c`) terminates the push. Registry credentials are managed by `docker login`.

## Related

- [docker image tag](./image-tag.md)
- [docker image pull](./image-pull.md)
- [docker login](./login.md)
