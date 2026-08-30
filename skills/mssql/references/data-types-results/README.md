# Data Types & Results

| Name | Description | Path |
|------|-------------|------|
| Data Types | Full list of SQL Server data types (`sql.VarChar`, `sql.Decimal`, `sql.DateTime2`, etc.) with length/precision/scale usage | [data-types.md](./data-types.md) |
| JSON support | `FOR JSON PATH` output column and `config.parseJSON` auto-parsing | [json-support.md](./json-support.md) |
| Geography and Geometry | Built-in deserializer for `Geography` / `Geometry` CLR data types | [geography-geometry.md](./geography-geometry.md) |
| Table-Valued Parameter (TVP) | Passing a `sql.Table` as a stored procedure parameter | [table-valued-parameter.md](./table-valued-parameter.md) |
| Response Schema | Shape of the object returned from a query (`recordsets`, `recordset`, `output`, `rowsAffected`) | [response-schema.md](./response-schema.md) |
| Affected Rows | Reading `rowsAffected` for `INSERT`/`UPDATE`/`DELETE` | [affected-rows.md](./affected-rows.md) |
| Handling Duplicate Column Names | Default duplicate-column behaviour and `arrayRowMode` (including streaming) | [duplicate-column-names.md](./duplicate-column-names.md) |
| Metadata | Recordset column metadata via `recordset.columns` | [metadata.md](./metadata.md) |
