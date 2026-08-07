# CLI

Project operations via the `npx auth@latest` command.

## Initialize a project

```sh
npx auth@latest init
```

Initializes Better Auth in a project. Options include `--framework`, `--database`, `--plugins`, and `--package-manager`.

## Initialize a project (with options)

```sh
npx auth@latest init \
  --name my-app \
  --framework nextjs \
  --database sqlite \
  --plugins two-factor,organization \
  --package-manager pnpm
```

Currently supported frameworks are limited to Next.js, and databases to SQLite (verify before relying on this).

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

## Generate a secret key

```sh
npx auth@latest secret
```
