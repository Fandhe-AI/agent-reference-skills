---
source: https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
---

# What are Durable Objects?

A Durable Object is a special kind of Cloudflare Worker that combines compute with storage. It is provisioned geographically close to where it is first requested, starts quickly, shuts down when idle, and you can have millions of them. Each has a globally-unique name and durable attached storage.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/

```js
const stub = env.MY_DURABLE_OBJECT.getByName("foo");
// Now the request is sent to the remote Durable Object.
const rpcResponse = await stub.sayHello();
```

## Notes

- Built on the Workers runtime: same code (JavaScript and WASM) and similar memory and CPU limits. Objects are implicitly created on first access and migrate among healthy servers.
- An object stays alive while requests are processed and for several seconds after being idle before hibernating, allowing in-memory caching across consecutive requests.
- Storage is durable, transactional, strongly consistent and private to the object. The page states up to 10 GB per object; its footnote says SQLite storage per object is currently 1 GB, to be raised to 10 GB at general availability. Check the limits page for the current figure.
- Single-threaded, cooperatively multi-tasked concurrency (like browser code). Each instance has a randomly generated or user-generated identifier.
- Scaling: no hard limit on objects per namespace; you can optionally influence location with a location hint. Durable Objects are not available in every Cloudflare data center (see https://where.durableobjects.live/).
- In-memory state resets when the object hibernates; persist anything needed later. Storage API has a key-value flavor and an SQL flavor; the SQLite backend gives both, the previous backend only key-value.
- The Alarms API wakes an object at a future time, combinable with in-memory state and storage to build queues, workflows or pipelines.
- WebSockets: both the Standard API and the Hibernation API are supported. RPC (Workers Remote-Procedure-Call) is supported.
- Actor model: each instance can be seen as an actor receiving messages (HTTP/RPC requests), running logic in its own single-threaded context, and sending messages (even to another object). Plan architecture around how much work one object can do (see the limits page).
- Many Cloudflare products use Durable Objects (blog posts listed on the official page, e.g. Cloudflare Queues, AI Gateway, Workers Builds, Workflows, D1).
- The Agents SDK is covered by the cloudflare-agents skill.

## Related

- [Overview](./overview.md)
- [Durable Object lifecycle](./durable-object-lifecycle.md)
- [In-memory state](./in-memory-state.md)
- [Limits](./limits.md)
- [Get started](./get-started.md)
