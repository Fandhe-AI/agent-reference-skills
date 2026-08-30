---
source: https://tediousjs.github.io/node-mssql/#windows-authentication-example-using-msnodesqlv8
---

# Windows Authentication Example Using MSNodeSQLv8

Connect with Windows (trusted) authentication using the MSNodeSQLv8 driver.

## Signature / Usage

```javascript
const sql = require('mssql/msnodesqlv8');

const config = {
  server: "MyServer",
  database: "MyDatabase",
  options: {
    trustedConnection: true, // Set to true if using Windows Authentication
    trustServerCertificate: true, // Set to true if using self-signed certificates
  },
  // driver: "ODBC Driver 18 for SQL Server", // Uncomment to use specific driver
};

(async () => {
  try {
    await sql.connect(config);
    const result = await sql.query`select TOP 10 * from MyTable`;
    console.dir(result);
  } catch (err) {
    console.error(err);
  }
})();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server` | `string` | Server hostname |
| `database` | `string` | Database name |
| `options.trustedConnection` | `boolean` | Use Windows Authentication |
| `options.trustServerCertificate` | `boolean` | Trust self-signed certificates |
| `driver` | `string` | Specific ODBC driver name (optional) |

## Notes

- Requires the MSNodeSQLv8 driver: `npm install mssql msnodesqlv8`.

## Related

- [MSNodeSQLv8 driver (optional)](./installation.md)
- [Drivers](../drivers/msnodesqlv8.md)
