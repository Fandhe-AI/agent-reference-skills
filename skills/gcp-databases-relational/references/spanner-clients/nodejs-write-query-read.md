---
source: https://docs.cloud.google.com/spanner/docs/getting-started/nodejs
---

# Getting started with Spanner in Node.js (write, query, read)

Write rows with DML in a read-write transaction (`runUpdate()`), and query them with `Database.run()` or the gcloud CLI. Setup is in [nodejs-setup-database.md](./nodejs-setup-database.md).

## Signature / Usage

### Write data with DML

Adapted (not in the official docs): `process.exitCode = 1;` is set where the error is logged (the `if (err)` branch and the `catch` block) so a failed transaction does not exit 0.

```javascript
// Imports the Google Cloud client library
const {Spanner} = require('@google-cloud/spanner');

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const projectId = 'my-project-id';
// const instanceId = 'my-instance';
// const databaseId = 'my-database';

// Creates a client
const spanner = new Spanner({
  projectId: projectId,
});

// Gets a reference to a Cloud Spanner instance and database
const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);

database.runTransaction(async (err, transaction) => {
  if (err) {
    console.error(err);
    process.exitCode = 1;
    return;
  }
  try {
    const [rowCount] = await transaction.runUpdate({
      sql: `INSERT Singers (SingerId, FirstName, LastName) VALUES
      (12, 'Melissa', 'Garcia'),
      (13, 'Russell', 'Morales'),
      (14, 'Jacqueline', 'Long'),
      (15, 'Dylan', 'Shaw')`,
    });
    console.log(`${rowCount} records inserted.`);
    await transaction.commit();
  } catch (err) {
    console.error('ERROR:', err);
    process.exitCode = 1;
  } finally {
    // Close the database when finished.
    database.close();
  }
});
```

```bash
node dml.js writeUsingDml test-instance example-db MY_PROJECT_ID
```

Expected output: `4 records inserted.`

### Query on the command line

```bash
gcloud spanner databases execute-sql example-db --instance=test-instance \
    --sql='SELECT SingerId, AlbumId, AlbumTitle FROM Albums'
```

### Query with `Database.run()`

Adapted (not in the official docs): wrapped in `async function main()` so `await` is valid in a CommonJS script, the catch block rethrows and `main()` sets a non-zero exit code on failure.

```javascript
const query = {
  sql: 'SELECT SingerId, AlbumId, AlbumTitle FROM Albums',
};

async function main() {
  // Queries rows from the Albums table
  try {
    const [rows] = await database.run(query);

    rows.forEach(row => {
      const json = row.toJSON();
      console.log(
        `SingerId: ${json.SingerId}, AlbumId: ${json.AlbumId}, AlbumTitle: ${json.AlbumTitle}`,
      );
    });
  } catch (err) {
    console.error('ERROR:', err);
    throw err;
  } finally {
    // Close the database when finished.
    await database.close();
  }
}

main().catch(() => {
  process.exitCode = 1;
});
```

This block is a contiguous excerpt: the full sample starts with the same import, `projectId` comments, `spanner`, `instance` and `database` lines as the DML example above. Run with `node crud.js query test-instance example-db MY_PROJECT_ID`.

## Options / Props

| Sample command | Runner | Purpose |
|----------------|--------|---------|
| `writeUsingDml` | `dml.js` | Insert 4 Singers with DML |
| `insert` | `crud.js` | Insert Singers and Albums with mutations |
| `query` | `crud.js` | `SELECT` from Albums |
| `queryWithParameter` | `dml.js` | Parameterized query on `LastName` |
| `read` | `crud.js` | `Table.read()` of Albums |

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/getting-started/nodejs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Client-library basics (ADC, retries, the emulator) belong to the `gcp-client-libraries` skill.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Corrected from the official docs: in the DML write sample, the `runTransaction` callback only logged errors (`if (err) { console.error(err); return; }` and `} catch (err) { console.error('ERROR:', err); }`), so a failed transaction exited 0.
- Corrected from the official docs: the `Database.run()` sample ran `const [rows] = await database.run(query);` at the top level of a `require` script and its catch block only logged the error (`console.error('ERROR:', err);`), so it is a `SyntaxError` in CommonJS and exits 0 on failure.
- Cloud Spanner interprets Node.js numbers as FLOAT64, so they must be converted to strings before being inserted as INT64 (stated in the mutation sample).
- There are limits to commit size; see https://docs.cloud.google.com/spanner/quotas#limits-for
- Parameterized queries can be cached and reused, which reduces compilation costs: https://docs.cloud.google.com/spanner/docs/sql-best-practices#query-parameters
- The source also shows the mutation insert sample (`table.insert()` batches are applied atomically; run with `node crud.js insert ...`), the parameterized query in GoogleSQL (`@lastName`) and PostgreSQL (`$1`) forms, and the PostgreSQL-dialect samples; they are omitted here.
- The source also shows the GoogleSQL pipe-syntax gcloud query (`--sql='FROM Albums |> SELECT SingerId, AlbumId, AlbumTitle'`) and the `Table.read()` sample (`Table.read()` on `database.table('Albums')` with `keySet: {all: true}`, run with `node crud.js read test-instance example-db MY_PROJECT_ID`); the read interface is shown with an index in [nodejs-indexes-transactions.md](./nodejs-indexes-transactions.md).

## Related

- [nodejs-setup-database.md](./nodejs-setup-database.md)
- [nodejs-indexes-transactions.md](./nodejs-indexes-transactions.md)
- [python-write-query-read.md](./python-write-query-read.md)
