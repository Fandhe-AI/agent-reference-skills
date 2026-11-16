---
source: https://docs.cloud.google.com/sql/docs/postgres/iam-logins
---

# Automatic IAM database authentication with the Cloud SQL Python Connector

The Cloud SQL Python Connector logs in to Cloud SQL for PostgreSQL with automatic IAM database authentication when `enable_iam_auth=True` is passed to `connector.connect(...)`: no database password is used, and the IAM account that runs the connector must be the same account that authenticates to the database. This page holds the full Python (pg8000 + SQLAlchemy) sample from "Log in with IAM database authentication"; the Node.js equivalent (`authType: 'IAM'`) is in [iam-logins.md](./iam-logins.md).

## Signature / Usage

### Install

The supported PostgreSQL drivers are pg8000 and asyncpg:

```bash
pip install "cloud-sql-python-connector[pg8000]"
```

```bash
pip install "cloud-sql-python-connector[asyncpg]"
```

### Authenticate (Application Default Credentials)

```bash
gcloud auth application-default login
```

### Connect with automatic IAM database authentication

```python
import os

from google.cloud.sql.connector import Connector, IPTypes
import pg8000

import sqlalchemy


def connect_with_connector_auto_iam_authn() -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of Postgres.

    Uses the Cloud SQL Python Connector with Automatic IAM Database Authentication.
    """
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.
    instance_connection_name = os.environ[
        "INSTANCE_CONNECTION_NAME"
    ]  # e.g. 'project:region:instance'
    db_iam_user = os.environ["DB_IAM_USER"]  # e.g. 'sa-name@project-id.iam'
    db_name = os.environ["DB_NAME"]  # e.g. 'my-database'

    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    # initialize Cloud SQL Python Connector object
    connector = Connector(refresh_strategy="LAZY")

    def getconn() -> pg8000.dbapi.Connection:
        conn: pg8000.dbapi.Connection = connector.connect(
            instance_connection_name,
            "pg8000",
            user=db_iam_user,
            db=db_name,
            enable_iam_auth=True,
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

## Options / Props

| Name | Type | Description |
|---|---|---|
| `enable_iam_auth=True` | `connector.connect` arg | Use automatic IAM database authentication; no `password=` is passed |
| `DB_IAM_USER` | env var | IAM database user: full email for a user; for a service account the email without `.gserviceaccount.com`, e.g. `sa-name@project-id.iam` |
| `INSTANCE_CONNECTION_NAME` | env var | Instance connection name, e.g. `project:region:instance` |
| `DB_NAME` | env var | Database name |
| `PRIVATE_IP` | env var | Any non-empty value selects `IPTypes.PRIVATE`; otherwise public IP |
| `refresh_strategy="LAZY"` | `Connector` arg | Refresh certificates when needed instead of on a schedule (recommended for serverless) |
| `roles/cloudsql.instanceUser` | IAM role | Contains `cloudsql.instances.login`; required for IAM database authentication login |
| Egress ports | Network | Allow outgoing TCP to `443` (`sqladmin.googleapis.com`, no fixed IP) and `3307` (instance IP) |

## Notes

- Prerequisites (iam-logins): the instance is configured for IAM database authentication, and the IAM user, service account or group is added to the database. A new IAM database user has no database privileges by default; assign database roles when adding or updating the account, or use `GRANT`. With group authentication, Cloud SQL creates the account on the member's first login.
- The connector uses Application Default Credentials; the ADC login command above is for local development. For a service account, iam-logins shows impersonation with `gcloud auth application-default login --impersonate-service-account SERVICE_ACCOUNT_EMAIL_ADDRESS` (see [iam-logins.md](./iam-logins.md)). ADC in general: `gcp-foundation`; client-library patterns: `gcp-client-libraries`.
- The sample defaults to public IP when `PRIVATE_IP` is unset. Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them. Connectors add no network path: private IP needs existing VPC access.
- The source's install commands name only the connector and driver; the sample also imports `sqlalchemy`. The password-based sample lives on the connect-connectors page. The password-based Python sample is in [connect-connectors.md](./connect-connectors.md).
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/connect-connectors (both `pip install` blocks and the ADC block).
- Leading indentation and trailing blank lines from the rendered twin were normalized in code blocks. The source also links an interactive Colab notebook for the Python connector and shows Go and Java samples; omitted.
- Cloud SQL is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/iam-logins (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/connect-connectors (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [iam-logins.md](./iam-logins.md)
- [connect-connectors.md](./connect-connectors.md)
- [iam-authentication.md](./iam-authentication.md)
- [roles-and-permissions.md](./roles-and-permissions.md)
