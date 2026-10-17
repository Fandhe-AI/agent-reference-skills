---
source: https://docs.docker.com/reference/cli/docker/image/pull/
---

# docker image pull

Download an image from a registry. Alias: `docker pull`.

## Signature / Usage

```console
$ docker image pull [OPTIONS] NAME[:TAG|@DIGEST]
```

```console
$ docker image pull debian
$ docker pull ubuntu@sha256:2e863c44b718727c860746568e1d54afd13b2fa71b160f5cd9058fc436217b30
$ docker image pull myregistry.local:5000/testing/test-image
$ docker image pull --all-tags ubuntu
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all-tags` |  | Download all tagged images in the repository |
| `--platform` |  | API 1.32+ Set platform if server is multi-platform capable |
| `-q`, `--quiet` |  | Suppress verbose output |

## Notes

- If no tag is given, Docker Engine uses `:latest`. Images are pulled from Docker Hub unless a registry path (without `https://`) is specified.
- Pull by digest to pin an image to an exact version. A digest takes the place of the tag and can also be used in a Dockerfile `FROM` (`FROM ubuntu@sha256:...`). Pinned images do not receive updated versions (including security updates) until the digest is changed. Digests are printed after pull and push.
- Images are content-addressable: the image ID is a SHA256 digest covering configuration and layers; different tags of the same image share the ID and layers.
- By default the daemon downloads three layers at a time; lower with the `--max-concurrent-downloads` daemon option on slow connections.
- Behind an HTTP proxy, configure the Docker daemon to use it (see the dockerd reference).
- Docker uses `https://` to talk to registries unless the registry is allowed as an insecure registry (dockerd `insecure-registries`). Credentials are managed by `docker login`.
- Killing the `docker pull` process (e.g. `CTRL-c`) terminates the pull; the Engine also terminates it when the connection between daemon and client is cut or lost.

## Related

- [docker image push](./image-push.md)
- [docker login](./login.md)
- [docker image ls](./image-ls.md)
