# Scheduled Workflows

Trigger workflows on a recurring schedule using QStash Schedules and cron expressions. Schedules can be created via the Upstash Console or programmatically with the QStash SDK.

## Signature / Usage

```typescript
import { Client } from "@upstash/qstash"

const client = new Client({ token: process.env.QSTASH_TOKEN! })

// Create a per-user weekly summary schedule
await client.schedules.create({
  scheduleId: `user-summary-${user.email}`,
  destination: "https://your-app.com/api/send-weekly-summary",
  body: JSON.stringify({ userId: user.id }),
  cron: "0 9 * * 1",  // Every Monday at 9 AM
})
```

```python
# Python (FastAPI)
from qstash import AsyncQStash

client = AsyncQStash("<QSTASH_TOKEN>")

await client.schedule.create_json(
  schedule_id=f"user-summary-{user.email}",
  destination="https://your-app.com/api/send-weekly-summary",
  body={"userId": user.id},
  cron="0 9 * * 1",
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scheduleId` | `string` | Unique identifier for the schedule; use a user-specific value for per-user schedules |
| `destination` | `string` | Workflow endpoint URL to call on each execution |
| `body` | `string \| object` | Payload sent to the workflow endpoint |
| `cron` | `string` | Cron expression defining the execution frequency |

## Notes

- Schedules are managed through QStash (`@upstash/qstash`), not `@upstash/workflow`
- When creating per-user schedules, always use a unique `scheduleId` (e.g., based on user email or ID) for management and observability
- Schedules can also be created manually in the Upstash Console under the QStash > Schedules section

## Related

- [client.trigger](./client-trigger.md)
- [overview](./overview.md)
