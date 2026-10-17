---
source: https://docs.docker.com/reference/cli/docker/buildx/history/inspect/
---

# docker buildx history inspect

Inspect a build record to view metadata such as duration, status, build inputs, platforms, outputs, and attached artifacts. Flags can extract provenance, SBOMs, or other detailed information.

## Signature / Usage

```console
$ docker buildx history inspect [OPTIONS] [REF]
$ docker buildx history inspect
Name:           buildx (binaries)
Context:        .
Dockerfile:     Dockerfile
Target:         binaries
Platforms:      linux/amd64
Started:        2025-02-07 11:56:24
Duration:       1m  1s
Build Steps:    16/16 (25% cached)
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--format` | `pretty` | Format the output |

## Notes

- `REF` is a build ID or a relative offset such as `^1`; default is the most recent build.
- `--format` accepts `pretty` (default), `json`, or a Go template: `--format "{{.Name}}: {{.VCSRepository}} ({{.VCSRevision}})"`.
- JSON fields in the example include `Name`, `Ref`, `Context`, `Dockerfile`, `VCSRepository`, `VCSRevision`, `Target`, `Platform`, `KeepGitDir`, `StartedAt`, `CompletedAt`, `Duration`, `Status`, `NumCompletedSteps`, `NumTotalSteps`, `NumCachedSteps`, `Config`, `Materials`, `Attachments`.
- Subcommand `docker buildx history inspect attachment` (inspect a build record attachment) is not covered by a separate page in this skill.

### Examples

```console
docker buildx history inspect qu2gsuo8ejqrwdfii23xkkckt
docker buildx history inspect ^1
docker buildx history inspect --format json
```

## Related

- [docker buildx history ls](./buildx-history-ls.md)
- [docker buildx history logs](./buildx-history-logs.md)
