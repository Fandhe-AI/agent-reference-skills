---
source: https://developers.cloudflare.com/durable-objects/reference/in-memory-state/
---

# In-memory state in a Durable Object

Each Durable Object has one active instance at a time, so instance variables persist while the object stays in memory. Initialize them from storage on first access.

## Signature / Usage

Adapted (not in the official docs): `fetch()` returns the cached value as a `Response`; the official snippet ends with only a comment and resolves to `undefined`. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.ctx.blockConcurrencyWhile(async () => {
      let stored = await this.ctx.storage.get("value");
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0;
    });
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // use this.value rather than storage
    return Response.json({ value: this.value });
  }
}
```

## Notes

- Corrected from the official docs: the `fetch()` handler contained only a comment, so it resolved to `undefined` instead of the `Response` a Durable Object `fetch()` must return; it now returns `Response.json({ value: this.value })`.
- Variables hold state only while the object is not evicted; persist anything important to storage.
- Instances defined in the same Worker code may share global memory. Using a global `value` instead of `this.value` would be incorrect because two `Counter` instances might share it. Avoid global variables.
- Storage has a built-in in-memory cache: `get("value")` for a recently read or written value returns instantly, so you can skip explicit initialization. For complex state, an explicit in-memory copy can be easier. Both approaches are valid.
- Memory usage: the Metrics tab shows V8 isolate memory (per isolate, which can host multiple objects, not per object); see the metrics page.

## Related

- [Access storage](./access-storage.md)
- [Durable Object lifecycle](./durable-object-lifecycle.md)
- [Metrics and analytics](./metrics-and-analytics.md)
- [DurableObjectState](./state.md)
