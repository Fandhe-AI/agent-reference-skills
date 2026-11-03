---
source: https://developers.cloudflare.com/workers/previews/
---

# Worker Previews

Previews give each branch an isolated, production-like environment under the same Worker, with its own variables, secrets, bindings, URLs, and observability. Also covers the Get started page.

## Signature / Usage

Requires Wrangler 4.135.0 or later in the project dependency (project commands do not use a newer global install).

```
npm i -D wrangler@latest
```

Add a `previews` block (may be empty), then deploy a Preview:

```jsonc
{
  // ...
  "vars": {
    "ENVIRONMENT": "production"
  },
  // ...
  "previews": {
    // ...
    "vars": {
      "ENVIRONMENT": "preview"
    }
    // ...
  }
}
```

```toml
[vars]
ENVIRONMENT = "production"

[previews.vars]
ENVIRONMENT = "preview"
```

```
npx wrangler preview
```

The Preview name defaults to the current Git branch; use `--name <PREVIEW_NAME>`. Delete with `npx wrangler preview delete --name <preview-name>`.

## Options / Props

| Branch | Command | What happens |
| --- | --- | --- |
| `main` | `npx wrangler deploy` | Deploys to production with production settings. |
| `feature/login` | `npx wrangler preview` | Creates or updates a Preview with its own settings. |

URLs:

| Host type | Preview URL | Deployment URL |
| --- | --- | --- |
| `workers.dev` | `<preview-name>-<worker-name>.<subdomain>.workers.dev` | `<deployment-id>-<worker-name>.<subdomain>.workers.dev` |
| Custom domain | `<preview-name>.app.example.com` | `<deployment-id>-<preview-name>.app.example.com` |

Limits:

| Limit | Free plan | Paid plans |
| --- | --- | --- |
| Previews per Worker | 100 | 500 |
| Deployments per Preview | 100 | 100 |

## Notes

- Preview URL always serves the latest deployment; Deployment URL points to one specific deploy and never changes.
- When a limit is reached the oldest is deleted: the least recently deployed Preview, or the oldest deployment in that Preview.
- `workers.dev` Preview URLs send `X-Robots-Tag: noindex`; protect custom domain Preview URLs with Cloudflare Access. Preview URLs are public by default.
- Previews do not inherit production settings; they use the branch's `previews` block. Secrets are set with commands (not config).
- Durable Object namespaces and container instances are provisioned per Preview; KV, D1, R2 etc. are isolated only if bound to separate resources. Workflow bindings use existing Workflows; service bindings from a Preview call the bound Worker's production deployment; routes and Cron Triggers target production; Queue consumers cannot target a Preview.
- You do not need a production deployment before creating a first Preview. Settings added in the dashboard must be copied into the Wrangler file.
- Workers Builds posts Preview URLs to pull/merge requests; existing Builds Workers need the one-time switch (see `builds-branches-and-paths.md`).
- Preview commands (`preview`, `preview delete`, `preview secret`, `preview base-config secret`) are documented in [workers.md](../commands/workers.md).

## Related

- [previews-configuration.md](./previews-configuration.md)
- [previews-resources.md](./previews-resources.md)
- [previews-custom-domains.md](./previews-custom-domains.md)
- [previews-test-and-debug.md](./previews-test-and-debug.md)
- [previews-examples.md](./previews-examples.md)
- [previews-compare-workflows.md](./previews-compare-workflows.md)
- [workers.md](../commands/workers.md)
