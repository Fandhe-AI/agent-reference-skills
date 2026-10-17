---
source: https://docs.flutter.dev/deployment/cd
---

# Continuous delivery with Flutter

How to automate continuous building and releasing of your Flutter app, so it is delivered to beta testers and validated frequently without manual workflows.

## Signature / Usage

fastlane lane for iOS that reuses the archive `flutter build ipa` already built:

```ruby
build_app(
  skip_build_archive: true,
  archive_path: "../build/ios/archive/Runner.xcarchive",
)
upload_to_testflight
```

Android: add a `lane` that calls `upload_to_play_store` with `aab` set to `../build/app/outputs/bundle/release/app-release.aab`.

### CI/CD options

- All-in-one options with built-in Flutter functionality: Codemagic, Bitrise, Appcircle.
- fastlane integrated with existing workflows: GitHub Actions, Cirrus, Travis, GitLab, CircleCI.

### fastlane local setup

1. Install fastlane: `gem install fastlane` or `brew install fastlane`.
2. Set `FLUTTER_ROOT` to the root directory of your Flutter SDK (required for the iOS deploy scripts).
3. Make sure the project builds: `flutter build appbundle` (Android) and `flutter build ipa` (iOS).
4. Run `fastlane init` in `[project]/android` and in `[project]/ios`.
5. Edit the `Appfile`s: `package_name` in `[project]/android/fastlane/Appfile` must match AndroidManifest.xml; `app_identifier` in `[project]/ios/fastlane/Appfile` must match the Info.plist bundle identifier; fill in `apple_id`, `itc_team_id`, `team_id`.
6. Set up store credentials: Android, follow the Supply setup steps and ensure `fastlane supply init` syncs data from your Play Store console; iOS, set the `FASTLANE_PASSWORD` shell environment variable (otherwise prompted on upload).
7. Set up code signing: Android signing steps; iOS, create and sign with a distribution certificate (not a development certificate) for TestFlight or App Store.
8. Create a `Fastfile` for each platform (fastlane Android / iOS beta deployment guides).

Run deployment locally: build the release app (`flutter build appbundle` / `flutter build ipa`), then `cd android` or `cd ios` and `fastlane [name of the lane you created]`.

### Cloud build and deploy setup

Cloud instances are ephemeral and untrusted, so don't leave credentials on the server. Store private data in the CI system's encrypted environment variables and pass them with `--dart-define MY_VAR=MY_VALUE` while building.

```plaintext
upload_to_play_store(
  ...
  json_key_data: ENV['<variable name>']
)
```

```bash
echo "$PLAY_STORE_UPLOAD_KEY" | base64 --decode > [path to your upload keystore]
```

On iOS, move `FASTLANE_PASSWORD` to an encrypted variable and use fastlane Match to synchronize distribution certificates across machines. Optionally use a Gemfile for reproducible fastlane dependencies:

```plaintext
source "https://rubygems.org"

gem "fastlane"
```

Run `bundle update` in both `[project]/android` and `[project]/ios`, commit `Gemfile` and `Gemfile.lock`, and use `bundle exec fastlane` locally. In the CI script (`.travis.yml`, `.cirrus.yml`): shard across Linux and macOS; in setup, ensure Bundler (`gem install bundler`), run `bundle install`, make the Flutter SDK available in `PATH`, set `ANDROID_SDK_ROOT` for Android, and specify Xcode for iOS (for example `osx_image: xcode9.2`); in the script phase run `flutter build appbundle` or `flutter build ios --release --no-codesign --config-only`, then `cd android` or `cd ios` and `bundle exec fastlane [name of the lane]`.

### Xcode Cloud

Requirements: Xcode 13.4.1 or higher, and enrollment in the Apple Developer Program. Xcode Cloud recognizes custom build scripts and predefined environment variables such as `$CI_WORKSPACE`. Create `ios/ci_scripts/ci_post_clone.sh`:

```sh
#!/bin/sh

# Fail this script if any subcommand fails.
set -e

# The default execution directory of this script is the ci_scripts directory.
cd $CI_PRIMARY_REPOSITORY_PATH # change working directory to the root of your cloned repo.

# Install Flutter using git.
git clone https://github.com/flutter/flutter.git --depth 1 -b stable $HOME/flutter
export PATH="$PATH:$HOME/flutter/bin"

# Install Flutter artifacts for iOS (--ios), or macOS (--macos) platforms.
flutter precache --ios

# Install Flutter dependencies.
flutter pub get

# Install CocoaPods using Homebrew.
HOMEBREW_NO_AUTO_UPDATE=1 # disable homebrew's automatic updates.
brew install cocoapods

# Install CocoaPods dependencies.
cd ios && pod install # run `pod install` in the `ios` directory.

exit 0
```

Add it to git and mark it executable:

```console
$ git add --chmod=+x ios/ci_scripts/ci_post_clone.sh
```

Create a workflow with **Product > Xcode Cloud > Create Workflow**, select the product, then **Edit Workflow**. The default Branch Changes condition builds on every change to the default branch; to trigger only after changes to Flutter packages or Dart/iOS sources, use Files and Folders conditions on `lib\` and `ios\`. The build number defaults to `1` and increments per successful build; for an existing app with a higher build number specify `Next Build Number`.

## Notes

- Values passed with --dart-define are compiled into the app binary and can be extracted; keep store credentials (json_key_data, FASTLANE_PASSWORD, signing keys) in CI encrypted env vars consumed only by fastlane/the build scripts, and use --dart-define only for non-secret app configuration.
- Treat the Play Store service account `.json` file like a password; do not check it into any public source control.
- Take precaution not to re-echo secret variable values onto the console in test scripts. CI secrets are not available in pull requests until merged, so malicious pull requests cannot print them; be careful with how secrets are used in pull requests you accept and merge.
- The Xcode Cloud post-clone script uses `git clone` of the Flutter `stable` branch and Homebrew on an ephemeral Xcode Cloud build environment; run such scripts only in disposable CI environments. The environment includes macOS and Xcode tools (for example Python) plus Homebrew.
- The Xcode Cloud project must already be initialized with Git and linked to a remote repository.
- This is the Flutter-specific delivery guidance; GitHub Actions and general Gradle/Xcode CI are covered by github-docs, android-build-gradle and apple-distribution.

## Related

- [Build and release an Android app](./deploy-android.md)
- [Build and release an iOS app](./deploy-ios.md)
- [Build and release a Windows desktop app](./deploy-windows.md)
