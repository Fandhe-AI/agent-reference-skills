---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-cocoapods-overview.html
---

# CocoaPods overview and setup

Kotlin/Native integrates with the CocoaPods dependency manager: add dependencies on Pod libraries, or use a Kotlin project as a CocoaPods dependency. A local integration method for mono repositories whose iOS project uses CocoaPods and whose KMP project has CocoaPods dependencies.

## Signature / Usage

Version catalog and plugin aliases:

```toml
[plugins]
kotlinCocoapods = { id = "org.jetbrains.kotlin.native.cocoapods", version.ref = "kotlin" }
```

```kotlin
alias(libs.plugins.kotlinCocoapods) apply false
```

Shared module `build.gradle.kts`:

```kotlin
plugins {
    kotlin("multiplatform") version "2.4.21"
    kotlin("native.cocoapods") version "2.4.21"
}

kotlin {
    cocoapods {
        // Required properties
        // Specify the required Pod version here
        // Otherwise, the Gradle project version is used
        version = "1.0"
        summary = "Some description for a Kotlin/Native module"
        homepage = "Link to a Kotlin/Native module homepage"

        // Optional properties
        // Configure the Pod name here instead of changing the Gradle project name
        name = "MyCocoaPod"

        framework {
            // Required properties              
            // Framework name configuration. Use this property instead of deprecated 'frameworkName'
            baseName = "MyFramework"
            
            // Optional properties
            // Specify the framework linking type. It's dynamic by default. 
            isStatic = false
            // Dependency export
            // Uncomment and specify another project module if you have one:
            // export(project(":<your other KMP module>"))
            transitiveExport = false // This is default.
        }

        // Maps custom Xcode configuration to NativeBuildType
        xcodeConfigurationToNativeBuildType["CUSTOM_DEBUG"] = NativeBuildType.DEBUG
        xcodeConfigurationToNativeBuildType["CUSTOM_RELEASE"] = NativeBuildType.RELEASE
    }
}
```

Podfile for Xcode (custom Podspec repository / path dependency), then install:

```ruby
source 'https://github.com/Kotlin/kotlin-cocoapods-spec.git'

target 'kotlin-cocoapods-xcproj' do
    # ... other dependencies ...
    pod 'example'
end
```

```ruby
target 'ios-app' do
   # ... other dependencies ...
   pod 'podspecWithFilesExample', :path => 'cocoapods/externalSources/url/podspecWithFilesExample' 
end
```

```bash
pod install
```

## Options / Props

| Name | Description |
|------|-------------|
| `version`, `summary`, `homepage` | Required Podspec properties (`version` falls back to the Gradle project version) |
| `name` | Optional Pod name instead of changing the Gradle project name |
| `framework { baseName, isStatic, transitiveExport }` | Framework configuration; `baseName` is required, linking is dynamic by default |
| `xcodeConfigurationToNativeBuildType` | Maps custom Xcode configurations to `NativeBuildType` |
| `kotlin.apple.cocoapods.bin` (`local.properties`) | Explicit path of the `pod` executable, e.g. `kotlin.apple.cocoapods.bin=/Users/Jane.Doe/.rbenv/shims/pod` or `echo -e "kotlin.apple.cocoapods.bin=$(which pod)" >> local.properties` |

## Notes

- Warning in the source: the CocoaPods approach cannot be used together with the `embedAndSignAppleFrameworkForXcode` mechanism of direct integration.
- Install CocoaPods through RVM (`rvm install ruby 4.0.6` then `sudo gem install -n /usr/local/bin cocoapods`), rbenv (`rbenv install 4.0.6`, `rbenv global 4.0.6`, same gem install), default Ruby (`sudo gem install cocoapods`; does not work on Apple M chips) or Homebrew (`brew install cocoapods`; may cause Xcodeproj gem compatibility issues). The Ruby version 4.0.6 is the docs' `rubyVersion` variable.
- When applied, the plugin adds `debug` and `release` frameworks as output binaries for all macOS, iOS, tvOS, and watchOS targets, and creates a `podspec` task generating a Podspec with script phases that build the framework in an Xcode build.
- Generate the Gradle wrapper to avoid compatibility issues during an Xcode build. Re-import the project after changes (Reload All Gradle Projects / Sync Project with Gradle Files).
- After running `pod install` for the first time, close `.xcodeproj` and open the generated `.xcworkspace`. Without the Podfile changes the `podInstall` task fails.
- Troubleshooting from the source: use `moduleName = "SDWebImageMapKit"` in `pod("SDWebImage/MapKit") {...}` when the framework name differs from the Pod name; use `headers = "GNSMessages.h"` for Pods without a `.modulemap`; update RVM / rbenv / Homebrew and gems for `module 'SomeSDK' not found`; the minimum Kotlin version for this setup is 1.7.0.
- Missing resources in the app bundle: prefer `./gradlew podInstall` over a bare `pod install` (the Compose Multiplatform plugin's podspec sets `spec.resources = ['build/compose/cocoapods/compose-resources']`, which only exists after a build).
- `rsync error: some files could not be transferred` happens with user script sandboxing enabled on the app target (known CocoaPods issue 11946); disable it and run `./gradlew --stop`.
- Distinct from apple-swift / apple-distribution: this covers the Kotlin CocoaPods Gradle plugin, not general CocoaPods or Xcode usage.

## Related

- [Add dependencies on a Pod library](./cocoapods-libraries.md)
- [Use a Kotlin project as a CocoaPods dependency](./cocoapods-xcode.md)
- [CocoaPods Gradle plugin DSL reference](./cocoapods-dsl-reference.md)
- [Direct integration](./direct-integration.md)
