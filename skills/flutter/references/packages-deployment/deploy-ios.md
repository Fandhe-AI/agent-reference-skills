---
source: https://docs.flutter.dev/deployment/ios
---

# Build and release an iOS app

Step-by-step walkthrough of releasing a Flutter app to the App Store and TestFlight. Xcode is required, so you must use a device running macOS. Enroll in the Apple Developer Program to publish; the app must meet Apple's App Review Guidelines.

## Signature / Usage

```bash
flutter build ipa
flutter build ipa --export-options-plist=path/to/ExportOptions.plist
xcrun altool --upload-app --type ios -f build/ios/ipa/*.ipa --apiKey your_api_key --apiIssuer your_issuer_id
```

`flutter build ipa` produces an Xcode build archive (`.xcarchive`) in `build/ios/archive/` and an App Store app bundle (`.ipa`) in `build/ios/ipa`.

### Register your app on App Store Connect

1. Register a unique Bundle ID: App IDs page of your developer account > **+** > app name, **Explicit App ID**, an ID > select services > **Continue** > **Register**.
2. Create an application record: App Store Connect > **Apps** > **+** > **New App**; ensure iOS is checked (leave tvOS unchecked, Flutter doesn't currently support tvOS); then **App Information** > General Information > select the registered Bundle ID.

### Review Xcode project settings

Run `open ios/Runner.xcworkspace` and select the **Runner** target.

| Setting | Location | Description |
|---------|----------|-------------|
| `Display Name` | General > Identity | Display name of your app. |
| `Bundle Identifier` | General > Identity | The App ID you registered on App Store Connect. |
| `Automatically manage signing` | Signing & Capabilities | Whether Xcode manages app signing and provisioning; `true` by default. |
| `Team` | Signing & Capabilities | Team associated with your Apple Developer account. |
| `iOS Deployment Target` | Build Settings > Deployment | Minimum iOS version. Flutter supports iOS 15 and later (per the supported-platforms reference); raise it if your app or plugins use newer APIs. |

### App icon and launch image

In the Xcode project navigator, select `Assets.xcassets` in the `Runner` folder and replace the placeholder icons / launch image. Verify the icon with `flutter run`; verify the launch image by hot restarting (don't use hot reload).

### Update build and version numbers

```yaml
version: 1.0.0+1
```

Override with `flutter build ipa --build-name` / `--build-number`. In iOS, `build-name` uses `CFBundleShortVersionString` and `build-number` uses `CFBundleVersion`. Each upload requires a unique build number. Or set **Version** / **Build** in Xcode (Identity section of the **Runner** target).

### Create an app bundle

Consider `--obfuscate` and `--split-debug-info` to obfuscate Dart code. If not distributing to the App Store, choose a different export method:

| Option | Description |
|--------|-------------|
| `--export-method ad-hoc` | Ad hoc distribution. |
| `--export-method development` | Development distribution. |
| `--export-method enterprise` | Enterprise distribution. |
| `--export-options-plist=path/to/ExportOptions.plist` | Create new IPAs with the options Xcode saved from **Distribute App** (see `xcodebuild -h`). |

### Upload to App Store Connect

Either drag `build/ios/ipa/*.ipa` into the Apple Transporter macOS app, or run the `xcrun altool --upload-app` command above (run `man altool` for authenticating with the App Store Connect API key), or open `build/ios/archive/MyApp.xcarchive` in Xcode, click **Validate App**, then **Distribute App**. You should receive an email within 30 minutes that the build is validated and available to testers on TestFlight.

### Create a build archive with Codemagic CLI tools

```bash
pip3 install codemagic-cli-tools

export APP_STORE_CONNECT_ISSUER_ID=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
export APP_STORE_CONNECT_KEY_IDENTIFIER=ABC1234567
export APP_STORE_CONNECT_PRIVATE_KEY=`cat /path/to/api/key/AuthKey_XXXYYYZZZ.p8`

# export existing certificate private key, or create a new one
openssl pkcs12 -in <certificate_name>.p12 -nodes -nocerts | openssl rsa -out cert_key
ssh-keygen -t rsa -b 2048 -m PEM -f cert_key -q -N ""

keychain initialize

app-store-connect fetch-signing-files "$(xcode-project detect-bundle-id)" \
    --platform IOS \
    --type IOS_APP_STORE \
    --certificate-key=@file:/path/to/cert_key \
    --create

keychain add-certificates
xcode-project use-profiles
flutter packages pub get
find . -name "Podfile" -execdir pod install \;

flutter build ipa --release \
    --export-options-plist="$HOME/export_options.plist"

app-store-connect publish \
    --path "$(find "$(pwd)" -name "*.ipa")"

keychain use-login
```

An App Store Connect API Key with App Manager access is required. `export_options.plist` is the output of `xcode-project use-profiles`.

### Release on TestFlight and the App Store

- TestFlight: TestFlight tab > **Internal Testing** > select the build > **Save** > add internal testers' emails (more via **Users and Roles**).
- App Store: **Pricing and Availability** > complete required info > status **1.0 Prepare for Submission** > complete required fields > **Submit for Review**.

## Notes

- The deployment/ios page still says iOS 13; the supported-platforms reference lists iOS 15–27 as supported and 14 and earlier as unsupported.
- Shell expansions are quoted here (the official snippet leaves them unquoted).
- After running `keychain initialize` you **must** run `keychain use-login` to set your login keychain as the default and avoid authentication issues with other apps.
- On versions of Flutter where `flutter build ipa --export-method` is unavailable, open `build/ios/archive/MyApp.xcarchive` and validate/distribute from Xcode.
- The Codemagic CLI procedure creates a temporary keychain isolated from your login keychain; handle API keys and certificate private keys as secrets and run it only on a disposable or trusted build machine.
- This page covers the Flutter-specific build and upload steps; App Store Connect, signing and distribution in general are covered by the apple-distribution skill.
- Migration (Flutter 3.44): iOS native dependencies are managed with Swift Package Manager by default (see Swift Package Manager for app developers).

## Related

- [Obfuscate Dart code](./obfuscate.md)
- [Set up Flutter flavors for iOS and macOS](./flavors-ios.md)
- [Build and release a macOS app](./deploy-macos.md)
- [Continuous delivery with Flutter](./continuous-delivery.md)
