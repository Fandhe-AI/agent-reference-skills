---
source: https://developers.cloudflare.com/workers/wrangler/environments/
---

# Environments

Select and use Wrangler environments (`--env` / `-e` / `CLOUDFLARE_ENV`). Config structure: see [../references/configuration/README.md](../references/configuration/README.md).

## Develop in an environment

```sh
npx wrangler dev -e=dev
```

## Deploy to an environment

```sh
npx wrangler deploy -e=dev
```

Deploys a Worker named `<top-level-name>-<environment-name>` (for example `my-worker-dev`).

## Select the environment with an environment variable

```sh
CLOUDFLARE_ENV=dev npx wrangler deploy
```

`--env` on the command line takes precedence over `CLOUDFLARE_ENV`.

## Deploy staging and production examples

```sh
npx wrangler deploy
npx wrangler deploy --env staging
npx wrangler deploy --env production
```

Each environment uploads as `my-worker`, `my-worker-staging`, and `my-worker-production` respectively (given the doc's example config).

## Set an environment-specific secret

```sh
npx wrangler secret put <KEY> --env <ENV_NAME>
```

Secrets and bindings are non-inheritable and must be defined per environment.

## Generate types for one environment only

```sh
npx wrangler types --env <ENV_NAME>
```

Without `--env`, types aggregate bindings from all environments.

## Vite plugin projects

```sh
CLOUDFLARE_ENV=staging vite build
```

With the Cloudflare Vite plugin the environment is chosen at dev or build time, not by `--env`. See [vite-plugin.md](./vite-plugin.md).

> **Note**: environment names appear in automatically issued SSL certificates, which are public record; do not put sensitive names in them.

## Notes

- Corrected from the official docs, which show `-env`. The Environments page writes `wrangler secret put <KEY> -env`, but the environment flag is `--env` (alias `-e`) per the Wrangler commands reference (https://developers.cloudflare.com/workers/wrangler/commands/workers/).
