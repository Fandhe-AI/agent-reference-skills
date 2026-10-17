---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-privacy-manifest.html
---

# Privacy manifest for iOS apps

App Store Connect may warn that an app lacks a correct privacy manifest when it (or a dependency, including Kotlin Multiplatform) uses required reason APIs.

## Signature / Usage

Bundle a `PrivacyInfo.xcprivacy` with Kotlin artifacts using the `apple-privacy-manifests` plugin:

```kotlin
plugins {
    kotlin("multiplatform")
    kotlin("apple-privacy-manifests") version "1.0.0"
}

kotlin {
    privacyManifest {
        embed(
            privacyManifest = layout.projectDirectory.file("PrivacyInfo.xcprivacy").asFile,
        )
    }
}
```

Find required reason API usages in the dependencies of your Kotlin framework (run in the directory where the framework is declared):

```shell
/usr/bin/python3 -c "$(curl -fsSL https://github.com/JetBrains/kotlin/raw/rrf_v0.0.1/libraries/tools/required-reason-finder/required_reason_finder.py)"
```

## Notes

- Since spring 2024, App Store Connect no longer accepts apps that do not specify a reason for using a required reason API; this is an automatic check and the email references "ITMS-91053: Missing API declaration".
- After a submission attempt lists the issues, build the manifest following Apple's documentation (privacy manifest files, data use, required reason API). Xcode helps edit `.xcprivacy` files.
- The finder script runs via a remote `curl` pipe in the source; the source also offers downloading and inspecting it first, then running it with `python3`. Inspect before running.
- Required reason APIs can come from `platform.posix`, for example `fstat`.
- Compose Multiplatform may result in `fstat`, `stat` and `mach_absolute_time` usages in the binary. If you must specify reasons, use `0A2A.1` for `stat` and `fstat`, and `35F9.1` for `mach_absolute_time`.
- Kotlin/Native runtime in 1.9.10 or earlier: the `mimalloc` allocator uses `mach_absolute_time`. Upgrade to 1.9.20 or later; if impossible, set `-Xallocator=custom` or `-Xallocator=std` in the Gradle build script.
- The page reflects the Kotlin team's current understanding and is updated as more is learned; unresolved cases go to YouTrack KT-67603.
- Distinct from apple-distribution (App Store submission and privacy manifests in general) and apple-swift: this page covers only the Kotlin/Compose Multiplatform side.

## Related

- [iOS integration methods](./integration-overview.md)
- [Direct integration](./direct-integration.md)
