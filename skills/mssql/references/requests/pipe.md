---
source: https://tediousjs.github.io/node-mssql/#pipe-stream
---

# pipe (stream)

Sets request to `stream` mode and pulls all rows from all recordsets to a given stream.

## Signature / Usage

```javascript
const request = new sql.Request()
request.pipe(stream)
request.query('select * from mytable')
stream.on('error', err => {
    // ...
})
stream.on('finish', () => {
    // ...
})
```

The stream is destroyed with the request's first error, so listen for `error` on it as above. It does not emit `finish` after an error. The request still runs to the end, and its remaining rows are discarded.

If the stream fails or closes before the request finishes, or was already destroyed, the request also runs to the end and its remaining rows are discarded, rather than waiting for a stream that will not read any more. Call `request.cancel()` to stop it early, bearing in mind the msnodesqlv8 caveat under toReadableStream.

`pipe()` passes errors only to the stream it is given. If you pipe through more streams after that one, use `stream.pipeline()` with `toReadableStream` instead, so that every error reaches you:

```javascript
const { pipeline } = require('stream')
const request = new sql.Request()
pipeline(request.toReadableStream(), transformStream, writableStream, err => {
    // ...
})
request.query('select * from mytable')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| stream | Writable | Writable stream in object mode. |

## Notes

- Migration (v6 → v7): `Request.pipe` now pipes a true Node.js stream for better backpressure support; requests in stream mode that pipe into other streams no longer pass errors up the stream chain.
- Release notes: v12.7.7 fixed request errors not reaching the destination of `Request.pipe()`, and released a piped request when its destination fails.
- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills.

## Related

- [to-readable-stream](./to-readable-stream.md)
- [Request](./request.md)
- [Version Migration Changes](../migration/version-changes.md)
