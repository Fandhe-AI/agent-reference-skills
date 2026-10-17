---
source: https://kotlinlang.org/docs/whatsnew24.html
---

# What's new in Kotlin 2.4.0

Kotlin 2.4.0 is a language release: stable context parameters, explicit backing fields and annotation use-site target rules, collection literals (Experimental), a stable `Uuid` API, Java 26 support, Swift export in Alpha, and Maven / Gradle improvements.

## Signature / Usage

```kotlin
// Explicit context arguments (Experimental, -Xexplicit-context-arguments)
class EmailSender
class SmsSender

context(emailSender: EmailSender)
fun sendNotification() {
    println("Sent email notification")
}

context(smsSender: SmsSender)
fun sendNotification() {
    println("Sent SMS notification")
}

context(defaultEmailSender: EmailSender, defaultSmsSender: SmsSender)
fun notifyUser() {
    // Selects the overload with the EmailSender context parameter
    sendNotification(emailSender = defaultEmailSender)

    // Selects the overload with the SmsSender context parameter
    sendNotification(smsSender = defaultSmsSender)
}
```

### Highlights

| Area | Change |
| --- | --- |
| Language | Stable context parameters (except context arguments and callable references), explicit backing fields, `@all` meta-target and new use-site target defaults |
| Standard library | Stable `kotlin.uuid.Uuid`, `isSorted*()` checks, `UInt` / `ULong` `.toBigInteger()` on JVM |
| Kotlin/JVM | Java 26 bytecode, annotations in metadata enabled by default |
| Kotlin/Native | Swift package import, Swift export in Alpha, CMS GC default, LLVM 21, Xcode 26.4 |
| Kotlin/Wasm | Incremental compilation default, WebAssembly Component Model (Experimental) |
| Kotlin/JS | Value class export, ES2015 features in `js()` inlining, variance preserved in TypeScript output |
| Gradle / Maven | Gradle 7.6.3 through 9.5.0, minimum AGP 8.5.2; Maven JVM target alignment and Toolchains |
| Compiler | Intra-module inlining during klib compilation |

### Stable in 2.4.0

- Context parameters, except explicit context arguments and callable references.
- `@all` meta-target for properties and the new defaulting rules for use-site annotation targets.
- Explicit backing fields.
- `kotlin.uuid.Uuid` (the V4 / V7 generation functions stay Experimental).
- `UInt.toBigInteger()` / `ULong.toBigInteger()` on JVM, `isSorted*()` checks.
- Value class export to JS/TS, ES2015 features in JS inlining.
- Maven automatic Java / JVM target alignment, Maven Toolchains.

### Experimental language features (opt-in)

| Feature | Compiler option |
| --- | --- |
| Explicit context arguments for context parameters | `-Xexplicit-context-arguments` |
| Collection literals | `-Xcollection-literals` |
| Improved compile-time constants | `-Xintrinsic-const-evaluation` |
| `returnsResultOf()` contract (unused return value checker) | `-Xallow-returns-result-of` |
| `@IntroducedAt` version-based overloads | `@OptIn(ExperimentalVersionOverloading::class)` |

```kotlin
kotlin {
    compilerOptions {
        freeCompilerArgs.add("-Xcollection-literals")
    }
}
```

```kotlin
fun main() {
    // Mutable list with brackets syntax
    val shapes: MutableList<String> = ["triangle", "square", "circle"]
    println(shapes)
    // [triangle, square, circle]
}
```

- Collection literals: without enough type information the type defaults to `List`; custom types participate through `operator fun of` in a companion object. They cannot yet construct Java-defined collections (KT-80494).
- Improved compile-time constants: unsigned operations, standard library string functions such as `.lowercase()`, `.uppercase()`, `.trim()`, and evaluation of the `.name` of enum constants and `KCallable`. The new `IntrinsicConstEvaluation` annotation marks functions evaluated at compile time; not all are annotated yet.
- `returnsResultOf()` contract: lets the unused return value checker tell ignorable results from higher-order functions that return a lambda result (like `let`). Uses `@OptIn(ExperimentalContracts::class)`; produces pre-release binaries that earlier compilers cannot read.

