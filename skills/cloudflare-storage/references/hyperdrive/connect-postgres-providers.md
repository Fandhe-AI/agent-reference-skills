---
source: https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/neon/
---

# Connect to PostgreSQL database providers

Provider-specific steps to obtain credentials and network access for 16 Postgres and Postgres-compatible providers.

## Signature / Usage

Create the configuration (all providers except where noted):

```sh
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

Connection string format: `postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name`

AWS RDS / Aurora: create a less privileged user.

```sh
# Log in to the database
psql postgresql://MASTER_USERNAME:MASTER_PASSWORD@ENDPOINT_NAME:PORT/database_name
```

Adapted (not in the official docs): `GRANT ALL PRIVILEGES ON DATABASE` is replaced with schema, table and sequence grants, because database-level privileges do not grant table access; see Notes.

```sql
-- Create a role for Hyperdrive
CREATE ROLE hyperdrive;

-- Allow Hyperdrive to connect
GRANT CONNECT ON DATABASE postgres TO hyperdrive;

-- Grant table-level privileges (run while connected to the target database)
GRANT USAGE ON SCHEMA public TO hyperdrive;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO hyperdrive;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO hyperdrive;

-- Cover tables/sequences created later by the role that owns them
-- (replace <owner_role> with the role that creates your tables)
ALTER DEFAULT PRIVILEGES FOR ROLE <owner_role> IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO hyperdrive;
ALTER DEFAULT PRIVILEGES FOR ROLE <owner_role> IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO hyperdrive;

-- Create a specific user for Hyperdrive to log in as
CREATE ROLE hyperdrive_user LOGIN PASSWORD 'sufficientlyRandomPassword';

-- Grant this new user the hyperdrive role privileges
GRANT hyperdrive to hyperdrive_user;
```

Supabase user:

```sql
CREATE ROLE hyperdrive_user LOGIN PASSWORD 'sufficientlyRandomPassword';

-- Here, you are granting it the postgres role. In practice, you want to create a role with lesser privileges.
GRANT postgres to hyperdrive_user;
```

Google Cloud SQL (gcloud CLI):

```sh
gcloud sql users create hyperdrive-user --instance=YOUR_INSTANCE_NAME --password=SUFFICIENTLY_LONG_PASSWORD
```

```sh
# If you have any existing authorized networks, ensure you provide those as a comma separated list.
# The gcloud CLI will replace any existing authorized networks with the list you provide here.
gcloud sql instances patch YOUR_INSTANCE_NAME --authorized-networks="0.0.0.0/0"
```

Fly:

```txt
fly ips allocate-v6 --app <pg-app-name>
```

```txt
fly config save --app <pg-app-name>
```

```toml
[[services]]
	internal_port = 5432 # Postgres instance
	protocol = "tcp"

[[services.ports]]
	handlers = ["pg_tls"]
	port = 5432
