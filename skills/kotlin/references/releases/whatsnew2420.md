---
source: https://kotlinlang.org/docs/whatsnew2420.html
---

# What's new in Kotlin 2.4.20

Kotlin 2.4.20 (tooling release, released September 7, 2026) adds stdlib APIs (coroutine stack trace recovery, collection equality / uniqueness checks, lazy `kotlin.test` messages), Swift export and Wasm / JS updates, Gradle 9.7.0 support, and the `kotlinr` runner. Bug fix release 2.4.21 (October 8, 2026) has no separate feature page.

## Signature / Usage

```kotlin
import kotlin.coroutines.ExperimentalStdlibCoroutineSupportApi
import kotlin.coroutines.debug.StackTraceRecoverable

@OptIn(ExperimentalStdlibCoroutineSupportApi::class)
class FileEditException
private constructor(
    val line: Int,
    private val detail: String,
    cause: Throwable?,
) : IllegalStateException("When editing line $line: $detail", cause),
    StackTraceRecoverable<FileEditException> {

    constructor(line: Int, detail: String) : this(line, detail, null)

    // Copies the line number and message details
    override fun copyForStackTraceRecovery(): FileEditException =
        FileEditException(line, detail, this)
}
```

## Highlights

| Area | Change |
| --- | --- |
| Standard library | Coroutine stack trace recovery (`StackTraceRecoverable`), `allDistinct()` / `allDistinctBy()` / `allEqual()` / `allEqualBy()`, new lazy-message overloads for `kotlin.test` assertions |
| Kotlin/Native | New Swift export features (sealed classes, cross-language inheritance), improved incremental compilation of klib artifacts (Beta), generated `Package.swift` for SwiftPM dependencies |
| Kotlin/Wasm | `require()` in `@JsFun` is an error, companion object initialization order matches JVM, Wasmtime for `wasmWasi`, new compilation modes, smaller binaries for functional interfaces |
| Kotlin/JS | New browser testing DSL, export of suspending lambdas as async functions, consistent exportability of data classes |
| Gradle | Compatible with Gradle 7.6.3 through 9.7.0, compiler diagnostic IDs in the Problems API |
| Build tools API | New targets: Kotlin/JS, Kotlin/Wasm, Kotlin metadata (opt-in) |
| Kotlin compiler | `kotlinr` runner command, Experimental compiler native image |

To update, change the Kotlin version to 2.4.20 in your build scripts (the latest IDE versions bundle the plugin).

## Stable: `when` with `invokedynamic`

Experimental `when` compilation with `invokedynamic` on JVM 21 and later (introduced in 2.2.20) is now Stable and enabled by default. See the control-flow page (`../basics/control-flow.md`).

## Standard library

### Coroutine stack trace recovery

- `StackTraceRecoverable` (package `kotlin.coroutines.debug`) lets an exception define how `kotlinx.coroutines` creates a new instance for stack trace recovery, without a dependency on `kotlinx.coroutines`.
- `kotlinx.coroutines` recovers automatically for exceptions whose constructors take only a message, a cause, both, or no arguments. Implement the interface when the constructor has additional required arguments.
- Override `copyForStackTraceRecovery()`; return a new exception instance, or `null` to opt out of copying.
- The interface exists on all targets; `kotlinx.coroutines` uses it only on the JVM.
- Experimental; opt in with `@OptIn(ExperimentalStdlibCoroutineSupportApi::class)`. KEEP-0461; feedback at KT-86595.

### Collection equality and uniqueness checks

| Function | Checks |
| --- | --- |
| `allDistinct()` | Every value in the collection is unique |
| `allDistinctBy()` | Every object has a unique value for the selected property |
| `allEqual()` | Every value in the collection is the same |
| `allEqualBy()` | Every object has the same value for the selected property |

Available on collections, sequences, and arrays; compared with structural equality. Experimental: `@OptIn(ExperimentalStdlibApi::class)` or `-opt-in=kotlin.ExperimentalStdlibApi`.

```kotlin
@OptIn(ExperimentalStdlibApi::class)
fun main() {
    data class Response(val participantId: String, val answer: String, val responseDate: String)

    val responses = listOf(
        Response("P001", "Yes", "2026-07-21"),
        Response("P002", "Maybe", "2026-07-21"),
        Response("P003", "No", "2026-07-21")
    )

    println(responses.allEqualBy { it.answer })          // false
    println(responses.allDistinctBy { it.participantId }) // true
    println(responses.allEqualBy { it.responseDate })     // true
}
```

### New overloads for `kotlin.test` assertions

Lambda-based message overloads build the failure message lazily (aligned with JUnit 5; helps the Power-assert plugin). Available for `assertTrue()` / `assertFalse()`, `assertEquals()` / `assertNotEquals()`, `assertSame()` / `assertNotSame()`, `assertIs()` / `assertIsNot()`, `assertNull()`, `assertContains()`, `assertContentEquals()`. Opt in with `@OptIn(ExperimentalKotlinTestApi::class)` (KEEP-0465).

```kotlin
import kotlin.test.ExperimentalKotlinTestApi
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@OptIn(ExperimentalKotlinTestApi::class)
fun testValues(actual: Int, expected: Int, items: List<String>) {
    // The message is built only if the assertion fails
    assertTrue(actual > 0) { "Expected a positive value but got $actual" }
    assertEquals(expected, actual) { "Unexpected value for items: ${items.joinToString()}" }
}
```

