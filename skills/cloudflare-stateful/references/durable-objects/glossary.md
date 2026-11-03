---
source: https://developers.cloudflare.com/durable-objects/reference/glossary/
---

# Glossary

Definitions of key terms used in the Durable Objects documentation.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/durable-objects/api/namespace/

```js
const id = env.MY_DURABLE_OBJECT.newUniqueId();
const stub = env.MY_DURABLE_OBJECT.get(id);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| alarm | term | — | Mechanism to schedule the Durable Object to be woken up at a future time. |
| bookmark | term | — | Mostly alphanumeric string (e.g. `0000007b-0000b26e-00001538-0c3e87bb37b3db5cc52eedb93cd3b96b`) representing a SQLite database state at a point in time; lexically comparable. |
| Durable Object | term | — | An individual instance of a Durable Object class: globally unique (by ID), a global point of coordination, with private persistent storage. |
| Durable Object class | term | — | The JavaScript class defining RPC methods and handlers (`fetch`, `alarm`) and an optional constructor. All objects in a namespace share it. |
| Durable Objects | term | — | The product name or the collective noun. |
| input gate | term | — | While a storage operation runs, no events are delivered except storage completions; others wait for the input gate to open. |
| instance | term | — | See Durable Object. |
| KV API | term | — | Storage API methods that persist key-value data. |
| migration | term | — | Mapping from a class name to a runtime state; needed to create, rename, delete or transfer a class. |
| namespace | term | — | Logical collection of objects sharing one class; can hold tens of millions of objects; metrics are scoped per namespace. The binding name may not uniquely identify a namespace within an account; each has a unique namespace ID. |
| output gate | term | — | While a storage write is in progress, new outgoing network messages are held; if the write fails they are replaced with errors and the object restarts. |
| SQL API | term | — | Storage API methods that support SQL querying. |
| Storage API | term | — | Transactional, strongly consistent (serializable) storage private to each object; includes KV, SQL and PITR APIs. KV backend: KV API only. SQLite backend: KV, SQL and PITR APIs. |
| Storage Backend | term | — | Key-value (original default) or SQLite (opt-in for new classes). |
| stub | term | — | Object referring to a unique Durable Object in a namespace, used for RPC or `fetch`. |

## Related

- [What are Durable Objects?](./what-are-durable-objects.md)
- [SQLite-backed storage API](./sqlite-storage-api.md)
- [Rules of Durable Objects](./rules-of-durable-objects.md)
