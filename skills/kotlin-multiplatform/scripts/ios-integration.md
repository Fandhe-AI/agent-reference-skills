---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-cocoapods-overview.html
---

# iOS Integration

Commands documented for iOS integration (CocoaPods, SwiftPM export / import, direct integration). macOS and Xcode are required for all of them.

> **警告**: Do not run `gem install` with administrator privileges against the system Ruby. Use Homebrew or a version-managed Ruby (rbenv / RVM).

## Install CocoaPods (Homebrew, recommended)

```sh
brew install cocoapods
```

Pod installation may fail if the Xcodeproj gem does not support the latest Xcode (warning in the official docs).

## Install CocoaPods (RVM / rbenv)

Adapted (not in the official docs): the official docs use `sudo gem install -n /usr/local/bin cocoapods`; sudo is removed here (a version-managed Ruby installs into its own bin).

```sh
gem install cocoapods
```

First prepare Ruby with `rvm install ruby <version>` or `rbenv install <version>` and `rbenv global <version>` (the version is the variable `rubyVersion` in the official docs; this skill fixes no value).

## Install CocoaPods (default Ruby)

Adapted (not in the official docs): the official docs use `sudo gem install cocoapods`; it is not included here because it modifies the system Ruby with administrator privileges. Use Homebrew or a version-managed Ruby instead. The official docs note this route does not work on Apple M chips.

## Install Pods

```sh
pod install
```

The first run generates `.xcworkspace`. From then on, open the `.xcworkspace` instead of the `.xcodeproj`. If you depend on multiple Xcode projects, run it manually in each project (source: `multiplatform-cocoapods-xcode`).

## Install Pods with Gradle

```sh
./gradlew podInstall
open iosApp/iosApp.xcworkspace
```

To avoid missing resources (fonts and images not included in the `.ipa`), use `podInstall` instead of running `pod install` directly in clean environments and CI.

## Specify the CocoaPods path explicitly

```sh
echo -e "kotlin.apple.cocoapods.bin=$(which pod)" >> local.properties
```

Workaround for build errors in Xcode. Appends to `local.properties`.

## Update CocoaPods tooling (RVM / rbenv / Homebrew)

```sh
rvm get stable
gem update --system
gem update
```

```sh
cd ~/.rbenv
git pull
gem update --system
gem update
```

```sh
brew update
brew upgrade
```

Workaround for errors such as `module 'SomeSDK' not found` (for RVM / rbenv / Homebrew respectively).

## Generate the XCFramework for SwiftPM export

```sh
./gradlew :shared:assembleSharedXCFramework
```

Generates `shared/build/XCFrameworks/release/Shared.xcframework`. To combine multiple modules, use `./gradlew :together:assembleTogetherReleaseXCFramework` (the official umbrella-module example).

## Compute the XCFramework checksum

```sh
swift package compute-checksum Shared.xcframework.zip
```

Run it after zipping `Shared.xcframework`.

## Check the uploaded ZIP

```sh
curl <downloadable link to the uploaded XCFramework ZIP file>
```

`<...>` is an official placeholder.

## Validate the Package.swift manifest

```sh
swift package reset && swift package show-dependencies --format json
```

Run in the directory containing `Package.swift`.

## SwiftPM import integration task

```sh
XCODEPROJ_PATH='/path/to/project/iosApp/iosApp.xcodeproj' ./gradlew :kotlin-library:integrateLinkagePackage
```

When SwiftPM dependencies are first added, links the generated intermediate package with the Xcode project. Commit the generated package and the updated Xcode project.

## Resolve SwiftPM dependencies (force a lockfile refresh)

```sh
./gradlew :yourModuleName:fetchSyntheticImportProjectPackages
```

First delete the `build` directory of the target subproject and any existing `Package.resolved` (such as in `.swiftpm-locks/default/`) (source: `multiplatform-spm-import`).

## Reconfigure from CocoaPods to SwiftPM import

```sh
XCODEPROJ_PATH='/path/to/project/iosApp/iosApp.xcodeproj' GRADLE_PROJECT_PATH=':kotlin-library' '/path/to/project/gradlew' -p '/path/to/project' ':kotlin-library:integrateEmbedAndSign' ':kotlin-library:integrateLinkagePackage'
```

Example of the command shown in an Xcode build error (actual paths are project-specific). Run it in the `iosApp` directory; it rewrites the `.xcodeproj` (source: `multiplatform-cocoapods-spm-migration`).

## Remove the CocoaPods integration

> **警告**: `pod deintegrate` removes the CocoaPods integration from the Xcode project. Run it from a committed state or on a disposable copy.

```sh
pod deintegrate
```

Run in the directory containing the Podfile. Afterwards, delete the `cocoapods {}` block, the `.podspec`, and the Podfile (source: `multiplatform-cocoapods-spm-migration` / `multiplatform-spm-local-integration`).

## Embed the Kotlin framework from an Xcode Run Script

```sh
if [ "YES" = "$OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED" ]; then
    echo "Skipping Gradle build task invocation due to OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED environment variable set to \"YES\""
    exit 0
fi
cd "<Path to the root of the multiplatform project>"
./gradlew :<Shared module name>:embedAndSignAppleFrameworkForXcode
```

Script to paste into the Xcode Run Script phase for direct integration (source: `multiplatform-direct-integration`). `<...>` are official placeholders; examples are `$SRCROOT/..` and `:shared` / `:sharedUI`. `embedAndSignAppleFrameworkForXcode` cannot be used together with the CocoaPods integration.

## Pre-action script for local Swift package integration

```sh
cd "<Path to the root of the multiplatform project>"
./gradlew :<Shared module name>:embedAndSignAppleFrameworkForXcode
```

Add as a **New Run Script Action** under **Build | Pre-actions** of the Xcode scheme (source: `multiplatform-spm-local-integration`). Integration with `swift build` is not supported.
