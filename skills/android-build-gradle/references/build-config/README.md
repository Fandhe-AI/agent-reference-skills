# build-config

| Name | Description | Path |
|------|-------------|------|
| settings.gradle.kts | Gradle settings file: repositories, included subprojects, root project name. | [settings-gradle.md](./settings-gradle.md) |
| Root build.gradle.kts | Project root build file: common plugin classpath declaration only. | [root-build-gradle.md](./root-build-gradle.md) |
| Module build.gradle.kts | Subproject build file: plugins, android {} block, dependencies. | [module-build-gradle.md](./module-build-gradle.md) |
| plugins {} block and AGP plugin IDs | Applies AGP/Kotlin/KSP plugins to a build file. | [plugins-block.md](./plugins-block.md) |
| android {} block | Top-level Android DSL block: namespace, compileSdk, buildToolsVersion. | [android-block.md](./android-block.md) |
| defaultConfig | Shared defaults for all build variants: applicationId, minSdk, targetSdk, versionCode/Name. | [default-config.md](./default-config.md) |
| buildTypes | debug/release build configuration: minify, shrink, proguardFiles, signing. | [build-types.md](./build-types.md) |
| productFlavors and flavorDimensions | App variants (free/paid, demo/full) and build-variant naming. | [product-flavors.md](./product-flavors.md) |
| buildFeatures | Toggles Compose, ViewBinding, DataBinding, BuildConfig generation; composeOptions/composeCompiler migration note. | [build-features.md](./build-features.md) |
| sourceSets | Custom source/resource/manifest directories per source set. | [source-sets.md](./source-sets.md) |
| compileOptions, kotlinOptions, kotlin { jvmToolchain() } | Java/Kotlin language level and JDK toolchain selection. | [compile-kotlin-options.md](./compile-kotlin-options.md) |
| signingConfigs | Keystore-based signing configuration DSL. | [signing-configs.md](./signing-configs.md) |
| packaging | Resource/native-library inclusion and exclusion rules for the final artifact. | [packaging.md](./packaging.md) |
| testOptions | Unit test execution configuration (build type, default return values, JVM args). | [test-options.md](./test-options.md) |
| lint {} | Android Lint task configuration: report formats, abort behavior, disabled checks. | [lint-config.md](./lint-config.md) |
| gradle.properties | Gradle daemon environment flags: JVM args, configuration cache, Jetifier. | [gradle-properties.md](./gradle-properties.md) |
| local.properties and sdk.dir | Machine-local SDK/NDK/CMake paths, excluded from source control. | [local-properties.md](./local-properties.md) |
