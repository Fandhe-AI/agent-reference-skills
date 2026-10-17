---
source: https://docs.docker.com/engine/logging/drivers/awslogs/
---

# Amazon CloudWatch Logs logging driver

Sends container logs to Amazon CloudWatch Logs.

## Signature / Usage

```json
{
  "log-driver": "awslogs",
  "log-opts": {
    "awslogs-region": "us-east-1"
  }
}
```

```console
$ docker run \
    --log-driver=awslogs \
    --log-opt awslogs-region=us-east-1 \
    --log-opt awslogs-group=myLogGroup \
    --log-opt awslogs-create-group=true \
    ...
```

With Docker Compose:

```yaml
myservice:
  logging:
    driver: awslogs
    options:
      awslogs-region: us-east-1
```

## Options / Props

| Option | Description |
| --- | --- |
| `awslogs-region` | Region for the logs; or use the `AWS_REGION` environment variable. On EC2 with no region set, the instance's region is used. Also controls the signing region. |
| `awslogs-endpoint` | Override the default CloudWatch Logs endpoint. Signature errors may occur if its region differs from the signing region. |
| `awslogs-group` | Required log group. |
| `awslogs-stream` | Log stream; defaults to the container ID. Use one container per stream at a time. |
| `awslogs-create-group` | Create the log group automatically. Defaults to `false` (error if the group doesn't exist). Needs `logs:CreateLogGroup` permission. |
| `awslogs-create-stream` | Set `false` to disable stream creation (stream must exist, otherwise `Failed to put log events`). |
| `awslogs-datetime-format` | Multi-line start pattern in Python `strftime` format; takes precedence over `awslogs-multiline-pattern`. |
| `awslogs-multiline-pattern` | Multi-line start pattern as a regular expression; ignored if `awslogs-datetime-format` is set. |
| `tag` | Alternative to `awslogs-stream`; Go template markup (`{{.ID}}`, `{{.FullID}}`, `{{.Name}}`). `awslogs-stream` overrides `tag` when both are set. |
| `awslogs-force-flush-interval-seconds` | Log flush interval in seconds. Default 5. |
| `awslogs-max-buffered-events` | Log buffer size. Default 4K. |

Supported `strftime` codes for `awslogs-datetime-format`: `%a` `%A` `%w` `%d` `%b` `%B` `%m` `%Y` `%y` `%H` `%I` `%p` `%M` `%S` `%f` `%z` `%Z` `%j`, plus non-strftime `%L` (milliseconds preceded with a period, e.g. `.123`).

Datetime example:

```console
$ docker run \
    --log-driver=awslogs \
    --log-opt awslogs-region=us-east-1 \
    --log-opt awslogs-group=myLogGroup \
    --log-opt awslogs-datetime-format='\[%b %d, %Y %H:%M:%S\]' \
    ...
```

## Notes

- Multi-line logging performs regular expression parsing of all messages and may hurt performance.
- The CloudWatch log API doesn't support `:` in the log name, which affects `{{ .ImageName }}` as a tag; use `--log-opt tag='{{ with split .ImageName ":" }}{{join . "_"}}{{end}}-{{.ID}}'` (yields e.g. `alpine_latest-bf0072049c76`).
- Credentials must reach the Docker daemon via `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_SESSION_TOKEN`, the root user's `~/.aws/credentials`, or an EC2 instance profile. Docker reads credentials when the container starts; restart the container after refreshing temporary credentials.
- Required IAM actions: `logs:CreateLogStream` and `logs:PutLogEvents`.

## Related

- [Configure logging drivers](./logging-configure.md)
- [Customize log driver output](./log-tags.md)
