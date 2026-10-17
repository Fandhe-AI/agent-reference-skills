---
source: https://docs.docker.com/reference/cli/docker/inspect/
---

# docker inspect

Return low-level information on Docker objects. Output is a JSON array by default.

## Signature / Usage

```console
$ docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints using the given Go template. See https://docs.docker.com/go/formatting/ |
| `-s`, `--size` |  | Display total file sizes if the type is container |
| `--type` |  | Only inspect objects of the given type |

`--type config|container|image|node|network|secret|service|volume|task|plugin`

## Notes

### Examples

```console
$ docker inspect --type=volume myvolume
$ docker inspect --size mycontainer
$ docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "${INSTANCE_ID}"
$ docker inspect --format='{{range .NetworkSettings.Networks}}{{.MacAddress}}{{end}}' "${INSTANCE_ID}"
$ docker inspect --format='{{.LogPath}}' "${INSTANCE_ID}"
$ docker inspect --format='{{.Config.Image}}' "${INSTANCE_ID}"
$ docker inspect --format='{{range $p, $conf := .NetworkSettings.Ports}} {{$p}} -> {{with $conf}}{{(index . 0).HostPort}}{{else}}none{{end}} {{end}}' "${INSTANCE_ID}"
$ docker inspect --format='{{(index (index .NetworkSettings.Ports "8787/tcp") 0).HostPort}}' "${INSTANCE_ID}"
$ docker inspect --format='{{json .Config}}' "${INSTANCE_ID}"
```

Upstream examples leave the expansion unquoted; quoted here to avoid word splitting.

### Other notes

- `docker inspect` matches any object type by ID or name. When a container and a volume share a name the result is ambiguous; restrict with `--type`.
- `--size` / `-s` adds two fields and works only for containers (running or stopped): `SizeRootFs` (total size of all files in the container, bytes) and `SizeRw` (size of files created or changed compared to the image, bytes).
- The `.Field` syntax does not work when the field name begins with a number; use the template `index` function. Docker adds a template function `json` to print a structure as JSON instead of a Go-style dump.
- Template syntax follows Go's `text/template`.

## Related

- [docker image inspect](./image-inspect.md)
- [docker version](./version.md)
