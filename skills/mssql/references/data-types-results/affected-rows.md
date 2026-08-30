---
source: https://tediousjs.github.io/node-mssql/#affected-rows
---

# Affected Rows

If you're performing `INSERT`, `UPDATE` or `DELETE` in a query, you can read the number of affected rows.

## Signature / Usage

The `rowsAffected` variable is an array of numbers. Each number represents the number of affected rows by a single statement.

Example using Promises:

```javascript
const request = new sql.Request()
request.query('update myAwesomeTable set awesomness = 100').then(result => {
    console.log(result.rowsAffected)
})
```

Example using callbacks:

```javascript
const request = new sql.Request()
request.query('update myAwesomeTable set awesomness = 100', (err, result) => {
    console.log(result.rowsAffected)
})
```

Example using streaming:

In addition to the `rowsAffected` attribute on the `done` event, each statement emits the number of affected rows as it is completed.

```javascript
const request = new sql.Request()
request.stream = true
request.query('update myAwesomeTable set awesomness = 100')
request.on('rowsaffected', rowCount => {
    console.log(rowCount)
})
request.on('done', result => {
    console.log(result.rowsAffected)
})
```

## Notes

- Migration (v3 → v4): affected rows are now returned as an array (one number per SQL statement) instead of a single number.

## Related

- [Response Schema](./response-schema.md)
- [Version Migration Changes](../migration/version-changes.md)
