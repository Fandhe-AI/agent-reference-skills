---
source: https://docs.cloud.google.com/scheduler/docs/setup
---

# Set up Cloud Scheduler

Prepare a project and environment before scheduling jobs: enable the Cloud Scheduler API, set up authentication, and add an App Engine application only if you will use an App Engine HTTP target.

## Signature / Usage

### Enable the Cloud Scheduler API

```bash
gcloud services enable cloudscheduler.googleapis.com
```

### Create an App Engine app (only for App Engine HTTP targets)

```bash
gcloud app create --region=REGION
```

Replace `REGION` with the App Engine [location](https://docs.cloud.google.com/appengine/docs/locations). `europe-west` and `us-central` are called `europe-west1` and `us-central1` in Cloud Scheduler commands. The region cannot be changed after it is set.

### Check the region of an existing app

```bash
gcloud app describe
```

`locationId` indicates the region, for example `locationId: us-central`.

## Notes

- Snippet taken from https://docs.cloud.google.com/run/docs/execute/jobs-on-schedule (`gcloud services enable cloudscheduler.googleapis.com`); the setup page's own enable-API tabs were empty in the retrieved twin.
- For App Engine HTTP targets, the App Engine app serves as both the location of the Cloud Scheduler service and the job handler. For a handler outside the project, use an HTTP target; no App Engine app is needed then.
- When creating the app in the Console, do not select a service account (the default App Engine service account is used).
- Authentication depends on interface and environment; see https://docs.cloud.google.com/scheduler/docs/authentication and [http-target-auth.md](./http-target-auth.md).
- Source: https://docs.cloud.google.com/scheduler/docs/setup (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [creating.md](./creating.md)
- [access-control.md](./access-control.md)
