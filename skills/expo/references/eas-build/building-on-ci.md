---
source: https://docs.expo.dev/build/building-on-ci/
---

# Trigger builds from CI

Learn how to trigger builds on EAS for your app from a CI environment such as GitHub Actions and more.

## Signature / Usage

Trigger a build from any CI:

```sh
npx eas-cli build --platform all --non-interactive --no-wait
```

Authenticate by storing a personal access token in the `EXPO_TOKEN` environment variable in the CI settings.

EAS Workflows (**.eas/workflows/build.yml**):

```yaml
name: Build

on:
  push:
    branches:
      - main

jobs:
  build_android:
    name: Build Android App
    type: build
    params:
      platform: android
  build_ios:
    name: Build iOS App
    type: build
    params:
      platform: ios
```

GitHub Actions (**.github/workflows/eas-build.yml**):

```yaml
name: EAS Build
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    name: Install and build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - name: Setup Expo and EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - name: Install dependencies
        run: npm ci
      - name: Build on EAS
        run: eas build --platform all --non-interactive --no-wait
```

## Options / Props

Optional environment variables for repairing iOS credentials on CI (ASC API key):

| Name | Description |
| --- | --- |
| `EXPO_ASC_API_KEY_PATH` | Path to your ASC API Key **.p8** file, e.g. **/path/to/key/AuthKey_SFB993FB5F.p8**. |
| `EXPO_ASC_KEY_ID` | Key ID of your ASC API Key, e.g. `SFB993FB5F`. |
| `EXPO_ASC_ISSUER_ID` | Issuer ID of your ASC API Key. |
| `EXPO_APPLE_TEAM_ID` | Your Apple Team ID. |
| `EXPO_APPLE_TEAM_TYPE` | Apple Team Type: `IN_HOUSE`, `COMPANY_OR_ORGANIZATION`, or `INDIVIDUAL`. |

## Notes

- Prerequisite: run `eas build -p [all|android|ios]` locally first so interactive configuration (projectId, **eas.json**, `android.packageName` / `ios.bundleIdentifier`, credentials) is available for non-interactive runs.
- `--no-wait` exits the step once the build is triggered; you are not billed for CI time while EAS builds. CI passes only if triggering succeeds. Remove the flag if another CI step must run after build completion.
- For internal distribution builds with ad hoc provisioning on CI, refresh the profile with `--refresh-ad-hoc-provisioning-profile` and `--non-interactive` (`eas build`), or `refresh_ad_hoc_provisioning_profile: true` in the Workflows build job `params`.
- Travis CI, GitLab CI, Bitbucket Pipelines and CircleCI examples on the source page run the same `npx eas-cli build --platform all --non-interactive --no-wait` step after `npm ci` (`apk add --no-cache bash` is used with `node:alpine` images).
- Source modificationDate: July 29, 2026 (fetched 2026-10-17).

## Related

- [Create your first build](./build-setup.md)
- [Internal distribution](./internal-distribution.md)
