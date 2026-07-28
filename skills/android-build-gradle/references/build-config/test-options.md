# testOptions

Nested block inside `android { }` that configures how unit tests run as part of the Gradle build, including report/result output locations and default-value behavior for Android-framework calls in unit tests.

## Signature / Usage

```kotlin
android {
    testBuildType = "staging"

    testOptions {
        unitTests {
            returnDefaultValues = true

            all {
                jvmArgs = listOf("-XX:MaxPermSize=256m")
            }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `testBuildType` | `String` | `"debug"` | Which build type is used when running instrumented tests. |
| `testOptions.unitTests.returnDefaultValues` | `Boolean` | — | When `true`, calls to non-mocked Android framework methods in unit tests return default values (e.g. `0`, `null`, `false`) instead of throwing. |
| `testOptions.unitTests.all { jvmArgs = ... }` | property | — | JVM arguments passed to the unit test execution task. |

## Notes

- This page covers only the DSL declaration; test authoring itself is owned by the `android-testing` skill.
- `testInstrumentationRunner` (the instrumented test runner class) is declared in `defaultConfig`, not `testOptions`.

## Related

- [defaultConfig](./default-config.md)
