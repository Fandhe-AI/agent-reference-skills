# CLI

Project operations via the `npx auth@latest` command (init / upgrade / check / create-admin / info / secret). Requires Node.js 22.12 or newer (source: v1.7.10 upgrade guide).

## Initialize a project

```sh
npx auth@latest init
```

Initializes Better Auth in a project. Options: `--name`, `--framework`, `--plugins`, `--database`, `--package-manager`.

## Initialize a project (with options)

```sh
npx auth@latest init \
  --name my-app \
  --framework Next.js \
  --database SQLite \
  --package-manager pnpm
```

Per the official CLI docs (v1.7.10), `--framework` currently supports only `Next.js` and `--database` currently supports only `SQLite`. `--plugins` takes a comma-separated list. `--package-manager` accepts `npm`, `pnpm`, `yarn`, `bun` (defaults to the manager used to run the CLI). `--name` defaults to the `name` in `package.json`.

## Upgrade better-auth packages to the CLI version (1.7 migration entry point)

```sh
npx auth@latest upgrade
```

Updates older `better-auth` dependencies and official `@better-auth/*` packages in the synchronized release train to the version of the CLI being run. Specifiers whose minimum version is the same or newer are left unchanged; independently versioned packages such as `@better-auth/utils` are not changed. Options: `--cwd` (project directory containing `package.json`, defaults to the current directory), `--yes` (skip the confirmation prompt and install directly).

## Run all setup checks

```sh
npx auth@latest check --config ./src/auth.ts
```

Runs all available checks. Options (shared with `check schema`): `-c, --cwd` (working directory, defaults to the current directory), `--config` (path to the Better Auth config file).

## Check that the schema can hold what Better Auth writes

```sh
npx auth@latest check schema --config ./src/auth.ts
```

Does not create schema files or apply migrations. Reads the live database for Kysely, the configured schema object for Drizzle, and the generated client model for Prisma; Drizzle and Prisma checks do not confirm that migrations were applied. Fails if validation is unavailable for the adapter. Also runs when runtime validation is disabled with `advanced.database.validateSchema: false`.

## Create an initial admin user

> **警告**: Creates a user with admin privileges in the configured database. Run it only against the intended environment, and avoid putting a real `--password` in shell history (omit it to be prompted).

```sh
npx auth@latest create-admin --email admin@example.com --name "Admin" --role admin
```

Requires the Admin plugin and a persistent database. Uses the server-side `auth.api.createUser` path, so passwords are hashed and database hooks still run. If users already exist, the command asks for confirmation. Options: `--email`, `--password` (prompted if omitted), `--name` (default `Admin`), `--role` (default `admin`), `--data` (extra user fields as a JSON object), `--no-email-verified` (the email is marked verified by default), `--config`, `--force` (create even when users already exist), `--yes` (skip the existing-users confirmation prompt).

## Create an admin without the existing-users prompt

> **警告**: Skips the confirmation shown when users already exist.

```sh
npx auth@latest create-admin --email admin@example.com --force
```

## Create an admin with an unverified email

```sh
npx auth@latest create-admin --email admin@example.com --no-email-verified
```

## Show environment diagnostics

```sh
npx auth@latest info
```

Displays OS, Node.js version, Better Auth version, and detected framework/ORM. Sensitive data is automatically replaced with `[REDACTED]`.

## Output environment diagnostics as JSON

```sh
npx auth@latest info --json
```

## Write diagnostics to a file

```sh
npx auth@latest info --json > auth-info.json
```

## Show diagnostics with a custom config path

```sh
npx auth@latest info --config ./config/auth.ts
```

## Generate a secret key

```sh
npx auth@latest secret
```
