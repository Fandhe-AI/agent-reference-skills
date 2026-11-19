---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax
---

# Data manipulation language (DML) statements in GoogleSQL

## Signature / Usage

The BigQuery data manipulation language (DML) enables you to
update, insert, and delete data from your BigQuery tables.

For information about how to use DML statements, see
[Transform data with data manipulation language](https://docs.cloud.google.com/bigquery/docs/data-manipulation-language)
and [Update partitioned table data using DML](https://docs.cloud.google.com/bigquery/docs/using-dml-with-partitioned-tables).

### On-demand query size calculation

If you use on-demand billing, BigQuery charges for data
manipulation language (DML) statements based on the number of bytes processed by
the statement.

For more information about cost estimation, see [Estimate and control costs](https://docs.cloud.google.com/bigquery/docs/best-practices-costs).

#### Non-partitioned tables

For non-partitioned tables, the number of bytes processed is calculated as
follows:

- *q* = The sum of bytes processed by the DML statement itself, including any columns referenced in tables scanned by the DML statement.
- *t* = The size of the table being updated by the DML statement before any modifications are made.

| DML statement | Bytes processed |
|---|---|
| `INSERT` | *q* |
| `UPDATE` | *q* + *t* |
| `DELETE` | *q* + *t* |
| `MERGE` | If there are only `INSERT` clauses: *q* . If there is an `UPDATE` or `DELETE` clause: *q* + *t*. |

To preview how many bytes a statement processes,
[Check the estimated cost before running a query](https://docs.cloud.google.com/bigquery/docs/best-practices-costs#check-query-cost).

#### Partitioned tables

For partitioned tables, the number of bytes processed is calculated as
follows:

- *q'* = The sum of bytes processed by the DML statement itself, including any columns referenced in all partitions scanned by the DML statement.
- *t'* = The total size of all partitions being updated by the DML statement before any modifications are made.

| DML statement | Bytes processed |
|---|---|
| `INSERT` | *q'* |
| `UPDATE` | *q'* + *t'* |
| `DELETE` | *q'* + *t'* |
| `MERGE` | If there are only `INSERT` clauses in the `MERGE` statement: *q'* . If there is an `UPDATE` or `DELETE` clause in the `MERGE` statement: *q'* + *t'*. |

To preview how many bytes a statement processes,
[Check the estimated cost before running a query](https://docs.cloud.google.com/bigquery/docs/best-practices-costs#check-query-cost).

### `INSERT` statement

Use the `INSERT` statement when you want to add new rows to a table.

```sql
INSERT [INTO] target_name
 [(column_1 [, ..., column_n ] )]
 input

input ::=
 VALUES (expr_1 [, ..., expr_n ] )
        [, ..., (expr_k_1 [, ..., expr_k_n ] ) ]
| SELECT_QUERY

expr ::= value_expression | DEFAULT
```

`INSERT` statements must comply with the following rules:

- Column names are optional if the target table is not an [ingestion-time partitioned table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time).
- Duplicate names are not allowed in the list of target columns.
- Values must be added in the same order as the specified columns.
- The number of values added must match the number of specified columns.
- Values must have a type that is compatible with the target column.
- When the value expression is `DEFAULT`, either the [default value](https://docs.cloud.google.com/bigquery/docs/default-values) or a system-generated value for an [identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns) is used. Otherwise, the value defaults to `NULL`.

#### Omitting column names

When the column names are omitted, all columns in the target table are included
in ascending order based on their ordinal positions. If an omitted column has
a default value, then that value is used. If the omitted column is an
[identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns), then a new ID is
generated. Otherwise, the column value is `NULL`.
If the target
table is an
[ingestion-time partitioned table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time),
column names must be specified.

#### Value type compatibility

Values added with an `INSERT` statement must be compatible with the target
column's type. A value's type is considered compatible with the target column's
type if one of the following criteria are met:

- The value type matches the column type exactly. For example, inserting a value of type INT64 in a column that also has a type of INT64.
- The value type is one that can be implicitly coerced into another type.

#### `INSERT` examples

##### `INSERT` using explicit values

```sql
INSERT dataset.Inventory (product, quantity)
VALUES('top load washer', 10),
      ('front load washer', 20),
      ('dryer', 30),
      ('refrigerator', 10),
      ('microwave', 20),
      ('dishwasher', 30),
      ('oven', 5)
```

```text
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       30 |               NULL |
| dryer             |       30 |               NULL |
| front load washer |       20 |               NULL |
| microwave         |       20 |               NULL |
| oven              |        5 |               NULL |
| refrigerator      |       10 |               NULL |
| top load washer   |       10 |               NULL |
+-------------------+----------+--------------------+
```

If you set a default value for a column, then you can use the `DEFAULT`
keyword in place of a value to insert the default value:

```sql
ALTER TABLE dataset.NewArrivals ALTER COLUMN quantity SET DEFAULT 100;

INSERT dataset.NewArrivals (product, quantity, warehouse)
VALUES('top load washer', DEFAULT, 'warehouse #1'),
      ('dryer', 200, 'warehouse #2'),
      ('oven', 300, 'warehouse #3');
```

```text
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |      200 | warehouse #2 |
| oven            |      300 | warehouse #3 |
| top load washer |      100 | warehouse #1 |
+-----------------+----------+--------------+
```

If your table has an [identity column](https://docs.cloud.google.com/bigquery/docs/identity-columns), then you can use the `DEFAULT` keyword to insert a generated ID value:

```sql
CREATE TABLE dataset.Products (
  id INT64 GENERATED ALWAYS AS IDENTITY(INCREMENT BY 2),
  product STRING);

INSERT dataset.Products (id, product)
VALUES (DEFAULT, 'dryer'),
       (DEFAULT, 'top load washer');
```

```text
+----+-----------------+
| id | product         |
+----+-----------------+
| 1  | dryer           |
| 3  | top load washer |
+----+-----------------+
```

##### `INSERT SELECT` statement

```sql
INSERT dataset.Warehouse (warehouse, state)
SELECT *
FROM UNNEST([('warehouse #1', 'WA'),
      ('warehouse #2', 'CA'),
      ('warehouse #3', 'WA')])
```

```text
+--------------+-------+
|  warehouse   | state |
+--------------+-------+
| warehouse #1 | WA    |
| warehouse #2 | CA    |
| warehouse #3 | WA    |
+--------------+-------+
```

You can also use `WITH` when using `INSERT SELECT`. For example, you can
rewrite the previous query using `WITH`:

```sql
INSERT dataset.Warehouse (warehouse, state)
WITH w AS (
  SELECT ARRAY<STRUCT<warehouse string, state string>>
      [('warehouse #1', 'WA'),
       ('warehouse #2', 'CA'),
       ('warehouse #3', 'WA')] col
)
SELECT warehouse, state FROM w, UNNEST(w.col)
```

The following example shows how to copy a table's contents into another table:

```sql
INSERT dataset.DetailedInventory (product, quantity, supply_constrained)
SELECT product, quantity, false
FROM dataset.Inventory
```

```text
+----------------------+----------+--------------------+----------+----------------+
|       product        | quantity | supply_constrained | comments | specifications |
+----------------------+----------+--------------------+----------+----------------+
| dishwasher           |       30 |              false |       [] |           NULL |
| dryer                |       30 |              false |       [] |           NULL |
| front load washer    |       20 |              false |       [] |           NULL |
| microwave            |       20 |              false |       [] |           NULL |
| oven                 |        5 |              false |       [] |           NULL |
| refrigerator         |       10 |              false |       [] |           NULL |
| top load washer      |       10 |              false |       [] |           NULL |
+----------------------+----------+--------------------+----------+----------------+
```

##### `INSERT VALUES` with subquery

The following example shows how to insert a row into a table, where one of the
values is computed using a subquery:

```sql
INSERT dataset.DetailedInventory (product, quantity)
VALUES('countertop microwave',
  (SELECT quantity FROM dataset.DetailedInventory
   WHERE product = 'microwave'))
```

```text
+----------------------+----------+--------------------+----------+----------------+
|       product        | quantity | supply_constrained | comments | specifications |
+----------------------+----------+--------------------+----------+----------------+
| countertop microwave |       20 |               NULL |       [] |           NULL |
| dishwasher           |       30 |              false |       [] |           NULL |
| dryer                |       30 |              false |       [] |           NULL |
| front load washer    |       20 |              false |       [] |           NULL |
| microwave            |       20 |              false |       [] |           NULL |
| oven                 |        5 |              false |       [] |           NULL |
| refrigerator         |       10 |              false |       [] |           NULL |
| top load washer      |       10 |              false |       [] |           NULL |
+----------------------+----------+--------------------+----------+----------------+
```

##### `INSERT` without column names

```sql
INSERT dataset.Warehouse VALUES('warehouse #4', 'WA'), ('warehouse #5', 'NY')
```

This is the `Warehouse` table before you run the query:

```text
+--------------+-------+
|  warehouse   | state |
+--------------+-------+
| warehouse #1 | WA    |
| warehouse #2 | CA    |
| warehouse #3 | WA    |
+--------------+-------+
```

This is the `Warehouse` table after you run the query:

```text
+--------------+-------+
|  warehouse   | state |
+--------------+-------+
| warehouse #1 | WA    |
| warehouse #2 | CA    |
| warehouse #3 | WA    |
| warehouse #4 | WA    |
| warehouse #5 | NY    |
+--------------+-------+
```

##### `INSERT` with `STRUCT` types

The following example shows how to insert a row into a table, where some of
the fields are
[`STRUCT` types](data-types.md#struct-type).

```sql
INSERT dataset.DetailedInventory
VALUES('top load washer', 10, FALSE, [(CURRENT_DATE, "comment1")], ("white","1 year",(30,40,28))),
      ('front load washer', 20, FALSE, [(CURRENT_DATE, "comment1")], ("beige","1 year",(35,45,30)))
```

Here is the `DetailedInventory` table after you run the query:

```text
+-------------------+----------+--------------------+-------------------------------------------------+----------------------------------------------------------------------------------------------------+
|      product      | quantity | supply_constrained |                    comments                     |                                           specifications                                           |
+-------------------+----------+--------------------+-------------------------------------------------+----------------------------------------------------------------------------------------------------+
| front load washer |       20 |              false | [{"created":"2021-02-09","comment":"comment1"}] | {"color":"beige","warranty":"1 year","dimensions":{"depth":"35.0","height":"45.0","width":"30.0"}} |
| top load washer   |       10 |              false | [{"created":"2021-02-09","comment":"comment1"}] | {"color":"white","warranty":"1 year","dimensions":{"depth":"30.0","height":"40.0","width":"28.0"}} |
+-------------------+----------+--------------------+-------------------------------------------------+----------------------------------------------------------------------------------------------------+
```

##### `INSERT` with `ARRAY` types

The following example show how to insert a row into a table, where one of the
fields is an [`ARRAY` type](https://docs.cloud.google.com/bigquery/docs/arrays).

```sql
CREATE TABLE IF NOT EXISTS dataset.table1 (names ARRAY<STRING>);

INSERT INTO dataset.table1 (names)
VALUES (["name1","name2"])
```

Here is the table after you run the query:

```sql
+-------------------+
|       names       |
+-------------------+
| ["name1","name2"] |
+-------------------+
```

##### `INSERT` with `RANGE` types

The following example shows how to insert rows into a table, where the
fields are [`RANGE` type](../googlesql-functions/range-functions.md).

```sql
INSERT mydataset.my_range_table (emp_id, dept_id, duration)
VALUES(10, 1000, RANGE<DATE> '[2010-01-10, 2010-03-10)'),
      (10, 2000, RANGE<DATE> '[2010-03-10, 2010-07-15)'),
      (10, 2000, RANGE<DATE> '[2010-06-15, 2010-08-18)'),
      (20, 2000, RANGE<DATE> '[2010-03-10, 2010-07-20)'),
      (20, 1000, RANGE<DATE> '[2020-05-10, 2020-09-20)');

SELECT * FROM mydataset.my_range_table ORDER BY emp_id;

/*--------+---------+--------------------------+
 | emp_id | dept_id | duration                 |
 +--------+---------+--------------------------+
 | 10     | 1000    | [2010-01-10, 2010-03-10) |
 | 10     | 2000    | [2010-03-10, 2010-07-15) |
 | 10     | 2000    | [2010-06-15, 2010-08-18) |
 | 20     | 2000    | [2010-03-10, 2010-07-20) |
 | 20     | 1000    | [2020-05-10, 2020-09-20) |
 +--------+---------+--------------------------*/
```

### `DELETE` statement

Use the `DELETE` statement when you want to delete rows from a table.

```sql
DELETE [FROM] target_name [alias]
WHERE condition
```

To delete all rows in a table, use the
[TRUNCATE TABLE](#truncate-table-statement) statement.

To delete all rows in a partition without scanning bytes or consuming slots,
see [Using DML DELETE to delete partitions](https://docs.cloud.google.com/bigquery/docs/using-dml-with-partitioned-tables#using_dml_delete_to_delete_partitions).

#### `WHERE` keyword

Each time you construct a `DELETE` statement, you must use the `WHERE` keyword,
followed by a condition.

The `WHERE` keyword is mandatory for any `DELETE` statement.

#### `DELETE` examples

##### `DELETE` with `WHERE` clause

```sql
DELETE dataset.Inventory
WHERE quantity = 0
```

Before:

```text
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       20 |               NULL |
| dryer             |       30 |               NULL |
| front load washer |       10 |               NULL |
| microwave         |       20 |               NULL |
| oven              |        5 |               NULL |
| refrigerator      |       10 |               NULL |
| top load washer   |        0 |               NULL |
+-------------------+----------+--------------------+
```

<br />

After:

```text
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       20 |               NULL |
| dryer             |       30 |               NULL |
| front load washer |       10 |               NULL |
| microwave         |       20 |               NULL |
| oven              |        5 |               NULL |
| refrigerator      |       10 |               NULL |
+-------------------+----------+--------------------+
```

<br />

##### `DELETE` with subquery

```sql
DELETE dataset.Inventory i
WHERE i.product NOT IN (SELECT product from dataset.NewArrivals)
```

Before:

```text
Inventory
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       30 |               NULL |
| dryer             |       30 |               NULL |
| front load washer |       20 |               NULL |
| microwave         |       20 |               NULL |
| oven              |        5 |               NULL |
| refrigerator      |       10 |               NULL |
| top load washer   |       10 |               NULL |
+-------------------+----------+--------------------+
NewArrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |      200 | warehouse #2 |
| oven            |      300 | warehouse #3 |
| top load washer |      100 | warehouse #1 |
+-----------------+----------+--------------+
```

After:

```text
Inventory
+-----------------+----------+--------------------+
|     product     | quantity | supply_constrained |
+-----------------+----------+--------------------+
| dryer           |       30 |               NULL |
| oven            |        5 |               NULL |
| top load washer |       10 |               NULL |
+-----------------+----------+--------------------+
```

Alternately, you can use `DELETE` with the `EXISTS` clause:

```sql
DELETE dataset.Inventory
WHERE NOT EXISTS
  (SELECT * from dataset.NewArrivals
   WHERE Inventory.product = NewArrivals.product)
```

### `TRUNCATE TABLE` statement

The `TRUNCATE TABLE` statement removes all rows from a table but leaves the
table metadata intact, including the table schema, description, and labels.

> [!NOTE]
> **Note:** This statement is a metadata operation and does not incur a charge.

```sql
TRUNCATE TABLE [[project_name.]dataset_name.]table_name
```

Where:

- **`project_name`** is the name of the project containing the table. Defaults
  to the project that runs this DDL query.

- **`dataset_name`** is the name of the dataset containing the table.

- **`table_name`** is the name of the table to truncate.

Truncating views, materialized views, models, or external tables is not
supported. Quotas and limits for queries apply to `TRUNCATE TABLE` statements.
For more information, see [Quotas and limits](https://docs.cloud.google.com/bigquery/quotas).

#### `TRUNCATE TABLE` examples

The following example removes all rows from the table named `Inventory`.

```sql
TRUNCATE TABLE dataset.Inventory
```

### `UPDATE` statement

Use the `UPDATE` statement when you want to update existing rows within a table.

```sql
UPDATE target_name [[AS] alias]
SET set_clause
[FROM from_clause]
WHERE condition

set_clause ::= update_item[, ...]

update_item ::= column_name = expression
```

Where:

- `target_name` is the name of a table to update.
- `update_item` is the name of column to update and an expression to evaluate for the updated value. The expression may contain the `DEFAULT` keyword, which is replaced by the default value or a system-generated value for an identity column.

If the column is a `STRUCT` type, `column_name` can reference a field in the
`STRUCT` using dot notation. For example, `struct1.field1`.

#### `WHERE` keyword

Each `UPDATE` statement must include the `WHERE` keyword, followed by a
condition.

To update all rows in the table, use `WHERE true`.

#### `FROM` keyword

An `UPDATE` statement can optionally include a `FROM` clause.

You can use the `FROM` clause to specify the rows to update in the target table.
You can also use columns from joined tables in a `SET` clause or `WHERE`
condition.

The `FROM` clause join can be a cross join if no condition is specified in the
`WHERE` clause, otherwise it is an inner join. In either case, rows from the
target table can join with at most one row from the `FROM` clause.

To specify the join predicate between the table to be updated and tables in
the `FROM` clause, use the `WHERE` clause. For an example, see
[`UPDATE` using joins](#update-using-joins).

Caveats:

- The `SET` clause can reference columns from a target table and columns from any `FROM` item in the `FROM` clause. If there is a name collision, unqualified references are treated as ambiguous.
- If the target table is present in the `FROM` clause as a table name, it must have an alias if you would like to perform a self-join.
- If a row in the table to be updated joins with zero rows from the `FROM` clause, then the row isn't updated.
- If a row in the table to be updated joins with exactly one row from the `FROM` clause, then the row is updated.
- If a row in the table to be updated joins with more than one row from the `FROM` clause, then the query generates the following runtime error: `UPDATE/MERGE must match at most one source row for each target row.`

#### `UPDATE` examples

##### `UPDATE` with `WHERE` clause

The following example updates a table named `Inventory` by reducing the value
of the `quantity` field by 10 for all products that contain the string `washer`.
Assume that the default value for the `supply_constrained` column is set to
`TRUE`.

```sql
UPDATE dataset.Inventory
SET quantity = quantity - 10,
    supply_constrained = DEFAULT
WHERE product like '%washer%'
```

Before:

```text
Inventory
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       30 |               NULL |
| dryer             |       30 |               NULL |
| front load washer |       20 |               NULL |
| microwave         |       20 |               NULL |
| oven              |        5 |               NULL |
| refrigerator      |       10 |               NULL |
| top load washer   |       10 |               NULL |
+-------------------+----------+--------------------+
```

After:

```text
Inventory
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       20 |               true |
| dryer             |       30 |               NULL |
| front load washer |       10 |               true |
| microwave         |       20 |               NULL |
| oven              |        5 |               NULL |
| refrigerator      |       10 |               NULL |
| top load washer   |        0 |               true |
+-------------------+----------+--------------------+
```

##### `UPDATE` using joins

The following example generates a table with inventory totals that include
existing inventory and inventory from the `NewArrivals` table, and
marks `supply_constrained` as `false`:

```sql
UPDATE dataset.Inventory
SET quantity = quantity +
  (SELECT quantity FROM dataset.NewArrivals
   WHERE Inventory.product = NewArrivals.product),
    supply_constrained = false
WHERE product IN (SELECT product FROM dataset.NewArrivals)
```

Alternately, you can join the tables:

```sql
UPDATE dataset.Inventory i
SET quantity = i.quantity + n.quantity,
    supply_constrained = false
FROM dataset.NewArrivals n
WHERE i.product = n.product
```

> [!NOTE]
> **Note:** The join predicate between Inventory and NewArrivals is specified using the `WHERE` clause.

Before:

```text
Inventory
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       30 |               NULL |
| dryer             |       30 |               NULL |
| front load washer |       20 |               NULL |
| microwave         |       20 |               NULL |
| oven              |        5 |               NULL |
| refrigerator      |       10 |               NULL |
| top load washer   |       10 |               NULL |
+-------------------+----------+--------------------+
NewArrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |      200 | warehouse #2 |
| oven            |      300 | warehouse #3 |
| top load washer |      100 | warehouse #1 |
+-----------------+----------+--------------+
```

After:

```text
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       30 |               NULL |
| dryer             |      230 |              false |
| front load washer |       20 |               NULL |
| microwave         |       20 |               NULL |
| oven              |      305 |              false |
| refrigerator      |       10 |               NULL |
| top load washer   |      110 |              false |
+-------------------+----------+--------------------+
```

<br />

##### `UPDATE` nested fields

The following example updates nested record fields.

```sql
UPDATE dataset.DetailedInventory
SET specifications.color = 'white',
    specifications.warranty = '1 year'
WHERE product like '%washer%'
```

Alternatively, you can update the entire record:

```sql
UPDATE dataset.DetailedInventory
SET specifications
   = STRUCT<color STRING, warranty STRING,
   dimensions STRUCT<depth FLOAT64, height FLOAT64, width FLOAT64>>('white', '1 year', NULL)
WHERE product like '%washer%'
```

```text
+----------------------+----------+--------------------+----------+---------------------------------------------------------+
|       product        | quantity | supply_constrained | comments |                     specifications                      |
+----------------------+----------+--------------------+----------+---------------------------------------------------------+
| countertop microwave |       20 |               NULL |       [] |                                                    NULL |
| dishwasher           |       30 |              false |       [] | {"color":"white","warranty":"1 year","dimensions":null} |
| dryer                |       30 |              false |       [] |                                                    NULL |
| front load washer    |       20 |              false |       [] | {"color":"white","warranty":"1 year","dimensions":null} |
| microwave            |       20 |              false |       [] |                                                    NULL |
| oven                 |        5 |              false |       [] |                                                    NULL |
| refrigerator         |       10 |              false |       [] |                                                    NULL |
| top load washer      |       10 |              false |       [] | {"color":"white","warranty":"1 year","dimensions":null} |
+----------------------+----------+--------------------+----------+---------------------------------------------------------+
```

##### `UPDATE` repeated records

The following example appends an entry to a repeated record in the `comments`
column for products that contain the string `washer`:

```sql
UPDATE dataset.DetailedInventory
SET comments = ARRAY(
  SELECT comment FROM UNNEST(comments) AS comment
  UNION ALL
  SELECT (CAST('2016-01-01' AS DATE), 'comment1')
)
WHERE product like '%washer%'
```

```text
+----------------------+----------+--------------------+----------------------------------------------------+----------------+
|       product        | quantity | supply_constrained |                      comments                      | specifications |
+----------------------+----------+--------------------+----------------------------------------------------+----------------+
| countertop microwave |       20 |               NULL |                                                 [] |           NULL |
| dishwasher           |       30 |              false | [u'{"created":"2016-01-01","comment":"comment1"}'] |           NULL |
| dryer                |       30 |              false |                                                 [] |           NULL |
| front load washer    |       20 |              false | [u'{"created":"2016-01-01","comment":"comment1"}'] |           NULL |
| microwave            |       20 |              false |                                                 [] |           NULL |
| oven                 |        5 |              false |                                                 [] |           NULL |
| refrigerator         |       10 |              false |                                                 [] |           NULL |
| top load washer      |       10 |              false | [u'{"created":"2016-01-01","comment":"comment1"}'] |           NULL |
+----------------------+----------+--------------------+----------------------------------------------------+----------------+
```

Alternatively, you can use the `ARRAY_CONCAT` function:

```sql
UPDATE dataset.DetailedInventory
SET comments = ARRAY_CONCAT(comments,
  ARRAY<STRUCT<created DATE, comment STRING>>[(CAST('2016-01-01' AS DATE), 'comment1')])
WHERE product like '%washer%'
```

The following example appends a second entry to the repeated record in the
`comments` column for all rows:

```sql
UPDATE dataset.DetailedInventory
SET comments = ARRAY(
  SELECT comment FROM UNNEST(comments) AS comment
  UNION ALL
  SELECT (CAST('2016-01-01' AS DATE), 'comment2')
)
WHERE true

SELECT product, comments FROM dataset.DetailedInventory
```

```text
+----------------------+------------------------------------------------------------------------------------------------------+
|       product        |                                               comments                                               |
+----------------------+------------------------------------------------------------------------------------------------------+
| countertop microwave |                                                   [u'{"created":"2016-01-01","comment":"comment2"}'] |
| dishwasher           | [u'{"created":"2016-01-01","comment":"comment1"}', u'{"created":"2016-01-01","comment":"comment2"}'] |
| dryer                |                                                   [u'{"created":"2016-01-01","comment":"comment2"}'] |
| front load washer    | [u'{"created":"2016-01-01","comment":"comment1"}', u'{"created":"2016-01-01","comment":"comment2"}'] |
| microwave            |                                                   [u'{"created":"2016-01-01","comment":"comment2"}'] |
| oven                 |                                                   [u'{"created":"2016-01-01","comment":"comment2"}'] |
| refrigerator         |                                                   [u'{"created":"2016-01-01","comment":"comment2"}'] |
| top load washer      | [u'{"created":"2016-01-01","comment":"comment1"}', u'{"created":"2016-01-01","comment":"comment2"}'] |
+----------------------+------------------------------------------------------------------------------------------------------+
```

To delete repeated value entries, you can use `WHERE ... NOT LIKE`:

```sql
UPDATE dataset.DetailedInventory
SET comments = ARRAY(
  SELECT c FROM UNNEST(comments) AS c
  WHERE c.comment NOT LIKE '%comment2%'
)
WHERE true
```

```text
+----------------------+----------+--------------------+----------------------------------------------------+----------------+
|       product        | quantity | supply_constrained |                      comments                      | specifications |
+----------------------+----------+--------------------+----------------------------------------------------+----------------+
| countertop microwave |       20 |               NULL |                                                 [] |           NULL |
| dishwasher           |       30 |              false | [u'{"created":"2016-01-01","comment":"comment1"}'] |           NULL |
| dryer                |       30 |              false |                                                 [] |           NULL |
| front load washer    |       20 |              false | [u'{"created":"2016-01-01","comment":"comment1"}'] |           NULL |
| microwave            |       20 |              false |                                                 [] |           NULL |
| oven                 |        5 |              false |                                                 [] |           NULL |
| refrigerator         |       10 |              false |                                                 [] |           NULL |
| top load washer      |       10 |              false | [u'{"created":"2016-01-01","comment":"comment1"}'] |           NULL |
+----------------------+----------+--------------------+----------------------------------------------------+----------------+
```

##### `UPDATE` statement using join between three tables

The following example sets `supply_constrained` to `true` for all products from
`NewArrivals` where the warehouse location is in `'WA'` state.

```sql
UPDATE dataset.DetailedInventory
SET supply_constrained = true
FROM dataset.NewArrivals, dataset.Warehouse
WHERE DetailedInventory.product = NewArrivals.product AND
      NewArrivals.warehouse = Warehouse.warehouse AND
      Warehouse.state = 'WA'
```

Note that the join predicate for the join with the updated table
(`DetailedInventory`) must be specified using `WHERE`. However, joins between
the other tables (`NewArrivals` and `Warehouse`) can be specified using an
explicit `JOIN ... ON` clause. For example, the following query is equivalent
to the previous query:

```sql
UPDATE dataset.DetailedInventory
SET supply_constrained = true
FROM dataset.NewArrivals
INNER JOIN dataset.Warehouse
ON NewArrivals.warehouse = Warehouse.warehouse
WHERE DetailedInventory.product = NewArrivals.product AND
      Warehouse.state = 'WA'
```

Before:

```text
DetailedInventory
+----------------------+----------+--------------------+----------+----------------+
|       product        | quantity | supply_constrained | comments | specifications |
+----------------------+----------+--------------------+----------+----------------+
| countertop microwave |       20 |               NULL |       [] |           NULL |
| dishwasher           |       30 |              false |       [] |           NULL |
| dryer                |       30 |              false |       [] |           NULL |
| front load washer    |       20 |              false |       [] |           NULL |
| microwave            |       20 |              false |       [] |           NULL |
| oven                 |        5 |              false |       [] |           NULL |
| refrigerator         |       10 |              false |       [] |           NULL |
| top load washer      |       10 |              false |       [] |           NULL |
+----------------------+----------+--------------------+----------+----------------+
New arrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |      200 | warehouse #2 |
| oven            |      300 | warehouse #3 |
| top load washer |      100 | warehouse #1 |
+-----------------+----------+--------------+
Warehouse
+--------------+-------+
|  warehouse   | state |
+--------------+-------+
| warehouse #1 | WA    |
| warehouse #2 | CA    |
| warehouse #3 | WA    |
+--------------+-------+
```

After:

```text
+----------------------+----------+--------------------+----------+----------------+
|       product        | quantity | supply_constrained | comments | specifications |
+----------------------+----------+--------------------+----------+----------------+
| countertop microwave |       20 |               NULL |       [] |           NULL |
| dishwasher           |       30 |              false |       [] |           NULL |
| dryer                |       30 |              false |       [] |           NULL |
| front load washer    |       20 |              false |       [] |           NULL |
| microwave            |       20 |              false |       [] |           NULL |
| oven                 |        5 |               true |       [] |           NULL |
| refrigerator         |       10 |              false |       [] |           NULL |
| top load washer      |       10 |               true |       [] |           NULL |
+----------------------+----------+--------------------+----------+----------------+
```

<br />

### `MERGE` statement

A `MERGE` statement
is a DML statement that can combine `INSERT`, `UPDATE`, and `DELETE`
operations into a single statement and perform the operations atomically.

> [!NOTE]
> **Note:** If as part of a `MERGE` a new row is inserted in the target table, the newly inserted row is not eligible for a match with rows from the source table. Matching is based on the state the tables are in when the query is started.

```sql
MERGE [INTO] target_name [[AS] alias]
USING source_name [[AS] alias]
ON merge_condition
{ when_clause } +

when_clause ::= matched_clause | not_matched_by_target_clause | not_matched_by_source_clause

matched_clause ::= WHEN MATCHED [ AND search_condition ] THEN { merge_update_clause | merge_delete_clause }

not_matched_by_target_clause ::= WHEN NOT MATCHED [BY TARGET] [ AND search_condition ] THEN merge_insert_clause

not_matched_by_source_clause ::= WHEN NOT MATCHED BY SOURCE [ AND search_condition ] THEN { merge_update_clause | merge_delete_clause }

merge_condition ::= bool_expression

search_condition ::= bool_expression

merge_update_clause ::= UPDATE SET update_item [, update_item]*
update_item ::= column_name = expression

merge_delete_clause ::= DELETE

merge_insert_clause ::= INSERT [(column_1 [, ..., column_n ])] input

input ::= VALUES (expr_1 [, ..., expr_n ]) | ROW

expr ::= expression | DEFAULT
```

Where:

-

  `target_name`
  :   `target_name` is the name of the table you're changing.

-

  `source_name`
  :   `source_name` is a table name or subquery.

-

  `merge_condition`

  :   A `MERGE` statement performs a `JOIN` between the target and the source. Then,
  depending on the match status (row matched, only in source table, only in
  destination table), the corresponding `WHEN` clause is executed. The
  `merge_condition` is used by the `JOIN` to match rows between source and target
  tables. Depending on the combination of `WHEN` clauses, different `INNER` and
  `OUTER` `JOIN` types are applied.

  :   If the merge_condition is `FALSE`, the query optimizer avoids using a `JOIN`.
  This optimization is referred to as a constant false predicate. A constant false
  predicate is useful when you perform an atomic `DELETE` on the target plus an
  `INSERT` from a source (`DELETE` with `INSERT` is also known as a `REPLACE`
  operation).

  :   If the columns used in the `merge_condition` both contain
  `NULL` values, specify something like `X = Y OR (X IS NULL AND Y IS NULL)`.
  This lets you avoid the case where the join is based on two `NULL` values.
  `NULL = NULL` evaluates to `NULL` instead of `TRUE`, and creates duplicate
  rows in the results.

-

  `when_clause`

  :   The `when_clause` has three options: `MATCHED`, `NOT MATCHED BY TARGET` and
  `NOT MATCHED BY SOURCE`. There must be at least one `when_clause` in each `MERGE`
  statement.

  :   Each `when_clause` can have an optional `search_condition`. The
  `when_clause` is executed for a row if both the `merge_condition` and
  `search_condition` are satisfied. When there are multiple qualified clauses,
  only the first `when_clause` is executed for a row.

-

  `matched_clause`

  :   The `matched_clause` defines how to update or delete a row in the target table
  if that row matches a row in the source table.

  :   If there is at least one `matched_clause` performing an `UPDATE`
  operation, a runtime error is returned when multiple rows from the source
  table match one row from the target table, and you are trying to update or
  delete that row in the target table.

-

  `not_matched_by_target_clause`
  :   The `not_matched_by_target_clause` defines how to insert into the target table
  if a row from source table does not match any row in the target table.

-

  `not_matched_by_source_clause`
  :   The `not_matched_by_source_clause` defines how to update or delete a row in
  the target table if that row does not match any row in the source table.

#### Omitting column names

- In the `not_matched_by_target_clause`, when the column names of target table are omitted, all columns in the target table are included in ascending order based on their ordinal positions. Note that, if the target table is an [ingestion-time partitioned table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time), column names must be specified.
- In the `not_matched_by_target_clause`, `ROW` can be used to include all the columns of the source in the ascending sequence of their ordinal positions. None of the pseudocolumns of the source are included. For example, the pseudocolumn `_PARTITIONTIME` is not included when the source is an [ingestion-time partitioned table](https://docs.cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time).

#### `MERGE` examples

##### Example 1

In the following example, the query adds new items from the `Inventory` table to the
`DetailedInventory` table. For items with low inventory, the
`supply_constrained` value is set to `true`, and comments are added.

```sql
MERGE dataset.DetailedInventory T
USING dataset.Inventory S
ON T.product = S.product
WHEN NOT MATCHED AND quantity < 20 THEN
  INSERT(product, quantity, supply_constrained, comments)
  VALUES(product, quantity, true, ARRAY<STRUCT<created DATE, comment STRING>>[(DATE('2016-01-01'), 'comment1')])
WHEN NOT MATCHED THEN
  INSERT(product, quantity, supply_constrained)
  VALUES(product, quantity, false)
```

These are the tables before you run the query:

```text
Inventory
+-------------------+----------+
|      product      | quantity |
+-------------------+----------+
| dishwasher        |       30 |
| dryer             |       30 |
| front load washer |       20 |
| microwave         |       20 |
| oven              |        5 |
| top load washer   |       10 |
+-------------------+----------+
```

```text
DetailedInventory
+----------------------+----------+--------------------+----------+----------------+
|       product        | quantity | supply_constrained | comments | specifications |
+----------------------+----------+--------------------+----------+----------------+
| countertop microwave |       20 |               NULL |       [] |           NULL |
| front load washer    |       20 |              false |       [] |           NULL |
| microwave            |       20 |              false |       [] |           NULL |
| refrigerator         |       10 |              false |       [] |           NULL |
+----------------------+----------+--------------------+----------+----------------+
```

This is the `DetailedInventory` table after you run the query:

```text
DetailedInventory
+----------------------+----------+--------------------+-------------------------------------------------+----------------+
|       product        | quantity | supply_constrained |                    comments                     | specifications |
+----------------------+----------+--------------------+-------------------------------------------------+----------------+
| countertop microwave |       20 |               NULL |                                              [] |           NULL |
| dishwasher           |       30 |              false |                                              [] |           NULL |
| dryer                |       30 |              false |                                              [] |           NULL |
| front load washer    |       20 |              false |                                              [] |           NULL |
| microwave            |       20 |              false |                                              [] |           NULL |
| oven                 |        5 |               true | [{"created":"2016-01-01","comment":"comment1"}] |           NULL |
| refrigerator         |       10 |              false |                                              [] |           NULL |
| top load washer      |       10 |               true | [{"created":"2016-01-01","comment":"comment1"}] |           NULL |
+----------------------+----------+--------------------+-------------------------------------------------+----------------+
```

##### Example 2

In the following example, the query merges items from the `NewArrivals` table
into the `Inventory` table. If an item is already present in `Inventory`, the
query increments the `quantity` field. Otherwise, the query inserts a new row.
Assume that the default value for the `supply_constrained` column is set to
`NULL`.

```sql
MERGE dataset.Inventory T
USING dataset.NewArrivals S
ON T.product = S.product
WHEN MATCHED THEN
  UPDATE SET quantity = T.quantity + S.quantity
WHEN NOT MATCHED THEN
  INSERT (product, quantity) VALUES(product, quantity)
```

These are the tables before you run the query:

```text
NewArrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |       20 | warehouse #2 |
| oven            |       30 | warehouse #3 |
| refrigerator    |       25 | warehouse #2 |
| top load washer |       10 | warehouse #1 |
+-----------------+----------+--------------+
```

```text
Inventory
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       30 | false              |
| dryer             |       30 | false              |
| front load washer |       20 | false              |
| microwave         |       20 | false              |
| oven              |        5 | true               |
| top load washer   |       10 | true               |
+-------------------+----------+--------------------+
```

This is the `Inventory` table after you run the query:

```text
Inventory
+-------------------+----------+--------------------+
|      product      | quantity | supply_constrained |
+-------------------+----------+--------------------+
| dishwasher        |       30 | false              |
| dryer             |       50 | false              |
| front load washer |       20 | false              |
| microwave         |       20 | false              |
| oven              |       35 | true               |
| refrigerator      |       25 | NULL               |
| top load washer   |       20 | true               |
+-------------------+----------+--------------------+
```

##### Example 3

In the following example, the query increases the quantity of products from
warehouse #1 by 20 in the `NewArrivals` table. The query deletes all other
products except for those from warehouse #2.

```sql
MERGE dataset.NewArrivals T
USING (SELECT * FROM dataset.NewArrivals WHERE warehouse <> 'warehouse #2') S
ON T.product = S.product
WHEN MATCHED AND T.warehouse = 'warehouse #1' THEN
  UPDATE SET quantity = T.quantity + 20
WHEN MATCHED THEN
  DELETE
```

This is the `NewArrivals` table before you run the query:

```text
NewArrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |       20 | warehouse #2 |
| oven            |       30 | warehouse #3 |
| refrigerator    |       25 | warehouse #2 |
| top load washer |       10 | warehouse #1 |
+-----------------+----------+--------------+
```

This is the `NewArrivals` table after you run the query:

```text
NewArrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |       20 | warehouse #2 |
| refrigerator    |       25 | warehouse #2 |
| top load washer |       30 | warehouse #1 |
+-----------------+----------+--------------+
```

##### Example 4

In the following example, the query replaces all products like `'%washer%'` in
the `Inventory` table by using the values in the `NewArrivals` table.

```sql
MERGE dataset.Inventory T
USING dataset.NewArrivals S
ON FALSE
WHEN NOT MATCHED AND product LIKE '%washer%' THEN
  INSERT (product, quantity) VALUES(product, quantity)
WHEN NOT MATCHED BY SOURCE AND product LIKE '%washer%' THEN
  DELETE
```

These are the tables before you run the query:

```text
NewArrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |       20 | warehouse #2 |
| refrigerator    |       25 | warehouse #2 |
| top load washer |       30 | warehouse #1 |
+-----------------+----------+--------------+
```

```text
Inventory
+-------------------+----------+
|      product      | quantity |
+-------------------+----------+
| dishwasher        |       30 |
| dryer             |       50 |
| front load washer |       20 |
| microwave         |       20 |
| oven              |       35 |
| refrigerator      |       25 |
| top load washer   |       20 |
+-------------------+----------+
```

This is the `Inventory` table after you run the query:

```text
Inventory
+-----------------+----------+
|     product     | quantity |
+-----------------+----------+
| dryer           |       50 |
| microwave       |       20 |
| oven            |       35 |
| refrigerator    |       25 |
| top load washer |       30 |
+-----------------+----------+
```

##### Example 5

In the following example, the query adds a comment in the `DetailedInventory`
table if the product has a lower than average quantity in `Inventory` table.

```sql
MERGE dataset.DetailedInventory T
USING dataset.Inventory S
ON T.product = S.product
WHEN MATCHED AND S.quantity < (SELECT AVG(quantity) FROM dataset.Inventory) THEN
  UPDATE SET comments = ARRAY_CONCAT(comments, ARRAY<STRUCT<created DATE, comment STRING>>[(CAST('2016-02-01' AS DATE), 'comment2')])
```

These are the tables before you run the query:

```text
Inventory
+-----------------+----------+
|     product     | quantity |
+-----------------+----------+
| dryer           |       50 |
| microwave       |       20 |
| oven            |       35 |
| refrigerator    |       25 |
| top load washer |       30 |
+-----------------+----------+
```

```text
DetailedInventory
+----------------------+----------+--------------------+-------------------------------------------------+----------------+
|       product        | quantity | supply_constrained |                    comments                     | specifications |
+----------------------+----------+--------------------+-------------------------------------------------+----------------+
| countertop microwave |       20 |               NULL |                                              [] |           NULL |
| dishwasher           |       30 |              false |                                              [] |           NULL |
| dryer                |       30 |              false |                                              [] |           NULL |
| front load washer    |       20 |              false |                                              [] |           NULL |
| microwave            |       20 |              false |                                              [] |           NULL |
| oven                 |        5 |               true | [{"created":"2016-01-01","comment":"comment1"}] |           NULL |
| refrigerator         |       10 |              false |                                              [] |           NULL |
| top load washer      |       10 |               true | [{"created":"2016-01-01","comment":"comment1"}] |           NULL |
+----------------------+----------+--------------------+-------------------------------------------------+----------------+
```

This is the `DetailedInventory` table after you run the query:

```text
+----------------------+----------+--------------------+-----------------------------------------------------------------------------------------------+----------------+
|       product        | quantity | supply_constrained |                                           comments                                            | specifications |
+----------------------+----------+--------------------+-----------------------------------------------------------------------------------------------+----------------+
| countertop microwave |       20 |               NULL |                                                                                            [] |           NULL |
| dishwasher           |       30 |              false |                                                                                            [] |           NULL |
| dryer                |       30 |              false |                                                                                            [] |           NULL |
| front load washer    |       20 |              false |                                                                                            [] |           NULL |
| microwave            |       20 |              false |                                               [{"created":"2016-02-01","comment":"comment2"}] |           NULL |
| oven                 |        5 |               true |                                               [{"created":"2016-01-01","comment":"comment1"}] |           NULL |
| refrigerator         |       10 |              false |                                               [{"created":"2016-02-01","comment":"comment2"}] |           NULL |
| top load washer      |       10 |               true | [{"created":"2016-01-01","comment":"comment1"},{"created":"2016-02-01","comment":"comment2"}] |           NULL |
+----------------------+----------+--------------------+-----------------------------------------------------------------------------------------------+----------------+
```

<br />

##### Example 6

In the following example, the query increases the inventory of products from the
warehouse in `CA`. The products from other states are deleted, and any product
that is not present in the `NewArrivals` table is unchanged.

```sql
MERGE dataset.Inventory T
USING (SELECT product, quantity, state FROM dataset.NewArrivals t1 JOIN dataset.Warehouse t2 ON t1.warehouse = t2.warehouse) S
ON T.product = S.product
WHEN MATCHED AND state = 'CA' THEN
  UPDATE SET quantity = T.quantity + S.quantity
WHEN MATCHED THEN
  DELETE
```

These are the tables before you run the query:

```text
Warehouse
+--------------+-------+
|  warehouse   | state |
+--------------+-------+
| warehouse #1 | WA    |
| warehouse #2 | CA    |
| warehouse #3 | WA    |
+--------------+-------+
```

```text
NewArrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |       20 | warehouse #2 |
| refrigerator    |       25 | warehouse #2 |
| top load washer |       30 | warehouse #1 |
+-----------------+----------+--------------+
```

```text
Inventory
+-----------------+----------+
|     product     | quantity |
+-----------------+----------+
| dryer           |       50 |
| microwave       |       20 |
| oven            |       35 |
| refrigerator    |       25 |
| top load washer |       30 |
+-----------------+----------+
```

<br />

This is the `Inventory` table after you run the query:

```text
Inventory
+--------------+----------+
|   product    | quantity |
+--------------+----------+
| dryer        |       70 |
| microwave    |       20 |
| oven         |       35 |
| refrigerator |       50 |
+--------------+----------+
```

##### Example 7

In the following example, a runtime error is returned because the query attempts
to update a target table when the source contains more than one matched row. To
resolve the error, you need to change the `merge_condition` or `search_condition`
to avoid duplicate matches in the source.

```sql
MERGE dataset.Inventory T
USING dataset.NewArrivals S
ON T.product = S.product
WHEN MATCHED THEN
  UPDATE SET quantity = T.quantity + S.quantity
```

These are the tables before you run the query:

```text
NewArrivals
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |       10 | warehouse #2 |
| dryer           |       20 | warehouse #1 |
| refrigerator    |       25 | warehouse #2 |
| top load washer |       30 | warehouse #1 |
+-----------------+----------+--------------+
```

```text
Inventory
+--------------+----------+
|   product    | quantity |
+--------------+----------+
| dryer        |       70 |
| microwave    |       20 |
| oven         |       35 |
| refrigerator |       50 |
+--------------+----------+
```

When you run the query, the following error is returned:

```text
UPDATE/MERGE must match at most one source row for each target row
```

##### Example 8

In the following example, all of the products in the `NewArrivals` table are
replaced with values from the subquery. The `INSERT` clause does not specify
column names for either the target table or the source subquery.

```sql
MERGE dataset.NewArrivals
USING (SELECT * FROM UNNEST([('microwave', 10, 'warehouse #1'),
                             ('dryer', 30, 'warehouse #1'),
                             ('oven', 20, 'warehouse #2')]))
ON FALSE
WHEN NOT MATCHED THEN
  INSERT ROW
WHEN NOT MATCHED BY SOURCE THEN
  DELETE
```

This is the `NewArrivals` table before you run the query:

```text
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| dryer           |       10 | warehouse #2 |
| dryer           |       20 | warehouse #1 |
| refrigerator    |       25 | warehouse #2 |
| top load washer |       30 | warehouse #1 |
+-----------------+----------+--------------+
```

This is the `NewArrivals` table after you run the query:

```text
+-----------------+----------+--------------+
|     product     | quantity |  warehouse   |
+-----------------+----------+--------------+
| microwave       |       10 | warehouse #1 |
| dryer           |       30 | warehouse #1 |
| oven            |       20 | warehouse #2 |
+-----------------+----------+--------------+
```

### Tables used in examples

The example queries in this document use the following tables.

#### Inventory table

```sql
[
  {"name": "product", "type": "string"},
  {"name": "quantity", "type": "integer"},
  {"name": "supply_constrained", "type": "boolean"}
]
```

DDL statement to create this table:

```sql
CREATE OR REPLACE TABLE
  dataset.Inventory (product STRING,
    quantity INT64,
    supply_constrained BOOLEAN);
```

#### NewArrivals table

```sql
[
  {"name": "product", "type": "string"},
  {"name": "quantity", "type": "integer"},
  {"name": "warehouse", "type": "string"}
]
```

DDL statement to create this table:

```sql
CREATE OR REPLACE TABLE
  dataset.NewArrivals (product STRING,
    quantity INT64,
    warehouse STRING);
```

#### Warehouse table

```sql
[
  {"name": "warehouse", "type": "string"},
  {"name": "state", "type": "string"}
]
```

DDL statement to create this table:

```sql
CREATE OR REPLACE TABLE
  dataset.Warehouse (warehouse STRING,
    state STRING);
```

#### DetailedInventory table

```sql
[
  {"name": "product", "type": "string"},
  {"name": "quantity", "type": "integer"},
  {"name": "supply_constrained", "type": "boolean"},
  {"name": "comments", "type": "record", "mode": "repeated", "fields": [
    {"name": "created", "type": "date"},
    {"name": "comment", "type": "string"}
  ]},
  {"name": "specifications", "type": "record", "fields": [
    {"name": "color", "type": "string"},
    {"name": "warranty", "type": "string"},
    {"name": "dimensions", "type": "record", "fields": [
      {"name": "depth", "type": "float"},
      {"name": "height", "type": "float"},
      {"name": "width", "type": "float"}
    ]}
  ]}
]
```

DDL statement to create this table:

```sql
CREATE OR REPLACE TABLE
  dataset.DetailedInventory (product STRING,
    quantity INT64,
    supply_constrained BOOLEAN,
    comments ARRAY<STRUCT<created DATE, comment STRING>>,
    specifications STRUCT<color STRING, warranty STRING,
      dimensions STRUCT<depth FLOAT64, height FLOAT64, width FLOAT64>>);
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; definition-list bodies are un-indented by four spaces so that they are not read as code; the `:` markers of the twin are kept (GitHub Markdown has no definition lists); indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
