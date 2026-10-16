# CLI

Better Auth includes a built-in CLI (`auth`) for managing and checking the database schema, creating initial admin users, initializing projects, upgrading packages, generating secret keys, and collecting diagnostic information about the auth setup.

## Signature / Usage

```bash
npx auth@latest generate
npx auth@latest migrate
npx auth@latest check
npx auth@latest check schema
npx auth@latest create-admin --email admin@example.com --name "Admin" --role admin
npx auth@latest init
npx auth@latest upgrade
npx auth@latest info
npx auth@latest secret
```

### generate command

Creates the schema required by Better Auth. With a database adapter like Prisma or Drizzle it generates the right schema for your ORM; with the built-in Kysely adapter it generates an SQL file. The default output depends on the ORM (Prisma: `prisma/schema.prisma`, Drizzle: `schema.ts`, Kysely: `schema.sql`).

#### Generate Without a Database Connection

Prisma and Drizzle can generate a schema without using the configured database adapter (the CLI still loads your config to include plugins and schema customizations):

```bash
npx auth@latest generate --adapter prisma --dialect postgresql
```

If `--adapter` is omitted, the adapter configured in your config file is used. Passing `--dialect` alone has no effect. Kysely introspects the configured database, so `--dialect` has no effect with `--adapter kysely`.

### migrate command

Applies the schema to the database (built-in Kysely adapter only). For other adapters, apply the schema with your ORM's migration tool. With PostgreSQL set `database.schemaName` to select a non-default schema explicitly; otherwise the connection's `search_path` is used.

### check command

`check` runs all available checks, manually or in automation:

```bash
npx auth@latest check --config ./src/auth.ts
```

`check schema` verifies that your configured schema can hold what Better Auth writes (it does not create schema files or apply migrations). It reads the live database for Kysely, the configured schema object for Drizzle, and the generated client model for Prisma; Drizzle and Prisma checks do not confirm that migrations were applied. If validation is unavailable for your adapter the command fails instead of silently skipping. It also runs when `advanced.database.validateSchema` is `false`.

```bash
npx auth@latest check schema --config ./src/auth.ts
```

### create-admin command

Creates an initial admin user through your configured Better Auth instance. Requires the Admin plugin and a persistent database; uses the same server-side `auth.api.createUser` path as the Admin plugin, so passwords are hashed and database hooks still run. If users already exist, it asks for confirmation (`--force` or `--yes` skips).

### init command

Initializes Better Auth in your project.

### upgrade command

Updates older `better-auth` dependencies and official `@better-auth/*` packages that participate in the synchronized release train to the version of the CLI being run. It compares the minimum version allowed by each `package.json` specifier; specifiers whose minimum is the same or newer are left unchanged. Independently versioned packages such as `@better-auth/utils` are not changed.

### info command

Displays environment diagnostics: system (OS, CPU, memory, Node.js version), package manager, Better Auth version and configuration (sensitive data auto-redacted), detected frameworks, and databases / ORMs.

```bash
npx auth@latest info --json > auth-info.json
```

### secret command

Generates a secret key for the Better Auth instance.

## Options / Props

| Command | Purpose | Key Flags |
|---------|---------|-----------|
| `generate` | Generate the DB schema | `-c, --cwd`, `--output`, `--config`, `-y, --yes`, `--adapter`, `--dialect` |
| `migrate` | Apply the schema to the DB (Kysely adapter only) | `--config`, `--yes` |
| `check` / `check schema` | Verify the setup / schema | `-c, --cwd`, `--config` |
| `create-admin` | Create an initial admin user | `--email`, `--password`, `--name`, `--role`, `--data`, `--no-email-verified`, `--config`, `--force`, `--yes` |
| `init` | Initialize a project | `--name`, `--framework`, `--plugins`, `--database`, `--package-manager` |
| `upgrade` | Update `better-auth` and `@better-auth/*` packages to the CLI's version | `--cwd`, `--yes` |
| `info` | Display environment diagnostic information | `--config`, `--json` |
| `secret` | Generate a secret key | none |

### generate options

| Option | Description |
|--------|-------------|
| `-c, --cwd` | Working directory (default: current directory) |
| `--output` | Where to save the generated schema |
| `--config` | Path to the Better Auth config file. By default searches for `auth.ts` in `./`, `./utils`, `./lib`, or those under `src` |
| `-y, --yes` | Skip the confirmation prompt and generate directly |
| `--adapter` | Schema generator: `prisma`, `drizzle`, or `kysely` (Kysely still requires the configured database) |
| `--dialect` | Target provider: `postgresql`, `mysql`, `sqlite`, `mongodb` (`mongodb` only with Prisma; Drizzle maps `postgresql` to `pg`). Required with `--adapter drizzle`; Prisma defaults to `postgresql` |

### migrate options

| Option | Description |
|--------|-------------|
| `--config` | Path to the Better Auth config file |
| `--yes` | Skip confirmation and apply the schema directly |

### create-admin options

| Option | Description |
|--------|-------------|
| `--email` | Admin email address |
| `--password` | Admin password; prompted if omitted |
| `--name` | Admin name (default `Admin`) |
| `--role` | Role to assign (default `admin`) |
| `--data` | Additional user fields as a JSON object |
| `--no-email-verified` | Create the admin with an unverified email (default: marked verified) |
| `--config` | Path to the Better Auth config file |
| `--force` | Create the admin even when users already exist |
| `--yes` | Skip the existing-users confirmation prompt |

### init options

| Option | Description |
|--------|-------------|
| `--name` | Application name (default: `name` from `package.json`) |
| `--framework` | Framework (currently: Next.js only) |
| `--plugins` | Comma-separated list of plugins to install |
| `--database` | Database selection (currently: SQLite only) |
| `--package-manager` | npm, pnpm, yarn, or bun (default: detected manager) |

### upgrade options

| Option | Description |
|--------|-------------|
| `--cwd` | Project directory containing the `package.json` to update (default: current directory) |
| `--yes` | Skip the confirmation prompt and install the updates directly |

### info options

| Option | Description |
|--------|-------------|
| `--config` | Custom config file path |
| `--json` | Output results in JSON format |

## Notes

- Changed in 1.7: new commands `check` (with `check schema`), `create-admin`, and `upgrade`; `generate` gains `--adapter` / `--dialect` and `-y, --yes`. The `auth` CLI requires Node.js 22.12 or newer (1.7 upgrade guide). Most projects start a 1.7 upgrade with `npx auth upgrade`; upgrade `better-auth` and every `@better-auth/*` package together.
- `generate --output` to a directory picks an adapter-specific default filename; generated schema omits references to migration-disabled models (1.7 upgrade guide).
- **Data protection:** in `info`, secrets, API keys, and database URLs are replaced with `[REDACTED]`.
- **Module resolution:** the CLI resolves `tsconfig.json` path aliases, `package.json` subpath imports (including SvelteKit 3's `#lib`), and stubbed framework virtual modules (`$env/*`, `$app/*`, `cloudflare:workers`, Vite assets like `?raw`). On SvelteKit 2 run `svelte-kit sync` first so `$lib` resolves. Module types that cannot load outside their bundler (`.svelte` components, `import.meta.glob`) must stay out of the config's import graph.
- **PostgreSQL non-default schema:** set `database.schemaName`; otherwise `migrate` uses the connection's `search_path`.

## Related

- [Database](./database.md)
