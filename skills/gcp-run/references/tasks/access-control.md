---
source: https://docs.cloud.google.com/tasks/docs/access-control
---

# Access control with IAM (Cloud Tasks)

Cloud Tasks uses IAM for access control at the project and queue level. Every method requires permissions; they are also checked when `queue.yaml` is updated or the console is used. To view and assign Cloud Tasks roles you must enable the Cloud Tasks API.

## Signature / Usage

```bash
gcloud services enable cloudtasks.googleapis.com
```

Enabling APIs needs `serviceusage.services.enable` (for example via Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).

## Options / Props

| Role | Purpose | Key permissions |
| --- | --- | --- |
| Cloud Tasks Admin (`roles/cloudtasks.admin`) | Full access to queues and tasks | `cloudtasks.*` incl. `queues.create/delete/pause/purge/resume/update/setIamPolicy`, `tasks.create/delete/run`, `cmekConfig.update` |
| Cloud Tasks Editor (`roles/cloudtasks.editor`) | Editor | queues create/delete/get/list/pause/purge/resume/update; `tasks.*` |
| Cloud Tasks Viewer (`roles/cloudtasks.viewer`) | Get and list tasks, queues, locations | `queues.get/list`, `tasks.get/list/fullView` |
| Cloud Tasks Enqueuer (`roles/cloudtasks.enqueuer`, Beta) | Create tasks | `cloudtasks.tasks.create`, `cloudtasks.tasks.fullView` |
| Cloud Tasks Queue Admin (`roles/cloudtasks.queueAdmin`) | Admin access to queues | `cloudtasks.queues.*`, `cloudtasks.locations.*` |
| Cloud Tasks Task Deleter (`roles/cloudtasks.taskDeleter`) | Delete tasks | `cloudtasks.tasks.delete` |
| Cloud Tasks Task Runner (`roles/cloudtasks.taskRunner`, Beta) | Run tasks | `cloudtasks.tasks.run`, `cloudtasks.tasks.fullView` |
| Cloud Tasks Service Agent (`roles/cloudtasks.serviceAgent`) | Service agent only | `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `logging.logEntries.create` |

## Notes

- To access and manage tasks in the console you also need `appengine.applications.get` (included in all App Engine predefined roles).
- Do not grant service agent roles to any principals except service agents.
- Create an IAM custom role when predefined roles do not fit. Queue-level setups: https://docs.cloud.google.com/tasks/docs/secure-queue-configuration; authentication: https://docs.cloud.google.com/tasks/docs/authentication. General IAM concepts live in the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/tasks/docs/access-control (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-http-target-tasks.md](./creating-http-target-tasks.md)
- [dual-overview.md](./dual-overview.md)
