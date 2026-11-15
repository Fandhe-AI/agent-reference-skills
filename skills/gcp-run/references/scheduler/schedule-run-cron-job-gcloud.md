---
source: https://docs.cloud.google.com/scheduler/docs/schedule-run-cron-job-gcloud
---

# Schedule and run a cron job using the gcloud CLI

Quickstart: create a Pub/Sub topic and subscription, create a Cloud Scheduler job that publishes to the topic on a schedule, run it immediately, and verify the message. The free tier should cover it.

## Signature / Usage

### Create a Pub/Sub topic and subscription

```bash
gcloud pubsub topics create cron-topic
gcloud pubsub subscriptions create cron-sub --topic cron-topic
```

### Create the cron job

```bash
gcloud scheduler jobs create pubsub my-cron-job \
    --schedule="30 16 * * 7" \
    --topic=cron-topic \
    --location="us-east1" \
    --message-body="Hello world"
```

Sends "Hello world" to the topic at 16:30 on Sundays.

### Run the job now

```bash
gcloud scheduler jobs run my-cron-job --location="us-east1"
```

The first job created in a project can take a few minutes to run.

### Verify in Pub/Sub

```bash
gcloud pubsub subscriptions pull cron-sub --limit 5
```

Run again if nothing is pulled initially. Output resembles `DATA: Hello world!` with `MESSAGE_ID` and `ACK_ID`.

### Clean up

```bash
gcloud scheduler jobs delete MY_JOB \
    --location="LOCATION"
gcloud pubsub topics delete TOPIC_ID
gcloud pubsub subscriptions delete SUBSCRIPTION_ID
```

Alternatively delete the whole project with `gcloud projects delete PROJECT_ID`.

## Options / Props

| Required role | Purpose |
|---|---|
| Cloud Scheduler Admin (`roles/cloudscheduler.admin`) | Create and run jobs |
| Pub/Sub Editor (`roles/pubsub.editor`) | Create topics and subscriptions |

`LOCATION` for delete: by default the location of the current project's App Engine app, if one is associated.

## Notes

- `gcloud projects delete` and the `delete` commands are destructive: deleting a project removes everything in it and loses custom project IDs. Try on a disposable project first.
- Source: https://docs.cloud.google.com/scheduler/docs/schedule-run-cron-job-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating.md](./creating.md)
- [cron-job-schedules.md](./cron-job-schedules.md)
- [overview.md](./overview.md)
