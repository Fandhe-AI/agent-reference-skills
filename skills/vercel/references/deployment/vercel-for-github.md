# Vercel for GitHub

Vercel for GitHub automatically deploys GitHub projects, provides Preview Deployment URLs for every PR, and keeps custom domains updated on production pushes.

## Signature / Usage

```yaml
# Trigger GitHub Actions on Vercel deployment events
on:
  repository_dispatch:
    types:
      - 'vercel.deployment.success'
```

## GitHub Permissions Required

### Repository Permissions

| Permission | Read | Write | Purpose |
|------------|------|-------|---------|
| `Administration` | Y | Y | Create repositories on user's behalf |
| `Checks` | Y | Y | Add checks against source code on push |
| `Contents` | Y | Y | Fetch/write source code for templates |
| `Deployments` | Y | Y | Sync deployment status with GitHub |
| `Pull Requests` | Y | Y | Create deployments per PR, post comments |
| `Issues` | Y | Y | Required alongside Pull Requests by GitHub |
| `Metadata` | Y | N | Read basic repository metadata |
| `Web Hooks` | Y | Y | React to GitHub events |
| `Commit Statuses` | Y | Y | Sync commit status between GitHub and Vercel |

### Organization & User Permissions

| Permission | Read | Write | Purpose |
|------------|------|-------|---------|
| `Members` (org) | Y | N | Better team onboarding experience |
| `Email addresses` (user) | Y | N | Associate email with GitHub account |

## System Environment Variables

| Variable | Available At | Description |
|----------|-------------|-------------|
| `VERCEL` | Build + Runtime | Indicates Vercel system env vars are exposed (`1`) |
| `CI` | Build | Indicates CI environment (`1`) |
| `VERCEL_ENV` | Build + Runtime | `production`, `preview`, or `development` |
| `VERCEL_TARGET_ENV` | Build + Runtime | System or custom environment name |
| `VERCEL_URL` | Build + Runtime | Generated deployment URL (no `https://`) |
| `VERCEL_BRANCH_URL` | Build + Runtime | Git branch URL (`*-git-*.vercel.app`) |
| `VERCEL_PROJECT_PRODUCTION_URL` | Build + Runtime | Shortest production custom domain or `vercel.app` |
| `VERCEL_REGION` | Runtime | Region ID where the app runs |
| `VERCEL_DEPLOYMENT_ID` | Build + Runtime | Unique deployment identifier |
| `VERCEL_PROJECT_ID` | Build + Runtime | Unique project identifier |
| `VERCEL_SKEW_PROTECTION_ENABLED` | Build + Runtime | `1` if Skew Protection is enabled |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | Build + Runtime | Protection Bypass for Automation secret |
| `VERCEL_OIDC_TOKEN` | Build | OIDC token when OIDC Federation is enabled |
| `VERCEL_GIT_PROVIDER` | Build + Runtime | `github` |
| `VERCEL_GIT_REPO_SLUG` | Build + Runtime | Repository name |
| `VERCEL_GIT_REPO_OWNER` | Build + Runtime | Repository owner account |
| `VERCEL_GIT_REPO_ID` | Build + Runtime | Repository numeric ID |
| `VERCEL_GIT_COMMIT_REF` | Build + Runtime | Branch name of the triggering commit |
| `VERCEL_GIT_COMMIT_SHA` | Build + Runtime | SHA of the triggering commit |
| `VERCEL_GIT_COMMIT_MESSAGE` | Build + Runtime | Commit message (truncated at 2048 bytes) |
| `VERCEL_GIT_COMMIT_AUTHOR_LOGIN` | Build + Runtime | Commit author username |
| `VERCEL_GIT_COMMIT_AUTHOR_NAME` | Build + Runtime | Commit author full name |
| `VERCEL_GIT_PREVIOUS_SHA` | Build | SHA of last successful deployment (requires Ignored Build Step) |
| `VERCEL_GIT_PULL_REQUEST_ID` | Build + Runtime | PR number triggering the deployment |

## Notes

- Personal account repositories require the Vercel user to be the repository **Owner**.
- Organization repositories require the user to be an **Owner** or **Member** with repository access (Outside Collaborators cannot import/connect).
- Bot comments on PRs and commits can be silenced in **Project Settings → Git → Connected Git Repository**.
- `deployment_status` GitHub webhook events can be disabled in **Project Settings → Git** to reduce noise; migrate to `repository_dispatch` events instead.
- GitHub Enterprise Server requires GitHub Actions integration (`vercel build` + `vercel deploy --prebuilt`).
- Fork PRs require authorization from a team member before deploying (disable with **Git Fork Protection** toggle).

## Select Turbo for One Deployment

Include the exact, case-sensitive marker `#VERCEL_BUILD_MACHINE=TURBO` in the Git commit message to select a Turbo build machine for that deployment only:

```bash
git commit -m "Test this change with Turbo" \
  -m "#VERCEL_BUILD_MACHINE=TURBO"
```

- Supported only for deployments triggered by Vercel's GitHub integration; the GitLab and Bitbucket integrations don't support it
- Applies only to the deployment triggered by that commit; project build machine settings are unchanged. You need permission to update the project's build machine. If Turbo isn't available or you lack permission, Vercel uses the project's normal build machine selection instead of failing; normal Turbo plan eligibility and billing apply

## repository_dispatch Events

Vercel sends `repository_dispatch` events to GitHub when deployment status changes (e.g. `vercel.deployment.success`); the JSON `client_payload` carries deployment details such as `url` and `environment` (read via `github.event.client_payload.url`). When migrating from `deployment_status`, trigger the workflow on `repository_dispatch` with the `vercel.deployment.success` type and take the URL from `client_payload`.

## `github.silent`

The `github.silent` project property is deprecated; if you used it, Vercel adjusts the Git setting for you automatically (silence bot comments in Project Settings → Git).

## Using GitHub Actions (GHES or Custom CI)

```bash
# Preview deployment
vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
vercel build
vercel deploy --prebuilt

# Production deployment
vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
vercel build --prod
vercel deploy --prebuilt --prod
```

## Related

- [git-integration.md](./git-integration.md)
- [environments.md](./environments.md)
