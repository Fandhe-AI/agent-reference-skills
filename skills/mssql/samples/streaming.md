---
source: https://tediousjs.github.io/node-mssql/#streaming
---

# Streaming

Stream rows from a large result set instead of buffering the whole recordset in memory, and back-pressure it in batches.

```javascript
const sql = require('mssql')

sql.connect(config, err => {
    // ... error checks

    const request = new sql.Request()
    request.stream = true // You can set streaming differently for each request

    request.on('recordset', columns => {
        // Emitted once for each recordset in a query
    })

    request.on('row', row => {
        // Emitted for each row in a recordset
    })

    request.on('rowsaffected', rowCount => {
        // Emitted for each `INSERT`, `UPDATE` or `DELETE` statement
        // Requires NOCOUNT to be OFF (default)
    })

    request.on('error', err => {
        // May be emitted multiple times
    })

    request.on('done', result => {
        // Always emitted as the last one
    })

    request.query('select * from verylargetable') // or request.execute(procedure)
})

sql.on('error', err => {
    // ... error handler
})
```

Back off processing in batches of 15 rows using `request.pause()` / `request.resume()`:

```javascript
let rowsToProcess = [];
request.on('row', row => {
  rowsToProcess.push(row);
  if (rowsToProcess.length >= 15) {
    request.pause();
    processRows();
  }
});
request.on('done', () => {
    processRows();
});

function processRows() {
  // process rows
  rowsToProcess = [];
  request.resume();
}
```

## Notes

- Set `request.stream = true` before calling `.query()` / `.execute()`; event listeners must be attached before the query completes (they may be attached while in-flight)
- `'error'` may fire multiple times per request; `'done'` is always the final event
- `request.pause()` / `request.resume()` prevent memory exhaustion when consuming very large result sets
