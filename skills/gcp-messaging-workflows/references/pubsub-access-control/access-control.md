---
source: https://docs.cloud.google.com/pubsub/docs/access-control#types_roles
---

# Pub/Sub access control: roles and permissions

Pub/Sub uses IAM for access control. Roles are granted to users, groups and service accounts at the project level or on an individual resource (topic, subscription, snapshot, schema). This page lists the role types, the permission each Pub/Sub API method requires, and the predefined Pub/Sub roles with their permissions.

## Signature / Usage

### Check which roles are bound on a topic

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub topics get-iam-policy \
    "projects/${PROJECT}/topics/${TOPIC}" \
    --format json
```

### Scope of grants

- Grant access per resource instead of for the whole Cloud project.
- Grant limited capabilities, for example only publish to a topic, or only consume from a subscription, without the right to delete it.
- Grant access to all Pub/Sub resources of a project to a group of developers (project level).
- With view-only access to a single topic or subscription you cannot view it in the Google Cloud console; use the Google Cloud CLI instead.
- Pub/Sub is not associated with any specific IP address, which matters if you rely on IP-based firewall rules.

## Options / Props

### Types of roles

| Type | Description |
|---|---|
| Basic roles | Highly permissive roles that existed prior to IAM. See https://docs.cloud.google.com/iam/docs/roles-overview#basic |
| Predefined roles | Granular access to specific Google Cloud resources. See https://docs.cloud.google.com/iam/docs/roles-permissions |
| Custom roles | Enforce the principle of least privilege. See https://docs.cloud.google.com/iam/docs/roles-overview#custom |

### Required permissions for topics

| Method | Description | Required permission |
|---|---|---|
| `projects.topics.create` | Creates the given topic with the given name. | `pubsub.topics.create` on the containing Cloud project |
| `projects.topics.delete` | Deletes the topic with the given name. | `pubsub.topics.delete` on the requested topic |
| `projects.topics.get` | Gets the configuration of a topic. | `pubsub.topics.get` on the requested topic |
| `projects.topics.getIamPolicy` | Gets the IAM access control policy for a topic. | `pubsub.topics.getIamPolicy` on the requested topic |
| `projects.topics.list` | Lists all topics. | `pubsub.topics.list` on the requested Cloud project |
| `projects.topics.patch` | Updates an existing topic. | `pubsub.topics.update` on the requested topic |
| `projects.topics.publish` | Adds one or more messages to the topic. | `pubsub.topics.publish` on the requested topic |
| `projects.topics.setIamPolicy` | Sets the IAM access control policy for a topic. | `pubsub.topics.setIamPolicy` on the requested topic |
| `projects.topics.testIamPermissions` | Returns permissions that a caller has on the specified resource. | None |

### Required permissions for subscriptions

| Method | Description | Required permission |
|---|---|---|
| `projects.subscriptions.acknowledge` | Acknowledges the messages associated with the ack_ids in the AcknowledgeRequest. | `pubsub.subscriptions.consume` on the requested subscription |
| `projects.subscriptions.create` | Creates a subscription to a given topic. | `pubsub.subscriptions.create` on the containing Cloud project and `pubsub.topics.attachSubscription` on the requested topic. For creating a Subscription S in Project A that is attached to a Topic T in Project B, the appropriate permissions must be granted on both Project A and on Topic T. In this case, user identity info can be captured in Project B's audit logs. |
| `projects.subscriptions.delete` | Deletes an existing subscription. | `pubsub.subscriptions.delete` on the requested subscription |
| `projects.subscriptions.detach` | Detaches a subscription from a topic. | `pubsub.topics.detachSubscription` on the topic that the subscription is attached to. |
| `projects.subscriptions.get` | Gets the configuration details of a subscription. | `pubsub.subscriptions.get` on the requested subscription |
| `projects.subscriptions.getIamPolicy` | Gets the IAM access control policy for a subscription. | `pubsub.subscriptions.getIamPolicy` on the requested subscription |
| `projects.subscriptions.list` | Lists matching subscriptions. | `pubsub.subscriptions.list` on the requested Cloud project |
| `projects.subscriptions.modifyAckDeadline` | Modifies the ack deadline for a specific message. | `pubsub.subscriptions.consume` on the requested subscription |
| `projects.subscriptions.modifyPushConfig` | Modifies the pushConfig for a specified subscription. | `pubsub.subscriptions.update` on the requested subscription |
| `projects.subscriptions.patch` | Updates an existing subscription. | `pubsub.subscriptions.update` on the requested subscription |
| `projects.subscriptions.pull` | Pulls messages from the server. | `pubsub.subscriptions.consume` on the requested subscription |
| `projects.subscriptions.seek` | Seeks an existing subscription to a point in time or a snapshot. | `pubsub.subscriptions.consume` on the requested subscription and `pubsub.snapshots.seek` on the requested snapshot, if any. |
| `projects.subscriptions.setIamPolicy` | Sets the IAM access control policy for a subscription. | `pubsub.subscriptions.setIamPolicy` on the requested subscription |
| `projects.subscriptions.testIamPermissions` | Returns permissions that a caller has on the specified resource. | None |

### Required permissions for schemas

| Method | Description | Required permission |
|---|---|---|
| `projects.schemas.commit` | Commits a new schema revision. | `pubsub.schemas.commit` on the requested schema |
| `projects.schemas.create` | Creates a schema. | `pubsub.schemas.create` on the containing Cloud project |
| `projects.schemas.delete` | Deletes a schema. | `pubsub.schemas.delete` on the requested schema |
| `projects.schemas.deleteRevision` | Deletes a specific schema revision. | `pubsub.schemas.delete` on the requested schema |
| `projects.schemas.get` | Gets a schema. | `pubsub.schemas.get` on the requested schema |
| `projects.schemas.getIamPolicy` | Gets the IAM access control policy for a schema. | `pubsub.schemas.getIamPolicy` on the requested schema |
| `projects.schemas.list` | Lists schemas in a project. | `pubsub.schemas.list` on the requested Cloud project |
| `projects.schemas.listRevisions` | Lists all schema revisions for the named schema. | `pubsub.schemas.listRevisions` on the requested schema |
| `projects.schemas.rollback` | Creates a new schema revision from a previous revision. | `pubsub.schemas.rollback` on the requested schema |
| `projects.schemas.validate` | Validates a schema definition. | `pubsub.schemas.validate` on the containing Cloud project |
| `projects.schemas.validateMessage` | Validates a message against a schema. | `pubsub.schemas.validate` on the containing Cloud project |

### Required permissions for snapshots

| REST method | Description | Required permission |
|---|---|---|
| `projects.snapshots.create` | Creates a snapshot from the requested subscription. | `pubsub.snapshots.create` on the containing Cloud project and `pubsub.subscriptions.consume` permission on the source subscription. |
| `projects.snapshots.delete` | Removes an existing snapshot. | `pubsub.snapshots.delete` on the requested snapshot |
| `projects.snapshots.getIamPolicy` | Gets the IAM access control policy for a snapshot. | `pubsub.snapshots.getIamPolicy` on the requested snapshot |
| `projects.snapshots.list` | Lists the existing snapshots. | `pubsub.snapshots.list` on the requested Cloud project |
| `projects.snapshots.patch` | Updates an existing snapshot. | `pubsub.snapshots.update` on the requested snapshot |
| `projects.snapshots.setIamPolicy` | Sets the IAM access control policy for a snapshot. | `pubsub.snapshots.setIamPolicy` on the requested snapshot |
| `projects.snapshots.testIamPermissions` | Returns permissions that a caller has on the specified resource. | None |

### Predefined Pub/Sub roles

| Role | Description | Lowest-level resources where you can grant this role | Permissions |
|---|---|---|---|
| Pub/Sub Admin (`roles/pubsub.admin`) | Provides full access to topics and subscriptions. | Schema, Snapshot, Subscription, Topic | `cloudkms.keyHandles.*` (`cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`), `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `pubsub.*` (`pubsub.messageTransforms.validate`, `pubsub.schemas.attach`, `pubsub.schemas.commit`, `pubsub.schemas.create`, `pubsub.schemas.delete`, `pubsub.schemas.get`, `pubsub.schemas.getIamPolicy`, `pubsub.schemas.list`, `pubsub.schemas.listRevisions`, `pubsub.schemas.rollback`, `pubsub.schemas.setIamPolicy`, `pubsub.schemas.validate`, `pubsub.snapshots.create`, `pubsub.snapshots.createTagBinding`, `pubsub.snapshots.delete`, `pubsub.snapshots.deleteTagBinding`, `pubsub.snapshots.get`, `pubsub.snapshots.getIamPolicy`, `pubsub.snapshots.list`, `pubsub.snapshots.listEffectiveTags`, `pubsub.snapshots.listTagBindings`, `pubsub.snapshots.seek`, `pubsub.snapshots.setIamPolicy`, `pubsub.snapshots.update`, `pubsub.subscriptions.consume`, `pubsub.subscriptions.create`, `pubsub.subscriptions.createTagBinding`, `pubsub.subscriptions.delete`, `pubsub.subscriptions.deleteTagBinding`, `pubsub.subscriptions.get`, `pubsub.subscriptions.getIamPolicy`, `pubsub.subscriptions.list`, `pubsub.subscriptions.listEffectiveTags`, `pubsub.subscriptions.listTagBindings`, `pubsub.subscriptions.setIamPolicy`, `pubsub.subscriptions.update`, `pubsub.topics.attachSubscription`, `pubsub.topics.create`, `pubsub.topics.createTagBinding`, `pubsub.topics.delete`, `pubsub.topics.deleteTagBinding`, `pubsub.topics.detachSubscription`, `pubsub.topics.get`, `pubsub.topics.getIamPolicy`, `pubsub.topics.list`, `pubsub.topics.listEffectiveTags`, `pubsub.topics.listTagBindings`, `pubsub.topics.publish`, `pubsub.topics.setIamPolicy`, `pubsub.topics.update`, `pubsub.topics.updateTag`), `resourcemanager.projects.get`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.*` (`serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`), `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test` |
| Pub/Sub Editor (`roles/pubsub.editor`) | Provides access to modify topics and subscriptions, and access to publish and consume messages. | Schema, Snapshot, Subscription, Topic | `cloudkms.keyHandles.*` (`cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`), `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `pubsub.messageTransforms.validate`, `pubsub.schemas.attach`, `pubsub.schemas.commit`, `pubsub.schemas.create`, `pubsub.schemas.delete`, `pubsub.schemas.get`, `pubsub.schemas.getIamPolicy`, `pubsub.schemas.list`, `pubsub.schemas.listRevisions`, `pubsub.schemas.rollback`, `pubsub.schemas.validate`, `pubsub.snapshots.create`, `pubsub.snapshots.createTagBinding`, `pubsub.snapshots.delete`, `pubsub.snapshots.deleteTagBinding`, `pubsub.snapshots.get`, `pubsub.snapshots.list`, `pubsub.snapshots.listEffectiveTags`, `pubsub.snapshots.listTagBindings`, `pubsub.snapshots.seek`, `pubsub.snapshots.update`, `pubsub.subscriptions.consume`, `pubsub.subscriptions.create`, `pubsub.subscriptions.createTagBinding`, `pubsub.subscriptions.delete`, `pubsub.subscriptions.deleteTagBinding`, `pubsub.subscriptions.get`, `pubsub.subscriptions.list`, `pubsub.subscriptions.listEffectiveTags`, `pubsub.subscriptions.listTagBindings`, `pubsub.subscriptions.update`, `pubsub.topics.attachSubscription`, `pubsub.topics.create`, `pubsub.topics.createTagBinding`, `pubsub.topics.delete`, `pubsub.topics.deleteTagBinding`, `pubsub.topics.detachSubscription`, `pubsub.topics.get`, `pubsub.topics.list`, `pubsub.topics.listEffectiveTags`, `pubsub.topics.listTagBindings`, `pubsub.topics.publish`, `pubsub.topics.update`, `pubsub.topics.updateTag`, `resourcemanager.projects.get`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.*` (`serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`), `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test` |
| Pub/Sub Publisher (`roles/pubsub.publisher`) | Provides access to publish messages to a topic. | Topic | `pubsub.topics.publish` |
| Pub/Sub Subscriber (`roles/pubsub.subscriber`) | Provides access to consume messages from a subscription and to attach subscriptions to a topic. | Snapshot, Subscription, Topic | `pubsub.snapshots.seek`, `pubsub.subscriptions.consume`, `pubsub.topics.attachSubscription` |
| Pub/Sub Viewer (`roles/pubsub.viewer`) | Provides access to view topics and subscriptions. | Schema, Snapshot, Subscription, Topic | `pubsub.messageTransforms.validate`, `pubsub.schemas.get`, `pubsub.schemas.list`, `pubsub.schemas.listRevisions`, `pubsub.schemas.validate`, `pubsub.snapshots.get`, `pubsub.snapshots.list`, `pubsub.snapshots.listEffectiveTags`, `pubsub.snapshots.listTagBindings`, `pubsub.subscriptions.get`, `pubsub.subscriptions.list`, `pubsub.subscriptions.listEffectiveTags`, `pubsub.subscriptions.listTagBindings`, `pubsub.topics.get`, `pubsub.topics.list`, `pubsub.topics.listEffectiveTags`, `pubsub.topics.listTagBindings`, `resourcemanager.projects.get`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.*` (`serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`), `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test` |