```kotlin
@OptIn(ExperimentalContracts::class)
inline fun <T, R> T.customLet(block: (T) -> R): R {
    contract {
        returnsResultOf(block)
    }
    return block(this)
}
```

- `@IntroducedAt("1.1")` on newly added optional parameters makes the compiler generate hidden overloads for older versions; combining with `@JvmOverloads` yields a warning (the `@IntroducedAt` overloads win if suppressed).
- No deprecation warning is reported when a deprecated symbol is referenced in the last segment of an import (KT-30155).

### Standard library

- `Uuid`: stable since 2.4.0. Parsing (`parse`, `parseHexDash`, `parseHex`, and `*OrNull` variants), `<` / `>` comparison, and Java conversions were added over earlier releases.
- Sorted-order checks on iterables, arrays, and sequences: `.isSorted()`, `.isSortedDescending()`, `.isSortedWith(comparator)`, `.isSortedBy(selector)`, `.isSortedByDescending(selector)`. They return `true` for fewer than two elements and stop at the first out-of-order pair.

```kotlin
data class User(val name: String, val age: Int)

fun main() {
    val numbers = listOf(1, 2, 3, 4)
    println(numbers.isSorted())
    // true

    val users = listOf(User("Alice", 24), User("Bob", 31), User("Charlie", 29))
    println(users.isSortedBy(User::age))
    // false
}
```

- Map fallbacks for nullable values (Experimental, `@OptIn(ExperimentalStdlibApi::class)`): `.getOrElseIfNull(key, defaultValue)` / `.getOrPutIfNull(key, defaultValue)` (default when key missing or value `null`); `.getOrElseIfMissing(key, defaultValue)` / `.getOrPutIfMissing(key, defaultValue)` (default only when key missing). Feedback at KT-67337.

### Kotlin/JVM

- Java 26 bytecode is supported.
- Annotations in Kotlin metadata (readable via the Kotlin Metadata JVM library) are written by default.

### Kotlin/Native

- Swift export is Alpha: suspend functions export as Swift `async`, `kotlinx.coroutines` `Flow` exports as `AsyncSequence` (via `.asAsyncSequence()`).
- Swift package import in Gradle (`swiftPMDependencies { swiftPackage(url = ..., version = from("..."), products = listOf(product("...")) ) }`).
- Concurrent mark and sweep (CMS) GC is the default; revert with `kotlin.native.binary.gc=pmcs` in `gradle.properties`.
- Lower peak memory in devirtualization analysis, Xcode 26.4 support, LLVM 19 to 21.
- Default minimum Apple versions: iOS / tvOS 15.0 (from 14.0), macOS 12.0 (from 11.0), watchOS 8.0 (from 7.0); override via `-Xoverride-konan-properties=minVersion.<os>=<ver>`.

### Kotlin/Wasm

- Incremental compilation is Stable and default; disable with `kotlin.incremental.wasm=false`.
- Compiler-generated internal variables use a `~` prefix in Chrome DevTools.
- Experimental WebAssembly Component Model support (feedback KT-64569).

### Kotlin/JS

- `@JsExport` on `@JvmInline value class` exports it as a regular TypeScript class.
- `js()` inlining supports `const` / `let`, ES classes, generators, arrow functions, spread / rest, template strings (the argument must be a string constant).
- `in` / `out` variance is preserved in the generated `.d.ts`.
- `@JsNoRuntime` on interfaces maps them to plain TypeScript interfaces; `is` / `as` checks, `::class`, and reified type arguments are prohibited for them. Avoid on external interfaces.
- Exported interfaces may contain nested classes and named companion objects.

### Gradle and Maven

