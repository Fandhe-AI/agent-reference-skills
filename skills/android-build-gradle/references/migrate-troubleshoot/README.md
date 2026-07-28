# migrate-troubleshoot

| Name | Description | Path |
|------|-------------|------|
| Build Speed Optimization | Gradle daemon warm-up, parallel execution, `org.gradle.jvmargs` heap tuning. | [build-speed-optimization.md](./build-speed-optimization.md) |
| Build Cache and Configuration Cache | `org.gradle.caching` and `org.gradle.configuration-cache` settings and behavior. | [build-cache-configuration-cache.md](./build-cache-configuration-cache.md) |
| Migrate from kapt to KSP | Replacing kapt annotation processing with the faster Kotlin-first KSP. | [migrate-to-ksp.md](./migrate-to-ksp.md) |
| Migrate to Kotlin DSL | Converting `build.gradle` (Groovy) to `build.gradle.kts` (Kotlin). | [migrate-to-kotlin-dsl.md](./migrate-to-kotlin-dsl.md) |
| AGP Upgrade Assistant | Android Studio tool for automated AGP version upgrades. | [agp-upgrade-assistant.md](./agp-upgrade-assistant.md) |
| AGP / Gradle Version Compatibility | AGP-to-Gradle minimum version table and Gradle Wrapper update commands. | [agp-gradle-version-compatibility.md](./agp-gradle-version-compatibility.md) |
| JDK Configuration | JDK requirements for AGP, Gradle JDK settings, and Java/Kotlin toolchain configuration. | [jdk-configuration.md](./jdk-configuration.md) |
| Namespace Migration | `namespace` build property replacing the deprecated manifest `package` attribute. | [namespace-migration.md](./namespace-migration.md) |
| Manifest Merger Conflicts | `tools:node` / `tools:replace` / `tools:remove` markers for resolving manifest merge conflicts. | [manifest-merger-conflicts.md](./manifest-merger-conflicts.md) |
| Build Analyzer | Android Studio tool for identifying build duration bottlenecks and warnings. | [build-analyzer.md](./build-analyzer.md) |
| Debug Dependency Resolution Errors | Duplicate class errors and classpath version conflicts, dependency tree inspection. | [dependency-resolution-errors.md](./dependency-resolution-errors.md) |
