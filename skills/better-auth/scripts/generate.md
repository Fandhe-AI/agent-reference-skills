# Generate

Generating database schemas and applying migrations (generate / migrate, including the 1.7 schema application order).

## Generate schema/migration files

```sh
npx auth@latest generate
```

Generates a schema file appropriate to the ORM. Default output paths: Prisma: `prisma/schema.prisma`, Drizzle: `schema.ts`, Kysely: `schema.sql`.

## Generate schema to a specific output path

```sh
npx auth@latest generate --output ./db/schema.ts
```

## Generate schema with a specific config file path

```sh
npx auth@latest generate --config ./src/lib/auth.ts
```

By default, searches `./, ./utils, ./lib` and their `src/` equivalents.

## Generate schema without confirmation prompt

```sh
npx auth@latest generate --yes
```

## Generate Without a Database Connection

```sh
npx auth@latest generate --adapter prisma --dialect postgresql
```

Prisma and Drizzle can generate a schema without using the configured database adapter; the CLI still loads your config to include plugins and schema customizations. `--adapter` accepts `prisma`, `drizzle`, `kysely` (Kysely still requires the configured database and ignores `--dialect`). `--dialect` accepts `postgresql`, `mysql`, `sqlite`, `mongodb` (`mongodb` only with Prisma; Drizzle maps `postgresql` to `pg`), and is required with `--adapter drizzle`. Prisma defaults to `postgresql`. If `--adapter` is omitted, the adapter in your config is used; `--dialect` alone has no effect.

## Generate a Drizzle schema without a database connection

```sh
npx auth@latest generate --adapter drizzle --dialect postgresql
```

## Apply migrations (Kysely adapter only)

> **警告**: This command applies the schema directly to the database. Back up your data before running it.

```sh
npx auth@latest migrate
```

For projects using the built-in Kysely adapter only; for other adapters apply the schema with your ORM's migration tool. On PostgreSQL with a non-default schema, set `database.schemaName`; otherwise the connection's `search_path` is used.

## Apply migrations without confirmation prompt

> **警告**: Applies schema changes to the database without confirmation.

```sh
npx auth@latest migrate --yes
```

## Apply the 1.7 schema (Kysely)

> **警告**: Complete the manual data preparation in the 1.7 upgrade guide first (duplicate account keys, OAuth client records, SCIM, Device Authorization). The CLI adds tables, columns, and indexes but does not copy OAuth clients or convert legacy SCIM data. Back up the database before running.

```sh
npx auth migrate
```

1.7 order (upgrade guide): 1) prepare data, 2) apply the 1.7 schema, 3) deploy the 1.7 packages and configuration changes together, 4) complete post-deployment work such as SCIM reprovisioning.

## Apply the 1.7 schema (Drizzle / Prisma / custom workflow)

```sh
npx auth@latest generate
```

Review the generated output, then apply it with your own migration tooling (for example Drizzle Kit or Prisma Migrate). Do not use `migrate` for these adapters.

## Running with pnpm

```sh
pnpm dlx auth@latest generate
pnpm dlx auth@latest migrate
```

## Running with yarn

```sh
yarn auth@latest generate
yarn auth@latest migrate
```

## Running with bun

```sh
bun auth@latest generate
bun auth@latest migrate
```
