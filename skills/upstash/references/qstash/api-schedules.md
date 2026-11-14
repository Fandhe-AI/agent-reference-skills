# REST API: Schedules

Create, get, list, pause, resume and delete cron schedules through the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/v2/schedules/{destination}` | Create a schedule (200, `{ scheduleId }`) |
| `GET` | `/v2/schedules` | List schedules |
| `GET` | `/v2/schedules/{scheduleId}` | Get a schedule (404 if unknown) |
| `POST` | `/v2/schedules/{scheduleId}/pause` | Pause |
| `POST` | `/v2/schedules/{scheduleId}/resume` | Resume |
| `DELETE` | `/v2/schedules/{scheduleId}` | Delete |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path, headers and body definitions.

```bash
curl -X POST "https://qstash.upstash.io/v2/schedules/https://example.com/api/cron" \
  -H "Authorization: Bearer <QSTASH_TOKEN>" \
  -H "Upstash-Cron: */5 * * * *" \
  -H "Content-Type: application/json" \
  -d '{"hello":"world"}'
```

## Options / Props

### Create headers

| Header | Description |
| --- | --- |
| `Upstash-Cron` | Required; `CRON_TZ=America/New_York */5 * * * *` form allowed |
| `Upstash-Schedule-Id` | Custom ID; only alphanumerics, hyphens, periods, underscores, otherwise 400 |
| `Content-Type` | Body type |
| `Upstash-Method` | Method |
| `Upstash-Timeout` | Timeout |
| `Upstash-Retries` | Retries |
| `Upstash-Retry-Delay` | Retry delay |
| `Upstash-Delay` | Delay |
| `Upstash-Forward-*` | Forwarded headers |
| `Upstash-Callback` / `-Forward-*` / `-*` | Callback |
| `Upstash-Failure-Callback` / `-Forward-*` / `-*` | Failure callback |
| `Upstash-Redact-Fields` | Redact fields |
| `Upstash-Label` | Label |

Body: `application/json`, `text/plain` or `application/octet-stream`.

### Other responses

| Status | Description |
| --- | --- |
| `412` | Maximum number of schedules exceeded |

### Get / list response fields

| Name | Description |
| --- | --- |
| `scheduleId` | Schedule ID |
| `cron` | Cron expression |
| `destination` | Destination |
| `createdAt` | ms |
| `method` | Method |
| `header` | Headers |
| `body` | Body |
| `retries` | Retries |
| `delay` | Seconds |
| `callback` | Callback |
| `failureCallback` | Failure callback |
| `callerIp` | Caller IP |
| `isPaused` | Paused |
| `flowControlKey` | Flow control key |
| `parallelism` | Parallelism |
| `rate` | Rate |
| `period` | Period |
| `retryDelayExpression` | Retry delay expression |
| `labels` | Labels (`label` deprecated) |
| `lastScheduleTime` | Last schedule time |
| `nextScheduleTime` | Next schedule time |
| `lastScheduleStates` | Last schedule states |

## Notes

- Schedule get and list endpoints apply field redaction set with `Upstash-Redact-Fields`.
- SDK equivalent: `schedules.md`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/schedules/create-a-schedule , https://upstash.com/docs/qstash/api-reference/schedules/get-a-schedule , https://upstash.com/docs/qstash/api-reference/schedules/list-schedules , https://upstash.com/docs/qstash/api-reference/schedules/pause-a-schedule , https://upstash.com/docs/qstash/api-reference/schedules/resume-a-schedule , https://upstash.com/docs/qstash/api-reference/schedules/delete-a-schedule (fetched 2026-11-14; no version pin on the site)

## Related

- [schedules.md](./schedules.md)
- [api-messages.md](./api-messages.md)
