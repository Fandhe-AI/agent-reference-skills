---
source: https://docs.docker.com/reference/cli/docker/image/history/
---

# docker image history

Show the history of an image. Alias: `docker history`.

## Signature / Usage

```console
$ docker image history [OPTIONS] IMAGE
```

```console
$ docker history docker
$ docker history --format "{{.ID}}: {{.CreatedSince}}" busybox
$ docker image history --platform=linux/riscv64 alpine
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--format` |  | Format output using a custom template: `table` (default, with headers), `table TEMPLATE`, `json`, or `TEMPLATE` (Go template). See https://docs.docker.com/go/formatting/ |
| `-H`, `--human` | `true` | Print sizes and dates in human readable format |
| `--no-trunc` |  | Don't truncate output |
| `--platform` |  | API 1.48+ Show history for the given platform. Formatted as `os[/arch[/variant]]` (e.g., `linux/amd64`) |
| `-q`, `--quiet` |  | Only show image IDs |

`--format` placeholders:

| Placeholder | Description |
| --- | --- |
| `.ID` | Image ID |
| `.CreatedSince` | Elapsed time since the image was created if `--human=true`, otherwise timestamp of when image was created |
| `.CreatedAt` | Timestamp of when image was created |
| `.CreatedBy` | Command that was used to create the image |
| `.Size` | Image disk size |
| `.Comment` | Comment for image |

## Notes

- With `--format`, output is exactly as the template declares; the `table` directive includes column headers.
- Without `--platform`, history is shown for the daemon's native platform, or the first available platform. If the requested platform is not in the local image store, the command errors (`image with reference alpine:latest was found but does not match the specified platform: wanted linux/s390x`).
- Platform format `os[/arch[/variant]]`, e.g. `linux/amd64` or `linux/arm64/v8`; omitted architecture and variant fall back to the daemon defaults.

## Related

- [docker image ls](./image-ls.md)
- [docker image import](./image-import.md)
