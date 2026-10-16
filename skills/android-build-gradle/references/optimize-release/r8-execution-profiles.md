# R8 Execution Profiles

The settings plugin lets you create execution profiles for the R8 tool, configuring how R8 runs so it doesn't slow down your build. Depending on the environment, profiles can run R8 in a separate JVM process and set JVM arguments such as maximum heap size.

## Signature / Usage

```kotlin
// Apply the settings plugin, then add the `android` block to settings.gradle (Kotlin DSL shown)
android {
    execution {
        profiles {
            create("server") {
                r8 {
                    runInSeparateProcess = true
                    jvmOptions += listOf("-Xms2048m", "-Xmx8192m", "-XX:+HeapDumpOnOutOfMemoryError")
                }
            }
            create("local") {
                r8 {
                    runInSeparateProcess = true
                    jvmOptions += listOf("-Xms256m", "-Xmx2048m", "-XX:+HeapDumpOnOutOfMemoryError")
                }
            }
            defaultProfile = "server"
        }
    }
}
```

Groovy DSL uses `register(...)` and list literals:

```groovy
android {
    execution {
        profiles {
            register("server") {
                r8 {
                    runInSeparateProcess = true
                    jvmOptions += ["-Xms2048m", "-Xmx8192m", "-XX:+HeapDumpOnOutOfMemoryError"]
                }
            }
            defaultProfile = "server"
        }
    }
}
```

Override the default profile in `gradle.properties`:

```properties
android.settings.executionProfile=example-profile
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `runInSeparateProcess` | Boolean | Runs R8 in a separate JVM process. |
| `jvmOptions` | list of strings | JVM arguments for the R8 process (e.g. `-Xms`, `-Xmx`, `-XX:+HeapDumpOnOutOfMemoryError`). |
| `defaultProfile` | String | Name of the profile used by default. |
| `android.settings.executionProfile` | Gradle property | Overrides the default profile (set in `gradle.properties`). |

## Notes

- Profiles are declared in `settings.gradle` (settings plugin), not in a module `build.gradle`.
- Kotlin DSL declares profiles with `create("name")`; Groovy DSL uses `register("name")`.
- Source: `developer.android.com/build/r8-execution-profiles` (local copy fetched 2026-10).

## Related

- [shrink-code.md](./shrink-code.md)
- [r8-troubleshooting.md](./r8-troubleshooting.md)
