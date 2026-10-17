---
source: https://kotlinlang.org/docs/compatibility-guide-23.html
---

# Compatibility guide for Kotlin 2.3.x

Summary of incompatible changes (source, binary, behavioral) for migrating from Kotlin 2.2 to Kotlin 2.3, including tool-related changes.

## Signature / Usage

Migration replacements named in the guide:

```text
testApi()  ->  testImplementation()
kotlin.sourceSets.commonTest.dependencies.api()  ->  kotlin.sourceSets.commonTest.dependencies.implementation()
kotlinOptions {}  ->  compilerOptions {}
CInteropProcess.destinationDir  ->  CInteropProcess.destinationDirectory.set()
CInteropProcess.konanVersion  ->  CInteropProcess.kotlinNativeVersion
NodeJsExec.create()  ->  NodeJsExec.register()
getPluginArtifactForNative()  ->  getPluginArtifact()
```

### Language

| Change | Type | Deprecation cycle |
| --- | --- | --- |
| Drop `-language-version` 1.8 and 1.9 (1.9 only on non-JVM) (KT-76343, KT-76344) | source | 2.2.0 warning; 2.3.0 error |
| Upper-bound violation errors for inferred types with typealiases, `UPPER_BOUND_VIOLATED` (KTLC-287) | source | 2.2.20 warning; 2.3.0 error |
| Prohibit `@JvmSerializableLambda` on `inline` / `crossinline` lambdas (KTLC-9) | source | 2.1.20 warning; 2.3.0 error (progressive mode) |
| Prohibit delegating a Kotlin interface to a Java class when generic signatures don't match (KTLC-267) | source | 2.1.20 warning; 2.3.0 error |
| Deprecate `return` in expression-bodied functions without explicit return type (KTLC-288) | source | 2.3.0 warning; 2.4.0 error |
| Prohibit inheritance from nullable supertypes introduced via typealias (KTLC-279) | source | 2.2.0 warning; 2.3.0 error |
| Unify generic signature generation for top-level lambdas and call arguments (KTLC-277) | behavioral | 2.3.0 new behavior (not in progressive mode) |
| Prohibit reified type parameters inferred as intersection types (KTLC-13) | source | 2.1.0 warning; 2.3.0 error |
| Prohibit exposing less-visible types through type parameter bounds (KTLC-275) | source | 2.1.0 warning; 2.3.0 error |

### Standard library

| Change | Type | Deprecation cycle |
| --- | --- | --- |
| Deprecate `Char.toX()` / `X.toChar()` numeric conversions; use explicit digit and code APIs (KTLC-321) | source | 1.4.30 new functions Experimental; 1.5.0 Stable + old warnings; 2.3.0 errors |
| Deprecate `Number.toChar()` (use `toInt().toChar()` or the `Char` constructor) (KT-56822) | source | 1.9.0 warning; 2.3.0 error |
| Deprecate `String.subSequence(start, end)` (use `subSequence(startIndex, endIndex)`) (KTLC-282) | source | 1.0 warning; 2.3.0 error |
| Deprecate `kotlin.io.createTempDirectory()` / `createTempFile()` (use `kotlin.io.path` versions) (KTLC-281) | source | 1.4.20 warning; 2.3.0 error |
| Hide `InputStream.readBytes(estimatedSize: Int = DEFAULT_BUFFER_SIZE)` (KTLC-280) | source | 1.3.0 warning; 1.5.0 error; 2.3.0 hidden |
| Unify Kotlin/Native stack trace printing: additional causes are not printed if already printed (KT-81431) | behavioral | 2.3.20 |
| `Iterable<T>.intersect()` / `subtract()` test membership per receiver element, compare with `Any::equals` (KTLC-268) | behavioral | 2.3.0 new behavior |

### Tools

