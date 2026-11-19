---
source: https://docs.cloud.google.com/bigquery/docs/cloud-sql-federated-queries
---

# Cloud SQL federated queries

Federated queries let you query data in Cloud SQL for MySQL and Cloud SQL for PostgreSQL instances in real time from BigQuery, without copying or moving the data. To replicate data into BigQuery instead, you can use Cloud Data Fusion or Datastream.

## Signature / Usage

### Run a federated query

The example joins a Cloud SQL table `orders` (through `EXTERNAL_QUERY`) with the BigQuery table `mydataset.customers`. Replace `CONNECTION_ID` with the ID of your BigQuery connection.

```sql
SELECT c.customer_id, c.name, rq.first_order_date
FROM mydataset.customers AS c
LEFT OUTER JOIN EXTERNAL_QUERY(
  'us.CONNECTION_ID',
  '''SELECT customer_id, MIN(order_date) AS first_order_date
  FROM orders
  GROUP BY customer_id''') AS rq ON rq.customer_id = c.customer_id
GROUP BY c.customer_id, c.name, rq.first_order_date;
```

With the `bq` tool (use `--use_legacy_sql=false`):

```bash
bq query \
    --use_legacy_sql=false \
    'SELECT c.customer_id, c.name, rq.first_order_date
    FROM mydataset.customers AS c
    LEFT OUTER JOIN EXTERNAL_QUERY(
      "us.CONNECTION_ID",
      """SELECT customer_id, MIN(order_date) AS first_order_date
      FROM orders
      GROUP BY customer_id""") AS rq ON rq.customer_id = c.customer_id
    GROUP BY c.customer_id, c.name, rq.first_order_date;'
```

The query runs the external query in Cloud SQL, joins the result with the BigQuery customers table by `customer_id`, then selects customer information and first order date.

### View a Cloud SQL table schema

`INFORMATION_SCHEMA` queries work in both MySQL and PostgreSQL:

```sql
-- List all tables in a database.
SELECT * FROM EXTERNAL_QUERY("CONNECTION_ID",
"SELECT * FROM information_schema.tables;");
```

```sql
-- List all columns in a table.
SELECT * FROM EXTERNAL_QUERY("CONNECTION_ID",
"SELECT * FROM information_schema.columns WHERE table_name='x';");
```

### Track BigQuery federated queries

BigQuery annotates each federated query sent to Cloud SQL with this comment:

```sql
/* Federated query from BigQuery. Project ID: PROJECT_ID, BigQuery Job ID: JOB_ID. */
```

In Logs Explorer, find those queries with:

```text
resource.type="cloudsql_database"
textPayload=~"Federated query from BigQuery"
```

### Troubleshooting

Errors when the connection fails (MySQL, then PostgreSQL):

```text
Invalid table-valued function EXTERNAL_QUERY Failed to connect to MySQL database. Error: MysqlErrorCode(2013): Lost connection to MySQL server during query.
```

```text
Invalid table-valued function EXTERNAL_QUERY Connect to PostgreSQL server failed: server closed the connection unexpectedly This probably means the server terminated abnormally before or while processing the request.
```

Resolution: check the credentials and setup steps, grant the BigQuery Connection service agent the Cloud SQL Client role, and enable a private path for private-IP instances. The service agent email is:

```text
service-PROJECT_NUMBER@gcp-sa-bigqueryconnection.iam.gserviceaccount.com
```

Authentication plugin error (MySQL accounts that use `caching_sha2_password`):

```text
Invalid table-valued function EXTERNAL_QUERY Failed to connect to MySQL database. Error: MysqlErrorCode(2059): Authentication plugin 'caching_sha2_password' cannot be loaded: /usr/lib/plugin/caching_sha2_password.so: cannot open shared object file: No such file or directory at [1:15]
```

For MySQL 8.0 or earlier, run this on the Cloud SQL instance (`USERNAME` is the database user BigQuery uses; `PASSWORD` is its password):

```sql
ALTER USER 'USERNAME'@'%' IDENTIFIED WITH mysql_native_password BY 'PASSWORD';
```

## Options / Props

### Connection identifier formats (first argument of `EXTERNAL_QUERY`)

| Format | Pattern | Example |
|--------|---------|---------|
| Short | `[LOCATION.]CONNECTION_ID` | `'us.my-connection'` or `'my-connection'` |
| Fully qualified | `projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID` | |
| Friendly path | `PROJECT_ID.LOCATION.CONNECTION_ID` | `'my-project.us.my-connection'` |

### Required roles and prerequisites

| Item | Value |
|------|-------|
| Query a Cloud SQL instance | BigQuery Connection User (`roles/bigquery.connectionUser`) on the project |
| Connection | A BigQuery administrator has created and shared a Cloud SQL connection with you |
| Service agent | The BigQuery Connection service agent has Cloud SQL Client (`roles/cloudsql.client`) |
| Private IP instances | A private path was enabled when the instance was created |

### Connection properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Connection resource name: `projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID`. |
| `location` | string | Must either match the Cloud SQL instance location or be a multi-region of the corresponding jurisdiction (an instance in `us-east4` can use `US`; one in `europe-north1` can use `EU`). Only BigQuery queries running in this location can use the connection. |
| `friendlyName` | string | User-friendly display name. |
| `description` | string | Description of the connection. |
| `cloudSql.type` | string | `POSTGRES` or `MYSQL`. |
| `cloudSql.instanceId` | string | Cloud SQL instance name, usually `PROJECT_ID:LOCATION:INSTANCE_ID`. |
| `cloudSql.database` | string | The Cloud SQL database to connect to. |
| `cloudSql.serviceAccountId` | string | The service account configured to access the Cloud SQL database. |

### Instance credential properties

| Property | Type | Description |
|----------|------|-------------|
| `username` | string | Database username. |
| `password` | string | Database password. |

### Limitations

| Limitation |
|------------|
| Read-only: external queries must be `SELECT` statements; DDL and DML are not supported. |
| Not as fast as querying BigQuery storage. |
| The BigQuery query processing location must match or be compatible with the Cloud SQL instance location. |
| A data type not supported by BigQuery makes the query fail; cast it inside the external query. |
| A federated query can reference at most 10 unique connections. |
| The MySQL `caching_sha2_password` plugin is not supported. |

## Notes

- Best practices: apply `WHERE` filters and `GROUP BY` aggregations inside the `EXTERNAL_QUERY` statement; select only needed columns rather than `SELECT *`; use a Cloud SQL read replica (configure the connection to query the replica) to isolate analytical load; colocate the dataset and connection with the instance or in the matching `US` / `EU` multi-region.
- In a shared view across multiple projects, always use the fully qualified connection identifier to avoid connecting to the wrong project.
- MySQL 8.4: the `mysql_native_password` plugin is deprecated; downgrading an existing 8.4 database to 8.0 for production is not recommended. Upgrading an instance to 8.4 does not affect existing connections if you don't change the user's authentication plugin before upgrading; only users created with `mysql_native_password` work for federated queries, so use an account created before upgrading.
- The `ALTER USER` statement changes the authentication plugin of a real database account; try it on a disposable instance or account first. Replace the `PASSWORD` placeholder with your own secret and keep it out of version control.
- The source also shows Console and Cloud Shell click-paths; they are omitted.
- Cloud SQL itself is covered by `gcp-databases-relational`; this page covers only the BigQuery side.
- Source: https://docs.cloud.google.com/bigquery/docs/cloud-sql-federated-queries (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [federated-queries-intro.md](./federated-queries-intro.md)
- [connections-api-intro.md](./connections-api-intro.md)
