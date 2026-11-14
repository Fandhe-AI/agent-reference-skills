---
source: https://developers.cloudflare.com/durable-objects/api/namespace/
---

# DurableObjectNamespace

A Durable Object namespace is the set of Durable Objects backed by one class (one namespace per class). The `DurableObjectNamespace` binding is read from `env` and is used to create IDs and obtain stubs.

## Signature / Usage

```js
import { DurableObject } from "cloudflare:workers";

// Durable Object
export class MyDurableObject extends DurableObject {
  ...
}

// Worker
export default {
  async fetch(request, env) {
    // A stub is a client Object used to invoke methods defined by the Durable Object
    const stub = env.MY_DURABLE_OBJECT.getByName("foo");
    ...
  }
}
```

```js
const fooId = env.MY_DURABLE_OBJECT.idFromName("foo");
const id = env.MY_DURABLE_OBJECT.newUniqueId();
const euId = env.MY_DURABLE_OBJECT.newUniqueId({ jurisdiction: "eu" });
const stub = env.MY_DURABLE_OBJECT.get(id);
const fooStub = env.MY_DURABLE_OBJECT.getByName("foo");
const subnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");
const euStub = subnamespace.getByName("foo");
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `idFromName(name)` | `(string) => DurableObjectId` | — | Deterministic ID for a named object. Most common way to address an object. |
| `newUniqueId(options?)` | `({ jurisdiction?: string }?) => DurableObjectId` | — | Random unique ID. Store it as a string (KV, another object, a cookie) to reach the same object later. |
| `idFromString(id)` | `(string) => DurableObjectId` | — | Rebuilds an ID from a string made by `toString()`. Throws if the ID is invalid, e.g. not created from the same namespace. |
| `get(id, options?)` | `(DurableObjectId, { locationHint?: string, retry?: { maxRetries?: number, timeoutMs?: number } }?) => DurableObjectStub` | — | Returns a stub immediately, often before a connection is established. `retry` sets the retry limits for calls through the stub: `maxRetries` integer 0 to 10 (default 4), `timeoutMs` integer 500 to 60000 (default 10000). |
| `getByName(name, options?)` | `(string, { locationHint?: string, retry?: { maxRetries?: number, timeoutMs?: number } }?) => DurableObjectStub` | — | Returns a stub for the named object immediately. Takes the same options as `get`. |
| `jurisdiction(jurisdiction)` | `(string) => DurableObjectNamespace` | — | Subnamespace whose IDs and references are restricted to the jurisdiction. |

## Notes

- Corrected from the official docs (the source ties creation to making a stub): creating an ID or a stub does not create the object; it starts when the first request or RPC method call reaches it through the stub.
- `newUniqueId` gives lower request latency at first use: for name-derived IDs the system must check that no instance was created elsewhere, which can take up to a few hundred milliseconds. After first use the location is cached around the world.
- Idiomatic examples use `getByName`; `idFromName` + `get` are equivalent when you need the ID.
- Location hints and jurisdictions are documented in the data-location page; `wrangler` binding configuration is in cloudflare-wrangler, and the Agents SDK built on Durable Objects is in cloudflare-agents.
- `retry` is a newer option on `get()` and `getByName()`; see the automatic-retries page.
- Source: https://developers.cloudflare.com/durable-objects/api/namespace/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [DurableObjectId](./id.md)
- [DurableObjectStub](./stub.md)
- [Automatic retries](./automatic-retries.md)
- [Data location](./data-location.md)
- [Create stubs and send requests](./create-stubs-and-send-requests.md)
