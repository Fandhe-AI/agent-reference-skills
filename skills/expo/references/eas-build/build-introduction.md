---
source: https://docs.expo.dev/build/introduction/
---

# EAS Build

EAS Build is a hosted service for building app binaries for your Expo and React Native projects.

## Signature / Usage

```sh
eas build --platform all
```

Sends the project to EAS Build and produces installable binaries for Android and iOS. Pass `--platform android` or `--platform ios` for one platform. The `eas` commands require EAS CLI.

EAS Workflows integration (`build` job type):

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

- Key features: cloud builds with consistent environments; automatic or custom signing credentials; internal distribution via URL; build profiles in **eas.json** plus EAS Workflows / CI; `--auto-submit` with EAS Submit; first-class `expo-updates` integration; reuse of development builds (`eas build:dev` downloads the existing build when the project fingerprint matches); dependency caching and custom cache paths; Expo Orbit.
- Works with any native project, with or without Expo / React Native, including existing React Native projects.
- Not for debugging native code locally (use local builds or your own tooling).
- `eas build --local` runs builds on your machine.
- Infrastructure: Android builds run on Linux runners hosted in Google Cloud Platform; iOS builds run on macOS runners hosted in Expo's macOS cloud.
- The source page also advertises an Expo agent-tooling package; it is out of scope here.
- Source modificationDate: July 22, 2026 (fetched 2026-10-17).

## Related

- [Create your first build](./build-setup.md)
- [Configure EAS Build with eas.json](./build-eas-json.md)
- [Internal distribution](./internal-distribution.md)
- [Run EAS Build locally](./local-builds.md)
- [EAS Build limitations](./limitations.md)
