# Publication Variants

Configures which build variant(s) of an Android library get published as a Maven software component, via the `android.publishing {}` block. `singleVariant()` publishes one variant to one set of coordinates; `multipleVariants()` publishes several variants as one component using Gradle Module Metadata (GMM).

## Signature / Usage

```kotlin
// build.gradle.kts (library module)
android {
    publishing {
        // one variant, one publication
        singleVariant("release") {
            withSourcesJar()
        }
    }
}
```

```kotlin
android {
    publishing {
        // all variants folded into one GMM-backed component
        multipleVariants {
            allVariants()
            withJavadocJar()
        }

        // or only selected build types / flavor values
        multipleVariants("custom") {
            includeBuildTypeValues("debug", "release")
            includeFlavorDimensionAndValues(
                dimension = "color",
                values = arrayOf("blue", "pink"),
            )
            includeFlavorDimensionAndValues(
                dimension = "shape",
                values = arrayOf("square"),
            )
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `singleVariant(name)` | function | — | Creates a software component from exactly one build variant. |
| `multipleVariants(name?)` | function | — | Creates a component covering several variants; requires GMM. Without `name`, publishes to the same coordinates for all included variants. |
| `withSourcesJar()` | function | — | Attaches a sources JAR to the component. |
| `withJavadocJar()` | function | — | Attaches a Javadoc JAR to the component. |
| `allVariants()` | function | — | Includes every build type/flavor combination in a `multipleVariants` component. |
| `includeBuildTypeValues(...)` | function | — | Restricts a `multipleVariants` component to the given build types. |
| `includeFlavorDimensionAndValues(dimension, values)` | function | — | Restricts a `multipleVariants` component to the given values of a flavor dimension. Every flavor dimension must be listed, even if only one value is included. |

## Notes

- AGP derives variant attributes (e.g. `BuildTypeAttr`, `ProductFlavorAttr:<dimension>`) automatically from build type and product flavor names; Gradle uses these attributes for variant-aware dependency resolution on the consumer side.
- Product flavor and dimension names become part of the publishing API: consumers on AGP 7.1+ need matching names (or must select artifacts manually). AGP 7.0 and below cannot consume multi-flavor libraries published this way.
- This configures which variants get *published*, not the variants themselves — variant/flavor definition lives in `android.buildTypes {}` / `android.productFlavors {}` (see build-config category in this skill) and variant-level dependency wiring in `dependencies/variant-specific-dependencies.md`.
- GMM also lets test fixtures be published as an additional variant with its own capability (see test-fixtures-publishing.md).

## Related

- [prep-library-release.md](./prep-library-release.md)
- [test-fixtures-publishing.md](./test-fixtures-publishing.md)
- [upload-library.md](./upload-library.md)
