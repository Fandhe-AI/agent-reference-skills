---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-hierarchy.html
---

# Source set hierarchy

Kotlin Multiplatform supports hierarchical source set structures: intermediate source sets share code among some, but not all, supported targets. The recommended setup is the default hierarchy template; manual configuration with `dependsOn` is the low-level alternative.

## Signature / Usage

With the default hierarchy template, declare targets and the plugin creates the shared source sets:

```kotlin
kotlin {
    android()
    iosArm64()
    iosSimulatorArm64()
}
```

Re-apply the template and add a custom source set (for example one between macOS and JVM):

```kotlin
kotlin {
    jvm()
    macosArm64()
    iosArm64()
    iosSimulatorArm64()

    // Apply the default hierarchy again. It'll create, for example, the iosMain source set:
    applyDefaultHierarchyTemplate()

    sourceSets {
        // Create an additional jvmAndMacos source set:
        val jvmAndMacos by creating {
            dependsOn(commonMain.get())
        }

        macosArm64Main.get().dependsOn(jvmAndMacos)
        jvmMain.get().dependsOn(jvmAndMacos)
    }
}
```

Manual configuration (share code among `linuxX64`, `mingwX64`, `macosArm64`):

```kotlin
kotlin {
    linuxX64()
    mingwX64()
    macosArm64()

    sourceSets {
        val myDesktopMain by creating {
            dependsOn(commonMain.get())
        }

        linuxX64Main.get().dependsOn(myDesktopMain)
        mingwX64Main.get().dependsOn(myDesktopMain)
        macosArm64Main.get().dependsOn(myDesktopMain)
    }
}
```

## Options / Props

| Name | Where | Description |
|------|-------|-------------|
| `applyDefaultHierarchyTemplate()` | `kotlin {}` | Re-applies the default hierarchy template explicitly |
| `kotlin.mpp.applyDefaultHierarchyTemplate=false` | `gradle.properties` | Opts out of the default template; all source sets are then configured manually |
| `dependsOn(...)` | `sourceSets {}` | Declares a hierarchy edge between source sets |
| `applyHierarchyTemplate {}` / `KotlinHierarchyTemplate.default` | `kotlin {}` | API to create custom hierarchy templates; still in development, may be untested and change in further releases |

## Notes

- The Kotlin Gradle plugin provides type-safe static accessors for all source sets of the default template (for example `iosMain.dependencies { ... }`), so `by getting` / `by creating` is not needed for them. Accessing a template source set without declaring the corresponding target (for example `linuxX64Main { }`) produces a warning.
- Each source set has access only to the API available for all targets it compiles to.
- Source sets such as `apple` and `native` compile only to the declared targets (for example `iosArm64` and `iosSimulatorArm64`) and have access to the full iOS API despite their names. The source says this behavior may change in the future.
- Manually configured `dependsOn` edges cancel the default hierarchy template and produce the warning "The Default Kotlin Hierarchy Template was not applied to '<project-name>'". Fix by replacing the manual configuration, creating additional source sets after `applyDefaultHierarchyTemplate()`, or opting out.
- There is currently no way to modify the default `dependsOn` relations among the template's source sets.
- Shared source sets are supported for these target combinations: JVM or Android + Web + Native; JVM or Android + Native; Web + Native; JVM or Android + Web; Native. Not supported: several JVM targets, JVM + Android targets, several JS targets.
- To access platform-specific APIs from a shared source set otherwise, use expected and actual declarations.
- The full template diagram is an image in the source and is not reproduced here; it shows the production source sets without the `Main` suffix and applies equally to `*Test`.

## Related

- [targets-and-source-sets.md](./targets-and-source-sets.md)
- [advanced-project-structure.md](./advanced-project-structure.md)
- [expect-actual.md](./expect-actual.md)
