---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-advanced-project-structure.html
---

# Advanced concepts of the multiplatform project structure

Explains how the Kotlin Multiplatform project structure maps to the Gradle implementation: the `dependsOn` relation, dependency resolution into source set to source set dependencies, version alignment, and compilations. Useful for custom intermediate source sets and for Gradle plugin authors.

## Signature / Usage

`dependsOn` is configured with `KotlinSourceSet.dependsOn(KotlinSourceSet)`:

```kotlin
kotlin {
    // Targets declaration
    sourceSets {
        // Example of configuring the dependsOn relation
        iosArm64Main.dependsOn(commonMain)
    }
}
```

A custom intermediate source set shared by JVM and JS:

```kotlin
kotlin {
    jvm()
    js()
    linuxX64()

    sourceSets {
        val jvmAndJsMain by creating {
            // Don't forget to add dependsOn to commonMain
            dependsOn(commonMain.get())
        }

        jvmMain {
            dependsOn(jvmAndJsMain)
        }

        jsMain {
            dependsOn(jvmAndJsMain)
        }
    }
}
```

Per-source-set dependencies and compilation access:

```kotlin
kotlin {
    // Targets declaration
    sourceSets {
        jvmMain.dependencies {
            // This is jvmMain's dependencies, so it's OK to add a JVM-specific dependency
            implementation("com.google.guava:guava:32.1.2-jre")
        }
    }
}
```

```kotlin
kotlin {
    // Declare and configure the JVM target
    jvm {
        val mainCompilation: KotlinJvmCompilation = compilations.getByName("main")
    }
}
```

## Notes

- `A.dependsOn(B)` means: `A` observes the API from `B` including internal declarations; `A` can provide actual implementations for expected declarations from `B` (if and only if `A.dependsOn(B)` directly or indirectly); `B` compiles to all targets `A` compiles to; `A` inherits all regular dependencies of `B`.
- `dependsOn` is declared separately from `dependencies {}` and cannot be used to depend on a published library or another Gradle project (for example `commonTest.dependsOn(commonMain)` is invalid).
- Manual `dependsOn` configuration disables automatic application of the default hierarchy template.
- Dependency resolution: multiplatform dependencies propagate down the `dependsOn` structure; source set to library dependencies are an intermediate state, the final state is source set to source set dependencies (not `dependsOn` relations); a dependency source set is compatible if it compiles to at least the same targets as the consumer source set. The library's published source set structure is read to infer this.
- Version alignment: the common source set is compiled several times (klib and each configured compilation), so the Kotlin Gradle plugin aligns effective dependency versions across `*Main` source sets (for example a higher coroutines version required by `androidx.navigation:navigation-compose:2.7.7` is applied to `commonMain` and propagated to iOS source sets). `*Main` and `*Test` are aligned separately; `*Test` configurations include all `*Main` dependencies but not vice versa.
- Kotlin creates two compilations per target by default: `main` (production sources) and `test` (test sources).
- Distance line: Gradle configurations, tasks, and publications in general belong to android-build-gradle.

## Related

- [targets-and-source-sets.md](./targets-and-source-sets.md)
- [hierarchy.md](./hierarchy.md)
- [add-dependencies.md](./add-dependencies.md)
