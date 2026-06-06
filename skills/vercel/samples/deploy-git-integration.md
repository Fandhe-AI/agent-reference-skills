# Deploy via Git Integration

Connect a GitHub, GitLab, or Bitbucket repository to Vercel for automatic deployments on every push.

```text
# Dashboard steps (no CLI required):
# 1. Go to https://vercel.com/new
# 2. Import your Git repository (GitHub / GitLab / Bitbucket)
# 3. Configure framework preset, root directory, and env vars
# 4. Click Deploy
```

Branch-to-environment mapping after integration is set up:

| Git branch | Deployment type | URL pattern |
|---|---|---|
| `main` (production branch) | Production | `your-project.vercel.app` |
| any other branch | Preview | `your-project-git-<branch>-<team>.vercel.app` |

To trigger a manual deployment from a specific Git ref via CLI:

```bash
# Deploy the latest commit on a branch
vercel --prod --git-branch main

# Deploy a specific commit SHA
vercel --prod --git-commit <sha>
```

To change the production branch from `main` to another branch:

```text
# Dashboard: Project Settings → Environments → Production → Branch Tracking
# Change branch name and click Save
```

## Notes

- Every pull request automatically receives a unique preview URL; the URL is posted as a PR comment.
- Only commit authors who are Vercel team members can trigger deployments from private repositories on Pro teams.
- Instant rollback is available from the Vercel dashboard — select any previous deployment and click **Promote to Production**.
- The production branch defaults to `main`, then `master`, then the repo's default branch.
