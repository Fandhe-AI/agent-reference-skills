---
source: https://developers.cloudflare.com/workers/wrangler/commands/queues/
---

# Queues

Manage your Workers Queues configurations using Wrangler.

## Signature / Usage

```sh
npx wrangler queues list
npx wrangler queues create <NAME>
npx wrangler queues update <NAME>
npx wrangler queues delete <NAME>
npx wrangler queues info <NAME>
npx wrangler queues consumer add <QUEUE-NAME> <SCRIPT-NAME>
npx wrangler queues consumer remove <QUEUE-NAME> <SCRIPT-NAME>
npx wrangler queues consumer list <QUEUE-NAME>
npx wrangler queues consumer http add <QUEUE-NAME>
npx wrangler queues consumer http remove <QUEUE-NAME>
npx wrangler queues consumer http list <QUEUE-NAME>
npx wrangler queues consumer worker add <QUEUE-NAME> <SCRIPT-NAME>
npx wrangler queues consumer worker remove <QUEUE-NAME> <SCRIPT-NAME>
npx wrangler queues consumer worker list <QUEUE-NAME>
npx wrangler queues pause-delivery <NAME>
npx wrangler queues resume-delivery <NAME>
npx wrangler queues purge <NAME>
npx wrangler queues subscription create <QUEUE>
npx wrangler queues subscription list <QUEUE>
npx wrangler queues subscription get <QUEUE>
npx wrangler queues subscription delete <QUEUE>
npx wrangler queues subscription update <QUEUE>
```

Descriptions:

- `queues list`: List queues
- `queues create`: Create a queue
- `queues update`: Update a queue
- `queues delete`: Delete a queue
- `queues info`: Get queue information
- `queues consumer add`: Add a Queue Worker Consumer
- `queues consumer remove`: Remove a Queue Worker Consumer
- `queues consumer list`: List consumers for a queue
- `queues consumer http add`: Add a Queue HTTP Pull Consumer
- `queues consumer http remove`: Remove a Queue HTTP Pull Consumer
- `queues consumer http list`: List HTTP pull consumers for a queue
- `queues consumer worker add`: Add a Queue Worker Consumer
- `queues consumer worker remove`: Remove a Queue Worker Consumer
- `queues consumer worker list`: List worker consumers for a queue
- `queues pause-delivery`: Pause message delivery for a queue
- `queues resume-delivery`: Resume message delivery for a queue
- `queues purge`: Purge messages from a queue
- `queues subscription create`: Create a new event subscription for a queue
- `queues subscription list`: List event subscriptions for a queue
- `queues subscription get`: Get details about a specific event subscription
- `queues subscription delete`: Delete an event subscription from a queue
- `queues subscription update`: Update an existing event subscription

## Options / Props

### `queues list`

| Flag | Type | Description |
| --- | --- | --- |
| `--page` | number | Page number for pagination |

### `queues create`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | The name of the queue |
| `--jurisdiction` | string | The jurisdiction of the queue |
| `--delivery-delay-secs` | number | How long a published message should be delayed for, in seconds. Must be between 0 and 86400 |
| `--message-retention-period-secs` | number | How long to retain a message in the queue, in seconds. Must be between 60 and 86400 if on free tier, otherwise must be between 60 and 1209600 |

### `queues update`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | The name of the queue |
| `--delivery-delay-secs` | number | How long a published message should be delayed for, in seconds. Must be between 0 and 86400 |
| `--message-retention-period-secs` | number | How long to retain a message in the queue, in seconds. Must be between 60 and 86400 if on free tier, otherwise must be between 60 and 1209600 |

### `queues delete` / `queues info` / `queues pause-delivery` / `queues resume-delivery`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | The name of the queue |

### `queues consumer add` / `queues consumer worker add`

| Flag | Type | Description |
| --- | --- | --- |
| `<QUEUE-NAME>` | string (required) | Name of the queue to configure |
| `<SCRIPT-NAME>` | string (required) | Name of the consumer script |
| `--batch-size` | number | Maximum number of messages per batch |
| `--batch-timeout` | number | Maximum number of seconds to wait to fill a batch with messages |
| `--message-retries` | number | Maximum number of retries for each message |
| `--dead-letter-queue` | string | Queue to send messages that failed to be consumed |
| `--max-concurrency` | number | The maximum number of concurrent consumer Worker invocations. Must be a positive integer |
| `--retry-delay-secs` | number | The number of seconds to wait before retrying a message |

