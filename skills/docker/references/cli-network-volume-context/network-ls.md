---
source: https://docs.docker.com/reference/cli/docker/network/ls/
---

# docker network ls

List all networks the Engine daemon knows about, including networks that span multiple hosts in a cluster. Alias: `docker network list`.

## Signature / Usage

```console
$ docker network ls [OPTIONS]
$ docker network ls --filter driver=bridge
NETWORK ID          NAME                DRIVER            SCOPE
db9db329f835        test1               bridge            local
f6e212da9dfd        test2               bridge            local
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--filter` |  | Provide filter values (e.g. `driver=bridge`) |
| `--format` |  | Format output: `table` (default), `table TEMPLATE`, `json`, or a Go `TEMPLATE`. See https://docs.docker.com/go/formatting/ |
| `--no-trunc` |  | Do not truncate the output |
| `-q`, `--quiet` |  | Only display network IDs |

## Notes

- Filters are `key=value` pairs; pass multiple flags for multiple filters. Multiple values for the same key are combined as `OR` (`-f type=custom -f type=builtin` returns both); filters with different keys must all match (`AND`, e.g. `-f driver=bridge -f name=app` returns only bridge networks whose name matches `app`).
- Supported filters: `driver`, `id` (all or part of the ID), `label` (`label=<key>` or `label=<key>=<value>`), `name` (all or part of the name), `scope` (`swarm|global|local`), `type` (`custom|builtin`).
- `type=builtin` shows predefined networks (`bridge`, `none`, `host`); `type=custom` shows user defined networks. Batch cleanup: `` docker network rm `docker network ls --filter type=custom -q` ``. A warning is issued when removing a network that has containers attached.
- `--format` Go template placeholders: `.ID`, `.Name`, `.Driver`, `.Scope` (local, global), `.IPv6`, `.Internal`, `.Labels`, `.Label` (for example `{{.Label "project.version"}}`), `.CreatedAt`.
- With `--format`, output is exactly as the template declares; the `table` directive adds column headers.

```console
$ docker network ls --format "{{.ID}}: {{.Driver}}"
afaaab448eb2: bridge
d1584f8dc718: host
391df270dc66: null
```

## Related

- [docker network inspect](./network-inspect.md)
- [docker network rm](./network-rm.md)
- [docker network prune](./network-prune.md)
