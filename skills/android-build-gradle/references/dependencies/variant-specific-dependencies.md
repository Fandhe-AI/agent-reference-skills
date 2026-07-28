# Build Variant-Specific Dependencies

Declares dependencies scoped to a single build type, product flavor, or their combination, by capitalizing the configuration name and prefixing it with the variant name.

## Signature / Usage

```kotlin
dependencies {
    // Only for the "free" product flavor
    freeImplementation("com.google.firebase:firebase-ads:21.5.1")

    // Only for the local unit test source set
    testImplementation("junit:junit:4.13.2")

    // Only for the instrumented test APK
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}
```

```kotlin
// Combining a product flavor and a build type requires an explicit configuration placeholder
val freeDebugImplementation by configurations.creating

dependencies {
    freeDebugImplementation(project(":free-support"))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<variant><Configuration>` | configuration | — | E.g. `debugImplementation`, `freeImplementation`: applies the dependency only to source sets compiled for that build type or product flavor. |
| `<flavor><BuildType><Configuration>` | configuration | — | E.g. `freeDebugImplementation`: applies only to the combined variant. Must first be declared via `val freeDebugImplementation by configurations.creating` since AGP does not pre-create combined-variant configurations. |
| `testImplementation` | configuration | — | Applies only to local (JVM) unit tests. |
| `androidTestImplementation` | configuration | — | Applies only to the instrumented test APK. |

## Notes

- `buildTypes` and `productFlavors` themselves are defined in the `android { }` block — see the `build-config` category, not this page.
- Combined flavor+buildtype configurations (e.g. `freeDebugImplementation`) require manual creation via `configurations.creating` before they can be used in the `dependencies { }` block.

## Related

- [dependency-configurations.md](./dependency-configurations.md)
