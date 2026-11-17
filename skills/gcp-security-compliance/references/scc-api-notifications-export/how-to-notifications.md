---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-notifications
---

# Enable finding notifications for Pub/Sub

Use the Security Command Center API to send new findings, finding updates, and findings deleted due to data retention policies to a Pub/Sub topic in near-real time by creating a `NotificationConfig`. The same function is available as continuous exports in the console.

## Signature / Usage

### Enable the API

```bash
gcloud services enable securitycenter.googleapis.com
```

### Create and subscribe to a Pub/Sub topic

```bash
gcloud pubsub topics create TOPIC_ID
```

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID --topic=TOPIC_ID
```

### Grant Pub/Sub Admin on the topic

```bash
gcloud pubsub topics add-iam-policy-binding \
    projects/PUBSUB_PROJECT/topics/TOPIC_ID \
    --member="user:GOOGLE_ACCOUNT" \
    --role="roles/pubsub.admin"
```

### Create a NotificationConfig

Adapted (not in the official docs): the source uses `--PARENT=PARENT_ID`, which is not a gcloud flag; it is replaced with `--organization=ORGANIZATION_ID` (use `--folder=FOLDER_ID` or `--project=PROJECT_ID` for the other scopes, per the gcloud 593.0.0 help). The fence also gets a language tag.

```bash
gcloud scc notifications create NOTIFICATION_NAME \
  --organization=ORGANIZATION_ID \
  --location=LOCATION \
  --description="NOTIFICATION_DESCRIPTION" \
  --pubsub-topic=PUBSUB_TOPIC \
  --filter="FILTER" \
  --deletion-notifications-enabled
```

### Grant VPC Service Controls perimeter access (before creating the NotificationConfig)

```bash
gcloud config set billing/quota_project QUOTA_PROJECT_ID
```

`egress-rule.yaml`:

```yaml
- egressFrom:
    identities:
    - PRINCIPAL_ID
  egressTo:
    operations:
    - serviceName: pubsub.googleapis.com
      methodSelectors:
      - method: '*'
    resources:
    - projects/PROJECT_ID
```

`ingress-rule.yaml`:

```yaml
- ingressFrom:
    identities:
    - PRINCIPAL_ID
    sources:
    - accessLevel: '*'
  ingressTo:
    operations:
    - serviceName: pubsub.googleapis.com
      methodSelectors:
      - method: '*'
    resources:
    - projects/PROJECT_ID
```

```bash
gcloud access-context-manager perimeters update PERIMETER_NAME \
    --set-egress-policies=egress-rule.yaml
```

```bash
gcloud access-context-manager perimeters update PERIMETER_NAME \
    --set-ingress-policies=ingress-rule.yaml
```

### Ingress rule for the NotificationConfig service agent (after creating it)

`ingress-rule.yaml`:

```yaml
- ingressFrom:
    identities:
    - serviceAccount:service-org-ORGANIZATION_ID@gcp-sa-scc-notification.iam.gserviceaccount.com
    sources:
    - accessLevel: '*'
  ingressTo:
    operations:
    - serviceName: pubsub.googleapis.com
      methodSelectors:
      - method: '*'
    resources:
    - projects/PROJECT_ID
```

```bash
gcloud access-context-manager perimeters update PERIMETER_NAME \
    --set-ingress-policies=ingress-rule.yaml
```

## Options / Props

### Required roles

| Role | Where |
|------|-------|
| Security Center Admin (`roles/securitycenter.admin`) | Organization or project where Security Command Center is activated |
| Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) | Project where the Pub/Sub topic is created |
| Pub/Sub Admin (`roles/pubsub.admin`) | The Pub/Sub topic (needed to create a `NotificationConfig`) |
| `serviceusage.services.enable` permission (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`) | To enable the API |

### gcloud scc notifications create placeholders

| Name | Description |
|------|-------------|
| `NOTIFICATION_NAME` | 1 to 128 characters; alphanumeric characters, underscores, or hyphens only. |
| `PARENT_ID` / `--organization` / `--folder` / `--project` | Scope in the resource hierarchy the notification applies to; the source gives IDs as `organizations/123`, `folders/456`, `projects/789`. |
| `LOCATION` | SCC location; `eu`, `sa`, or `us` if data residency is enabled, otherwise `global`. |
| `NOTIFICATION_DESCRIPTION` | No more than 1,024 characters. |
| `PUBSUB_TOPIC` | `projects/PROJECT_ID/topics/TOPIC`. |
| `FILTER` | Expression selecting which findings go to Pub/Sub, for example `state=\"ACTIVE\"`; accepts any filter available in `findings.list`. |
| `--deletion-notifications-enabled` | Notify for findings deleted due to data retention policies; the notification has `deletedFinding` set to `true`. Default: deleted findings are not exported. |
| `--no-deletion-notifications-enabled` | Disable deletion notifications. |

