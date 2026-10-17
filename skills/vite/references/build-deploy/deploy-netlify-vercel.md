---
source: https://vite.dev/guide/static-deploy#netlify
---

# Netlify / Vercel

Deploy the Vite static build to Netlify or Vercel via CLI or Git integration.

## Signature / Usage

```bash
# Netlify CLI
npm install -g netlify-cli
netlify init
netlify deploy
netlify deploy --prod

# Vercel CLI
npm i -g vercel
vercel
```

## Notes

- Netlify CLI: install via `npm install -g netlify-cli`, create a site with `netlify init`, deploy with `netlify deploy`. The CLI shares a preview URL; for production use the `prod` flag: `netlify deploy --prod`.
- Netlify with Git: push to a git repository (GitHub, GitLab, BitBucket, Azure DevOps), import the project at https://app.netlify.com/start, choose the branch and output directory and set environment variables if applicable, then click Deploy. Subsequent pushes to non-production branches and pull requests generate Preview Deployments; changes to the Production Branch (commonly "main") result in a Production Deployment.
- Vercel CLI: install via `npm i -g vercel` and run `vercel`. Vercel detects that you are using Vite and enables the correct settings.
- Vercel with Git: push to GitHub / GitLab / Bitbucket, import the Vite project at https://vercel.com/new; Vercel detects Vite and enables the correct settings. Subsequent branch pushes generate Preview Deployments and Production Branch changes result in a Production Deployment.
- This page covers only the Vite-side steps. The Vercel platform itself (projects, functions, domains, config) is covered by the vercel skill.

## Related

- [Deploying a Static Site](./static-deploy-overview.md)
- [Cloudflare / Google Firebase](./deploy-cloudflare-firebase.md)
