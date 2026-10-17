---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-cocoapods-xcode.html
---

# Use a Kotlin project as a CocoaPods dependency

Include an entire Kotlin project as a Pod dependency in an Xcode project's Podfile, pointing at the project directory with the generated Podspec. The dependency is built and rebuilt along with the project.

## Signature / Usage

Xcode project with one target:

```kotlin
kotlin {
    iosArm64()

    cocoapods {
        version = "2.0"
        summary = "CocoaPods test library"
        homepage = "https://github.com/JetBrains/kotlin"
        ios.deploymentTarget = "16.0"

        pod("SDWebImage") {
            version = "5.20.0"
        }
        podfile = project.file("../ios-app/Podfile")
    }
}
```

```ruby
target 'ios-app' do
    use_frameworks!
    platform :ios, '16.0'

    # Pods for iosApp
    pod 'kotlin_library', :path => '../kotlin-library'
end
```

Xcode project with several targets:

```kotlin
kotlin {
    iosArm64()
    tvosArm64()

    cocoapods {
        version = "2.0"
        summary = "CocoaPods test library"
        homepage = "https://github.com/JetBrains/kotlin"
        ios.deploymentTarget = "16.0"
        tvos.deploymentTarget = "16.0"

        pod("SDWebImage") {
            version = "5.20.0"
        }
        // Specify the path to the Podfile
        podfile = project.file("../severalTargetsXcodeProject/Podfile")
    }
}
```

```ruby
target 'iosApp' do
  use_frameworks!
  platform :ios, '16.0'

  # Pods for iosApp
  pod 'kotlin_library', :path => '../kotlin-library'
end

target 'TVosApp' do
  use_frameworks!
  platform :tvos, '16.0'

  # Pods for TVosApp
  pod 'kotlin_library', :path => '../kotlin-library'
end
```

## Options / Props

| Name | Description |
|------|-------------|
| `podfile = project.file(...)` | Path to the Podfile; synchronizes the Xcode project with Kotlin dependencies by calling `pod install` |
| `ios.deploymentTarget` / `tvos.deploymentTarget` | Minimum deployment target per target |

## Notes

- Warning in the source: the CocoaPods approach cannot be used together with `embedAndSignAppleFrameworkForXcode` (direct integration).
- The Podfile must contain `use_modular_headers!` or `use_frameworks!` for dependencies to import correctly into the Kotlin/Native module. A missing minimum deployment target that a dependency Pod requires produces an error.
- With a single Xcode project `pod install` runs automatically; with several Xcode projects call `pod install` manually for each.
- Disable **User Script Sandboxing** under Build Options on the application target (single-target flow).
- After the first `pod install`, close `.xcodeproj` and open the new `.xcworkspace`, then re-import the Gradle project.
- Distinct from apple-swift / apple-distribution: Podfile / Xcode details here only cover the Kotlin-as-Pod flow.

## Related

- [CocoaPods overview and setup](./cocoapods-overview.md)
- [Add dependencies on a Pod library](./cocoapods-libraries.md)
- [Direct integration](./direct-integration.md)
- [CocoaPods Gradle plugin DSL reference](./cocoapods-dsl-reference.md)
