# Prepare Library for Release

Settings and metadata an Android library module needs before publication: `namespace` (mandatory, no `applicationId`), a conservative `minSdkVersion`, `aarMetadata.minCompileSdk` to gate consumer `compileSdk`, and test fixtures opt-in.

## Signature / Usage

```kotlin
// build.gradle.kts (library module)
android {
    namespace = "com.example.library"

    defaultConfig {
        // no applicationId — libraries don't have one
        minSdk = 21

        aarMetadata {
            minCompileSdk = 29
        }
    }

    productFlavors {
        register("foo") {
            aarMetadata {
                minCompileSdk = 30
            }
        }
    }

    testFixtures {
        enable = true
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `namespace` | `String` | — | Required; generates the library's unique `R` class. |
| `minSdk` | `Int` | — | Set conservatively (low) to keep the library embeddable in as many consuming apps as possible. |
| `aarMetadata.minCompileSdk` | `Int` | — | Minimum `compileSdk` a consuming project must use; enforced at consumer build time. Precedence: `buildTypes{}` > `productFlavors{}` > `defaultConfig{}`. |
| `testFixtures.enable` | `Boolean` | `false` | Requires AGP 7.1+. Auto-creates a `src/testFixtures` source set for the library's own test fixtures. |

## Notes

- Libraries never set `applicationId` — that property is app-module only.
- Use the `@RequiresApi` annotation for version-gated code paths instead of raising `minSdk`.
- Enabling `testFixtures.enable` here only creates the source set; publishing that test fixtures artifact to consumers requires the capability configuration described separately (see test-fixtures-publishing.md in this category).

## Related

- [publication-variants.md](./publication-variants.md)
- [test-fixtures-publishing.md](./test-fixtures-publishing.md)
- [upload-library.md](./upload-library.md)
