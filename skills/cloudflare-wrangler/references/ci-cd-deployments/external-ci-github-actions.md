---
source: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
---

# External CI/CD: GitHub Actions

Deploy Workers from GitHub Actions using the official `cloudflare/wrangler-action`.

## Signature / Usage

Adapted (not in the official docs): added a least-privilege `permissions:` block and pinned actions to commit SHAs; see Notes.

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
        uses: actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803 # v6
      # Run your project's build step, if required
      # - name: Build
      #   run: npm ci && npm run build
      - name: Deploy Worker
        uses: cloudflare/wrangler-action@953926a2e2182532811c01a25e53647d93bf07c0 # v4
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

## Options / Props

Secrets to add to the CI platform:

| Name | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID of the account to deploy the Worker to |
| `CLOUDFLARE_API_TOKEN` | The Cloudflare API token you generated |

Create the API token (dashboard **Account API tokens** > **Create Token**):

| Step | Action |
| --- | --- |
| 1 | Under **Permission policies**, open **Custom** and select **Edit Cloudflare Workers** |
| 2 | Name the token |
| 3 | Scope the token |

## Notes

- Adapted from the official docs: the workflow gains `permissions: contents: read` to limit the default `GITHUB_TOKEN`. It triggers only on pushes to `main`, so secrets are not exposed to fork pull requests; do not switch it to `pull_request_target`.
- Adapted from the official docs: actions pinned to the commit SHAs of their tags as of 2026-11-03 (tags are mutable). The official page shows only the tags (`@v6`, `@v4`).
- GitHub Actions syntax itself: see the github-docs skill.
- External CI/CD is recommended when you use self-hosted GitHub/GitLab or a Git provider other than Artifacts, GitHub, or GitLab; otherwise Workers Builds is the integrated option.
- CI is non-interactive, so Wrangler cannot use `wrangler login`; it requires an API token and account ID.
- Do not store `CLOUDFLARE_API_TOKEN` in the repository; use your CI provider's secret storage. Scope the token to the minimum account and zone resources (e.g. only the account you deploy to).
- The workflow should run `wrangler deploy`; other options such as Terraform, CircleCI, and Jenkins follow a similar setup.

## Related

- [external-ci-gitlab-cicd.md](./external-ci-gitlab-cicd.md)
- [builds-overview.md](./builds-overview.md)
- [previews-examples.md](./previews-examples.md)
- [workers.md](../commands/workers.md)
