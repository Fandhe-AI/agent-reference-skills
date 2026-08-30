---
source: https://tediousjs.github.io/node-mssql/#longer-example-connect-via-config-object
---

# Longer Example: Connect via Config Object

Assuming you have set the appropriate environment variables, you can construct a config object and connect with it.

## Signature / Usage

```javascript
const sql = require('mssql')

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

(async () => {
 try {
  // make sure that any items are correctly URL encoded in the connection string
  await sql.connect(sqlConfig)
  const result = await sql.query`select * from mytable where id = ${value}`
  console.dir(result)
 } catch (err) {
  // ... error checks
 }
})()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `user` | `string` | Login user name |
| `password` | `string` | Login password |
| `database` | `string` | Database name |
| `server` | `string` | Server hostname |
| `pool.max` | `number` | Max pool size |
| `pool.min` | `number` | Min pool size |
| `pool.idleTimeoutMillis` | `number` | Idle timeout before releasing a pooled connection |
| `options.encrypt` | `boolean` | Encrypt connection, required for Azure |
| `options.trustServerCertificate` | `boolean` | Trust self-signed certificates |

## Related

- [Short Example: Use Connect String](./connect-string-example.md)
- [Configuration](../configuration/general-options.md)
