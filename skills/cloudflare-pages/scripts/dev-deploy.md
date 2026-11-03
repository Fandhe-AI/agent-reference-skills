---
source: https://developers.cloudflare.com/pages/functions/local-development/, https://developers.cloudflare.com/pages/get-started/direct-upload/, https://developers.cloudflare.com/pages/functions/wrangler-configuration/, https://developers.cloudflare.com/pages/functions/bindings/
---

# Local development and deploy

Copy-paste commands for running a Pages project locally and deploying prebuilt assets with Wrangler. Full `wrangler pages dev` / `wrangler pages deploy` flag tables are in the cloudflare-wrangler skill (`commands/pages.md`).

## Signature / Usage

### Run the project locally

```sh
npx wrangler pages dev <DIRECTORY-OF-ASSETS>
```

Serves static assets and runs Functions at `http://localhost:8788` by default; press `b` to open the browser. With a Wrangler configuration file that sets `pages_build_output_dir`, the directory can be omitted.

### Serve locally over HTTPS

```sh
npx wrangler pages dev --local-protocol=https <DIRECTORY-OF-ASSETS>
```

Uses a self-signed certificate. The same can be set with `local_protocol` in the Wrangler configuration file.

### Attach bindings in local development

```sh
npx wrangler pages dev <OUTPUT_DIR> --kv=TODO_LIST
```

```sh
npx wrangler pages dev <OUTPUT_DIR> --r2=BUCKET
```

```sh
npx wrangler pages dev <OUTPUT_DIR> --d1 NORTHWIND_DB=xxxx-xxxx-xxxx-xxxx-xxxx
```

```sh
npx wrangler pages dev --ai=<BINDING_NAME>
```

```sh
npx wrangler pages dev <OUTPUT_DIR> --do MY_DO=DurableObjectExample@do-worker
```

For the Durable Object form, run `npx wrangler dev` in the `do-worker` directory in another terminal first. Each binding is read in Functions as `context.env.<BINDING_NAME>`.

### Pass an environment variable to the local dev server

```sh
npx wrangler pages dev --binding=<ENVIRONMENT_VARIABLE_NAME>=<ENVIRONMENT_VARIABLE_VALUE>
```

For secrets, prefer a `.dev.vars` (or `.env`) file next to the Wrangler configuration file, and add `.dev.vars*` and `.env*` to `.gitignore`. Use one or the other, not both.

### Download dashboard configuration as a Wrangler file

```sh
npx wrangler pages download config <PROJECT_NAME>
```

> **Warning**: This overwrites an existing Wrangler configuration file with one generated from the dashboard configuration. Run it only to discard the local file and start over.

### Deploy prebuilt assets (production)

```sh
npx wrangler pages deploy <BUILD_OUTPUT_DIRECTORY> --branch <PRODUCTION_BRANCH>
```

Adapted (not in the official docs): `--branch <PRODUCTION_BRANCH>` is added; without it, in a Git workspace Wrangler infers the branch from the current one, so running from a feature branch creates a preview deployment instead of production.

> **Warning**: Publishes to `<PROJECT_NAME>.pages.dev` as the production deployment (only when `<PRODUCTION_BRANCH>` is the project's production branch). When the Wrangler file contains `pages_build_output_dir`, the deployed configuration replaces the dashboard configuration; do not deploy until it is production-ready.

Run it inside the project, or pass the project path. Outside a Git workspace `--branch` is required in any case.

### Deploy to a preview branch

```sh
npx wrangler pages deploy <OUTPUT_DIRECTORY> --branch=<BRANCH_NAME>
```

Each branch gets an alias at `<BRANCH_NAME>.<PROJECT_NAME>.pages.dev`.

### Deploy to the production branch explicitly

```sh
npx wrangler pages deploy --branch <PRODUCTION_BRANCH>
```

Uses the project's Wrangler configuration file for the deployed settings.

## Notes

- Full `wrangler pages dev` / `wrangler pages deploy` flag tables are in the cloudflare-wrangler skill (`commands/pages.md`).
- Adapted from the official docs: `--branch <PRODUCTION_BRANCH>` was added to the production deploy command so the target does not depend on the current Git branch.
- Pages does not support branch-based configuration, so a preview deployment sets the configuration for all preview deployments.
- A Wrangler file with `pages_build_output_dir` becomes the source of truth for the project; fields it sets can no longer be edited in the dashboard.

## Related

- [Wrangler configuration](../references/functions/wrangler-configuration.md)
- [Bindings](../references/functions/bindings.md)
- [Local development](../references/functions/local-development.md)
- [Direct Upload](../references/platform-howto/get-started-direct-upload.md)
