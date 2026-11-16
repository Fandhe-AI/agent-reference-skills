---
source: https://docs.cloud.google.com/spanner/docs/pgadapter
---

# About PGAdapter and Spanner drivers

PGAdapter translates the PostgreSQL wire protocol into the Spanner gRPC protocol, letting PostgreSQL applications and drivers connect to the Spanner PostgreSQL interface with minimal latency overhead. It exposes a localhost endpoint that speaks the PostgreSQL wire protocol, so tools such as `psql` can connect to Spanner. It runs as a sidecar proxy next to your application or, for Java, in-process in the application JVM. This page also holds the drivers overview (merged from "Spanner drivers overview"): the open-source drivers and ORMs supported for GoogleSQL- and PostgreSQL-dialect databases, with feature matrices.

## Signature / Usage

### Start PGAdapter with Docker

The Docker and host port are both set to the PostgreSQL default port 5432, published on localhost.

```bash
docker run -d -p 127.0.0.1:5432:5432 \
-v /tmp/credentials.json:/acct_credentials.json \
gcr.io/cloud-spanner-pg-adapter/pgadapter:latest \
-p my_project -i my_instance -d my_database \
-c /acct_credentials.json -x
```

## Options / Props

### Execution environments

| Method | Description |
|---|---|
| Standalone | JAR file running in the JVM |
| Docker | Packaged Docker image |
| Cloud Run | Deployed as a sidecar proxy |
| Sidecar proxy | Typically in a Kubernetes cluster |
| In-process | Java application code uses the JAR to create and start a PGAdapter instance |

### Supported drivers, ORMs and tools

| Group | Supported |
|---|---|
| Command-line tools | `psql` (versions 11 through 14), JetBrains IDEs (such as DataGrip) |
| Java/JVM | JDBC (42.x and higher), R2DBC, Hibernate, Spring Data JPA |
| Go | `pgx` (4.15 and higher), `gorm` |
| Python | `psycopg2`, `psycopg3`, `SQLAlchemy`, Python ADBC |
| Node.js | `node-postgres`, `Knex.js`, `Sequelize.js`, `Prisma`, `Drizzle` |
| Other | `npgsql` (.NET), `PDO_PGSQL` (PHP) |

### Authorization

| Situation | Behavior |
|---|---|
| Credentials | The service account or IAM principal is determined from credentials given when starting the proxy; its IAM permissions determine allowed operations |
| Fine-grained access control | Specify a database role when starting PGAdapter; requires `spanner.databases.useRoleBasedAccess`; roles other than `public` also need `spanner.databaseRoles.use` (granting database roles to principals: [configure-fgac.md](./configure-fgac.md)) |
| No database role specified | The IAM principal's permissions apply |
| DDL statements | Principal needs `spanner.databases.updateDdl` |

### Standalone and Docker start options

| Option | Description |
|---|---|
| `-p project_id` | Required. ID of the project that the Spanner database is running in |
| `-i instance_id` | Required. Spanner instance ID |
| `-d database_ID` | Required. ID of the Spanner database to connect to |
| `-c credentials_file_path` | Optional. Full path of the service account JSON key file; if unset, credentials are read from `GOOGLE_APPLICATION_CREDENTIALS`; can be omitted after `gcloud auth application-default login` |
| `-s port` | Optional. Port PGAdapter listens on; defaults to 5432 |
| `-v version_number` | Optional. PostgreSQL version exposed to the client; default 14.1 |
| `-r databaseRole=database_role` | Optional. Database role for the session |
| `-x` | Enable connections from hosts other than localhost. Don't use in standalone mode; use only within a Docker container |

### GoogleSQL drivers and ORMs

