---
source: https://developers.cloudflare.com/workers/runtime-apis/
---

# Runtime APIs

The Workers runtime is designed to be JavaScript standards compliant and web-interoperable. Wherever possible, it uses web platform APIs, so that code can be reused across client and server, as well as across WinterCG JavaScript runtimes.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/runtime-apis/handlers/.

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

## Options / Props

| Section | Documentation |
|---------|---------------|
| Bindings (env) | https://developers.cloudflare.com/workers/runtime-apis/bindings/ |
| Cache | https://developers.cloudflare.com/workers/runtime-apis/cache/ |
| Console | https://developers.cloudflare.com/workers/runtime-apis/console/ |
| Context (ctx) | [context.md](./context.md) |
| Encoding | https://developers.cloudflare.com/workers/runtime-apis/encoding/ |
| EventSource | https://developers.cloudflare.com/workers/runtime-apis/eventsource/ |
| Fetch | https://developers.cloudflare.com/workers/runtime-apis/fetch/ |
| Handlers | [handlers-overview.md](./handlers-overview.md) |
| Headers | https://developers.cloudflare.com/workers/runtime-apis/headers/ |
| HTMLRewriter | https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/ |
| MessageChannel | https://developers.cloudflare.com/workers/runtime-apis/messagechannel/ |
| Node.js compatibility | https://developers.cloudflare.com/workers/runtime-apis/nodejs/ |
| Performance and timers | https://developers.cloudflare.com/workers/runtime-apis/performance/ |
| Remote-procedure call (RPC) | https://developers.cloudflare.com/workers/runtime-apis/rpc/ |
| Request | https://developers.cloudflare.com/workers/runtime-apis/request/ |
| Response | https://developers.cloudflare.com/workers/runtime-apis/response/ |
| Scheduler | https://developers.cloudflare.com/workers/runtime-apis/scheduler/ |
| Streams | https://developers.cloudflare.com/workers/runtime-apis/streams/ |
| TCP sockets | https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/ |
| Web Crypto | https://developers.cloudflare.com/workers/runtime-apis/web-crypto/ |
| Web standards | https://developers.cloudflare.com/workers/runtime-apis/web-standards/ |
| WebAssembly (Wasm) | https://developers.cloudflare.com/workers/runtime-apis/webassembly/ |
| WebSockets | https://developers.cloudflare.com/workers/runtime-apis/websockets/ |

## Notes

- Workers runtime features are compatible with a subset of Node.js APIs, and a compatibility date or compatibility flag can be set (https://developers.cloudflare.com/workers/configuration/compatibility-dates/).

## Related

- [Handlers overview](./handlers-overview.md)
- [Context (ctx)](./context.md)
- [Bindings and RPC](../bindings-rpc/README.md)
- [Web APIs](../web-apis/README.md)
