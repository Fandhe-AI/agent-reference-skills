---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-project-recommended-structure.html
---

# Recommended Kotlin Multiplatform project structure

Recommended module layout (app entry points in separate modules, shared code split into logic and UI as needed) and a migration guide extracting entry points from an older single-module Compose Multiplatform project.

## Signature / Usage

Each new module is added to `settings.gradle.kts` (shown for `desktopApp`; the page does the same for `androidApp`, `webApp`, `sharedLogic`, `sharedUI`):

```kotlin
include(":desktopApp")
```

Shared module with the Android-KMP library plugin (replaces `kotlin.androidTarget {}`):

```toml
[plugins]
androidMultiplatformLibrary = { id = "com.android.kotlin.multiplatform.library", version.ref = "agp" }
```

```kotlin
androidLibrary {
    namespace = "compose.project.demo.composedemo"
    compileSdk = libs.versions.android.compileSdk.get().toInt()

    compilerOptions {
        jvmTarget = JvmTarget.JVM_11
    }

    androidResources {
        enable = true
    }
}
```

Desktop app module dependencies and `compose.desktop {}` block:

```kotlin
kotlin {
    dependencies {
        implementation(projects.sharedLogic)
        implementation(projects.sharedUI)
        implementation(compose.desktop.currentOs)
        implementation(libs.kotlinx.coroutinesSwing)
    }
}
```

```kotlin
compose.desktop {
    application {
        mainClass = "compose.project.demo.MainKt"

        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
            packageName = "compose.project.demo"
            packageVersion = "1.0.0"
        }
    }
}
```

Android app module (from the shared AGP 9 migration steps): plugins and dependencies.

```kotlin
plugins {
   alias(libs.plugins.kotlinAndroid)
   alias(libs.plugins.androidApplication)
   alias(libs.plugins.composeMultiplatform)
   alias(libs.plugins.composeCompiler)
}
```

```kotlin
kotlin {
    dependencies {
        implementation(projects.composeApp)
        implementation(libs.androidx.activity.compose)
        implementation(libs.compose.uiToolingPreview)
    }
}
```

Web app module targets:

```kotlin
kotlin {
    js {
        browser()
        binaries.executable()
    }

    @OptIn(ExperimentalWasmDsl::class)
    wasmJs {
        browser()
        binaries.executable()
    }
}
```

iOS: shared UI framework with `baseName` (the Swift `import` must match it, not the module name):

```kotlin
kotlin {
    listOf(
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            // This is the name of the iOS framework you're going
            // to import in your Swift code.
            baseName = "sharedUI"
            isStatic = true
        }
    }
}
```

## Notes

- General approach: app entry points live in separate modules, each depending on the shared code modules it needs. If all apps share both UI and business logic, a single `shared` module can be enough. If any app uses native UI (for example iOS UI in pure Swift), split into `sharedLogic` and `sharedUI` to avoid Compose Multiplatform dependencies where unneeded. With server code: an `app` folder with entry points and client common modules, a `server` module, and a `core` module for code shared by server and clients (models, validation).
- Separating Android app entry points from common code is mandatory when using Android Gradle Plugin 9 or newer. The Android-KMP library plugin (`com.android.kotlin.multiplatform.library`) is required for AGP 9 and newer.
- Migration (AGP 9): replace `kotlin.androidTarget {}` with `kotlin.androidLibrary {}`, remove the root `android {}` block from the shared module, delete `androidMain.dependencies {}` once code moved to the app module, and add `alias(libs.plugins.androidMultiplatformLibrary) apply false` to the root build script.
- Android app module steps (shared with the AGP 9 migration page): copy the `android {}` block and `androidMain` dependencies to `androidApp`, add `implementation(projects.composeApp)`, change the old `composeApp` from `androidApplication` to `androidLibrary` and remove application properties from `defaultConfig`, then move `composeApp/src/androidMain` into `androidApp/src/` and rename it to `main`. `MainActivity.kt` must live in `androidApp`; expected and actual declarations must stay in the common module.
- Desktop module: move `composeApp/src/jvmMain/kotlin` to `desktopApp/src/main/`; package coordinates must align with `compose.desktop {}`. Web module: move `composeApp/src/webMain` to `webApp/src` and change the script name in `index.html` from `composeApp.js` to `webApp.js`.
- When moving resources into `sharedUI`, move `composeApp/commonMain/composeResources` to `sharedUI/commonMain/composeResources` and re-import `Res` and drawables from the new generated package (for example `demo.sharedui.generated.resources.mx`).
- iOS integration: the iOS entry point is not a Gradle module; keep it in any module. In Xcode's "Compile Kotlin Framework" build phase use `./gradlew :shared:embedAndSignAppleFrameworkForXcode`.
- The page also lists an optional split of `sharedLogic` (with `kotlinx-datetime` 0.8.0 and `npm("@js-joda/timezone", "2.22.0")` for `webMain`) and `sharedUI`; see the official page for the full step lists.
- Distance line: Gradle/AGP configuration in general belongs to android-build-gradle; this page covers module layout for KMP projects.

## Related

- [project-configuration.md](./project-configuration.md)
- [targets-and-source-sets.md](./targets-and-source-sets.md)
- [android-dependencies.md](./android-dependencies.md)
