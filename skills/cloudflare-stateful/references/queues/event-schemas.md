---
source: https://developers.cloudflare.com/queues/event-subscriptions/events-schemas/
---

# Events and schemas

Event sources available to Queues event subscriptions, their event types, and the common message envelope.

## Signature / Usage

Subscribe to Browser Run crawl events:

```bash
npx wrangler queues subscription create <QUEUE_NAME> --source browserRun --events crawl.started,crawl.updated,crawl.finished
```

Representative event message:

```json
{
  "type": "cf.r2.bucket.created",
  "source": {
    "type": "r2"
  },
  "payload": {
    "name": "my-bucket",
    "jurisdiction": "default",
    "location": "WNAM",
    "storageClass": "Standard"
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

### Common schema fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | string | The event type identifier |
| `source` | object | Source-specific information like IDs and names |
| `metadata.accountId` | string | Your Cloudflare account ID |
| `metadata.eventSubscriptionId` | string | The subscription that triggered this event |
| `metadata.eventSchemaVersion` | number | The version of the event schema |
| `metadata.eventTimestamp` | string | ISO 8601 timestamp of the event |
| `payload` | object | Event-specific data |

### Sources and events

| Source | `source.type` (selector fields in `source`) | Events (`type` values) |
| --- | --- | --- |
| Access | `access` | `cf.access.application.created`, `cf.access.application.deleted` |
| Artifacts (account-level) | `artifacts` (`namespace`, `repoName`) | `cf.artifacts.repo.created`, `.deleted`, `.forked`, `.imported` |
| Artifacts (repository-level) | `artifacts.repo` (`namespace`, `repoName`) | `cf.artifacts.repo.pushed`, `.cloned`, `.fetched`, `.token.created`, `.token.revoked` |
| Browser Run | `browserRun` (account-level) | `cf.browserRun.crawl.started`, `.updated`, `.finished` |
| Email Sending | `email.sending` (`zoneId`, `domain`) | `cf.email.sending.message.delivered`, `.deferred`, `.bounced`, `.failed`, `.rejected`, `.complained` |
| R2 | `r2` | `cf.r2.bucket.created`, `cf.r2.bucket.deleted` |
| Super Slurper | `superSlurper`; `superSlurper.job` (`jobId`) | `cf.superSlurper.job.started`, `.paused`, `.resumed`, `.completed`, `.aborted`; `cf.superSlurper.job.object.migrated` |
| Vectorize | `vectorize` | `cf.vectorize.index.created`, `cf.vectorize.index.deleted` |
| Workers AI | `workersAi.model` (`modelName`) | `cf.workersAi.model.batch.queued`, `.succeeded`, `.failed` |
| Workers Builds | `workersBuilds.worker` (`workerName`) | `cf.workersBuilds.worker.build.started`, `.failed`, `.canceled`, `.succeeded` |
| Workers KV | `kv` | `cf.kv.namespace.created`, `cf.kv.namespace.deleted` |
| Workflows | `workflows.workflow` (`workflowName`) | `cf.workflows.workflow.instance.queued`, `.started`, `.paused`, `.errored`, `.terminated`, `.completed` |

### Source-specific payload highlights

| Event | Payload fields |
| --- | --- |
| `cf.access.application.*` | `id`, `name` |
| `cf.artifacts.repo.created/deleted` | `repoId`, `defaultBranch`, `description`, `readOnly`, `createdAt`, `updatedAt`, `lastPushAt` |
| `cf.artifacts.repo.pushed` | `ref`, `before`, `after`, `commits[]`, `totalCommitsCount`, `commitsTruncated` |
| `cf.artifacts.repo.token.created` | `tokenId`, `scope`, `expiresAt` |
| `cf.browserRun.crawl.started` | `jobId`, `createdAt`, `crawlConfig` |
| `cf.browserRun.crawl.updated` | `jobId`, `url`, `crawlStatus`, `httpStatus` |
| `cf.browserRun.crawl.finished` | `jobId`, `jobStatus`, `createdAt`, `finishedAt`, `total`, `completed`, `errored`, `skipped`, `crawlConfig` |
| `cf.email.sending.message.*` | `eventId`, `messageId`, `sender`, `recipient`, `subject`, `terminal`, `delivery`, plus `bounce` / `failure` / `rejection` / `complaint` |
| `cf.r2.bucket.created` | `name`, `jurisdiction`, `location`, `storageClass` |
| `cf.superSlurper.job.completed/aborted` | `id`, `totalObjectsCount`, `skippedObjectsCount`, `migratedObjectsCount`, `failedObjectsCount` |
| `cf.vectorize.index.created` | `name`, `description`, `createdAt`, `modifiedAt`, `dimensions`, `metric` |
| `cf.workersAi.model.batch.*` | `requestId` (failed adds `message`, `internalCode`, `httpCode`) |
| `cf.workersBuilds.worker.build.*` | `buildUuid`, `status`, `buildOutcome`, timestamps, `buildTriggerMetadata` |
| `cf.kv.namespace.*` | `id`, `name` |
| `cf.workflows.workflow.instance.*` | `versionId`, `instanceId` |

## Notes

- For `artifacts.repo` subscriptions use the short names (`pushed`, not `cf.artifacts.repo.pushed`) in `--events`; repository-level events need `--source-namespace` and `--source-repo-name`.
- Other source-specific flags: `--model-name` (Workers AI), `--worker-name` (Workers Builds), `--workflow-name` (Workflows), `--zone-id` and `--domain` (Email Sending). Browser Run is account-level and needs no selector.
- Email Sending subscriptions are scoped to one sending domain (apex or verified subdomain). Email Routing events are not published as Email Sending events.
- Product background: Workers KV and R2 are covered by the cloudflare-storage skill; Workflows are in [overview.md](../workflows/overview.md) (see also [event-subscriptions.md](../workflows/event-subscriptions.md)); Workers AI and Vectorize are in the cloudflare-ai skill (workers-ai, vectorize; https://developers.cloudflare.com/workers-ai/); Browser Run and Artifacts are documented at https://developers.cloudflare.com/browser-run/.
- Only one full example is reproduced; the source page has one JSON example per event with the same envelope.

## Related

- [Event subscriptions](./event-subscriptions.md)
- [Pull consumers](./pull-consumers.md)
- [Consumer API](./consumer-api.md)
