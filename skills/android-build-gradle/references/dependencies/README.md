# dependencies

| Name | Description | Path |
|------|-------------|------|
| Annotation Processors | How to add and configure annotation processors as project dependencies in an Android Gradle build. | [annotation-processors.md](./annotation-processors.md) |
| Compose BOM | A Bill of Materials that manages the versions of every Jetpack Compose library by specifying only the BOM version. | [compose-bom.md](./compose-bom.md) |
| Dependency Configurations | Configurations (`implementation`, `api`, `compileOnly`, etc.) that determine how a dependency is added to the compile classpath and build output. | [dependency-configurations.md](./dependency-configurations.md) |
| Dependency Coordinates | The `group:artifact:version` (GAV) syntax for remote binary dependencies, plus local module and file dependencies. | [dependency-coordinates.md](./dependency-coordinates.md) |
| Dependency Exclusion and Constraints | Controlling transitive dependency versions: `exclude` removes a transitive dependency, `constraints` sets a minimum version, and `resolutionStrategy` forces an outcome. | [dependency-exclusion.md](./dependency-exclusion.md) |
| Dependency Verification | Gradle feature that mitigates supply-chain attacks by validating artifacts against checksums and/or PGP signatures in `gradle/verification-metadata.xml`. | [dependency-verification.md](./dependency-verification.md) |
| Gradle Dependency Resolution | How Gradle resolves versions across direct and transitive dependencies, including version catalogs and BOMs. | [gradle-dependency-resolution.md](./gradle-dependency-resolution.md) |
| KSP vs kapt | KSP (Kotlin Symbol Processing) is the Kotlin-first replacement for kapt, analyzing Kotlin code directly instead of generating Java stubs. | [ksp-vs-kapt.md](./ksp-vs-kapt.md) |
| Migrate to Version Catalogs | Incremental, per-dependency migration path from hardcoded `build.gradle` dependency strings to a `libs.versions.toml` version catalog. | [migrate-to-catalogs.md](./migrate-to-catalogs.md) |
| Repository Declarations | Declares where Gradle looks up dependency artifacts, via the `dependencyResolutionManagement` block in `settings.gradle.kts`. | [repositories.md](./repositories.md) |
| Tool and Library Dependencies | Relationships between source code, library dependencies, and tools in an Android build, and how Gradle scopes group dependencies. | [tool-and-library-dependencies.md](./tool-and-library-dependencies.md) |
| Build Variant-Specific Dependencies | Dependencies scoped to a single build type, product flavor, or their combination, by prefixing the configuration name with the variant name. | [variant-specific-dependencies.md](./variant-specific-dependencies.md) |
| Version Catalog | Centralizes dependency and plugin versions in `gradle/libs.versions.toml`, exposed via type-safe `libs.*` accessors. | [version-catalog.md](./version-catalog.md) |
| Viewing and Resolving Dependencies | Inspecting the resolved dependency tree to understand version conflicts, using the Gradle `dependencies` task. | [viewing-dependencies.md](./viewing-dependencies.md) |
