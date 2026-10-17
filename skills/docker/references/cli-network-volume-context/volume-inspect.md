---
source: https://docs.docker.com/reference/cli/docker/volume/inspect/
---

# docker volume inspect

Display detailed information on one or more volumes. Output is a JSON array by default; a Go template can be applied per result.

## Signature / Usage

```console
$ docker volume inspect [OPTIONS] VOLUME [VOLUME...]
$ docker volume inspect --format '{{ .Mountpoint }}' myvolume
/var/lib/docker/volumes/myvolume/_data
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints using the given Go template. See https://docs.docker.com/go/formatting/ |

## Notes

- Example JSON output:

```json
[
  {
    "CreatedAt": "2020-04-19T11:00:21Z",
    "Driver": "local",
    "Labels": {},
    "Mountpoint": "/var/lib/docker/volumes/8140a838303144125b4f54653b47ede0486282c623c3551fbc7f390cdc3e9cf5/_data",
    "Name": "myvolume",
    "Options": {},
    "Scope": "local"
  }
]
```

## Related

- [docker volume create](./volume-create.md)
- [docker volume ls](./volume-ls.md)
