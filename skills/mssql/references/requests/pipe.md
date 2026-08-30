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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| stream | Writable | Writable stream in object mode. |

## Notes

- Migration (v6 → v7): `Request.pipe` now pipes a true Node.js stream for better backpressure support; requests in stream mode that pipe into other streams no longer pass errors up the stream chain.
- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills.

## Related

- [to-readable-stream](./to-readable-stream.md)
- [Request](./request.md)
- [Version Migration Changes](../migration/version-changes.md)
