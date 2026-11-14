# BullMQ — Relay: Topics and patterns

Topic keypath rules, the `*` and `>` wildcard patterns, encoding values into topic segments, and topic design guidance.

## Signature / Usage

```
queues.emails.jobs.42.progress
tenants.acme.users.17.notifications
config.feature-flags
```

Encoding a value as a single topic segment:

```typescript
/**
 * Encodes any value as a single topic segment: only A-Z a-z 0-9 _ - and %
 * are left, so the result never contains ".", "*" or ">".
 */
function topicSegment(value: string | number): string {
  return encodeURIComponent(String(value)).replace(
    /[.!'()*~]/g,
    char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

const topic = [
  'queues',
  topicSegment('emails.eu'),
  'jobs',
  job.id,
  'progress',
].join('.');
// 'queues.emails%2Eeu.jobs.42.progress'
```

## Options / Props

Topic rules:

| Rule | Value |
| --- | --- |
| Separator | `.` |
| Segment | One or more of `A-Z a-z 0-9 _ - : %` |
| Max length | 512 bytes |
| Max depth | 16 segments |

Wildcards (valid in subscriptions only):

| Wildcard | Matches | Allowed |
| --- | --- | --- |
| `*` | Exactly one segment | In any position |
| `>` | One or more trailing segments | Only as the last segment |

| Pattern | Matches | Does not match |
| --- | --- | --- |
| `orders.42.status` | `orders.42.status` | `orders.42`, `orders.42.status.x` |
| `orders.*.status` | `orders.42.status`, `orders.7.status` | `orders.42.items.status` |
| `orders.>` | `orders.42`, `orders.42.status` | `orders` |
| `*.42.status` | `orders.42.status`, `invoices.42.status` | `orders.43.status` |
| `tenants.acme.>` | everything under `tenants.acme` | `tenants.other.users` |
| `>` | every topic | |

## Notes

- Empty segments (`a..b`, `.a`, `a.`) are invalid. Publishing to an invalid topic or subscribing to an invalid pattern rejects with a `RelayError` (codes `InvalidTopic` and `InvalidPattern`). The rules are enforced by the datastore, so every BullMQ runtime accepts and rejects the same topics.
- The hierarchy only exists in the names: a message published to `orders.42.status` is not delivered to a subscription to `orders.42`; subscribe to `orders.42.>`. You always publish to a concrete topic.
- Numeric ids and UUIDs are valid segments as they are; percent-encode anything else (`decodeURIComponent` reverses it). Never put unencoded user input in a topic: a value containing `.` creates extra levels and a subscription built from it could observe more than intended.
- Design guidance: put the most general segment first; keep identifiers in their own segment; use one topic per resource when receivers care about specific resources; subscribe as narrowly as needed (every matching message is written to the node's inbox, including ones the handler ignores); prefer exact topics for per-resource subscriptions (a direct lookup, whereas wildcard patterns are matched one by one against publishes whose first segment they could match); use namespaces, not topic prefixes, to isolate environments.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/topics-and-patterns.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/topics-and-patterns

## Related

- [getting-started.md](./getting-started.md)
- [messages.md](./messages.md)
- [retained-messages.md](./retained-messages.md)
- [Relay: topics and patterns (official, v6.7.6)](https://docs.bullmq.io/guide/relay/topics-and-patterns)
