---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements
---

# GQL schema statements

## Signature / Usage

Graph Query Language (GQL) supports all GoogleSQL DDL statements,
including the following GQL-specific DDL statements:

### Statement list

| Name | Summary |
|---|---|
| [`CREATE PROPERTY GRAPH` statement](#create-property-graph-statement) | Creates a property graph. |
| [`DROP PROPERTY GRAPH` statement](#drop-property-graph-statement) | Deletes a property graph. |

### `CREATE PROPERTY GRAPH` statement

#### Property graph definition

```text
CREATE
  [ OR REPLACE ]
  PROPERTY GRAPH
  [ IF NOT EXISTS ]
  property_graph_name
  property_graph_content;

property_graph_content:
  node_tables
  [ edge_tables ]

node_tables:
  NODE TABLES element_list

edge_tables:
  EDGE TABLES element_list

element_list:
  (element[, ...])
```

**Description**

Creates a property graph.

> [!NOTE]
> **Note:** all GQL examples in the GQL reference use the [`FinGraph`](#fingraph-example) property graph example. To set up this property graph, see [Create and query a graph](https://docs.cloud.google.com/bigquery/docs/graph-create).

**Definitions**

- `OR REPLACE`: Replaces any property graph with the same name if it exists. If the property graph doesn't exist, creates the property graph. Can't appear with `IF NOT EXISTS`.
- `IF NOT EXISTS`: If any property graph exists with the same name, the `CREATE` statement has no effect. Can't appear with `OR REPLACE`.
- `property_graph_name`: The name of the property graph. This name can be a path expression. This name must not conflict with the name of an existing table, view, or property graph.
- `property_graph_content`: Add the definitions for the nodes and edges in the property graph.
- `node_tables`: A collection of node definitions. A node definition defines a
  new type of node in the graph.

  The following example represents three node definitions:
  `Account`, `Customer`, and `GeoLocation`.

  ```sql
  NODE TABLES (
    Account,
    Customer
      LABEL Client
      PROPERTIES (cid, name),
    Location AS GeoLocation
      DEFAULT LABEL
      PROPERTIES ALL COLUMNS
  )
  ```

- `edge_tables`: A collection of edge definitions. An edge definition defines
  a new type of edge in the graph. An edge is directed and connects a source and
  a destination node.

  The following example represents two edge definitions:
  `Own` and `Transfer`.

  ```sql
  EDGE TABLES (
    Own
      SOURCE KEY (cid) REFERENCES Customer (cid)
      DESTINATION KEY (aid) REFERENCES Account
      NO PROPERTIES,
    Transfer
      SOURCE KEY (from_id) REFERENCES Account (aid)
      DESTINATION KEY (to_id) REFERENCES Account (aid)
      LABEL Transfer NO PROPERTIES
  )
  ```

- `element_list`: A list of element (node or edge) definitions.

- `element`: Refer to [Element definition](#element-definition) for details.

#### Element definition

```text
element:
  element_name
  [ AS element_alias ]
  element_keys
  [ { label_and_properties_list | element_properties } ]

element_keys:
  { node_element_key | edge_element_keys }

node_element_key:
  [ element_key ]

edge_element_keys:
  [ element_key ]
  source_key
  destination_key

element_key:
  KEY column_name_list

source_key:
  SOURCE KEY edge_column_name_list
  REFERENCES element_alias_reference [ node_column_name_list ]

destination_key:
  DESTINATION KEY edge_column_name_list
  REFERENCES element_alias_reference [ node_column_name_list ]

edge_column_name_list:
  column_name_list

node_column_name_list:
  column_name_list

column_name_list:
  (column_name[, ...])
```

**Description**

Adds an element definition to the property graph. For example:

```sql
Customer
  LABEL Client
    PROPERTIES (cid, name)
```

In a graph, labels and properties are uniquely identified by their names. Labels
and properties with the same name can appear in multiple node or edge
definitions. However, labels and properties with the same name must follow these
rules:

- Properties with the same name must have the same value type.
- Labels with the same name must expose the same set of properties.

**Definitions**

- `element_name`: The name of the input table or view from which elements are created.
  The following types of inputs are supported:

  - Standard tables
  - External tables
  - Managed BigLake Iceberg tables
  - Iceberg REST catalog tables
  - Views, including authorized views
  - Non-incremental materialized views

  You can't use incremental materialized views tables.
- `element_alias`: An optional alias. You must use an alias if you use an input
  table for more than one element definition.

- `element_keys`: The key for a graph element. This uniquely identifies a graph
  element.

  - By default, the element key is the primary key of the input table.

  - Element keys can be explicitly defined with the `KEY` clause.

- `node_element_key`: The element key for a node.

  ```sql
  KEY (item1_column, item2_column)
  ```

- `edge_element_keys`: The element key, source key, and destination key
  for an edge.

  ```sql
  KEY (item1_column, item2_column)
  SOURCE KEY (item1_column) REFERENCES item_node (item_node_column)
  DESTINATION KEY (item2_column) REFERENCES item_node (item_node_column)
  ```

- `element_key`: An optional key that identifies the node or edge element. If
  `element_key` isn't provided, then the primary key of the table is used.

  ```sql
  KEY (item1_column, item2_column)
  ```

- `source_key`: The key for the source node of the edge.

  ```sql
  SOURCE KEY (item1_column) REFERENCES item_node (item_node_column)
  ```

- `destination_key`: The key for the destination node of the edge.

  ```sql
  DESTINATION KEY (item2_column) REFERENCES item_node (item_node_column)
  ```

- `column_name_list`: One or more columns to assign to a key.

  In `column_name_list`, column names must be unique.
- Reference column name lists:

  - `node_column_name_list`: One or more columns referenced from the node tables.

  - `edge_column_name_list`: One or more columns referenced from the edge tables.

  Referenced columns must exist in the corresponding node or edge table.

  If `node_column_name_list` doesn't exist in `source_key` or
  `destination_key`, then the `element_keys` of the referenced node are used.
  In this case, the column order in the `element_keys` must match the column
  order in the `edge_column_name_list`.
- `element_alias_reference`: The alias of another element to reference.

- `label_and_properties_list`: The list of labels and properties to add to
  an element. For more information, see
  [Label and properties list definition](#label-and-properties-list-definition).

#### Label and properties list definition

```text
label_and_properties_list:
  label_and_properties[...]

label_and_properties:
  element_label
  [ element_properties ]

element_label:
  {
    LABEL label_name |
    DEFAULT LABEL [ options_clause ]
  }

options_clause:
  OPTIONS (
    [ description = description_string ]
    [, synonyms = synonym_array ]
    [, extensions = extension_array ]
  )
```

**Description**

Adds a list of labels and properties to an element.

**Definitions**

- `label_and_properties`: The label to add to the element and the properties
  exposed by that label. For example:

  ```sql
  LABEL Tourist PROPERTIES (home_city, home_country)
  ```

  When `label_and_properties` isn't specified, the following is
  applied implicitly:

  ```sql
  DEFAULT LABEL PROPERTIES ARE ALL COLUMNS
  ```

  A property must be unique in `label_and_properties`.
- `element_label`: Add a custom label or use the default label for the
  element. `label_name` must be unique in `element`.

  If you use `DEFAULT LABEL`, `label_name` is the same as `element_alias`.
- `element_properties`: The properties associated with a label. A property
  can't be used more than once for a specific label. For more information, see
  [Element properties definition](#element-properties-definition).

- `description_string`: A string literal that describes the label to provide
  context and improve discoverability for natural language querying interfaces.

- `synonym_array`: An array of string literals that provides alternative names
  for the label to improve accuracy for natural language querying interfaces.

- `extension_array`: An array of string pairs (`ARRAY<STRUCT<STRING, STRING>>`)
  that represents additional metadata. You can use extensions to provide custom
  metadata, units, or formatting rules, such as `[('currency', 'USD')]`.
  This option provides context and
  improves discoverability for natural language querying interfaces.

#### Element properties definition

```text
element_properties:
  {
    NO PROPERTIES |
    properties_are |
    derived_property_list
  }

properties_are:
  PROPERTIES [ ARE ] ALL COLUMNS [ EXCEPT column_name_list ]

column_name_list:
  (column_name[, ...])

derived_property_list:
  PROPERTIES (derived_property[, ...])

derived_property:
  { value_expression | measure_expression } [ AS property_name ] [ options_clause ]

options_clause:
  OPTIONS (
    [ description = description_string ]
    [, synonyms = synonym_array ]
    [, extensions = extension_array ]
  )
```

**Description**

Adds properties associated with a label.

**Definitions**

- `NO PROPERTIES`: The element doesn't have properties.
- `properties_are`: Define which columns to include as element
  properties.

  If you don't include this definition, all columns are included by
  default, and the following definition is applied implicitly:

  ```sql
  PROPERTIES ARE ALL COLUMNS
  ```

  In the following examples, all columns in a table are included as
  element properties:

  ```sql
  PROPERTIES ARE ALL COLUMNS
  ```

  ```sql
  PROPERTIES ALL COLUMNS
  ```

  In the following example, all columns in a table except for `home_city` and
  `home_country` are included as element properties:

  ```sql
  PROPERTIES ARE ALL COLUMNS EXCEPT (home_city, home_country)
  ```

- `column_name_list`: A list of columns to exclude as element properties.

  Column names in the `EXCEPT column_name_list` must be unique.
- `derived_property_list`: A list of element property definitions.

- `derived_property`: An expression that defines a property and can optionally
  reference the input table columns.

  In the following example, the `id` and `name` columns are included as
  properties. Additionally, the result of the `salary + bonus` expression are
  included as the `income` property:

  ```sql
  PROPERTIES (id, name, salary + bonus AS income)
  ```

  A derived property includes:
  - `value_expression`: An expression that can be represented by simple constructs
    such as column references and functions. Subqueries are excluded.

  - `measure_expression`: An expression wrapped in the `MEASURE()` keyword that
    defines an aggregate calculation or metric.
    A [measure](../googlesql-syntax/data-types.md#measure-type) locks its aggregation to the `KEY` of the
    node or edge table on which the measure is defined to ensure that
    aggregations are performed at the correct level without overcounting.
    For example, if `amount` is a property on the `Account` node, then you
    can define another property
    as `MEASURE(SUM(amount)) AS total_account_amount`. For more information
    about supported measure expression, read about the
    [measure type](../googlesql-syntax/data-types.md#measure-type).

    You can't use GQL to access a property that you defined
    using a measure. You can use the [`GRAPH_EXPAND` TVF](sql-queries.md#graph_expand) to
    transform your graph into a relational table that lets you access the
    measure by calling it with the [`AGG` function](../googlesql-functions/aggregate_functions.md#agg). For
    limitations on the types of graphs that you can use with `GRAPH_EXPAND`,
    read the [input limitations](sql-queries.md#input-limitations). For more
    information, see [Work with measures](https://docs.cloud.google.com/bigquery/docs/graph-measures).
  - `AS property_name`: Alias to assign to the value expression. This is
    optional unless `value_expression` is a function or
    the property is defined by a measure.

  If `derived_property` has any column reference in `value_expression`, that
  column reference must refer to a column of the underlying table.

  If `derived_property` doesn't define `property_name`, `value_expression`
  must be a column reference and the implicit `property_name` is the
  column name.
- `description_string`: A string literal that describes the property to provide
  context and improve discoverability for natural language querying interfaces.

- `synonym_array`: An array of string literals that provides alternative names
  for the property to improve accuracy for natural language querying interfaces.

- `extension_array`: An array of string pairs (`ARRAY<STRUCT<STRING, STRING>>`)
  that represents additional metadata. You can use extensions to provide custom
  metadata, units, or formatting rules, such as `[('currency', 'USD')]`.
  This option provides context and
  improves discoverability for natural language querying interfaces.

#### `FinGraph` example

To create a property graph, you must first create tables that describe the
nodes and edges. Run the following statements to create and populate a dataset
called `graph_db` with tables that describe people, financial accounts that
they own, and transfers between accounts:

```sql
CREATE SCHEMA IF NOT EXISTS graph_db;

CREATE OR REPLACE TABLE graph_db.Person (
  id               INT64,
  name             STRING,
  birthday         TIMESTAMP,
  country          STRING,
  city             STRING,
  PRIMARY KEY (id) NOT ENFORCED
);

CREATE OR REPLACE TABLE graph_db.Account (
  id               INT64,
  create_time      TIMESTAMP,
  is_blocked       BOOL,
  nick_name        STRING,
  PRIMARY KEY (id) NOT ENFORCED
);

CREATE OR REPLACE TABLE graph_db.PersonOwnAccount (
  id               INT64 NOT NULL,
  account_id       INT64 NOT NULL,
  create_time      TIMESTAMP,
  PRIMARY KEY (id, account_id) NOT ENFORCED,
  FOREIGN KEY (id) REFERENCES graph_db.Person(id) NOT ENFORCED,
  FOREIGN KEY (account_id) REFERENCES graph_db.Account(id) NOT ENFORCED
);

CREATE OR REPLACE TABLE graph_db.AccountTransferAccount (
  id               INT64 NOT NULL,
  to_id            INT64 NOT NULL,
  amount           FLOAT64,
  create_time      TIMESTAMP NOT NULL,
  order_number     STRING,
  PRIMARY KEY (id, to_id, create_time) NOT ENFORCED,
  FOREIGN KEY (id) REFERENCES graph_db.Account(id) NOT ENFORCED,
  FOREIGN KEY (to_id) REFERENCES graph_db.Account(id) NOT ENFORCED
);
```

Next, run the following statements to insert data into each of the tables
that you created:

```sql
INSERT INTO graph_db.Account
  (id, create_time, is_blocked, nick_name)
VALUES
  (7,"2020-01-10 06:22:20.222",false,"Vacation Fund"),
  (16,"2020-01-27 17:55:09.206",true,"Vacation Fund"),
  (20,"2020-02-18 05:44:20.655",false,"Rainy Day Fund");

INSERT INTO graph_db.Person
  (id, name, birthday, country, city)
VALUES
  (1,"Alex","1991-12-21 00:00:00","Australia","Adelaide"),
  (2,"Dana","1980-10-31 00:00:00","Czech_Republic","Moravia"),
  (3,"Lee","1986-12-07 00:00:00","India","Kollam");

INSERT INTO graph_db.AccountTransferAccount
  (id, to_id, amount, create_time, order_number)
VALUES
  (7,16,300,"2020-08-29 15:28:58.647","304330008004315"),
  (7,16,100,"2020-10-04 16:55:05.342","304120005529714"),
  (16,20,300,"2020-09-25 02:36:14.926","103650009791820"),
  (20,7,500,"2020-10-04 16:55:05.342","304120005529714"),
  (20,16,200,"2020-10-17 03:59:40.247","302290001255747");

INSERT INTO graph_db.PersonOwnAccount
  (id, account_id, create_time)
VALUES
  (1,7,"2020-01-10 06:22:20.222"),
  (2,20,"2020-01-27 17:55:09.206"),
  (3,16,"2020-02-18 05:44:20.655");
```

The following property graph, `FinGraph`, contains two node
definitions (`Account` and `Person`) and two edge definitions
(`PersonOwnAccount` and `AccountTransferAccount`).

> [!NOTE]
> **Note:** all GQL examples in the GQL reference use the `FinGraph` property graph example.

```sql
CREATE OR REPLACE PROPERTY GRAPH graph_db.FinGraph
  NODE TABLES (
    graph_db.Account,
    graph_db.Person
  )
  EDGE TABLES (
    graph_db.PersonOwnAccount
      SOURCE KEY (id) REFERENCES Person (id)
      DESTINATION KEY (account_id) REFERENCES Account (id)
      LABEL Owns,
    graph_db.AccountTransferAccount
      SOURCE KEY (id) REFERENCES Account (id)
      DESTINATION KEY (to_id) REFERENCES Account (id)
      LABEL Transfers
  );
```

![Visualization of financial graph example](https://docs.cloud.google.com/static/bigquery/images/fingraph-example.png)

Once the property graph is created, you can use it in [GQL](query-statements.md) queries. For
example, the following query matches all nodes labeled `Person` and then returns
the `name` values in the results.

```sql
GRAPH graph_db.FinGraph
MATCH (p:Person)
RETURN p.name

/*---------+
 | name    |
 +---------+
 | Alex    |
 | Dana    |
 | Lee     |
 +---------*/
```

### `DROP PROPERTY GRAPH` statement

```text
DROP PROPERTY GRAPH [ IF EXISTS ] property_graph_name;
```

**Description**

Deletes a property graph.

**Definitions**

- `IF EXISTS`: If a property graph of the specified name doesn't exist, then the DROP statement has no effect and no error is generated.
- `property_graph_name`: The name of the property graph to drop.

**Example**

```sql
DROP PROPERTY GRAPH graph_db.FinGraph;
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The `DEFAULT LABEL` description referred to `element_table_alias`, which is not a name in the syntax. The syntax and the definitions on this page use `element_alias`, so the description now uses it.

## Related

- [Index of this directory](./README.md)
