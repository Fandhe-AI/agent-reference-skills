---
source: https://developers.cloudflare.com/workers/previews/examples/
---

# Preview CI Examples

Create Previews from Workers Builds, GitHub Actions, or another CI system by running `npx wrangler preview` directly.

## Signature / Usage

GitHub Actions workflow creating one Preview per pull request and commenting its URL (`.github/workflows/preview.yml`):

```yaml
name: Preview

on:
  pull_request:
    types: [opened, synchronize, reopened, closed]

permissions:
  contents: read
  pull-requests: write

jobs:
  preview:
    if: github.event.action != 'closed'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - id: preview
        name: Create or update Preview
        run: |
          set -o pipefail
          output="$(npx wrangler preview --name "pr-${{ github.event.pull_request.number }}" --json)"
          printf '%s\n' "$output"
          preview_url="$(printf '%s' "$output" | jq -er '.preview.urls[0]')"
          echo "preview_url=$preview_url" >> "$GITHUB_OUTPUT"
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      - name: Comment Preview URL
        run: gh pr comment "${{ github.event.pull_request.number }}" --body "Preview: ${{ steps.preview.outputs.preview_url }}"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Cleanup job (add under `jobs`):

```yaml
cleanup:
  if: github.event.action == 'closed'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Delete Preview
      run: npx wrangler preview delete --name "pr-${{ github.event.pull_request.number }}" --skip-confirmation
      env:
        CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

Probe step:

```yaml
- name: Probe Preview
  run: curl --fail --show-error --silent "$PREVIEW_URL/api/health"
  env:
    PREVIEW_URL: ${{ steps.preview.outputs.preview_url }}
```

Screenshot step:

```yaml
- name: Capture Preview screenshot
  run: |
    npx --yes playwright install --with-deps chromium
    npx --yes playwright screenshot "$PREVIEW_URL" preview.png
  env:
    PREVIEW_URL: ${{ steps.preview.outputs.preview_url }}

- uses: actions/upload-artifact@v4
  with:
    name: preview-screenshot
    path: preview.png
```

Repository secrets, monorepo, and other CI:

```sh
gh auth login
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
```

```sh
cd workers/api && npx wrangler preview --name "pr-123"
cd ../web && npx wrangler preview --name "pr-123"
```

```sh
npx wrangler preview --name "$BRANCH_NAME" --json
```

## Notes

- Pin every `uses:` (`actions/checkout@v4`, `actions/upload-artifact@v4`) to a full commit SHA (e.g. `actions/checkout@<sha> # v4`) before use; tags are mutable. The workflow already sets `permissions:` (`contents: read`, `pull-requests: write`) as in the official page.
- Fork-PR exposure: the `pull_request` workflow passes `CLOUDFLARE_API_TOKEN` to `npx wrangler preview`, which runs code from the PR. Forked PRs do not receive secrets by default; never switch to `pull_request_target`, and keep a same-repository guard such as `if: github.event.pull_request.head.repo.full_name == github.repository` on the jobs so fork PRs never receive secrets.
- GitHub Actions syntax itself: see the github-docs skill.
- Workers Builds: enable Preview Builds and confirm the Preview command is `npx wrangler preview`; it comments the Preview URL on GitHub/GitLab PRs.
- The API token needs permission to edit Workers Scripts and the resources used by the Preview. Repository secrets are unavailable to forked PRs by default; before exposing credentials, verify `github.event.pull_request.head.repo.full_name == github.repository`.
- Add install/build steps before the Preview step. GitHub-hosted Ubuntu runners include `jq`. To update one comment, add `--edit-last --create-if-none` to `gh pr comment`.
- Replace `/api/health` with a route that verifies your Worker; on failure use Workers Observability. For hosted browser checks use the Browser Run screenshot endpoint.
- `cloudflare/wrangler-action` is an alternative wrapper that exposes Preview URLs as outputs and can create a GitHub Deployment.
- Preview names are scoped to a Worker, so each monorepo Worker can use `pr-123`. Service bindings between these Previews resolve to the bound Worker's production deployment.

## Related

- [previews-overview.md](./previews-overview.md)
- [previews-resources.md](./previews-resources.md)
- [previews-test-and-debug.md](./previews-test-and-debug.md)
- [external-ci-github-actions.md](./external-ci-github-actions.md)
