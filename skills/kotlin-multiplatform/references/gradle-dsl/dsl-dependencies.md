---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-dsl-reference.html#dependencies
---

# Multiplatform Gradle DSL reference — Dependencies

The `dependencies {}` block of a source set declaration contains the dependencies of that source set.

## Signature / Usage

```kotlin
kotlin {
    //...
    sourceSets {
        commonMain {
            dependencies {
                api("com.example:foo-metadata:1.0")
            }
        }
        jvmMain {
            dependencies {
                implementation("com.example:foo-jvm:1.0")
            }
        }
    }
}
```

Top-level `dependencies {}` (Experimental) behaves as if dependencies were added to `commonMain` or `commonTest`; opt in with `@OptIn(ExperimentalKotlinGradlePluginApi::class)`:

```kotlin
kotlin {
    @OptIn(ExperimentalKotlinGradlePluginApi::class)
    dependencies {
        implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
    }
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `api` | Dependencies used in the API of the current module. |
| `implementation` | Dependencies used in the module but not exposed outside it. |
| `compileOnly` | Dependencies used only for compilation of the current module. |
| `runtimeOnly` | Dependencies available at runtime but not visible during compilation of any module. |

## Notes

- Experimental: "Configure dependencies at the top level" is marked Experimental. Feedback goes to YouTrack KT-76446.
- Add platform-specific dependencies inside the `sourceSets {}` block of the corresponding target.
- Source sets can depend on each other and form a hierarchy via the `dependsOn()` relation.
- Groovy form: `api 'com.example:foo-metadata:1.0'`.
- General Gradle dependency configuration is documented in the Kotlin docs (kotlin skill); Gradle dependency fundamentals for Android modules belong to android-build-gradle.

## Related

- [Source sets](./dsl-source-sets.md)
- [Add dependencies](../project-structure/add-dependencies.md)
