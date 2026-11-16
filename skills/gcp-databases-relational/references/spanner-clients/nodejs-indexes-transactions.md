---
source: https://docs.cloud.google.com/spanner/docs/getting-started/nodejs
---

# Getting started with Spanner in Node.js (schema, indexes, read-only transactions)

Add a column and secondary indexes with `gcloud spanner databases ddl update`, read through an index with `Table.read()` (the read interface needs the index named explicitly), and run consistent reads in a read-only snapshot (sample runner only; the code is on the Spanner transactions page). Earlier steps: [nodejs-write-query-read.md](./nodejs-write-query-read.md).

## Signature / Usage

### Schema updates on the command line

```bash
gcloud spanner databases ddl update example-db --instance=test-instance \
    --ddl='ALTER TABLE Albums ADD COLUMN MarketingBudget INT64'
```

PostgreSQL dialect uses `BIGINT` instead of `INT64`. Expected output: `Schema updating...done.`

```bash
gcloud spanner databases ddl update example-db --instance=test-instance \
    --ddl='CREATE INDEX AlbumsByAlbumTitle ON Albums(AlbumTitle)'
```

Adapted (not in the official docs): the source command lacks the closing single quote after `(MarketingBudget)`; it is added so the shell accepts the command.

```bash
gcloud spanner databases ddl update example-db --instance=test-instance \
    --ddl='CREATE INDEX AlbumsByAlbumTitle2 ON Albums(AlbumTitle) STORING (MarketingBudget)'
```

PostgreSQL dialect replaces `STORING` with `INCLUDE` in the same command.

### Read using the index

Adapted (not in the official docs): wrapped in `async function main()` so `await` is valid in a CommonJS script, the catch block rethrows and `main()` sets a non-zero exit code on failure, and `database.close()` is awaited.

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

const albumsTable = database.table('Albums');

const query = {
  columns: ['AlbumId', 'AlbumTitle'],
  keySet: {
    all: true,
  },
  index: 'AlbumsByAlbumTitle',
};

async function main() {
  // Reads the Albums table using an index
  try {
    const [rows] = await albumsTable.read(query);

    rows.forEach(row => {
      const json = row.toJSON();
      console.log(`AlbumId: ${json.AlbumId}, AlbumTitle: ${json.AlbumTitle}`);
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

```bash
node indexing.js readIndex test-instance example-db MY_PROJECT_ID
```

## Options / Props

| Sample command | Runner | Purpose |
|----------------|--------|---------|
| `addColumn` | `schema.js` | `ALTER TABLE Albums ADD COLUMN MarketingBudget INT64` |
| `queryNewColumn` | `schema.js` | Query the new column |
| `createIndex` | `indexing.js` | Create `AlbumsByAlbumTitle` |
| `readIndex` | `indexing.js` | Read through the index |
| `createStoringIndex` | `indexing.js` | Create `AlbumsByAlbumTitle2` with `STORING` |
| `readStoringIndex` | `indexing.js` | Read `MarketingBudget` from the storing index |
| `writeWithTransactionUsingDml` | `dml.js` | Read-write transaction transferring 200000 between albums |
| `readOnly` | `transaction.js` | Read-only snapshot |

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/getting-started/nodejs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Client-library basics (ADC, retries, the emulator) belong to the `gcp-client-libraries` skill.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Corrected from the official docs: the `STORING` gcloud command ended `... (MarketingBudget)` without the closing `'`; the PostgreSQL `INCLUDE` form in the source has the same missing quote.
- Schema updates run while the database keeps serving traffic; no offline time and no table or column locks. Adding an index backfills existing data automatically and can take a few minutes.
- After an index exists, SQL queries use it automatically when it is likely faster; the read interface requires the `index` option. The read interface cannot join an index with the base table, so columns not in the index need a `STORING` (PostgreSQL: `INCLUDE`) index. Per https://docs.cloud.google.com/spanner/docs/sql-best-practices (see `spanner-dml-queries/sql-best-practices.md`), automatic index use in SQL applies once three days have passed since database creation, so in a database created for this tutorial add the `@{FORCE_INDEX=AlbumsByAlbumTitle}` index directive (PostgreSQL: `/*@ FORCE_INDEX=AlbumsByAlbumTitle */`) if a query must use the index.
- Read-only transactions observe a consistent prefix of the commit history, so several reads in one snapshot see the same data. Run the sample with `node transaction.js readOnly test-instance example-db MY_PROJECT_ID`; the same `database.getSnapshot()` code is on https://docs.cloud.google.com/spanner/docs/transactions (Read-only transactions, Node.js).
- Spanner might execute a transaction's operations multiple times; if it retries your transaction, side effects of its operations (for example changes to external systems) might occur multiple times, so keep side effects out of the read-write transaction function (from the Spanner transactions page).
- Source: https://docs.cloud.google.com/spanner/docs/transactions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the index-read sample ran `const [rows] = await albumsTable.read(query);` at the top level of a `require` script, its catch block only logged the error (`console.error('ERROR:', err);`) and it called `database.close();` without `await`, so it is a `SyntaxError` in CommonJS and exits 0 on failure. In the sample repository the code is the body of an async function in `indexing.js`, run with the `node indexing.js readIndex ...` runner shown.
- The source also shows the client-library `updateDatabaseDdl` samples for add column / create index / storing index, writing and querying the new column, the read-write DML transfer transaction (reads two budgets, aborts if the second album holds less than 200000, then updates both), and the storing-index read; they are omitted here.

## Related

- [nodejs-setup-database.md](./nodejs-setup-database.md)
- [nodejs-write-query-read.md](./nodejs-write-query-read.md)
- [python-indexes-transactions.md](./python-indexes-transactions.md)
