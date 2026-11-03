---
source: https://developers.cloudflare.com/workers/reference/how-workers-works/
---

# How Workers works

How the Workers runtime (V8 isolates) differs from browsers and Node.js: isolates, compute per request, distributed execution. Also lists supported protocols.

## Signature / Usage

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

Supported protocols (https://developers.cloudflare.com/workers/reference/protocols/):

| Protocol | Inbound | Outbound |
| --- | --- | --- |
| HTTP / HTTPS | `fetch()` handler | `fetch()` API |
| Direct TCP sockets | Handle TCP connections forwarded from another Worker via the `connect()` handler (handling inbound TCP connections is "coming soon") | Outbound TCP via the `connect()` API |
| WebSockets | Accept incoming WebSocket connections using the `WebSocket` API | |
| HTTP/3 (QUIC) | Enable on your zone in **Speed** > **Settings** > **Protocol Optimization** | |
| SMTP | Email Workers to process and forward email | Email Workers |

## Notes

- Isolates: V8 runs hundreds or thousands of isolates per runtime instance, each with fully isolated memory; they start about a hundred times faster than a Node process on a container/VM and avoid VM cold starts.
- An isolate may be evicted for machine resource limits, suspicious scripts, or individual resource limits, so do not keep mutable state in global scope unless you account for this.
- Compute per request: a request to your `*.workers.dev` subdomain or managed domain invokes the `fetch()` handler; return a `Response`.
- Distributed execution: one instance can handle concurrent requests on a single-threaded event loop and there is no guarantee two requests reach the same instance, so do not use or mutate global state.
- Also covers https://developers.cloudflare.com/workers/reference/protocols/ (table above).
- Docs inconsistency: the Security model page says Workers talk to the outside world "only via HTTP", while this protocols table lists outbound TCP via `connect()`.

## Related

- [security-model.md](./security-model.md)
- [limits.md](./limits.md)
- [migrate-to-module-workers.md](./migrate-to-module-workers.md)
- [../handlers-context/README.md](../handlers-context/README.md)
- [../web-apis/README.md](../web-apis/README.md)
