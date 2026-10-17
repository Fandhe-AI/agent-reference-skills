---
source: https://docs.flutter.dev/deployment/flavors-ios
---

# Set up Flutter flavors for iOS and macOS

How to create Flutter flavors for an iOS or macOS app. Xcode has no concept called "flavor"; instead you set up a scheme and attach custom configurations to it. For macOS, replace any reference to `iOS` with `macOS`.

## Signature / Usage

```console
$ flutter run --flavor <xcode_scheme_name>
$ flutter run --flavor staging
```

| Scheme | Configurations for the scheme |
|--------|-------------------------------|
| staging | Debug-staging, Profile-staging, Release-staging |
| production | Debug-production, Profile-production, Release-production |

### Configure Xcode schemes

```console
$ flutter create flavors_example
$ cd flavors_example && open ios/Runner.xcworkspace
```

1. **Product > Scheme > New Scheme**: Target **Runner**, name `staging`; repeat for `production`. The schemes must be shared (check **Shared** in **Manage Schemes**).
2. In the **Runner** project **Info** tab > **Configurations**, duplicate `Debug`, `Release` and `Profile` for each flavor: `Debug-staging`, `Debug-production`, etc. Always use lowercase for the appended flavor name so the Flutter CLI recognizes it. Configurations should be based on `Debug.xcconfig` and `Release.xcconfig` (not `Pods-Runner.xcconfig`); by default Profile and Release both use `Release.xcconfig`.
3. Assign configurations in **Manage Schemes** > edit the scheme:

| Tab | Build Configuration (staging) |
|-----|-------------------------------|
| Run | `Debug-staging` |
| Test | `Debug-staging` |
| Profile | `Profile-staging` |
| Analyze | `Debug-staging` |
| Archive | `Release-staging` |

4. For an existing project with a Podfile, update it (below). Then run each scheme in Xcode to verify.

### Access the current flavor

```dart
import 'package:flutter/services.dart';

void main() {
  // appFlavor will match the name of the Xcode scheme
  if (appFlavor == 'production') {
    // Logic for production environment
    Config.apiUrl = 'https://api.flavors_example.com';
  } else if (appFlavor == 'staging') {
    // Logic for staging environment
    Config.apiUrl = 'https://staging.api.flavors_example.com';
  }

  runApp(const MyApp());
}
```

You can also launch a scheme from Xcode: select it (**Product > Schemes > Choose scheme**), select a device, **Product > Run**.

### Customize configurations

Distinct app display names: in **TARGETS > Runner > Build Settings**, **+** > **Add User-Defined Setting** named `APP_DISPLAY_NAME`, with `Flavors prod` for `Debug-production`, `Profile-production`, `Release-production` and `Flavors staging` for the `-staging` configurations. In `Info.plist` set key `CFBundleDisplayName` to value `$(APP_DISPLAY_NAME)`.

Distinct icons: in **Runner > Runner > Assets**, **+ > iOS > iOS App icon**, named `AppIcon-staging` and `AppIcon-production`; then in **TARGETS > Runner > General > App Icons and Launch Screen**, set **App icon** per configuration (`AppIcon-staging` for the Debug/Profile/Release-staging ones, `AppIcon-production` for the -production ones).

Distinct bundle identifiers: in **TARGETS > Runner > Build Settings > Packaging > Product Bundle Identifier**:

| Configurations | Bundle identifier |
|----------------|-------------------|
| Debug-staging, Profile-staging, Release-staging | `com.example.flavorsExample.staging` |
| Debug, Profile, Release, Debug-production, Profile-production, Release-production | `com.example.flavorsExample` |

Ensure these identifiers are included in your App ID and the App ID is registered in your Apple Developer account.

Flavor-specific assets: add the `flavors` subfield to the `assets` field in `pubspec.yaml`.

#### Update Podfiles

```ruby
project 'Runner', {
  ...
  'Debug' => :debug,
  'Debug-staging' => :debug,
  'Debug-production' => :debug,
  'Profile' => :release,
  'Profile-staging' => :release,
  'Profile-production' => :release,
  'Release' => :release,
  'Release-staging' => :release,
  'Release-production' => :release,
  ...
```

#### Unique build settings

```plaintext
# Debug-staging build settings
API_BASE_URL = staging.flavors.com/api
```

```plaintext
# Debug-production build settings
API_BASE_URL = flavors.com/api
```

## Notes

- The value of `appFlavor` matches the name of the Xcode scheme you defined. If no flavor is specified during the build, `appFlavor` returns `null`.
- Flutter flavor on Apple platforms maps onto Xcode schemes and build configurations; Xcode and App Store distribution are covered by apple-distribution.
- Migration (Flutter 3.44): Swift Package Manager integration adds a **Run Prepare Flutter Framework Script** pre-action to each scheme, which must be completed for each flavor (see Swift Package Manager for app developers).

## Related

- [Set up Flutter flavors for Android](./flavors.md)
- [Set up Flutter flavors for Windows](./flavors-windows.md)
- [Set up Flutter flavors for Linux](./flavors-linux.md)
- [Build and release an iOS app](./deploy-ios.md)
- [Swift Package Manager for app developers](./swiftpm-app-developers.md)
