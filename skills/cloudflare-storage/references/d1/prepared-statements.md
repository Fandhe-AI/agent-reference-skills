---
source: https://developers.cloudflare.com/d1/worker-api/prepared-statements/
---

# Prepared statement methods

Ways to bind parameters and run or retrieve results of a `D1PreparedStatement`: `bind()`, `run()`, `raw()`, `first()`.

## Signature / Usage

### `bind()`

Binds a parameter to the prepared statement.

```js
const someVariable = `Bs Beverages`;
const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);
```

```py
some_variable = "Bs Beverages"
stmt = self.env.DB.prepare(
  "SELECT * FROM Customers WHERE CompanyName = ?"
).bind(some_variable)
```

- Parameter: `Variable`: `string`, the variable to be appended into the prepared statement.
- Returns: `D1PreparedStatement`: `Object` where the input parameter has been included in the statement.

Ordered and anonymous examples:

```js
const stmt = db
	.prepare("SELECT * FROM Customers WHERE CompanyName = ? AND CustomerId = ?")
	.bind("Alfreds Futterkiste", 1);

const stmt2 = db
	.prepare(
  "SELECT * FROM Customers WHERE CompanyName = ?2 AND CustomerId = ?1"
).bind(1, "Alfreds Futterkiste");
```

Static statement (variables hard coded) versus dynamically bound value:

```js
const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'");
// "Bs Beverages" is hard-coded into the query.
// `stmt` is a static statement.
```

### `run()`

Runs the prepared query (or queries) and returns results, including metadata. Parameter: none. Returns `D1Result`: `Object` containing the success status, a meta object, and an array of objects containing the query results.

```js
const returnValue = await stmt.run();
```

```json
{
  "success": true,
  "meta": {
    "served_by": "miniflare.db",
    "duration": 1,
    "changes": 0,
    "last_row_id": 0,
    "changed_db": false,
    "size_after": 8192,
    "rows_read": 4,
    "rows_written": 0
  },
  "results": [
    {
      "CustomerId": 11,
      "CompanyName": "Bs Beverages",
      "ContactName": "Victoria Ashworth"
    },
    {
      "CustomerId": 13,
      "CompanyName": "Bs Beverages",
      "ContactName": "Random Name"
    }
  ]
}
```

- `results` is empty for write operations such as `UPDATE`, `DELETE`, or `INSERT`.
- `run` is functionally equivalent to `D1PreparedStatement::all` and can be treated as an alias.
- To extract only the results, return the `results` property (for example `Response.json(returnValue.results)`).

### `raw()`

Runs the prepared query (or queries) and returns the results as an array of arrays, without metadata. Column names are not included by default; set `.raw({columnNames: true})` to include them as the first row.

```js
const returnValue = await stmt.raw();
```

```py
return_value = await stmt.raw(columnNames=True)
```

- Parameter: `columnNames`: `Object` Optional. A boolean object which includes column names as the first row of the result array.
- Returns: `Array` of arrays; each sub-array represents a row.

```json
[
  [11, "Bs Beverages", "Victoria Ashworth"],
  [13, "Bs Beverages", "Random Name"]
]
```

With `columnNames: true`:

```json
[
  ["CustomerId", "CompanyName", "ContactName"],
  [11, "Bs Beverages", "Victoria Ashworth"],
  [13, "Bs Beverages", "Random Name"]
]
```

### `first()`

Runs the prepared query (or queries) and returns the first row of the query result as an object, with no metadata.

```js
const values = await stmt.first();
const customerId = await stmt.first("CustomerId");
```

- Parameter: `columnName`: `String` Optional. Return the value from a specific column of the first row. With no parameter, all columns of the first row are returned.
- Returns: `firstRow`: `Object` (filtered to a single attribute if `columnName` was specified), or `null` if the query returns no rows.

```json
{
  "CustomerId": 11,
  "CompanyName": "Bs Beverages",
  "ContactName": "Victoria Ashworth"
}
```

## Options / Props

Supported parameter syntaxes (SQLite convention):

| Syntax | Type | Description |
| --- | --- | --- |
| `?NNN` | Ordered | A question mark followed by a number `NNN` holds a spot for the `NNN`-th parameter. `NNN` must be between `1` and `SQLITE_MAX_VARIABLE_NUMBER` |
| `?` | Anonymous | A question mark that is not followed by a number creates a parameter with a number one greater than the largest parameter number already assigned. If this means the parameter number is greater than `SQLITE_MAX_VARIABLE_NUMBER`, it is an error. Provided for compatibility with other database engines; because it is easy to miscount the question marks, its use is discouraged. |

## Notes

- Currently D1 only supports Ordered (`?NNNN`) and Anonymous (`?`) parameters. In the future, D1 will support named parameters as well.
- Prefer prepared statements with `bind()`: it allows reuse of statements and prevents SQL injection attacks.
- If the query returns rows but `columnName` does not exist, `first()` throws the `D1_ERROR` exception.
- `first()` does not alter the SQL query. To improve performance, consider appending `LIMIT 1` to your statement.
- With TypeScript, pass a type parameter to `run`, `raw` and `first` to get typed results.

## Related

- [D1Database](./d1-database.md)
- [Return objects](./return-objects.md)
- [Workers Binding API](./worker-binding-api.md)
