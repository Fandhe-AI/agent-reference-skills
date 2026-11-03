---
source: https://developers.cloudflare.com/workers/wrangler/commands/hyperdrive/
---

# Hyperdrive

Copy-paste `wrangler hyperdrive ...` commands for creating, inspecting, updating, and deleting Hyperdrive configurations, plus local development. For the full flag tables see https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/. Installing Wrangler, logging in, `dev`, and `deploy` belong to the cloudflare-wrangler skill.

## Create a Hyperdrive configuration (PostgreSQL)

```sh
npx wrangler hyperdrive create <YOUR_CONFIG_NAME> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

Hyperdrive verifies the credentials by connecting to the database before creating the configuration. The command prints a `hyperdrive` snippet with the binding and `id`; add it to your Wrangler configuration file.

> **Warning**: The connection string contains a database password and ends up in shell history. Prefer a method that avoids recording secrets, and never commit the string.

## Create a Hyperdrive configuration (MySQL)

```sh
npx wrangler hyperdrive create <YOUR_CONFIG_NAME> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

## Control query caching at creation

By default Hyperdrive caches eligible read query results. Disable caching, or set the maximum cache age in seconds (default 60):

```sh
npx wrangler hyperdrive create <YOUR_CONFIG_NAME> --connection-string="<CONNECTION_STRING>" --caching-disabled
npx wrangler hyperdrive create <YOUR_CONFIG_NAME> --connection-string="<CONNECTION_STRING>" --max-age=<SECONDS>
```

`--caching-disabled` cannot be combined with `--max-age` or `--swr`. Hyperdrive does not invalidate cached reads when you write; for read-after-write consistency use a separate cache-disabled configuration for those reads.

## List and inspect configurations

```sh
npx wrangler hyperdrive list
npx wrangler hyperdrive get <ID>
```

## Update the connection pool limit

```sh
npx wrangler hyperdrive update <HYPERDRIVE_ID> --origin-connection-limit=<MAX_CONNECTIONS>
```

`--origin-connection-limit` is the (soft) maximum number of connections Hyperdrive may open to the origin database.

## Rotate origin credentials

```sh
# wrangler v3.11 and above required
npx wrangler hyperdrive update <HYPERDRIVE_CONFIG_ID> --origin-host <YOUR_ORIGIN_HOST> --origin-password <YOUR_ORIGIN_PASSWORD> --origin-user <YOUR_ORIGIN_USERNAME> --database <YOUR_DATABASE> --origin-port <YOUR_ORIGIN_PORT>
```

> **Warning**: `--origin-password` passed inline is recorded in shell history. Prefer a method that avoids recording secrets.

Alternatively, create a new configuration and point the Worker's binding at its `id`:

```sh
# wrangler v3.11 and above required
npx wrangler hyperdrive create my-updated-hyperdrive --connection-string="<YOUR_CONNECTION_STRING>"
```

See https://developers.cloudflare.com/hyperdrive/configuration/rotate-credentials/.

## Local development with a local database

Provide the local connection string through an environment variable named `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>`. This keeps credentials out of source control.

```sh
# Your configured Hyperdrive binding is "HYPERDRIVE"
export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgres://user:password@your-database-host:5432/database"
npx wrangler dev
```

See https://developers.cloudflare.com/hyperdrive/configuration/local-development/.

## Remote development session

```sh
npx wrangler dev --remote
```

## Delete a configuration

> **Warning**: Deleting a configuration breaks every Worker whose binding references that `id`. Confirm the `id` against your Wrangler configuration files first.

```sh
npx wrangler hyperdrive delete <ID>
```
