---
source: https://docs.docker.com/engine/logging/drivers/journald/
---

# Journald logging driver

Sends container logs to the `systemd` journal; read them with `journalctl`, the journal API, or `docker logs`.

## Signature / Usage

```json
{
  "log-driver": "journald"
}
```

```console
$ docker run \
    --log-driver=journald \
    --log-opt labels=location \
    --log-opt env=TEST \
    --env "TEST=false" \
    --label location=west \
    your/application
```

Retrieve:

```console
$ sudo journalctl -b CONTAINER_NAME=webserver
$ sudo journalctl -o json CONTAINER_NAME=webserver
```

```python
import systemd.journal

reader = systemd.journal.Reader()
reader.add_match('CONTAINER_NAME=web')

for msg in reader:
    print('{CONTAINER_ID_FULL}: {MESSAGE}'.format(**msg))
```

## Options / Props

| Option | Required | Description |
| --- | --- | --- |
| `tag` | optional | Template to set `CONTAINER_TAG` and `SYSLOG_IDENTIFIER` values. |
| `labels` | optional | Comma-separated list of label keys to include in the message if specified for the container. |
| `labels-regex` | optional | Regular expression to match logging-related labels. |
| `env` | optional | Comma-separated list of environment variable keys to include in the message. |
| `env-regex` | optional | Regular expression to match logging-related environment variables. |

Metadata stored with each message:

| Field | Description |
| --- | --- |
| `CONTAINER_ID` | The container ID truncated to 12 characters. |
| `CONTAINER_ID_FULL` | The full 64-character container ID. |
| `CONTAINER_NAME` | The container name at the time it was started. |
| `CONTAINER_TAG`, `SYSLOG_IDENTIFIER` | The container tag. |
| `CONTAINER_PARTIAL_MESSAGE` | A field that flags log integrity. Improve logging of long log lines. |
| `IMAGE_NAME` | The name of the container image. |

## Notes

- If `label` and `env` keys collide, the `env` value takes precedence.
- `docker rename` is not reflected in `CONTAINER_NAME`; journal entries keep the original name.
- With a TTY enabled you may see `[10B blob data]` because `\r` is appended; use `journalctl ... --all`.
- Restart Docker for `daemon.json` changes. Docker Desktop: Settings > Docker Engine.

## Related

- [Configure logging drivers](./logging-configure.md)
- [Customize log driver output](./log-tags.md)
