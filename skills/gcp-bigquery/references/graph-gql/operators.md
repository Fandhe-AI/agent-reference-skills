---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-operators
---

# GQL operators

## Signature / Usage

Graph Query Language (GQL) supports all GoogleSQL [operators](../googlesql-syntax/operators.md),
including the following GQL-specific operators:

### Graph operators list

| Name | Summary |
|---|---|
| [Graph logical operators](#graph-logical-operators) | Tests for the truth of a condition in a graph label and produces either `TRUE` or `FALSE`. |
| [Graph predicates](#graph-predicates) | Tests for the truth of a condition for a graph element and produces `TRUE`, `FALSE`, or `NULL`. |
| [`ALL_DIFFERENT` predicate](#all_different-predicate) | In a graph, checks to see if the elements in a list are all different. |
| [`IS DESTINATION` predicate](#is-destination-predicate) | In a graph, checks to see if a node is or isn't the destination of an edge. |
| [`IS SOURCE` predicate](#is-source-predicate) | In a graph, checks to see if a node is or isn't the source of an edge. |
| [`SAME` predicate](#same-predicate) | In a graph, checks if all graph elements in a list bind to the same node or edge. |

### Graph logical operators

GoogleSQL supports the following logical operators in
[element pattern label expressions](patterns.md#element-pattern):

| Name | Syntax | Description |
|---|---|---|
| `NOT` | `!X` | Returns `TRUE` if `X` isn't included, otherwise, returns `FALSE`. |
| `OR` | `X \| Y` | Returns `TRUE` if either `X` or `Y` is included, otherwise, returns `FALSE`. |
| `AND` | `X & Y` | Returns `TRUE` if both `X` and `Y` are included, otherwise, returns `FALSE`. |

### Graph predicates

GoogleSQL supports the following graph-specific predicates in
graph expressions. A predicate can produce `TRUE`, `FALSE`, or `NULL`.

- [`ALL_DIFFERENT` predicate](#all_different-predicate)
- [`IS SOURCE` predicate](#is-source-predicate)
- [`IS DESTINATION` predicate](#is-destination-predicate)
- [`SAME` predicate](#same-predicate)

### `ALL_DIFFERENT` predicate

```sql
ALL_DIFFERENT(element, element[, ...])
```

**Description**

In a graph, checks to see if the elements in a list are all different.
Returns `TRUE` if none of the elements in the list equal one another,
otherwise `FALSE`.

**Definitions**

- `element`: The graph pattern variable for a node or edge element.

**Details**

Produces an error if `element` is `NULL`.

**Return type**

`BOOL`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH
  (a1:Account)-[t1:Transfers]->(a2:Account)-[t2:Transfers]->
  (a3:Account)-[t3:Transfers]->(a4:Account)
WHERE a1.id < a4.id
RETURN
  ALL_DIFFERENT(t1, t2, t3) AS results

/*---------+
 | results |
 +---------+
 | FALSE   |
 | TRUE    |
 | TRUE    |
 +---------*/
```

### `IS DESTINATION` predicate

```sql
node IS [ NOT ] DESTINATION [ OF ] edge
```

**Description**

In a graph, checks to see if a node is or isn't the destination of an edge.
Can produce `TRUE`, `FALSE`, or `NULL`.

Arguments:

- `node`: The graph pattern variable for the node element.
- `edge`: The graph pattern variable for the edge element.

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[transfer:Transfers]-(b:Account)
WHERE a IS DESTINATION of transfer
RETURN a.id AS a_id, b.id AS b_id

/*-------------+
 | a_id | b_id |
 +-------------+
 | 16   | 7    |
 | 16   | 7    |
 | 20   | 16   |
 | 7    | 20   |
 | 16   | 20   |
 +-------------*/
```

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[transfer:Transfers]-(b:Account)
WHERE b IS DESTINATION of transfer
RETURN a.id AS a_id, b.id AS b_id

/*-------------+
 | a_id | b_id |
 +-------------+
 | 7    | 16   |
 | 7    | 16   |
 | 16   | 20   |
 | 20   | 7    |
 | 20   | 16   |
 +-------------*/
```

### `IS SOURCE` predicate

```sql
node IS [ NOT ] SOURCE [ OF ] edge
```

**Description**

In a graph, checks to see if a node is or isn't the source of an edge.
Can produce `TRUE`, `FALSE`, or `NULL`.

Arguments:

- `node`: The graph pattern variable for the node element.
- `edge`: The graph pattern variable for the edge element.

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[transfer:Transfers]-(b:Account)
WHERE a IS SOURCE of transfer
RETURN a.id AS a_id, b.id AS b_id

/*-------------+
 | a_id | b_id |
 +-------------+
 | 20   | 7    |
 | 7    | 16   |
 | 7    | 16   |
 | 20   | 16   |
 | 16   | 20   |
 +-------------*/
```

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[transfer:Transfers]-(b:Account)
WHERE b IS SOURCE of transfer
RETURN a.id AS a_id, b.id AS b_id

/*-------------+
 | a_id | b_id |
 +-------------+
 | 7    | 20   |
 | 16   | 7    |
 | 16   | 7    |
 | 16   | 20   |
 | 20   | 16   |
 +-------------*/
```

### `SAME` predicate

```sql
SAME (element, element[, ...])
```

**Description**

In a graph, checks if all graph elements in a list bind to the same node or
edge. Returns `TRUE` if the elements bind to the same node or edge, otherwise
`FALSE`.

Arguments:

- `element`: The graph pattern variable for a node or edge element.

**Details**

Produces an error if `element` is `NULL`.

**Example**

The following query returns the source and destination IDs for transfers
between different accounts:

```sql
GRAPH graph_db.FinGraph
MATCH (src:Account)<-[transfer:Transfers]-(dest:Account)
WHERE NOT SAME(src, dest)
RETURN src.id AS source_id, dest.id AS destination_id

/*----------------------------+
 | source_id | destination_id |
 +----------------------------+
 | 7         | 20             |
 | 16        | 7              |
 | 16        | 7              |
 | 16        | 20             |
 | 20        | 16             |
 +----------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-operators (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
