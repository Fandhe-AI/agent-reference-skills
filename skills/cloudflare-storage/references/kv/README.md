# kv

| Name | Description | Path |
|------|-------------|------|
| Cloudflare Workers KV | Overview of the global, low-latency key-value store with binding and REST examples | [overview.md](./overview.md) |
| Workers Binding API | KVNamespace binding methods index (get, put, delete, list) | [api-overview.md](./api-overview.md) |
| Read key-value pairs | get() and getWithMetadata(): types, cacheTtl, multi-key reads | [api-read.md](./api-read.md) |
| Write key-value pairs | put(): expiration, metadata, write rate limits, bulk writes | [api-write.md](./api-write.md) |
| Delete key-value pairs | delete() and bulk delete | [api-delete.md](./api-delete.md) |
| List keys | list(): prefix, pagination with cursor, ordering | [api-list.md](./api-list.md) |
| How KV works | Central storage, global caching, eventual consistency | [how-kv-works.md](./how-kv-works.md) |
| KV bindings | Configure and use KV bindings in Workers and Durable Objects | [kv-bindings.md](./kv-bindings.md) |
| KV namespaces | kv_namespaces config fields and dashboard binding | [kv-namespaces.md](./kv-namespaces.md) |
| Getting started | Create a namespace, bind, read/write, deploy | [get-started.md](./get-started.md) |
| Environments | Per-environment KV namespaces with the same binding name | [environments.md](./environments.md) |
| Wrangler KV commands | wrangler kv namespace / key / bulk commands and flags | [kv-commands.md](./kv-commands.md) |
| Data location | Jurisdiction-restricted namespaces (eu, fedramp, us) | [data-location.md](./data-location.md) |
| Data security | Encryption at rest and in transit | [data-security.md](./data-security.md) |
| Limits | Free/Paid and KV Instant account and namespace limits | [limits.md](./limits.md) |
| Pricing | Operation, storage, and namespace pricing with billing FAQ | [pricing.md](./pricing.md) |
| Metrics and analytics | Dashboard metrics and GraphQL Analytics API datasets | [metrics-analytics.md](./metrics-analytics.md) |
| Event subscriptions | namespace.created / namespace.deleted events via Queues | [event-subscriptions.md](./event-subscriptions.md) |
| Release notes | Bulk API granular errors, new analytics API | [release-notes.md](./release-notes.md) |
| FAQ | Consistency, rate limits, access methods, billing | [faq.md](./faq.md) |
| Glossary | cacheTtl, KV namespace, metadata definitions | [glossary.md](./glossary.md) |
