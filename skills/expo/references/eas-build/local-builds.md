---
source: https://docs.expo.dev/build-reference/local-builds/
---

# Run EAS Build locally with local flag

Learn how to use EAS Build locally on your machine or a custom infrastructure using the --local flag.

## Signature / Usage

Run the same build process that is typically run on the EAS Build servers directly on your machine. Useful for debugging build failures that happen on cloud builds.

```sh
eas build --platform android --local
# or
eas build --platform ios --local
```

Prerequisite: run `eas login`, or set `EXPO_TOKEN` using token-based authentication.

## Options / Props

Environment variables for debugging local builds:

| Name | Type | Description |
| --- | --- | --- |
| `EAS_LOCAL_BUILD_SKIP_CLEANUP` | `1` | Set to disable cleaning up the working directory after the build process is finished. |
| `EAS_LOCAL_BUILD_WORKINGDIR` | path | Working directory for the build process. By default it is somewhere (platform dependent) in the **/tmp** directory. |
| `EAS_LOCAL_BUILD_ARTIFACTS_DIR` | path | Directory where artifacts are copied after a successful build. By default, files are copied to the current directory. |

## Notes

- Use cases: debugging build failures on EAS servers; company policies that restrict third-party CI/CD services. With local builds the only communication with EAS servers is to make sure the project `@account/slug` exists and, with managed credentials, to download them.
- With `EAS_LOCAL_BUILD_SKIP_CLEANUP` and `EAS_LOCAL_BUILD_WORKINGDIR` on iOS, inspect the `logs` subdirectory of the working directory for Xcode logs.
- Limitations:
  - Only a specific platform can be built (option `all` is disabled).
  - Fields `node`, `yarn`, `fastlane`, `cocoapods`, `ndk`, `image` in **eas.json** are ignored.
  - Caching is not supported.
  - EAS environment variables with "Secret" visibility are not supported (set them in your local environment instead).
  - You must install Node.js and your package manager (Bun, npm, pnpm, or Yarn), fastlane (iOS only), CocoaPods (iOS only), and the Android SDK and NDK.
  - On Windows, WSL can be used, but Windows is not officially tested or supported for local builds (macOS and Linux are supported).
- For local development compilation use `npx expo run:android` or `npx expo run:ios`; those are different procedures from `eas build --local`.
- Source modificationDate: October 13, 2026 (fetched 2026-10-17).

## Related

- [Configure EAS Build with eas.json](./build-eas-json.md)
- [Cache dependencies](./caching.md)
- [Using local credentials](./local-credentials.md)
