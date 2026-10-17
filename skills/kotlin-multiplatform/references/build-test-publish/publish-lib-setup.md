---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-publish-lib-setup.html
---

# Setting up multiplatform library publication

Publishing a multiplatform library to a local Maven repository, Maven Central, or GitHub Packages; structure of publications, host requirements, Android library publication, and sources publication.

## Signature / Usage

Local Maven repository with `maven-publish`:

```kotlin
plugins {
    // ...
    id("maven-publish")
}

group = "com.example"
version = "1.0"

publishing {
    repositories {
        maven {
            //...
        }
    }
}
```

Publication tasks:

```bash
./gradlew publishAllPublicationsToGithubPackagesRepository
./gradlew publishToMavenLocal
./gradlew publishKotlinMultiplatformPublicationToMavenLocal
./gradlew publish<TargetName>PublicationToMavenLocal
```

Android library (Android Gradle Library Plugin):

```kotlin
kotlin {
    androidLibrary {
        namespace = "org.example.library"
        compileSdk = libs.versions.android.compileSdk.get().toInt()
        minSdk = libs.versions.android.minSdk.get().toInt()

        // Enables Java compilation support.
        // This improves build times when Java compilation is not needed
        withJava()

        compilations.configureEach {
            compilerOptions.configure {
                jvmTarget.set(
                    JvmTarget.JVM_11
                )
            }
        }
    }
}
```

Opt in to test source sets:

```kotlin
kotlin {
    androidLibrary {
        // ...

        // Opt in to enable and configure host-side (unit) tests
        withHostTestBuilder {}.configure {}

        // Opt in to enable device tests, specifying the source set name
        withDeviceTestBuilder {
            sourceSetTreeName = "test"
        }

        // ...
    }
}
```

Disable sources publication:

```kotlin
kotlin {
    withSourcesJar(publish = false)

    jvm()
    linuxX64()
}
```

## Notes

- With `maven-publish`, the Kotlin plugin automatically creates publications for each target buildable on the current host, except Android, which needs additional configuration.
- Publications consist of one Maven publication per target plus an umbrella root publication `kotlinMultiplatform`. Example for `group = "test"`, `version = "1.0"`, project name `lib` with `jvm()` and `iosArm64()`: `test:lib-jvm:1.0`, `test:lib-iosarm64:1.0` (target-specific) and `test:lib:1.0` (root). Each target publication is independent (`publishJvmPublicationTo<MavenRepositoryName>` publishes only the JVM module). The root publication references all target-specific ones; when added as a dependency to the common source set it resolves to the platform artifacts.
- Repositories such as Maven Central require the root module to contain a classifier-free JAR; the plugin produces it automatically with embedded metadata artifacts. If sources or documentation artifacts are required for `kotlinMultiplatform`, use `artifact()` in the publication scope.
- `publishAllPublicationsTo<MavenRepositoryName>` and `publishToMavenLocal` publish root and target publications together. Alternatively publish the root first (this publishes a `*.module` file; the targets remain unpublished) and then each target publication.
- Host requirements: Kotlin/Native supports cross-compilation so any host can produce `.klib` artifacts, but a Mac is still needed if the library or dependent modules have cinterop dependencies, CocoaPods integration is set up, or you build or test final binaries for Apple targets.
- Publish all artifacts from a single host to avoid duplicate publications; Maven Central explicitly forbids duplicates and fails the process.
- Android: by default no artifacts of an Android library are published. The `androidLibrary {}` block assumes the Android Gradle Library Plugin (migrating from legacy `com.android.library` is described in the Android documentation). It does not support product flavors and build variants, so test source sets and configurations require opt-in. CI test target changes from `testDebugUnitTest` / `testReleaseUnitTest` to `testAndroidHostTest`.
- Sources are published by default for all targets. `withSourcesJar(publish = false)` disables it for all targets; inside a target block it applies to that target only; combine `withSourcesJar(publish = false)` at the top level with `jvm { withSourcesJar(publish = true) }` to keep only JVM sources.
- Libraries meeting the criteria are added automatically to the klibs.io multiplatform library catalog.
- Gradle publishing and Android Gradle Library plugin details overlap the `android-build-gradle` skill; this page covers the Kotlin Multiplatform publication structure.

## Related

- [Publish your library to Maven Central](./publish-to-maven.md)
- [Publish your library to npm](./publish-to-npm.md)
- [Configure compilations](./configure-compilations.md)
- [Add dependencies](../project-structure/add-dependencies.md)
