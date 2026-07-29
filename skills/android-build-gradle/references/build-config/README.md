# build-config

| Name | Description | Path |
|------|-------------|------|
| android {} block | Top-level DSL block in the module `build.gradle.kts`… | [android-block.md](./android-block.md) |
| buildFeatures | Nested block inside `android { }` that turns on/off… | [build-features.md](./build-features.md) |
| buildTypes | Nested block inside `android { }` that defines how a… | [build-types.md](./build-types.md) |
| compileOptions, kotlinOptions, and kotlin { jvmToolchain() } | Controls which Java/Kotlin language version is used… | [compile-kotlin-options.md](./compile-kotlin-options.md) |
| defaultConfig | Nested block inside `android { }` that sets default… | [default-config.md](./default-config.md) |
| gradle.properties | Project-wide file (not part of the Kotlin/Groovy… | [gradle-properties.md](./gradle-properties.md) |
| lint {} | Nested block inside `android { }` that configures… | [lint-config.md](./lint-config.md) |
| local.properties and sdk.dir | Machine-local configuration file at the project… | [local-properties.md](./local-properties.md) |
| Module build.gradle.kts | The subproject-level build file (e.g.… | [module-build-gradle.md](./module-build-gradle.md) |
| Multidex (multiDexEnabled, MultiDexApplication, multiDexKeepProguard) | Configuration required when an app (or its test APK)… | [multidex.md](./multidex.md) |
| Custom C/C++ build system integration (externalNativeBuild, ndk {} block) | `externalNativeBuild` links a module's Gradle build… | [native-build-cmake.md](./native-build-cmake.md) |
| Native (C/C++) dependencies via Prefab | `buildFeatures.prefab` lets a module consume… | [native-dependencies-prefab.md](./native-dependencies-prefab.md) |
| packaging | Nested block inside `android { }` that controls… | [packaging.md](./packaging.md) |
| plugins {} block and AGP plugin IDs | Declares which Gradle plugins apply to a build file.… | [plugins-block.md](./plugins-block.md) |
| productFlavors and flavorDimensions | Product flavors create different versions of an app… | [product-flavors.md](./product-flavors.md) |
| Root build.gradle.kts | The build file at the project root. Its role is… | [root-build-gradle.md](./root-build-gradle.md) |
| settings.gradle.kts | Gradle settings file at the project root. Read… | [settings-gradle.md](./settings-gradle.md) |
| signingConfigs | Nested block inside `android { }` that declares… | [signing-configs.md](./signing-configs.md) |
| sourceSets | Nested block inside `android { }` used to customize… | [source-sets.md](./source-sets.md) |
| testOptions | Nested block inside `android { }` that configures… | [test-options.md](./test-options.md) |
