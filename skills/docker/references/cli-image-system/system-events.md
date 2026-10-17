---
source: https://docs.docker.com/reference/cli/docker/system/events/
---

# docker system events

Get real time events from the server. Alias: `docker events`.

## Signature / Usage

```console
$ docker system events [OPTIONS]
```

```console
$ docker events
$ docker events --since '10m'
$ docker events --since '2017-01-05T00:35:30' --until '2017-01-05T00:36:05'
$ docker events --filter 'container=test' --filter 'event=stop'
$ docker events --filter 'type=container' --format 'Type={{.Type}}  Status={{.Status}}  ID={{.ID}}'
$ docker events --format json
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--filter` |  | Filter output based on conditions provided |
| `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints using the given Go template. See https://docs.docker.com/go/formatting/ |
| `--since` |  | Show all events created since timestamp |
| `--until` |  | Stream events until this timestamp |

Supported filters: `config=<name or id>`, `container=<name or id>`, `daemon=<name or id>`, `event=<event action>`, `image=<repository or tag>`, `label=<key>` or `label=<key>=<value>`, `network=<name or id>`, `node=<id>`, `plugin=<name or id>`, `scope=<local or swarm>`, `secret=<name or id>`, `service=<name or id>`, `type=<container or image or volume or network or daemon or plugin or service or node or secret or config>`, `volume=<name>`.

## Notes

### Event types

| Object | Events |
| --- | --- |
| Containers | `attach`, `commit`, `copy`, `create`, `destroy`, `detach`, `die`, `exec_create`, `exec_detach`, `exec_die`, `exec_start`, `export`, `health_status`, `kill`, `oom`, `pause`, `rename`, `resize`, `restart`, `start`, `stop`, `top`, `unpause`, `update` |
| Images | `delete`, `import`, `load`, `pull`, `push`, `save`, `tag`, `untag` |
| Plugins | `enable`, `disable`, `install`, `remove` |
| Volumes | `create`, `destroy`, `mount`, `unmount` |
| Networks | `create`, `connect`, `destroy`, `disconnect`, `remove` |
| Daemons | `reload` |
| Services | `create`, `remove`, `update` |
| Nodes | `create`, `remove`, `update` |
| Secrets | `create`, `remove`, `update` |
| Configs | `create`, `remove`, `update` |

### Other notes

- Local scoped events are only seen on the node they take place on; Swarm scoped events are seen on all managers. Only the last 256 log events are returned; use filters to limit further.
- `--since` / `--until` accept Unix timestamps, date-formatted timestamps (RFC3339Nano, RFC3339, `2006-01-02T15:04:05`, `2006-01-02T15:04:05.999999999`, `2006-01-02T07:00`, `2006-01-02`), or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the client machine's time. Without `--since` only new and live events are returned. The client's local timezone is used when no `Z` or `+-00:00` offset is given.
- Using the same filter multiple times is a logical OR; using different filters is a logical AND.
- With `--format '{{json .}}'` (or `json`), events are streamed in JSON Lines format.
- Exit the command with `CTRL+C`.

## Related

- [docker system info](./system-info.md)
- [docker inspect](./inspect.md)
