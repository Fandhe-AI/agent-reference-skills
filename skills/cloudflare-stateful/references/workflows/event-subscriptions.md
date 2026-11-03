---
source: https://developers.cloudflare.com/workflows/reference/event-subscriptions/
---

# Event subscriptions

Workflows publish lifecycle events to a Cloudflare Queue through account-level event subscriptions, which Workers or HTTP pull consumers can process.

## Signature / Usage

Example `instance.completed` event message:

```json
{
  "type": "cf.workflows.workflow.instance.completed",
  "source": {
    "type": "workflows.workflow",
    "workflowName": "my-workflow"
  },
  "payload": {
    "versionId": "v1",
    "instanceId": "inst-12345678-90ab-cdef-1234-567890abcdef"
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2025-05-01T02:48:57.132Z"
  }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| instance.queued | event (`cf.workflows.workflow.instance.queued`) | — | An instance was created and is awaiting execution |
| instance.started | event (`cf.workflows.workflow.instance.started`) | — | An instance starts or resumes execution |
| instance.paused | event (`cf.workflows.workflow.instance.paused`) | — | An instance pauses execution |
| instance.errored | event (`cf.workflows.workflow.instance.errored`) | — | An instance step throws an error |
| instance.terminated | event (`cf.workflows.workflow.instance.terminated`) | — | An instance is manually terminated |
| instance.completed | event (`cf.workflows.workflow.instance.completed`) | — | An instance finishes execution successfully |

## Notes

- All six events share the same shape: `type`, `source` (`type` and `workflowName`), `payload` (`versionId`, `instanceId`), and `metadata` (`accountId`, `eventSubscriptionId`, `eventSchemaVersion`, `eventTimestamp`). The example values above are the official placeholders.
- Management guide and queue-side details: event-subscriptions.md (https://developers.cloudflare.com/queues/event-subscriptions/).
- To observe one instance's events from code without a queue, use [subscribe-instance-events.md](./subscribe-instance-events.md).

## Related

- [subscribe-instance-events.md](./subscribe-instance-events.md)
- [workflow-instance.md](./workflow-instance.md)
