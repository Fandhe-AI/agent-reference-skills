---
source: https://docs.cloud.google.com/application-integration/docs/configure-pubsub-trigger
---

# Cloud Pub/Sub trigger

The Cloud Pub/Sub trigger runs an integration whenever a publisher writes a message to the chosen topic. The published message is written to the `CloudPubSubMessage` output variable for downstream triggers and tasks. Pub/Sub itself (topics, subscriptions, filters) is covered by `gcp-messaging-workflows`.

## Signature / Usage

Topic format for the **Pub/Sub topic** field:

```text
projects/PROJECT_ID/topics/TOPIC_ID
```

## Options / Props

### IAM roles granted by **Grant** when selecting a service account

| Service account | Role granted |
|-----------------|--------------|
| Default service account `service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com` | Pub/Sub Editor (`roles/pubsub.editor`); Service Account User (`roles/iam.serviceAccountUser`). If the topic's project differs from the integration's project, the default service account needs Pub/Sub Editor in the topic's project |
| Service account selected for the trigger | Application Integration Invoker (`roles/integrations.integrationInvoker`) |

### Trigger settings

| Setting | Description |
|---------|-------------|
| Pub/Sub topic | `projects/PROJECT_ID/topics/TOPIC_ID` |
| Service account | Account used to invoke the integration; a config variable whose value is a service account email (`SERVICE_ACCOUNT_NAME@project-id.iam.gserviceaccount.com`) can be chosen, and then you must grant the roles yourself |
| Output | `CloudPubSubMessage`, JSON in the `PubsubMessage` structure |
| Subscription expiration | Default `never expire`; change it on the Pub/Sub subscription page |

### Prerequisites

| Item | Requirement |
|------|-------------|
| User creating the trigger | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) |
| API | Pub/Sub API enabled in the integration's project |
| VPC Service Controls | If Pub/Sub API is in a service perimeter: Access Context Manager Admin (`roles/accesscontextmanager.policyAdmin`), Editor (`roles/accesscontextmanager.policyEditor`), Reader (`roles/accesscontextmanager.policyReader`) to manage the perimeters |

## Notes

- Source inconsistency: the source says both "The topic can exist in the same Google Cloud project as the integration, or in a different Google Cloud project" (and "You can also select a topic from a different Google Cloud project") and "The topic that you configure for the trigger must be available in the same Google Cloud project as your integration. Application Integration does not support **Cloud Pub/Sub trigger** executions across different Google Cloud projects."
- You do not create a subscription; Application Integration creates one when you publish the integration. From the December 01 2023 release, subscriptions are billed per Pub/Sub rates; existing triggers' subscriptions keep working unbilled, but updating the topic of an existing trigger applies billing. From that release a service account is required when configuring the trigger; existing triggers without one keep working, but must get one to be modified.
- Filter: publish first (creates the subscription), copy its details and name, delete it, recreate it with the same details and name plus a filter.
- VPC Service Controls: if the Pub/Sub API is protected by a service perimeter, subscription creation on publish fails. The source procedure temporarily removes `pubsub.googleapis.com` from the perimeter's restricted services, publishes, then adds it back. This temporarily lowers protection; try on a disposable project first and restore the service afterwards.
- Max Pub/Sub message size 10 MB. Pub/Sub can deliver a message more than once (at-least-once), so make the integration idempotent; `message_id` in the message header uniquely identifies a message.
- Unpublishing keeps the subscription (no message loss); deleting the published version or all versions also deletes the subscription. The filter procedure above also deletes and recreates the subscription. Try these operations on a disposable project first.
- The source asks for the project-level Project IAM Admin role (`roles/resourcemanager.projectIamAdmin`) for the user creating the trigger, and **Grant** gives the default service account Pub/Sub Editor (`roles/pubsub.editor`); both are kept as written in the source.
- The SLA applies only when the trigger successfully starts the execution of an `active` integration. The trigger needs no connector; the Connectors task for Pub/Sub or Salesforce is billed (pricing not copied; see https://docs.cloud.google.com/application-integration/docs/pricing).
- The **Publish Pub/Sub Message** task supports ordering keys for FIFO processing.
- Source: https://docs.cloud.google.com/application-integration/docs/configure-pubsub-trigger (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [configure-api-trigger.md](./configure-api-trigger.md)
- [configure-connectors-task.md](./configure-connectors-task.md)
