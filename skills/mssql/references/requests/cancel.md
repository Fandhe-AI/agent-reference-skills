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

- A cancelled stream emits an `error` event with code `ECANCEL`, followed by `done`.
- With the `msnodesqlv8` driver, a request that is already running can only be cancelled from msnodesqlv8 5.6. Earlier versions can cancel a paused stream, but let any other running request run to the end and complete as if `cancel()` had not been called. A paused stream is cancelled once the driver stops reading, at the end of a batch of 50 rows or the start of the next result set; a query that ends first, or times out, completes as cancelled.
- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills.

## Related

- [Request](./request.md)
- [query](./query.md)
