# spanner-dml-queries

| Name | Description | Path |
|------|-------------|------|
| Partitioned DML | Bulk updates and deletes run as partitioned DML: idempotency, limits, unsupported features | [dml-partitioned.md](./dml-partitioned.md) |
| DML best practices | WHERE-clause lock scope, DML vs mutations, commit timestamps, batch DML, last_statement | [dml-best-practices.md](./dml-best-practices.md) |
| SQL best practices | Query parameters, secondary indexes, key lookups, joins, STARTS_WITH, timestamp pushdown | [sql-best-practices.md](./sql-best-practices.md) |
| Query execution plans | Operator tree, distributed execution, metrics, sampled plans, common plan patterns | [query-execution-plans.md](./query-execution-plans.md) |
| Isolation levels | Serializable vs repeatable read, SELECT FOR UPDATE, read-write and write-write conflicts | [isolation-levels.md](./isolation-levels.md) |
