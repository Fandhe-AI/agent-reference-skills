---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-queries
---

# Graphs within SQL

## Signature / Usage

GoogleSQL for BigQuery supports the following syntax to use graphs
within SQL queries.

### Language list

| Name | Summary |
|---|---|
| [`GRAPH_EXPAND`](#graph_expand) | A TVF that returns a flattened version of the input graph. |
| [`GRAPH_TABLE` operator](#graph_table-operator) | Performs an operation on a graph in the `FROM` clause of a SQL query and then produces a table with the results. |

### `GRAPH_EXPAND`

```text
GRAPH_EXPAND(
  graph_name
  [, start_node => start_node_name ]
  [, flatten_results => { TRUE | FALSE } ]
)
```

##### Description

Provides a relational table representation of the data in the input graph.
By default, `GRAPH_EXPAND` returns a flattened table with prefixed column
names. You can specify `flatten_results => FALSE` to return a hierarchical
relation with nested `STRUCT` columns.

The `GRAPH_EXPAND` TVF also supports querying graph properties defined by a
measure. For more information and examples of how to use
this function, see [Work with measures](https://docs.cloud.google.com/bigquery/docs/graph-measures).

##### Definitions

- `graph_name`: A `STRING` value that contains the name of the graph to expand.
- `start_node_name`: An optional `STRING` value that specifies the starting node table name for traversal. This field is required if the graph has multiple root node tables.
- `flatten_results`: An optional `BOOL` value that controls the output schema structure. The default value is `TRUE`.
  - `TRUE`: Flattens all node and edge properties into top-level columns with `<label>_<property>` prefixes.
  - `FALSE`: Retains hierarchical structure by returning root node properties as un-prefixed top-level columns and joined neighbor tables as nested `STRUCT` columns.

##### Details

The `GRAPH_EXPAND` function produces a relational table by applying a series
of `LEFT JOIN` operations to node and edge tables. Because of this join behavior,
the function only accepts certain types of property graphs.

> [!CAUTION]
> **Caution:** Changes to the underlying graph don't invalidate [cached results](https://docs.cloud.google.com/bigquery/docs/cached-results) for queries that call the `GRAPH_EXPAND` function. To ensure correct output, disable the retrieval of cached results when you call this function.

##### Input limitations

The schema of a property graph naturally forms a directed graph itself. Define
the *schema relationship graph* for a property graph as follows:

- Each node table defines a node.
- A directed edge from node table `A` to node table `B` exists if the
  following conditions are met:

  - An edge table exists whose source key references one of the node tables and whose destination key references the other node table. The direction of the edge in the schema relationship graph might not match the direction of the edge defined on the property graph.
  - The edge table defines a many-to-one relationship from table `A` to table `B`. In other words, every row in table `A` corresponds to at most one row in table `B`.

If the direction of the edge is ambiguous or there is a many-to-many
relationship between the tables, omit the edge.

A property graph is valid input to the `GRAPH_EXPAND` function if it meets the
following requirements:

- The property graph has at least one node table.
- Every node table has at least one key column defined.
- At least one property is defined on a node or edge table.
- If the graph contains measure definitions, then a property name can't match a key column name unless the property's expression is identical to the name itself.
- Every node or edge table uses the default label.
- The following conditions hold for the schema relationship graph of the
  property graph, or the subgraph reachable from `start_node_name` when
  `start_node` is specified:

  - If `start_node` is not specified, there is a single *root node* , defined as a node table with in-degree zero. If the property graph has multiple root node tables, you must specify `start_node`.
  - The graph, or subgraph reachable from `start_node`, is acyclic.
  - Every node in the graph or subgraph is reachable from the `start_node` or root node.
  - The in-degree of every node in the graph or subgraph is at most one.

##### Output

The `GRAPH_EXPAND` TVF returns a table derived from properties in the graph.

- If an edge table shares the same underlying table as its source node table or
  destination table and contributes no additional properties, then
  the edge is inlined and omitted from the output. Unless you specifically
  need to store custom properties on the edge, we recommend designing your
  schema so that edge tables satisfy the inlining criteria. This prevents
  unexpected and costly self-joins between your node and edge tables.

- When `flatten_results` is `TRUE`, output column names are
  constructed by concatenating the label name and property name with an
  underscore (`_`). For example, if a node table has the label `Person` and a
  property called `age`, then the column name corresponding to that property
  is `Person_age`.

- When `flatten_results` is `FALSE`, properties of the `start_node` table
  appear as un-prefixed top-level columns, and properties of joined adjacent
  tables appear as nested `STRUCT` columns named after the element table.
  If an element table has a property with the same name as an
  adjacent node or edge table, `flatten_results => FALSE` is not supported.

  Measures are accessed using dot notation within `AGG()`, such as
  `AGG(ElementStruct.measure_name)`.

To select columns that correspond to properties defined by a measure, you
must wrap them in the [`AGG` function](../googlesql-functions/aggregate_functions.md#agg). You can't directly select
columns that correspond to properties defined by a measure.

> [!WARNING]
> **Warning:** The output table is created by performing a sequence of `LEFT JOIN` operations on the graph's input tables. Depending on the relationships between your data, nodes might appear in your property graph that aren't reflected in the output table.

##### Examples

The following example creates a graph called `StoreGraph` based on the
`Stores` and `Locations` tables.

```sql
CREATE OR REPLACE TABLE mydataset.Locations (
  id INT64 PRIMARY KEY NOT ENFORCED,
  name STRING,
  population INT64
) AS (
  SELECT 101 AS id, 'Anytown' AS name, 1000 AS population
  UNION ALL
  SELECT 102 AS id, 'Sometown' AS name, 500 AS population
);

CREATE OR REPLACE TABLE mydataset.Stores (
  name STRING PRIMARY KEY NOT ENFORCED,
  location_id INT64 REFERENCES mydataset.Locations(id) NOT ENFORCED
) AS (
  SELECT 'Store 1' AS name, 101 AS location_id
  UNION ALL
  SELECT 'Store 2' AS name, 101 AS location_id
);

CREATE OR REPLACE PROPERTY GRAPH mydataset.StoreGraph
  NODE TABLES (
    mydataset.Stores AS S,
    mydataset.Locations AS L
    PROPERTIES(id, name, population, MEASURE(SUM(population)) AS total_population)
  )
  EDGE TABLES (
    mydataset.Stores AS SL
    SOURCE KEY (location_id) REFERENCES L (id)
    DESTINATION KEY (name) REFERENCES S (name)
  );
```

The property graph consists of four nodes that represent `Store 1`, `Store 2`,
`Anytown`, and `Sometown`. The property graph contains two edges: one from
`Anytown` to `Store 1` and another from `Anytown` to `Store 2`.

The schema relationship graph has a single edge
from the `Stores` node table to the `Locations` node table, because there is a
many-to-one relationship between them: many stores can belong to a single
location. This relationship is also reflected by the fact that `location_id`
is a foreign key in the `Stores` table.

The following query calls the `GRAPH_EXPAND` function and omits the
`L_total_population` column from the output because you can't directly select
a column for a property defined by a measure without using the `AGG` function:

```sql
SELECT * EXCEPT(L_total_population)
FROM GRAPH_EXPAND('mydataset.StoreGraph');

/*---------------+---------+------+---------+--------------+
 | S_location_id | S_name  | L_id | L_name  | L_population |
 +---------------+---------+------+---------+--------------+
 | 101           | Store 2 | 101  | Anytown | 1000         |
 | 101           | Store 1 | 101  | Anytown | 1000         |
 +---------------+---------+------+---------+--------------*/
```

The `Sometown` location doesn't appear in the output because it's
not referenced by the `location_id` foreign key in the
`Stores` table, so it's dropped from the `LEFT JOIN` that produces the output.

The columns `SL_location_id` and `SL_name` don't appear because the properties
of the edge table `SL` are identical to the properties of its node table `S`.

The following query shows the difference between aggregating a measure and
a regular value. When you apply the `AGG` function to the `L_total_population`
measure, population is counted exactly once per distinct `location_id` value.
If you call the `SUM` function on `L_population`, then the `L_population`
column contributes the population for every row in the table with a given
location ID.

```sql
SELECT
  S_location_id,
  AGG(L_total_population) AS true_total_population,
  SUM(L_population) AS overcounted_population
FROM GRAPH_EXPAND('mydataset.StoreGraph')
GROUP BY S_location_id;

/*---------------+-----------------------+------------------------+
 | S_location_id | true_total_population | overcounted_population |
 +---------------+-----------------------+------------------------+
 | 101           | 1000                  | 2000                   |
 +---------------+-----------------------+------------------------*/
```

The following query calls the `GRAPH_EXPAND` function with
`flatten_results => FALSE`. Properties of the root node table `S` appear as
un-prefixed top-level columns, and properties of the joined `L` node table
appear inside a nested `STRUCT`:

```sql
SELECT
  name,
  location_id,
  L.name AS location_name,
  AGG(L.total_population) AS true_total_population
FROM GRAPH_EXPAND('mydataset.StoreGraph', flatten_results => FALSE)
GROUP BY name, location_id, location_name;

/*---------+-------------+---------------+-----------------------+
 | name    | location_id | location_name | true_total_population |
 +---------+-------------+---------------+-----------------------+
 | Store 1 | 101         | Anytown       | 1000                  |
 | Store 2 | 101         | Anytown       | 1000                  |
 +---------+-------------+---------------+-----------------------*/
```

### `GRAPH_TABLE` operator

```text
FROM GRAPH_TABLE (
  property_graph_name
  multi_linear_query_statement
) [ [ AS ] alias ]
```

##### Description

Performs an operation on a graph in the `FROM` clause of a SQL query and then
produces a table with the results.

With the `GRAPH_TABLE` operator, you can use the [GQL syntax](query-statements.md)
to query a property graph. The result of this operation is produced as a table that
you can use in the rest of the query.

##### Definitions

- `property_graph_name`: The name of the property graph to query for patterns.
- `multi_linear_query_statement`: You can use GQL to query a property graph for patterns. For more information, see [Graph query language](query-statements.md).
- `alias`: An optional alias, which you can use to refer to the table produced by the `GRAPH_TABLE` operator elsewhere in the query.

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

You can use the `RETURN` statement to return specific node and edge properties.
For example:

```sql
SELECT name, id
FROM GRAPH_TABLE(
  graph_db.FinGraph
  MATCH (n:Person)
  RETURN n.name AS name, n.id AS id
);

/*-----------+
 | name | id |
 +-----------+
 | Alex | 1  |
 | Dana | 2  |
 | Lee  | 3  |
 +-----------*/
```

The following query produces an error because `id` isn't
included in the `RETURN` statement, even though this property exists for
element `n`:

```sql
SELECT name, id
FROM GRAPH_TABLE(
  graph_db.FinGraph
  MATCH (n:Person)
  RETURN n.name
);
```

The following query produces an error because directly outputting the graph
element `n` is not supported. Convert `n` to its JSON representation using the
`TO_JSON`
function for successful output.

```sql
-- Error
SELECT n
FROM GRAPH_TABLE(
  graph_db.FinGraph
  MATCH (n:Person)
  RETURN n
);
```

```sql
SELECT TO_JSON(n) as json_node
FROM GRAPH_TABLE(
  graph_db.FinGraph
  MATCH (n:Person)
  RETURN n
);

/*---------------------------+
 | json_node                 |
 +---------------------------+
 | {"identifier":"mUZpbk...} |
 | {"identifier":"mUZpbk...} |
 | {"identifier":"mUZpbk...} |
 +--------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-sql-queries (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
