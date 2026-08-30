---
source: https://tediousjs.github.io/node-mssql/#events
---

# Connection Events

Internally, each `ConnectionPool` instance is a separate pool of TDS connections. Once you create a new `Request`/`Transaction`/`Prepared Statement`, a new TDS connection is acquired from the pool and reserved for the desired action. Once the action is complete, the connection is released back to the pool. Connection health check is built-in so once a dead connection is discovered, it is immediately replaced with a new one.

**IMPORTANT**: Always attach an `error` listener to a created connection. Whenever something goes wrong with the connection it will emit an error, and if there is no listener it will crash your application with an uncaught error.

## Signature / Usage

```javascript
const pool = new sql.ConnectionPool({ /* config */ })
```

## Options / Props

| Event | Description |
|---|---|
| `error(err)` | Dispatched on connection error. |

## Notes

- Not attaching an `error` listener will crash the application on an uncaught error when the connection fails.

## Related

- [connect](./connect.md)
- [close](./close.md)
