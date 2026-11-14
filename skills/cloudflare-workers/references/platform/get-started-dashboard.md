---
source: https://developers.cloudflare.com/workers/get-started/dashboard/
---

# Get started: Dashboard

Create and deploy a Worker from the Cloudflare dashboard, then continue locally with Git and Wrangler. Also covers Templates.

## Signature / Usage

```bash
# clone your repository locally
git clone <git repo URL>

# make sure you are in the root directory
cd <directory>
```

```bash
# adds the files to git tracking
git add .

# commits the changes
git commit -m "your message"

# push the changes to your Git provider
git push origin main
```

## Notes

- Steps: dashboard **Workers & Pages** > **Create application** (choose a production-ready template, import an existing Git repository, or let Cloudflare clone a public repository); connect a Git provider, configure the project, **Deploy**; Cloudflare builds and deploys, previewing at the `workers.dev` subdomain.
- Dashboard-created apps are set up with Git; pushing triggers builds. Preview locally with Wrangler.
- Templates (https://developers.cloudflare.com/workers/get-started/quickstarts/) are GitHub repositories designed as starting points; browse and deploy them from the dashboard templates page.
- The Playground (see playground.md) is the zero-setup way to experiment.
- Prerequisite: a Cloudflare account.
- Spending: the next steps now point to setting a spending limit or email alert to help control Workers usage costs across your account; see [spend-management.md](./spend-management.md).
- Source: https://developers.cloudflare.com/workers/get-started/dashboard/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [get-started-cli.md](./get-started-cli.md)
- [playground.md](./playground.md)
- [deploy-buttons.md](./deploy-buttons.md)
