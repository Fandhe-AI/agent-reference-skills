# durable-objects

| Name | Description | Path |
|------|-------------|------|
| Overview | Durable Objects product overview: stateful serverless compute with storage | [overview.md](./overview.md) |
| What are Durable Objects? | Concepts, highlights, features, actor model | [what-are-durable-objects.md](./what-are-durable-objects.md) |
| Lifecycle | States, hibernation criteria, eviction, shutdown behavior | [durable-object-lifecycle.md](./durable-object-lifecycle.md) |
| Get started | Create, bind, run and deploy a first Durable Object | [get-started.md](./get-started.md) |
| Base class | DurableObject base class handlers: fetch, alarm, WebSocket handlers, ctx, env | [base-class.md](./base-class.md) |
| DurableObjectState | ctx: waitUntil, blockConcurrencyWhile, WebSocket hibernation methods, abort, id, storage | [state.md](./state.md) |
| SQLite-backed storage API | SQL API, PITR, sync and async KV API, alarms, transactions | [sqlite-storage-api.md](./sqlite-storage-api.md) |
| Legacy KV storage API | KV-backed Durable Object storage (legacy) | [legacy-kv-storage-api.md](./legacy-kv-storage-api.md) |
| Alarms | Schedule future wake-ups with at-least-once alarm() handler | [alarms.md](./alarms.md) |
| DurableObjectId | 64-digit hex ID, name, jurisdiction, toString/equals | [id.md](./id.md) |
| DurableObjectNamespace | idFromName, newUniqueId, idFromString, get, getByName, jurisdiction | [namespace.md](./namespace.md) |
| DurableObjectStub | Client for RPC and fetch calls, id and name, E-order semantics | [stub.md](./stub.md) |
| WebGPU | WebGPU API subset for Durable Objects in local development only | [webgpu.md](./webgpu.md) |
| Access storage | SQLite class creation, initialization, deleteAll, typed SQL, indexes, vs D1 | [access-storage.md](./access-storage.md) |
| Create stubs and send requests | Invoke RPC methods or fetch handler via stubs | [create-stubs-and-send-requests.md](./create-stubs-and-send-requests.md) |
| Error handling | Retryable and overloaded errors, stub recreation, backoff | [error-handling.md](./error-handling.md) |
| Rules of Durable Objects | Design guidelines: sharding, storage, gates, RPC, WebSockets, alarms, testing | [rules-of-durable-objects.md](./rules-of-durable-objects.md) |
| WebSockets | Hibernation and standard WebSocket APIs, attachments, batching | [websockets.md](./websockets.md) |
| Class exports | Declarative exports field: create, delete, rename, transfer classes | [migrations.md](./migrations.md) |
| Class migrations (legacy) | Legacy migrations array with new, deleted, renamed, transferred classes | [class-migrations-legacy.md](./class-migrations-legacy.md) |
| Environments | Per-environment Durable Object bindings and script_name | [environments.md](./environments.md) |
| Data location | Jurisdictions and location hints | [data-location.md](./data-location.md) |
| Data security | Encryption at rest and in transit, compliance | [data-security.md](./data-security.md) |
| In-memory state | Instance variables, initialization from storage, built-in cache | [in-memory-state.md](./in-memory-state.md) |
| Code updates | deferred and immediate code update strategies, max_delay | [code-updates.md](./code-updates.md) |
| Limits | Account, storage, SQL, CPU, outbound body and wall time limits | [limits.md](./limits.md) |
| Pricing | Compute and storage billing with worked examples | [pricing.md](./pricing.md) |
| Known issues | Global uniqueness, code updates, development tool limitations | [known-issues.md](./known-issues.md) |
| FAQ | Pricing, limits, CPU, SQLITE_FULL, log identification | [faq.md](./faq.md) |
| Glossary | Definitions of Durable Objects terms | [glossary.md](./glossary.md) |
| Metrics and analytics | Dashboard metrics, GraphQL datasets, memory usage, logs | [metrics-and-analytics.md](./metrics-and-analytics.md) |
| Data Studio | Dashboard UI to view and edit SQLite-backed object data | [data-studio.md](./data-studio.md) |
| Troubleshooting | Debugging and common errors (overload, resets, storage timeouts) | [troubleshooting.md](./troubleshooting.md) |
