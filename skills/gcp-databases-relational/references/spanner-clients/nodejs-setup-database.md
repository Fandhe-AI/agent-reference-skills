---
source: https://docs.cloud.google.com/spanner/docs/getting-started/nodejs
---

# Getting started with Spanner in Node.js (setup, database, cleanup)

Set up the Node.js samples, create a `test-instance` / `example-db` database with the `Singers` and `Albums` tables (GoogleSQL dialect shown), and clean up afterwards. Data reads and writes are in [nodejs-write-query-read.md](./nodejs-write-query-read.md); schema, indexes and read-only transactions are in [nodejs-indexes-transactions.md](./nodejs-indexes-transactions.md).

## Signature / Usage

### Prepare the environment

Run `gcloud auth application-default login` first (see Notes). Then:

```bash
git clone https://github.com/GoogleCloudPlatform/nodejs-docs-samples.git
```

```bash
cd nodejs-docs-samples/spanner/
```

```bash
npm install
```

### Create the database (sample runner)

```bash
node schema.js createDatabase test-instance example-db MY_PROJECT_ID
```

PostgreSQL dialect: `node schema.js createPgDatabase test-instance example-db MY_PROJECT_ID`. Expected output: `Created database example-db on instance test-instance.`

### Create the database (code, GoogleSQL)

Adapted (not in the official docs): the variable names `projectID` / `databaseID` / `instanceID` (undeclared, differing in case from the commented `projectId` / `databaseId` / `instanceId`) are renamed to the declared `Id` spelling so the sample runs, and the `try` / `catch` is wrapped in `async function main()` so `await` is valid in a CommonJS script; the catch block rethrows after logging and `main()` sets a non-zero exit code, so a failed `createDatabase` LRO exits non-zero.

```javascript

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const projectId = 'my-project-id';
// const instanceId = 'my-instance';
// const databaseId = 'my-database';

// Imports the Google Cloud client library
const {Spanner} = require('@google-cloud/spanner');

// creates a client
const spanner = new Spanner({
  projectId: projectId,
});

const databaseAdminClient = spanner.getDatabaseAdminClient();

const createSingersTableStatement = `
CREATE TABLE Singers (
  SingerId    INT64 NOT NULL,
  FirstName   STRING(1024),
  LastName    STRING(1024),
  SingerInfo  BYTES(MAX),
  FullName    STRING(2048) AS (ARRAY_TO_STRING([FirstName, LastName], " ")) STORED,
) PRIMARY KEY (SingerId)`;
const createAlbumsTableStatement = `
CREATE TABLE Albums (
  SingerId    INT64 NOT NULL,
  AlbumId     INT64 NOT NULL,
  AlbumTitle  STRING(MAX)
) PRIMARY KEY (SingerId, AlbumId),
INTERLEAVE IN PARENT Singers ON DELETE CASCADE`;

async function main() {
  // Creates a new database
  try {
    const [operation] = await databaseAdminClient.createDatabase({
      createStatement: 'CREATE DATABASE `' + databaseId + '`',
      extraStatements: [
        createSingersTableStatement,
        createAlbumsTableStatement,
      ],
      parent: databaseAdminClient.instancePath(projectId, instanceId),
    });

    console.log(`Waiting for creation of ${databaseId} to complete...`);
    await operation.promise();

    console.log(`Created database ${databaseId} on instance ${instanceId}.`);
  } catch (err) {
    console.error('ERROR:', err);
    throw err;
  }
}

main().catch(() => {
  process.exitCode = 1;
});
```

### Cleanup

Delete the database (deleting an instance drops all of its databases automatically, but the instance keeps incurring charges until deleted):

```bash
gcloud spanner databases delete example-db --instance=test-instance
```

Delete the instance:

```bash
gcloud spanner instances delete test-instance
```

## Options / Props

| Item | Value | Description |
|------|-------|-------------|
| Instance name | `test-instance` | Name the tutorial assumes; create it via gcloud CLI, console or a client library |
| Database name | `example-db` | Database created by `schema.js createDatabase` |
| Sample arguments | `<command> <instance> <database> <project>` | Argument order of every `node *.js` sample runner |
| Prerequisites | Cloud Spanner API enabled, billing enabled, ADC | From the Spanner "Set up" page |

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/getting-started/nodejs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Client-library basics (ADC, retries, the emulator) belong to the `gcp-client-libraries` skill; this page only covers the Spanner tutorial.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- Adapted from the official docs: the original used the undeclared `projectID` / `databaseID` / `instanceID` (for example `projectId: projectID`), now renamed, and ran `await databaseAdminClient.createDatabase({` at the top level of a `require` script (a `SyntaxError` in CommonJS) with a catch block that only logged (`console.error('ERROR:', err);`), so a failure exited 0; it is now wrapped in `main()` and rethrows. In the sample repository the code is the body of an async function in `schema.js`.
- Not from the source: `databaseId` is concatenated into the `CREATE DATABASE` DDL (an identifier can't be a query parameter), so pass only a trusted database ID, never unvalidated user input.
- Both `delete` commands are destructive. Deleting `example-db` removes the database and all of its data; deleting `test-instance` is not reversible and drops all of its databases (an instance with backups can't be deleted; see `spanner-operations/backup.md`). Try them on a disposable instance or database first. The source suggests a throwaway project for the whole tutorial.
- The source recommends a new Google Cloud project if you do not plan to keep the resources; Spanner is billable.
- The source also shows a `Database` client created with `spanner.instance(instanceId).database(databaseId)` and a `SELECT 1` query. `Database` behaves like a connection: create it once at startup and reuse it; call `Database.close()` when you create multiple clients and no longer need one.
- The source also shows the PostgreSQL-dialect `createPgDatabase` code (PostgreSQL create requests cannot carry extra DDL, so tables are created with a separate `updateDatabaseDdl` call) and the Console delete steps; they are omitted here.

## Related

- [nodejs-write-query-read.md](./nodejs-write-query-read.md)
- [nodejs-indexes-transactions.md](./nodejs-indexes-transactions.md)
- [python-setup-database.md](./python-setup-database.md)