```

ClickHouse Managed Postgres (verified TLS, caching off):

```sh
npx wrangler cert upload certificate-authority --ca-cert postgres-ca.pem --name clickhouse-postgres-ca
npx wrangler hyperdrive create clickhouse-postgres --origin-host '<HOSTNAME>' --origin-port '<PORT>' --database '<DATABASE_NAME>' --origin-scheme postgres --origin-user '<USERNAME>' --origin-password '<PASSWORD>' --ca-certificate-id '<CA_CERTIFICATE_ID>' --sslmode verify-full --caching-disabled
```

Prisma Postgres connection limit:

```bash
npx wrangler hyperdrive update <HYPERDRIVE_ID> --origin-connection-limit=10
```

PlanetScale placement hint:

```jsonc
{
	"placement": {
		// Match to your PlanetScale region, for example "gcp:us-east4" or "aws:us-east-1"
		"region": "gcp:us-east4",
	},
}
```

## Options / Props

| Provider | Credentials / network steps | Notes |
|----------|-----------------------------|-------|
| AWS RDS and Aurora | AWS console: **Public access** = **Yes**; VPC security group allowing `0.0.0.0/0` to port `5432`; Aurora: **Endpoints** > Endpoint name of type `Writer` + Port; RDS: **Connectivity & security** > Endpoint + Port (default `5432`) | Create a less privileged user (SQL above) |
| Azure Database for PostgreSQL | Settings > Networking > ensure **Public access** > Firewall rules `0.0.0.0` to `255.255.255.255`; Overview > **Server name**; default database `postgres` | Private: use Tunnel |
| ClickHouse Managed Postgres | ClickHouse Cloud console: **Connect** > **Directly**; copy host, port, database, user, password; download CA (`postgres-ca.pem`) from **Settings** | Requires Wrangler 4.9.0+; use `verify-full` with the instance CA; example disables caching |
| CockroachDB | CockroachDB Cloud console: **SQL Users** > **Add User** > **Generate & Save Password**; **Connect** > choose user + database (for example `defaultdb`) > **General connection string** | Cloud allows `0.0.0.0/0` by default |
| Digital Ocean | Dashboard: database **Overview** > **Connection Details** > **Public network** > **Connection string** > show-password | |
| Fly | Allocate public IPv6 (IPv4 if your ISP lacks IPv6), configure external service in `fly.toml` (above), deploy; connection string form `postgres://{username}:{password}@{public-hostname}:{port}/{database}?options` | |
| Google Cloud SQL | Console: Connections > Networking > **Public IP** > **Add a Network** `0.0.0.0/0`; Overview > **Public IP address**; Users > Add User Account > Built-in authentication | Or use gcloud commands above |
| Materialize | Console: **App Passwords** > **Manage app passwords** > **New app password** (shown once); **Connect** > **External tools** > Host, Port, Database | Postgres-compatible streaming database |
| Neon | Dashboard: **Roles** > **New Role** (for example `hyperdrive-user`, copy password); Connection Details: select branch, database, role; choose `psql` and **uncheck connection pooling** | Use pg or Postgres.js, not the Neon serverless driver |
| Nile | Console: database > **Settings** > **Connection** > Postgres logo > **Generate credentials** > copy connection string (without `psql`), like `postgres://0191c898-...:4d7d8b45-...@eu-central-1.db.thenile.dev:5432/my_database` | Multi-tenant Postgres |
| pgEdge Cloud | Dashboard: **Connect to your database** > **Connection String** (starting with `postgres://app@...`) | |
| PlanetScale (Postgres) | Dashboard: **Connect** > create role (recommended) with `pg_read_all_data` and `pg_write_all_data`; note user, password, host, database (default `postgres`) | Use a Placement Hint; use pg or Postgres.js, not the PlanetScale serverless driver |
| Prisma Postgres | Prisma Data Platform Console: **Connect to your database** > **Any client** > **Generate database credentials**; add database name after the port and remove query params such as `?sslmode=require` | Use pg or Postgres.js, not Prisma Accelerate; set Hyperdrive connection limit below the Prisma limit |
| Supabase | Use the Postgres user from project creation or the role SQL above; endpoint on the database settings page | Use **Direct connection**, not pooled strings |
| Timescale | Console: service > **Connection info** > copy **Service URL** (for example `postgres://tsdbadmin:YOUR_PASSWORD_HERE@pn79dztyy0.xzhhbfensb.tsdb.cloud.timescale.com:31358/tsdb`); reset the SCRAM password via **Forgot your password?** if needed | Built on PostgreSQL |
| Xata | Dashboard: database > copy the `PostgreSQL` connection string | |

## Notes

- To let Hyperdrive reach a database, allow Cloudflare IPs (all ranges or the Hyperdrive ranges) or use Cloudflare Tunnel for private databases. Hyperdrive verifies connectivity on creation.
- Pages for Neon, Supabase, PlanetScale and Prisma Postgres warn: use a driver such as node-postgres (pg) or Postgres.js to connect directly to the underlying database instead of the vendor serverless driver / client (Neon serverless driver, Supabase JavaScript client, PlanetScale serverless driver, Prisma Accelerate). Hyperdrive performs global pooling and fast query routing by connecting directly.
- Prisma Postgres: two limits apply: the provider's direct connection limit and Hyperdrive's origin connection limit (soft); set Hyperdrive's lower than the provider's. Dashboard: Hyperdrive > Settings > **Origin connection limit** > **Edit Settings**. Verify with `npx wrangler hyperdrive get <HYPERDRIVE_ID>`. `npx create-db@latest` creates a temporary Prisma Postgres database.
- Supabase platform features: see the supabase skill.
- Worker code for each provider is the same node-postgres example as in [connect-postgres-drivers](./connect-postgres-drivers.md).
- Some pages configure through the dashboard: Hyperdrive > **Create Configuration** > fill the form including connection string > **Create**.
- Consolidated from (under https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/): aws-rds-aurora, azure, clickhouse-managed-postgres, cockroachdb, digital-ocean, fly, google-cloud-sql, materialize, neon (representative), nile, pgedge, planetscale-postgres, prisma-postgres, supabase, timescale, xata.
- Adapted from the official docs: the official AWS RDS/Aurora step runs `GRANT ALL PRIVILEGES ON DATABASE postgres`, which only covers database-level privileges (CREATE, CONNECT, TEMP) and gives no access to existing tables, so queries fail with `permission denied`. The role instead gets `USAGE` on the schema plus DML on tables and sequence privileges; `ALTER DEFAULT PRIVILEGES` (per owner role) covers objects created later. Drop the DML grants you do not need for a read-only workload.
- Wrangler `cert` commands: see the cloudflare-wrangler skill.

## Related

- [Connect to PostgreSQL (drivers)](./connect-postgres-drivers.md)
- [Connect to MySQL providers](./connect-mysql-providers.md)
- [TLS/SSL certificates](./tls-ssl-certificates.md)
- [PlanetScale Postgres & MySQL](./planetscale.md)
- [Supported databases and features](./supported-databases-and-features.md)
