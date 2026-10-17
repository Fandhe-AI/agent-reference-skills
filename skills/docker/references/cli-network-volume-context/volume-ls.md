---
source: https://docs.docker.com/reference/cli/docker/volume/ls/
---

# docker volume ls

List all volumes known to Docker. Alias: `docker volume list`.

## Signature / Usage

```console
$ docker volume ls [OPTIONS]
$ docker volume ls -f dangling=true
DRIVER              VOLUME NAME
local               rosemary
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--cluster` |  | API 1.42+ **Swarm** Display only cluster volumes, and use cluster volume list formatting |
| `-f`, `--filter` |  | Provide filter values (e.g. `dangling=true`) |
| `--format` |  | Format output: `table` (default), `table TEMPLATE`, `json`, or a Go `TEMPLATE`. See https://docs.docker.com/go/formatting/ |
| `-q`, `--quiet` |  | Only display volume names |

## Notes

- Filter format is `key=value`; pass multiple flags for multiple filters.
- Supported filters: `dangling` (boolean: true or false, 0 or 1; matches volumes not referenced by any containers), `driver` (a volume driver's name), `label` (`label=<key>` or `label=<key>=<value>`), `name` (all or part of a volume's name).
- Multiple `label` filters produce an "and" search; all conditions must be met.
- `--format` Go template placeholders: `.Name`, `.Driver`, `.Scope` (local, global), `.Mountpoint`, `.Labels`, `.Label` (for example `{{.Label "project.version"}}`). The `table` directive adds column headers.

```console
$ docker volume ls --format "{{.Name}}: {{.Driver}}"
vol1: local
vol2: local
vol3: local
```

## Related

- [docker volume create](./volume-create.md)
- [docker volume prune](./volume-prune.md)
