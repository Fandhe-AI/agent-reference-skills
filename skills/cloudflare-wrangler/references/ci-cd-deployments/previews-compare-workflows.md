---
source: https://developers.cloudflare.com/workers/previews/compare-workflows/
---

# Compare Preview Workflows

Differences between Previews, Version URLs, and Wrangler environments. Previews are the recommended way to test changes before production.

## Signature / Usage

Branch Previews under a Wrangler environment (settings in `env.staging.previews`):

```jsonc
{
  "name": "my-worker",
  "env": {
    "dev": {
      "name": "my-worker-dev",
      "vars": {
        "ENVIRONMENT": "development"
      }
    },
    "staging": {
      "name": "my-worker-staging",
      "vars": {
        "ENVIRONMENT": "staging"
      },
      "previews": {
        "vars": {
          "ENVIRONMENT": "staging-preview"
        }
      }
    }
  }
}
```

```toml
name = "my-worker"

[env.dev]
name = "my-worker-dev"

  [env.dev.vars]
  ENVIRONMENT = "development"

[env.staging]
name = "my-worker-staging"

  [env.staging.vars]
  ENVIRONMENT = "staging"

[env.staging.previews.vars]
ENVIRONMENT = "staging-preview"
```

```sh
npx wrangler preview --env staging
```

```sh
npx wrangler preview delete --env staging --name <PREVIEW_NAME>
```

## Options / Props

| Workflow | Best for | Command |
| --- | --- | --- |
| **Previews** | Full environments for branches and pull requests under the same Worker. | `npx wrangler preview` |
| **Version URLs** | An uploaded version of your code that uses production resources. | `wrangler versions upload` |
| **Wrangler environments** | Separately deployed Workers. | `wrangler deploy --env <name>` |

Migrating from aliased Version URLs:

| What you do today | What to do instead |
| --- | --- |
| `wrangler versions upload --preview-alias staging` | `npx wrangler preview --name staging` |
| Share an aliased Version URL for PR review | Share a Preview URL or custom domain Preview URL. |
| Set `preview_urls = true` for aliased Version URLs | Use Preview settings for branch-specific variables, secrets, and bindings. |

## Notes

- Version URLs run one uploaded version with production resources and no isolated branch resources; do not use them for branch/PR testing.
- Wrangler environments create separately named Workers (e.g. `my-worker-staging`) for persistent environments. In the example `dev` has no `previews` block (persistent Worker only); `staging` has one for branch Previews.
- Use the same `--env` value for every Preview command (create, update, manage, delete); omitting it targets the top-level Worker.

## Related

- [previews-overview.md](./previews-overview.md)
- [versions-version-urls.md](./versions-version-urls.md)
- [environments.md](../configuration/environments.md)
