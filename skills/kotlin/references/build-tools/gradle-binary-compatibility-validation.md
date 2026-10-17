---
source: https://kotlinlang.org/docs/gradle-binary-compatibility-validation.html
---

# Binary compatibility validation in the Kotlin Gradle plugin

The Kotlin Gradle plugin generates ABI dumps from the current code and compares them with previous dumps, so library authors can find potentially binary-incompatible changes. Binary compatibility means compiled bytecode of two library versions can run interchangeably without recompilation.

## Signature / Usage

```kotlin
kotlin {
    @OptIn(org.jetbrains.kotlin.gradle.dsl.abi.ExperimentalAbiValidation::class)
    abiValidation()
}
```

Use an `abiValidation {}` block for custom configuration. In multi-module projects configure each module separately.

```bash
./gradlew checkKotlinAbi
./gradlew updateKotlinAbi
```

### Tasks

| Task | Behavior |
| --- | --- |
| `checkKotlinAbi` | Compares ABI dumps and prints differences as errors. When validation is enabled, `check` also runs it |
| `updateKotlinAbi` | Updates the reference ABI dump; only do so when changes maintain binary compatibility |

## Options / Props

Filters (`filters {}` with `excluded {}` and `included {}`):

| Name | Description |
| --- | --- |
| `byNames` | Fully qualified name of a class, property, or function |
| `annotatedWith` | Name of an annotation with BINARY or RUNTIME retention |

- A declaration is included only if it matches no exclusion rule; when inclusion rules exist it must match one or have a matching member.
- Wildcards: `**` zero or more characters including periods; `*` zero or more characters excluding periods; `?` exactly one character.

```kotlin
kotlin {
    @OptIn(org.jetbrains.kotlin.gradle.dsl.abi.ExperimentalAbiValidation::class)
    abiValidation {
        filters {
            excluded {
                byNames.add("**.InternalUtils")
                annotatedWith.add("com.example.annotations.InternalApi")
            }

            included {
                byNames.add("com.example.api.**")
                annotatedWith.add("com.example.annotations.PublicApi")
            }
        }
    }
}
```

Other settings:

```kotlin
kotlin {
    @OptIn(org.jetbrains.kotlin.gradle.dsl.abi.ExperimentalAbiValidation::class)
    abiValidation {
        keepLocallyUnsupportedTargets.set(false)
        binariesSource.set(MAVEN_PUBLICATIONS)
    }
}
```

- `keepLocallyUnsupportedTargets`: in multiplatform projects, when the host cannot compile all targets, KGP infers ABI changes from available targets; set `false` to disable, in which case `checkKotlinAbi` fails for an unsupported target because it cannot generate a complete dump.
- `binariesSource`: by default ABI dumps use Kotlin compilation outputs; `MAVEN_PUBLICATIONS` makes them reflect artifacts published by `maven-publish` (e.g. after relocation).

## Notes

- Uses the `@OptIn(ExperimentalAbiValidation::class)` annotation in the Kotlin DSL example, so the API is experimental.
- `binariesSource = MAVEN_PUBLICATIONS` does not apply to Kotlin/Android projects or multiplatform projects with an Android target, because they don't publish JAR files.

## Related

- [Gradle](./gradle.md)
- [Configure a Gradle project](./gradle-configure-project.md)
