# Requests

| Name | Description | Path |
|------|-------------|------|
| Request | Executes SQL commands against a pool or transaction; overview + events | [request.md](./request.md) |
| execute | Call a stored procedure | [execute.md](./execute.md) |
| input | Add an input parameter to the request; JS -> SQL data type map | [input.md](./input.md) |
| output | Add an output parameter to the request | [output.md](./output.md) |
| replaceInput | Replace an existing input parameter | [replace-input.md](./replace-input.md) |
| replaceOutput | Replace an existing output parameter | [replace-output.md](./replace-output.md) |
| toReadableStream | Convert request to a Node.js ReadableStream | [to-readable-stream.md](./to-readable-stream.md) |
| pipe | Stream all rows from all recordsets to a writable stream | [pipe.md](./pipe.md) |
| query | Execute a SQL command via `sp_executesql` | [query.md](./query.md) |
| batch | Execute a SQL command without `sp_executesql` (DDL, temp tables) | [batch.md](./batch.md) |
| bulk | Perform a bulk insert | [bulk.md](./bulk.md) |
| cancel | Cancel currently executing request | [cancel.md](./cancel.md) |
