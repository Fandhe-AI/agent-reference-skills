---
source: https://v2.tauri.app/distribute/app-store/
---

# App Store

The Apple App Store is the app marketplace maintained by Apple. You can distribute your Tauri app targeting macOS and iOS via this App Store. This guide only covers details for distributing apps directly to the App Store.

## Signature / Usage

macOS (build the app bundle, create a signed `.pkg`, upload with `altool`):

```sh
cargo tauri build --bundles app --target universal-apple-darwin
xcrun productbuild --sign "<certificate signing identity>" --component "target/universal-apple-darwin/release/bundle/macos/$APPNAME.app" /Applications "$APPNAME.pkg"
xcrun altool --upload-app --type macos --file "$APPNAME.pkg" --apiKey $APPLE_API_KEY_ID --apiIssuer $APPLE_API_ISSUER
```

iOS:

```sh
cargo tauri ios build --export-method app-store-connect
xcrun altool --upload-app --type ios --file "src-tauri/gen/apple/build/arm64/$APPNAME.ipa" --apiKey $APPLE_API_KEY_ID --apiIssuer $APPLE_API_ISSUER
```

### Requirements

- Enroll in the Apple Developer program.
- Set up code signing for macOS and iOS.
- Register your app in App Store Connect. The _Bundle ID_ field **must** match `tauri.conf.json > identifier`.
- Running on a macOS machine is a requirement.

### Changing App Icon

After running `tauri ios init`, use `tauri icon`. `--ios-color` defines the background color for the iOS icons.

```sh
cargo tauri icon /path/to/app-icon.png --ios-color '#fff'
```

### Version

Tauri derives `CFBundleVersion` from `tauri.conf.json > version`. Set a custom value in `bundle > iOS > bundleVersion` or `bundle > macOS > bundleVersion`:

```json
{
  "bundle": {
    "iOS": {
      "bundleVersion": "100"
    }
  }
}
```

Tauri leverages Xcode for the iOS app, so you can archive and distribute from Xcode instead of the Tauri CLI. Open the project with:

```sh
cargo tauri ios build --open
```

### macOS setup

Separate config file applied only for App Store builds (`src-tauri/tauri.appstore.conf.json`):

```json
{
  "bundle": {
    "macOS": {
      "entitlements": "./Entitlements.plist",
      "files": {
        "embedded.provisionprofile": "path/to/profile-name.provisionprofile"
      }
    }
  }
}
```

```sh
cargo tauri build --no-bundle --target universal-apple-darwin
cargo tauri bundle --bundles app --target universal-apple-darwin --config src-tauri/tauri.appstore.conf.json
```

Required configuration:

| Item | Details |
| --- | --- |
| Category | `bundle > category` must be defined, e.g. `"category": "Utility"` |
| Provisioning profile | Create an App ID whose "Bundle ID" matches `identifier`; create a "Mac App Store Connect" profile linked to your signing certificate; include it via `bundle > macOS > files` as `embedded.provisionprofile` |
| Info.plist | Declare encryption export compliance in `src-tauri/Info.plist` |
| Entitlements | App Sandbox capability plus App ID and Team ID, in `src-tauri/Entitlements.plist`, referenced by `bundle > macOS > entitlements` |

`src-tauri/Info.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>ITSAppUsesNonExemptEncryption</key>
	<false/> # or `true` if your app uses encryption
</dict>
</plist>
```

`src-tauri/Entitlements.plist` (replace `$IDENTIFIER` with `identifier` and `$TEAM_ID` with your team ID from the `App ID Prefix` section of the Identifier):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.application-identifier</key>
    <string>$TEAM_ID.$IDENTIFIER</string>
    <key>com.apple.developer.team-identifier</key>
    <string>$TEAM_ID</string>
</dict>
</plist>
```

### Authentication

`altool` authenticates with an App Store Connect API key. Create it in App Store Connect Users and Access, Integrations > Individual Keys, Add button, Developer access. `APPLE_API_ISSUER` is the Issuer ID shown above the keys table; `APPLE_API_KEY_ID` is the Key ID column value. The private key can be downloaded only once and must be saved as `AuthKey_<APPLE_API_KEY_ID>.p8` in one of: `<current-working-directory>/private_keys`, `~/private_keys`, `~/.private_keys` or `~/.appstoreconnect/private_keys`.

## Notes

- `--target universal-apple-darwin` added to the build step so it matches the bundle step (omitted in source).
- The universal build supports both Apple Silicon and Intel. To support only Apple Silicon set `bundle > macOS > minimumSystemVersion` to `12.0`; on an Apple Silicon build machine drop `--target universal-apple-darwin` and use `target/release`; on an Intel build machine run `rustup target add aarch64-apple-darwin`, use `aarch64-apple-darwin` as target and `target/aarch64-apple-darwin/release` paths.
- The PKG must be signed with a _Mac Installer Distribution_ certificate.
- Build with code signing enabled for entitlements to apply; make sure the app works in an App Sandbox context.
- Uploaded apps are validated by Apple and available in TestFlight if approved.
- Tauri bundler side only; Apple's own App Store and signing procedures belong to the apple-distribution skill.

## Related

- [macos-application-bundle](./macos-application-bundle.md)
- [sign-macos](./sign-macos.md)
- [sign-ios](./sign-ios.md)
- [icon command](../cli/icon.md)
