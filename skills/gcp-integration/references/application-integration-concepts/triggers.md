---
source: https://docs.cloud.google.com/application-integration/docs/triggers
---

# Triggers

A trigger is an external event that initiates a task, or sequence of tasks, in an integration; it is the entry point of the integration. You can add multiple triggers, but when an event occurs only the trigger associated with that event begins executing its tasks.

## Signature / Usage

### Synchronous execution through the API

Calling `projects.locations.integrations.execute` runs the integration in synchronous mode:

```bash
curl -X POST \
    -H "authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    -H "X-Server-Timeout: 300" \
    -d '{"triggerId":"api_trigger/test_API_1"}' \
    "https://us-east1-integrations.googleapis.com/v1/projects/demo-project/locations/us-east1/integrations/-:execute"
```

## Options / Props

### Execution modes

| Mode | Behavior | Started by |
|------|----------|------------|
| Synchronous | Execution result is available soon after the integration runs | Test or publish from the console; `projects.locations.integrations.execute` API; call from a sub-integration in synchronous mode |
| Asynchronous | Fire and forget; suited to long-running integrations or when the result is not needed immediately | Everything that is not synchronous, for example Schedule trigger, Cloud Scheduler trigger, Cloud Pub/Sub trigger, Salesforce trigger, `projects.locations.integrations.schedule` API |

### Multiple triggers

| Case | Behavior |
|------|----------|
| Event hits `Trigger-2`, associated with downstream `Task-5` | The integration runs from `Task-5` onwards |
| Several triggers run at the same time | Each trigger runs its own copy of the integration; no overlap between the execution flows |

## Notes

- Connector Event triggers invoke an integration based on an event subscription created in a business application through Integration Connectors.
- Executions resumed from a suspension or an approval task run in asynchronous mode, even if the initial execution was synchronous.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/configure-api-trigger (the triggers page has no code block). The triggers documentation names no IAM permission for `execute`; the test-and-publish documentation names `integrations.integrations.invoke` (Application Integration Invoker, granted on the project) for testing, see [test-publish-integrations.md](./test-publish-integrations.md).
- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas
- Source: https://docs.cloud.google.com/application-integration/docs/triggers (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-api-trigger.md](./configure-api-trigger.md)
- [configure-pubsub-trigger.md](./configure-pubsub-trigger.md)
- [tasks.md](./tasks.md)
- [test-publish-integrations.md](./test-publish-integrations.md)
