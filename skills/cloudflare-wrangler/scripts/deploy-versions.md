---
source: https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/
---

# Deploy and Versions

Deploy Workers, upload versions, run gradual deployments, inspect deployments, and roll back. Full flag tables: see [../references/commands/README.md](../references/commands/README.md).

## Deploy a Worker

```sh
npx wrangler deploy
```

With no config file in the directory, Wrangler detects the framework and prompts to configure and deploy.

## Configure a project without deploying

```sh
npx wrangler setup
```

Add `--yes`, `--build`, or `--dry-run` as needed.

## Dry-run a deploy

```sh
npx wrangler deploy --dry-run
```

Compiles a project without deploying to live servers. Combined with `--outdir <PATH>` (path to the directory where Wrangler writes the bundled Worker files), it is also useful for testing the output of `wrangler deploy`.

## Deploy to an environment

```sh
npx wrangler deploy --env staging
```

Or `CLOUDFLARE_ENV=staging npx wrangler deploy`. See [environments.md](./environments.md).

## Deploy with a version tag and message

```sh
npx wrangler deploy --tag <TAG> --message "<MESSAGE>"
```

## Deploy with secrets from a file

```sh
npx wrangler deploy --secrets-file .env.production
```

Accepts JSON or `.env`. Secrets not in the file are preserved from the previous version.

## Deploy in strict mode

```sh
npx wrangler deploy --strict
```

Prevents deployments that could override remote settings in non-interactive environments.

## Keep dashboard-set variables

```sh
npx wrangler deploy --keep-vars
```

Without it, vars changed in the dashboard are overridden by the config on the next deploy. Secrets are never deleted by a deploy.

## Control Containers rollout

```sh
npx wrangler deploy --containers-rollout immediate
```

Values: `immediate`, `gradual` (default), `none`.

## Upload a version without deploying

```sh
npx wrangler versions upload
```

Optional: `--tag <TAG>`, `--message "<MESSAGE>"`, `--preview-alias <ALIAS>`, `--secrets-file <FILE>`.

## List recent versions

```sh
npx wrangler versions list
```

Shows the 10 most recent versions. Add `--json` for JSON.

## View a version

```sh
npx wrangler versions view <VERSION-ID>
```

## Deploy versions interactively (gradual deployment)

```sh
npx wrangler versions deploy
```

Follow the prompts to split traffic between versions. Re-run and set the new version to 100% to finish the rollout.

## Deploy versions non-interactively

```sh
npx wrangler versions deploy 095f00a7-23a7-43b7-a227-e4c97cab5f22@10% 1a88955c-2fbd-4a72-9d9b-3ba1e59842f2@90% -y
```

Format: `<version-id>@<percentage>`. Omitted percentages share the remaining traffic.

## Apply trigger changes after a version upload

```sh
npx wrangler triggers deploy
```

Experimental. Applies routes and Cron Triggers when using `versions upload`.

## List recent deployments

```sh
npx wrangler deployments list
```

## Show the current production state

```sh
npx wrangler deployments status
```

## Roll back to the previous version

```sh
npx wrangler rollback
```

> **Warning**: creates a new deployment immediately and becomes active on all routes and domains. Bindings and bound resources are not rolled back, and rollback is blocked if a Durable Object class lifecycle change or a deleted bound R2 / KV / queue resource sits between the versions. Only the 100 most recent versions are eligible.

## Roll back to a specific version

```sh
npx wrangler rollback <VERSION_ID> --message "<MESSAGE>"
```

`--message` skips the interactive confirmation prompts.

## Delete a Worker

```sh
npx wrangler delete --dry-run
```

Preview first (`--dry-run` does not actually delete). The real command is `npx wrangler delete` (optionally `--name <NAME>` / `--env <ENV>`).

> **Warning**: `wrangler delete` removes the Worker and all associated Cloudflare developer platform resources.

## Analyze startup performance

```sh
npx wrangler check startup
```

Reports bundle size and a local CPU profile. If you deploy with `--no-bundle`, use `wrangler check startup --args="--no-bundle"`.

## Deploy a Preview for a branch

```sh
npx wrangler preview --name feature-branch
```

Delete it with `npx wrangler preview delete` (`--name` defaults to the current git branch; `--skip-confirmation` skips the prompt).

> **Warning**: `preview delete` removes the Preview and all its deployments.

## Generate types

```sh
npx wrangler types
```

Writes `./worker-configuration.d.ts`. Other documented forms:

```sh
npx wrangler types --env <ENV>
npx wrangler types --check
npx wrangler types -c wrangler.toml -c ../bound-worker/wrangler.toml
```

`--check` exits 0 if up to date, 1 if out of date (useful in CI).
