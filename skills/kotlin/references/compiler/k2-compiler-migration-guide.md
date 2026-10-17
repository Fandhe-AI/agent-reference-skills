---
source: https://kotlinlang.org/docs/k2-compiler-migration-guide.html
---

# K2 compiler migration guide

The K2 compiler is the rewritten Kotlin frontend (semantic analysis, call resolution, type inference) built on one unified data structure. It is enabled by default starting with Kotlin 2.0.0.

## Signature / Usage

Enable build reports to assess compilation phases (`gradle.properties`):

```
kotlin.build.report.output=file
```

| Option | Description |
| --- | --- |
| `file` | Saves build reports in a human-readable format to a local file. By default, it's `${project_folder}/build/reports/kotlin-build/${project_name}-timestamp.txt` |
| `single_file` | Saves build reports in a format of an object to a specified local file. |
| `build_scan` | Saves build reports in the `custom values` section of the build scan. The Gradle Enterprise plugin limits the number and length of custom values. |
| `http` | Posts build reports using HTTP(S) (POST, JSON metrics). |
| `json` | Saves build reports in JSON format to a local file. Set the location in `kotlin.build.report.json.directory`. Default name is `${project_name}-build-<date-time>-<index>.json`. |

## Notes

- Benefits: improved call resolution and type inference, easier syntactic sugar for new features, faster compilation, enhanced IDE performance. Published benchmarks (Anki-Android, Exposed): up to 94% compilation speed gain, initialization phase up to 488% faster, analysis phase up to 376% faster (Kotlin 1.9.23 vs 2.0.0).
- Rollback: to use the previous compiler in Kotlin 2.0.0-2.3.21, set the language version to `1.9` in `build.gradle.kts` or use `-language-version 1.9`. From Kotlin 2.4.0 onward, you can't roll back to the previous compiler.
- Smart cast improvements (2.0.0): local variables and further scopes (`val isCat = animal is Cat; if (isCat) animal.purr()`), type checks with `||` smart-cast to the closest common supertype, inline functions treated as having an implicit `callsInPlace` contract, properties with function types, exception handling (smart cast info passed to `catch` / `finally`), increment and decrement operators.
- Kotlin Multiplatform: common and platform source sets are strictly separated at compile time; `expect` / `actual` declarations may have different visibility only if the `actual` declaration is more permissive. Resolution behavior is unchanged for calls to multiplatform library overloads and in `commonTest` (still has access to platform code).
- Expected and actual classes are in Beta (see `releases/components-stability`).
- Significant changes: all `open` properties with backing fields (`open val` too) must be immediately initialized (make it `final` or use a private backing property to defer); synthetic setter on a projected Java receiver is an error (`starProjected.foo = sampleString`); using inaccessible generic types in lambda parameters / type arguments is an error (warnings for non-generic inaccessible types; check module dependency configuration); the subclass takes precedence when a Kotlin property and a Java field share a name; Java primitive arrays keep `TYPE_USE` nullability (`int @Nullable []`); an expected non-abstract class that inherits an abstract function needs an explicit `expect override fun` (otherwise `ABSTRACT_MEMBER_NOT_IMPLEMENTED`).
- Smaller changes are listed by subject area (Type inference, Generics, Resolution, Visibility, Annotations, Null safety, Java interoperability, Properties, Control flow, Enum classes, Functional (SAM) interfaces, Companion object, Miscellaneous) with YouTrack issue IDs in the official page.
- K2 stability by release: 2.0.0-2.4.21 Stable; 1.9.20-1.9.25 Beta; 1.9.0-1.9.10 JVM is Beta; 1.7.0-1.8.22 Alpha.
- Library compatibility: Kotlin/JVM works with libraries compiled with any Kotlin version; Kotlin Multiplatform is guaranteed with libraries compiled with 1.9.20 and onwards.
- Compiler plugins supported by K2: all-open, AtomicFU, jvm-abi-gen, js-plain-objects, kapt, Lombok, no-arg, Parcelize, Power-assert, SAM with receiver, Serialization; also the Jetpack Compose 1.5.0 compiler plugin and later, and KSP since KSP2. Check the documentation of other plugins for K2 support.
- Custom plugins: the plugin API is Experimental. Backend-only plugins (`IrGenerationExtension` only) need only API-change checks; plugins using frontend extension points must be rewritten with the K2 (FIR Plugin) API.
- Android Studio / IntelliJ IDEA use K2 by default for code analysis.

## Related

- [compiler-reference](./compiler-reference.md)
- [compiler-plugins-overview](./compiler-plugins-overview.md)
- [custom-compiler-plugins](./custom-compiler-plugins.md)
