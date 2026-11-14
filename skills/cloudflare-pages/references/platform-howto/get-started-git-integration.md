---
source: https://developers.cloudflare.com/pages/get-started/git-integration/
---

# Get started with Git integration

Deploy a first Pages site by connecting a GitHub or GitLab repository.

## Signature / Usage

Dashboard: **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**, pick GitHub or GitLab, select the repository, **Install & Authorize** > **Begin setup**, then configure and **Save and Deploy**.

Snippet taken from https://developers.cloudflare.com/pages/get-started/c3/ (generate a project to push to a Git repository, answering `no` to the deploy prompt):

```
npm create cloudflare@latest -- --platform=pages
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Project name | string | Git project name | Used to generate the project hostname. |
| Production branch | branch | — | Branch for the production deploy (usually `main` or `master`); all other branches are previews. At least one branch must be pushed first. |
| Framework preset | preset | — | Fills in build command and output directory; no framework is required. |
| Build command | string | — | Leave blank when no build step is needed. |
| Build output directory | path | — | Contents are uploaded as the website. |
| Root directory (advanced) | path | repository root | Where the build pipeline, including install, starts. |
| Environment variables | key-value pairs | — | Provided to the build; editable later. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- A Git-integrated project cannot be switched to Direct Upload later, but automatic deployments can be disabled and Wrangler used.
- The GitHub repository list only includes repositories that your GitHub user can access (see the GitHub integration page, repository access).
- Source: https://developers.cloudflare.com/pages/get-started/git-integration/ (fetched 2026-11-14, cloudflare-docs 34d908a)
- GitLab sign-in grants Pages access to all repositories on your account and other members of a multi-user Cloudflare account can deploy them; the **Maintainer** role or higher is required. Public and private repositories are supported.
- DNS errors on the first visit may be propagation delay; wait or try another device or network.
- Delete a project in **Settings** > **Delete project**. With a custom domain, delete the CNAME record first, otherwise DNS keeps pointing at a project that no longer exists.
- Advanced project settings (name, Git configuration, build command, directory, variables) are under **Settings**.
- The page says to leave **Build command** blank without a framework, while the build configuration page also suggests `exit 0` when not using a preset.

## Related

- [GitHub integration](../configuration/github-integration.md)
- [Build configuration](../configuration/build-configuration.md)
- [Custom domains](../configuration/custom-domains.md)
