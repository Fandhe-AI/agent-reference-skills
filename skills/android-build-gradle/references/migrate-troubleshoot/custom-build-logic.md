# Apply Custom Build Logic

AGP exposes the Variant API (`AndroidComponentsExtension`) for writing custom Gradle plugins that hook into DSL finalization, variant creation, and artifact transformation, plus per-variant classpath configurations for customizing dependency resolution.

## Signature / Usage

```kotlin
// buildSrc/src/main/kotlin/ExamplePlugin.kt — custom plugin using the Variant API
abstract class ExamplePlugin : Plugin<Project> {
    override fun apply(project: Project) {
        val androidComponents = project.extensions.getByType(AndroidComponentsExtension::class.java)

        androidComponents.finalizeDsl { extension -> /* modify DSL before it's locked */ }
        androidComponents.beforeVariants(selector().withBuildType("release")) { variantBuilder ->
            variantBuilder.minSdk = 23
        }
        androidComponents.onVariants { variant ->
            variant.sources.java?.addStaticSourceDirectory("custom/src/kotlin/${variant.name}")
        }
    }
}
```

```kotlin
// Customize dependency resolution per variant classpath
android {
    applicationVariants.all {
        compileConfiguration.resolutionStrategy { /* ResolutionStrategy API */ }
        runtimeConfiguration.resolutionStrategy { /* ... */ }
        annotationProcessorConfiguration.resolutionStrategy { /* ... */ }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `finalizeDsl { }` | callback | — | Configuration-phase hook to modify DSL objects before they are locked; values must resolve at configuration time. |
| `beforeVariants(selector) { }` | callback | — | Pre-variant-creation hook using `VariantBuilder` to control which variants are created (`minSdk`, enable/disable, etc.). |
| `onVariants(selector) { }` | callback | — | Post-variant-creation hook exposing the `Variant` object; the place to wire lazy `Provider` values and task outputs. |
| `variant_nameCompileClasspath` | Gradle configuration | — | Compile-time dependency resolution for a given variant. |
| `variant_nameRuntimeClasspath` | Gradle configuration | — | Runtime dependency resolution for a given variant. |
| `variant_nameAnnotationProcessorConfiguration` | Gradle configuration | — | Annotation processor dependency resolution for a given variant. |
| `variant.artifacts.use(task).wiredWithFiles(...).toTransform(...)` | Artifacts API | — | Reads, transforms, or replaces build artifacts (e.g. `SingleArtifact.MERGED_MANIFEST`). |

## Notes

- Recommended organization is to move imperative build logic out of `build.gradle.kts` into `buildSrc` (or a standalone included build) as a `kotlin-dsl` plugin project, then apply it by id from the root/module build files — this is the convention-plugin pattern for sharing build logic across modules.
- Prefer `project.tasks.register()` over `tasks.create()` to keep task creation lazy, and avoid `afterEvaluate()` / direct task dependencies in favor of `Provider`/`map`/`flatMap`/`zip` wiring.
- By default AGP resolves conflicting dependency versions by picking the highest version; use `resolutionStrategy` on the variant-specific configurations above to override this.
- Source: `developer.android.com/build/custom-build-logic`, `developer.android.com/build/extend-agp`.

## Related

- [Migrate to Kotlin DSL](./migrate-to-kotlin-dsl.md)
