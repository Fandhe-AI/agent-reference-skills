# Vercel for Bitbucket

Vercel for Bitbucket automatically deploys Bitbucket projects, provides Preview Deployment URLs for every pull request, and keeps custom domains updated on production pushes.

## Signature / Usage

```bash
# Self-hosted (Bitbucket Data Center): use Bitbucket Pipelines
vercel build              # build without exposing source to Vercel
vercel deploy --prebuilt  # upload .vercel/output to Vercel
```

## Supported Bitbucket Products

| Product | Notes |
|---------|-------|
| Bitbucket Free / Standard / Premium | Full native integration |
| Bitbucket Data Center (Self-Hosted) | Via Bitbucket Pipelines |

## Bitbucket Permissions Required

### Repository Permissions

| Permission | Read | Write | Purpose |
|------------|------|-------|---------|
| `Web Hooks` | Y | N | React to Bitbucket events |
| `Issues` | Y | Y | Required alongside Pull Requests by Bitbucket |
| `Repository` | N | N | Access admin features |
| `Pull requests` | Y | Y | Create deployments per PR, comment with status |

### Organization & User Permissions

| Permission | Read | Write | Purpose |
|------------|------|-------|---------|
| `Team` (org) | Y | N | Better team onboarding experience |
| `Account` (user) | Y | N | Associate email with Bitbucket account |

- Importing or connecting a repository requires **Admin** access to the repository.

## Deployment Behavior

| Event | Result |
|-------|--------|
| Push to any branch | Preview deployment |
| Push/merge to production branch | Production deployment; custom domain updated |
| Pull Request | Preview URL posted as PR comment |
| Multiple pushes to same branch | Latest commit wins; older queued builds cancelled |

## Notes

- Bot comments on PRs and commits can be silenced in **Project Settings → Git → Connected Git Repository**.
- Bitbucket Data Center (self-hosted) uses `vercel build` + `vercel deploy --prebuilt` via Bitbucket Pipelines.
- Bitbucket's "production branch" setting is used as a fallback when `main` and `master` branches don't exist.

## System Environment Variables

Same set as GitHub integration. Key variable difference:

| Variable | Value |
|----------|-------|
| `VERCEL_GIT_PROVIDER` | `bitbucket` |

See [vercel-for-github.md](./vercel-for-github.md) for the full variable list.

## Related

- [git-integration.md](./git-integration.md)
- [vercel-for-github.md](./vercel-for-github.md)
- [environments.md](./environments.md)