| Change | Type | Deprecation cycle |
| --- | --- | --- |
| Unsupported KGP version warning with `kotlin-dsl` + `kotlin("jvm")` (KT-79851) | behavioral | 2.3.0 diagnostic |
| Deprecate `kotlin-android` plugin for AGP 9.0.0+ (AGP has built-in Kotlin) (KT-81199) | source | 2.3.0 warning (when `android.builtInKotlin` and `android.newDsl=false` are both `false`) |
| Deprecate `testApi` configuration (KT-63285) | source | 2.3.0 warning |
| Deprecate `createTestExecutionSpec()` in `KotlinJsTestFramework` (KT-75449) | source | 2.2.20 warning; 2.3.0 error; 2.4.0 remove |
| Remove `closureTo()`, `createResultSet()`, `KotlinToolingVersionOrNull()` (use `KotlinToolingVersion()`) (KT-64273) | source | 1.7.20 error; 2.3.0 removed |
| `ExtrasProperty` API made internal (use Gradle `ExtraPropertiesExtension`) (KT-74915) | source | 2.0.0 warning; 2.1.0 error; 2.3.0 internal |
| Deprecate `HasKotlinDependencies` in `KotlinCompilation` (use `KotlinSourceSet`) (KT-67290) | source | 2.3.0 warning |
| Deprecate npm / Yarn internal functions and properties (KT-81009) | source | 2.2.0 / 2.2.20 warnings; 2.3.0 errors; 2.4.0 remove |
| Deprecate PhantomJS support (`karmaPhantomjsLauncher` in `NpmVersions`) (KT-76019) | source | 2.3.0 warning |
| Prohibit subclassing `KotlinTest`, `KotlinNativeTest`, `KotlinJsTest`, `KotlinJsIrTarget`, `KotlinNodeJsIr`, `KotlinD8Ir`, `KotlinKarma`, `KotlinMocha`, `KotlinWebpack`, `TypeScriptValidationTask`, `YarnRootExtension` (KT-75869, KT-81007) | source | 2.2.0 warning; 2.3.0 error; 2.4.0 remove |
| Deprecate `ExperimentalWasmDsl` (moved to `kotlin-plugin-annotations`) (KT-81005) | source | 2.0.20 warning; 2.3.0 error; 2.4.0 remove |
| Deprecate `ExperimentalDceDsl` (KT-81008) | source | 2.2.0 warning; 2.3.0 error; 2.4.0 remove |
| Deprecate JavaScript utilities (`JsIrBinary.generateTs`, `KotlinJsIrLink.mode`, `NodeJsSetupTask.Companion.NAME`, `Appendable.appendConfigsFromDir()`, `ByteArray.toHex()`, `FileHasher.calculateDirHash()`, `String.jsQuoted()`) (KT-81010) | source | 2.2.0 / 2.2.20 warnings; 2.3.0 errors; 2.4.0 remove |
| Deprecate migrated D8 and Binaryen properties (moved to `org.jetbrains.kotlin.gradle.targets.wasm`) (KT-81006) | source | 2.2.0 warning; 2.3.0 error; 2.4.0 remove |
| Deprecate `create()` in `NodeJsExec` DSL (use `register()`) (KT-81004) | source | 2.1.20 warning; 2.3.0 error; 2.4.0 remove |
| Properties in the `kotlinOptions` DSL (use `compilerOptions`) (KT-76720) | source | 2.0.0 warning; 2.2.0 error; 2.3.0 error for all properties |
| Deprecate `kotlinArtifacts` API (KT-77066) | source | 2.2.0 warning; 2.3.0 error; 2.4.0 remove |
| Remove `kotlin.mpp.resourcesResolutionStrategy` Gradle property (KT-74955) | source | 2.2.0 diagnostic; 2.3.0 removed |
| Deprecate old multiplatform IDE import mode (`kotlin.mpp.import.enableKgpDependencyResolution=false`) (KT-61127) | source | 2.3.0 warning |
| Remove `kotlin.compiler.preciseCompilationResultsBackup` and `kotlin.compiler.keepIncrementalCompilationCachesInMemory` (KT-81038) | source | 2.1.20 warning; 2.3.0 removed |
| Deprecate `destinationDir` in `CInteropProcess` (KT-74910) | source | 2.1.0 warning; 2.2.0 error; 2.3.0 hidden |
| Deprecate `konanVersion` in `CInteropProcess` (KT-74911) | source | 2.1.0 warning; 2.2.0 error; 2.3.0 hidden |
| Remove `KotlinCompile.classpathSnapshotProperties.useClasspathSnapshot` / `.classpath` (KT-76177) | source | 2.0.20 deprecate property; 2.2.0 remove property; 2.3.0 remove these |
| Deprecate `getPluginArtifactForNative()` (use `getPluginArtifact()`) (KT-78870) | source | 2.2.20 warning; 2.3.0 error; 2.4.0 remove |
| Registering generated sources: use `generatedKotlin`; use `allKotlinSources` to access all sources (KT-45161) | source | 2.3.0 new Experimental API |
| Deprecate `kotlin.publishJvmEnvironmentAttribute` (KT-83678) | source | 2.3.20 warning; 2.4.0 remove |
| Deprecate `CleanableStore` and `CleanDataTask` (KT-78104) | source | 2.3.20 warning; 2.4.20 error |
| Deprecate `kotlin.kmp.isolated-projects.support` (KT-79257) | source | 2.3.20 warning |
| Deprecate `kotlin.mpp.enableKotlinToolingMetadataArtifact` (KT-79924) | source | 2.3.20 warning; 2.4.0 remove support |
| Deprecate `LanguageSettings.enableLanguageFeature` DSL (KT-82323, KT-82847) | source | 2.3.20 warning; 2.4.0 error |
| Deprecate the "out of process" compiler execution strategy (use "daemon" or "in process") (KT-83125) | source | 2.3.20 warning; 2.4.0 remove |

`kotlin-dsl` plus `kotlin("jvm")` options (not a supported setup): (1) do not apply `kotlin("jvm")` and let `kotlin-dsl` provide a compatible KGP; (2) apply it with `embeddedKotlinVersion` (upgrade Gradle to upgrade the embedded Kotlin); (3) do not use `kotlin-dsl` (for binary plugins). Last resort: language version 2.1 or higher overrides the conflicting behavior (not recommended).

### Build tool removal

| Change | Deprecation cycle |
| --- | --- |
| Remove support for Ant (use Gradle or Maven) (KT-75875) | 2.2.0 warning; 2.3.0 removed |

## Notes

- Entries with a 2.3.20 deprecation cycle (for example the "out of process" strategy) were added after the 2.3.0 release.
- For the 2.4 follow-up cycle, see the 2.4.x guide; several items here reach removal or error level in 2.4.0.

## Related

- [Compatibility guide for Kotlin 2.4.x](./compatibility-guide-24.md)
- [What's new in Kotlin 2.3.0](./whatsnew23.md)
- [What's new in Kotlin 2.3.20](./whatsnew2320.md)
- [Kotlin evolution principles](./kotlin-evolution-principles.md)
