---
source: https://kotlinlang.org/docs/whatsnew2320.html
---

# What's new in Kotlin 2.3.20

Kotlin 2.3.20 (tooling release, released March 16, 2026) adds name-based destructuring (Experimental), Lombok in Alpha, simplified Maven setup, JPA plugin improvements, Kotlin/JVM compilation through the Build tools API by default, and Gradle 9.3.0 compatibility. Bug fix release: 2.3.21.

## Signature / Usage

```kotlin
data class User(val username: String, val email: String)

fun main() {
    val user = User("alice", "alice@example.com")

    // Name-based destructuring, explicit form (-Xname-based-destructuring)
    (val mail = email, val name = username) = user

    println(name)
    // alice

    println(mail)
    // alice@example.com
}
```

## Highlights

| Area | Change |
| --- | --- |
| Gradle | Gradle 7.6.3 through 9.3.0; Kotlin/JVM compilation uses the Build tools API by default |
| Maven | Simplified setup (`<extensions>true</extensions>`) |
| Compiler plugins | Lombok in Alpha; `kotlin.plugin.jpa` also applies all-open with a JPA preset |
| Language | Name-based destructuring (Experimental); overload resolution change for context parameters |
| Standard library | `Map.Entry.copy()` (Experimental) |
| Kotlin/Native | New interop mode for C / Objective-C (Experimental), cross-compilation checker, new DSL to disable the compilation cache |

## Stable: simplified Maven setup

With `<extensions>true</extensions>` on `kotlin-maven-plugin`, the plugin registers `src/main/kotlin` and `src/test/kotlin` as source roots (if they exist and are not configured) and adds `kotlin-stdlib` when not declared.

```xml
<build>
    <plugins>
         <plugin>
             <groupId>org.jetbrains.kotlin</groupId>
             <artifactId>kotlin-maven-plugin</artifactId>
             <version>2.4.21</version>
             <extensions>true</extensions>
         </plugin>
    </plugins>
</build>
```

Opt out with `<kotlin.smart.defaults.enabled>false</kotlin.smart.defaults.enabled>` in `<properties>`; this disables both the automatic stdlib addition and the source root registration (other `<extensions>` features stay on).

## Language

### Name-based destructuring (Experimental)

Variables are matched to property names instead of position-based `componentN()`. Controlled with `-Xname-based-destructuring`:

| Mode | Behavior |
| --- | --- |
| `only-syntax` | Enables the explicit name-based form without changing existing destructuring |
| `name-mismatch` | Warns when position-based destructuring in data classes uses names that don't match properties |
| `complete` | Short form `val (email, username) = user` is name-based; position-based uses square brackets |

```kotlin
kotlin {
    compilerOptions {
        freeCompilerArgs.add("-Xname-based-destructuring=only-syntax")
    }
}
```

```kotlin
// Explicit position-based destructuring (available after opting in)
val [username, email] = user
```

The plan is to move gradually to name-based matching by default, keeping position-based destructuring through the square-bracket syntax. KEEP-0438; feedback at KT-19627.

### Overload resolution for context parameters

Declarations with context parameters are no longer considered more specific than those without. Calls that differ only by context parameters can become ambiguous (error), and the compiler warns about shadowed contextual declarations. The number of `kotlin.context` overloads was reduced from 22 to 6.

## Standard library

`Map.Entry.copy()` creates an immutable copy of an entry so it can be reused after the map is modified. Experimental: `@OptIn(ExperimentalStdlibApi::class)` or `-opt-in=kotlin.ExperimentalStdlibApi`.

```kotlin
@OptIn(ExperimentalStdlibApi::class)
fun main() {
    val map = mutableMapOf(1 to 1, 2 to 2, 3 to 3, 4 to 4)

    val toRemove = map.entries
        .filter { it.key % 2 == 0 }
        .map { it.copy() }

    map.entries.removeAll(toRemove)

    println("map = $map")
    // map = {1=1, 3=3}
}
```

## Compiler plugins

- Lombok is promoted to Alpha (experimental since Kotlin 1.5.20).
- `kotlin.plugin.jpa` now applies all-open with a built-in JPA preset in addition to no-arg. Entities annotated with `javax.persistence` / `jakarta.persistence` `Entity`, `Embeddable`, `MappedSuperclass` become `open` and get no-argument constructors. Maven `kotlin-maven-noarg` now implicitly includes `kotlin-maven-allopen` (IntelliJ IDEA support from 2026.1).

## Kotlin/JVM

- Vert.x `io.vertx.codegen.annotations.Nullable` is recognized; mismatches warn by default. Make them errors with `-Xnullability-annotations=@io.vertx.codegen.annotations:strict`.
- `org.jetbrains.annotations.Unmodifiable` / `UnmodifiableView` make Java-returned collections read-only in Kotlin; assigning to a mutable type warns, and the warning is scheduled to become an error in Kotlin 2.5.0.

## Kotlin/Native

- Experimental `-Xccall-mode direct` for cinterop (`extraOpts += listOf("-Xccall-mode", "direct")`); do not publish libraries built with it yet (KT-83218).
- `crossCompilationSupported` API checks whether cross-compilation is supported for a target.
- `disableNativeCache(version = ..., reason = ..., issue = ...)` in `binaries {}` replaces the deprecated `kotlin.native.cacheKind` Gradle property.

## Kotlin/Wasm and Kotlin/JS

- Wasm: JS String builtins for `kotlin.String` operations (up to 4.6x faster string interpolation in targeted benchmarks), compilation time and memory optimizations (65% clean build / 21% incremental improvement in testing), experimental `@nativeInvoke` for `wasmJs`.
- JS: Kotlin interfaces can be implemented from TypeScript (`-Xenable-implementing-interfaces-from-typescript`, default implementations via `DefaultImpls`); experimental SWC transpilation with `kotlin.js.delegated.transpilation=true`.

## Gradle and Build tools API

- Binary compatibility validation tasks renamed: `checkLegacyAbi` to `checkKotlinAbi`, `updateLegacyAbi` to `updateKotlinAbi`, `dumpLegacyAbi` to `internalDumpKotlinAbi` (old names still exist in 2.3.20); `check` now runs `checkKotlinAbi` automatically.
- BTA: cancellable build operations via `CancellableBuildOperation.cancel()` (best effort), immutable operations created with `build()`, `BuildMetricsCollector`, and `CommonCompilerArguments.COMPILER_PLUGINS` for configuring compiler plugins.

## Notes

- Breaking changes and deprecations: Kotlin/Wasm module initialization happens during instantiation instead of an external `_initialize()` call (code using `@EagerInitialization` may fail if it runs before initialization completes); experimental context receivers are no longer supported and are replaced by context parameters; `macosX64`, `tvosX64`, `watchosX64` targets are deprecated (removal planned for the next release; `iosX64` stays in tier 3); stricter dependency matching in Kotlin Multiplatform can cause metadata compilation failures (KT-84533). Details: `compatibility-guide-23.md`.
- The Maven example above shows `2.4.21` as in the source twin; it is a placeholder for the Kotlin version you use.
- Kotlin/Native, Kotlin/Wasm, and Kotlin/JS items are summarized only; the target guides are outside the scope of this skill.

## Related

- [What's new in Kotlin 2.3.0](./whatsnew23.md)
- [What's new in Kotlin 2.4.0](./whatsnew24.md)
- [Compatibility guide for Kotlin 2.3.x](./compatibility-guide-23.md)
- [Destructuring declarations](../basics/destructuring-declarations.md)
- [Context parameters](../functions/context-parameters.md)
