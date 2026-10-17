# compiler

| Name | Description | Path |
|------|-------------|------|
| All-open compiler plugin | Makes classes annotated with a specific annotation, and their members, `open` without the explicit `open` keyword. | [all-open-plugin.md](./all-open-plugin.md) |
| Kotlin command-line compiler | Every Kotlin release ships with a standalone compiler (`kotlinc`). | [command-line.md](./command-line.md) |
| Compiler execution strategy | The execution strategy defines where the Kotlin compiler runs. | [compiler-execution-strategy.md](./compiler-execution-strategy.md) |
| Compiler plugins | Compiler plugins hook into the compilation process to analyze or change code while it's being compiled, without modifying the compiler itself. | [compiler-plugins-overview.md](./compiler-plugins-overview.md) |
| Kotlin compiler options | Option catalog for the Kotlin compilers (JVM, JS, Native). | [compiler-reference.md](./compiler-reference.md) |
| Compose compiler migration guide | The Compose compiler is supplemented by a Gradle plugin that simplifies setup and gives easier access to compiler options. | [compose-compiler-migration-guide.md](./compose-compiler-migration-guide.md) |
| Compose compiler options DSL | The Compose compiler Gradle plugin offers a DSL for compiler options, configured in the `composeCompiler {}` block of the module's `build.gradle.kts`. | [compose-compiler-options.md](./compose-compiler-options.md) |
| Custom compiler plugins | How to build your own compiler plugin; the Kotlin compiler plugin API is unstable and introduces breaking changes in every release. | [custom-compiler-plugins.md](./custom-compiler-plugins.md) |
| K2 compiler migration guide | The K2 compiler is the rewritten Kotlin frontend (semantic analysis, call resolution, type inference) built on one unified data structure. | [k2-compiler-migration-guide.md](./k2-compiler-migration-guide.md) |
| kapt compiler plugin | kapt lets you use existing Java annotation processors in Kotlin (Maven and Gradle). | [kapt.md](./kapt.md) |
| Running KSP from the command line | KSP is a JVM application; run it with `java` when integrating with other build systems, developing processors, testing, or debugging. | [ksp-command-line.md](./ksp-command-line.md) |
| Incremental processing | KSP reprocesses a file only when one or more of its dependencies change. | [ksp-incremental.md](./ksp-incremental.md) |
| Migrate from kapt to KSP | Migrate annotation processors from kapt to KSP. | [ksp-kapt-migration.md](./ksp-kapt-migration.md) |
| How KSP models Kotlin code | KSP represents source code as a hierarchy of symbols that processors navigate to inspect declarations, types, annotations, and other elements. | [ksp-kotlin-model.md](./ksp-kotlin-model.md) |
| Multiple-round processing | KSP processes files over multiple rounds; the output of each round is used as additional input in the next. | [ksp-multi-round.md](./ksp-multi-round.md) |
| KSP with Kotlin Multiplatform | How to use KSP in a Kotlin Multiplatform project: declare processors per target with `add("ksp<Target>", <processor>)`. | [ksp-multiplatform.md](./ksp-multiplatform.md) |
| Kotlin Symbol Processing API | Kotlin Symbol Processing (KSP) is a source code generation framework for Kotlin. | [ksp-overview.md](./ksp-overview.md) |
| Getting started with KSP | How to add KSP-based processors to a project and how to create your own processor (a `helloWorld()` generator) with the KSP API. | [ksp-quickstart.md](./ksp-quickstart.md) |
| Java annotation processing to KSP reference | Mapping of Java annotation processing API elements (`javax.lang.model`) to the closest KSP facilities. | [ksp-reference.md](./ksp-reference.md) |
| Lombok compiler plugin | Allows the generation and use of Java's Lombok declarations by Kotlin code in the same mixed Java/Kotlin module. | [lombok.md](./lombok.md) |
| No-arg compiler plugin | Generates an additional zero-argument constructor for classes with a specific annotation. | [no-arg-plugin.md](./no-arg-plugin.md) |
| Power-assert compiler plugin | Improves debugging by generating detailed failure messages with intermediate values of assertion expressions. | [power-assert.md](./power-assert.md) |
| SAM-with-receiver compiler plugin | Makes the first parameter of the annotated Java single abstract method (SAM) interface method a receiver in Kotlin. | [sam-with-receiver-plugin.md](./sam-with-receiver-plugin.md) |
