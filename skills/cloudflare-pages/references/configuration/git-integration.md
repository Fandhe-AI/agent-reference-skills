---
source: https://developers.cloudflare.com/pages/configuration/git-integration/
---

# Git integration

Connect a GitHub or GitLab repository to a Pages project for automatic builds, preview URLs and status checks on every push.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/ (skip a build by prefixing the commit message with one of these flags; not case sensitive):

```txt
[CI Skip], [CI-Skip], [Skip CI], [Skip-CI], [CF-Pages-Skip]
```

Disable automatic deployments (keep the Git project but deploy with Wrangler): Pages project > **Build** > edit **Branch control** > turn off **Enable automatic production branch deployments**; set the Preview branch to **None (Disable automatic branch deployments)**.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| GitHub | provider | — | Supported (github.com). |
| GitLab | provider | — | Supported (gitlab.com). |
| Self-hosted GitHub / GitLab | provider | — | Not supported. |
| Other providers (for example Bitbucket) | provider | — | Use a Direct Upload project with a CI/CD provider and Wrangler. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). Workers also supports Git integrations through Workers Builds (https://developers.cloudflare.com/workers/ci-cd/builds/).
- A Git-integrated project cannot be switched to Direct Upload later.
- With a Git connection Cloudflare also provides preview deployments for custom branches, preview URLs in pull requests, build and deployment status checks, and skipping builds through a commit message.
- Manage the installation under the Pages project > **Settings** > **Builds** > **Manage** (Git Repository). Reinstall steps are on the GitHub and GitLab pages.
- Check installations at https://github.com/settings/installations or https://gitlab.com/-/profile/applications.

## Related

- [GitHub integration](./github-integration.md)
- [GitLab integration](./gitlab-integration.md)
- [Git integration troubleshooting](./git-integration-troubleshooting.md)
- [Branch deployment controls](./branch-build-controls.md)
