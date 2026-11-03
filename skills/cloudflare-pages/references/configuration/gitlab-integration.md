---
source: https://developers.cloudflare.com/pages/configuration/git-integration/gitlab-integration/
---

# GitLab integration

Pages GitLab features (commit statuses, preview URLs, commit-message skips) and managing the authorized application.

## Signature / Usage

Skip a deployment by prefixing the commit message (not case sensitive):

```txt
[CI Skip], [CI-Skip], [Skip CI], [Skip-CI], [CF-Pages-Skip]
```

Manage or revoke the application at the GitLab Authorized Applications page:

```txt
https://gitlab.com/-/profile/applications
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | setting | first branch pushed | Change under **Settings** > **Builds** > **Branch control** > **Production branch**. |
| Preview branch | setting | — | Choose which preview branches deploy. |
| Commit status | feature | — | Shown next to a commit or under **Build** > **Pipelines**; select it to see the preview URL. Absent when a build is skipped. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Authorizing gives Pages access to the organizations, groups and namespaces your GitLab account can reach; access to those is managed in GitLab. Signing in grants access to all repositories on the account and, for a multi-user Cloudflare account, other members can deploy them. The **Maintainer** role or higher is required.
- Revoke by selecting **Revoke** on the application in Authorized Applications. The application is shared between Workers and Pages; revoking disables new builds for both, previous deployments keep being served.
- Reinstall: **Revoke** the installation, then **Create application** > **Pages** > **Connect to Git** > **GitLab** tab > **+ Add account** > **Authorize**; retry the deployment.

## Related

- [Git integration](./git-integration.md)
- [Git integration troubleshooting](./git-integration-troubleshooting.md)
- [GitHub integration](./github-integration.md)