- Gradle 7.6.3 through 9.5.0 fully compatible; minimum supported AGP is 8.5.2.
- Default module names are `{group}:{project_name}` on all platforms; revert on JVM with `kotlin { compilerOptions.moduleName(project.name) }`.
- KGP writes compiler messages to Gradle's Problems API for Kotlin/JVM.
- Maven: with `<extensions>true</extensions>` the plugin derives the JVM target from `maven.compiler.release` (sets `jvmTarget` and `jdkRelease`), else from `maven.compiler.target` (only `jvmTarget`). Only project-level properties and global `maven-compiler-plugin` config are checked, not `<executions>`.
- Maven Toolchains: JDK priority is `jdkHome` in plugin config, then `maven-toolchains-plugin`, then `JAVA_HOME`; `<jdkToolchain>` affects only Kotlin compilation. `kapt` / `test-kapt` goals ignore toolchains (KT-79897).

```xml
<properties>
    <maven.compiler.release>17</maven.compiler.release>
    <kotlin.version>2.4.21</kotlin.version>
</properties>

<build>
    <plugins>
        <plugin>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-plugin</artifactId>
            <version>${kotlin.version}</version>
            <extensions>true</extensions>
        </plugin>
    </plugins>
</build>
```

### Build tools API

- Type-safe abstractions for most JVM and common compiler options (backwards-compatible at runtime, may break source compatibility).
- `BaseIncrementalCompilationConfiguration.TRACK_CONFIGURATION_INPUTS` tracks non-source changes; `AbiValidationToolchain` supports binary compatibility validation; `CompilerMessageRenderer` customizes messages.
- Kotlin daemon logging options: `LOGS_PATH`, `LOGS_FILE_SIZE_LIMIT`, `LOGS_FILE_COUNT_LIMIT` (set on the daemon execution policy; `null` means no limit).

### Compiler and compiler plugins

- Intra-module inlining during `.klib` compilation is the default for Native / JS / Wasm; disable with `-Xklib-ir-inliner=disabled`; cross-module inlining is available with `-Xklib-ir-inliner=full` (planned default later).
- Partial library linkage is always on; `-Xpartial-linkage` is deprecated; default log level `SILENT`, change with `-Xpartial-linkage-loglevel=INFO|WARNING|ERROR`.
- kapt (Maven): `includeCompileClasspath` / `kapt.include.compile.classpath=false` excludes processors not listed in `<annotationProcessorPaths>`; otherwise a deprecation warning is reported.
- Power-assert: new runtime library with `CallExplanation` and the `@PowerAssert` annotation.
- Compose compiler: runtime-inferred stability of `internal` types (artifact size may grow; R8 removes the overhead); `StrongSkipping`, `IntrinsicRemember` and associated DSL are `DeprecationLevel.ERROR` and will be removed in Kotlin 2.5.0; `OptimizeNonSkippingGroups` and `PausableComposition` are deprecated and scheduled for removal in 2.6.0.

## Notes

- Release date: this page states "Released: July 14, 2026", but the release process page (`releases.md`) lists 2.4.0 as released June 3, 2026 and July 14, 2026 as the date of bug fix release 2.4.10. Treat the release process page as authoritative for dates.
- Breaking changes: `-language-version=1.9` is no longer supported (K1 compiler dropped); the KGP binary compatibility validation DSL is streamlined; Kotlin script execution through the `KotlinScriptMojo` Maven plugin is removed. Full list: `compatibility-guide-24.md`.
- Experimental items above are pre-stable; consult `components-stability.md` and `kotlin-language-features-and-proposals.md` before relying on them.

## Related

- [What's new in Kotlin 2.4.20](./whatsnew2420.md)
- [Compatibility guide for Kotlin 2.4.x](./compatibility-guide-24.md)
- [What's new in Kotlin 2.3.0](./whatsnew23.md)
- [Kotlin language features and proposals](./kotlin-language-features-and-proposals.md)
- [Context parameters](../functions/context-parameters.md)
- [UUIDs](../stdlib/uuids.md)
