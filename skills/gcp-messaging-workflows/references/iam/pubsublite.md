---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/pubsublite
---

# Pub/Sub Lite IAM roles and permissions

## Signature / Usage

Predefined roles of `pubsublite` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Pub/Sub Lite Admin (`roles/pubsublite.admin`)

- Full access to topics, subscriptions and reservations.
- Permissions (31): `pubsublite.locations.openKafkaStream`, `pubsublite.operations.get`, `pubsublite.operations.list`, `pubsublite.reservations.attachTopic`, `pubsublite.reservations.create`, `pubsublite.reservations.delete`, `pubsublite.reservations.get`, `pubsublite.reservations.list`, `pubsublite.reservations.listTopics`, `pubsublite.reservations.update`, `pubsublite.subscriptions.create`, `pubsublite.subscriptions.delete`, `pubsublite.subscriptions.get`, `pubsublite.subscriptions.getCursor`, `pubsublite.subscriptions.list`, `pubsublite.subscriptions.seek`, `pubsublite.subscriptions.setCursor`, `pubsublite.subscriptions.subscribe`, `pubsublite.subscriptions.update`, `pubsublite.topics.computeHeadCursor`, `pubsublite.topics.computeMessageStats`, `pubsublite.topics.computeTimeCursor`, `pubsublite.topics.create`, `pubsublite.topics.delete`, `pubsublite.topics.get`, `pubsublite.topics.getPartitions`, `pubsublite.topics.list`, `pubsublite.topics.listSubscriptions`, `pubsublite.topics.publish`, `pubsublite.topics.subscribe`, `pubsublite.topics.update`

#### Pub/Sub Lite Editor (`roles/pubsublite.editor`)

- Modify topics, subscriptions and reservations, publish and consume messages.
- Permissions (31): `pubsublite.locations.openKafkaStream`, `pubsublite.operations.get`, `pubsublite.operations.list`, `pubsublite.reservations.attachTopic`, `pubsublite.reservations.create`, `pubsublite.reservations.delete`, `pubsublite.reservations.get`, `pubsublite.reservations.list`, `pubsublite.reservations.listTopics`, `pubsublite.reservations.update`, `pubsublite.subscriptions.create`, `pubsublite.subscriptions.delete`, `pubsublite.subscriptions.get`, `pubsublite.subscriptions.getCursor`, `pubsublite.subscriptions.list`, `pubsublite.subscriptions.seek`, `pubsublite.subscriptions.setCursor`, `pubsublite.subscriptions.subscribe`, `pubsublite.subscriptions.update`, `pubsublite.topics.computeHeadCursor`, `pubsublite.topics.computeMessageStats`, `pubsublite.topics.computeTimeCursor`, `pubsublite.topics.create`, `pubsublite.topics.delete`, `pubsublite.topics.get`, `pubsublite.topics.getPartitions`, `pubsublite.topics.list`, `pubsublite.topics.listSubscriptions`, `pubsublite.topics.publish`, `pubsublite.topics.subscribe`, `pubsublite.topics.update`

#### Pub/Sub Lite Viewer (`roles/pubsublite.viewer`)

- View topics, subscriptions and reservations.
- Permissions (12): `pubsublite.operations.get`, `pubsublite.operations.list`, `pubsublite.reservations.get`, `pubsublite.reservations.list`, `pubsublite.reservations.listTopics`, `pubsublite.subscriptions.get`, `pubsublite.subscriptions.getCursor`, `pubsublite.subscriptions.list`, `pubsublite.topics.get`, `pubsublite.topics.getPartitions`, `pubsublite.topics.list`, `pubsublite.topics.listSubscriptions`

#### Pub/Sub Lite Publisher (`roles/pubsublite.publisher`)

- Publish messages to a topic.
- Permissions (3): `pubsublite.locations.openKafkaStream`, `pubsublite.topics.getPartitions`, `pubsublite.topics.publish`

#### Pub/Sub Lite Subscriber (`roles/pubsublite.subscriber`)

