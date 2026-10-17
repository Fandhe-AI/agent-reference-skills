---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-cocoapods-dsl-reference.html
---

# CocoaPods Gradle plugin DSL reference

The Kotlin CocoaPods Gradle plugin creates Podspec files so a Kotlin project integrates with CocoaPods. This page lists the main blocks, functions, and properties.

## Signature / Usage

```kotlin
plugins {
   kotlin("multiplatform") version "2.4.21"
   kotlin("native.cocoapods") version "2.4.21"
}
```

```kotlin
kotlin {
    iosArm64()
   
    cocoapods {
        version = "2.0"
        name = "MyCocoaPod"
        summary = "CocoaPods test library"
        homepage = "https://github.com/JetBrains/kotlin"
        
        extraSpecAttributes["vendored_frameworks"] = "CustomFramework.xcframework"
        license = "{ :type => 'MIT', :text => 'License text'}"
        source = "{ :git => 'git@github.com:vkormushkin/kmmpodlibrary.git', :tag => '$version' }"
        authors = "Kotlin Dev"
        
        specRepos {
            url("https://github.com/Kotlin/kotlin-cocoapods-spec.git")
        }
        pod("example")
        
        xcodeConfigurationToNativeBuildType["CUSTOM_RELEASE"] = NativeBuildType.RELEASE
   }
}
```

```kotlin
kotlin {
    cocoapods {
        version = "2.0"
        framework {
            baseName = "MyFramework"
            isStatic = false
            export(project(":anotherKMMModule"))
            transitiveExport = true
        }
    }
}
```

```kotlin
kotlin {
    iosArm64()
    
    cocoapods {
        version = "2.0"
        summary = "CocoaPods test library"
        homepage = "https://github.com/JetBrains/kotlin"
        ios.deploymentTarget = "16.0"
      
        pod("pod_dependency") {
            version = "1.0"
            extraOpts += listOf("-compiler-option")
            linkOnly = true
            source = path(project.file("../pod_dependency"))
        }
    }
}
```

## Options / Props

`cocoapods {}` block:

| Name | Description |
|------|-------------|
| `version` | Pod version; falls back to the Gradle project version; an error if neither is set |
| `summary` | Required description of the Pod |
| `homepage` | Required link to the Pod homepage |
| `authors` | Authors of the Pod |
| `podfile` | Configures the existing Podfile |
| `noPodspec()` | Do not produce a Podspec for the `cocoapods` section |
| `name` | Pod name; defaults to the project name |
| `license` | License of the Pod, its type and text |
| `framework` | Configures the framework produced by the plugin |
| `source` | Location of the Pod built from this project |
| `extraSpecAttributes` | Other Podspec attributes such as `libraries` or `vendored_frameworks` |
| `xcodeConfigurationToNativeBuildType` | Maps custom Xcode configurations to `NativeBuildType` ("Debug" to `NativeBuildType.DEBUG`, "Release" to `NativeBuildType.RELEASE`) |
| `publishDir` | Output directory for Pod publishing |
| `pods` | Returns a list of Pod dependencies |
| `pod()` | Adds a CocoaPods dependency |
| `specRepos` | Adds a specification repository using `url()`; needed for a private Pod |

Targets (use `deploymentTarget` per target for the minimum version of the Pod library):

| iOS | macOS | tvOS | watchOS |
|-----|-------|------|---------|
| `iosArm64` | `macosArm64` | `tvosArm64` | `watchosArm64` |
| `iosSimulatorArm64` | | `tvosSimulatorArm64` | `watchosSimulatorArm64` |
| | | | `watchosArm32` |
| | | | `watchosDeviceArm64` |

`framework {}` block (`baseName` is required):

| Name | Description |
|------|-------------|
| `baseName` | Required framework name; use instead of the deprecated `frameworkName` |
| `isStatic` | Linking type; dynamic by default |
| `transitiveExport` | Enables dependency export |

`pod()` configuration block:

| Name | Description |
|------|-------------|
| `version` | Library version; omit for the latest |
| `source` | Git repository via `git()` (with `commit`, `tag`, `branch`) or local repository via `path()` |
| `packageName` | Specifies the package name |
| `extraOpts` | List of options for a Pod library, e.g. `extraOpts = listOf("-compiler-option")` |
| `linkOnly` | Use Pod dependencies with dynamic frameworks without generating cinterop bindings; with static frameworks the option removes the Pod dependency entirely |
| `interopBindingDependencies` | List of dependencies to other Pods used when building a Kotlin binding for the new Pod |
| `useInteropBindingFrom()` | Name of an existing Pod (declared earlier) whose Kotlin binding is used when building the new one |

## Notes

- The source writes `'CustomFramework.xcframework'` with single quotes, which is not a valid Kotlin string literal; double quotes are used here.
- Plugin versions match the Kotlin release versions; the latest stable in the pinned docs is 2.4.21.
- When applied, CocoaPods adds both `debug` and `release` frameworks as output binaries for all targets.
- The source points to `CocoapodsExtension.kt` in the Kotlin Gradle plugin repository for the full DSL syntax.
- Distinct from apple-swift / apple-distribution: this is the Kotlin plugin's DSL, not CocoaPods' own Podspec syntax.

## Related

- [CocoaPods overview and setup](./cocoapods-overview.md)
- [Add dependencies on a Pod library](./cocoapods-libraries.md)
- [Use a Kotlin project as a CocoaPods dependency](./cocoapods-xcode.md)
