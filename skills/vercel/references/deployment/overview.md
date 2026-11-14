# Deploying to Vercel

A deployment on Vercel is the result of a successful build of your project. Each deployment generates a unique URL for previewing changes in a live environment.

## Signature / Usage

```bash
# Git push (automatic)
git push origin main

# Vercel CLI
vercel --prod

# Deploy Hook (HTTP POST)
curl -X POST https://api.vercel.com/v1/integrations/deploy/<project-id>/<hook-id>

# REST API
POST https://api.vercel.com/v13/deployments

# Verify a preview
vercel curl / --deployment your_preview_url_here
vercel logs --deployment your_preview_deployment_id_here --query 'level:error'
```

## Deployment Methods

| Method | Trigger | Requires Git |
|--------|---------|--------------|
| Git push | Automatic on every commit/PR | Yes |
| Vercel Drop | Drag a file or folder into the browser at vercel.com/drop | No (works without an account) |
| Vercel CLI (`vercel`) | Manual, from terminal | No |
| Deploy Hooks | HTTP GET or POST to a unique URL | Yes |
| REST API | POST to `/v13/deployments` with file SHAs | No |

## Environments

| Environment | Trigger | Traffic |
|-------------|---------|---------|
| Local | `vercel dev` | Developer only |
| Preview | Non-production branch push or CLI without `--prod` | Unique URL per commit/branch |
| Production | Production branch push or `vercel --prod` | Custom domain |

## Notes

- Each deployment gets an automatically generated unique URL regardless of environment.
- After a rollback, Vercel disables auto-assignment of production domains until undone.
- On Pro and Enterprise teams, a deployment policy controls which Git sources and deployment mechanisms can deploy to each environment (see [deployment-policy.md](./deployment-policy.md)).
- Vercel Drop: without an account you can deploy a static site and claim it with a free account to keep it live; when signed in, Vercel detects the framework and builds it.
- `vercel deploy --temporary` deploys without an account (a temporary production deployment you can claim; see [claim-deployments.md](./claim-deployments.md)).
- Vercel CLI `vercel` (without `--prod`) creates a preview deployment; `vercel --prod` creates a production deployment.
- Source: https://vercel.com/docs/deployments (fetched 2026-11-14)

## Related

- [environments.md](./environments.md)
- [git-integration.md](./git-integration.md)
- [deployment-policy.md](./deployment-policy.md)
- [deploy-hooks.md](./deploy-hooks.md)
- [managing-deployments.md](./managing-deployments.md)
- [generated-urls.md](./generated-urls.md)