## Kotlin/Native

- `assembleSharedXCFramework` now generates a `Package.swift` to distribute with an XCFramework that depends on SwiftPM packages.
- Swift export: sealed classes and interfaces map to Swift enums via a generated `sealedType()` method, enabling exhaustive `switch` without `default`.
- Swift export: cross-language inheritance (Swift classes can inherit an exported `open` Kotlin class and implement Kotlin interfaces; "reverse import" pattern).
- Incremental compilation of klib artifacts is now Beta; enable with:

```properties
kotlin.incremental.native=true
```

```swift
// Swift
let shape = createCircle()

let name = switch shape.sealedType() {
    case let .circle(type): "It's a \(type.value)"
    case let .rectangle(type): "It's a \(type.value)"
}
```

## Kotlin/Wasm

- `@JsFun` declarations that use top-level `require()` now report an error (the generated `require` in `import-object.mjs` is removed). Replace with `@JsModule`, or `import()` with `/* webpackIgnore: true */`; as a workaround, define `globalThis.require` via `module.default.createRequire(import.meta.url)`.
- Superclass companion objects are initialized before subclass companions (matches JVM).
- Wasmtime support for the `wasmWasi` target:

```kotlin
kotlin {
    wasmWasi {
        wasmtime()
    }
}
```

- Compilation modes via `kotlin.wasm.compilationMode` in `gradle.properties`:

| Mode | Compilation | Output |
| --- | --- | --- |
| `monolith` (default) | Project and dependencies compiled together | A single binary, whole-program optimization |
| `multimodule-open-world` | Each module compiled independently; recompiles only changed modules | A separate independent binary per module; no cross-module optimization (larger binaries) |
| `multimodule-closed-world` | All modules processed in one invocation; recompiles only changed modules | Separate binaries that depend on each other; unreachable declarations removed per binary |

```properties
kotlin.wasm.compilationMode=multimodule-closed-world-only-in-dev
```

- Lambdas and functional interfaces compile to functions with shared base classes: about 5-10% smaller Wasm binaries on the KotlinConf app; more dynamic calls may affect runtime performance (KT-83159).

## Kotlin/JS

- `@JsExport.Ignore` on data class constructor and properties is now honored; synthetic `copy()` / `componentN()` no longer warn about non-exported types.
- New Experimental browser testing DSL (Playwright, Mocha, webpack; replaces Karma):

```kotlin
import org.jetbrains.kotlin.gradle.ExperimentalJsTestDsl
import kotlin.time.Duration.Companion.seconds

kotlin {
    js {
        browser {
            @OptIn(ExperimentalJsTestDsl::class)
            test {
                timeout = 2.seconds
                chromium { timeout = 5.seconds }
                firefox()
                webkit()
            }
        }
    }
}
```

- Export of suspending lambdas as `async` functions with `freeCompilerArgs.add("-Xsuspend-lambda-exporting")`, then mark declarations with `@JsExport`.

## Gradle and build tools API

- Fully compatible with Gradle 7.6.3 through 9.7.0.
- The KGP Problems API integration now includes compiler diagnostic IDs and groups diagnostics by ID; enabled by default starting with Gradle 8.6.
- Build tools API (BTA) opt-in for new targets; planned to be on by default from Kotlin 2.5.0:

```properties
kotlin.wasm.runViaBuildToolsApi=true
kotlin.js.runViaBuildToolsApi=true
kotlin.metadata.runViaBuildToolsApi=true
```

## Kotlin compiler

- `kotlinr` replaces `kotlin` as the Kotlin runner command to avoid a name clash with the Kotlin Toolchain `kotlin` command; the runner warns when `kotlin` is used.
- First Experimental release of the Kotlin compiler native image, a drop-in replacement for `kotlinc` with faster startup (download from GitHub Releases for v2.4.20). It bundles Serialization, Compose compiler, All-open, no-arg, SAM with receiver, Assignment, Lombok, and Power-assert plugins, usable with `-Xplugin` or `-Xcompiler-plugin`.

## Notes

- Breaking changes and deprecations (details in the 2.4.x compatibility guide, `compatibility-guide-24.md`): `watchosArm32` target is deprecated and planned for removal in Kotlin 2.5.0 (Xcode 27 compatibility); the Kotlin/Native compiler prohibits AtomicFU atomic operations inside a `public` inline function or an `internal` inline function called from another file; the webpack npm dependency moves to 5.108.1 (built-in minimizer dependency moves from `terser-webpack-plugin` to `minimizer-webpack-plugin`; webpack treats files containing `import.meta` as ES modules); the generated JS `wasmExports` API is deprecated (only `wasmExports.memory` remains, with a warning; use `kotlin.wasm.unsafe.wasmMemory`).
- The release process page lists 2.4.21 as the latest version (released October 8, 2026); it is a bug fix release (changelog on GitHub).
- Kotlin/JS, Kotlin/Wasm, Kotlin/Native, and Swift export sections are summarized here for completeness; the dedicated target guides are outside the scope of this skill.
- The 2.5.0-Beta1 preview (EAP) is intentionally not covered.

## Related

- [What's new in Kotlin 2.4.0](./whatsnew24.md)
- [Compatibility guide for Kotlin 2.4.x](./compatibility-guide-24.md)
- [Stability of Kotlin components](./components-stability.md)
- [Kotlin release process](./releases.md)
