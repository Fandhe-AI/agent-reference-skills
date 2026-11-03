---
source: https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/aws-rds-aurora/
---

# Connect to MySQL database providers

Provider-specific steps to allow Hyperdrive access to AWS RDS/Aurora, Azure, Google Cloud SQL, and PlanetScale MySQL databases.

## Signature / Usage

Create the configuration (all providers):

```sh
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

AWS RDS / Aurora: create a less privileged user.

```sh
# Log in to the database
mysql -h ENDPOINT_NAME -P PORT -u MASTER_USERNAME -p database_name
```

Adapted (not in the official docs): `GRANT ALL PRIVILEGES` is narrowed to DML on the one database (least privilege); see Notes.

```sql
-- Create a role for Hyperdrive
CREATE ROLE hyperdrive;

-- Allow Hyperdrive to connect
GRANT USAGE ON mysql_db.* TO hyperdrive;

-- Grant database privileges to the hyperdrive role
GRANT SELECT, INSERT, UPDATE, DELETE ON mysql_db.* TO hyperdrive;

-- Create a specific user for Hyperdrive to log in as
CREATE USER 'hyperdrive_user'@'%' IDENTIFIED WITH caching_sha2_password BY 'sufficientlyRandomPassword';

-- Grant this new user the hyperdrive role privileges
GRANT hyperdrive to 'hyperdrive_user'@'%';
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

Binding printed by the create command:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "hyperdrive-example",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Pasted from the output of `wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string=[...]` above.
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<ID OF THE CREATED HYPERDRIVE CONFIGURATION>"
		}
	]
}
```

## Options / Props

| Provider | Where to get credentials / network settings | Notes |
|----------|---------------------------------------------|-------|
| AWS RDS and Aurora | AWS console: set **Public access** to **Yes**; use a VPC security group allowing `<CLOUDFLARE_IP_RANGES>` (from https://www.cloudflare.com/ips/) on port `3306`; Aurora: note the **Writer** endpoint and port (Databases > Endpoints); RDS MySQL: **Connectivity & security** > Endpoint and Port (like `YOUR_DATABASE_NAME.cpuo5rlli58m.AWS_REGION.rds.amazonaws.com`, default `3306`) | Create a less privileged user (SQL above) rather than the Master username |
| Azure Database for MySQL | Azure Portal: Settings > Networking > ensure **Public access** enabled > Firewall rules: one rule per range in `<CLOUDFLARE_IP_RANGES>` (from https://www.cloudflare.com/ips/), converted to start/end IPs; Overview > **Server name**; default database `mysql` | Private instances: use Tunnel |
| Google Cloud SQL (MySQL) | Cloud Console: Connections > Networking > ensure **Public IP** enabled > **Add a Network** for each range in `<CLOUDFLARE_IP_RANGES>` (from https://www.cloudflare.com/ips/); Overview > **Public IP address**; Users > Add User Account > Built-in authentication > Generate password; default database `mysql` | |
| PlanetScale MySQL | PlanetScale dashboard: **Connect** > create password (for example `hyperdrive-user`) > **Other** > note host, database, username, password (shown once) | Use a Placement Hint (above) to run the Worker near the PlanetScale region |

## Notes

- To let Hyperdrive reach a database, allow Cloudflare IPs: either all Cloudflare ranges or restrict the ACL to the IP ranges used by Hyperdrive (do not open the database to all addresses; see the Adapted note below); or connect over a private network with Cloudflare Tunnel.
- Adapted from the official docs: the official AWS RDS/Aurora, Azure and Google Cloud SQL steps open the database to `0.0.0.0/0` (or `0.0.0.0`-`255.255.255.255`). This page uses the placeholder `<CLOUDFLARE_IP_RANGES>` instead: copy the current ranges from https://www.cloudflare.com/ips/ (ranges are not reproduced here). The preferred option for private databases is a private connection (see [connect-private-database-tunnel](./connect-private-database-tunnel.md) or [connect-private-database-vpc](./connect-private-database-vpc.md)), which needs no public exposure.
- Connection string format: `mysql://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name`. Hyperdrive verifies connectivity on creation.
- MySQL 8 roles granted with `GRANT hyperdrive TO ...` are not active by default; if Hyperdrive's creation test query is rejected for lack of privileges (error `2016`), activate the role for the login user (for example `SET DEFAULT ROLE hyperdrive TO 'hyperdrive_user'@'%';`) or grant the privileges to the user directly. The official AWS RDS/Aurora steps do not include this command.
- Adapted from the official docs: the official step grants `ALL PRIVILEGES ON mysql_db.*`; this page grants only `SELECT, INSERT, UPDATE, DELETE` on that database (least privilege). Add further privileges (for example `CREATE` for migrations) only if your workload needs them.
- Worker code is the same for every provider (mysql2 with `disableEval: true`; see [connect-mysql-drivers](./connect-mysql-drivers.md)).
- Consolidated from: https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/azure/, https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/google-cloud-sql/, https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/planetscale/
- PlanetScale-hosted databases billed via Cloudflare: see [planetscale](./planetscale.md). Placement configuration: see the cloudflare-workers skill.

## Related

- [Connect to MySQL (drivers)](./connect-mysql-drivers.md)
- [Connect to PostgreSQL providers](./connect-postgres-providers.md)
- [Firewall and networking configuration](./firewall-and-networking.md)
- [PlanetScale Postgres & MySQL](./planetscale.md)
