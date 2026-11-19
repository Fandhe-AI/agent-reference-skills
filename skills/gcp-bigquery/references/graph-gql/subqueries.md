---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-subqueries
---

# GQL subqueries

## Signature / Usage

The following subqueries are supported in GQL query statements:

### Subquery list

| Name | Summary |
|---|---|
| [`ARRAY` subquery](#array-subquery) | Subquery expression that produces an array. |
| [`EXISTS` subquery](#exists-subquery) | Checks if a subquery produces at least one row. |
| [`IN` subquery](#in-subquery) | Checks if a subquery produces a specified value. |
| [`VALUE` subquery](#value-subquery) | Subquery expression that produces a scalar value. |

### `ARRAY` subquery

```text
ARRAY { GRAPH graph_name gql_query_expr }
```

##### Description

Subquery expression that produces an array. If the subquery produces zero rows,
an empty array is produced. Never produces a `NULL` array. This can be used
wherever a query expression is supported in a GQL query statement.

##### Definitions

- `graph_name`: The name of the property graph.
- `gql_query_expr`: A GQL query expression.

##### Return type

`ARRAY<T>`

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

In the following query, an array of transfer amounts is produced for each
`Account` owned by each `Person` node:

```sql
GRAPH graph_db.FinGraph
MATCH (p:Person)-[:Owns]->(account:Account)
RETURN
 p.name, account.id AS account_id,
 ARRAY {
   GRAPH graph_db.FinGraph
   MATCH (a:Account)-[transfer:Transfers]->(:Account)
   WHERE a = account
   RETURN transfer.amount AS transfers
 } AS transfers;

/*-------------------------------+
 | name | account_id | transfers |
 +-------------------+-----------+
 | Alex | 7          | [300,100] |
 | Dana | 20         | [500,200] |
 | Lee  | 16         | [300]     |
 +-------------------------------*/
```

### `EXISTS` subquery

```text
EXISTS { GRAPH graph_name gql_query_expr }
```

```text
EXISTS { match_statement }
```

```text
EXISTS { graph_pattern }
```

##### Description

Checks if the subquery produces at least one row. Returns `TRUE` if
at least one row is produced, otherwise returns `FALSE`. Never produces `NULL`.

##### Definitions

- `graph_name`: The name of the property graph.
- `gql_query_expr`: A GQL query expression.
- `match_statement`: A pattern matching operation to perform on a graph. For more information, see [`MATCH` statement](query-statements.md#match-statement).
- `graph_pattern`: A pattern to match in a graph. For more information, see [graph pattern definition](patterns.md#graph-pattern).

##### Return type

`BOOL`

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query checks whether any person named `"Lee"` owns an
account. The subquery contains a graph query expression.

```sql
GRAPH graph_db.FinGraph
RETURN EXISTS {
  GRAPH graph_db.FinGraph
  MATCH (p:Person {Name: "Lee"})-[o:Owns]->(a:Account)
  RETURN p.Name
  LIMIT 1
} AS results;

/*---------+
 | results |
 +---------+
 | true    |
 +---------*/
```

You can include a `MATCH` statement or a graph pattern in an `EXISTS`
subquery. The following examples include two ways to construct the subquery
and produce similar results:

```sql
GRAPH graph_db.FinGraph
RETURN EXISTS {
  MATCH (p:Person {Name: "Lee"})-[o:Owns]->(a:Account)
} AS results;

/*---------+
 | results |
 +---------+
 | true    |
 +---------*/
```

```sql
GRAPH graph_db.FinGraph
RETURN EXISTS {
  (p:Person {Name: "Lee"})-[o:Owns]->(a:Account)
} AS results;

/*---------+
 | results |
 +---------+
 | true    |
 +---------*/
```

### `IN` subquery

```text
value [ NOT ] IN { GRAPH graph_name gql_query_expr }
```

##### Description

Checks if `value` is present in the subquery result. Returns `TRUE` if the
result contains the `value`, otherwise returns `FALSE`.

##### Definitions

- `graph_name`: The name of the property graph.
- `value`: The value look for in the subquery result.
- `IN`: `TRUE` if the value is in the subquery result, otherwise `FALSE`.
- `NOT IN`: `FALSE` if the value is in the subquery result, otherwise `TRUE`.
- `gql_query_expr`: A GQL query expression.

##### Details

The subquery result must have a single column and that column type must
be comparable to the `value` type. If not, an error is
returned. You can't use an `IN` subquery in the `WHERE`
clause of a path pattern. Instead, use a `FILTER` statement.

##### Return type

`BOOL`

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query checks if `'Dana'` is a name of a person who owns an
account.

```sql
GRAPH graph_db.FinGraph
RETURN 'Dana' IN {
  GRAPH graph_db.FinGraph
  MATCH (p:Person)-[o:Owns]->(a:Account)
  RETURN p.name
} AS results;

/*---------+
 | results |
 +---------+
 | true    |
 +---------*/
```

### `VALUE` subquery

```text
VALUE { GRAPH graph_name gql_query_expr }
```

##### Description

A subquery expression that produces a scalar value.

##### Definitions

- `graph_name`: The name of the property graph.
- `gql_query_expr`: A GQL query expression.

##### Details

The result of the subquery must have a single column. If the subquery returns
more than one column, the query fails with an analysis error. The result type of
the subquery expression is the produced column type. If the subquery produces
exactly one row, that single value is the subquery expression result. If the
subquery returns zero rows, the subquery expression result is `NULL`. If the
subquery returns more than one row, the query fails with a runtime error.

##### Return type

The same as the column type in the subquery result.

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query returns the name of any person whose `country` property
is `"Australia"`:

```sql
GRAPH graph_db.FinGraph
RETURN VALUE {
  GRAPH graph_db.FinGraph
  MATCH (p:Person {country: "Australia"})
  RETURN p.name
  LIMIT 1
} AS results;

/*---------+
 | results |
 +---------+
 | Alex    |
 +---------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-subqueries (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The subquery list row for `VALUE` linked to the `ARRAY` subquery section (`#array-subquery`). It now links to the `VALUE` subquery section on this page (`#value-subquery`), whose heading exists below.

## Related

- [Index of this directory](./README.md)
