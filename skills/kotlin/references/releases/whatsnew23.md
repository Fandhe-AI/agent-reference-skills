---
source: https://kotlinlang.org/docs/whatsnew23.html
---

# What's new in Kotlin 2.3.0

Kotlin 2.3.0 (language release, released December 16, 2025) stabilizes nested type aliases and data-flow-based exhaustiveness checks, adds the unused return value checker and explicit backing fields (both Experimental), supports Java 25, and stabilizes `kotlin.time.Clock` / `Instant`.

## Signature / Usage

```kotlin
// Explicit backing fields (Experimental in 2.3.0, -Xexplicit-backing-fields; Stable in 2.4.0)
val city: StateFlow<String>
    field = MutableStateFlow("")

fun updateCity(newCity: String) {
    // Smart casting works automatically
    city.value = newCity
}
```

### Highlights

| Area | Change |
| --- | --- |
| Language | Stable nested type aliases and data-flow exhaustiveness; unused return value checker; explicit backing fields; context-sensitive resolution changes |
| Kotlin/JVM | Java 25 bytecode |
| Kotlin/Native | Swift export enums and variadics, C / Objective-C import in Beta, up to 40% faster release builds |
| Kotlin/Wasm | Fully qualified names by default, Latin-1 compact string storage, new exception handling proposal for `wasmWasi` |
| Kotlin/JS | Experimental suspend function export, `BigInt64Array` for `LongArray`, unified companion access, `@JsExport.Default` |
| Gradle | Gradle 7.6.3 through 9.0.0, AGP 8.2.2 to 8.13.0, generated sources registration API |
| Standard library | Stable `Clock` / `Instant`; UUID parsing and generation improvements |

To update, change the Kotlin version to 2.3.0 in your build scripts (the plugin is bundled in IntelliJ IDEA and Android Studio).

### Language

#### Stable and default features

- Stable: nested type aliases, data-flow-based exhaustiveness checks for `when`.
- Enabled by default: `return` in expression bodies with explicit return types.

#### Unused return value checker (Experimental)

Warns when an expression returns a value other than `Unit` / `Nothing` that is not used (increments `++` / `--` are ignored). Modes:

| Option | Behavior |
| --- | --- |
| `-Xreturn-value-checker=check` | Reports only for marked expressions (most stdlib functions, and your `@MustUseReturnValues` scopes) |
| `-Xreturn-value-checker=full` | Treats all project files as `@MustUseReturnValues` |

```kotlin
// Marks all functions and classes in this file so the checker reports unused return values
@file:MustUseReturnValues

package my.project

fun someFunction(): String
```

```kotlin
@IgnorableReturnValue
fun <T> MutableList<T>.addAndIgnoreResult(element: T): Boolean {
    return add(element)
}

fun main() {
    // Suppresses the warning only at this call site with a special unused variable
    val _ = computeValue()
}
```

`@IgnorableReturnValue` suppresses warnings on a function; assigning to `val _` suppresses it at one call site. KEEP-0412; feedback at KT-12719.

#### Explicit backing fields (Experimental)

Declares the backing field type directly in the property scope, replacing the private backing property pattern (`_city` / `city`); the compiler smart-casts to the field type inside the private scope. Opt in with `-Xexplicit-backing-fields`. KEEP: explicit-backing-fields; feedback at KT-14663.

#### Context-sensitive resolution (Experimental)

- Sealed and enclosing supertypes of the current type are now part of the contextual search scope; no other supertype scopes are considered (KT-77823).
- A warning is reported when context-sensitive resolution makes type operators or equality ambiguous, for example with a clashing imported class (KT-77821).

### Kotlin/JVM

Starting with 2.3.0 the compiler can generate Java 25 bytecode.

### Kotlin/Native