Columns: database/sql (Go), GORM (Go), Spanner JDBC (Java), Hibernate (Java), Spring Data (Java), R2DBC\* (Java), ADO.NET (C#), Entity Framework (C#), Active Record (Ruby), SQLAlchemy (Python), Django (Python).

| Feature | database/sql | GORM | Spanner JDBC | Hibernate | Spring Data | R2DBC\* | ADO.NET | Entity Framework | Active Record | SQLAlchemy | Django |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Statement hints | Yes | Yes | Yes | Yes | Yes | Yes† | Yes | Yes | Yes | Yes | No |
| Mutations | Yes | Yes | Yes | No | Yes | No | Yes | Yes | Yes | No | No |
| Batch DML | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes | No | Yes | No |
| Batch DDL | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes |
| Stale reads | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| Interleaved tables | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| Partitioned DML | Yes | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes | No | No |
| Session labeling | Yes | No | No | No | Yes | No | No | Yes | No | No | No |
| Request priority | Yes | Yes | Yes | Yes | No | No | Yes | Yes | No | Yes | No |
| JSON type | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| Request tagging | Yes | No | Yes | No | No | No | Yes | Yes | No | Yes | No |
| GoogleSQL dialect | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| PostgreSQL dialect | Yes | No | Yes | No | No | No | Yes | No | No | No | No |

\* R2DBC column describes R2DBC when used specifically with Spring Data. † Available only when sending literal SQL queries, by using the Spring Data `@Query` annotation.

### PostgreSQL drivers (all require PGAdapter to be running)

The nine supported drivers are Spanner JDBC, PostgreSQL JDBC and R2DBC (Java), pgx (Go), psycopg2, psycopg3 and ADBC (Python), node-postgres (Node.js) and Npgsql (.NET). All of them support statement hints, mutations, batch DML, batch DDL, stale reads, interleaved tables, partitioned DML, request priority and request tagging; session labeling is supported only by Spanner JDBC.

### PostgreSQL ORMs

| Feature | Hibernate (Java) | Spring Data (Java) | GORM (Go) | SQLAlchemy 2 (Python) |
|---|---|---|---|---|
| Statement hints | Yes | Yes | Yes | Yes |
| Mutations | No | Yes | No | No |
| Batch DML | Yes | No | Yes | Yes |
| Batch DDL | Yes | Yes | Yes | Yes |
| Stale reads | Yes | Yes | Yes | Yes |
| Interleaved tables | Yes | Yes | Yes | Yes |
| Partitioned DML | Yes | Yes | Yes | Yes |
| Session labeling | No | Yes | No | No |
| Request priority | Yes | No | Yes | Yes |
| Request tagging | Yes | No | Yes | Yes |

### IDEs, SQL clients and other integrations (PostgreSQL dialect, via PGAdapter)

| Tool | Notes |
|---|---|
| IntelliJ / DataGrip | Requires PGAdapter |
| DBeaver | Requires PGAdapter |
| psql | Standard PostgreSQL command-line tool |
| postgres_fdw | Foreign Data Wrapper for PostgreSQL (C / extension) |
| connectorx | High-performance data loading library (Python / Rust) |
| Liquibase | Database schema change management (Java) |

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/pgadapter (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/drivers-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/pgadapter-start (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/spanner/docs/pgadapter-start. That page also shows the download command, Cloud Run sidecar YAML, Kubernetes and in-process Java examples. The snippet is verbatim; the source Docker example already publishes on `127.0.0.1`. The source also shows a standalone `java -jar pgadapter.jar` start; the options are in the start-options table above.
- The Docker image path uses `gcr.io` exactly as the source documents it. Not from the source: Container Registry is shut down and writing images to it has been unavailable since March 18, 2025 (https://docs.cloud.google.com/container-registry/docs/deprecations/container-registry-deprecation, as quoted on https://docs.cloud.google.com/appengine/docs/standard/quotas); the PGAdapter page still documents this path for pulling, so check the PGAdapter docs for the current image location.
- PGAdapter adds at most 0.2 ms of latency overhead; the PostgreSQL interface keeps the same latency as GoogleSQL. It supports basic and extended query modes and any data type the PostgreSQL interface supports.
- By default, as a security measure, PGAdapter accepts connections only from localhost. The Docker `-x` option is needed because the mapped container port does not appear to PGAdapter as localhost; publish the host port on `127.0.0.1` as the example does (the source requires `HOST-PORT` to be an available port on localhost).
- The example mounts a service-account key file; key files are long-lived credentials. Keep them out of shared directories such as `/tmp`, restrict file permissions, and prefer keyless credentials (ADC / an attached service account) where the runtime offers them. See `gcp-foundation`.
- Limitations per driver/ORM are linked from the official drivers page and not reproduced here.
- Spanner is Google Cloud's distributed relational database; PostgreSQL drivers talk to it through PGAdapter and the Spanner PostgreSQL interface, not to a PostgreSQL server. Distinct from `supabase` (Postgres), and the `drizzle` ORM skill covers client code only. For Node.js / Python client libraries, see `gcp-client-libraries`.

## Related

- [emulator.md](./emulator.md)
- [fgac-about.md](./fgac-about.md)
- [configure-fgac.md](./configure-fgac.md)
