---
source: https://docs.expo.dev/build/introduction/
---

# Expo Build

Expo Build is a hosted service for building app binaries for your Expo and React Native projects.

## Signature / Usage

```sh
eas build --platform all
```

Sends the project to Expo Build and produces installable binaries for Android and iOS. Pass `--platform android` or `--platform ios` for one platform. The `eas` commands require EAS CLI.

Expo Workflows integration (`build` job type):

```yaml
jobs:
  build_ios:
    type: build
    params:
      platform: ios
```

```yaml
jobs:
  build:
    type: build
    params:
      platform: all
      profile: ${{ github.ref_name == 'main' && 'production' || 'preview' }}
```

## Notes

- Key features: cloud builds with consistent environments; automatic or custom signing credentials; internal distribution via URL; build profiles in **eas.json** plus Expo Workflows / CI; `--auto-submit` with Expo Submit; first-class `expo-updates` integration; reuse of development builds (`eas build:dev` downloads the existing build when the project fingerprint matches); dependency caching and custom cache paths; Expo Orbit.
- Works with any native project, with or without Expo / React Native, including existing React Native projects.
- Not for debugging native code locally (use local builds or your own tooling).
- `eas build --local` runs builds on your machine.
- Infrastructure: Android builds run on Linux runners hosted in Google Cloud Platform; iOS builds run on macOS runners hosted in Expo's macOS cloud.
- The docs page shows an "Expo Simulators" callout (cloud Android and iOS simulators for you and your agents; https://docs.expo.dev/eas/simulators/get-started/) from 2026-11-12 18:00 UTC; it is not covered by this skill (source: docs/ui/components/SimulatorsLaunchCallout/index.tsx at tag expo@58.0.25).
- The source page also advertises an Expo agent-tooling package; it is out of scope here.
- Source: https://docs.expo.dev/build/introduction/ (docs/pages/build/introduction.mdx at tag expo@58.0.25).

## Related

- [Create your first build](./build-setup.md)
- [Configure Expo Build with eas.json](./build-eas-json.md)
- [Internal distribution](./internal-distribution.md)
- [Run Expo Build locally](./local-builds.md)
- [Expo Build limitations](./limitations.md)
