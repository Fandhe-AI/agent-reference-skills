# Git Integration

Vercel automatically deploys on every branch push and merge to the production branch for GitHub, GitLab, Bitbucket, and Azure DevOps repositories.

## Signature / Usage

```bash
# Connect a repo: use the Vercel Dashboard → New Project
# Then push normally:
git push origin feature-branch   # → preview deployment
git push origin main              # → production deployment
```

## Supported Git Providers

| Provider | Plans | Notes |
|----------|-------|-------|
| GitHub Free / Team / Enterprise Cloud | All | Full integration with PR comments, checks |
| GitHub Enterprise Server | All | Via GitHub Actions only |
| GitLab Free / Premium / Ultimate / Enterprise | All | Full integration with MR comments |
| Self-Managed GitLab | All | Via GitLab Pipelines |
| Bitbucket Free / Standard / Premium | All | Full integration with PR comments |
| Bitbucket Data Center (Self-Hosted) | All | Via Bitbucket Pipelines |
| Azure DevOps Pipelines | All | Via Vercel Deployment Extension |

## Deployment Behavior

| Event | Result |
|-------|--------|
| Push to non-production branch | Preview deployment; unique URL posted as PR/MR comment |
| Push to production branch (default: `main`) | Production deployment; custom domain updated |
| Pull/Merge Request | Preview deployment per PR; URL in comment |
| Multiple simultaneous pushes to same branch | Latest commit wins; intermediate builds are cancelled |

## Production Branch Configuration

Vercel selects the production branch in this order: `main` → `master` → Bitbucket "production branch" setting → repository default branch.

To customize: **Project Settings → Environments → Production → Branch Tracking → change branch name**.

## Deploying from a Git Reference (Dashboard)

1. Go to **Project → Deployments → Create Deployment**.
2. Enter a commit SHA (targeted) or a branch name (branch-based).
3. Select **Create Deployment**.

## Private Repositories

| Plan | Requirement |
|------|-------------|
| Hobby | Commit author must be the Hobby team owner |
| Pro | Commit author must be a member of the Vercel Pro team |

For forks of public repositories, Vercel requires authorization from a team member before deploying a PR.

## Notes

- Configure `github.autoJobCancellation = false` in `vercel.json` to disable automatic cancellation of queued builds.
- Vercel sends `repository_dispatch` events to GitHub on deployment status changes (`vercel.deployment.ready`, `.success`, `.error`, `.canceled`, `.pending`, `.failed`, `.promoted`, `.skipped`, `.ignored`).
- Commit authors on private repositories must have a Vercel account with linked Git credentials.

## Related

- [vercel-for-github.md](./vercel-for-github.md)
- [vercel-for-gitlab.md](./vercel-for-gitlab.md)
- [vercel-for-bitbucket.md](./vercel-for-bitbucket.md)
- [environments.md](./environments.md)
