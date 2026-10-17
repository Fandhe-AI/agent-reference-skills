---
source: https://docs.docker.com/reference/cli/docker/network/inspect/
---

# docker network inspect

Display detailed information on one or more networks. By default results are rendered as a JSON object.

## Signature / Usage

```console
$ docker network inspect [OPTIONS] NETWORK [NETWORK...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints using the given Go template. See https://docs.docker.com/go/formatting/ |
| `-v`, `--verbose` |  | Verbose output for diagnostics |

## Related

- [docker network ls](./network-ls.md)
- [docker network connect](./network-connect.md)
