# CLI

Better Auth includes a built-in CLI for managing the database schema, initializing projects, generating secret keys, and collecting diagnostic information about the auth setup.

## Signature / Usage

```bash
npx auth@latest generate
npx auth@latest migrate
npx auth@latest init
npx auth@latest info
npx auth@latest secret
```

### generate command

The default output destination for the generated schema depends on the ORM type (Prisma: `prisma/schema.prisma`, Drizzle: `schema.ts`, Kysely: `schema.sql`).

### migrate command

Applies the schema to the DB (Kysely adapter only). Automatically detects the `search_path` configured in PostgreSQL and creates tables in the correct schema.

### init command

Initializes a project.

### info command

Displays environment diagnostic information.

```bash
npx auth@latest info --json > auth-info.json
```

Output includes: system details (OS, CPU, memory, Node.js version), package manager info, Better Auth version and config (sensitive data automatically masked), detected frameworks (Next.js, React, Vue, etc.), and database clients/ORMs (Prisma, Drizzle, etc.).

### secret command

Generates an encryption secret key for the Better Auth instance.

## Options / Props

| Command | Purpose | Key Flags |
|---------|---------|-----------|
| `generate` | Generate the DB schema | `--output`, `--config`, `--yes` |
| `migrate` | Apply the schema to the DB (Kysely adapter only) | `--config`, `--yes` |
| `init` | Initialize a project | `--name`, `--framework`, `--plugins`, `--database`, `--package-manager` |
| `info` | Display environment diagnostic information | `--config`, `--json` |
| `secret` | Generate a secret key | none |

### generate options

| Option | Description |
|--------|-------------|
| `--output` | Specify the output destination for the generated schema |
| `--config` | Path to the Better Auth config file. By default, searches `./, ./utils, ./lib` or their `src/` equivalents |
| `--yes` | Skip confirmation prompts and generate the schema directly |

### migrate options

| Option | Description |
|--------|-------------|
| `--config` | Path to the Better Auth config file |
| `--yes` | Skip confirmation and apply the schema directly |

### init options

| Option | Description |
|--------|-------------|
| `--name` | Application name (default: `name` from `package.json`) |
| `--framework` | Framework to use (currently: Next.js only) |
| `--plugins` | Comma-separated list of plugins to install |
| `--database` | Database selection (currently: SQLite only) |
| `--package-manager` | npm, pnpm, yarn, or bun (default: detected manager) |

### info options

| Option | Description |
|--------|-------------|
| `--config` | Custom config file path |
| `--json` | Output results in JSON format (for sharing or programmatic processing) |

## Notes

- **Data protection:** In the `info` command, sensitive data such as secrets, API keys, and database URLs are automatically replaced with `[REDACTED]`
- **Module resolution errors:** If a "Cannot find module X" error occurs, temporarily remove import aliases from the config file and use relative paths instead. Restore the aliases after running the CLI
- **PostgreSQL non-default schema:** The migrate command automatically handles PostgreSQL's custom search path

## Related

- [Database](./database.md)
