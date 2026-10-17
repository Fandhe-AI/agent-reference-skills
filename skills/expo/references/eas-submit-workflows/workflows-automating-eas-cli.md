---
source: https://docs.expo.dev/eas/workflows/automating-eas-cli/
---

# Automating EAS CLI commands

Automate sequences of EAS CLI commands (build, submit, update) with EAS Workflows.

## Signature / Usage

`eas build --platform ios --profile production` as a workflow (`.eas/workflows/build-ios-production.yml`):

```yaml
name: iOS production build

on:
  push:
    branches: ['main']

jobs:
  build_ios:
    name: Build iOS
    type: build
    params:
      platform: ios
      profile: production
```

`eas submit --platform ios` as a workflow (`.eas/workflows/submit-ios.yml`); the submit job requires the ID of the build to submit:

```yaml
name: Submit iOS app

on:
  push:
    branches: ['main']

jobs:
  build_ios:
    name: Build iOS
    type: build
    params:
      platform: ios
      profile: production
  submit_ios:
    name: Submit iOS
    needs: [build_ios]
    type: submit
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
```

`eas update --auto` as a workflow (`.eas/workflows/publish-update.yml`):

```yaml
name: Publish update

on:
  push:
    branches: ['*']

jobs:
  update:
    name: Update
    type: update
    params:
      branch: ${{ github.ref_name || 'test'}}
```

Run any of them manually:

```sh
eas workflow:run .eas/workflows/build-ios-production.yml
```

## Notes

- A linked GitHub repository is optional; the guide assumes one is linked (project GitHub settings: install the GitHub app, select the matching repository) so workflows trigger on pushes to specific branches.
- To submit an existing build, pass its `build_id` directly to the submit job, or use the `get-build` job to look one up and pass its `build_id` output.
- Parameters select Android builds, other build or submit profiles, specific update branches or channels, and the update message; see the build, submit, and update job parameters in the syntax reference.
- Distinct from GitHub Actions: EAS Workflows YAML is not GitHub Actions syntax. See github-docs for GitHub Actions.
- Source modificationDate: July 13, 2026 (fetched 2026-10-17).

## Related

- [Syntax for EAS Workflows](./workflows-syntax.md)
- [Pre-packaged jobs in EAS Workflows](./workflows-pre-packaged-jobs.md)
- [EAS CLI reference](./eas-cli.md)
