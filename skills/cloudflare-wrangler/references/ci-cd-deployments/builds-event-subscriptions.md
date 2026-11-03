---
source: https://developers.cloudflare.com/workers/ci-cd/builds/event-subscriptions/
---

# Workers Builds Event Subscriptions

Subscribe to Workers Builds events (published to a Cloudflare Queue) and send notifications to Slack, Discord, or webhook endpoints.

## Signature / Usage

Event `build.started` (type `cf.workersBuilds.worker.build.started`):

```json
{
  "type": "cf.workersBuilds.worker.build.started",
  "source": {
    "type": "workersBuilds.worker",
    "workerName": "my-worker"
  },
  "payload": {
    "buildUuid": "build-12345678-90ab-cdef-1234-567890abcdef",
    "status": "running",
    "buildOutcome": null,
    "createdAt": "2025-05-01T02:48:57.132Z",
    "initializingAt": "2025-05-01T02:48:58.132Z",
    "runningAt": "2025-05-01T02:48:59.132Z",
    "stoppedAt": null,
    "buildTriggerMetadata": {
      "buildTriggerSource": "push_event",
      "branch": "main",
      "commitHash": "abc123def456",
      "commitMessage": "Fix bug in authentication",
      "author": "developer@example.com",
      "buildCommand": "npm run build",
      "deployCommand": "wrangler deploy",
      "rootDirectory": "/",
      "repoName": "my-worker-repo",
      "providerAccountName": "github-user",
      "providerType": "github"
    }
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

All four events share the same shape; only these fields differ in the official examples:

| Event | `type` | `payload.status` | `payload.buildOutcome` | `payload.stoppedAt` (example) |
| --- | --- | --- | --- | --- |
| `build.started` | `cf.workersBuilds.worker.build.started` | `running` | `null` | `null` |
| `build.failed` | `cf.workersBuilds.worker.build.failed` | `failed` | `failure` | `2025-05-01T02:50:00.132Z` |
| `build.canceled` | `cf.workersBuilds.worker.build.canceled` | `canceled` | `canceled` | `2025-05-01T02:49:30.132Z` |
| `build.succeeded` | `cf.workersBuilds.worker.build.succeeded` | `success` | `success` | `2025-05-01T02:50:15.132Z` |

## Notes

- Event subscriptions let Cloudflare products publish structured events to a queue consumed by Workers or HTTP pull consumers. See the Queues event subscriptions management guide.
- A deployable template (`cloudflare/templates` `workers-builds-notifications-template`) sends notifications for successful builds (with preview or live URLs), failed builds (with error messages), and canceled builds; customize message formatting per webhook provider.
- Only `build.started` is shown in full; the other three examples in the official page differ only in the fields above (the official examples keep the same `buildTriggerMetadata`).

## Related

- [builds-overview.md](./builds-overview.md)
- [builds-api-reference.md](./builds-api-reference.md)
