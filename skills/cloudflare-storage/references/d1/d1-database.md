---
source: https://developers.cloudflare.com/d1/worker-api/d1-database/
---

# D1Database

A D1 binding has the type `D1Database`, accessed through the Worker's `env`. Methods: `prepare()`, `batch()`, `exec()`, `dump`, `withSession()`; sessions return `D1DatabaseSession`.

## Signature / Usage

```js
async fetch(request, env) {
	// D1 database is 'env.DB', where "DB" is the binding name from the Wrangler configuration file.
}
```

```py
from workers import WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # D1 database is 'self.env.DB', where "DB" is the binding name from the Wrangler configuration file.
        pass
```

### `prepare()`

Prepares a query statement to be later executed.

```js
const someVariable = `Bs Beverages`;
const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);
```

```py
some_variable = "Bs Beverages"
stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)
```

- Parameters: `query`: `String` Required. The SQL query you wish to execute on the database.
- Returns: `D1PreparedStatement`: `Object`, an object which only contains methods. Refer to Prepared statement methods.
- Guidance: use `bind` to dynamically bind a value into the statement.

```js
// static statement, no bind
const stmt = db
	.prepare("SELECT * FROM Customers WHERE CompanyName = 'Alfreds Futterkiste' AND CustomerId = 1")

// ordered statement using bind
const stmt = db
	.prepare("SELECT * FROM Customers WHERE CompanyName = ? AND CustomerId = ?")
	.bind("Alfreds Futterkiste", 1);
```

### `batch()`

Sends multiple SQL statements inside a single call to the database. This can have a huge performance impact as it reduces latency from network round trips to D1. D1 operates in auto-commit. Our implementation guarantees that each statement in the list will execute and commit, sequentially, non-concurrently.

Batched statements are SQL transactions. If a statement in the sequence fails, then an error is returned for that specific statement, and it aborts or rolls back the entire sequence.

```js
const companyName1 = `Bs Beverages`;
const companyName2 = `Around the Horn`;
const stmt = env.DB.prepare(`SELECT * FROM Customers WHERE CompanyName = ?`);
const batchResult = await env.DB.batch([
	stmt.bind(companyName1),
	stmt.bind(companyName2)
]);
```

```py
company_name1 = "Bs Beverages"
company_name2 = "Around the Horn"
stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?")
batch_result = await self.env.DB.batch([
    stmt.bind(company_name1),
    stmt.bind(company_name2),
])
```

- Parameters: `statements`: `Array`, an array of `D1PreparedStatement`s.
- Returns: `results`: `Array`, an array of `D1Result` objects, each at the array position of its originating statement.

```js
console.log(batchResult[1].results);
```

```json
[
  {
    "CustomerId": 4,
    "CompanyName": "Around the Horn",
    "ContactName": "Thomas Hardy"
  }
]
```

### `exec()`

Executes one or more queries directly without prepared statements or parameter bindings.

```js
const returnValue = await env.DB.exec(`SELECT * FROM Customers WHERE CompanyName = "Bs Beverages"`);
```

```py
return_value = await self.env.DB.exec('SELECT * FROM Customers WHERE CompanyName = "Bs Beverages"')
```

- Parameters: `query`: `String` Required. The SQL query statement without parameter binding.
- Returns: `D1ExecResult`: `Object`. `count` is the number of executed queries; `duration` is the duration in milliseconds.

```json
{
  "count": 1,
  "duration": 1
}
```

- If an error occurs, an exception is thrown with the query and error messages, execution stops and further statements are not executed.
- Can have poorer performance (prepared statements can be reused in some cases) and, more importantly, is less safe.
- Only use for maintenance and one-shot tasks (for example, migration jobs).
- The input can be one or multiple queries separated by `\n`.

### `dump`

Dumps the entire D1 database to an SQLite compatible file inside an ArrayBuffer. Parameters: none. Return values: none.

```js
const dump = await db.dump();
return new Response(dump, {
	status: 200,
	headers: {
		"Content-Type": "application/octet-stream",
	},
});
```

### `withSession()`

Starts a D1 session which maintains sequential consistency among queries executed on the returned `D1DatabaseSession` object.

```js
const session = env.DB.withSession("<parameter>");
```

### `D1DatabaseSession.getBookmark`

Retrieves the latest `bookmark` from the D1 Session. Parameters: none. Returns `String | null`: a bookmark identifying the latest version of the database seen by the last query executed within the Session; `null` if no query is executed within a Session.

```js
const session = env.DB.withSession("first-primary");
const result = await session
	.prepare(`SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'`)
	.run()
const bookmark = session.getBookmark();
return bookmark;
```

`D1DatabaseSession.prepare()` and `D1DatabaseSession.batch()` are equivalent to `D1Database::prepare` and `D1Database::batch`.

## Options / Props

`withSession()` parameter (all optional):

| Name | Type | Description |
|------|------|-------------|
| `first-primary` | String | Directs the first query in the Session (whether read or write) to the primary database instance. Use if you need to start the Session with the most up-to-date data from the primary. Subsequent queries may use read replicas and have sequential consistency. |
| `first-unconstrained` | String | Directs the first query in the Session to any database instance. Use if you do not need the most up-to-date data and wish to minimize latency from the start. Subsequent queries have sequential consistency. Default when no parameter is provided. |
| `bookmark` | String | A bookmark from a previous D1 Session; starts a new Session from at least the provided bookmark. Subsequent queries have sequential consistency. |

Returns `D1DatabaseSession`: an object with `prepare()` and `batch()` similar to `D1Database`, plus `getBookmark`.

## Notes

- `dump` only works on databases created during D1's alpha period. Check which version your database uses with `wrangler d1 info <DATABASE_NAME>`.
- To use read replication, you have to use the D1 Sessions API (`withSession`), otherwise all queries continue to be executed only by the primary database.
- Corrected from the official docs: the official `batch()` example prints `stmt[1].results`, but `stmt` is a `D1PreparedStatement`; `batch()` resolves with an array of `D1Result`, so the result of the second statement is `batchResult[1].results`.
- Corrected from the official docs: the official `getBookmark` example destructures `{ bookmark }`, but `getBookmark()` returns `String | null` directly (not an object), so it is written as `const bookmark = session.getBookmark();`. It returns `null` until a query has run in the Session.
- Python Workers use `self.env.DB` instead of `env.DB`.
- `env` and bindings are covered by the cloudflare-workers skill.

## Related

- [Prepared statement methods](./prepared-statements.md)
- [Return objects](./return-objects.md)
- [Global read replication](./read-replication.md)
- [Time Travel and backups](./time-travel.md)
- [Debug D1](./debug-d1.md)
