---
source: https://docs.expo.dev/tutorial/cicd/preview-builds/
---

# PR Preview Update Workflow

Publish an Expo Update on every pull request and comment on the PR with a link or QR code to test it.

```sh
npx expo install expo-updates
eas update:configure
eas build --profile preview --platform all
```

```yaml .eas/workflows/pr-preview.yml
name: PR Preview

on:
  pull_request:
    branches: ['*']

jobs:
  publish_preview:
    name: Publish PR preview update
    type: update
    environment: preview
    params:
      channel: preview
  comment:
    needs: [publish_preview]
    type: github-comment
```

Publish a preview update on every commit of every branch:

```yaml .eas/workflows/publish-preview-update.yml
name: Publish preview update

on:
  push:
    branches: ['*']

jobs:
  publish_preview_update:
    name: Publish preview update
    type: update
    params:
      branch: ${{ github.ref_name || 'test' }}
```

## Notes

- Reviewers need a preview build that already embeds `expo-updates` and the matching channel from **eas.json**; `eas update:configure` adds the update URL, runtime version and a `channel` per build profile.
- Expo Workflows reads workflow files from the repository's default branch, so push the workflow to `main` before testing.
- The `github-comment` pre-packaged job posts the update link / QR code on the pull request after the `update` job succeeds.
- Expo Workflows YAML is not GitHub Actions syntax; see the github-docs skill for Actions workflows.
- Naming: the docs at tag `expo@58.0.25` call this product "Expo Workflows" (previously "EAS Workflows"); the `eas workflow:*` CLI commands and `.eas/workflows/` paths are unchanged.
- Sources (docs/pages/tutorial/cicd/preview-builds.mdx at tag expo@58.0.25): https://docs.expo.dev/tutorial/cicd/preview-builds/ , https://docs.expo.dev/eas/workflows/examples/publish-preview-update/
