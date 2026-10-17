---
source: https://kotlinlang.org/docs/compatibility-guide-24.html
---

# Compatibility guide for Kotlin 2.4.x

Summary of incompatible changes (source, binary, behavioral) for migrating from Kotlin 2.3 to Kotlin 2.4, including tool-related changes.

## Signature / Usage

Migration examples taken from the guide:

```kotlin
// Array literals outside annotation calls and parameter defaults are an error: use arrayOf(...)
Roles(arrayOf("admin", "user"))   // instead of Roles(["admin", "user"])

// Callable reference: put each type argument on the class that declares it
Outer<Int>.Inner<String>::toString   // instead of Inner<String, Int>::toString

// Generic call: type arguments must match inter-parameter bounds
Container<Alpha, AlphaKey>()   // instead of Container<Alpha, BetaKey>()

// kotlin.io.readLine() is deprecated
readln()         // instead of readLine()!!
readlnOrNull()   // instead of readLine()
```

### Compatibility kinds

- source: code that compiled without errors or warnings no longer compiles.
- binary: interchanging two binary artifacts leads to loading or linkage errors.
- behavioral: the same program behaves differently before and after the change.

These definitions apply to pure Kotlin only (compatibility from Java is out of scope).

### Language and compiler

| Change | Type | Deprecation cycle |
| --- | --- | --- |
| Drop `-language-version=1.9`; K1 compiler no longer supported (KT-80590) | source | 2.2.0 warning; 2.4.0 error |
| Prohibit flexible explicit nullable type arguments for Java types (KTLC-284) | source | 2.2.0 warning; 2.4.0 error |
| Prohibit always-false `is` checks for definitely incompatible types (KTLC-365) | source | 2.0.0 warning; 2.4.0 error |
| Prohibit exposing types and declarations with lower visibility in inline functions (KTLC-283) | source | 2.3.0 warning; 2.4.0 error |
| Change default use-site target selection for annotations (KTLC-391) | binary | 2.2.0 warning when targets change; 2.4.0 new defaulting rule enabled |
| Forbid implicit references to inaccessible types from indirect dependencies (KTLC-384) | source | 2.3.0 warning; 2.4.0 error |
| Enforce Jakarta nullability annotations (`jakarta.annotation.Nullable` / `Nonnull`) (KTLC-285) | source | 2.2.0 warning; 2.4.0 error |
| Report misplaced type arguments in callable reference qualifiers (KTLC-388) | source | 2.4.0 warning |
| Report errors for `::class` on reified type parameters with nullable upper bounds (KTLC-370) | source | 2.3.0 warning; 2.4.0 error |
| Prohibit initialization before declaration in anonymous object `init` blocks (KTLC-290) | source | 2.2.20 warning; 2.4.0 error |
| Enforce exhaustiveness for `when` with non-abstract Java sealed classes (KTLC-366) | source | 2.3.0 warning; 2.4.0 error |
| Prohibit `operator` on `getValue()` / `setValue()` with wrong parameter count (exactly 2 / exactly 3) (KTLC-289) | source | 2.2.20 warning; 2.4.0 error |
| Prohibit inconsistent type arguments in generic calls (KTLC-373) | source | 2.3.0 warning; 2.4.0 error |
| Deprecate property references to `javaClass` (use `.javaClass` or `::class.java`) (KTLC-375) | source | 2.4.0 warning |
| Error for implicit enum constructor calls that require opt-in (KTLC-359) | source | 2.2.20 warning; 2.4.0 error |
| Forbid `inline` modifier on enum entries (KTLC-361) | source | 2.3.0 warning; 2.4.0 error |
| Prohibit array literals outside annotation calls and parameter defaults (KTLC-369) | source | 2.3.0 warning; 2.4.0 error |
| Prohibit `_root_ide_package_` in CLI compiler mode (KTLC-378) | source | 2.3.20 warning; 2.4.0 error |
| Correct equality for function references with vararg conversions on JVM (KTLC-385) | behavioral | 2.4.0 new behavior |
| Enforce opt-in for companion object access, e.g. `val p = C` (KTLC-386) | source | 2.3.20 warning; 2.4.0 error for `ERROR`-level opt-in |
| Report type mismatches from supertypes with nested generic arguments (KTLC-372) | source | 2.4.0 error |
| Prohibit inferred types with inaccessible declarations (KTLC-363) | source | 2.3.0 warning; 2.4.0 error |

Annotation defaulting detail: without an explicit use-site target the compiler now uses `param` and `property` if they apply, and `field` only if `property` does not. Restore the previous rule project-wide with `-Xannotation-default-target=first-only`, or write the target explicitly (for example `@param:Annotation`).

