---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-run-tests.html
---

# Test your multiplatform app - tutorial

Tutorial for creating, configuring, and running tests in Kotlin Multiplatform projects: common tests in `commonTest` using `kotlin.test`, plus platform-specific tests for Android and iOS.

## Signature / Usage

Dependency for the common test source set in `sharedLogic/build.gradle.kts`:

```kotlin
sourceSets {
    //...
    commonTest.dependencies {
        implementation(libs.kotlin.test)
    }
}
```

Common unit test (`sharedLogic/src/commonTest/kotlin`):

```kotlin
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class GrepTest {
    companion object {
        val sampleData = listOf(
            "123 abc",
            "abc 123",
            "123 ABC",
            "ABC 123"
        )
    }

    @Test
    fun shouldFindMatches() {
        val results = mutableListOf<String>()
        grep(sampleData, "[a-z]+") {
            results.add(it)
        }

        assertEquals(2, results.size)
        for (result in results) {
            assertContains(result, "abc")
        }
    }
}
```

Platform-specific tests use `expect` / `actual`:

```kotlin
expect fun determineCurrentRuntime(): CurrentRuntime
```

Android implementation (`androidMain/kotlin`) and its test (`androidHostTest/kotlin`):

```kotlin
actual fun determineCurrentRuntime(): CurrentRuntime {
    val name = System.getProperty("java.vm.name") ?: "Android"

    val version = System.getProperty("java.version")

    return CurrentRuntime(name, version)
}
```

iOS implementation (`iosMain/kotlin`) and its test (`iosTest/kotlin`):

```kotlin
import kotlin.experimental.ExperimentalNativeApi
import kotlin.native.Platform

@OptIn(ExperimentalNativeApi::class)
actual fun determineCurrentRuntime(): CurrentRuntime {
    val name = Platform.osFamily.name.lowercase()
    return CurrentRuntime(name, null)
}
```

## Notes

- Tests fall into two categories: tests for common code (run on any platform with any supported framework) and tests for platform-specific code (use the platform framework and its richer API).
- Test directories: `commonTest/kotlin` for common tests; `androidHostTest/kotlin` for Android local unit tests; `iosTest/kotlin` for iOS tests.
- The `kotlin.test` library provides platform-agnostic annotations and assertions. Annotations such as `Test` map to those of the selected framework or the nearest equivalent. Assertions run through an `Asserter` implementation: JUnit 4, JUnit 5, and TestNG are supported on JVM; on Android, `assertEquals()` may call `asserter.assertEquals()` with a `JUnit4Asserter`; on iOS the default `Asserter` is used with the Kotlin/Native test runner.
- Run targets: for `android`, tests run with JUnit 4 as local unit tests on the current machine (a local JVM), not instrumented tests; for `iosSimulatorArm64`, the Kotlin compiler detects test annotations and creates a test binary executed by the Kotlin/Native test runner.
- Running tests: Run icon in the gutter, the test file context menu, or the shortcut Ctrl+Shift+F10 (macOS: Ctrl Shift F10). The `allTests` Gradle task runs every test with the corresponding runner.
- HTML reports are generated in `sharedLogic/build/reports/tests`. `allTests/index.html` contains combined reports for common and iOS tests; `testDebugUnitTest` and `testReleaseUnitTest` hold the Android reports, which are currently not merged automatically into the `allTests` report.
- The tutorial uses `expect` / `actual` for brevity; in more complex code, interfaces and factory functions are a better approach.
- Rules: write common-code tests only with multiplatform libraries such as `kotlin.test` and add dependencies to `commonTest`; use `Asserter` only indirectly; run tests with each framework you intend to use; physics differences (for example scrolling inertia and friction) vary by platform, so test components on the target platform.
- Kotest is mentioned as another multiplatform testing framework (data-driven and property-based testing).
- This page covers `kotlin.test`-based KMP source set tests; for Compose UI tests (`runComposeUiTest`) and Jetpack Compose test APIs see the `android-testing` skill and `compose-ui/testing.md` in this skill.

## Related

- [Compose UI testing](../compose-ui/testing.md)
- [Targets and source sets](../project-structure/targets-and-source-sets.md)
- [Platform-specific APIs](../project-structure/platform-specific-apis.md)
