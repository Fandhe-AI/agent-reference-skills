---
source: https://developers.cloudflare.com/d1/best-practices/query-d1/
---

# Query a database

D1 understands SQLite semantics. Three ways to interact: the Workers Binding API (data plane), the REST API (control plane), and Wrangler commands (which use REST APIs).

## Signature / Usage

```js
export default {
    async fetch(request, env) {
        const {pathname} = new URL(request.url);
        const companyName1 = `Bs Beverages`;
        const companyName2 = `Around the Horn`;
        const stmt = env.DB.prepare(`SELECT * FROM Customers WHERE CompanyName = ?`);

        if (pathname === `/RUN`) {
            const returnValue = await stmt.bind(companyName1).run();
            return Response.json(returnValue);
        }

        return new Response(
            `Welcome to the D1 API Playground!
						\nChange the URL to test the various methods inside your index.js file.`,
        );
    },
};
```

```sh
npx wrangler d1 execute prod-d1-tutorial --command="SELECT * FROM Customers"
```

```sql
-- Extract the temperature value
SELECT json_extract(sensor_reading, '$.measurement.temp_f')-- returns "77.4" as TEXT
```

## Notes

- Workers Binding API requires: bind the D1 database to your Worker, prepare a statement, run the statement.
- The REST API primarily interacts with the control plane (create/manage databases).
- For foreign keys and JSON querying, see the Define foreign keys and Query JSON pages.
- D1 is SQLite-based; for SQL Server see the mssql skill, for Postgres-based Supabase see the supabase skill.

## Related

- [Workers Binding API](./worker-binding-api.md)
- [SQL statements](./sql-statements.md)
- [Define foreign keys](./foreign-keys.md)
- [Query JSON](./query-json.md)
- [Wrangler commands](./wrangler-commands.md)
