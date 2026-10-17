---
source: https://docs.docker.com/reference/cli/docker/system/info/
---

# docker system info

Display system-wide information about the Docker installation. Alias: `docker info`.

## Signature / Usage

```console
$ docker system info [OPTIONS]
```

```console
$ docker info
$ docker info --format '{{json .}}'
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints using the given Go template. See https://docs.docker.com/go/formatting/ |

## Notes

- Information includes the kernel version and number of containers and images. The image count is the number of unique images; the same image tagged under different names is counted once.
- Depending on the storage driver, additional information can be shown (pool name, data file, metadata file, data space used and total, metadata space used and total). On first run Docker allocates data and metadata space from the volume where `/var/lib/docker` is mounted.
- Output has a `Client` section (version, context, plugins such as buildx and compose) and a `Server` section (containers, images, storage driver, logging driver, cgroup driver and version, plugins, runtimes, security options, kernel, OS, `Docker Root Dir`, `Live Restore Enabled`, etc.). Windows daemons also show `Default Isolation`, and registry mirrors when configured.
- Template syntax follows Go's `text/template`.

Excerpt from the source (Ubuntu, `overlay2`-style driver output):

```console
Server:
 Containers: 14
  Running: 3
  Paused: 1
  Stopped: 10
 Images: 52
 Server Version: 25.0.0
 Storage Driver: overlayfs
  driver-type: io.containerd.snapshotter.v1
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: 2
 Docker Root Dir: /var/lib/docker
```

## Related

- [docker version](./version.md)
- [docker system df](./system-df.md)
