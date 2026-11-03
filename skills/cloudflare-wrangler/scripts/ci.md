---
source: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
---

# CI/CD

Authenticate Wrangler non-interactively and deploy from CI. Details: see [../references/commands/README.md](../references/commands/README.md).

## Authenticate with environment variables

```sh
export CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN_VALUE>
export CLOUDFLARE_ACCOUNT_ID=<YOUR_ACCOUNT_ID_VALUE>
npx wrangler deploy
```

Create the token from **Account API tokens** > **Create Token** > **Edit Cloudflare Workers**, scoped to the target account.

> **Warning**: store `CLOUDFLARE_API_TOKEN` in your CI provider's secrets, never in the repository.

## GitHub Actions workflow

```yaml
name: Deploy Worker
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      # Run your project's build step, if required
      # - name: Build
      #   run: npm ci && npm run build
      - name: Deploy Worker
        uses: cloudflare/wrangler-action@v4
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

Add `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as repository secrets. For general GitHub Actions usage, see the github-docs skill.

## GitLab CI/CD

```sh
npx wrangler deploy
```

Use as the pipeline `script` command (replacing `npm run deploy`); set the same two secrets as CI variables.

## Check generated types are current

```sh
npx wrangler types --check
```

Exits 0 if up to date, 1 if out of date.

## Capture deploy results as ND-JSON

```sh
WRANGLER_OUTPUT_FILE_PATH=./wrangler-output.json npx wrangler deploy
```

## Deploy with secrets in one step

```sh
npx wrangler deploy --secrets-file .env.production
```

## Fail on risky non-interactive deploys

```sh
npx wrangler deploy --strict
```

## Authenticate against Access-protected Workers (remote bindings)

```sh
export CLOUDFLARE_ACCESS_CLIENT_ID=<CLIENT_ID>
export CLOUDFLARE_ACCESS_CLIENT_SECRET=<CLIENT_SECRET>
```

Store the values as CI secrets and expose them to the step that runs Wrangler.

## Disable colored output

```sh
FORCE_COLOR=0 npx wrangler deploy
```

## Verbose Wrangler logs to a file

```sh
WRANGLER_LOG=debug WRANGLER_LOG_PATH=./wrangler.log npx wrangler deploy
```
