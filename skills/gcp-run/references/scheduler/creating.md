---
source: https://docs.cloud.google.com/scheduler/docs/creating
---

# Create and manage cron jobs

Create, edit, pause, resume and delete Cloud Scheduler jobs with the Console or gcloud. Each target type (HTTP, Pub/Sub, App Engine HTTP) has its own `create` and `update` command. Cloud Scheduler is meant for repeating jobs; for a one-off run use Cloud Tasks (schedules a task up to 30 days ahead).

## Signature / Usage

### Create: HTTP target

Targeted HTTP endpoints must be publicly accessible.

```bash
gcloud scheduler jobs create http JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --uri=URI
```

Adapted (not in the official docs): the example URI uses `https://` instead of the source's `http://`, and `--location=LOCATION` is added (without it gcloud uses the App Engine app's location and fails in a project without one).

```bash
gcloud scheduler jobs create http my-http-job \
    --location=LOCATION \
    --schedule "0 1 * * 0" \
    --uri "https://myproject/my-url.com" \
    --http-method GET
```

### Create: Pub/Sub target

The topic must already exist in the project; messages are published as a Google API service account.

Adapted (not in the official docs): adds `--message-body=MESSAGE_BODY`, which gcloud requires (one of `--attributes` / `--message-body` / `--message-body-from-file`).

```bash
gcloud scheduler jobs create pubsub JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --topic=TOPIC \
    --message-body=MESSAGE_BODY
```

