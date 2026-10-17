---
source: https://docs.docker.com/reference/cli/docker/container/logs/
---

# docker container logs

Fetch the logs of a container. Alias: `docker logs`.

## Signature / Usage

```console
$ docker container logs [OPTIONS] CONTAINER
$ docker logs -f --until=2s test
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--details` |  | Show extra details provided to logs |
| `-f`, `--follow` |  | Follow log output |
| `--since` |  | Show logs since timestamp (e.g. `2013-01-02T13:23:37Z`) or relative (e.g. `42m` for 42 minutes) |
| `-n`, `--tail` | `all` | Number of lines to show from the end of the logs |
| `-t`, `--timestamps` |  | Show timestamps |
| `--until` |  | API 1.35+ Show logs before a timestamp (e.g. `2013-01-02T13:23:37Z`) or relative (e.g. `42m` for 42 minutes) |

## Notes

- `docker logs` batch-retrieves logs present at the time of execution. For logging drivers see "Configure logging drivers" (Engine logging docs).
- `--follow` continues streaming new output from the container's `STDOUT` and `STDERR`.
- A negative or non-integer `--tail` is invalid and is set to `all`.
- `--timestamps` adds an RFC3339Nano timestamp (e.g. `2014-09-16T06:17:46.000000000Z`) to each entry, with the nanosecond part zero-padded.
- `--details` adds extra attributes, such as environment variables and labels, provided to `--log-opt` at container creation.
- `--since` accepts an RFC 3339 date, a UNIX timestamp, or a Go duration string (e.g. `1m30s`, `3h`). Also accepted: RFC3339Nano, `2006-01-02T15:04:05`, `2006-01-02T15:04:05.999999999`, `2006-01-02T07:00`, `2006-01-02`. Without a `Z` or `+-00:00` offset the client's local timezone is used. Unix timestamps are `seconds[.nanoseconds]`. Can be combined with `--follow` and/or `--tail`.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container attach](./container-attach.md)
- [docker container run](./container-run.md)
