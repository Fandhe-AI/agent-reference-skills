# build-config

| Name | Description | Path |
|------|-------------|------|
| android {} block | Top-level DSL block in the module `build.gradle.kts` that declares Android-specific build configuration (SDK versions, namespace, nested blocks). | [android-block.md](./android-block.md) |
| Android Settings Plugin (com.android.settings) | The settings plugin centralizes common build properties (`compileSdk`, `minSdk`, `targetSdk`) for all modules in `settings.gradle`. | [android-settings-plugin.md](./android-settings-plugin.md) |
| buildFeatures | Nested block inside `android { }` that turns on/off UI-related and code-generation features per module. | [build-features.md](./build-features.md) |
| buildTypes | Nested block inside `android { }` that defines how a build is packaged and signed; combined with product flavors into build variants. | [build-types.md](./build-types.md) |
| compileOptions, kotlinOptions, and kotlin { jvmToolchain() } | Controls the Java/Kotlin language version used for compilation and the JDK toolchain that runs the build. | [compile-kotlin-options.md](./compile-kotlin-options.md) |
| Custom C/C++ Build System (Ninja) | For projects not using CMake or ndk-build, AGP integrates a custom C/C++ build system through a configure script that writes `build.ninja`. | [cxx-ninja.md](./cxx-ninja.md) |
| defaultConfig | Nested block inside `android { }` that sets default values shared by all build variants; build types and flavors can override them. | [default-config.md](./default-config.md) |
| gradle.properties | Project-wide file that configures the Gradle daemon's execution environment (JVM heap/GC, caching, Android build flags). | [gradle-properties.md](./gradle-properties.md) |
| lint {} | Nested block inside `android { }` that configures the Android Lint task: enabled/disabled issue IDs, report verbosity, and whether builds abort on error. | [lint-config.md](./lint-config.md) |
| local.properties and sdk.dir | Machine-local configuration file at the project root, read by AGP (e.g. `sdk.dir`); should be excluded from source control. | [local-properties.md](./local-properties.md) |
| Module build.gradle.kts | The subproject-level build file (e.g. `app/build.gradle.kts`) declaring the module's plugins, `android { }` block, and dependencies. | [module-build-gradle.md](./module-build-gradle.md) |
| Multidex (multiDexEnabled, MultiDexApplication, multiDexKeepProguard) | Configuration required when an app or its test APK exceeds the 64K DEX method reference limit; legacy multidex applies to `minSdk` 20 and below. | [multidex.md](./multidex.md) |
| 16 KB page size support for native libraries | Since November 1, 2025, Google Play requires new apps and updates targeting Android 15+ to support 16 KB page sizes; native libraries need 16 KB-aligned ELF `LOAD` segments. | [native-16kb-page-size.md](./native-16kb-page-size.md) |
| Custom C/C++ build system integration (externalNativeBuild, ndk {} block) | `externalNativeBuild` links a module's Gradle build to an existing CMake (`CMakeLists.txt`) or `ndk-build` (`Android.mk`) native build script. | [native-build-cmake.md](./native-build-cmake.md) |
| Native (C/C++) dependencies via Prefab | `buildFeatures.prefab` lets a module consume precompiled native libraries packaged in AARs; `prefabPublishing` lets a library publish its own. | [native-dependencies-prefab.md](./native-dependencies-prefab.md) |
| packaging | Nested block inside `android { }` that controls which files are included or excluded in the final APK/AAB and how native libraries are packaged. | [packaging.md](./packaging.md) |
| plugins {} block and AGP plugin IDs | Declares which Gradle plugins apply to a build file; determines whether a module builds as an application or library and whether Kotlin/KSP applies. | [plugins-block.md](./plugins-block.md) |
| productFlavors and flavorDimensions | Product flavors create different versions of an app (e.g. free/paid, demo/full) from one module; combined with build types they form build variants. | [product-flavors.md](./product-flavors.md) |
| Root build.gradle.kts | The project-root build file, limited to declaring the shared plugin classpath (`apply false`); it should not contain build logic. | [root-build-gradle.md](./root-build-gradle.md) |
| settings.gradle.kts | Gradle settings file at the project root, read during initialization before any `build.gradle.kts` to determine which projects are part of the build. | [settings-gradle.md](./settings-gradle.md) |
| signingConfigs | Nested block inside `android { }` that declares keystore-based signing configurations, assignable to a build type via `signingConfig`. | [signing-configs.md](./signing-configs.md) |
| sourceSets | Nested block inside `android { }` that customizes the directories scanned for sources, resources, and the manifest per source set. | [source-sets.md](./source-sets.md) |
| testOptions | Nested block inside `android { }` that configures how unit tests run in the Gradle build, including report output and default-value behavior for framework calls. | [test-options.md](./test-options.md) |
