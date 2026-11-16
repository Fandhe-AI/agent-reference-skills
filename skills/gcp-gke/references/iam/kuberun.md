---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/kuberun
---

# Knative serving IAM roles and permissions

## Signature / Usage

Predefined roles of `kuberun` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### KubeRun Events Control Plane Service Agent (`roles/kuberun.eventsControlPlaneServiceAgent`)

- Service account role used to setup authentication for the control plane used by KubeRun Events. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (18): `cloudscheduler.jobs.create`, `cloudscheduler.jobs.delete`, `cloudscheduler.jobs.get`, `logging.sinks.create`, `logging.sinks.delete`, `logging.sinks.get`, `pubsub.subscriptions.create`, `pubsub.subscriptions.delete`, `pubsub.subscriptions.get`, `pubsub.topics.attachSubscription`, `pubsub.topics.create`, `pubsub.topics.delete`, `pubsub.topics.get`, `pubsub.topics.getIamPolicy`, `pubsub.topics.setIamPolicy`, `resourcemanager.projects.get`, `storage.buckets.get`, `storage.buckets.update`

#### KubeRun Events Data Plane Service Agent (`roles/kuberun.eventsDataPlaneServiceAgent`)

- Service account role used to setup authentication for the data plane used by KubeRun Events. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (7): `cloudtrace.traces.patch`, `monitoring.timeSeries.create`, `pubsub.subscriptions.consume`, `pubsub.subscriptions.get`, `pubsub.topics.get`, `pubsub.topics.publish`, `resourcemanager.projects.get`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/kuberun.eventsControlPlaneServiceAgent
```

## Notes

- Roles and permissions of the `kuberun` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/kuberun (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
