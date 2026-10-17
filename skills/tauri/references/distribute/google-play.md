---
source: https://v2.tauri.app/distribute/google-play/
---

# Google Play

Google Play is the Android app distribution service maintained by Google. This guide covers the requirements for publishing your Android app on Google Play.

## Signature / Usage

```sh
cargo tauri android build --aab
```

### Requirements

- A Play Console developer account; register the app on the Play Console website.
- Code signing set up (see sign-android).
- After `tauri android init`, update icons with `tauri icon /path/to/app-icon.png`.

### Upload

The AAB is found in `gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab`. Create a new release and upload it in the Google Play Console.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--aab` | flag | Build an Android App Bundle (recommended for upload) |
| `--apk` | flag | Build APKs for testing or distribution outside the store |
| `--target` | repeatable | Subset of architectures (aarch64, armv7, i686, x86_64); default is all |
| `--split-per-abi` | flag | Individual bundles per target instead of a universal one |
| `bundle > android > versionCode` | config | Custom version code; default derived from `version` as `major*1000000 + minor*1000 + patch` |
| `bundle > android > minSdkVersion` | config | Minimum supported Android version; default is Android 7.0 (Nougat, SDK 24) |

```sh
cargo tauri android build --apk
cargo tauri android build --aab --target aarch64 --target armv7
cargo tauri android build --apk --split-per-abi
```

```json
{
  "bundle": {
    "android": {
      "versionCode": 100
    }
  }
}
```

```json
{
  "bundle": {
    "android": {
      "minSdkVersion": 28
    }
  }
}
```

## Notes

- Tauri uses an Android Studio project under the hood, so official practices for building and publishing Android apps also apply.
- `--split-per-abi` is only useful for testing or distribution outside Google Play; Google Play handles supported architectures for you.
- The first upload must be made manually in the website so it can verify your app signature and bundle identifier. Tauri does not yet automate creating Android releases (Google Play Developer API); the source says it is a work in progress.
- Tauri bundler side only; Android and Play Console publishing procedures belong to the android-build-gradle skill.

## Related

- [sign-android](./sign-android.md)
- [android command](../cli/android.md)
- [bundle-mobile config](../config/bundle-mobile.md)
