---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-gql-functions
---

# GQL functions

## Signature / Usage

All GoogleSQL [functions](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/functions-all) are supported,
including the following GQL-specific functions:

### Function list

| Name | Summary |
|---|---|
| [`DESTINATION_NODE_ID`](#destination_node_id) | Gets a unique identifier of a graph edge's destination node. |
| [`EDGES`](#edges) | Gets the edges in a graph path. The resulting array retains the original order in the graph path. |
| [`ELEMENT_ID`](#element_id) | Gets a graph element's unique identifier. |
| [`IS_ACYCLIC`](#is_acyclic) | Checks if a graph path has a repeating node. |
| [`IS_SIMPLE`](#is_simple) | Checks if a graph path is simple. |
| [`IS_TRAIL`](#is_trail) | Checks if a graph path has a repeating edge. |
| [`LABELS`](#labels) | Gets the labels associated with a graph element. |
| [`NODES`](#nodes) | Gets the nodes in a graph path. The resulting array retains the original order in the graph path. |
| [`PATH_FIRST`](#path_first) | Gets the first node in a graph path. |
| [`PATH_LAST`](#path_last) | Gets the last node in a graph path. |
| [`PATH_LENGTH`](#path_length) | Gets the number of edges in a graph path. |
| [`SOURCE_NODE_ID`](#source_node_id) | Gets a unique identifier of a graph edge's source node. |

### `DESTINATION_NODE_ID`

```sql
DESTINATION_NODE_ID(edge_element)
```

**Description**

Gets a unique identifier of a graph edge's destination node. The unique identifier is only valid for the scope of the query where it's obtained.

**Definitions**

- `edge_element`: A `GRAPH_ELEMENT` value that represents an edge.

**Details**

Returns `NULL` if `edge_element` is `NULL`.

**Return type**

`STRING`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH (:Person)-[o:Owns]->(a:Account)
RETURN a.id AS account_id, DESTINATION_NODE_ID(o) AS destination_node_id

/*------------------------------------------+
 |account_id | destination_node_id          |
 +-----------|------------------------------+
 | 7         | mUZpbkdyYXBoLkFjY291bnQAeJEO |
 | 16        | mUZpbkdyYXBoLkFjY291bnQAeJEg |
 | 20        | mUZpbkdyYXBoLkFjY291bnQAeJEo |
 +------------------------------------------*/
```

Note that the actual identifiers obtained may be different from what's shown above.

### `EDGES`

```sql
EDGES(graph_path)
```

**Description**

Gets the edges in a graph path. The resulting array retains the
original order in the graph path.

**Definitions**

- `graph_path`: A `GRAPH_PATH` value that represents a graph path.

**Details**

If `graph_path` is `NULL`, returns `NULL`.

**Return type**

`ARRAY<GRAPH_ELEMENT>`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH p=(src:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(dst:Account)
LET es = EDGES(p)
RETURN TO_JSON(es) AS edges
```

### `ELEMENT_ID`

```sql
ELEMENT_ID(element)
```

**Description**

Gets a graph element's unique identifier. The unique identifier is only valid for the scope of the query where it's obtained.

**Definitions**

- `element`: A `GRAPH_ELEMENT` value.

**Details**

Returns `NULL` if `element` is `NULL`.

**Return type**

`STRING`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH (p:Person)-[o:Owns]->(:Account)
RETURN p.name AS name, ELEMENT_ID(p) AS node_element_id, ELEMENT_ID(o) AS edge_element_id

/*--------------------------------------------------------------------------------------------------------------------------------------------+
 | name | node_element_id              | edge_element_id                                                                                      |
 +------|------------------------------|------------------------------------------------------------------------------------------------------+
 | Alex | mUZpbkdyYXBoLlBlcnNvbgB4kQI= | mUZpbkdyYXBoLlBlcnNvbk93bkFjY291bnQAeJECkQ6ZRmluR3JhcGguUGVyc29uAHiRAplGaW5HcmFwaC5BY2NvdW50AHiRDg== |
 | Dana | mUZpbkdyYXBoLlBlcnNvbgB4kQQ= | mUZpbkdyYXBoLlBlcnNvbk93bkFjY291bnQAeJEGkSCZRmluR3JhcGguUGVyc29uAHiRBplGaW5HcmFwaC5BY2NvdW50AHiRIA== |
 | Lee  | mUZpbkdyYXBoLlBlcnNvbgB4kQY= | mUZpbkdyYXBoLlBlcnNvbk93bkFjY291bnQAeJEEkSiZRmluR3JhcGguUGVyc29uAHiRBJlGaW5HcmFwaC5BY2NvdW50AHiRKA== |
 +--------------------------------------------------------------------------------------------------------------------------------------------*/
```

Note that the actual identifiers obtained may be different from what's shown above.

### `IS_ACYCLIC`

```sql
IS_ACYCLIC(graph_path)
```

**Description**

Checks if a graph path has a repeating node. Returns `TRUE` if a repetition
isn't found, otherwise returns `FALSE`.

**Definitions**

- `graph_path`: A `GRAPH_PATH` value that represents a graph path.

**Details**

Two nodes are considered equal if they compare as equal.

Returns `NULL` if `graph_path` is `NULL`.

**Return type**

`BOOL`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH p=(src:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(dst:Account)
RETURN src.id AS source_account_id, IS_ACYCLIC(p) AS is_acyclic_path

/*-------------------------------------+
 | source_account_id | is_acyclic_path |
 +-------------------------------------+
 | 16                | TRUE            |
 | 20                | TRUE            |
 | 20                | TRUE            |
 | 16                | FALSE           |
 | 7                 | TRUE            |
 | 7                 | TRUE            |
 | 20                | FALSE           |
 +-------------------------------------*/
```

### `IS_SIMPLE`

```sql
IS_SIMPLE(graph_path)
```

**Description**

Checks if a graph path is simple. Returns `TRUE` if the path has no repeated
nodes, or if the only repeated nodes are its head and tail. Otherwise, returns
`FALSE`.

**Definitions**

- `graph_path`: A `GRAPH_PATH` value that represents a graph path.

**Details**

Returns `NULL` if `graph_path` is `NULL`.

**Return type**

`BOOL`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH p=(a1:Account)-[t1:Transfers where t1.amount > 200]->
        (a2:Account)-[t2:Transfers where t2.amount > 200]->
        (a3:Account)-[t3:Transfers where t3.amount > 100]->(a4:Account)
RETURN
  IS_SIMPLE(p) AS is_simple_path,
  a1.id as a1_id, a2.id as a2_id, a3.id as a3_id, a4.id as a4_id

/*----------------+-------+-------+-------+-------+
 | is_simple_path | a1_id | a2_id | a3_id | a4_id |
 +----------------+-------+-------+-------+-------+
 | TRUE           | 7     | 16    | 20    | 7     |
 | TRUE           | 16    | 20    | 7     | 16    |
 | FALSE          | 7     | 16    | 20    | 16    |
 | TRUE           | 20    | 7     | 16    | 20    |
 +----------------+-------+-------+-------+-------*/
```

### `IS_TRAIL`

```sql
IS_TRAIL(graph_path)
```

**Description**

Checks if a graph path has a repeating edge. Returns `TRUE` if a repetition
isn't found, otherwise returns `FALSE`.

**Definitions**

- `graph_path`: A `GRAPH_PATH` value that represents a graph path.

**Details**

Returns `NULL` if `graph_path` is `NULL`.

**Return type**

`BOOL`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH
  p=(a1:Account)-[t1:Transfers]->(a2:Account)-[t2:Transfers]->
    (a3:Account)-[t3:Transfers]->(a4:Account)
WHERE a1.id < a4.id
RETURN
  IS_TRAIL(p) AS is_trail_path, t1.id as t1_id, t2.id as t2_id, t3.id as t3_id

/*---------------+-------+-------+-------+
 | is_trail_path | t1_id | t2_id | t3_id |
 +---------------+-------+-------+-------+
 | FALSE         | 16    | 20    | 16    |
 | TRUE          | 7     | 16    | 20    |
 | TRUE          | 7     | 16    | 20    |
 +---------------+-------+-------+-------*/
```

### `LABELS`

```sql
LABELS(element)
```

**Description**

Gets the labels associated with a graph element and preserves the original case
of each label.

**Definitions**

- `element`: A `GRAPH_ELEMENT` value that represents the graph element to extract labels from.

**Details**

Returns `NULL` if `element` is `NULL`.

**Return type**

`ARRAY<STRING>`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person|Account)
RETURN LABELS(n) AS label, n.id

/*----------------+
 | label     | id |
 +----------------+
 | [Account] | 7  |
 | [Account] | 16 |
 | [Account] | 20 |
 | [Person]  | 1  |
 | [Person]  | 2  |
 | [Person]  | 3  |
 +----------------*/
```

### `NODES`

```sql
NODES(graph_path)
```

**Description**

Gets the nodes in a graph path. The resulting array retains the
original order in the graph path.

**Definitions**

- `graph_path`: A `GRAPH_PATH` value that represents a graph path.

**Details**

Returns `NULL` if `graph_path` is `NULL`.

**Return type**

`ARRAY<GRAPH_ELEMENT>`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH p=(src:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(dst:Account)
LET ns = NODES(p)
RETURN
  JSON_QUERY(TO_JSON(ns)[0], '$.labels') AS labels,
  JSON_QUERY(TO_JSON(ns)[0], '$.properties.nick_name') AS nick_name;

/*--------------------------------+
 | labels      | nick_name        |
 +--------------------------------+
 | ["Account"] | "Vacation Fund"  |
 | ["Account"] | "Rainy Day Fund" |
 | ["Account"] | "Rainy Day Fund" |
 | ["Account"] | "Rainy Day Fund" |
 | ["Account"] | "Vacation Fund"  |
 | ["Account"] | "Vacation Fund"  |
 | ["Account"] | "Vacation Fund"  |
 | ["Account"] | "Rainy Day Fund" |
 +--------------------------------*/
```

### `PATH_FIRST`

```sql
PATH_FIRST(graph_path)
```

**Description**

Gets the first node in a graph path.

**Definitions**

- `graph_path`: A `GRAPH_PATH` value that represents the graph path to extract the first node from.

**Details**

Returns `NULL` if `graph_path` is `NULL`.

**Return type**

`GRAPH_ELEMENT`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH p=(src:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(dst:Account)
LET f = PATH_FIRST(p)
RETURN
  LABELS(f) AS labels,
  f.nick_name AS nick_name;

/*--------------------------+
 | labels  | nick_name      |
 +--------------------------+
 | Account | Vacation Fund  |
 | Account | Rainy Day Fund |
 | Account | Rainy Day Fund |
 | Account | Vacation Fund  |
 | Account | Vacation Fund  |
 | Account | Vacation Fund  |
 | Account | Rainy Day Fund |
 +--------------------------*/
```

### `PATH_LAST`

```sql
PATH_LAST(graph_path)
```

**Description**

Gets the last node in a graph path.

**Definitions**

- `graph_path`: A `GRAPH_PATH` value that represents the graph path to extract the last node from.

**Details**

Returns `NULL` if `graph_path` is `NULL`.

**Return type**

`GRAPH_ELEMENT`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH p=(src:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(dst:Account)
LET f = PATH_LAST(p)
RETURN
  LABELS(f) AS labels,
  f.nick_name AS nick_name;

/*--------------------------+
 | labels  | nick_name      |
 +--------------------------+
 | Account | Vacation Fund  |
 | Account | Vacation Fund  |
 | Account | Vacation Fund  |
 | Account | Vacation Fund  |
 | Account | Rainy Day Fund |
 | Account | Rainy Day Fund |
 | Account | Rainy Day Fund |
 +--------------------------*/
```

### `PATH_LENGTH`

```sql
PATH_LENGTH(graph_path)
```

**Description**

Gets the number of edges in a graph path.

**Definitions**

- `graph_path`: A `GRAPH_PATH` value that represents the graph path with the edges to count.

**Details**

Returns `NULL` if `graph_path` is `NULL`.

**Return type**

`INT64`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH p=(src:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(dst:Account)
RETURN PATH_LENGTH(p) AS results

/*---------+
 | results |
 +---------+
 | 2       |
 | 2       |
 | 2       |
 | 2       |
 | 2       |
 | 2       |
 | 2       |
 +---------*/
```

### `SOURCE_NODE_ID`

```sql
SOURCE_NODE_ID(edge_element)
```

**Description**

Gets a unique identifier of a graph edge's source node. The unique identifier is only valid for the scope of the query where it's obtained.

**Definitions**

- `edge_element`: A `GRAPH_ELEMENT` value that represents an edge.

**Details**

Returns `NULL` if `edge_element` is `NULL`.

**Return type**

`STRING`

**Examples**

```sql
GRAPH graph_db.FinGraph
MATCH (p:Person)-[o:Owns]->(:Account)
RETURN p.name AS name, SOURCE_NODE_ID(o) AS source_node_id

/*-------------------------------------+
 | name | source_node_id               |
 +------|------------------------------+
 | Alex | mUZpbkdyYXBoLlBlcnNvbgB4kQI= |
 | Dana | mUZpbkdyYXBoLlBlcnNvbgB4kQQ= |
 | Lee  | mUZpbkdyYXBoLlBlcnNvbgB4kQY= |
 +-------------------------------------*/
```

Note that the actual identifiers obtained may be different from what's shown above.

### Supplemental materials

#### Horizontal aggregate function calls in GQL

In GQL, a horizontal aggregate function is an aggregate function that summarizes
the contents of exactly one array-typed value. Because a horizontal aggregate
function doesn't need to aggregate vertically across rows like a traditional
aggregate function, you can use it like a normal function expression.
Horizontal aggregates are only allowed in certain syntactic contexts: `LET`,
`FILTER` statements or `WHERE` clauses.

Horizontal aggregation is especially useful when paired with a
[group variable](patterns.md#quantified-path-pattern). You can create a group variable inside a
quantified path pattern in a linear graph query.

Some aggregates use an `ORDER BY` clause, such as the `ARRAY_AGG`,
`STRING_AGG`, and `ARRAY_CONCAT_AGG` functions. For these aggregates the
system orders inputs by their position in the array if you don't provide an
`ORDER BY` clause.

##### Syntactic restrictions

- The argument to the aggregate function must reference exactly one array-typed value.
- Can be used in `LET`, `FILTER` statements, or `WHERE` clauses only.
- Nesting horizontal aggregates isn't allowed.

##### Examples

In the following query, the `SUM` function horizontally aggregates over an
array (`arr`), and then produces the sum of the values in `arr`:

```sql
GRAPH graph_db.FinGraph
LET arr = [1, 2, 3]
LET total = SUM(arr)
RETURN total

/*-------+
 | total |
 +-------+
 | 6     |
 +-------*/
```

In the following query, the `SUM` function horizontally aggregates over an
array of structs (`arr`), and then produces the sum of the `x` fields in the
array:

```sql
GRAPH graph_db.FinGraph
LET arr = [STRUCT(1 as x, 10 as y), STRUCT(2, 9), STRUCT(3, 8)]
LET total = SUM(arr.x)
RETURN total

/*-------+
 | total |
 +-------+
 | 6     |
 +-------*/
```

In the following query, the `AVG` function horizontally aggregates over an
array of structs (`arr`), and then produces the average of the `x` and `y`
fields in the array:

```sql
GRAPH graph_db.FinGraph
LET arr = [STRUCT(1 as x, 10 as y), STRUCT(2, 9), STRUCT(3, 8)]
LET avg_sum = AVG(arr.x + arr.y)
RETURN avg_sum

/*---------+
 | avg_sum |
 +---------+
 | 11      |
 +---------*/
```

The `ARRAY_AGG` function can be used as a projection when horizontally
aggregating. The resulting array is in the same order as the array that's
horizontally aggregated over.

```sql
GRAPH graph_db.FinGraph
LET arr = [STRUCT(1 as x, 9 as y), STRUCT(2, 9), STRUCT(4, 8)]
LET result = ARRAY_AGG(arr.x + arr.y)
RETURN result

/*--------------+
 | result       |
 +--------------+
 | [10, 11, 12] |
 +--------------*/
```

The following query produces an error because two arrays were passed into
the `AVG` aggregate function:

```sql
-- ERROR: Horizontal aggregation on more than one array-typed variable
-- isn't allowed
GRAPH graph_db.FinGraph
LET arr1 = [1, 2, 3]
LET arr2 = [5, 4, 3]
LET avg_val = AVG(arr1 + arr2)
RETURN avg_val
```

The following query demonstrates a common pitfall. All instances of the array
that is horizontally aggregated over are treated as a single element from that
array in the aggregate.

To resolve this error, move expressions that use the entire array
outside of the horizontal aggregation.

```sql
-- ERROR: No matching signature for function ARRAY_LENGTH for argument types: INT64
GRAPH graph_db.FinGraph
LET arr1 = [1, 2, 3]
LET bad_avg_val = SUM(arr1 / ARRAY_LENGTH(arr1))
RETURN bad_avg_val
```

The fix:

```sql
GRAPH graph_db.FinGraph
LET arr1 = [1, 2, 3]
LET len = ARRAY_LENGTH(arr1)
LET avg_val = SUM(arr1 / len)
RETURN avg_val
```

In the following query, the `COUNT` function counts the unique amount
transfers with one to three hops between a source account (`src`) and a
destination account (`dst`):

Adapted (not in the official docs): The result header `unique_transfers_amount` is renamed to `unique_amount_transfers` to match the query.

```sql
GRAPH graph_db.FinGraph
MATCH (src:Account)-[e:Transfers]->{1, 3}(dst:Account)
WHERE src != dst
LET num_transfers = COUNT(e)
LET unique_amount_transfers = COUNT(DISTINCT e.amount)
FILTER unique_amount_transfers != num_transfers
RETURN src.id as src_id, num_transfers, unique_amount_transfers, dst.id AS destination_account_id

/*---------------------------------------------------------------------------+
 | src_id | num_transfers | unique_amount_transfers | destination_account_id |
 +---------------------------------------------------------------------------+
 | 7      | 3             | 2                       | 16                     |
 | 20     | 3             | 2                       | 16                     |
 | 7      | 2             | 1                       | 20                     |
 | 16     | 3             | 2                       | 20                     |
 +---------------------------------------------------------------------------*/
```

In the following query, the `SUM` function takes a group variable called `e`
that represents an array of transfers, and then sums the amount for each
transfer. Horizontal aggregation isn't allowed in the `RETURN`
statement. `ARRAY_AGG` is a vertical aggregate over the result set, which is
grouped implicitly by the non-aggregated columns
(`source_account_id`, `destination_account_id`). `ARRAY_AGG` produces one row
for each distinct destination account.

```sql
GRAPH graph_db.FinGraph
MATCH (src:Account {id: 7})-[e:Transfers]->{1,2}(dst:Account)
LET total_amount = SUM(e.amount)
RETURN
  src.id AS source_account_id, dst.id AS destination_account_id,
  ARRAY_AGG(total_amount) as total_amounts_per_path

/*---------------------------------------------------------------------+
 | source_account_id | destination_account_id | total_amounts_per_path |
 +---------------------------------------------------------------------+
 | 7                 | 16                     | [300, 100]             |
 | 7                 | 20                     | [600, 400]             |
 +---------------------------------------------------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-gql-functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The `COUNT(DISTINCT e.amount)` example result header was `unique_transfers_amount`, but the query returns the column `unique_amount_transfers`. The header now matches the query; the column width is unchanged.
- Caution: The `NODES` example result lists 8 rows (4 "Vacation Fund" and 4 "Rainy Day Fund"), but the same `MATCH` returns 7 paths, as the `PATH_LENGTH` and `PATH_FIRST` examples show (4 "Vacation Fund" and 3 "Rainy Day Fund"). The official docs are unchanged here; which row is extra is not stated.

## Related

- [Index of this directory](./README.md)
