# transactions

対象 mssql (node-mssql) v12.7.0

これは SQL Server の DB トランザクション / TDS prepared statement であり、`upstash`（Redis `MULTI`）や `stripe` の transaction とは別物。

| Name | Description | Path |
|------|-------------|------|
| Transaction | Single-connection SQL Server transaction, Events, Aborted transactions | [transaction.md](./transaction.md) |
| begin | Begin a transaction, with isolationLevel | [begin.md](./begin.md) |
| commit | Commit a transaction | [commit.md](./commit.md) |
| rollback | Rollback a transaction | [rollback.md](./rollback.md) |
| PreparedStatement | Single-connection TDS prepared statement | [prepared-statement.md](./prepared-statement.md) |
| input | Add an input parameter to the prepared statement | [prepared-statement-input.md](./prepared-statement-input.md) |
| output | Add an output parameter to the prepared statement | [prepared-statement-output.md](./prepared-statement-output.md) |
| prepare | Prepare a statement | [prepare.md](./prepare.md) |
| execute | Execute a prepared statement | [prepared-statement-execute.md](./prepared-statement-execute.md) |
| unprepare | Unprepare a prepared statement | [unprepare.md](./unprepare.md) |
