---
source: https://docs.expo.dev/eas/workflows/reusable-workflows/
---

# Reusable workflows in Expo Workflows

Call one workflow from another to share whole jobs between workflow files.

## Signature / Usage

`.eas/workflows/build.yml` declares `on.workflow_call` and builds the app for one environment (reuses an existing build when one matches the project fingerprint):

```yaml
name: Build

on:
  workflow_call:
    inputs:
      environment:
        type: environment
        required: true
    outputs:
      android_build_id:
        value: ${{ jobs.build_android.outputs.build_id }}
      ios_build_id:
        value: ${{ jobs.build_ios.outputs.build_id }}

jobs:
  fingerprint:
    type: fingerprint
    environment: ${{ inputs.environment }}
  get_android_build:
    needs: [fingerprint]
    type: get-build
    params:
      fingerprint_hash: ${{ needs.fingerprint.outputs.android_fingerprint_hash }}
      platform: android
      profile: ${{ inputs.environment }}
  get_ios_build:
    needs: [fingerprint]
    type: get-build
    params:
      fingerprint_hash: ${{ needs.fingerprint.outputs.ios_fingerprint_hash }}
      platform: ios
      profile: ${{ inputs.environment }}
  build_android:
    needs: [get_android_build]
    if: ${{ !needs.get_android_build.outputs.build_id }}
    type: build
    params:
      platform: android
      profile: ${{ inputs.environment }}
  build_ios:
    needs: [get_ios_build]
    if: ${{ !needs.get_ios_build.outputs.build_id }}
    type: build
    params:
      platform: ios
      profile: ${{ inputs.environment }}
```

`.eas/workflows/release.yml` calls it twice with `uses` and `with`, then submits new production builds:

```yaml
name: Release

on:
  push:
    branches: ['main']

jobs:
  build_preview:
    uses: ./.eas/workflows/build.yml
    with:
      environment: preview
  approve_production:
    needs: [build_preview]
    type: require-approval
  build_production:
    needs: [approve_production]
    uses: ./.eas/workflows/build.yml
    with:
      environment: production
  submit_android:
    needs: [build_production]
    if: ${{ needs.build_production.outputs.android_build_id }}
    type: submit
    params:
      build_id: ${{ needs.build_production.outputs.android_build_id }}
  submit_ios:
    needs: [build_production]
    if: ${{ needs.build_production.outputs.ios_build_id }}
    type: submit
    params:
      build_id: ${{ needs.build_production.outputs.ios_build_id }}
```

## Notes

- A workflow can be called only if it declares `on.workflow_call`. Both files must be in the `.eas/workflows` directory of the same project. The calling job starts the called run and waits for its result.
- Inputs are declared in `on.workflow_call.inputs`, read as `${{ inputs.<input_name> }}`, and set by the calling job in `with`. Outputs are declared in `on.workflow_call.outputs`, evaluated after the called run succeeds, and read by the calling run through the `needs` context of the calling job.
- A called run uses the same commit, Git ref, and `github` context as the run that calls it, and gets its own `inputs` and `workflow` contexts. Environment variables do not carry over: each job in the reusable workflow reads `env` from its own `environment`.
- A called run uses the `run_name` and `concurrency` settings of the reusable workflow file. If its `concurrency.group` matches a run above it in the call chain, the called run does not start and the calling job fails (for example when both workflows use a group built only from `github` values such as `${{ github.ref_name }}`).
- The calling job ends with the status of the called run (success, failure, or canceled), and the called run's errors appear on the calling job. Canceling the calling run also cancels the called run.
- Nesting: calls can be nested up to 4 levels deep; a workflow cannot call itself, directly or through other workflows.
- To share a sequence of steps inside a job instead of whole jobs, use custom functions.
- Distinct from GitHub Actions reusable workflows: this is Expo Workflows YAML (`.eas/workflows/*.yml`). See github-docs for GitHub Actions.
- Source: https://docs.expo.dev/eas/workflows/reusable-workflows/ (docs/pages/eas/workflows/reusable-workflows.mdx at tag expo@58.0.25).

## Related

- [Syntax for Expo Workflows](./workflows-syntax.md)
- [Custom functions in Expo Workflows](./workflows-custom-functions.md)
- [Environment variables in Expo Workflows](./workflows-environment.md)
- [Manage workflow runs](./workflows-manage-runs.md)