### Service agent roles

| Role | Description | Permissions |
|---|---|---|
| Cloud Pub/Sub Service Agent (`roles/pubsub.serviceAgent`) | Grants Cloud Pub/Sub Service Account access to manage resources. | `iam.serviceAccounts.get`, `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `iam.serviceAccounts.implicitDelegation`, `iam.serviceAccounts.list`, `iam.serviceAccounts.signBlob`, `iam.serviceAccounts.signJwt`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.services.use` |

## Notes

- Adapted from the official docs: unquoted shell variable expansions in the commands are double-quoted (`"${VAR}"`).
- Service agent roles should only be granted to service agents. Do not grant `roles/pubsub.serviceAgent` to any other principal.
- Basic roles are highly permissive roles that existed prior to IAM; custom roles help enforce the principle of least privilege. Pub/Sub Admin and Pub/Sub Editor include delete permissions on topics, subscriptions, snapshots and schemas.
- The full predefined role list is also available at https://docs.cloud.google.com/iam/docs/roles-permissions/pubsub
- Authorization checks depend on the IAM subsystem; see the cross-project page for the partial availability behavior.
- The source also shows Console steps and the same samples in C#, Go, Java, PHP and Ruby; they are omitted.
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/access-control#get-policy (the topic `get-iam-policy` gcloud command).
- Source: https://docs.cloud.google.com/pubsub/docs/access-control#types_roles (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control-get-policy.md](./access-control-get-policy.md)
- [access-control-set-policy.md](./access-control-set-policy.md)
- [access-control-cross-project.md](./access-control-cross-project.md)
