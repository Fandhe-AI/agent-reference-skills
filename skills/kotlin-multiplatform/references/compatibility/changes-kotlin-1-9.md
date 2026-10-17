---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-compatibility-guide.html#kotlin-1-9-0-1-9-25
---

# Compatibility guide for Kotlin Multiplatform — Kotlin 1.9.0−1.9.25

Incompatible changes that end their deprecation cycle and come into effect in Kotlin 1.9.0−1.9.25.

## Signature / Usage

Replacement for the removed `KotlinCompilation.source(...)`:

```kotlin
kotlin {
    jvm()
    js()
    iosArm64()
    iosSimulatorArm64()

    sourceSets {
        val myCustomIntermediateSourceSet by creating {
            // The commonMain source set needs to be accessed with the 
            // .get() function
            dependsOn(commonMain.get())
        }

        // Option #1. Add your sources directly to the appropriate source
        // set:
        commonMain {
            kotlin.srcDir(layout.projectDirectory.dir("src/commonMain/my-custom-kotlin"))
        }

        // Option #2. Use the conventions provided with default
        // Kotlin Multiplatform targets for their main and test
        // source sets:
        jvmMain {
            dependsOn(myCustomIntermediateSourceSet)
        }

        // Option #3. A more generic solution. Use it if your build script 
        // requires a more advanced approach:
        targets["jvm"].compilations["main"].defaultSourceSet.dependsOn(myCustomIntermediateSourceSet)
    }
}
```

### Changes

#### Removed API for adding Kotlin source sets directly to the Kotlin compilation

- `KotlinCompilation.source` access is removed. Unsupported: `targets["jvm"].compilations["main"].source(myCustomIntermediateSourceSet)`.
- Replace with `.srcDir()` on the appropriate source set, a `dependsOn` from the default source set of the compilation, source set conventions (IDE-friendly, most robust), or `KotlinCompilation.defaultSourceSet.dependsOn(someSourceSet)` (works in all cases).
- Cycle: 1.9.0 warning; 1.9.20 error; 2.3.0 `KotlinCompilation.source` removed ("unresolved reference" during buildscript compilation).

#### Migration from `kotlin-js` Gradle plugin to `kotlin-multiplatform` Gradle plugin

The `kotlin-js` plugin is deprecated since Kotlin 1.9.0; use `kotlin-multiplatform` with the `js()` target.

1. Remove the `kotlin-js` plugin and apply `kotlin-multiplatform` (in `settings.gradle.kts` when using `pluginManagement {}`):

   ```kotlin
   // settings.gradle.kts:
   pluginManagement {
       plugins {
           // Add the following line instead:
           kotlin("multiplatform") version "1.9.0"
       }

       repositories {
           // ...
       }
   }
   ```

2. Move source files from the `main` and `test` folders to `jsMain` and `jsTest` in the same directory.
3. Adjust dependency declarations. Recommended: configure `jsMain {}` / `jsTest {}` in `sourceSets {}`. Alternatively in a top-level block change `api("group:artifact:1.0")` to `add("jsMainApi", "group:artifact:1.0")`; the top-level `dependencies {}` block must come after the `kotlin {}` block, otherwise you get "Configuration not found".

   ```kotlin
   // build.gradle.kts:
   plugins {
       kotlin("multiplatform") version "1.9.0"
   }

   kotlin {
       js {
           // ...
       }

       // Option #1. Declare dependencies in the sourceSets {} block:
       sourceSets {
           val jsMain by getting {
               dependencies {
                   // No need for the js prefix here, you can just copy and paste it from the top-level block
                   implementation("org.jetbrains.kotlinx:kotlinx-html:0.8.0")
               }
          }
       }
   }

   dependencies {
       // Option #2. Add the js prefix to the dependency declaration:
       add("jsTestImplementation", kotlin("test"))
   }
   ```

4. Low-level Gradle entities referenced by name (tasks, configurations) usually need a `js` prefix, for example `browserTest` becomes `jsBrowserTest`.

- Cycle: 1.9.0 deprecation warning for `kotlin-js`; 2.4.0 warning raised to error (KT-59305).

#### Deprecated `jvmWithJava` preset

`targetPresets.jvmWithJava` is deprecated. Use `jvm { withJava() }`; Java source paths change (for the default target name `jvm`): `src/main/java` to `src/jvmMain/java`, `src/test/java` to `src/jvmTest/java`.

- Cycle: 1.3.40 warning; 1.9.20 error; >1.9.20 API removed (buildscript compilation failure). This has a different timeline than the rest of the deprecated `targetPresets` API.

#### Deprecated legacy Android source set layout

- The new Android source set layout is the default since Kotlin 1.9.0; use of the `kotlin.mpp.androidSourceSetLayoutVersion` Gradle property triggers a deprecation diagnostic.
- Cycle: <=1.9.0 warning when `kotlin.mpp.androidSourceSetLayoutVersion=1` is used (suppressible with `kotlin.mpp.androidSourceSetLayoutVersion1.nowarn=true`); 1.9.20 error that cannot be suppressed; 2.4.0 legacy layout support and the property removed (KT-82265).

#### Deprecated `commonMain` and `commonTest` with custom `dependsOn`

- `commonMain` and `commonTest` are the roots of the `main` / `test` source set hierarchies; accessing `dependsOn` on them is deprecated.
- To migrate `customCommonMain` (with `commonMain.dependsOn(customCommonMain)`): copy its sources, dependencies and compiler option settings into `commonMain`. In the rare case it participates in more compilations than `commonMain`, "swap" the two source sets' sources and settings.
- Cycle: 1.9.0 warning on `dependsOn` in `commonMain`; >=1.9.20 error for `commonMain` or `commonTest`.

#### New approach to forward declarations

- Forward declarations can only be imported via the `cnames` or `objcnames` packages, and you must explicitly cast to and from the corresponding C / Objective-C forward declaration.
- Example: a C library `library.package` declaring `cstructName` was previously imported with `import library.package.cstructName`; now use `import cnames.structs.cstructName` (same for `objcnames`).
- Example cast between two objcinterop libraries:

  ```kotlin
  // Kotlin code:
  fun test() {
      consumeProtocol(produceProtocol() as objcnames.protocols.ForwardDeclaredProtocolProtocol)
  }
  ```

- You can only cast to `objcnames.protocols.ForwardDeclaredProtocolProtocol` from the corresponding real class, otherwise an error occurs.
- Takes effect starting with Kotlin 1.9.20.

## Notes

- Migration (Kotlin 1.9 → 2.0): continue with changes-kotlin-2-0-and-later when upgrading past 1.9.25.
- Kotlin/Native C and Objective-C interop and the `cnames` / `objcnames` packages belong to the kotlin skill for language-level detail; this page lists only the Multiplatform compatibility change.

## Related

- [Compatibility guide for Kotlin Multiplatform — Kotlin 2.0.0 and later](./changes-kotlin-2-0-and-later.md)
- [Compatibility guide for Kotlin Multiplatform — Kotlin 1.7.0−1.8.22](./changes-kotlin-1-7-1-8.md)
- [Android source set layout](./android-source-set-layout.md)
- [Compatibility guide for Kotlin Multiplatform — Version compatibility](./version-compatibility.md)
