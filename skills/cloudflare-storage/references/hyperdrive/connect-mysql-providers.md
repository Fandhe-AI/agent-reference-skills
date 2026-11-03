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

```sql
-- Create a role for Hyperdrive
CREATE ROLE hyperdrive;

-- Allow Hyperdrive to connect
GRANT USAGE ON mysql_db.* TO hyperdrive;

-- Grant database privileges to the hyperdrive role
GRANT ALL PRIVILEGES ON mysql_db.* to hyperdrive;

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
| AWS RDS and Aurora | AWS console: set **Public access** to **Yes**; use a VPC security group allowing `0.0.0.0/0` on port `3306`; Aurora: note the **Writer** endpoint and port (Databases > Endpoints); RDS MySQL: **Connectivity & security** > Endpoint and Port (like `YOUR_DATABASE_NAME.cpuo5rlli58m.AWS_REGION.rds.amazonaws.com`, default `3306`) | Create a less privileged user (SQL above) rather than the Master username |
| Azure Database for MySQL | Azure Portal: Settings > Networking > ensure **Public access** enabled > Firewall rules start IP `0.0.0.0`, end IP `255.255.255.255`; Overview > **Server name**; default database `mysql` | Private instances: use Tunnel |
| Google Cloud SQL (MySQL) | Cloud Console: Connections > Networking > ensure **Public IP** enabled > **Add a Network** `0.0.0.0/0`; Overview > **Public IP address**; Users > Add User Account > Built-in authentication > Generate password; default database `mysql` | |
| PlanetScale MySQL | PlanetScale dashboard: **Connect** > create password (for example `hyperdrive-user`) > **Other** > note host, database, username, password (shown once) | Use a Placement Hint (above) to run the Worker near the PlanetScale region |

## Notes

- To let Hyperdrive reach a database, allow Cloudflare IPs: either all ranges (0.0.0.0 - 255.255.255.255) or restrict the ACL to the IP ranges used by Hyperdrive; or connect over a private network with Cloudflare Tunnel.
- Connection string format: `mysql://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name`. Hyperdrive verifies connectivity on creation.
- Worker code is the same for every provider (mysql2 with `disableEval: true`; see [connect-mysql-drivers](./connect-mysql-drivers.md)).
- Consolidated from: .../connect-to-mysql/mysql-database-providers/azure/ , .../google-cloud-sql/ , .../planetscale/
- PlanetScale-hosted databases billed via Cloudflare: see [planetscale](./planetscale.md). Placement configuration: see the cloudflare-workers skill.

## Related

- [Connect to MySQL (drivers)](./connect-mysql-drivers.md)
- [Connect to PostgreSQL providers](./connect-postgres-providers.md)
- [Firewall and networking configuration](./firewall-and-networking.md)
- [PlanetScale Postgres & MySQL](./planetscale.md)
