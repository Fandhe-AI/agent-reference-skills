# nodejs-compat

| Name | Description | Path |
| --- | --- | --- |
| Node.js compatibility | nodejs_compat flag, supported API table, stub modules, polyfills, nodejs_als | [overview.md](./overview.md) |
| assert | node:assert in strict assertion mode | [assert.md](./assert.md) |
| AsyncLocalStorage | AsyncLocalStorage and AsyncResource (node:async_hooks) | [asynclocalstorage.md](./asynclocalstorage.md) |
| Buffer | node:buffer without memory pool or allocUnsafe | [buffer.md](./buffer.md) |
| crypto / zlib | node:crypto exceptions and node:zlib import | [crypto-zlib.md](./crypto-zlib.md) |
| Diagnostics Channel | diagnostics_channel, TracingChannel, Tail Worker integration | [diagnostics-channel.md](./diagnostics-channel.md) |
| dns | node:dns via DNS over HTTPS (1.1.1.1) | [dns.md](./dns.md) |
| EventEmitter | node:events, captureRejections | [eventemitter.md](./eventemitter.md) |
| fs | Virtual file system: /bundle, /tmp, /dev | [fs.md](./fs.md) |
| http | node:http client/server, httpServerHandler, handleAsNodeRequest | [http.md](./http.md) |
| https | node:https client/server on fetch | [https.md](./https.md) |
| net | node:net Socket over cloudflare:sockets | [net.md](./net.md) |
| path | node:path utilities | [path.md](./path.md) |
| process | node:process env, stdio, cwd, nextTick | [process.md](./process.md) |
| Streams | node:stream Readable, Transform, pipeline | [streams.md](./streams.md) |
| StringDecoder | node:string_decoder legacy utility | [string-decoder.md](./string-decoder.md) |
| test | node:test MockTracker | [test.md](./test.md) |
| timers | node:timers setTimeout, setInterval, setImmediate | [timers.md](./timers.md) |
| tls | node:tls connect, TLSSocket | [tls.md](./tls.md) |
| url | domainToASCII, domainToUnicode | [url.md](./url.md) |
| util | promisify, callbackify, types, MIMEType | [util.md](./util.md) |
