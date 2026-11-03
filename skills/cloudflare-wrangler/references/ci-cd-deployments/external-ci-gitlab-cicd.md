---
source: https://developers.cloudflare.com/workers/ci-cd/external-cicd/gitlab-cicd/
---

# External CI/CD: GitLab CI/CD

Deploy Workers from GitLab Pipelines using Wrangler with an API token and account ID. Also covers the External CI/CD landing page.

## Signature / Usage

The official page has no code blocks; it links to a GitLab blog example pipeline and says to replace `npm run deploy` under the `script` key with `npx wrangler deploy`. The inline code from the page, verbatim:

```text
npm run deploy
npx wrangler deploy
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as CI secrets, and make the pipeline run `wrangler deploy`.

## Options / Props

CI secrets:

| Name | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID of the account to deploy the Worker to |
| `CLOUDFLARE_API_TOKEN` | The Cloudflare API token you generated |

## Notes

- Authentication: create a token via dashboard **Account API tokens** > **Create Token** > **Custom** > **Edit Cloudflare Workers**; scope it narrowly. Wrangler cannot use interactive `wrangler login` in CI.
- Do not commit `CLOUDFLARE_API_TOKEN`; use GitLab CI/CD variables/secrets.
- Example pipeline: GitLab's blog post "deploy-remix-with-gitlab-and-cloudflare" (replace `npm run deploy` with `npx wrangler deploy`).
- External CI/CD landing page: use it instead of Workers Builds if you prefer an existing provider; guides exist for GitHub Actions and GitLab CI/CD. Terraform, CircleCI, Jenkins, etc. follow a similar setup.

## Related

- [external-ci-github-actions.md](./external-ci-github-actions.md)
- [builds-overview.md](./builds-overview.md)
- [workers.md](../commands/workers.md)
