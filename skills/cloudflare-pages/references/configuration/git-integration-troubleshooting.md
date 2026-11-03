---
source: https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/
---

# Troubleshooting builds

Meaning and fix for the Git integration banners shown on a Pages project's Deployments page.

## Signature / Usage

GitHub installation settings to check or unsuspend the app:

```txt
https://github.com/settings/installations
https://github.com/organizations/<YOUR_ORGANIZATION_NAME>/settings/installations
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| This repository is being used for a Cloudflare Pages project on a different Cloudflare account. | banner (project creation) | — | One repository cannot be used by separate Cloudflare accounts; delete the Pages projects using it in the other accounts. |
| This project is disconnected from your Git account, this may cause deployments to fail. | banner | — | Reinstall the Git installation; contact support if it persists. |
| Cloudflare Pages is not properly installed on your Git account, this may cause deployments to fail. | banner | — | Reinstall the Git installation; contact support if it persists. |
| The Cloudflare Pages installation has been suspended, this may cause deployments to fail. | banner | — | In GitHub installation settings click **Configure** > scroll down > **Unsuspend**. |
| The project is linked to a repository that no longer exists, this may cause deployments to fail. | banner | — | Deleted: create a new project with an existing repository. Transferred: transfer it back or create a new project. |
| The repository cannot be accessed, this may cause deployments to fail. | banner | — | In installation settings > **Configure**, make sure the repository is under **Repository access**. |
| There is an internal issue with your Cloudflare Pages Git installation. | banner | — | Internal error; try reinstalling, then contact support. |
| GitHub/GitLab is having an incident and push events to Cloudflare are operating in a degraded state. | banner | — | Check the GitHub or GitLab status page and retry later. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- The source links to a "Reinstalling a Git installation" section on the Git integration overview that does not exist there; the reinstall steps are on the GitHub and GitLab integration pages.
- Check the project dashboard for SCM installation warnings when deployments fail.

## Related

- [GitHub integration](./github-integration.md)
- [GitLab integration](./gitlab-integration.md)
- [Git integration](./git-integration.md)
- [Debugging Pages](./debugging-pages.md)