Adapted (not in the official docs): added `--location=LOCATION` (without it gcloud uses the App Engine app's location and fails in a project without one).

```bash
gcloud scheduler jobs create pubsub myjob \
    --location=LOCATION \
    --schedule "0 1 * * 0" \
    --topic cron-topic \
    --message-body "Hello"
```

### Create: App Engine HTTP target

Only for the App Engine app of the current project; for another app use an HTTP target. Target firewall rules must allow requests from the `0.1.0.2/32` range. Endpoints can be secured with `login: admin` on the `handlers` element in `app.yaml`.

Adapted (not in the official docs): `JOB` is positional (as in the source's own example and `update app-engine` form), not `--JOB=JOB`.

```bash
gcloud scheduler jobs create app-engine JOB \
    --location=LOCATION \
    --schedule=SCHEDULE
```

```bash
gcloud scheduler jobs create app-engine my-appengine-job \
    --schedule "0 1 * * 0" \
    --relative-url "/cron-handler"
```

### Edit a job

```bash
gcloud scheduler jobs update http JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --uri=URI
```

```bash
gcloud scheduler jobs update pubsub JOB \
    --location=LOCATION \
    --schedule=SCHEDULE \
    --topic=TOPIC
```

```bash
gcloud scheduler jobs update app-engine JOB \
    --location=LOCATION \
    --schedule=SCHEDULE
```

### Pause, resume, delete

Pause a job:

Adapted (not in the official docs): added `--location=LOCATION` so the command acts on the job in the intended location rather than the App Engine app's location.

```bash
gcloud scheduler jobs pause MY_JOB --location=LOCATION
```

Resume a job:

Adapted (not in the official docs): added `--location=LOCATION` so the command acts on the job in the intended location rather than the App Engine app's location.

```bash
gcloud scheduler jobs resume MY_JOB --location=LOCATION
```

Delete a job:

> **Warning**: Deleting a job is destructive. Try it on a disposable job first.

Adapted (not in the official docs): added `--location=LOCATION`, since without it `delete` can act on a same-named job in the App Engine region.

```bash
gcloud scheduler jobs delete MY_JOB --location=LOCATION
```

## Options / Props

| Parameter | Description |
|---|---|
| `JOB` | Job name, unique in the project. |
| `--location` / `LOCATION` | Location the job runs in. For App Engine targets it must equal the App Engine app's location. On update, if the job is in another location than your default you must specify it; the job location cannot be updated. |
| `--schedule` / `SCHEDULE` | Any unix-cron compatible string (for example `every 3 hours`); legacy App Engine cron syntax is still supported for existing jobs but no longer recommended. Note: `every 3 hours` is the groc (App Engine cron) format, not unix-cron; the unix-cron form is `0 */3 * * *`, and groc jobs do not get the `X-CloudScheduler-ScheduleTime` header. |
| `--uri` | Fully qualified URI of the HTTP endpoint. |
| HTTP method | Default `POST`. Body data is sent as bytes for `POST` or `PUT`. |
| `--headers` | HTTP request headers. For API keys use the header the target expects, such as `x-api-key` or `X-Goog-Api-Key`; `api_key` as a header name can cause authentication failures. |
| `--topic`, `--message-body`, `--message-body-from-file` | Pub/Sub topic and message; the body is sent as the `data` field of the message. |
| `--relative-url` | App Engine endpoint path; default `/` uses `PROJECT-ID.appspot.com`. |
| Service / version / instance | App Engine target: service defaults to `default`; version defaults to the serving version; any instance by default. |
| Time zone | See [cron-job-schedules.md](./cron-job-schedules.md). |
| Retry values | See [retry-jobs.md](./retry-jobs.md); defaults are usually sufficient. |
| Console duration units | `h`, `m`, `s`, `ms`, `us`, `ns`; no negative or fractional values. `Max retry duration` supports only `h`, `m`, `s`. |
| Attempt deadline | HTTP and App Engine HTTP targets only (Console optional setting; API field `attempt_deadline`). If the handler does not respond by the deadline the attempt is cancelled and marked failed, then retried per the retry config. gcloud flag: `--attempt-deadline=ATTEMPT_DEADLINE` on `create http` / `update http` / `create app-engine` / `update app-engine` (for example `--attempt-deadline=320s`). Range and defaults: see [quotas.md](./quotas.md). |

## Notes

- Internal ingress: Cloud Scheduler can invoke Cloud Run functions and Cloud Run (on the `run.app` URL, not custom domains) that restrict ingress to internal, if the target is in the same project or VPC Service Controls perimeter.
- If a job is still running or waiting for a target response, other scheduled runs are skipped until it finishes or times out. Only one instance should run at a time, but handlers must be idempotent.
- HTTP target jobs can report request failed even when the target returned successfully if target and Cloud Scheduler timeouts mismatch; set `attempt_deadline` (gcloud: `--attempt-deadline`, https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/create/http).
- "Targeted HTTP endpoints must be publicly accessible" (verbatim) is qualified by the internal-ingress exception above: Cloud Run and Cloud Run functions targets on the `run.app` URL in the same project or VPC Service Controls perimeter do not need public ingress (`--ingress all`) or `allUsers` access; use OIDC authentication instead (see http-target-auth.md).
- The source's concrete examples omit `--location`; they work only when the project has an App Engine app, because gcloud then defaults to its region, and HTTP and Pub/Sub targets do not need an App Engine app. The examples above add `--location=LOCATION`, except the App Engine target example, whose location must equal the App Engine app's location anyway.
- `login: admin` works only when the Users API is enabled: on second-generation runtimes set `user` in `app_engine_bundled_services` or `app_engine_apis: true` (https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml).
- Source inconsistency: the page says a job name cannot be reused even after its job is deleted (gcloud sections), while the Console steps say a name can be re-used after the associated job is deleted.
- A paused job can still be edited and remains paused until resumed.
- `delete` is destructive; try it on a disposable job first. Non-default App Engine service URLs appear as `SERVICE.PROJECT-ID.r.appspot.com/*` in the Console and `https://SERVICE-dot-PROJECT-ID.r.appspot.com/` in the CLI (equivalent).
- Corrected from the official docs: the example URI `"http://myproject/my-url.com"` was changed to `https`, and the App Engine create form `--JOB=JOB` to positional `JOB`.
- Corrected from the official docs: the generic form `gcloud scheduler jobs create pubsub JOB --location=LOCATION --schedule=SCHEDULE --topic=TOPIC` has no message flag, and gcloud requires at least one of `--attributes`, `--message-body` or `--message-body-from-file`; `--message-body=MESSAGE_BODY` was added.
- Adapted from the official docs: `gcloud scheduler jobs create http my-http-job ...`, `gcloud scheduler jobs create pubsub myjob ...` and the three separate commands `gcloud scheduler jobs pause MY_JOB`, `gcloud scheduler jobs resume MY_JOB` and `gcloud scheduler jobs delete MY_JOB` had no `--location`; `--location=LOCATION` was added (gcloud: "By default, uses the location of the current project's App Engine app if there is an associated app"). Without it, `delete` can act on a same-named job in the App Engine region.
- The source also shows Console steps; the gcloud flags for retry settings and for authentication are covered in the linked pages.
- Source: https://docs.cloud.google.com/scheduler/docs/creating (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [http-target-auth.md](./http-target-auth.md)
- [cron-job-schedules.md](./cron-job-schedules.md)
- [retry-jobs.md](./retry-jobs.md)
- [setup.md](./setup.md)
- [schedule-run-cron-job-gcloud.md](./schedule-run-cron-job-gcloud.md)
