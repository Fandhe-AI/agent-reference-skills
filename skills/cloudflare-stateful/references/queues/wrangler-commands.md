---
source: https://developers.cloudflare.com/queues/reference/wrangler-commands/
---

# Wrangler commands for Queues

Index of `wrangler queues` commands. Queues commands use REST APIs to interact with the control plane.

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

## Options / Props

| Command | Description | Key flags |
| --- | --- | --- |
| `queues list` | List queues | `--page` |
| `queues create` | Create a queue | `--jurisdiction`, `--delivery-delay-secs`, `--message-retention-period-secs` |
| `queues update` | Update a queue | `--delivery-delay-secs`, `--message-retention-period-secs` |
| `queues delete` | Delete a queue | — |
| `queues info` | Get queue information | — |
| `queues consumer add` / `consumer worker add` | Add a Queue Worker Consumer | `--batch-size`, `--batch-timeout`, `--message-retries`, `--dead-letter-queue`, `--max-concurrency`, `--retry-delay-secs` |
| `queues consumer remove` / `consumer worker remove` | Remove a Queue Worker Consumer | — |
| `queues consumer list` / `consumer worker list` / `consumer http list` | List consumers | `--json` |
| `queues consumer http add` | Add a Queue HTTP Pull Consumer | `--batch-size`, `--message-retries`, `--dead-letter-queue`, `--visibility-timeout-secs`, `--retry-delay-secs` |
| `queues consumer http remove` | Remove a Queue HTTP Pull Consumer | — |
| `queues pause-delivery` / `resume-delivery` | Pause or resume delivery | — |
| `queues purge` | Purge messages | `--force` |
| `queues subscription create` | Create an event subscription | `--source`, `--events`, `--name`, `--enabled`, and source-specific flags |
| `queues subscription list` / `get` / `delete` / `update` | Manage event subscriptions | `--page`, `--per-page`, `--json`, `--id`, `--force`, `--name`, `--events`, `--enabled` |

## Notes

- Full flag tables with types and defaults are in the cloudflare-wrangler skill (commands/queues.md); this page is an index only.
- `--message-retention-period-secs` must be between 60 and 86400 on the free tier, otherwise 60 to 1209600. Source inconsistency: the limits page says retention on Workers Free is non-configurable at 24 hours.
- Every command also accepts Wrangler's global flags. Their short aliases are single-dash (`-v`, `-c`, `-e`); the official page prints them as `--v`, `--c`, `--e`, and `--y` for `--force` on `subscription delete`, which is not the real short-alias form.
- Because these commands call the control-plane REST API they act on the real account, not on a local `wrangler dev` simulation.

## Related

- [Configure Queues](./configure-queues.md)
- [Pause and Purge](./pause-purge.md)
- [Pull consumers](./pull-consumers.md)
- [Manage event subscriptions](./event-subscriptions.md)
