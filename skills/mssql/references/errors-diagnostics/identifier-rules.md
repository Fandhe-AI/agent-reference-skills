---
source: https://tediousjs.github.io/node-mssql/#identifiers
---

# Identifiers

Names of parameters, bulk-load columns, parameter types and stored procedures cannot be bound as values, so the library builds them into the statement and validates them. Anything that could end the identifier is rejected with `EINJECT`.

## Signature / Usage

```javascript
const columns = { name: 'name', created: 'created_at' }        // what you allow
const column = columns[req.query.sortBy]                       // what they asked for
if (!column) throw new Error('unknown column')

request.input(column, sql.NVarChar, value)
```

## Options / Props

| Identifier | Rule |
|------------|------|
| Parameter names | `request.input()` / `request.output()` (and the same methods on a prepared statement) take a name without the leading `@`. It may hold letters, digits, marks and connector punctuation from any script, along with `@`, `#`, `$` and the two zero-width joiners. A name that is not a string or a number, or one holding an invisible format character, is rejected. |
| Column names | `table.columns.add()` emits the name as a quoted identifier. A `]` must be doubled (`'a]]b'` is the column `a]b`); a single `]` raises `EINJECT`. Spaces, punctuation and reserved words are fine. |
| `options.order` keys | Written unquoted into the bulk statement's `ORDER (...)` clause. Follow the type name rule: bare, or quoted with brackets or double quotes. |
| Type names (`sql.TVP()`) | Table type name, optionally schema-qualified and optionally quoted with brackets or double quotes. |
| Sizes | Length, precision or scale (e.g. `sql.VarChar()`) must be a number or the word `max`. Padding is trimmed. Checked wherever it is built into SQL (bulk declaration, query parameter list), not only `sql.TVP()`. |
| Procedure names (`request.execute()`) | Optionally qualified with server, database and schema, optionally quoted with brackets or double quotes. An omitted part may be left empty. First and last parts must be present (`.proc` and `db..` are rejected). |

```javascript
table.columns.add('a]]b', sql.Int)   // the column named a]b

request.bulk(table, { order: { created_at: 'ASC' } })
request.bulk(table, { order: { '[Created At]': 'DESC' } })   // quote a spaced name yourself

request.input('rows', sql.TVP('dbo.[My Type]'), table)
request.input('name', sql.VarChar(50), value)
request.input('note', sql.VarChar('max'), value)

request.execute('dbo.[My Procedure]')
request.execute('master..sp_who')      // an omitted schema is fine
```

## Notes

- The check is not a substitute for your own: if any of these identifiers comes from a source you do not control, map it to an expected value first.
- A name the library accepts may still be rejected by the server; the check is deliberately wider than the server's own rules so it only refuses what could change the shape of the statement.
- Numbered procedures (the deprecated `procedure;1` form) are rejected, because the `;` cannot be told apart from the end of a statement.
- The `msnodesqlv8` driver builds the procedure name into the statement it sends; `tedious` sends a bound remote procedure call. Both validate, so acceptance is the same with either driver.
- Failures raise `EINJECT`: `RequestError` ("Parameter name, column name or type is not a valid identifier.") and `PreparedStatementError` ("Parameter name is not a valid identifier.").

## Related

- [sql-injection.md](./sql-injection.md)
- [error-codes.md](./error-codes.md)
- [errors.md](./errors.md)
