# Custom C/C++ build system integration (externalNativeBuild, ndk {} block)

`externalNativeBuild` links a module's Gradle build to an existing CMake (`CMakeLists.txt`) or `ndk-build` (`Android.mk`) native build script, so Gradle configures, builds, and packages the native libraries as part of the app build. A module may link to only one of CMake or `ndk-build`, not both.

## Signature / Usage

```kotlin
// Top level: which script to build
android {
    defaultConfig { ... }
    buildTypes { ... }

    externalNativeBuild {
        cmake {
            path = file("CMakeLists.txt")
        }
        // Or, for ndk-build:
        // ndkBuild {
        //     path = file("Android.mk")
        // }
    }
}
```

```kotlin
// Per-variant: arguments, flags, and ABI selection
android {
    defaultConfig {
        externalNativeBuild {
            cmake {
                arguments += listOf("-DANDROID_ARM_NEON=TRUE", "-DANDROID_TOOLCHAIN=clang")
                cFlags += listOf("-D__STDC_FORMAT_MACROS")
                cppFlags += listOf("-fexceptions", "-frtti")
            }
        }

        ndk {
            abiFilters += listOf("armeabi-v7a", "arm64-v8a", "x86", "x86_64")
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `externalNativeBuild.cmake.path` | `File` | — | Relative path to `CMakeLists.txt`. Mutually exclusive with `ndkBuild.path`. |
| `externalNativeBuild.ndkBuild.path` | `File` | — | Relative path to `Android.mk`; Gradle also picks up an `Application.mk` in the same directory. |
| `defaultConfig.externalNativeBuild.cmake.arguments` | `List<String>` | empty | Extra `-D` variables passed to the CMake invocation. |
| `defaultConfig.externalNativeBuild.cmake.cFlags` | `List<String>` | empty | Extra C compiler flags. |
| `defaultConfig.externalNativeBuild.cmake.cppFlags` | `List<String>` | empty | Extra C++ compiler flags. |
| `productFlavors { ... }.externalNativeBuild.cmake.targets` | `List<String>` | all targets | Restricts which native libraries/executables (from `add_library`/`add_executable`) are built and packaged for that flavor. |
| `defaultConfig.externalNativeBuild.cmake.abiFilters` | `Set<String>` | all supported ABIs | Restricts which ABIs CMake builds. |
| `defaultConfig.ndk.abiFilters` | `Set<String>` | all supported ABIs | Restricts which built ABIs are packaged into the APK/AAB (can be a subset of the CMake-level `abiFilters`). |

## Notes

- `cmake { }` / `ndkBuild { }` under the top-level `externalNativeBuild` block configure *which script* to use; the same-named blocks under `defaultConfig` (or `buildTypes` / `productFlavors`) configure *build variant-specific arguments* — both are needed together.
- After editing the CMake/`ndk-build` script itself (not the Gradle file), a project resync alone is not enough; Android Studio's **Build > Refresh Linked C++ Projects** action is required.
- `defaultConfig.externalNativeBuild.cmake.abiFilters` controls which ABIs are *built*; `defaultConfig.ndk.abiFilters` controls which built ABIs are *packaged* — set the latter to a subset of the former to build extra ABIs without shipping them.
- Prebuilt (not built from source) native libraries are placed under `src/main/jniLibs/<ABI>/` rather than referenced through `externalNativeBuild`.

## Related

- [Native (C/C++) dependencies via Prefab](./native-dependencies-prefab.md)
- [defaultConfig](./default-config.md)
- [packaging](./packaging.md)
