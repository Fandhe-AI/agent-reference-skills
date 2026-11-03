---
source: https://developers.cloudflare.com/workers/configuration/secrets/
---

# Secrets and Env Files

Manage deployed secrets with `wrangler secret`, local secrets in `.dev.vars` / `.env`, and Wrangler system environment variables. Secret definitions: see [../references/configuration/secrets.md](../references/configuration/secrets.md).

## Create or update a secret

```sh
npx wrangler secret put <KEY>
```

Prompts for the value. This creates a new Worker version and deploys it immediately.

## Pipe a secret value

```sh
echo "-----BEGIN PRIVATE KEY-----\nM...==\n-----END PRIVATE KEY-----\n" | wrangler secret put PRIVATE_KEY
```

## List secrets

```sh
npx wrangler secret list
```

`--format "json" | "pretty"` selects the output format.

## Delete a secret

```sh
npx wrangler secret delete <KEY>
```

> **Warning**: creates a new version and deploys it immediately; the Worker loses access to the secret.

## Bulk create, update, or delete secrets

```sh
npx wrangler secret bulk < secrets.json
```

Accepts JSON or `.env` (up to 100 secrets per command). With JSON, a `null` value deletes a key (Wrangler 4.97.0 or later; no deletion with `.env`).

## Create a secret version without deploying (gradual deployments)

```sh
npx wrangler versions secret put <KEY>
```

Then deploy with `npx wrangler versions deploy`.

## Delete a secret in a version without deploying

```sh
npx wrangler versions secret delete <KEY>
```

## Bulk secrets in a version without deploying

```sh
npx wrangler versions secret bulk [FILE]
```

## Upload secrets alongside code

```sh
npx wrangler deploy --secrets-file .env.production
npx wrangler versions upload --secrets-file secrets.json
```

Secrets not included in the file are preserved from the previous version.

## Secrets on a Preview

```sh
npx wrangler preview secret put <KEY>
npx wrangler preview base-config secret put <KEY>
```

> **Warning**: `preview secret put` / `delete` creates a new deployment of the Preview.

## Local secrets file

```bash
SECRET_KEY="value"
API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

Save as `.dev.vars` (or `.env`) next to the Wrangler config. Use one or the other; if `.dev.vars` exists, `.env` values are not loaded. Per-environment files: `.dev.vars.<environment-name>` / `.env.<environment-name>`.

> **Warning**: do not commit these files. Add `.dev.vars*` and `.env*` to `.gitignore`.

## Control how `.env` is loaded locally

```sh
CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV=false npx wrangler dev
CLOUDFLARE_INCLUDE_PROCESS_ENV=true npx wrangler dev
```

The second works only when no `.dev.vars` exists.

## Wrangler system environment variables

```bash
CLOUDFLARE_ACCOUNT_ID=<YOUR_ACCOUNT_ID_VALUE>
CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN_VALUE>
CLOUDFLARE_EMAIL=<YOUR_EMAIL>
WRANGLER_SEND_METRICS=true
CLOUDFLARE_API_BASE_URL=https://api.cloudflare.com/client/v4
WRANGLER_LOG=debug
WRANGLER_LOG_PATH=../Desktop/my-logs/my-log-file.log
```

Put these in a `.env` file in the project directory, or inline: `WRANGLER_LOG="debug" npx wrangler deploy`. Do not commit the `.env` file.

## Write machine-readable deploy output (ND-JSON)

```sh
WRANGLER_OUTPUT_FILE_PATH=./wrangler-output.json npx wrangler deploy
```

`WRANGLER_OUTPUT_FILE_DIRECTORY` writes a randomly named file into a directory instead; `WRANGLER_OUTPUT_FILE_PATH` wins when both are set.
