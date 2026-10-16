---
source: https://tediousjs.github.io/node-mssql/#toreadablestream
---

# toReadableStream

Convert request to a Node.js ReadableStream.

## Signature / Usage

```javascript
const { pipeline } = require('stream')
const request = new sql.Request()
const readableStream = request.toReadableStream()
pipeline(readableStream, transformStream, writableStream)
request.query('select * from mytable')
```

OR if you wanted to increase the highWaterMark of the read stream to buffer more rows in memory:

```javascript
const { pipeline } = require('stream')
const request = new sql.Request()
const readableStream = request.toReadableStream({ highWaterMark: 100 })
pipeline(readableStream, transformStream, writableStream)
request.query('select * from mytable')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| highWaterMark | number | Buffer size (in rows) for the read stream. Optional. |

## Notes

- The readable stream is destroyed with the request's first error. Later errors are still emitted on the request, but not on the stream.
- If the readable stream is destroyed before the request finishes (for example because a later stream in the pipeline failed), the request still runs to the end and the rows it has left are discarded. Call `request.cancel()` to stop it early.
- With msnodesqlv8 before 5.6 that cancel does not stop it. The request is resumed as soon as its stream is destroyed, so that it does not keep its connection, and those versions can only cancel a paused request.
- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills.

## Related

- [pipe](./pipe.md)
- [Request](./request.md)
