---
source: https://docs.cloud.google.com/sql/docs/postgres/connect-connectors
---

# Connect using Cloud SQL Language Connectors

The Cloud SQL connectors (Java, Python, Go, Node.js) are libraries that provide encryption and IAM-based authorization when connecting to a Cloud SQL instance, including support for automatic IAM database authentication. They can't provide a network path to an instance if one is not already present.

## Signature / Usage

### Install

```bash
pip install "cloud-sql-python-connector[pg8000]"
```

```bash
npm install @google-cloud/cloud-sql-connector
```

### Authenticate (Application Default Credentials)

The Java and Python connectors use Application Default Credentials. To activate credentials locally:

```bash
gcloud auth application-default login
```

### Python (pg8000 + SQLAlchemy)

```python
import os

from google.cloud.sql.connector import Connector, IPTypes
import pg8000

import sqlalchemy


def connect_with_connector() -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of Postgres.

    Uses the Cloud SQL Python Connector package.
    """
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.

    instance_connection_name = os.environ[
        "INSTANCE_CONNECTION_NAME"
    ]  # e.g. 'project:region:instance'
    db_user = os.environ["DB_USER"]  # e.g. 'my-db-user'
    db_pass = os.environ["DB_PASS"]  # e.g. 'my-db-password'
    db_name = os.environ["DB_NAME"]  # e.g. 'my-database'

    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    # initialize Cloud SQL Python Connector object
    connector = Connector(refresh_strategy="LAZY")

    def getconn() -> pg8000.dbapi.Connection:
        conn: pg8000.dbapi.Connection = connector.connect(
            instance_connection_name,
            "pg8000",
            user=db_user,
            password=db_pass,
            db=db_name,
            ip_type=ip_type,
        )
        return conn

    # The Cloud SQL Python Connector can be used with SQLAlchemy
    # using the 'creator' argument to 'create_engine'
    pool = sqlalchemy.create_engine(
        "postgresql+pg8000://",
        creator=getconn,
        # ...
    )
    return pool
```

### Node.js (Knex + pg)

```javascript
const Knex = require('knex');
const {Connector} = require('@google-cloud/cloud-sql-connector');

// In case the PRIVATE_IP environment variable is defined then we set
// the ipType=PRIVATE for the new connector instance, otherwise defaults
// to public ip type.
const getIpType = () =>
  process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true'
    ? 'PRIVATE'
    : 'PUBLIC';

// connectWithConnector initializes connection pool for a Cloud SQL instance
// of Postgres using the Cloud SQL Node.js Connector.
const connectWithConnector = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: getIpType(),
  });
  const dbConfig = {
    client: 'pg',
    connection: {
      ...clientOpts,
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
    },
    // ... Specify additional properties here.
    ...config,
  };
  // Establish a connection to the database.
  return Knex(dbConfig);
};
```

### Enforce connector use

Replace `INSTANCE_NAME` with the name of your Cloud SQL instance.

```bash
gcloud sql instances patch INSTANCE_NAME \
--connector-enforcement=REQUIRED
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `INSTANCE_CONNECTION_NAME` | env var | Instance connection name, e.g. `project:region:instance` |
| `PRIVATE_IP` | env var | Python: any non-empty value selects `IPTypes.PRIVATE`. Node.js: `1` or `true` selects `'PRIVATE'`. Otherwise public IP |
| `refresh_strategy="LAZY"` | Python `Connector` arg | Refresh when needed instead of on a schedule; the source's samples use it (Java/Go: `cloudSqlRefreshStrategy=lazy` / `WithLazyRefresh()`) and recommend it for serverless to avoid background refreshes throttling CPU |
| `connectorEnforcement` | Admin API setting | `REQUIRED` (gcloud: `--connector-enforcement=REQUIRED`) rejects direct database connections: all connections must use the Auth Proxy or the Java, Python, Go and Node.js connectors |

## Notes

- With a shared CA (`GOOGLE_MANAGED_CAS_CA`), the Python Connector does not verify server identity (see [language-connectors.md](./language-connectors.md)); and Python is not listed for a customer-managed CA (`CUSTOMER_MANAGED_CAS_CA`). Use it with instances on the per-instance CA, and the Auth Proxy or the Java / Go / Node.js connector at the listed minimum versions for shared- or customer-managed-CA instances.
- Prerequisites: Cloud SQL Admin API enabled (needs `serviceusage.services.enable`, e.g. via Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`); an instance with a configured default user; the roles needed to connect (see [roles-and-permissions.md](./roles-and-permissions.md)). If the IAM principal belongs to a different project than the instance, enable the Admin API in both projects and add the IAM permissions in the instance's project.
- The Python connector's supported PostgreSQL drivers are pg8000 and asyncpg. The source also shows the asyncpg install (`pip install "cloud-sql-python-connector[asyncpg]"`) and the Go install (`go get cloud.google.com/go/cloudsqlconn`); those blocks are omitted here. Connector-based connections need an existing network path: to use private IP, the application must already have VPC access.
- The Python and Node.js samples default to public IP when `PRIVATE_IP` is unset. Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them (see [iam-logins.md](./iam-logins.md) and, for Python, [connectors-iam-python.md](./connectors-iam-python.md) for passwordless IAM database authentication).
- Passwords in env vars are convenient but not secure per the source samples; use Secret Manager ([use-secret-manager.md](./use-secret-manager.md)).
- With `connectorEnforcement=REQUIRED` on a Private Service Connect-enabled instance you can't create read replicas (and can't enable enforcement if replicas exist). Changing the setting is an instance update that rejects existing direct connections; try on a disposable instance first.
- Source inconsistency: the connector-enforcement restriction on read replicas is scoped three ways. This page: Private Service Connect-enabled instances with connector enforcement. https://docs.cloud.google.com/sql/docs/postgres/replication: any instance with connector enforcement, unless private service access is configured. https://docs.cloud.google.com/sql/docs/postgres/replication/create-replica: a primary with private IP that accepts Language Connector connections only.
- Source inconsistency: the roles link in "Before you begin" points to the MySQL roles-and-permissions page.
- Leading indentation and trailing blank lines from the rendered twin were normalized in code blocks. The source also shows Java (JDBC/R2DBC, HikariCP) and Go samples, IntelliJ setup, and REST/PowerShell forms of the enforcement call; these are omitted.
- Troubleshooting: use the latest connector and driver versions; connectors authorize connections but add no network path. See the Cloud SQL troubleshooting and "Debug connection issues" pages.
- Cloud SQL is managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`. ADC and client-library patterns: `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-connectors (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [language-connectors.md](./language-connectors.md)
- [iam-logins.md](./iam-logins.md)
- [roles-and-permissions.md](./roles-and-permissions.md)
- [use-secret-manager.md](./use-secret-manager.md)
