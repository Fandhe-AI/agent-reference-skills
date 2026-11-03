---
source: https://developers.cloudflare.com/workers/runtime-apis/handlers/
---

# Handlers

Handlers are methods on Workers that can receive and process external inputs, and can be invoked from outside your Worker.

## Signature / Usage

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

## Options / Props

| Handler | Documentation |
|---------|---------------|
| Alarm Handler | cloudflare-stateful skill; https://developers.cloudflare.com/durable-objects/api/alarms/ |
| Connect Handler | [connect.md](./connect.md) |
| Email Handler | https://developers.cloudflare.com/email-service/api/route-emails/email-handler/ |
| Fetch Handler | [fetch.md](./fetch.md) |
| Queue Handler | cloudflare-stateful skill; https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer |
| Scheduled Handler | [scheduled.md](./scheduled.md) |
| Tail Handler | [tail.md](./tail.md) |

## Notes

- Alarm, Email and Queue handlers belong to other Cloudflare products and are not covered in this skill; follow the URLs above.
- Python Workers: when you write Workers in Python (https://developers.cloudflare.com/workers/languages/python/), handlers are placed in a class named `Default` that extends the `WorkerEntrypoint` class (importable from the `workers` SDK module).

## Related

- [Fetch Handler](./fetch.md)
- [Scheduled Handler](./scheduled.md)
- [Tail Handler](./tail.md)
- [Connect Handler](./connect.md)
- [Context (ctx)](./context.md)
- [RPC / service bindings](../bindings-rpc/README.md)
