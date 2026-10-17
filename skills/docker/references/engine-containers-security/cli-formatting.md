---
source: https://docs.docker.com/engine/cli/formatting/
---

# Format command and log output

Docker supports Go templates to manipulate the output format of certain commands and log drivers, via the `--format` flag.

## Signature / Usage

```console
$ docker inspect --format '{{join .Args " , "}}' container
$ docker image list --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Size}}"
$ docker inspect --format '{{json .Mounts}}' container
```

Show all available data as JSON:

```console
$ docker container ls --format='{{json .}}'
```

## Options / Props

Template functions:

| Function | Description | Example |
| --- | --- | --- |
| `join` | Concatenate a list of strings with a separator. | `{{join .Args " , "}}` |
| `table` | Specify which fields to show in output. | `table {{.ID}}\t{{.Repository}}` |
| `json` | Encode an element as a JSON string. | `{{json .Mounts}}` |
| `lower` | Lowercase a string. | `{{lower .Name}}` |
| `split` | Slice a string into a list by a separator. | `{{split .Image ":"}}` |
| `title` | Capitalize the first character. | `{{title .Name}}` |
| `upper` | Uppercase a string. | `{{upper .Name}}` |
| `pad` | Add whitespace padding before and after. | `{{pad .Repository 5 10}}` |
| `truncate` | Shorten a string to a length (unchanged if shorter). | `{{truncate .Repository 15}}` |
| `println` | Print each value on a new line. | `{{range .NetworkSettings.Networks}}{{println .IPAddress}}{{end}}` |

## Notes

- Many CLI commands have a `--format` flag, and many CLI references include format examples.
- Mind your shell: in a POSIX shell use single quotes; in a Windows shell (e.g. PowerShell) use single quotes and escape the inner double quotes (`'{{join .Args \" , \"}}'`).

## Related

- [Filter commands](./cli-filter.md)
- [docker inspect](../cli-image-system/inspect.md)