- Subscribe to and read messages from a topic.
- Permissions (11): `pubsublite.locations.openKafkaStream`, `pubsublite.operations.get`, `pubsublite.subscriptions.getCursor`, `pubsublite.subscriptions.seek`, `pubsublite.subscriptions.setCursor`, `pubsublite.subscriptions.subscribe`, `pubsublite.topics.computeHeadCursor`, `pubsublite.topics.computeMessageStats`, `pubsublite.topics.computeTimeCursor`, `pubsublite.topics.getPartitions`, `pubsublite.topics.subscribe`

#### Pub/Sub Lite Service Agent (`roles/pubsublite.serviceAgent`)

- Grants Pub/Sub Lite Service Agent access to project resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (9): `pubsub.topics.publish`, `pubsublite.subscriptions.get`, `pubsublite.subscriptions.getCursor`, `pubsublite.subscriptions.setCursor`, `pubsublite.subscriptions.subscribe`, `pubsublite.topics.computeHeadCursor`, `pubsublite.topics.getPartitions`, `pubsublite.topics.publish`, `pubsublite.topics.subscribe`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/pubsublite.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `pubsublite.locations.openKafkaStream` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/iam.supportUser`, `roles/pubsublite.publisher`, `roles/pubsublite.subscriber` |
| `pubsublite.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.supportUser`, `roles/pubsublite.subscriber` |
| `pubsublite.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `pubsublite.reservations.attachTopic` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.reservations.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.reservations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.reservations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.supportUser` |
| `pubsublite.reservations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `pubsublite.reservations.listTopics` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.supportUser` |
| `pubsublite.reservations.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.subscriptions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.subscriptions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.subscriptions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `pubsublite.subscriptions.getCursor` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.supportUser`, `roles/pubsublite.subscriber` (+1 service agent role) |
| `pubsublite.subscriptions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `pubsublite.subscriptions.seek` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.subscriber` |
| `pubsublite.subscriptions.setCursor` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.subscriber` (+1 service agent role) |
| `pubsublite.subscriptions.subscribe` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/iam.supportUser`, `roles/pubsublite.subscriber` (+1 service agent role) |
| `pubsublite.subscriptions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.topics.computeHeadCursor` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/iam.supportUser`, `roles/pubsublite.subscriber` (+1 service agent role) |
| `pubsublite.topics.computeMessageStats` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/iam.supportUser`, `roles/pubsublite.subscriber` |
| `pubsublite.topics.computeTimeCursor` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/iam.supportUser`, `roles/pubsublite.subscriber` |
| `pubsublite.topics.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.topics.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |
| `pubsublite.topics.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.supportUser` |
| `pubsublite.topics.getPartitions` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.supportUser`, `roles/pubsublite.publisher`, `roles/pubsublite.subscriber` (+1 service agent role) |
| `pubsublite.topics.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `pubsublite.topics.listSubscriptions` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.viewer`, `roles/iam.supportUser` |
| `pubsublite.topics.publish` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/pubsublite.publisher` (+2 service agent roles) |
| `pubsublite.topics.subscribe` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/pubsublite.admin`, `roles/pubsublite.editor`, `roles/iam.supportUser`, `roles/pubsublite.subscriber` (+1 service agent role) |
| `pubsublite.topics.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/pubsublite.admin`, `roles/pubsublite.editor` |

## Notes

- Roles and permissions of the `pubsublite` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Deprecated product: the Pub/Sub Lite documentation says "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down.", "Pub/Sub Lite is no longer available for new customers after September 24, 2024." and that projects that did not use Pub/Sub Lite between April 15, 2025 and July 15, 2025 cannot access it starting on July 15, 2025; it recommends migrating to Google Cloud Managed Service for Apache Kafka (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka) or Pub/Sub (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub) (https://docs.cloud.google.com/pubsub/lite/docs, retrieved 2026-11-18). The roles on this page apply only to existing Pub/Sub Lite resources.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/pubsublite (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
