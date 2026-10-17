---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-cocoapods-libraries.html
---

# Add dependencies on a Pod library

Add Pod library dependencies from several locations by calling `pod()` in the shared module's `build.gradle(.kts)`; each dependency needs a separate call.

## Signature / Usage

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
    }
}
```

```kotlin
import cocoapods.SDWebImage.*
```

Local library:

```kotlin
pod("pod_dependency") {
    version = "1.0"
    extraOpts += listOf("-compiler-option")
    source = path(project.file("../pod_dependency"))
}
pod("subspec_dependency/Core") {
    version = "1.0"
    extraOpts += listOf("-compiler-option")
    source = path(project.file("../subspec_dependency"))
}
```

Custom Git repository:

```kotlin
pod("SDWebImage") {
    source = git("https://github.com/SDWebImage/SDWebImage") {
        tag = "5.20.0"
    }
}

pod("JSONModel") {
    source = git("https://github.com/jsonmodel/jsonmodel.git") {
        branch = "key-mapper-class"
    }
}

pod("CocoaLumberjack") {
    source = git("https://github.com/CocoaLumberjack/CocoaLumberjack.git") {
        commit = "3e7f595e3a459c39b917aacf9856cd2a48c4dbf3"
    }
}
```

Custom Podspec repository:

```kotlin
specRepos {
    url("https://github.com/Kotlin/kotlin-cocoapods-spec.git")
}
pod("example")
```

Custom cinterop options:

```kotlin
pod("FirebaseAuth") {
    packageName = "FirebaseAuthWrapper"
    version = "11.7.0"
    extraOpts += listOf("-compiler-option", "-fmodules")
}
```

```kotlin
import FirebaseAuthWrapper.Auth
import FirebaseAuthWrapper.User
```

## Options / Props

| Name | Description |
|------|-------------|
| `version` | Library version; omit for the latest |
| `source = path(...)` | Locally stored Pod library |
| `source = git(url) { commit / tag / branch }` | Git repository; priority is `commit`, then `tag`, then `branch`; with none, `HEAD` of the `master` branch is used |
| `specRepos { url(...) }` | Custom Podspec repository |
| `extraOpts` | Options for a Pod library, e.g. `listOf("-compiler-option")`; add `-fmodules` for clang module issues |
| `packageName` | Import the library directly with `import <packageName>` |
| `useInteropBindingFrom()` | Reuse the cinterop binding of another Pod (declared earlier) when building a binding for a new Pod |

## Notes

- Warning in the source: the CocoaPods approach cannot be used together with `embedAndSignAppleFrameworkForXcode` (direct integration).
- Without a minimum deployment target version (`ios.deploymentTarget`), a Pod requiring a higher target produces an error.
- Subspec dependencies are supported, and local and repository Pods can be combined in one `cocoapods {}` block.
- Kotlin imports use `cocoapods.<library-name>` packages.
- For a custom Podspec repository, also put `source 'https://github.com/Kotlin/kotlin-cocoapods-spec.git'` at the start of the Podfile to work with Xcode.
- Experimental: support for Objective-C headers with `@import` directives, enabled with `extraOpts = listOf("-compiler-option", "-fmodules")` in `pod()`. It may be dropped or changed at any time; use only for evaluation (feedback via YouTrack).
- Without `useInteropBindingFrom()`, a type such as `WebImage` shared between two Pods' APIs would come from different cinterop files and packages, making the code invalid.
- Distinct from apple-swift / apple-distribution: this is the Kotlin plugin's `pod()` DSL.

## Related

- [CocoaPods overview and setup](./cocoapods-overview.md)
- [Use a Kotlin project as a CocoaPods dependency](./cocoapods-xcode.md)
- [CocoaPods Gradle plugin DSL reference](./cocoapods-dsl-reference.md)
