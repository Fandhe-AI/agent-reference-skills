# build-tools

| Name | Description | Path |
|------|-------------|------|
| Build tools API | The Build tools API (BTA) is a single entry point that build systems implement to integrate with the Kotlin compiler (incremental compilation, compiler plugins, daemons, Multiplatform) without deep integration with compiler internals. | [build-tools-api.md](./build-tools-api.md) |
| Gradle best practices | Best practices for Gradle builds of Kotlin projects, split into organizing and optimizing. | [gradle-best-practices.md](./gradle-best-practices.md) |
| Binary compatibility validation in the Kotlin Gradle plugin | The Kotlin Gradle plugin generates ABI dumps from the current code and compares them with previous dumps, so library authors can find potentially binary-incompatible changes. | [gradle-binary-compatibility-validation.md](./gradle-binary-compatibility-validation.md) |
| Compilation and caches in the Kotlin Gradle plugin | Covers incremental compilation, Gradle build and configuration cache support, Kotlin daemon JVM arguments, rolling back the compiler, trying the next language version, and build reports. | [gradle-compilation-and-caches.md](./gradle-compilation-and-caches.md) |
| Compiler options in the Kotlin Gradle plugin | Configure Kotlin compiler options with the Gradle `compilerOptions {}` DSL at the extension, target, and compilation-unit (task) levels. | [gradle-compiler-options.md](./gradle-compiler-options.md) |
| Configure a Gradle project | Add the Kotlin Gradle plugin (KGP) to `build.gradle(.kts)`, then configure dependencies, repositories, JVM toolchains, and targets. | [gradle-configure-project.md](./gradle-configure-project.md) |
| Support for Gradle plugin variants | Gradle 7.0 introduced plugins with variants; the Kotlin team ships different Kotlin Gradle plugin (KGP) variants per Gradle version. | [gradle-plugin-variants.md](./gradle-plugin-variants.md) |
| Gradle | Gradle is a build system that downloads required dependencies, packages your code, and prepares it for compilation. | [gradle.md](./gradle.md) |
| Kotlin daemon | The Kotlin daemon is a background process that keeps the compiler and its environment ready, avoiding a new JVM start and compiler reinitialization per compilation. | [kotlin-daemon.md](./kotlin-daemon.md) |
| Package your Maven application | Create a standard JAR or a self-contained (fat) JAR with all dependencies, runnable on any machine with a JRE. | [maven-compile-package.md](./maven-compile-package.md) |
| Configure a Maven project | Add the Kotlin Maven plugin (`kotlin-maven-plugin`) to compile Kotlin sources and modules, either automatically through the `<extensions>` option or manually. | [maven-configure-project.md](./maven-configure-project.md) |
| Configure Kotlin compiler for your Maven project | `kotlin-maven-plugin` lets you specify compiler options, choose an execution strategy, and enable incremental compilation. | [maven-kotlin-compiler.md](./maven-kotlin-compiler.md) |
| Set repositories and dependencies in a Maven project | Configure extra repositories beyond Maven Central and declare Kotlin standard library, test, and kotlinx dependencies, optionally managed by the Kotlin BOM. | [maven-set-dependencies.md](./maven-set-dependencies.md) |
| Maven | Maven manages Kotlin-only or mixed Kotlin-Java JVM projects: downloads dependencies, compiles, and packages your code. | [maven.md](./maven.md) |
</content>
