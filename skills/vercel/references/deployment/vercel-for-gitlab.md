# Vercel for GitLab

Vercel for GitLab automatically deploys GitLab projects, provides Preview Deployment URLs for every merge request, and keeps custom domains updated on production pushes.

## Signature / Usage

```bash
# Self-managed GitLab: use GitLab Pipelines
vercel build          # build without exposing source to Vercel
vercel deploy --prebuilt  # upload .vercel/output to Vercel
```

## Supported GitLab Products

| Product | Notes |
|---------|-------|
| GitLab Free / Premium / Ultimate / Enterprise | Full native integration |
| Self-Managed GitLab | Via GitLab Pipelines |

## GitLab Permissions Required

| Permission | Read | Write | Purpose |
|------------|------|-------|---------|
| `API` | Y | Y | Access API, clone repos, comment on MRs and commits |

- Importing or connecting a repository requires **Maintainer** access to the repository.
- If the repository belongs to a GitLab group, **Maintainer** access to the group is also required.

## Deployment Behavior

| Event | Result |
|-------|--------|
| Push to any branch | Preview deployment |
| Push/merge to production branch | Production deployment; custom domain updated |
| Merge Request | Preview URL posted as MR comment |
| Multiple pushes to same branch | Latest commit wins; older queued builds cancelled |

## System Environment Variables

Same set as GitHub integration. Key variables:

| Variable | Available At | Description |
|----------|-------------|-------------|
| `VERCEL_GIT_PROVIDER` | Build + Runtime | `gitlab` |
| `VERCEL_ENV` | Build + Runtime | `production`, `preview`, or `development` |
| `VERCEL_URL` | Build + Runtime | Generated deployment URL (no `https://`) |
| `VERCEL_GIT_COMMIT_SHA` | Build + Runtime | SHA of the triggering commit |
| `VERCEL_GIT_COMMIT_REF` | Build + Runtime | Branch name |
| `VERCEL_GIT_PULL_REQUEST_ID` | Build + Runtime | MR ID (empty string if no MR) |

See [vercel-for-github.md](./vercel-for-github.md) for the full variable list.

## Notes

- Bot comments on MRs and commits can be silenced in **Project Settings → Git → Connected Git Repository**.
- In GitLab, a merge pipeline can fail while the branch pipeline succeeds, allowing MRs to merge with failing tests. Use Vercel CLI to deploy to avoid this GitLab issue.
- Self-Managed GitLab uses `vercel build` + `vercel deploy --prebuilt` via GitLab Pipelines.

## Related

- [git-integration.md](./git-integration.md)
- [vercel-for-github.md](./vercel-for-github.md)
- [environments.md](./environments.md)
