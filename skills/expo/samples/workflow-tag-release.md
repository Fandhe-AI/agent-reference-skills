---
source: https://docs.expo.dev/tutorial/cicd/tag-based-releases/
---

# Tag-Based Production Release Workflow

Run the production workflow only when a `v*.*.*` Git tag is pushed, building natively when the fingerprint changed and publishing an update otherwise.

```yaml .eas/workflows/production.yml
name: Deploy to production

on:
  push:
    tags: ['v*.*.*']

jobs:
  fingerprint:
    name: Fingerprint
    type: fingerprint
    environment: production
  get_android_build:
    name: Check for existing Android build
    needs: [fingerprint]
    type: get-build
    params:
      fingerprint_hash: ${{ needs.fingerprint.outputs.android_fingerprint_hash }}
      profile: production
  get_ios_build:
    name: Check for existing iOS build
    needs: [fingerprint]
    type: get-build
    params:
      fingerprint_hash: ${{ needs.fingerprint.outputs.ios_fingerprint_hash }}
      profile: production
  build_android:
    name: Build Android
    needs: [get_android_build]
    if: ${{ !needs.get_android_build.outputs.build_id }}
    type: build
    params:
      platform: android
      profile: production
  build_ios:
    name: Build iOS
    needs: [get_ios_build]
    if: ${{ !needs.get_ios_build.outputs.build_id }}
    type: build
    params:
      platform: ios
      profile: production
  update_android:
    name: Publish Android update
    needs: [get_android_build]
    if: ${{ needs.get_android_build.outputs.build_id }}
    type: update
    params:
      branch: production
      platform: android
  update_ios:
    name: Publish iOS update
    needs: [get_ios_build]
    if: ${{ needs.get_ios_build.outputs.build_id }}
    type: update
    params:
      branch: production
      platform: ios
```

Exclude release candidates from production:

```yaml .eas/workflows/production.yml
on:
  push:
    tags: ['v*.*.*', '!v*.*.*-rc.*']
```

Cut a release:

```sh
git tag v0.1.0
git push origin main --tags
```

## Notes

- `['v*.*.*']` matches strict three-part versions (recommended); `['v*']` matches any tag starting with `v`. The glob also matches pre-release tags such as `v1.0.0-rc.1`, hence the `!v*.*.*-rc.*` exclusion.
- Run release candidates in a separate workflow with `tags: ['v*.*.*-rc.*']` that reuses `fingerprint`, `get-build` and `build` but omits `update` and `submit`.
- Pushing the workflow change to `main` does not trigger it once the trigger is tag-only.
- Source: https://docs.expo.dev/tutorial/cicd/tag-based-releases/ (fetched 2026-10-17).
