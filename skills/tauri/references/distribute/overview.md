---
source: https://v2.tauri.app/distribute/
---

# Distribute

Tauri provides the tooling you need to distribute your application either to the platform app stores or as platform-specific installers.

## Signature / Usage

Tauri builds your application directly from its CLI via the `build`, `android build` and `ios build` commands.

```sh
npm run tauri build
# or
cargo tauri build
```

By default the `build` command automatically bundles your application for the configured formats. To customize how platform bundles are generated, split the build and bundle steps:

```sh
cargo tauri build --no-bundle
# bundle for distribution outside the macOS App Store
cargo tauri bundle --bundles app,dmg
# bundle for App Store distribution
cargo tauri bundle --bundles app --config src-tauri/tauri.appstore.conf.json
```

### Versioning

Your application version can be defined in `tauri.conf.json > version`, which is the recommended way for managing the app version. If that config value is not set, Tauri uses the `package > version` value from your `src-tauri/Cargo.toml` file instead.

### Distribution targets

| Platform | Formats / services | Pages |
| --- | --- | --- |
| Linux | Debian package, Snap, AppImage, Flatpak, RPM, Arch User Repository (AUR) | [debian](./debian.md), [rpm](./rpm.md), [appimage](./appimage.md), [flatpak](./flatpak.md), [snapcraft](./snapcraft.md), [aur](./aur.md) |
| macOS | App Bundle, App Store, DMG | [macos-application-bundle](./macos-application-bundle.md), [app-store](./app-store.md), [dmg](./dmg.md) |
| Windows | Microsoft Store, Windows installer (MSI / NSIS) | [microsoft-store](./microsoft-store.md), [windows-installer](./windows-installer.md) |
| Android | Google Play | [google-play](./google-play.md) |
| iOS | App Store | [app-store](./app-store.md) |
| Cloud | CrabNebula Cloud | [crabnebula-cloud](./crabnebula-cloud.md) |

### Signing

Code signing enhances the security of your application by applying a digital signature to your application's executables and bundles, validating your identity of the provider of your application. Signing is required on most platforms.

| Platform | Page |
| --- | --- |
| macOS (code signing and notarization) | [sign-macos](./sign-macos.md) |
| Windows | [sign-windows](./sign-windows.md) |
| Linux | [sign-linux](./sign-linux.md) |
| Android | [sign-android](./sign-android.md) |
| iOS | [sign-ios](./sign-ios.md) |

## Notes

- Most platforms require code signing.
- Some platforms have limitations and special cases for the version string; see the individual distribution pages.
- The Flatpak page is not listed in the official overview card grid (the card is commented out in the source), but the page exists at `/distribute/flatpak/`.
- Tauri bundler side only; the official store and signing procedures of each platform belong to the apple-distribution, windows-packaging-publish and android-build-gradle skills.

## Related

- [windows-installer](./windows-installer.md)
- [pipelines-github](./pipelines-github.md)
- [bundle config](../config/bundle-config.md)
- [build command](../cli/build.md)
