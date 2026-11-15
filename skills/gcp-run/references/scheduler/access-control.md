---
source: https://docs.cloud.google.com/scheduler/docs/access-control
---

# Access control with IAM (Cloud Scheduler)

Cloud Scheduler uses IAM to control who can view, configure and run jobs. Enable the Cloud Scheduler API before its roles appear in the Console. Roles apply project-wide; there are no per-job IAM policies.

## Signature / Usage

### Enable the API

```bash
gcloud services enable cloudscheduler.googleapis.com
```

Enabling APIs requires `serviceusage.services.enable` (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).

## Options / Props

| Role | Description |
|---|---|
| Cloud Scheduler Admin (`roles/cloudscheduler.admin`) | Full access to jobs and executions. Permissions include `cloudscheduler.jobs.create`, `.delete`, `.enable`, `.fullView`, `.get`, `.list`, `.pause`, `.run`, `.update`, `cloudscheduler.locations.get`, `.list`. Admins (or any role with `cloudscheduler.jobs.create`) can create jobs that publish to any Pub/Sub topic in the project. |
| Cloud Scheduler Viewer (`roles/cloudscheduler.viewer`) | Get and list jobs, executions and locations: `cloudscheduler.jobs.fullView`, `.get`, `.list`, `cloudscheduler.locations.get`, `.list`. |
| Cloud Scheduler Job Runner (`roles/cloudscheduler.jobRunner`) | Run jobs: `cloudscheduler.jobs.fullView`, `cloudscheduler.jobs.run`. |
| Cloud Scheduler Service Agent (`roles/cloudscheduler.serviceAgent`) | For the service agent only: `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `logging.logEntries.create`, `logging.logEntries.route`, `pubsub.topics.publish`. |

The Admin, Viewer and Job Runner roles can be granted at the project level (lowest-level resource: Project) and also include `appengine.applications.get`, `resourcemanager.projects.get`/`list` and read-only Service Usage permissions.

## Notes

- Do not grant service agent roles to any principals except service agents.
- Cloud Scheduler does not support resource-level IAM policies or IAM Conditions resource attributes on individual jobs. To restrict who can view, modify or run specific jobs, create them in separate projects. To restrict what an HTTP job can invoke, give it a dedicated user-managed service account with only the needed permissions; principals who create or update the job need `iam.serviceAccounts.actAs` on it (`roles/iam.serviceAccountUser`).
- Snippet taken from https://docs.cloud.google.com/run/docs/execute/jobs-on-schedule (`gcloud services enable cloudscheduler.googleapis.com`); the access-control page itself has no gcloud block. See the `gcp-foundation` skill for IAM basics.
- Source: https://docs.cloud.google.com/scheduler/docs/access-control (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [http-target-auth.md](./http-target-auth.md)
- [setup.md](./setup.md)
