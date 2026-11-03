# web-apis

| Name | Description | Path |
| --- | --- | --- |
| Fetch | Fetch API for HTTP subrequests inside a Worker, cache modes, Accept-Encoding handling | [fetch.md](./fetch.md) |
| Request | Request constructor, `cf` request options, `request.cf` properties, `cf.vary` | [request.md](./request.md) |
| Response | Response constructor, `encodeBody`, `webSocket`, body methods | [response.md](./response.md) |
| Headers | Headers API, `getAll()` for Set-Cookie, Workers differences | [headers.md](./headers.md) |
| Streams | Streams API overview, streaming and transforming response bodies | [streams.md](./streams.md) |
| ReadableStream | ReadableStream properties, methods, `tee`, `pipeTo`, `from` | [readablestream.md](./readablestream.md) |
| ReadableStream BYOBReader | Bring-your-own-buffer reader, `read`, `readAtLeast` | [readablestream-byob-reader.md](./readablestream-byob-reader.md) |
| ReadableStream DefaultReader | Default reader: `read`, `cancel`, `releaseLock` | [readablestream-default-reader.md](./readablestream-default-reader.md) |
| TransformStream | Identity TransformStream, IdentityTransformStream, FixedLengthStream | [transformstream.md](./transformstream.md) |
| WritableStream | WritableStream `abort` and `getWriter` | [writablestream.md](./writablestream.md) |
| WritableStream DefaultWriter | Writer `write`, `close`, `abort`, `releaseLock` | [writablestream-default-writer.md](./writablestream-default-writer.md) |
| Cache | Cache API (`caches.default`, `put`, `match`, `delete`) | [cache.md](./cache.md) |
| Encoding | TextEncoder and TextDecoder (UTF-8) | [encoding.md](./encoding.md) |
| Console | Supported, partial and no-op `console` methods | [console.md](./console.md) |
| EventSource | Server-sent events client, `fetcher` option, `EventSource.from` | [eventsource.md](./eventsource.md) |
| MessageChannel | MessageChannel and MessagePort within a single Worker | [messagechannel.md](./messagechannel.md) |
| Performance and timers | `performance.now()`, `timeOrigin`, timer security behavior | [performance.md](./performance.md) |
| Scheduler | `scheduler.wait()` await-able delay with AbortSignal | [scheduler.md](./scheduler.md) |
| Web Crypto | SubtleCrypto, DigestStream, supported algorithms | [web-crypto.md](./web-crypto.md) |
| WebSockets | WebSocketPair, accept, close behavior, binaryType | [websockets.md](./websockets.md) |
| TCP sockets | Outbound `connect()` from `cloudflare:sockets`, StartTLS | [tcp-sockets.md](./tcp-sockets.md) |
| HTMLRewriter | Streaming HTML parser/transformer with handlers and selectors | [html-rewriter.md](./html-rewriter.md) |
| WebAssembly (Wasm) | Wasm support, SIMD, threading, binary size, WASI | [webassembly.md](./webassembly.md) |
| Wasm in JavaScript | Import and instantiate a Wasm module from JS/TS | [webassembly-javascript.md](./webassembly-javascript.md) |
| Web standards | JS standards, global APIs, URL, Intl, navigator, File System Access | [web-standards.md](./web-standards.md) |
