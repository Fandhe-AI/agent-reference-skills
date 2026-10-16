# AGP API Deprecations and Removals

Tracks Android Gradle plugin (AGP) API deprecations and removals, with guidance on updating code.

## Signature / Usage

```kotlin
// AGP 7.2+: instrumentation APIs moved to Component.instrumentation
androidComponents {
    onVariants(selector().all()) { variant ->
        variant.instrumentation.transformClassesWith(AsmClassVisitorFactoryImpl::class.java,
                                                     InstrumentationScope.PROJECT) { params ->
            params.x = "value"
        }
        variant.instrumentation.setAsmFramesComputationMode(
            FramesComputationMode.COMPUTE_FRAMES_FOR_INSTRUMENTED_METHODS
        )
    }
}
```

## Options / Props

| API | Deprecated in AGP | Removed from AGP |
|-----|-------------------|------------------|
| `Component.setAsmFramesComputationMode` | 7.2 | — |
| `Component.transformClassesWith` | 7.2 | — |
| RenderScript | 7.2 | — |
| Transform | 7.2 | 8.0 |

## Notes

- AGP 8.12: behavior change. An `AndroidManifest.xml` in the test source directory now customizes the manifest for unit tests with `android.testOptions.unitTests.includeAndroidResources`; it merges into the app's main manifest (Issue #127986458).
- AGP 8.10: source-level breaking change. `finalizeDsl` on `AndroidComponentsExtension` now requires parameterized types (type bound relaxed so it works with `com.android.kotlin.multiplatform.library`). Binary plugins are unaffected. Example of the adapted form:

```kotlin
extensions.getByType<AndroidComponentsExtension<CommonExtension<*, *, *, *, *, *>, *, *>>().finalizeDsl { androidExtension ->
  androidExtension.experimentalProperties["android.example"] = true
}
```

- To write `finalizeDsl` code that targets both `com.android.library` / `com.android.application` and `com.android.kotlin.multiplatform.library`, check types at runtime (`is CommonExtension<*, *, *, *, *, *>` vs `is KotlinMultiplatformAndroidLibraryExtension`).
- AGP 8.8: Resource Configurations deprecated, because AGP no longer supports different resource densities and Google Play requires App Bundles. For languages, use the `localeFilters` DSL.
- AGP 8.0: Transform API removed (all classes in `com.android.build.api.transform`) to improve build performance. No single replacement; use targeted APIs in the `androidComponents {}` block, all available by AGP 7.2: the Instrumentation API for bytecode transforms, the Artifacts API with `MultipleArtifact.ALL_CLASSES_DIRS` to add generated classes, and `Artifacts.forScope` (AGP 7.4) for whole-program transformations (`ScopedArtifacts.Scope.PROJECT` or `ALL`). Whole-program transforms cost much more build time; make them opt-in per build type.
- AGP 7.2: RenderScript APIs deprecated (still function with warnings, to be removed in future versions).
- Source: https://developer.android.com/build/releases/gradle-plugin-api-updates (fetched 2026-10).

## Related

- [AGP 9.4 Release Notes](./agp-9-4-release-notes.md)
- [AGP 9.3 Release Notes](./agp-9-3-release-notes.md)
