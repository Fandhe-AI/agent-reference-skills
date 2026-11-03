---
source: https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/
---

# Workers Builds Git Integration

Connect Artifacts, GitHub, GitLab, or Cursor Origin repositories to a Worker. Also covers the Artifacts, GitHub, GitLab, and Cursor Origin integration pages.

## Signature / Usage

Prerequisite IDs for the Builds API (GitHub), taken from https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/#prerequisites.

```bash
curl -s "https://api.github.com/users/<GITHUB_USERNAME>" | jq '.id'
curl -s "https://api.github.com/repos/<GITHUB_USERNAME>/<REPO_NAME>" | jq '.id'
```

Manage an installation: **Workers & Pages** > Worker > **Settings** > **Builds** > **Git Repository** > **Manage**.

## Options / Props

| Provider | Build feedback in provider | Notes |
| --- | --- | --- |
| Artifacts | Dashboard only | Requires Artifacts Read and Artifacts Edit; only `main` is supported as production branch; no automatic PRs |
| GitHub | Pull request comment, check runs | Cloudflare Workers & Pages GitHub App |
| GitLab | Merge request comment, commit statuses | Shared with Pages; revoke via Authorized Applications |
| Cursor Origin | Pull request comment, check runs | Install the Cloudflare app in Cursor |

Reinstall URLs (GitHub):

| **Individual** | `https://github.com/settings/installations` |
| --- | --- |
| **Organization** | `https://github.com/organizations/<YOUR_ORGANIZATION_NAME>/settings/installations` |

## Notes

- Self-hosted GitHub/GitLab is not supported; for other providers (e.g. Bitbucket) use an external CI/CD provider and Wrangler `deploy`.
- Artifacts: push the project (source and configuration) before connecting; an empty repo connects but the first build fails. New Worker: **Create application** > **Continue with Artifacts** > namespace > repository > review project name, deploy command, Preview command > optional build command > optional **Advanced settings** > **Path** > **Deploy**. Existing Worker: **Settings** > **Builds** > **Connect** > **Git connection** dropdown > repository > review commands (confirm Wrangler config targets the existing Worker) > save > push. Connecting does not copy the existing Worker's source. Preview builds: **Settings** > **Builds** > **Previews Base** > **Builds for Preview branches**. To change repository, disconnect and reconnect; existing deployments keep serving.
- GitHub features: PR comment with build status and, for `wrangler preview` builds, a Preview URL (same URL updated on later pushes; each deployment also gets an immutable Deployment URL); check runs per build (Details show Build ID and Script). With build watch paths only Workers that trigger a build get a check run.
- GitHub access: authorizing an organization requires owner or GitHub Apps Manager role. A GitHub account should only point to one Cloudflare account; limit the app to **Only select repositories**. Uninstalling the "Cloudflare Workers and Pages" app revokes access to all repositories and disables new builds (previous deployments keep running). To only stop automatic builds, disconnect the repository. Reinstall: uninstall the app, then dashboard **Create application** > **Pages** > **Connect to Git** > **+ Add account** > **Install & Authorize**.
- GitLab features: merge request comment (with Preview URL for `wrangler preview` builds) and commit statuses (**Build** > **Pipelines**). Existing GitLab connections must manually enable `Merge request events` in the project's Webhooks settings; new connections are configured automatically. Authorizing gives access to all groups/namespaces your GitLab account can access. Revoke the "Cloudflare Pages" application in Authorized Applications (shared with Pages); reinstall by revoking and repeating the connect flow.
- Cursor Origin: install the Cloudflare app at the Cursor codebase settings page, choose the Origin owner, grant all or selected repositories. Removing a repository or uninstalling disables new builds (previous deployments continue). Reinstall to fix access problems, then retry the build.

## Related

- [builds-overview.md](./builds-overview.md)
- [builds-branches-and-paths.md](./builds-branches-and-paths.md)
- [builds-troubleshoot.md](./builds-troubleshoot.md)
- [external-ci-github-actions.md](./external-ci-github-actions.md)
