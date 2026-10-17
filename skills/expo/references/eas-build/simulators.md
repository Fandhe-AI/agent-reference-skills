---
source: https://docs.expo.dev/build-reference/simulators/
---

# Build for iOS Simulators

Learn how to configure and install build for iOS simulators when using EAS Build.

## Signature / Usage

A simulator build gives a standalone (independent of Expo Go) version of the app without deploying to TestFlight or needing an Apple Developer account. Set `ios.simulator` to `true` on a build profile in **eas.json**:

```json
{
  "build": {
    "preview": {
      "ios": {
        "simulator": true
      }
    },
    "production": {}
  }
}
```

```sh
eas build -p ios --profile preview
```

### Installing the build on the simulator

When the build completes, the CLI prompts to download and install it on the iOS Simulator (press Y). To choose a build later:

```sh
eas build:run -p ios
```

The command lists available builds (build ID, time elapsed, build number, version number, git commit information; invalid builds are also displayed). If it is a development build, start the dev server with `npx expo start`.

Install the latest build:

```sh
eas build:run -p ios --latest
```

## Notes

- Profile names are arbitrary (`preview`, `local`, `simulator`, ...).
- If you haven't run the iOS Simulator before, follow the iOS Simulator guide first.
- Source modificationDate: July 01, 2024 (fetched 2026-10-17).

## Related

- [Build APKs for Android Emulators and devices](./apk.md)
- [Configure EAS Build with eas.json](./build-eas-json.md)
