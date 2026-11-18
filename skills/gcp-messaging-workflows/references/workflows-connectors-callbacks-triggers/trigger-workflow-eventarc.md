---
source: https://docs.cloud.google.com/workflows/docs/trigger-workflow-eventarc
---

# Trigger a workflow with Eventarc

An Eventarc trigger executes a workflow as a result of an event. Eventarc delivers events as CloudEvents over HTTP; Workflows converts the event to a JSON object (CloudEvents specification) and passes it into the execution as a workflow runtime argument.

## Signature / Usage

### Create a trigger with the CLI

The source defers to the per-provider "Create a trigger" instructions (https://docs.cloud.google.com/eventarc/docs/targets#triggers) and has no command of its own. Create a trigger whose destination is a workflow, using a user-managed service account:

```bash
gcloud eventarc triggers create TRIGGER \
    --location=LOCATION \
    --destination-workflow=DESTINATION_WORKFLOW  \
    --destination-workflow-location=DESTINATION_WORKFLOW_LOCATION \
    --event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
    --transport-topic=TOPIC_ID \
    --service-account="SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com"
```

## Options / Props

### What starts an execution

| Source | Example |
|--------|---------|
| Audit log created that matches the trigger's filter | BigQuery events via Cloud Audit Logs (quickstart) |
| Direct events | Cloud Storage bucket update, Firebase Remote Config template update |
| Messages published to a Pub/Sub topic | Pub/Sub quickstart |

### Trigger service account

| Item | Value |
|------|-------|
| Role to grant the trigger's service account | `workflows.invoker` (Workflows Invoker) so it can trigger the workflow |
| Role for the principal that creates the trigger | A role that lets it impersonate (act as) that service account |
| APIs to enable | Eventarc and Pub/Sub (`eventarc.googleapis.com`, `pubsub.googleapis.com`) |
| Permission to enable APIs | `serviceusage.services.enable` (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`) |

## Notes

- Events count as delivered as soon as the workflow execution starts; execution is asynchronous. Executions triggered by events are not retried if the execution starts and later fails (see the Eventarc event retry policy: https://docs.cloud.google.com/eventarc/docs/overview).
- The Workflows deduplication window for exactly-once processing of events is 24 hours.
- Events larger than the maximum Workflows argument size fail to trigger executions (https://docs.cloud.google.com/workflows/quotas).
- Source on roles: "If you are developing a production app, always grant the least permissive roles possible." The source creates a new service account for the trigger and grants it only `workflows.invoker`.
- The trigger's service account also needs the Eventarc Event Receiver role (`roles/eventarc.eventReceiver`) so it can receive events from event providers; it is not needed when routing direct events from Cloud Pub/Sub, as in this page's sample.
- Source: https://docs.cloud.google.com/eventarc/standard/docs/workflows/roles-permissions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- In projects protected by a service perimeter, when the Pub/Sub push endpoint is set to a Workflows execution you can create new Pub/Sub push subscriptions only through Eventarc, and the service account used for push authentication of the Workflows endpoint must be inside the perimeter (https://docs.cloud.google.com/eventarc/docs/using-vpc-service-controls).
- Console: **Workflows** > workflow > **Edit** > **Add new trigger > Eventarc**; a new workflow must also be deployed, an existing one need not be redeployed. Trigger update and delete happen through the workflow's **Edit** page. Terraform: https://docs.cloud.google.com/eventarc/docs/creating-triggers-terraform (omitted).
- Snippet taken from https://docs.cloud.google.com/eventarc/standard/docs/workflows/route-trigger-cloud-pubsub (Pub/Sub messages to an existing topic; `DESTINATION_WORKFLOW` is the ID of the deployed workflow, which must be in the same project as the trigger; `DESTINATION_WORKFLOW_LOCATION` is optional and defaults to the trigger's location; `SERVICE_ACCOUNT_NAME` is a user-managed service account; Pub/Sub triggers are only available in single-region locations, so `global` cannot be used). Event filter `type`, event types and flags differ per event provider; see the per-provider pages.
- Source: https://docs.cloud.google.com/workflows/docs/trigger-workflow-eventarc (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [schedule-workflow.md](./schedule-workflow.md)
- [creating-callback-endpoints.md](./creating-callback-endpoints.md)
