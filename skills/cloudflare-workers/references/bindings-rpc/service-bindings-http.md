---
source: https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/
---

# Service bindings: HTTP

Worker A with a Service binding to Worker B can forward a `Request` to Worker B by calling `fetch()` on the binding object, which invokes Worker B's `fetch()` handler.

## Signature / Usage

Worker B:

```js
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  }
}
```

Worker A forwards a request:

```js
export default {
	async fetch(request, env) {
		return await env.WORKER_B.fetch(request);
	},
};
```

## Notes

- If you construct a new request manually rather than forwarding an existing one, provide a valid and fully-qualified URL with a hostname:

```js
export default {
  async fetch(request, env) {
    // provide a valid URL
    let newRequest = new Request("https://valid-url.com", { method: "GET" });
    let response = await env.WORKER_B.fetch(newRequest);
    return response;
  }
};
```

- The binding configuration (`services` with `binding` and `service`) is the same as in [service-bindings.md](./service-bindings.md).

## Related

- [service-bindings.md](./service-bindings.md)
- [service-bindings-rpc.md](./service-bindings-rpc.md)
- [rpc.md](./rpc.md)
