---
source: https://developers.cloudflare.com/queues/event-subscriptions/, https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/
---

# Event subscriptions

Subscribe a queue to structured events published by Cloudflare products, and consume them with a Worker or an HTTP pull consumer.

## Signature / Usage

```bash
npx wrangler queues subscription create <queue-name> --source <source-type> --events <event1,event2> --<source-specific-option> <value>
```

```bash
npx wrangler queues subscription list <queue-name>
```

```bash
npx wrangler queues subscription delete <queue-name> --id <subscription-id>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--source` | string (required) | — | Event source type. |
| `--events` | string (required) | — | Comma-separated event types. |
| `--id` | string | — | Subscription ID, for `get` / `delete` / `update`. |

## Notes

- An event is a structured record of something happening in the account, such as a Workers AI batch request queued, a Worker build completing or an R2 bucket created. Once subscribed, the queue receives messages automatically.
- Dashboard: Queues > your queue > Subscriptions tab > Subscribe to events (name, source, events) to create; the same tab lists and deletes (... > Delete subscription).
- Deleting a subscription stops messages for those events immediately.
- Available sources and payload shapes are on the event schemas page.
- Flag tables are in the cloudflare-wrangler skill (commands/queues.md).

## Related

- [Events and schemas](./event-schemas.md)
- [Pull consumers](./pull-consumers.md)
- [Wrangler commands](./wrangler-commands.md)
