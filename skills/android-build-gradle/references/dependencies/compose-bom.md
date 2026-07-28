# Compose BOM

A Bill of Materials that lets you manage the versions of every Jetpack Compose library by specifying only the BOM's own version.

## Signature / Usage

```kotlin
dependencies {
    // Specify the Compose BOM with a version definition
    val composeBom = platform("androidx.compose:compose-bom:2026.06.00")
    implementation(composeBom)
    testImplementation(composeBom)
    androidTestImplementation(composeBom)

    // Specify Compose library dependencies without a version definition
    implementation("androidx.compose.foundation:foundation")
    implementation("androidx.compose.material3:material3")
    testImplementation("androidx.compose.ui:ui-test-junit4")
    androidTestImplementation("androidx.compose.ui:ui-test")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `platform("androidx.compose:compose-bom:<version>")` | function | — | Creates a platform dependency; add it to `implementation`/`testImplementation`/`androidTestImplementation` so those configurations resolve unversioned Compose library coordinates against the BOM. |

## Notes

- The BOM contains links to stable Compose library versions tested to work together; bumping the BOM version updates all Compose libraries at once.
- The Compose Compiler library (`androidx.compose.compiler`) is **not** included in the BOM — as of Kotlin 2.0 it tracks the Kotlin compiler version instead.
- To find which individual library versions a given BOM version resolves to, see the BOM-to-library mapping table at `developer.android.com/develop/ui/compose/bom/bom-mapping`.
- Firebase also publishes a BOM (`com.google.firebase:firebase-bom`) using the same `platform()` mechanism; not covered here.

## Related

- [dependency-coordinates.md](./dependency-coordinates.md)
- [version-catalog.md](./version-catalog.md)
