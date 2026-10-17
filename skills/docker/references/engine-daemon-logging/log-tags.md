---
source: https://docs.docker.com/engine/logging/log_tags/
---

# Customize log driver output

The `tag` log option formats the tag that identifies a container's log messages (default: first 12 characters of the container ID).

## Signature / Usage

```console
$ docker run --log-driver=fluentd --log-opt fluentd-address=myhost.local:24224 --log-opt tag="mailer" alpine echo hello
```

`--log-opt tag="{{.ImageName}}/{{.Name}}/{{.ID}}"` yields `syslog` lines like:

```text
Aug  7 18:33:19 HOSTNAME hello-world/foobar/5790672ab6a0[9103]: Hello from Docker.
```

## Options / Props

| Markup | Description |
| --- | --- |
| `{{.ID}}` | The first 12 characters of the container ID. |
| `{{.FullID}}` | The full container ID. |
| `{{.Name}}` | The container name. |
| `{{.ImageID}}` | The first 12 characters of the container's image ID. |
| `{{.ImageFullID}}` | The container's full image ID. |
| `{{.ImageName}}` | The name of the image used by the container. |
| `{{.DaemonName}}` | The name of the Docker program (`docker`). |

## Notes

- Adapted: an image and command were added to the official `docker run` example.
- The `container_name` field and `{{.Name}}` are set at startup; `docker rename` is not reflected in log messages.

## Related

- [Configure logging drivers](./logging-configure.md)
- [Syslog logging driver](./log-driver-syslog.md)
- [Fluentd logging driver](./log-driver-fluentd.md)