### `queues consumer remove` / `queues consumer worker remove`

| Flag | Type | Description |
| --- | --- | --- |
| `<QUEUE-NAME>` | string (required) | Name of the queue to configure |
| `<SCRIPT-NAME>` | string (required) | Name of the consumer script |

### `queues consumer list` / `queues consumer worker list` / `queues consumer http list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<QUEUE-NAME>` | string (required) | — | Name of the queue |
| `--json` | boolean | false | Output in JSON format |

### `queues consumer http add`

| Flag | Type | Description |
| --- | --- | --- |
| `<QUEUE-NAME>` | string (required) | Name of the queue for the consumer |
| `--batch-size` | number | Maximum number of messages per batch |
| `--message-retries` | number | Maximum number of retries for each message |
| `--dead-letter-queue` | string | Queue to send messages that failed to be consumed |
| `--visibility-timeout-secs` | number | The number of seconds a message will wait for an acknowledgement before being returned to the queue. |
| `--retry-delay-secs` | number | The number of seconds to wait before retrying a message |

### `queues consumer http remove`

| Flag | Type | Description |
| --- | --- | --- |
| `<QUEUE-NAME>` | string (required) | Name of the queue for the consumer |

### `queues purge`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | The name of the queue |
| `--force` | boolean | Skip the confirmation dialog and forcefully purge the Queue |

### `queues subscription create`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<QUEUE>` | string (required) | — | The name of the queue to create the subscription for |
| `--source` | string (required) | — | The event source type |
| `--events` | string (required) | — | Comma-separated list of event types to subscribe to (for artifacts.repo, use pushed, not cf.artifacts.repo.pushed) |
| `--name` | string | — | Name for the subscription (auto-generated if not provided) |
| `--enabled` | boolean | true | Whether the subscription should be active |
| `--model-name` | string | — | Workers AI model name (required for workersAi.model source) |
| `--worker-name` | string | — | Worker name (required for workersBuilds.worker source) |
| `--workflow-name` | string | — | Workflow name (required for workflows.workflow source) |
| `--zone-id` | string | — | Zone ID (required for email.sending source) |
| `--domain` | string | — | Sending domain — zone apex or verified subdomain (required for email.sending source) |
| `--source-namespace` | string | — | Artifacts namespace (required for artifacts.repo source) |
| `--source-repo-name` | string | — | Artifacts repository name (required for artifacts.repo source) |

### `queues subscription list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<QUEUE>` | string (required) | — | The name of the queue to list subscriptions for |
| `--page` | number | 1 | Page number for pagination |
| `--per-page` | number | 20 | Number of subscriptions per page |
| `--json` | boolean | false | Output in JSON format |

### `queues subscription get`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<QUEUE>` | string (required) | — | The name of the queue |
| `--id` | string (required) | — | The ID of the subscription to retrieve |
| `--json` | boolean | false | Output in JSON format |

### `queues subscription delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<QUEUE>` | string (required) | — | The name of the queue |
| `--id` | string (required) | — | The ID of the subscription to delete |
| `--force` (alias `--y`) | boolean | false | Skip confirmation |

### `queues subscription update`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<QUEUE>` | string (required) | — | The name of the queue |
| `--id` | string (required) | — | The ID of the subscription to update |
| `--name` | string | — | New name for the subscription |
| `--events` | string | — | Comma-separated list of event types to subscribe to |
| `--enabled` | boolean | — | Whether the subscription should be active |
| `--json` | boolean | false | Output in JSON format |

## Notes

- `queues consumer add|remove|list` and `queues consumer worker add|remove|list` have identical flags and descriptions on the official page.
- The official page's `queues subscription create` flag list covers sources `workersAi.model`, `workersBuilds.worker`, `workflows.workflow`, `email.sending`, and `artifacts.repo`.
- Queue producer/consumer runtime APIs (`queue()` handler, `env.QUEUE.send`) belong to the cloudflare-workers skill.
- Each command also accepts the global flags; see the global flags page.

## Related

- [Artifacts](./artifacts.md)
- [Global flags](./global-flags.md)
