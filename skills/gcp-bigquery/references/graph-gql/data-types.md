---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-data-types
---

# GQL data types

## Signature / Usage

Graph Query Language (GQL) supports all GoogleSQL [data types](../googlesql-syntax/data-types.md),
including the following GQL-specific data type:

### Graph data types list

| Name | Summary |
|---|---|
| [Graph element type](#graph-element-type) | An element in a property graph. Can be a `GRAPH_NODE` or `GRAPH_EDGE`. SQL type name: `GRAPH_ELEMENT` |
| [Graph path type](#graph-path-type) | A path in a property graph. SQL type name: `GRAPH_PATH` |

### Graph element type

| Name | Description |
|---|---|
| `GRAPH_ELEMENT` | An element in a property graph. |

A variable with a `GRAPH_ELEMENT` type is produced by a graph query.
The generated type has this format:

```sql
GRAPH_ELEMENT<T>
```

A graph element is either a node or an edge, representing data from a
matching node or edge table based on its label. Each graph element holds a
set of properties that can be accessed with a case-insensitive name,
similar to fields of a struct.

**Example**

In the following example, `n` represents a graph element in the
[`FinGraph`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements#fin_graph) property graph:

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person)
RETURN n.name
```

In the following example, the [`TYPEOF`](../googlesql-functions/utility-functions.md#typeof) function is used to inspect the
set of properties defined in the graph element type.

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person)
RETURN TYPEOF(n) AS t
LIMIT 1

/*--------------------------------------------------------+
 | t                                                      |
 +--------------------------------------------------------+
 | GRAPH_NODE(myproject.graph_db.FinGraph)<id INT64, ...> |
 +--------------------------------------------------------*/
```

### Graph path type

| Name | Description |
|---|---|
| `GRAPH_PATH` | A path in a property graph. |

The graph path data type represents a sequence of nodes interleaved
with edges and has this format:

```sql
GRAPH_PATH<NODE_TYPE, EDGE_TYPE>
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-data-types (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
