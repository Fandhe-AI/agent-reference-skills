# Native (C/C++) dependencies via Prefab

`buildFeatures.prefab` lets a module consume precompiled native (C/C++) libraries packaged inside AARs, and `prefabPublishing` lets a library module publish its own native libraries in that format, for lookup from `CMakeLists.txt` via `find_package()`.

## Signature / Usage

```kotlin
// Consuming module: build.gradle.kts (AGP 4.0+)
android {
    buildFeatures {
        prefab = true
    }
}

dependencies {
    implementation("com.example:curl:1.0.0")
}
```

```cmake
# CMakeLists.txt
add_library(app SHARED app.cpp)

find_package(curl REQUIRED CONFIG)
target_link_libraries(app curl::curl)
```

```kotlin
// Publishing module: build.gradle.kts (AGP 4.1+)
android {
    buildFeatures {
        prefabPublishing = true
    }

    prefab {
        create("mylibrary") {
            headers = "src/main/cpp/mylibrary/include"
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `buildFeatures.prefab` | `Boolean` | `false` | Enables consuming Prefab native packages from AAR dependencies. Requires AGP 4.0+. |
| `buildFeatures.prefabPublishing` | `Boolean` | `false` | Enables publishing this library module's native libraries as a Prefab package. Requires AGP 4.1+. |
| `prefab { create("<name>") { ... } }` | block | — | Declares one Prefab module to publish; `headers` sets the directory of public C/C++ headers for that module. |
| `android.prefabVersion` (gradle.properties) | string | AGP-selected | Overrides the Prefab tool version used by AGP; usually left at the default. |

## Notes

- Gradle sets `CMAKE_FIND_ROOT_PATH` automatically so `find_package(... CONFIG)` can locate the imported package; if a project overrides this variable itself, it must append rather than replace it.
- By convention the Prefab *package* name matches the Maven artifact name, and each *module* name matches the C/C++ library/target name (`find_package(curl)` / `curl::curl`), though this is not enforced.
- Inside the AAR, published native libraries live under `prefab/modules/<module>/{include,libs/<abi>}` alongside `prefab.json` (package metadata) and `module.json` (per-module metadata).

## Related

- [buildFeatures](./build-features.md)
- [Custom C/C++ build system integration](./native-build-cmake.md)
- [packaging](./packaging.md)
