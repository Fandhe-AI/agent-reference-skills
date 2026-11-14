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

Authorized GitHub Apps page (revoke authorization to switch GitHub users):

```txt
https://github.com/settings/apps/authorizations
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
- Install and authorize are separate steps on separate GitHub settings tabs. Installing gives Cloudflare access to repositories on a GitHub account or organization (done by an owner or a GitHub App manager; choose **All repositories** or **Only select repositories**; find it under Installed GitHub Apps; undo with **Configure** > **Uninstall**). Authorizing tells Cloudflare who you are on GitHub, once per person who connects a repository (find it under Authorized GitHub Apps; undo with **Revoke**). To install on another account or organization, select **Add GitHub account** when you connect a repository.
- Repository access: when connecting a repository you only see the GitHub accounts and repositories your own GitHub user can access. The first connection sends you to GitHub to authorize the app, even if someone else on your Cloudflare account already connected GitHub. The account list shows your own account and organizations where you can access at least one repository and the app is installed; accounts of other users are not listed even if they gave you access to one of their repositories. Existing repository connections keep building. To switch GitHub users, revoke the app on the Authorized GitHub Apps page and connect again.
- Source: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/ (fetched 2026-11-14, cloudflare-docs 34d908a)
- One repository can feed several projects (monorepo), each with its own check run.

## Related

- [Git integration](./git-integration.md)
- [Git integration troubleshooting](./git-integration-troubleshooting.md)
- [Preview deployments](./preview-deployments.md)
- [Monorepos](./monorepos.md)
