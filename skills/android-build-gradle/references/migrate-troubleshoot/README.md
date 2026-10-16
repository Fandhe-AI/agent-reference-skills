# migrate-troubleshoot

| Name | Description | Path |
|------|-------------|------|
| AGP / Gradle Version Compatibility and Wrapper Update | Each Android Gradle plugin (AGP) version requires a minimum Gradle version; update the Gradle Wrapper with `gradle wrapper --gradle-version`. | [agp-gradle-version-compatibility.md](./agp-gradle-version-compatibility.md) |
| AGP / Kotlin / D8 / R8 Version Compatibility | Each Kotlin compiler version requires a minimum AGP version and a minimum bundled D8/R8 version. | [agp-kotlin-d8-r8-compatibility.md](./agp-kotlin-d8-r8-compatibility.md) |
| AGP Upgrade Assistant | Android Studio built-in tool (Tools > AGP Upgrade Assistant) that automates AGP upgrades: deprecated syntax, Gradle compatibility, third-party plugin checks. | [agp-upgrade-assistant.md](./agp-upgrade-assistant.md) |
| Build Analyzer | Android Studio tool (Build window > Build Analyzer tab) that surfaces the tasks, plugins, and warnings most responsible for build duration. | [build-analyzer.md](./build-analyzer.md) |
| Build Cache and Configuration Cache | `org.gradle.caching` reuses task outputs across builds; `org.gradle.configuration-cache` caches the configuration phase result. | [build-cache-configuration-cache.md](./build-cache-configuration-cache.md) |
| Build Speed Optimization | Techniques to speed up Gradle builds: daemon warm-up, parallel execution, and JVM heap tuning via `org.gradle.jvmargs`. | [build-speed-optimization.md](./build-speed-optimization.md) |
| Apply Custom Build Logic | AGP Variant API (`AndroidComponentsExtension`) for custom Gradle plugins that hook into DSL finalization, variant creation, and artifact transformation. | [custom-build-logic.md](./custom-build-logic.md) |
| Debug Dependency Resolution Errors | Duplicate class errors and classpath version conflicts between direct and transitive dependencies, plus how to inspect the tree and exclude dependencies. | [dependency-resolution-errors.md](./dependency-resolution-errors.md) |
| JDK Configuration | The JDK running Gradle/AGP must meet the plugin's minimum version; it is configured separately from the Java/Kotlin source and target compatibility. | [jdk-configuration.md](./jdk-configuration.md) |
| Manifest Merger Conflicts | The manifest merger combines variant, main app, and library manifests; `tools:node`, `tools:replace`, and `tools:remove` markers resolve merge conflicts. | [manifest-merger-conflicts.md](./manifest-merger-conflicts.md) |
| Migrate to Built-in Kotlin | AGP 9.0+ integrates the Kotlin compiler directly, enabled by default, so the separate Kotlin Android plugin is no longer needed. | [migrate-to-built-in-kotlin.md](./migrate-to-built-in-kotlin.md) |
| Migrate to Kotlin DSL | AGP 4.0+ supports Kotlin DSL (`build.gradle.kts`) instead of Groovy (`build.gradle`), with better IDE support. | [migrate-to-kotlin-dsl.md](./migrate-to-kotlin-dsl.md) |
| Migrate from kapt to KSP | Kapt is in maintenance mode; KSP (Kotlin Symbol Processing) is the recommended replacement, analyzing Kotlin code directly for faster builds. | [migrate-to-ksp.md](./migrate-to-ksp.md) |
| Namespace Migration | The `namespace` property in `build.gradle.kts` replaces the deprecated `package` attribute in `AndroidManifest.xml`. | [namespace-migration.md](./namespace-migration.md) |
| Profile Your Build (gradle-profiler) | Profile how long Gradle spends in each build phase and task, using the standalone gradle-profiler tool or the `--profile` option. | [profile-your-build.md](./profile-your-build.md) |
| Android SDK Upgrade Assistant | Android Studio tool (Tools > Android SDK Upgrade Assistant) that guides raising `targetSdkVersion` one API level at a time. | [sdk-upgrade-assistant.md](./sdk-upgrade-assistant.md) |
| Dependency Version Upgrade Strategies | How to plan, analyze, and mitigate risk when upgrading AGP, Gradle, Kotlin, the Android SDK, and library dependencies. | [version-upgrade-strategies.md](./version-upgrade-strategies.md) |
