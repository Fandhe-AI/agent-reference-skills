# dependencies

| Name | Description | Path |
|------|-------------|------|
| Dependency Configurations | `implementation` / `api` / `compileOnly` / `runtimeOnly` / `testImplementation` / `androidTestImplementation` / `ksp` / `kapt` / `annotationProcessor` / `lintChecks` / `lintPublish` configurations. | [dependency-configurations.md](./dependency-configurations.md) |
| Dependency Coordinates | `group:artifact:version` (GAV) syntax and local module/file dependencies. | [dependency-coordinates.md](./dependency-coordinates.md) |
| Repository Declarations | `dependencyResolutionManagement` / `repositories { google() mavenCentral() }` in `settings.gradle.kts`. | [repositories.md](./repositories.md) |
| Version Catalog | `gradle/libs.versions.toml` `[versions]` / `[libraries]` / `[plugins]` / `[bundles]` and the `libs.*` accessor. | [version-catalog.md](./version-catalog.md) |
| Compose BOM | `platform("androidx.compose:compose-bom:...")` for unified Compose library versioning. | [compose-bom.md](./compose-bom.md) |
| Dependency Exclusion and Constraints | `exclude`, `constraints { }`, `resolutionStrategy` / `strictly` for controlling transitive dependency versions. | [dependency-exclusion.md](./dependency-exclusion.md) |
| Viewing and Resolving Dependencies | `./gradlew app:dependencies` and reading the resolved dependency tree. | [viewing-dependencies.md](./viewing-dependencies.md) |
| KSP vs kapt | Migrating annotation processors from `kapt` to `ksp` (Kotlin Symbol Processing). | [ksp-vs-kapt.md](./ksp-vs-kapt.md) |
| Build Variant-Specific Dependencies | Variant-prefixed configurations such as `debugImplementation` / `freeImplementation` / `freeDebugImplementation`. | [variant-specific-dependencies.md](./variant-specific-dependencies.md) |
