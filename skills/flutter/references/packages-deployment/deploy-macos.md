---
source: https://docs.flutter.dev/deployment/macos
---

# Build and release a macOS app

Step-by-step walkthrough of releasing a Flutter app to the macOS App Store. The app must meet Apple's App Review Guidelines and you must enroll in the Apple Developer Program.

## Signature / Usage

```console
flutter build macos
open macos/Runner.xcworkspace
```

Then in Xcode select **Product > Archive**, click **Validate App**, and after validation click **Distribute App**.

### Register your app on App Store Connect

1. Register a Bundle ID: App IDs page > **+** > app name, **Explicit App ID**, an ID > select services > **Continue** > **Register**.
2. Create an application record: App Store Connect > **My Apps** > **+** > **New App**; ensure macOS is checked (leave tvOS unchecked, Flutter doesn't currently support tvOS) > **Create**; **App Information** > select the Bundle ID.

### Review Xcode project settings

Open `Runner.xcworkspace` in the `macos` folder, select the **Runner** target, **General** tab.

| Setting | Section | Description |
|---------|---------|-------------|
| `App Category` | Identity | Category on the Mac App Store; cannot be none. |
| `Bundle Identifier` | Identity | The App ID you registered on App Store Connect. |
| `Deployment Target` | Deployment info | Minimum macOS version (see Flutter's Supported deployment platforms). |
| `Automatically manage signing` | Signing & Capabilities | `true` by default. |
| `Team` | Signing & Capabilities | Team associated with your Apple Developer account. |

### App name, bundle identifier and copyright

Centralized in `macos/Runner/Configs/AppInfo.xcconfig`: `PRODUCT_NAME` (app name), `PRODUCT_COPYRIGHT` (copyright), `PRODUCT_BUNDLE_IDENTIFIER` (bundle identifier).

### Version number

```yaml
version: 1.0.0+1
```

Override with `--build-name` / `--build-number`. In macOS, `build-name` uses `CFBundleShortVersionString` and `build-number` uses `CFBundleVersion`. In Xcode, update **Version** and **Build** in the Identity section; each upload requires a unique build number.

### App icon

In the Xcode project navigator, select `Assets.xcassets` in the `Runner` folder and replace the placeholder icons. Verify with `flutter run -d macos`.

### Create a build archive with Codemagic CLI tools

```bash
pip3 install codemagic-cli-tools

export APP_STORE_CONNECT_ISSUER_ID=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
export APP_STORE_CONNECT_KEY_IDENTIFIER=ABC1234567
export APP_STORE_CONNECT_PRIVATE_KEY=`cat /path/to/api/key/AuthKey_XXXYYYZZZ.p8`

openssl pkcs12 -in <certificate_name>.p12 -nodes -nocerts | openssl rsa -out cert_key
ssh-keygen -t rsa -b 2048 -m PEM -f cert_key -q -N ""

app-store-connect fetch-signing-files YOUR.APP.BUNDLE_ID \
    --platform MAC_OS \
    --type MAC_APP_STORE \
    --certificate-key=@file:/path/to/cert_key \
    --create

# if you do not have a Mac Installer Distribution certificate
app-store-connect certificates create \
    --type MAC_INSTALLER_DISTRIBUTION \
    --certificate-key=@file:/path/to/cert_key \
    --save

app-store-connect certificates list \
    --type MAC_INSTALLER_DISTRIBUTION \
    --certificate-key=@file:/path/to/cert_key \
    --save

keychain initialize
keychain add-certificates
xcode-project use-profiles
flutter packages pub get
find . -name "Podfile" -execdir pod install \;
flutter build macos --release

APP_NAME=$(find $(pwd) -name "*.app")
PACKAGE_NAME=$(basename "$APP_NAME" .app).pkg
xcrun productbuild --component "$APP_NAME" /Applications/ unsigned.pkg

INSTALLER_CERT_NAME=$(keychain list-certificates \
          | jq '[.[]
            | select(.common_name
            | contains("Mac Developer Installer"))
            | .common_name][0]' \
          | xargs)
xcrun productsign --sign "$INSTALLER_CERT_NAME" unsigned.pkg "$PACKAGE_NAME"
rm -f unsigned.pkg

app-store-connect publish \
    --path "$PACKAGE_NAME"

keychain use-login
```

Requires an App Store Connect API Key with App Manager access, and Mac App Distribution plus Mac Installer Distribution certificates.

### TestFlight, registered devices, App Store

- TestFlight: TestFlight tab > **Internal Testing** > select build > **Save** > add internal testers.
- Distribute to registered devices: see the Xcode distribution guide to prepare an archive for designated Mac computers.
- App Store: **Pricing and Availability** > complete info > **1.0 Prepare for Submission** > **Submit for Review**.

## Notes

- The Codemagic samples use unquoted $(pwd) in find; quote it ("$(pwd)") if the project path can contain spaces.
- After `keychain initialize` you **must** run `keychain use-login` to avoid authentication issues with apps on your machine.
- Consider obfuscating your Dart code (build flags) before shipping a release archive.
- The Codemagic CLI procedure handles API keys and certificate private keys as secrets; run it only on a disposable or trusted build machine.
- To package and distribute a Flutter macOS app without a paid Apple developer account, the source points to a community step-by-step macOS packaging guide.
- Flutter macOS build/release steps only; App Store distribution in general is covered by apple-distribution and AppKit by apple-appkit.

## Related

- [Build and release an iOS app](./deploy-ios.md)
- [Set up Flutter flavors for iOS and macOS](./flavors-ios.md)
- [Obfuscate Dart code](./obfuscate.md)
