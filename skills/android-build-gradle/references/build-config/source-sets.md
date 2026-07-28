# sourceSets

Nested block inside `android { }` used to customize the directories Gradle scans for Java/Kotlin sources, resources, and the manifest, per source set (`main`, a build type, a product flavor, a build variant, `test`, `androidTest`).

## Signature / Usage

```kotlin
android {
    sourceSets {
        getByName("main") {
            java.setSrcDirs(listOf("other/java"))
            res.setSrcDirs(listOf("other/res1", "other/res2"))
            manifest.srcFile("other/AndroidManifest.xml")
        }
        getByName("androidTest") {
            setRoot("src/tests")
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `java.setSrcDirs(dirs)` | function | `src/<name>/java` | Overrides the Java/Kotlin source directories for the named source set. |
| `res.setSrcDirs(dirs)` | function | `src/<name>/res` | Overrides the resource directories; multiple directories are given equal priority. |
| `manifest.srcFile(path)` | function | `src/<name>/AndroidManifest.xml` | Overrides the manifest file location. |
| `setRoot(path)` | function | `src/<name>` | Overrides the root directory for all files belonging to the source set. |

## Notes

- Default directory layout: `src/main/`, `src/debug/`, `src/release/`, `src/<flavor>/`, `src/<flavor><BuildType>/`, `src/androidTest/`, `src/test/`.
- Merge/override priority for a `demoDebug` variant, highest first: `src/demoDebug/` > `src/debug/` > `src/demo/` > `src/main/`.
- No dedicated official guide page is currently published at `/build/sourcesets` (returns 404); this page is sourced from the `sourceSets` examples on the build-variants and gradle-tips guides.

## Related

- [productFlavors and flavorDimensions](./product-flavors.md)
- [buildTypes](./build-types.md)
