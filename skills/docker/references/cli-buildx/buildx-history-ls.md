---
source: https://docs.docker.com/reference/cli/docker/buildx/history/ls/
---

# docker buildx history ls

List completed builds recorded by the active builder. Each entry includes the build ID, name, status, timestamp, and duration. By default only records for the current builder are shown.

## Signature / Usage

```console
$ docker buildx history ls [OPTIONS]
$ docker buildx history ls
BUILD ID                    NAME           STATUS     CREATED AT        DURATION
qu2gsuo8ejqrwdfii23xkkckt   .dev/2850      Completed  3 days ago        1.4s
qsiifiuf1ad9pa9qvppc0z1l3   .dev/2850      Completed  3 days ago        1.3s
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--filter` | | Provide filter values (e.g., `status=error`) |
| `--format` | `table` | Format the output |
| `--local` | | List records for current repository only |
| `--no-trunc` | | Don't truncate output |

## Notes

- Supported filters: `ref`, `repository`, `status` support `=` and `!=`; `startedAt`, `completedAt`, `duration` support `<` and `>` with time values (e.g. `--filter 'duration>30s'`). Repeat `--filter` to combine.
- `--format` accepts `json` or a Go template, e.g. `--format '{{.Name}} - {{.Duration}}'`.
- The upstream example leaves `duration>30s` unquoted; it is quoted here so the shell does not treat `>` as a redirect.

### Examples

```console
docker buildx history ls --filter status=error --filter 'duration>30s'
docker buildx history ls --local
docker buildx history ls --format json
```

## Related

- [docker buildx history inspect](./buildx-history-inspect.md)
- [docker buildx history rm](./buildx-history-rm.md)
