---
source: https://docs.docker.com/reference/cli/docker/compose/events/
---

# docker compose events

Receive real time events from containers. Streams container events for every container in the project.

## Signature / Usage

```console
$ docker compose events [OPTIONS] [SERVICE...]
```

With `--json`, one object per line is printed in this format:

```json
{
    "time": "2015-11-20T18:01:03.615550",
    "type": "container",
    "action": "create",
    "id": "213cf7...5fc39a",
    "service": "web",
    "attributes": {
      "name": "application_web_1",
      "image": "alpine:edge"
    }
}
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--json` |  | Output events as a stream of json objects |
| `--since` |  | Show all events created since timestamp |
| `--until` |  | Stream events until this timestamp |

## Notes

- The event types that can be received are listed on the `docker system events` page (object types).
- Docker Compose (container orchestration) is unrelated to Jetpack Compose; see android-compose-ui, android-compose-components, and android-compose-graphics-animation for Jetpack Compose.

## Related

- [docker compose logs](./compose-logs.md)
- [docker compose ps](./compose-ps.md)
