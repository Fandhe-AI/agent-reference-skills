# productFlavors and flavorDimensions

Product flavors create different versions of an app (e.g. free/paid, demo/full) from a single module. Combined with build types, they form the full set of build variants.

## Signature / Usage

```kotlin
android {
    flavorDimensions += "version"

    productFlavors {
        create("demo") {
            dimension = "version"
            applicationIdSuffix = ".demo"
            versionNameSuffix = "-demo"
        }
        create("full") {
            dimension = "version"
            applicationIdSuffix = ".full"
            versionNameSuffix = "-full"
        }
    }
}
```

Multiple dimensions (order determines priority, first = highest):

```kotlin
android {
    flavorDimensions += listOf("api", "mode")

    productFlavors {
        create("demo") { dimension = "mode" }
        create("full") { dimension = "mode" }
        create("minApi24") {
            dimension = "api"
            minSdk = 24
            versionNameSuffix = "-minApi24"
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `flavorDimensions` | `List<String>` | — | Declares the set of flavor dimension names; each `productFlavors` entry must be assigned to exactly one. |
| `dimension` | `String` | — | Assigns a product flavor to a declared flavor dimension. |
| `applicationIdSuffix` | `String` | — | Appended to the base `applicationId` for this flavor. |
| `versionNameSuffix` | `String` | — | Appended to the base `versionName` for this flavor. |
| `matchingFallbacks` | `List<String>` | — | Fallback flavors used to resolve dependency variant mismatches for this flavor. |
| `minSdk` | `Int` | inherited from `defaultConfig` | Per-flavor override of the minimum SDK. |
| `versionCode` | `Int` | inherited from `defaultConfig` | Per-flavor override of the version code. |

## Notes

- A build variant name is the concatenation of `productFlavors` (one per dimension, high-to-low priority) + `buildTypes`, e.g. `demoDebug`, `minApi24DemoDebug`.
- With multiple dimensions, `flavorDimensions` order determines priority in the generated variant name.
- `variantBuilder.enable = false` inside `androidComponents { beforeVariants { ... } }` filters out unwanted variant combinations.
- `missingDimensionStrategy` (declared in `defaultConfig` or per-flavor) resolves cases where a dependency declares a dimension this module does not have.

## Related

- [defaultConfig](./default-config.md)
- [buildTypes](./build-types.md)
- [sourceSets](./source-sets.md)
