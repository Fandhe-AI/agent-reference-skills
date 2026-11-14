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

### Handle canceled requests

- Cancellation can pass from a client through one Worker to another, for both HTTP and RPC service bindings. Both Workers can report Client Disconnected for the same request; this can also happen if the calling Worker aborts the call or cancels the response body. The status alone does not tell you which Worker canceled first or why.
- `await env.WORKER_B.fetch(request)` waits for response headers; the body may still be arriving when it returns. To send the response to your client, return the `Response`. To read it in your Worker, await the body reader (for example `await response.json()`). To discard it, run `await response.body?.cancel()` to release resources. A recorded HTTP `200` does not mean the whole body arrived.
- To cancel an operation when the client disconnects, pass `request.signal` to an API that accepts an `AbortSignal`. Check the `enable_request_signal` compatibility flag first; if you forward the incoming `Request`, also check `request_signal_passthrough`. For work that should continue after a disconnect, do not use that disconnect's abort signal: `waitUntil()` will not restart work canceled by a signal, and the runtime can still stop work when the request ends.
- To find out why a request was canceled, log the same request ID in both Workers (pass your own ID in a request header when calling the other Worker), start real-time logs for both Workers before testing, send one request that finishes and one that you cancel (for example by closing the browser tab), then match requests by ID and UTC time and compare `outcome`, HTTP status, and `exceptions`. Matching request IDs or cancellation counts do not tell you which Worker canceled first; if a log entry is missing, check logging settings, filters, sampling, and retention.
- Source: https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [service-bindings.md](./service-bindings.md)
- [service-bindings-rpc.md](./service-bindings-rpc.md)
- [rpc.md](./rpc.md)
