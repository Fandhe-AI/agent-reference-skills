---
source: https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/
---

# Build Branches, Watch Paths, and Advanced Setups

Control which branches and file paths trigger Workers Builds, and set up monorepos and Wrangler environments. Also covers the Build watch paths and Advanced setups pages.

## Signature / Usage

Update build settings via the Builds API (the API way to change the production branch is `{"git_repository": {"branch": "<BRANCH_NAME>"}}`).

Snippet taken from https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/#update-build-settings.

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --request PATCH \
  --data '{
    "production_settings": {
      "build_command": "npm run build:prod"
    },
    "previews_base_config": {
      "environment_variables": {
        "API_URL": {"value": "https://staging.example.com", "is_secret": false},
        "OLD_VARIABLE": null
      }
    }
  }'
```

## Options / Props

Build watch paths examples (**Settings** > **Build** > **Build watch paths**; defaults: include `[*]`, exclude `[]`):

| Goal | Include paths | Exclude paths |
| --- | --- | --- |
| Build on all changes in `project-a/` and `packages/` | `project-a/*, packages/*` | (none) |
| Build on any change except the `docs/` directory | `*` | `docs/*` |
| Build for all `.md` files | `*.md` | (none) |

Monorepo layout example (`ecommerce-monorepo`, one Workers project per service):

| Path | Contents |
| --- | --- |
| `ecommerce-monorepo/workers/product-service/` | `src/`, `wrangler.jsonc` |
| `ecommerce-monorepo/workers/order-service/` | `src/`, `wrangler.jsonc` |
| `ecommerce-monorepo/workers/notification-service/` | `src/`, `wrangler.jsonc` |
| `ecommerce-monorepo/packages/schema/` | Shared package |
| `ecommerce-monorepo/README.md` | Repository readme |

Settings for `product-service`:

| Setting | Value |
| --- | --- |
| Root directory | `/workers/product-service/` |
| Deploy command (with Turborepo, per Worker) | `turbo deploy -F product-service` |

## Notes

- Production branch: **Settings** > **Build** > **Branch control**; defaults to the repository default branch. Every push to it runs the build command then the deploy command.
- Preview builds (branches other than production): enable via **Enable Preview Builds** checkbox in **Branch control**. Runs the build command then the Preview command (default `npx wrangler preview`). New Workers use Worker Previews by default.
- Existing Workers connected to Builds before Worker Previews keep the previous preview model (which uses production settings) until a one-time, irreversible switch: **Workers & Pages** > Worker > **Settings** > **Builds** > **Set up Worker Previews** banner > **Set up**; configure Preview variables/secrets/bindings; the Preview command is replaced with `npx wrangler preview` (custom commands must invoke `npx wrangler preview`); **Switch to Worker Previews**.
- Watch path evaluation: paths matching excludes are ignored first; remaining paths are checked against includes; any match triggers a build. A wildcard `*` matches zero or more characters and can be at the start or end of a rule. Path matching is bypassed (build runs) for pushes with 0 file changes, or 3000+ file changes or 20+ commits.
- Monorepo setup: connect the repo to each Worker, set each root directory (location of its `wrangler.jsonc`), optionally set unique build/deploy commands and watch paths. Per-build status appears as GitHub check runs or GitLab commit statuses.
- Wrangler Environments: (1) `wrangler deploy` once per env to create the Workers; (2) they are typically named `[name of Worker] - [environment name]`; (3) connect the repo to each env Worker; (4) add `--env <environment-name>` to both the deploy command and Preview command. Example: Worker `my-worker` with `staging` and `production` envs -> Workers `my-worker-staging` and `my-worker-production`; deploy commands `npx wrangler deploy --env staging` / `npx wrangler deploy --env production`, Preview commands `npx wrangler preview --env staging` / `npx wrangler preview --env production`.
- Changes to `previews_base_config` apply to Previews created afterwards; add `?patch_existing_previews=true` to also update existing ones.

## Related

- [builds-configuration.md](./builds-configuration.md)
- [builds-api-reference.md](./builds-api-reference.md)
- [builds-git-integration.md](./builds-git-integration.md)
- [previews-overview.md](./previews-overview.md)
- [environments.md](../configuration/environments.md)
