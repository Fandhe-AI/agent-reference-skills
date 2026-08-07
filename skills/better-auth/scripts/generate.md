# Generate

Generating database schemas and applying migrations.

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

## Apply migrations (Kysely adapter only)

> **Warning**: This command applies the schema directly to the database. Back up your data before running it.

```sh
npx auth@latest migrate
```

For projects using the Kysely adapter only. On PostgreSQL, it auto-detects `search_path` and creates tables in the correct schema.

## Apply migrations without confirmation prompt

> **Warning**: Applies schema changes to the database without confirmation.

```sh
npx auth@latest migrate --yes
```

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
