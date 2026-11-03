---
source: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
---

# Deploy a Worker with GitHub Actions

Deploy on every push to `main` using the official `cloudflare/wrangler-action`.

Adapted (not in the official docs): added a least-privilege `permissions:` block; see Notes.

```yaml
name: Deploy Worker
on:
  push:
    branches:
      - main
permissions:
  contents: read
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      # Run your project's build step, if required
      # - name: Build
      #   run: npm ci && npm run build
      - name: Deploy Worker
        uses: cloudflare/wrangler-action@v4
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

## Notes

- Add `CLOUDFLARE_API_TOKEN` (token with the "Edit Cloudflare Workers" permission, scoped to one account) and `CLOUDFLARE_ACCOUNT_ID` as repository secrets; never commit the token.
- Adapted from the official docs: the official workflow has no `permissions:` block; `contents: read` limits the default `GITHUB_TOKEN`. The workflow triggers only on pushes to `main`, so repository secrets are not exposed to fork pull requests; do not switch it to `pull_request_target` or deploy fork code with these secrets.
- GitLab: use the same two secrets and replace `npm run deploy` with `npx wrangler deploy` in the pipeline `script`.
- Workflow syntax itself (triggers, secrets, jobs) belongs to the `github-docs` skill.
- See [../references/ci-cd-deployments/README.md](../references/ci-cd-deployments/README.md).