### Standard library

| Change | Type | Deprecation cycle |
| --- | --- | --- |
| Deprecate `kotlin.io.readLine()` (use `readln()` / `readlnOrNull()`) (KTLC-394) | source | 2.4.0 warning |
| Deprecate `AbstractCoroutineContextKey`, `getPolymorphicElement()`, `minusPolymorphicKey()` (KT-84970) | source | 2.4.0 warning |
| `Random.nextDouble(until)` contract now requires a finite `until` (KT-84368) | behavioral | 2.4.0 new behavior |

### Tools (Gradle and build tools API)

| Change | Type | Deprecation cycle |
| --- | --- | --- |
| Remove legacy Kotlin/JS compiler type selection APIs; deprecate `KotlinJsCompilerType` and `KotlinProjectExtension.js()` overloads with a compiler type (use `js {}`) (KT-64275, KT-84753) | source | 1.8.0 deprecate constants; 2.4.0 remove, warn on remaining |
| Deprecate `sourceSets` in `KotlinAndroidProjectExtension` (use `android { sourceSets { ... } }`) (KT-74451) | source | 2.4.0 warning |
| Remove consumable configurations for Kotlin/Native Apple frameworks (KT-74503, KT-82230) | source | 2.4.0 removed |
| Remove deprecated task, compilation, and DSL APIs from KGP (KT-85509) | source | 2.4.0 removed |
| Deprecate `shrunkClasspathSnapshot` in `ClasspathSnapshotBasedIncrementalCompilationApproachParameters` (KT-75837) | source | 2.4.0 warning |
| Remove redundant ABI validation Gradle DSL elements (KT-80685) | source | 2.4.0 removed |
| Obsolete Compose compiler Gradle plugin options now error (KT-85343) | source | 2.0.20 / 2.1.0 warnings; 2.4.0 errors |
| Obsolete Kotlin/Native Gradle task APIs now error; `KotlinNativeLink.compilation` removed (KT-85510) | source | 2.4.0 error / removed |
| Case mismatches in compiler argument values report a warning in the Build tools API (KT-86059) | source | 2.4.20 warning |

KGP APIs removed in 2.4.0 (KT-85509), grouped as in the guide:

- Compile task configuration: `KotlinJvmCompile.parentKotlinOptions`, `KotlinJvmCompile.moduleName`, `KotlinJvmFactory.createKotlinJvmOptions()`, `BaseKotlinCompile.moduleName` (from `KotlinCompile` and `Kotlin2JsCompile`).
- Multiplatform hierarchy and targets: `DeprecatedKotlinTargetHierarchyDsl`, `KotlinMultiplatformExtension.targetHierarchy`, `KotlinTargetComponent.sourcesArtifacts`, `KotlinTarget.sourceSets`, `KotlinHierarchyBuilder.withoutCompilations()` / `filterCompilations()` / `withWasm()`, `KotlinCompilation.defaultSourceSetName`.
- Compilation tasks: `KotlinCompilation.compileKotlinTaskProvider`, `KotlinCompilation.compileKotlinTask`.
- Dependency handler: `KotlinDependencyHandler.enforcedPlatform()`, `KotlinDependencyHandler.platform()`.
- Other: `KaptExtension.processors`, `KotlinTest.excludes` / `fileResolver` / `execHandleFactory`, `IncrementalSyncTask.destinationDir`.

ABI validation DSL migration: configure report settings directly in `abiValidation {}` instead of `abiValidation { legacyDump { ... } }`, remove `abiValidation { klib { enabled = ... } }`, use `keepLocallyUnsupportedTargets` instead of `klib.keepUnsupportedTargets`.

Compose compiler Gradle plugin options that now error: `generateFunctionKeyMetaClasses`, `enableIntrinsicRemember`, `enableNonSkippingGroupOptimization`, `enableStrongSkippingMode`, `stabilityConfigurationFile`, `ComposeFeatureFlag.StrongSkipping`, `ComposeFeatureFlag.IntrinsicRemember`. Use `featureFlags` and `stabilityConfigurationFiles` instead.

## Notes

- The guide's language items carry KTLC issue IDs; tool items carry KT IDs (YouTrack).
- The `-language-version` / `-api-version` mechanics are described in `kotlin-evolution-principles.md`.
- Items marked 2.4.20 (case mismatch in compiler argument values) were added after the 2.4.0 release.

## Related

- [Compatibility guide for Kotlin 2.3.x](./compatibility-guide-23.md)
- [What's new in Kotlin 2.4.0](./whatsnew24.md)
- [What's new in Kotlin 2.4.20](./whatsnew2420.md)
- [Kotlin evolution principles](./kotlin-evolution-principles.md)
