---
source: https://tediousjs.github.io/node-mssql/#short-example-use-connect-string
---

# Short Example: Use Connect String

Connect using a connection string and run a tagged-template query.

## Signature / Usage

```javascript
const sql = require('mssql')

(async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
        const result = await sql.query`select * from mytable where id = ${value}`
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
})()
```

## Notes

- If you're on Windows Azure, add `?encrypt=true` to your connection string.
- Parts of the connection URI should be correctly URL encoded so that the URI can be parsed correctly.

## Related

- [Longer Example: Connect via Config Object](./config-object-example.md)
- [Connection String Formats](../configuration/connection-string-formats.md)
