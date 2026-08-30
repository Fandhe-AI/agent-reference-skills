---
source: https://tediousjs.github.io/node-mssql/#cancel
---

# cancel()

Cancel currently executing request. Return `true` if cancellation packet was send successfully.

## Signature / Usage

```javascript
const request = new sql.Request()
request.query('waitfor delay \'00:00:05\'; select 1 as number', (err, result) => {
    console.log(err instanceof sql.RequestError)  // true
    console.log(err.message)                      // Cancelled.
    console.log(err.code)                         // ECANCEL

    // ...
})

request.cancel()
```

## Notes

- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills.

## Related

- [Request](./request.md)
- [query](./query.md)
