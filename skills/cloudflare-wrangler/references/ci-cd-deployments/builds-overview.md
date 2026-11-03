---
source: https://developers.cloudflare.com/workers/ci-cd/builds/
---

# Workers Builds Overview

Workers Builds is Cloudflare's native CI/CD: the Git integration connects a Worker to a repository hosted by Artifacts, GitHub, or GitLab and builds and deploys on push. Also covers CI/CD choice, automatic pull requests, and limits.

## Signature / Usage

Pick Workers Builds for a fully integrated solution (Artifacts, GitHub, GitLab). Use external CI/CD providers if you have a self-hosted GitHub/GitLab instance (not supported by Git integration) or use another Git provider.

Connect a new Worker: dashboard **Workers & Pages** > **Create application** > **Artifacts**, **GitHub**, or **GitLab** > authenticate > select repository > configure > **Save and Deploy**.

Connect an existing Worker: Worker > **Settings** > **Builds** > **Connect**; push a commit to trigger a build.

Disconnect: **Settings** > **Builds** > **Disconnect**. To keep builds but not promote them to an active deployment, set the deploy command to `npx wrangler versions upload`.

Snippet taken from https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/#trigger-a-deploy-hook.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/<DEPLOY_HOOK_ID>"
```

## Options / Props

Limits (from the Limits & pricing page):

| Metric | Free plan | Paid plans |
| --- | --- | --- |
| **Build minutes** | 3,000 per month | 6,000 per month (then, +$0.005 per minute) |
| **Concurrent builds** | 1 | 6 |
| **Build timeout** | 20 minutes | 20 minutes |
| **Deploy Hooks** | 10/min per Worker, 100/min per account | 10/min per Worker, 100/min per account |
| **CPU** | 2 vCPU | 4 vCPU |
| **Memory** | 8 GB | 8 GB |
| **Disk space** | 20 GB | 20 GB |
| **Environment variables** | 64 | 64 |
| **Size per environment variable** | 5 KB | 5 KB |
| **Build and build log retention** | 90 days | 90 days |

## Notes

- The Worker name in the dashboard must match `name` in the Wrangler configuration file in the root directory, or the build fails (see `builds-troubleshoot.md`).
- Repositories without a Wrangler configuration file: `wrangler deploy` triggers autoconfig, which detects the framework and opens a configuration pull request (not supported for Artifacts repositories). A preview deployment is generated in the PR. The PR is only created when the deploy command is `npx wrangler deploy`; with a custom deploy command autoconfig still runs but no PR is created. Merging the PR avoids building twice on every build, and Workers Builds updates build/deploy commands if they differ from the detected settings.
- Configuration PR may change: `wrangler.jsonc`, framework adapter, framework config, `package.json` (scripts `deploy`, `preview`, `cf-typegen` plus dependencies), lock file, `.gitignore` (`.wrangler`, `.dev.vars*`), `.assetsignore`. PR description lists detected settings (framework, build, deploy, version command), a preview link, and next steps.
- Name conflict PR: created when the dashboard Worker name differs from `name` in the Wrangler configuration; it updates `name` to match the dashboard.
- Builds and logs are retained 90 days. Production branch builds create a new version; if configured to deploy, it is promoted to the Active Deployment. Preview builds create or update a Preview (not Worker versions, active deployments, or gradual deployments).
- Workers with Containers: use `wrangler deploy` on the production branch so images and instances update; `wrangler versions upload` in preview builds does not update container images or instances.
- Builds running `wrangler versions upload` create versions and Version URLs, which differ from Previews (branch-oriented, can use Preview-specific settings).
- Versions and logs created by a build are not removed after retention; you can still roll back to them.

## Related

- [builds-configuration.md](./builds-configuration.md)
- [builds-git-integration.md](./builds-git-integration.md)
- [builds-deploy-hooks.md](./builds-deploy-hooks.md)
- [builds-troubleshoot.md](./builds-troubleshoot.md)
- [external-ci-github-actions.md](./external-ci-github-actions.md)
- [previews-overview.md](./previews-overview.md)
- [versions-overview.md](./versions-overview.md)
