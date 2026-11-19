---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-patterns
---

# GQL patterns

## Signature / Usage

Graph Query Language (GQL) supports the following patterns. Patterns can
be used in a `MATCH` statement.

### Pattern list

| Name | Summary |
|---|---|
| [Graph pattern](#graph-pattern) | A pattern to search for in a graph. |
| [Element pattern](#element-pattern) | Represents a node pattern or an edge pattern in a path pattern. |
| [Subpath pattern](#subpath-pattern) | Matches a portion of a path. |
| [Quantified path pattern](#quantified-path-pattern) | A path pattern with a portion that can repeat within a specified range. |
| [Label expression](#label-expression) | An expression composed from one or more graph label names in an element pattern. |
| [Path search prefix](#path-search-prefix) | Restricts path pattern to return all paths, any path, or a shortest path from each data partition. |
| [Path mode](#path-mode) | Includes or excludes paths that have repeating edges. |

### Graph pattern

```text
graph_pattern:
  path_pattern_list [ where_clause ]

path_pattern_list:
  top_level_path_pattern[, ...]

top_level_path_pattern:
  [ path_variable = ] [ { path_search_prefix | path_mode } ] path_pattern

path_pattern:
  path_term[ ...]

subpath_pattern:
  ( [ path_mode ] path_pattern [ where_clause ] )

path_term:
  { path_primary | quantified_path_primary }

path_primary:
  {
    element_pattern
    | subpath_pattern
  }

where_clause:
  WHERE bool_expression
```

##### Description

A graph pattern consists of a list of path patterns. You can optionally
include a `WHERE` clause. For example:

```sql
  (a:Account)-[e:Transfers]->(b:Account)          -- path pattern
  WHERE a != b                                    -- WHERE clause
```

##### Definitions

- `path_pattern_list`: A list of path patterns. For example, the
  following list contains two path patterns:

  ```sql
  (a:Account)-[t:Transfers]->(b:Account),         -- path pattern 1
  (a)<-[o:Owns]-(p:Person)                        -- path pattern 2
  ```

- `path_variable`: A variable for a path. For example, `p` is a
  path variable:

  ```sql
  p = (a:Account)-[e:Transfers]->(b:Account)
  ```

- `path_search_prefix`: a qualifier for a path pattern to return all paths, any
  path, or any shortest path. For more information, see [Path search prefix](#path-search-prefix).

- `path_mode`: The [path mode](#path-mode) for a path pattern. Used to filter out
  paths that have repeating edges.

- `path_pattern`: A path pattern that matches paths in a property graph.
  For example:

  ```sql
  (a:Account)-[e:Transfers]->(b:Account)
  ```

- `path_term`: An [element pattern](#element-pattern) or a
  [subpath pattern](#subpath-pattern) in a path pattern.

- `subpath_pattern`: A path pattern enclosed in parentheses. To learn
  more, see [Graph subpath pattern](#subpath-pattern).

- `quantified_path_primary`: The quantified path pattern to add to the
  graph query. To learn more, see [Quantified path pattern](#quantified-path-pattern).

- `element_pattern`: A node pattern or an edge pattern. To learn more, see
  [Element pattern definition](#element-pattern).

- `where_clause`: A `WHERE` clause, which filters the matched results. For
  example:

  ```sql
  MATCH (a:Account)->(b:Account)
  WHERE a != b
  ```

  Boolean expressions can be used in a `WHERE` clause, including
  graph-specific [predicates](../googlesql-syntax/operators.md#graph-predicates) and
  [logical operators](../googlesql-syntax/operators.md#graph-logical-operators). Use the
  [field access operator](../googlesql-syntax/operators.md#field-access-operator) to access graph properties.

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query matches all nodes:

```sql
GRAPH graph_db.FinGraph
MATCH (n)
RETURN n.name, n.id

/*-----------+
 | name | id |
 +-----------+
 | NULL | 7  |
 | NULL | 16 |
 | NULL | 20 |
 | Alex | 1  |
 | Dana | 2  |
 | Lee  | 3  |
 +-----------*/
```

The following query matches all directed edges:

```sql
GRAPH graph_db.FinGraph
MATCH ()-[e]->()
RETURN COUNT(e.id) AS results

/*---------+
 | results |
 +---------+
 | 8       |
 +---------*/
```

The following query matches all directed edges in either direction:

```sql
GRAPH graph_db.FinGraph
MATCH ()-[e]-()
RETURN COUNT(e.id) AS results

/*---------+
 | results |
 +---------+
 | 16      |
 +---------*/
```

The following query matches paths matching two path patterns:

```sql
GRAPH graph_db.FinGraph
MATCH
  (src:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(dst:Account),
  (mid)<-[:Owns]-(p:Person)
RETURN
  p.name, src.id AS src_account_id, mid.id AS mid_account_id,
  dst.id AS dst_account_id

/*---------------------------------------------------------+
 | name | src_account_id | mid_account_id | dst_account_id |
 +---------------------------------------------------------+
 | Alex | 20             | 7              | 16             |
 | Alex | 20             | 7              | 16             |
 | Dana | 16             | 20             | 7              |
 | Dana | 16             | 20             | 16             |
 | Lee  | 7              | 16             | 20             |
 | Lee  | 7              | 16             | 20             |
 | Lee  | 20             | 16             | 20             |
 +---------------------------------------------------------*/
```

The following query converts a GQL path to JSON. Only unblocked accounts are
included in the results and the results have been truncated for readability.

Adapted (not in the official docs): The result comment is closed with `*/` instead of `/*`.

```sql
GRAPH graph_db.FinGraph
MATCH p=(account:Account {is_blocked: false})-[transfer:Transfers]-(dst:Account)
RETURN TO_JSON(p) as results

/*---------------------------------------------------------------------------------------+
 | results                                                                               |
 +---------------------------------------------------------------------------------------+
 | [{...,"properties":{...,"id":20,"is_blocked":false,"nick_name":"Rainy Day Fund"}},... |
 | [{...,"properties":{...,"id":7,"is_blocked":false,"nick_name":"Vacation Fund"}},...   |
 | [{...,"properties":{...,"id":7,"is_blocked":false,"nick_name":"Vacation Fund"}},...   |
 | [{...,"properties":{...,"id":20,"is_blocked":false,"nick_name":"Rainy Day Fund"}},... |
 | [{...,"properties":{...,"id":20,"is_blocked":false,"nick_name":"Rainy Day Fund"}},... |
 | [{...,"properties":{...,"id":7,"is_blocked":false,"nick_name":"Vacation Fund"}},...   |
 +---------------------------------------------------------------------------------------*/
```

### Element pattern

> [!NOTE]
> **Note:** Syntax characters enclosed in double quotes (`""`) are literal and required.

```text
element_pattern:
  {
    node_pattern |
    edge_pattern
  }

node_pattern:
  (pattern_filler)

edge_pattern:
  {
    full_edge_any |
    full_edge_left |
    full_edge_right |
    abbreviated_edge_any |
    abbreviated_edge_left |
    abbreviated_edge_right
  }

full_edge_any:
  "-[" pattern_filler "]-"

full_edge_left:
  "<-[" pattern_filler "]-"

full_edge_right:
  "-[" pattern_filler "]->"

abbreviated_edge_any:
  -

abbreviated_edge_left:
  <-

abbreviated_edge_right:
  ->

pattern_filler:
  [ graph_pattern_variable ]
  [ is_label_condition ]
  [ { where_clause | property_filters } ]
  [ cost_expression ]

is_label_condition:
  { IS | : } label_expression

cost_expression:
  COST expression

where_clause:
  WHERE bool_expression

property_filters:
  "{" element_property[, ...] "}"

element_property:
  element_property_name : element_property_value
```

##### Description

An element pattern is either a node pattern or an edge pattern.

##### Definitions

- `node_pattern`: a pattern to match nodes in a property graph. For example:

  ```sql
  (n:Person)          -- Matches all Person nodes in a property graph.
  ```

  ```sql
  (a:Account)            -- Matches all Account nodes in a property graph.
  ```

  ```sql
  ()                  -- Matches all nodes in a property graph.
  ```

- `edge_pattern`: a pattern to match edges in a property graph. For example:

  Adapted (not in the official docs): A `:` is added so `Transfers` is a label filter.

  ```sql
  -[:Transfers]->       -- Matches all Transfers edges in a property graph.
  ```

  ```sql
  -[]->               -- Matches all right directed edges in a property graph.
  ```

  ```sql
  (n:Person)-(a:Account) -- Matches edges between Person and Account nodes in any direction.
  ```

  There are several types of edge patterns:
  - `full_edge_any`: Any-direction edge with an optional pattern filler.
  - `abbreviated_edge_any`: Any-direction edge, no pattern filler.

    ```sql
    -[e:Transfers]-     -- Any-direction full edge with filler.
    -[]-                 -- Any-direction full edge, no filler.
    -                    -- Any-direction abbreviated edge.
    ```

  - `full_edge_left`: Left-direction edge with an optional pattern filler.
  - `abbreviated_edge_left`: Left-direction edge, no pattern filler.

    ```sql
    <-[e:Transfers]-  -- Left full edge with filler.
    <-[]-              -- Left full edge, no filler.
    <-                 -- Left abbreviated edge.
    ```

  - `full_edge_right`: Right-direction edge with an optional pattern filler.
  - `abbreviated_edge_right`: Right-direction edge, no pattern filler.

    ```sql
    -[e:Transfers]->  -- Right full edge with filler.
    -[]->              -- Right full edge, no filler.
    ->                 -- Right abbreviated edge.
    ```

- `pattern_filler`: A pattern filler represents specifications on the node or
  edge pattern that you want to match. A pattern filler can optionally contain
  `graph_pattern_variable`, `is_label_condition`,

  `where_clause` or `property_filters`, and a cost expression
  . For example:

  ```sql
  (p:Person WHERE p.name = 'Alex')
  ```

- `graph_pattern_variable`: A variable for the pattern filler.
  You can use a graph pattern variable to reference the element
  it's bound to in a linear graph query.

  `a` is the variable for the graph pattern element `a:Account` in the
  following example:

  ```sql
  (p:Person)-[:Owns]->(a:Account),
  (a)-[:Transfers]->(a2:Account WHERE a2.nick_name = 'Vacation Fund')
  ```

- `is_label_condition`: A `label expression` that the matched nodes and edges
  must satisfy. This condition includes `label expression`. You can use
  either `IS` or `:` to begin a condition. For example, these are the same:

  ```sql
  (p IS Person)
  ```

  ```sql
  (p:Person)
  ```

  ```sql
  -[IS Transfers]->
  ```

  ```sql
  -[:Transfers]->
  ```

- `label_expression`: The expression for the label. For more information,
  see [Label expression definition](#label-expression).

- `where_clause`: A `WHERE` clause, which filters the nodes or edges that were
  matched.

  Boolean expressions are supported, including graph-specific [predicates](../googlesql-syntax/operators.md#graph-predicates)
  and [logical operators](../googlesql-syntax/operators.md#graph-logical-operators).

  The `WHERE` clause can't reference properties when the graph pattern variable
  is absent.

  Use the [field access operator](../googlesql-syntax/operators.md#field-access-operator) to access
  graph properties.

  Examples:

  ```sql
  (p:Person WHERE p.name = 'Dana')
  ```

  ```sql
  (p:Person)->(a:Account)<-(p2)
  WHERE p.name != p2.name
  ```

  ```sql
  (p:Person)-[o:Owns]->
  (a:Account WHERE a.nick_name = 'Rainy Day Fund')
  ```

- `cost_expression`: An optional expression for an edge pattern. This expression
  is used to calculate the total compute cost of a path when used with the
  `ANY CHEAPEST` path search
  prefixes. The expression must evaluate to a finite positive number. `COST`
  can be applied only to edge patterns. For more information, see [Path search
  prefix](#path-search-prefix).

  **Example**

  Adapted (not in the official docs): The edge label `Transfer` is changed to `Transfers`.

  ```sql
  GRAPH graph_db.FinGraph
  MATCH ANY CHEAPEST (a)-[e:Transfers COST e.amount]->{1,3}(b)
  RETURN a.id, b.id
  ```

- `property_filters`: Filters the nodes or edges that were matched. It contains
  a key value map of element properties and their values. Property filters can
  appear in both node and edge patterns.

  Examples:

  ```sql
  {name: 'Dana'}
  ```

  ```sql
  {nick_name: 'Vacation Fund', is_blocked: false}
  ```

- `element_property`: An element property in `property_filters`. The same
  element property can be included more than once in the same
  property filter list. Element properties can be included in any order in a
  property filter list.

  - `element_property_name`: An identifier that represents the name of the
    element property. The property that is identified must be defined in the
    graph element.

  - `element_property_value`: A scalar expression that represents the value for
    the element property. It must be equal to the property value for the filter
    to match. This value can be a `NULL` literal, but the `NULL` literal is
    interpreted as `= NULL`, not `IS NULL` when the element property filter is
    applied.

  Examples:

```sql
(n:Person {name: 'Dana'})
```

```sql
(t:Transfers {id: t.to_id})
```

```sql
(n1:Person)-[e: Owns {account_id: 16}]->(n2:Account)
```

```sql
(:Person {name: 'Alex'})-[o:owns]->(a:Account)
```

```sql
(n:Person|Account {id: 16})
```

```sql
(a:Account {is_blocked: false, nick_name: 'Vacation Fund'})
```

```sql
(a {is_blocked: false, nick_name: 'Vacation Fund'})
```

```sql
(a:Account {id: 7})-[t:Transfers {to_id: 9 + t.id}]->
```

  The following are equivalent:

```sql
(a:Account WHERE a.id = 100 AND a.is_blocked = true)
```

```sql
(a:Account {id: 100, is_blocked: true})
```

  Although a `NULL` literal can be used as property value in the
  property filter, the semantics is `= NULL`, not `IS NULL`.
  This distinction is important when you create an element pattern:

```sql
(n:Person {id: NULL})          -- '= NULL'
(n:Person WHERE n.id = NULL)   -- '= NULL'
(n:Person WHERE n.id IS NULL)  -- 'IS NULL'
```

  The following produce errors:

```sql
-- Error: The property specification for a2 can't reference properties in
-- t and a1.
(a1:Account)-[t:transfers]->(a2:Account {id: a1.id})
```

```sql
-- Error: Aggregate expressions aren't allowed.
(n:Person {id: SUM(n.id)})
```

```sql
-- Error: A property called unknown_property doesn't exist for Person.
(n:Person {unknown_property: 100})
```

```sql
-- Error: An element property filter list can't be empty
(n:Person {})
```

##### Details

Nodes and edges matched by `element_pattern` are referred to as graph elements.
Graph elements can be used in GQL [predicates](../googlesql-syntax/operators.md#graph-predicates), [functions](gql-functions.md)
and subqueries within GQL.

Set operations support graph elements that have a common [supertype](../googlesql-syntax/conversion_rules.md#supertypes).

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query matches all nodes in the graph. `n` is a graph pattern
variable that's bound to the matching nodes:

```sql
GRAPH graph_db.FinGraph
MATCH (n)
RETURN LABELS(n) AS label

/*-----------+
 | label     |
 +-----------+
 | [Account] |
 | [Account] |
 | [Account] |
 | [Person]  |
 | [Person]  |
 | [Person]  |
 +-----------*/
```

The following query matches all edges in the graph.
`e` is a graph pattern variable that's bound to the matching edges:

```sql
GRAPH graph_db.FinGraph
MATCH -[e]->
RETURN e.id

/*----+
 | id |
 +----+
 | 20 |
 | 7  |
 | 7  |
 | 20 |
 | 16 |
 | 1  |
 | 3  |
 | 2  |
 +----*/
```

The following queries matches all nodes with a given label in the graph. `n` is
a graph pattern variable that's bound to the matching nodes:

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person)
RETURN n.name, n.id

/*-----------+
 | name | id |
 +-----------+
 | Alex | 1  |
 | Dana | 2  |
 | Lee  | 3  |
 +-----------*/
```

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person|Account)
RETURN n.id, n.name, n.nick_name

/*----------------------------+
 | id | name | nick_name      |
 +----------------------------+
 | 7  | NULL | Vacation Fund  |
 | 16 | NULL | Vacation Fund  |
 | 20 | NULL | Rainy Day Fund |
 | 1  | Alex | NULL           |
 | 2  | Dana | NULL           |
 | 3  | Lee  | NULL           |
 +----------------------------*/
```

The following query matches all edges in the graph that have the `Owns` label.
`e` is a graph pattern variable that's bound to the matching edges:

```sql
GRAPH graph_db.FinGraph
MATCH -[e:Owns]->
RETURN e.id

/*----+
 | id |
 +----+
 | 1  |
 | 3  |
 | 2  |
 +----*/
```

In the following query, the `WHERE` clause is used to filter out nodes whose
`birthday` property is no greater than `1990-01-10`:

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person WHERE n.birthday > '1990-01-10')
RETURN n.name

/*------+
 | name |
 +------+
 | Alex |
 +------*/
```

In the following query, the `WHERE` clause is used to only include edges whose
`create_time` property is greater than `2020-01-14` and less than `2020-05-14`:

```sql
GRAPH graph_db.FinGraph
MATCH -[e:Owns WHERE e.create_time > '2020-01-14'
                 AND e.create_time < '2020-05-14']->
RETURN e.id

/*----+
 | id |
 +----+
 | 2  |
 | 3  |
 +----*/
```

You can filter graph elements with property filters. The following query
uses a property filter, `{is_blocked: false}`, to only include elements
that have the `is_blocked` property set as `false`:

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account {is_blocked: false})
RETURN a.id

/*----+
 | id |
 +----+
 | 7  |
 | 20 |
 +----*/
```

You can use multiple property element filters to filter results. The following
query uses the property element filter list,
`{is_blocked: false, nick_name: 'Vacation Fund'}`
to only include elements that have the `is_blocked` property set as `false`
and the `nick_name` property set as `Vacation Fund`:

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account {is_blocked: false, nick_name: 'Vacation Fund'})
RETURN a.id

/*----+
 | id |
 +----+
 | 7  |
 +----*/
```

The following query matches right directed `Transfers` edges connecting two
`Account` nodes.

```sql
GRAPH graph_db.FinGraph
MATCH (src:Account)-[transfer:Transfers]->(dst:Account)
RETURN src.id AS src_id, transfer.amount, dst.id AS dst_id

/*--------------------------+
 | src_id | amount | dst_id |
 +--------------------------+
 | 7      | 300    | 16     |
 | 7      | 100    | 16     |
 | 16     | 300    | 20     |
 | 20     | 500    | 7      |
 | 20     | 200    | 16     |
 +--------------------------*/
```

The following query matches any direction `Transfers` edges connecting two
`Account` nodes.

```sql
GRAPH graph_db.FinGraph
MATCH (src:Account)-[transfer:Transfers]-(dst:Account)
RETURN src.id AS src_id, transfer.amount, dst.id AS dst_id

/*--------------------------+
 | src_id | amount | dst_id |
 +--------------------------+
 | 16     | 300    | 7      |
 | 16     | 100    | 7      |
 | 20     | 300    | 7      |
 | 7      | 500    | 16     |
 | 7      | 200    | 16     |
 | 20     | 300    | 16     |
 | 20     | 100    | 16     |
 | 16     | 300    | 20     |
 | 7      | 500    | 20     |
 | 16     | 200    | 20     |
 +--------------------------*/
```

The following query matches left directed edges connecting `Person` nodes to
`Account` nodes, using the left directed abbreviated edge pattern.

```sql
GRAPH graph_db.FinGraph
MATCH (account:Account)<-(person:Person)
RETURN account.id, person.name

/*------------+
 | id  | name |
 +------------+
 | 7   | Alex |
 | 20  | Dana |
 | 16  | Lee  |
 +------------*/
```

You can reuse variable names in patterns. The same variable name binds to the
same node or edge. The following query reuses a variable called `a`:

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(a:Account)
RETURN a.id AS a_id

/*------+
 | a_id |
 +------+
 | 16   |
 | 20   |
 +------*/
```

In the following query, `a` and `a2` are different variable names but can match
the same node:

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(a2)
RETURN a.id AS a_id, a2.id AS a2_id

/*--------------+
 | a_id | a2_id |
 +--------------+
 | 20   | 16    |
 | 20   | 16    |
 | 7    | 20    |
 | 7    | 20    |
 | 20   | 20    |
 | 16   | 7     |
 | 16   | 16    |
 +--------------*/
```

You need to explicitly apply the `WHERE` filter if you only want to match a path
if `a` and `a2` are different. For example:

```sql
GRAPH graph_db.FinGraph
MATCH (a:Account)-[t1:Transfers]->(mid:Account)-[t2:Transfers]->(a2)
WHERE a.id != a2.id
RETURN a.id AS a_id, a2.id AS a2_id

/*--------------+
 | a_id | a2_id |
 +--------------+
 | 20   | 16    |
 | 20   | 16    |
 | 7    | 20    |
 | 7    | 20    |
 | 16   | 7     |
 +--------------*/
```

### Subpath pattern

A subpath pattern matches a portion of a path. You can create a subpath pattern
by enclosing a portion of a path pattern within parentheses. A subpath pattern
can contain inner subpath patterns.

##### Rules

- A subpath pattern can be combined with node patterns, edge patterns, or other subpaths on either end.
- The portion of a path pattern enclosed within a subpath pattern must adhere to the same rules as a standard path pattern
- A subpath pattern can contain subpath patterns. This results in outer subpath patterns and inner subpath patterns.
- Inner subpath patterns are resolved first, followed by outer subpath patterns, and then the rest of the path pattern.
- If a variable is declared outside of a subpath pattern, it can't be referenced inside the subpath pattern.
- If a variable is declared inside of a subpath pattern, it can be referenced outside of the subpath pattern.

##### Details

When you execute a query, an empty node pattern is added to the beginning
and ending inside a subpath if the beginning and ending don't already have
node patterns. For example:

| Before | After |
|---|---|
| (node edge node) | (node edge node) |
| (edge node) | (empty_node edge node) |
| (node edge) | (node edge empty_node) |
| (edge) | (empty_node edge empty_node) |

If this results in two node patterns that are
next to each other or a node pattern is next to a subpath, a `SAME` operation
is performed on to the consecutive node patterns.

The following are examples of subpath patterns:

```sql
  -- Success: t and a are both declared within the same subpath pattern and
  -- can be referenced in that subpath pattern.
  (-[t:Transfers]->(a:Account)->(b:Account) WHERE t.id > a.id)
```

```sql
  -- Success: t and a are both declared within the same subpath pattern
  -- hierarchy and can be referenced inside of that subpath pattern hierarchy.
  (-[t:Transfers]->((a:Account)->(b:Account)) WHERE t.id > a.id)
```

```sql
  -- Error: t is declared outside of the inner subpath pattern and therefore
  -- can't be referenced inside of the inner subpath pattern.
  (-[t:Transfers]->((a:Account)->(b:Account) WHERE a.id = t.id))
```

```sql
  -- Success: t and a are declared in a subpath pattern and can be used outside
  -- of the subpath pattern.
  (-[t:Transfers]->(a:Account))->(b:Account) WHERE a.id = t.id
```

```sql
  -- No subpath patterns:
  (a:Account)-[t:Transfers]->(b:Account)-[u:Transfers]->(c:Account)
```

```sql
  -- One subpath pattern on the left:
  ((a:Account)-[t:Transfers]->(b:Account))-[u:Transfers]->(c:Account)
```

```sql
  -- One subpath pattern on the right:
  (a:Account)-[t:Transfers]->((b:Account)-[u:Transfers]->(c:Account))
```

```sql
  -- One subpath pattern around the entire path pattern:
  ((a:Account)-[t:Transfers]->(b:Account)-[u:Transfers]->(c:Account))
```

```sql
  -- One subpath pattern that contains only a node pattern:
  ((a:Account))-[t:Transfers]->(b:Account)-[u:Transfers]->(c:Account)
```

```sql
  -- One subpath pattern that contains only an edge pattern:
  (a:Account)(-[t:Transfers]->)(b:Account)-[u:Transfers]->(c:Account)
```

```sql
  -- Two subpath patterns, one inside the other:
  ((a:Account)(-[t:Transfers]->(b:Account)))-[u:Transfers]->(c:Account)
```

```sql
  -- Three consecutive subpath patterns:
  ((a:Account))(-[t:Transfers]->(b:Account))(-[u:Transfers]->(c:Account))
```

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

In the following query, the subpath
`(src:Account)-[t1:Transfers]->(mid:Account)` is evaluated first, then the rest
of the path pattern:

```sql
GRAPH graph_db.FinGraph
MATCH
  ((src:Account)-[t1:Transfers]->(mid:Account))-[t2:Transfers]->(dst:Account)
RETURN
  src.id AS src_account_id, mid.id AS mid_account_id, dst.id AS dst_account_id

/*--------------------------------------------------+
 | src_account_id | mid_account_id | dst_account_id |
 +--------------------------------------------------+
 | 20             | 7              | 16             |
 | 20             | 7              | 16             |
 | 7              | 16             | 20             |
 | 7              | 16             | 20             |
 | 20             | 16             | 20             |
 | 16             | 20             | 7              |
 | 16             | 20             | 16             |
 +--------------------------------------------------*/
```

### Quantified path pattern

> [!NOTE]
> **Note:** Syntax characters enclosed in double quotes (`""`) are literal and required.

```text
quantified_path_primary:
  path_primary
  { fixed_quantifier | bounded_quantifier }

fixed_quantifier:
  "{" bound "}"

bounded_quantifier:
  "{" [ lower_bound ], upper_bound "}"
```

##### Description

A quantified path pattern is a path pattern with a portion that can repeat
within a specified range. You can specify the range, using a quantifier. A
quantified path pattern is commonly used to match variable-length paths.

A graph pattern variable declared in a quantified pattern becomes a *group
variable* when accessed outside that pattern. It binds to an array of
matched graph elements.

You can access a group variable as an array. Its graph elements are preserved in
the order of their appearance along the matched paths. You can aggregate a group
variable using [horizontal aggregation](gql-functions.md#horizontal-aggregate-function-calls-in-gql).

##### Definitions

- `quantified_path_primary`: The quantified path pattern to add to the graph query.
- `path_primary`: The portion of a path pattern to be quantified.
- `fixed_quantifier`: The exact number of times the path pattern portion must
  repeat.

  - `bound`: A positive integer that represents the exact number of repetitions.
- `bounded_quantifier`: The minimum and maximum number of times the path
  pattern portion can repeat.

  - `lower_bound`: A non-negative integer that represents the minimum number
    of times that the path pattern portion must repeat. If a lower bound
    isn't provided, 0 is used by default.

  - `upper_bound`: A positive integer that represents the maximum number of
    times that the path pattern portion can repeat. If an upper bound is
    specified, it must be equal to or greater than
    `lower_bound`.

##### Details

- A path must have a *minimum node count* greater than 0. The minimum node
  count of a quantified portion within the path is calculated as:

  ```text
  min_node_count = lower_quantifier * node_count_of_quantified_path
  ```

  When `bound` or `lower_bound` of the quantified path pattern portion is 0,
  the path must contain other parts with *minimum node count* greater than 0.
- A quantified path must have a *minimum path length* greater than 0. The
  minimum path length of a quantified path is calculated as:

  ```text
  min_path_length = lower_quantifier * length_of_quantified_path
  ```

  The path length of a node is 0. The path length of an edge is 1.
- A quantified path pattern with `bounded_quantifier` matches paths of any
  length between the lower and the upper bound. This is equivalent to unioning
  match results from multiple quantified path patterns with
  `fixed_quantifier`, one for each number between the lower bound and upper
  bound.

- Quantification is allowed on an edge or subpath. When quantifying an edge,
  the edge pattern is canonicalized into a subpath.

  ```text
  -[]->{1, 5}
  ```

  is canonicalized into

  ```text
  (()-[]->()){1, 5}
  ```

- Multiple quantifications are allowed in the same graph pattern, however,
  quantifications may not be nested.

- Only singleton variables can be multiply-declared. A singleton variable is a
  variable that binds exactly to one node or edge.

  In the following `MATCH` statement, the variables `p`, `t`, and `f` are
  singleton variables, which bind exactly to one element each.

  ```sql
  MATCH (p)-[t]->(f)
  ```

- Variables defined within a quantified path pattern bind to an array of
  elements outside of the quantified path pattern and are called group
  variables.

  In the following `MATCH` statement, the path pattern has the quantifier `{1,
  3}`. The variables `p`, `t`, and `f` each bind to an array of
  elements in the `MATCH` statement result and are considered group variables:

  ```sql
  MATCH ((p)-[t]->(f)){1, 3}
  ```

  Within the quantified pattern, before the quantifier is applied, `p`,
  `t`, and `f` each bind to exactly one element and are considered
  singleton variables.

The following are other syntax examples of a quantified path pattern:

```sql
-- Quantified path pattern with a fixed quantifier:
MATCH ((a:Account)-[t:Transfers]->(b:Account)){2}

-- Equivalent:
MATCH ((a0:Account)-[t0:Transfers]->(b0:Account)(a1:Account)-[t1:Transfers]->(b1:Account))
```

```sql
-- Quantified path pattern with a bounded quantifier:
MATCH ((a:Account)-[t:Transfers]->(b:Account)){1,3}
RETURN return_statement

-- Equivalent:
MATCH ((a:Account)-[t:Transfers]->(b:Account)){1}
RETURN return_statement
UNION ALL
MATCH ((a:Account)-[t:Transfers]->(b:Account)){2}
RETURN return_statement
UNION ALL
MATCH ((a:Account)-[t:Transfers]->(b:Account)){3}
RETURN return_statement
```

```sql
-- Quantified subpath with default lower bound (0) and an upper bound.
-- When subpath is repeated 0 times, the path pattern is semantically equivalent
-- to (source_acct:Account)(dest_acct:Account).
MATCH (source_acct:Account)((a:Account)-[t:Transfers]->(b:Account)){, 4}(dest_acct:Account)
```

```sql
-- Edge quantification is canonicalized into subpath quantification:
MATCH (a:Account)-[t:Transfers]->{1,2}(b:Account)

-- Equivalent:
MATCH (a:Account)(()-[t:Transfers]->()){1,2}(b:Account)
```

```sql
-- ERROR: Minimum path length for the quantified path is 0.
MATCH (a:Account){1, 3}
```

```sql
-- ERROR: Minimum node count and minimum path length for the entire path is 0.
MATCH ((a:Account)-[t:Transfers]->(b:Account)){0}
```

```sql
-- ERROR: Minimum path length for the entire path is 0 when quantified portion
-- is repeated 0 times.
MATCH (:Person)((a:Account)-[t:Transfers]->(b:Account)){0, 3}
```

```sql
-- ERROR: `a` is declared once as a group variable and once as a singleton
-- variable.
MATCH (c:Account) ((a:Account)-[t:Transfers]->(b:Account)){1, 3}->(a:Account)
```

```sql
-- ERROR: `a` is declared twice as a group variable.
MATCH ((a:Account)-[t:Transfers]->(b:Account)){1, 3}-[u:Transfers]->((a:Account)-[v:Transfers]-(c:Account)){2}
```

```sql
-- Since both declarations of `a` are within the quantifier’s pattern,
-- they are treated as singleton variables and can be multiply-declared.
MATCH (b:Account)((a:Account)-[t:Transfers]->(a:Account)){1, 3}
```

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query uses a quantified path pattern to match all of the
destination accounts that are one to three transfers away from a source account
with `id` equal to `7`:

```sql
GRAPH graph_db.FinGraph
MATCH (src:Account {id: 7})-[e:Transfers]->{1, 3}(dst:Account)
WHERE src != dst
RETURN ARRAY_LENGTH(e) AS hops, dst.id AS dst_account_id

/*-----------------------+
 | hops | dst_account_id |
 +-----------------------+
 | 1    | 16             |
 | 3    | 16             |
 | 3    | 16             |
 | 1    | 16             |
 | 2    | 20             |
 | 2    | 20             |
 +-----------------------*/
```

The following query uses a quantified path pattern to match paths between
accounts with one to two transfers through intermediate accounts that are
blocked:

```sql
GRAPH graph_db.FinGraph
MATCH
  (src:Account)
  ((:Account)-[:Transfers]->(mid:Account {is_blocked:true})){1,2}
  -[:Transfers]->(dst:Account)
RETURN src.id AS src_account_id, dst.id AS dst_account_id

/*---------------------------------+
 | src_account_id | dst_account_id |
 +---------------------------------+
 | 7              | 20             |
 | 7              | 20             |
 | 20             | 20             |
 +---------------------------------*/
```

In the following query, `e` is declared in a quantified path pattern. When
referenced outside of that pattern, `e` is a group variable bound to an array
of `Transfers`. You can use the group variable in aggregate functions such
as `SUM` and `ARRAY_LENGTH` inside of a `LET`, `WHERE`, or `FILTER` clause:

```sql
GRAPH graph_db.FinGraph
MATCH
  (src:Account {id: 7})-[e:Transfers WHERE e.amount > 100]->{0,2}
  (dst:Account)
WHERE src.id != dst.id
LET total_amount = SUM(e.amount)
RETURN
  src.id AS src_account_id, dst.id AS dst_account_id,
  ARRAY_LENGTH(e) AS number_of_hops, total_amount

/*-----------------------------------------------------------------+
 | src_account_id | dst_account_id | number_of_hops | total_amount |
 +-----------------------------------------------------------------+
 | 7              | 16             | 1              | 300          |
 | 7              | 20             | 2              | 600          |
 +-----------------------------------------------------------------*/
```

### Label expression

```text
label_expression:
  {
    label_name
    | or_expression
    | and_expression
    | not_expression
  }
```

##### Description

A label expression is formed by combining one or more labels with logical
operators (AND, OR, NOT) and parentheses for grouping.

##### Definitions

- `label_name`: The label to match. Use `%` to match any label in the
  graph. For example:

  ```sql
  (p:Person)
  ```

  ```sql
  (p:%)
  ```

- `or_expression`: [GQL logical `OR` operation](../googlesql-syntax/operators.md#graph-logical-operators) for
  label expressions. For example:

  ```sql
  (p:(Person|Account))
  ```

  ```sql
  (p:(Person|(Account|Loan)))
  ```

  ```sql
  (p:(Person|(Account&Loan)))
  ```

- `and_expression`: [GQL logical `AND` operation](../googlesql-syntax/operators.md#graph-logical-operators) for
  label expressions. For example:

  ```sql
  (p:(Person&Account))
  ```

  ```sql
  (p:(Person&(Account|Loan)))
  ```

  ```sql
  (p:(Person&(Account&Loan)))
  ```

- `not_expression`: [GQL logical `NOT` operation](../googlesql-syntax/operators.md#graph-logical-operators) for
  label expressions. For example:

  ```sql
  (p:!Person)
  ```

  ```sql
  (p:(!Person&!Account))
  ```

  ```sql
  (p:(Person|(!Account&!Loan)))
  ```

##### Details

If a label in defined in the schema, it exposes a set of properties
with declared names and data types. When a node or edge carries this
label, the properties exposed by that label are always accessible through
the node or edge.

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query matches all nodes with the label `Person`
in the [`FinGraph`](schema-statements.md#fingraph-example) property graph.

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person)
RETURN n.name

/*------+
 | name |
 +------+
 | Alex |
 | Dana |
 | Lee  |
 +------*/
```

The following query matches all nodes that have either a `Person`
or an `Account` label in the [`FinGraph`](schema-statements.md#fingraph-example) property graph.

```sql
GRAPH graph_db.FinGraph
MATCH (n:Person|Account)
RETURN n.id

/*----+
 | id |
 +----+
 | 7  |
 | 16 |
 | 20 |
 | 1  |
 | 2  |
 | 3  |
 +----*/
```

### Path search prefix

```text
path_search_prefix:
  {
    ALL
    | ANY
    | ANY SHORTEST
    | ANY CHEAPEST
  }
```

##### Description

Restricts path pattern to return all paths, any path, or a shortest path from
each data partition.

##### Definitions

- `ALL` (default) : Returns all paths matching the path pattern. This is the default value when no search prefix is specified.
- `ANY`: Returns any path matching the path pattern from each data partition.
- `ANY SHORTEST`: Returns a shortest path (the path with the least number of edges) matching the path pattern from each data partition. If there are more than one shortest paths per partition, returns any one of them.
- `ANY CHEAPEST`: Returns one of the cheapest paths matching the path pattern from each data partition. A cheapest path is one with the minimum total compute cost, calculated from `COST` expressions on edges in the path. If multiple cheapest paths exist per partition, returns any one of the paths.

##### Details

The path search prefix first partitions the match results by their endpoints
(the first and last nodes) then selects paths from each group.

The `ANY` and `ANY SHORTEST` prefixes can return multiple paths, one
for each distinct pair of endpoints.

When using prefixes other than `ALL` in a path pattern, don't reuse
variables defined within that pattern elsewhere in the same `MATCH` statement,
unless the variable represents an endpoint. Each prefix needs to operate
independently on its associated path pattern.

###### Path cost expression

When you use the `ANY CHEAPEST`
parameter, edge patterns in the
path expression can include a cost expression using `COST <expr>`. The total
compute cost of a path is the sum of costs of edges that have `COST`
expressions.

To use `ANY CHEAPEST` in a query:

- At least one `COST` expression must be defined within the path pattern.
- All quantified edge patterns within the path pattern must include a `COST` expression.
- The `COST` expression must be used only on edge patterns.
- All variables used by `<expr>` must be local to the edge pattern.
- `<expr>` must be a [numeric](../googlesql-syntax/data-types.md#numeric-types) type
- `<expr>` must evaluate to a finite positive number. `NULL`, zero, negative values, `Inf`, and `NaN` produce a runtime error.

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query matches a shortest path between each pair of `[a, b]`.

```sql
GRAPH graph_db.FinGraph
MATCH ANY SHORTEST (a:Account {is_blocked:true})-[t:Transfers]->{1, 4} (b:Account)
LET path_length = COUNT(t)
RETURN a.id AS a_id, path_length, b.id AS b_id

/*------+-------------+------+
 | a_id | path_length | b_id |
 +------+-------------+------+
 |   16 |           2 |   16 |
 |   16 |           2 |    7 |
 |   16 |           1 |   20 |
 +------+-------------+------*/
```

The following query matches any path between each pair of `[a, b]`.

```sql
GRAPH graph_db.FinGraph
MATCH ANY (a:Account {is_blocked: true})->(mid:Account)->(b:Account)
RETURN a.id AS a_id, mid.id AS mid_id, b.id AS b_id

/*------+--------+------+
 | a_id | mid_id | b_id |
 +------+--------+------+
 | 16   | 20     | 16   |
 | 16   | 20     | 7    |
 +------+--------+------*/
```

The following query matches all paths between each pair of `[a, b]`. The `ALL`
prefix doesn't filter out any result.

```sql
GRAPH graph_db.FinGraph
MATCH ALL (a:Account {id: 20})-[t:Transfers]->(b:Account)
RETURN a.id AS a_id, t.amount, b.id AS b_id

-- Equivalent:
GRAPH graph_db.FinGraph
MATCH (a:Account {id: 20})-[t:Transfers]->(b:Account)
RETURN a.id AS a_id, t.amount, b.id AS b_id

/*------+--------+------+
 | a_id | amount | b_id |
 +------+--------+------+
 | 20   | 500    | 7    |
 | 20   | 200    | 16   |
 +------+--------+------*/
```

The following query finds the middle account of any two-hop loops that starts and
ends with the same account with `id = 20`, and gets the middle account's owner.

```sql
GRAPH graph_db.FinGraph
MATCH ANY (a:Account {id: 20})->(mid:Account)->(a:Account)
MATCH ALL (p:Person)->(mid)
RETURN p.name, mid.id

/*------+----+
 | name | id |
 +------+----+
 | Lee  | 16 |
 +------+----*/
```

The following query produces an error because `mid`, defined within a path
pattern with the `ANY` prefix, can't be reused outside that pattern in the
same `MATCH` statement. This isn't permitted because `mid` isn't an endpoint.

```sql
-- Error
GRAPH graph_db.FinGraph
MATCH
  ANY (a:Account {id: 20})->(mid:Account)->(a:Account)->(mid:Account)->(a:Account),
  ALL (p:Person)->(mid)
RETURN p.name
```

The following query succeeds because `a`, even though defined in a path pattern
with the `ANY` path search prefix, can be reused outside of the path pattern
within the same `MATCH` statement, since `a` is an endpoint.

```sql
-- Succeeds
GRAPH graph_db.FinGraph
MATCH
  ANY (a:Account {id: 20})->(mid:Account)->(a:Account)->(mid:Account)->(a:Account),
  ALL (p:Person)->(a)
RETURN p.name

/*------+
 | name |
 +------+
 | Dana |
 +------*/
```

The following query succeeds because `mid` isn't reused outside of the path
pattern with the `ANY` prefix in the same `MATCH` statement.

```sql
-- Succeeds
GRAPH graph_db.FinGraph
MATCH ANY (a:Account {id: 20})->(mid:Account)->(a:Account)->(mid:Account)->(a:Account)
MATCH ALL (p:Person)->(mid)
RETURN p.name

/*------+
 | name |
 +------+
 | Lee  |
 +------*/
```

All rules for [quantified path patterns](#quantified-path-pattern) apply. In the
following examples, although `p` is on the boundary of the first path, it's a
group variable and still not allowed be declared again outside its parent
quantified path:

```sql
-- Error
GRAPH graph_db.FinGraph
MATCH ANY ((p:Person)->(f:Person)){1, 3},
      ALL ->(p)->
RETURN p.name
```

```sql
-- Error
GRAPH graph_db.FinGraph
MATCH ANY ((p:Person)->(f:Person)){1, 3},
      ALL ((p)->){1, 3}
RETURN p.name
```

The following query matches one of the cheapest paths between each pair of
`[a, b]` based on transfer amount:

```sql
GRAPH graph_db.FinGraph
MATCH ANY CHEAPEST (a:Account)-[t:Transfers COST t.amount]->{1,3}(b:Account)
LET total_cost = sum(t.amount)
RETURN a.id AS a_id, b.id AS b_id, total_cost

/*------+------+------------+
 | a_id | b_id | total_cost |
 +------+------+------------+
 | 7    | 7    | 900        |
 | 7    | 16   | 100        |
 | 7    | 20   | 400        |
 | 16   | 7    | 800        |
 | 16   | 16   | 500        |
 | 16   | 20   | 300        |
 | 20   | 7    | 500        |
 | 20   | 16   | 200        |
 | 20   | 20   | 500        |
 +------+------+------------*/
```

### Path mode

```text
path_mode:
  {
    WALK [ PATH | PATHS ]
    | ACYCLIC [ PATH | PATHS ]
    | TRAIL [ PATH | PATHS ]
  }
```

##### Description

Includes or excludes paths that have repeating edges based on the specified
mode.

##### Definitions

- `WALK` (default) : Keeps all paths. If the path mode isn't present, `WALK` is used by default.
- `ACYCLIC`: Filters out paths that have repeating nodes.
- `TRAIL`: Filters out paths that have repeating edges.
- `PATH` and `PATHS`: Syntactic sugar that has no effect on execution.

##### Details

A path mode is typically added in order to filter out paths with duplicate
edges or nodes. It can be applied to any path or subpath pattern.

A path mode is applied to the whole path or subpath pattern that it restricts,
regardless of whether other modes are used on subpath patterns.

A path mode is applied to path patterns only, not graph patterns.

A path can have either a path mode or a [path search prefix](#path-search-prefix), but
not both.

##### Examples

> [!NOTE]
> **Note:** The examples in this section reference a property graph called [`FinGraph`](schema-statements.md#fingraph-example).

The following query demonstrates the use of the `WALK` path mode on a
non-quantified path pattern. The first path in the results uses the same edge
for `t1` and `t3`.

```sql
GRAPH graph_db.FinGraph
MATCH
  WALK (a1:Account)-[t1:Transfers]->(a2:Account)-[t2:Transfers]->
  (a3:Account)-[t3:Transfers]->(a4:Account)
WHERE a1.id < a4.id
RETURN
  t1.id as transfer1_id, t2.id as transfer2_id, t3.id as transfer3_id

/*--------------+--------------+--------------+
 | transfer1_id | transfer2_id | transfer3_id |
 +--------------+--------------+--------------+
 | 16           | 20           | 16           |
 | 7            | 16           | 20           |
 | 7            | 16           | 20           |
 +--------------+--------------+--------------*/
```

The following queries demonstrate the use of the `ACYCLIC` path mode on a
non-quantified path pattern. Notice that the path whose `a1` and `a3` nodes are
equal has been filtered out.

```sql
GRAPH graph_db.FinGraph
MATCH
  ACYCLIC (a1:Account)-[t1:Transfers]->(a2:Account)-[t2:Transfers]->
  (a3:Account)
RETURN
  a1.id as account1_id, a2.id as account2_id,
  a3.id as account3_id

/*-------------+-------------+-------------+
 | account1_id | account2_id | account3_id |
 +-------------+-------------+-------------+
 | 20          | 7           | 16          |
 | 20          | 7           | 16          |
 | 7           | 16          | 20          |
 | 7           | 16          | 20          |
 | 16          | 20          | 7           |
 +-------------+-------------+-------------*/
```

The following queries demonstrate the use of the `TRAIL` path mode on a
non-quantified path pattern. Notice that the path whose `t1` and `t3` edges are
equal has been filtered out.

```sql
GRAPH graph_db.FinGraph
MATCH
  TRAIL (a1:Account)-[t1:Transfers]->(a2:Account)-[t2:Transfers]->
  (a3:Account)-[t3:Transfers]->(a4:Account)
WHERE a1.id < a4.id
RETURN
  t1.id as transfer1_id, t2.id as transfer2_id,
  t3.id as transfer3_id

/*--------------+--------------+--------------+
 | transfer1_id | transfer2_id | transfer3_id |
 +--------------+--------------+--------------+
 | 7            | 16           | 20           |
 | 7            | 16           | 20           |
 +--------------+--------------+-------------*/
```

The following query demonstrates that path modes are applied on path patterns
and not on graph patterns. Notice that, if `TRAIL` was applied on the graph
pattern then there would be zero results returned since edge `t1` is explicitly
duplicated. Instead, it's only applied on path pattern `(a1)-[t1]-(a2)`.

```sql
GRAPH graph_db.FinGraph
MATCH TRAIL (a1)-[t1]-(a2), (a2)-[t1]-(a3)
RETURN COUNT(1) as num_paths

/*-----------+
 | num_paths |
 +-----------+
 | 16        |
 +-----------*/

GRAPH graph_db.FinGraph
MATCH TRAIL (a1)-[t1]-(a2)-[t1]-(a3)
RETURN COUNT(1) as num_paths

/*-----------+
 | num_paths |
 +-----------+
 | 0         |
 +-----------*/
```

The following query demonstrates the use of the `TRAIL` path mode on a
quantified path pattern. Notice that `TRAIL` is applied on a path pattern that
is the concatenation of four subpath patterns of the form `()-[:Transfers]->()`.

```sql
GRAPH graph_db.FinGraph
MATCH TRAIL (a1:Account)-[t1:Transfers]->{4}(a5:Account)
RETURN COUNT(1) as num_paths

/*-----------+
 | num_paths |
 +-----------+
 | 6         |
 +-----------*/
```

The following query demonstrates that path modes are applied individually on the
path or subpath pattern in which they are defined. In this example, the
existence of `WALK` doesn't negate the semantics of the outer `TRAIL`. Notice
that the result is the same with the previous example where `WALK` isn't
present.

```sql
GRAPH graph_db.FinGraph
MATCH TRAIL (WALK (a1:Account)-[t1:Transfers]->{4}(a5:Account))
RETURN COUNT(1) as num_paths

/*-----------+
 | num_paths |
 +-----------+
 | 6         |
 +-----------*/
```

The following query demonstrates the use of the `TRAIL` path mode on a subpath
pattern. Notice that `TRAIL` is applied on a path pattern that's the
concatenation of three subpath patterns of the form `()-[:Transfers]->()`. Since
edge `t4` is outside this path pattern, it can be equal to any of the edges on
it. Compare this result with the result of the previous query.

```sql
GRAPH graph_db.FinGraph
MATCH
  (TRAIL (a1:Account)-[t1:Transfers]->{3}(a4:Account))
  -[t4:Transfers]->(a5:Account)
RETURN COUNT(1) as num_paths

/*-----------+
 | num_paths |
 +-----------+
 | 14        |
 +-----------*/
```

The following query demonstrates the use of the `TRAIL` path mode within a
quantified path pattern. Notice that the resulting path is the concatenation of
two subpaths of the form
`()-[:Transfers]->()-[:Transfers]->()-[:Transfers]->()`. Therefore each path
includes six edges in total. `TRAIL` is applied separately on the edges of each
of the two subpaths. Specifically, the three edges on the first supath must be
distinct from each other. Similarly, the three edges on the second subpath must
also be distinct from each other. However, there may be edges that are equal
between the two subpaths.

```sql
GRAPH graph_db.FinGraph
MATCH (TRAIL -[t1:Transfers]->()-[t2:Transfers]->()-[t3:Transfers]->){2}
RETURN COUNT(1) as num_paths

/*-----------+
 | num_paths |
 +-----------+
 | 26        |
 +-----------*/
```

The following query demonstrates that there are no paths of length six with
non-repeating edges.

```sql
GRAPH graph_db.FinGraph
MATCH TRAIL -[:Transfers]->{6}
RETURN COUNT(1) as num_paths

/*-----------+
 | num_paths |
 +-----------+
 | 0         |
 +-----------*/
```

The following query demonstrates that a path can't have both a path mode and a
[path search prefix](#path-search-prefix):

```sql
-- Error
GRAPH graph_db.FinGraph
MATCH ANY SHORTEST TRAIL ->{1,4}
RETURN COUNT(1) as num_paths
```

The following query demonstrates that path modes can coexist with
[path search prefixes](#path-search-prefix) when the path mode is placed on a subpath.

```sql
GRAPH graph_db.FinGraph
MATCH ANY SHORTEST (TRAIL ->{1,4})
RETURN COUNT(1) as num_paths

/*-----------+
 | num_paths |
 +-----------+
 | 18        |
 +-----------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-patterns (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The `ANY CHEAPEST` example matched the label `Transfer`, but the property graph defines the edge label `Transfers` (see the schema statements page and the other `COST` example on this page). The label is now `Transfers`.
- Corrected from the official docs: The edge pattern `-[Transfers]->` was described as matching all `Transfers` edges, but without `:` or `IS` the name is a pattern variable, not a label (the label expression syntax on this page requires `IS` or `:`). It is now `-[:Transfers]->`.
- Corrected from the official docs: The last line of one result comment ended with `/*` instead of `*/`, leaving the comment unterminated. It now ends with `*/`, like every other result block.
- Caution: The minimum node count and minimum path length formulas for quantified paths use `lower_quantifier`, a name this page never defines. The syntax defines `bound` and `lower_bound`, and the text just below refers to "`bound` or `lower_bound`". The official docs are unchanged here; read `lower_quantifier` as the lower bound of the quantifier.
- Caution: In the example for any-direction `Transfers` edges (`MATCH (src:Account)-[transfer:Transfers]-(dst:Account)`), the result should contain each of the five edges of the directed example in both orientations (10 rows). Four of the listed rows do not match any edge: `20, 300, 7`, `7, 500, 16`, `7, 200, 16` and `20, 100, 16`. The correct rows `7, 300, 16`, `7, 100, 16`, `20, 500, 7` and `20, 200, 16` are missing. The official docs are unchanged here.

## Related

- [Index of this directory](./README.md)
