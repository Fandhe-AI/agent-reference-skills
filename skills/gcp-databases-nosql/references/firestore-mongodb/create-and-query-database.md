---
source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/create-and-query-database
---

# Connect with mongosh

Create a Firestore with MongoDB compatibility database (Enterprise edition), create a SCRAM database user, and connect to the database with the `mongosh` tool.

## Signature / Usage

### Prerequisites

- A Google Cloud project with billing enabled.
- Role on the project: Cloud Datastore Owner.
- `mongosh` installed.

### Connection string format

The connection string depends on the database UID (system-generated) and the database location:

```text
UID.LOCATION.firestore.goog
```

### Connect

```bash
mongosh 'mongodb://USERNAME:PASSWORD@CONNECTION_STRING:443/DATABASE_ID?loadBalanced=true&authMechanism=SCRAM-SHA-256&tls=true&retryWrites=false'
```

Replace `USERNAME` with the database user, `PASSWORD` with the generated password, `CONNECTION_STRING` with the database connection string, and `DATABASE_ID` with a database ID.

### Create and read data

```javascript
db.pages.insertOne({ message: "Hello World!"})
db.pages.find({})
exit
```

## Options / Props

| Step | Detail |
| --- | --- |
| Create database | Console: Databases > Create a Firestore Database; enter a database ID, select Enterprise Edition and a location. Firestore Studio then shows the connection string under "Connect to Firestore using an external MongoDB tool". |
| Create user | Console: database > Security > Add User; enter a username and select an IAM role. The generated password is shown once and cannot be retrieved later. |

## Notes

- Firestore with MongoDB compatibility requires Firestore Enterprise edition.
- The source also shows Console click-paths for project selection, IAM role checks and database creation (omitted here).
- A password placed in the `mongosh` URI is stored in shell history and visible in the process list; the source offers no alternative on this page. Never commit or log a real password.
- Distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/create-and-query-database (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect.md](./connect.md)
- [overview.md](./overview.md)
- [supported-data-types-drivers.md](./supported-data-types-drivers.md)
- [behavior-differences.md](./behavior-differences.md)