- Swift export maps Kotlin enum classes to native Swift enums and `vararg` functions to Swift variadic parameters (generic types in variadic parameters are not supported yet).
- C and Objective-C library import is Beta; `@ExperimentalForeignApi` is still required for some `kotlinx.cinterop.*` APIs and non-platform native library declarations.
- Explicit parameter names in block types for Objective-C headers are the default; disable with `kotlin.native.binary.objcExportBlockExplicitParameterNames=false`.
- Release link tasks such as `linkReleaseFrameworkIosArm64` can be up to 40% faster.
- Minimum Apple versions raised: iOS / tvOS 12.0 to 14.0, watchOS 5.0 to 7.0 (override with `-Xoverride-konan-properties=minVersion.<os>=<ver>`, not guaranteed to work). `macosX64`, `iosX64`, `tvosX64`, `watchosX64` are demoted to support tier 3; removal of x86_64 Apple targets is planned for Kotlin 2.4.0.

### Kotlin/Wasm

- `KClass.qualifiedName` (fully qualified names) is enabled by default.
- String literals with only Latin-1 characters are stored as UTF-8 (up to 13% smaller binaries in the KotlinConf app).
- The new exception handling proposal is default for `wasmWasi`; for `wasmJs` it is opt-in via `-Xwasm-use-new-exception-proposal`.

### Kotlin/JS

- Experimental export of suspend functions with `@JsExport`: `-Xenable-suspend-function-exporting`.
- Experimental `BigInt64Array` representation of `LongArray`: `-Xes-long-as-bigint`.
- Companion objects inside exported interfaces are accessed uniformly as `Foo.Companion.bar()` across module systems; `@JsStatic` is allowed in interfaces with companion objects; `@JsQualifier` can be applied to individual functions and classes.
- `@JsExport.Default` generates an `export default` for ES modules.

### Gradle

- Gradle 7.6.3 through 9.0.0; AGP minimum 8.2.2, maximum 8.13.0.
- New Experimental `KotlinSourceSet` API (`generatedKotlin`) to register generated sources, useful for tools such as KSP.

### Standard library

- `kotlin.time.Clock` and `kotlin.time.Instant` are stable.
- UUID API (Experimental, `@OptIn(ExperimentalUuidApi::class)` or `-opt-in=kotlin.uuid.ExperimentalUuidApi`): `Uuid.parseOrNull()`, `Uuid.parseHexDashOrNull()`, `Uuid.parseHexOrNull()`; `Uuid.generateV4()` and `Uuid.generateV7()` (`Uuid.random()` still generates v4); `Uuid.generateV7NonMonotonicAt(instant)` (no monotonic ordering guarantee).

```kotlin
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
fun main() {
    val valid = Uuid.parseOrNull("550e8400-e29b-41d4-a716-446655440000")
    println(valid)
    // 550e8400-e29b-41d4-a716-446655440000

    val invalid = Uuid.parseOrNull("not-a-uuid")
    println(invalid)
    // null
}
```

### Compose compiler

Stack traces for minified Android apps: when R8 minifies, the Compose Compiler Gradle plugin appends group key entries to ProGuard mapping files. Requires Compose runtime 1.10 or newer; enable with `Composer.setDiagnosticStackTraceMode(ComposeStackTraceMode.GroupKeys)` before initializing `@Composable` content. Disable the mapping task with `composeCompiler { includeComposeMappingFile.set(false) }`. Known issue: KT-83099.

## Notes

- Breaking changes: `-language-version=1.8` no longer supported (and 1.9 on non-JVM platforms); language feature sets older than 2.0 (except 1.9 on JVM) are not supported while the language stays backward-compatible with Kotlin 1.0; Kotlin Multiplatform Android targets move to Google's `com.android.kotlin.multiplatform.library` plugin (rename `androidTarget` blocks to `android`); with AGP 9.0.0 or later the `kotlin-android` plugin produces a configuration error because AGP has built-in Kotlin support; Ant build system support is removed.
- Explicit backing fields and the stable status of several features changed in 2.4.0; see `whatsnew24.md`.

## Related

- [What's new in Kotlin 2.3.20](./whatsnew2320.md)
- [What's new in Kotlin 2.4.0](./whatsnew24.md)
- [Compatibility guide for Kotlin 2.3.x](./compatibility-guide-23.md)
- [Unused return value checker](../functions/unused-return-value-checker.md)
- [UUIDs](../stdlib/uuids.md)
