---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-notifications
---

# About cluster notifications

GKE publishes cluster notifications to Cloud Logging by default, and optionally to Pub/Sub topics you configure, for events such as scheduled, available, or ongoing upgrades, security bulletins, and end-of-support dates. Rollout sequencing notifications (custom stages) go only to Cloud Logging.

## Signature / Usage

### View notifications in Cloud Logging

All notification types (replace `PROJECT_ID` with your project ID):

```text
logName=projects/PROJECT_ID/logs/container.googleapis.com%2Fnotifications
```

A specific type (replace `NOTIFICATION_TYPE`, for example `UpgradeEvent`):

```text
jsonPayload.@type=type.googleapis.com/google.container.v1beta1.NOTIFICATION_TYPE
```

A specific `UpgradeInfoEvent` (replace `EVENT_TYPE`):

```text
jsonPayload.@type=type.googleapis.com/google.container.v1beta1.UpgradeInfoEvent
jsonPayload.eventType=EVENT_TYPE
```

### Filter notifications to Pub/Sub

In GKE (recommended): set `filter` in the `--notification-config` flag when enabling notifications, a pipe-delimited list of types, for example `filter="UpgradeEvent|SecurityBulletinEvent"`. In Pub/Sub, use a subscription filter:

```text
attributes.type_url = "type.googleapis.com/google.container.v1beta1.UpgradeEvent" OR "type.googleapis.com/google.container.v1beta1.UpgradeAvailableEvent"
```

### Log-based alert query

```text
resource.type="RESOURCE_TYPE"
log_id("container.googleapis.com/notifications")
jsonPayload.@type="type.googleapis.com/google.container.v1beta1.NOTIFICATION_TYPE"
```

Replace `RESOURCE_TYPE` with `gke_cluster` or `gke_nodepool` (or a combination) and `NOTIFICATION_TYPE` with a type such as `UpgradeEvent`. Add `jsonPayload.eventType="UPGRADE_LIFECYCLE"` and type `UpgradeInfoEvent` to filter a specific `UpgradeInfoEvent`. In the alert's **Extract log labels** you can add `CurrentVersion` = `jsonPayload.currentVersion` and `TargetVersion` = `jsonPayload.targetVersion`.

### Sample `UpgradeEvent` payload

```json
{ "resourceType":"MASTER", "operation":"operation-1595889094437-87b7254a", "operationStartTime":"2020-07-27T22:31:34.437652293Z", "currentVersion":"1.15.12-gke.2", "targetVersion":"1.15.12-gke.9"}
```

## Options / Props

### Notification types

| Type | Sent when |
|---|---|
| `SecurityBulletinEvent` | A security bulletin correlates to your cluster configuration or version. Not sent if unaffected; sent after a patch has rolled out in your region or zone; may be sent twice if both control plane and nodes are affected. |
| `UpgradeAvailableEvent` | A new version is available in your release channel: one week notice for patch versions, at least 2-4 weeks for minor versions (depending on the channel). Not sent when the channel default version changes. Clusters not on a channel get it for all upgradable versions; with auto-upgrades enabled they might upgrade soon after. Windows Server version info included in Preview. |
| `UpgradeEvent` | An upgrade starts; operation ID is in the message. For two-step control plane minor upgrades, sent when the binary upgrade starts and when the emulated version upgrade starts. |
| `UpgradeInfoEvent` | Multiple event kinds, see below. |
| `RolloutEvent` | Rollout sequencing with custom stages. |
| `RolloutSequenceEvent` | Rollout sequencing with custom stages. |

### `UpgradeInfoEvent` kinds

| Kind | `jsonPayload.eventType` | Details |
|---|---|---|
| Scheduled cluster upgrades (Preview) | `UPGRADE_LIFECYCLE` | Sent 72 to 96 hours in advance. Scheduled node upgrades list up to 10 node pools alphabetically. |
| Upgrade operation complete | `UPGRADE_LIFECYCLE` | State `SUCCEEDED`, `FAILED`, or `CANCELED`. |
| Minor version at or near end of support | `END_OF_SUPPORT` | One notification 30 days before end of support and one at end of support. |
| New patch changes Container-Optimized OS milestone during extended support | `COS_MILESTONE_VERSION_UPDATE` | Node auto-upgrades are paused; admins choose manual node upgrade, minor upgrade, or forgo patches. |
| Disruptive events in node pool upgrade | `DISRUPTION_EVENT` | PDB blocks drain, or PDB timeout reached and Pods are force deleted. |

### Rollout notification values

| Type | Values |
|---|---|
| `RolloutEvent` | `ROLLOUT_CREATED`, `ROLLOUT_STAGE_TRANSITION`, `ROLLOUT_BLOCKED`, `ROLLOUT_AUTO_PAUSED`, `ROLLOUT_AUTO_RESUMED`, `ROLLOUT_CANCELLATION_WARNING` (auto-cancel in seven days if not resumed), `ROLLOUT_AUTO_CANCELLED`, `ROLLOUT_COMPLETED` |
| `RolloutSequenceEvent` | `SEQUENCE_MISCONFIGURED`, `SEQUENCE_DEACTIVATION_WARNING` |

### Pub/Sub message attributes

| Attribute | Description | Example |
|---|---|---|
| `project_id` | The project number that owns the cluster. | `123456789` |
| `cluster_location` | Location of the cluster. | `us-central1-c` |
| `cluster_name` | Name of the cluster. | `example-cluster` |
| `type_url` | Type of notification. | `type.googleapis.com/google.container.v1beta1.UpgradeEvent` |
| `payload` | JSON-parsable string with notification-specific data. | see sample above |

## Notes

- Filtering in GKE is strongly recommended over Pub/Sub filtering: filtered-out notifications are never sent so you are not charged, and the filter can be edited anytime. It does not affect Cloud Logging. Pub/Sub subscription filters still incur charges for filtered messages and cannot be modified after configuration.
- GKE always sends `beta` notification types; parse the payload to get the GA type where available.
- To opt out of storing notification logs, configure a Cloud Logging exclusion filter.
- The source also shows sample payloads for `SecurityBulletinEvent`, `UpgradeAvailableEvent`, `UpgradeInfoEvent`, and scheduled upgrades; they are omitted here.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-notifications (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-logs.md](./view-logs.md)
- [observability.md](./observability.md)
- [troubleshooting.md](./troubleshooting.md)