### Limits

| Item | Value |
|------|-------|
| `NotificationConfig` per organization | Limited; see SCC Quotas and limits |
| Pub/Sub subscription default expiry | 31 days of inactivity (use `--expiration-period`, or `never`) |

## Notes

- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-notifications (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Applies to the Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers. The Enterprise service tier will shut down on May 21, 2027; organizations on Enterprise move automatically to Premium on or after May 21, 2027.
- Corrected from the official docs: the source writes `--PARENT=PARENT_ID` in the create command; the gcloud 593.0.0 help has `--organization`, `--folder`, `--project` (mutually exclusive) and a required `--pubsub-topic`.
- A service account `service-org-ORGANIZATION_ID@gcp-sa-scc-notification.iam.gserviceaccount.com` is created with the first `NotificationConfig` and is automatically granted `securitycenter.notificationServiceAgent` on the topic's IAM policy; this role is required for notifications to work. Do not grant it to your own workloads.
- Deletion notifications apply only to future deletion events; findings deleted before enabling are not sent retroactively. To disable them, update the `NotificationConfig` with `--no-deletion-notifications-enabled`. If not enabled at creation they are disabled by default.
- Source inconsistency: the page says to receive deletion notifications by specifying `--deletion-notifications-enabled` in gcloud "or set the `deletion_notifications_enabled` field to `false`" in the REST API or client libraries. The Discovery document only types `NotificationConfig.deletionNotificationsEnabled` as a boolean (no description), and the gcloud 593.0.0 help says `--deletion-notifications-enabled` enables and `--no-deletion-notifications-enabled` disables; check the field value against the API reference before relying on `false`.
- Data residency: with data residency enabled, `NotificationConfig` resources are stored in the SCC location where they are created, cannot be viewed or edited in other locations, and their location cannot be changed (delete and recreate). Create the config in the same SCC location as the findings. SCC does not restrict where you create exports; filters may contain residency-controlled data, so pick the location carefully.
- v1 `NotificationConfig` resources are not visible in the v2 API; to manage v1 configs do not specify a location in gcloud (v1 does not support data residency).
- Pub/Sub subscriptions expire after 31 days of inactivity unless `--expiration-period` is raised or set to `never`.
- VPC Service Controls: if the topic's project is inside a perimeter, add ingress and egress rules for the principal that calls the API before creating the config, then an ingress rule for the service agent after creating it. To find the right perimeter, check logs for `RESOURCES_NOT_IN_SAME_SERVICE_PERIMETER` violations and read `servicePerimeterName` (`accessPolicies/ACCESS_POLICY_ID/servicePerimeters/SERVICE_PERIMETER_NAME`). Once notifications work, delete the principal's ingress and egress rules but keep the service-agent ingress rule.
- Permissive: `accessLevel: '*'` (any source) and `method: '*'` (all Pub/Sub methods) in the perimeter rules allow everything for the listed identities and project; they are for this setup only. The Terraform sample in the source limits the service agent to `google.pubsub.v1.Publisher.Publish`.
- Disruptive: `--set-ingress-policies` and `--set-egress-policies` replace ALL existing ingress or egress policies in the perimeter. Retrieve the existing policies first, add the new rule to the YAML, then run the update; changing perimeters can block production traffic, so try it on a non-production perimeter first.
- Quota project: set `billing/quota_project` to a project that has the Access Context Manager API enabled.
- Removing a `NotificationConfig` or its perimeter rules stops delivery; the source does not describe undoing it other than re-creating.
- Console steps, Terraform, and Go / Java / Node.js / Python client-library examples (v2 `securitycenter` clients using a streaming config filter such as `state = "ACTIVE"`) are omitted; see the source page. Its Java and Python samples note the caller needs `pubsub.topics.setIamPolicy` on the topic.

## Related

- [how-to-api-list-findings.md](./how-to-api-list-findings.md)
- [how-to-export-data.md](./how-to-export-data.md)
- Manage notifications: https://docs.cloud.google.com/security-command-center/docs/how-to-api-manage-notifications
- Filtering notifications: https://docs.cloud.google.com/security-command-center/docs/how-to-api-filter-notifications
- Real-time chat notifications: https://docs.cloud.google.com/security-command-center/docs/how-to-enable-real-time-notifications
