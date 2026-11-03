---
source: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
---

# GitHub integration

Pages GitHub features (preview URLs, commit-message skips, check runs) and managing the Cloudflare Workers & Pages GitHub App.

## Signature / Usage

Skip a deployment by prefixing the commit message (not case sensitive):

```txt
[CI Skip], [CI-Skip], [Skip CI], [Skip-CI], [CF-Pages-Skip]
```

GitHub App installation settings pages:

```txt
https://github.com/settings/installations
https://github.com/organizations/<YOUR_ORGANIZATION_NAME>/settings/installations
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | setting | first branch pushed | Change under **Settings** > **Builds** > **Branch control** > **Production branch**. |
| Preview branch | setting | — | Choose which preview branches deploy; **Custom branches** includes or excludes branches. |
| Preview URLs | feature | — | A unique preview URL per pull request, updated on each push; not created for pull requests from forks. |
| Check runs | feature | — | Build status in GitHub check runs; absent when a build is skipped (CI Skip, build watch paths, branch controls). |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- The app is named **Cloudflare Workers and Pages** and is shared between Workers and Pages projects (the debugging page calls it **Cloudflare Pages**).
- Adding the installation to an organization requires being an owner or having the GitHub Apps Manager role. A GitHub account should point to only one Cloudflare account; limit the app to **Only select repositories** that you build with Pages.
- Remove access to one repository via **Repository access**; remove all access with **Uninstall "Cloudflare Workers and Pages"**. New builds are disabled but earlier deployments keep being hosted. To only disable automatic builds, use the disconnect-builds steps in the Workers Builds docs (https://developers.cloudflare.com/workers/ci-cd/builds/#disconnecting-builds).
- Reinstall (when the repository cannot be accessed): open **Settings** > **Builds** > **Manage**, or the installation settings above; **Uninstall**; then **Create application** > **Pages** > **Connect to Git** > **+ Add account** > **Install & Authorize**; retry the deployment.
- One repository can feed several projects (monorepo), each with its own check run.

## Related

- [Git integration](./git-integration.md)
- [Git integration troubleshooting](./git-integration-troubleshooting.md)
- [Preview deployments](./preview-deployments.md)
- [Monorepos](./monorepos.md)
