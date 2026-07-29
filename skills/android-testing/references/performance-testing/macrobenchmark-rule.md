# MacrobenchmarkRule

`MacrobenchmarkRule` is a JUnit `@Rule` from the `androidx.benchmark:benchmark-macro-junit4` library that measures large-scale, end-to-end use cases of an app under test — app startup, scrolling, animations — running the target app as a separate process launched via UI Automator. Results (min/median/max) are printed to the Android Studio console, written as JSON for CI, and paired with a Perfetto system trace per iteration.

## Signature / Usage

```kotlin
@LargeTest
@RunWith(AndroidJUnit4::class)
class SampleStartupBenchmark {
    @get:Rule
    val benchmarkRule = MacrobenchmarkRule()

    @Test
    fun startup() = benchmarkRule.measureRepeated(
        packageName = "com.example.app",
        metrics = listOf(StartupTimingMetric()),
        iterations = 5,
        startupMode = StartupMode.COLD,
    ) {
        pressHome()
        startActivityAndWait()
    }
}
```

```kotlin
// macrobenchmark/build.gradle.kts (separate androidx.test module, no application id overlap with :app)
plugins {
    id("com.android.test")
    id("org.jetbrains.kotlin.android")
}

android {
    targetProjectPath = ":app"
    experimentalProperties["android.experimental.self-instrumenting"] = true
}

dependencies {
    implementation("androidx.test.ext:junit:1.2.1")
    implementation("androidx.test.uiautomator:uiautomator:2.3.0")
    implementation("androidx.benchmark:benchmark-macro-junit4:1.3.3")
}
```

## Options / Props

`measureRepeated` (the sole entry point of `MacrobenchmarkRule`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `packageName` | `String` | — | Target app package to launch and measure; must not be the macrobenchmark module's own package. |
| `metrics` | `List<Metric>` | — | One or more of `StartupTimingMetric`, `FrameTimingMetric`, `TraceSectionMetric`, `PowerMetric`. |
| `iterations` | `Int` | — | Number of measured runs; each produces its own trace file. |
| `startupMode` | `StartupMode?` | `null` | `COLD` kills the process before `measureBlock`; `WARM` restarts the Activity without killing the process; `HOT` keeps the app in the foreground. `null` when the measurement isn't startup-related (e.g. pure scroll benchmarks). |
| `compilationMode` | `CompilationMode` | `CompilationMode.DEFAULT` | Controls AOT/Baseline Profile compilation state before measuring; see `compilation-mode.md`. |
| `setupBlock` | `MacrobenchmarkScope.() -> Unit` | `{}` | Runs before each iteration's measurement and is excluded from timing; typical use is `pressHome()`. |
| `measureBlock` | `MacrobenchmarkScope.() -> Unit` | — | The measured block; typically `startActivityAndWait()` plus UI Automator interactions (`device.findObject`, `fling`, etc.). |

## Notes

- Macrobenchmark tests live in a dedicated `com.android.test` module (not `androidTest` inside `:app`), since the library launches the target app as a separate process and instruments it externally via UI Automator.
- `StartupMode.COLD` is required to get a representative `timeToInitialDisplayMs`; reusing a warm process under `COLD` mode is a common source of misleading results.
- Emulators without Play Store images or debug builds without R8 disable some compilation modes; benchmarks should run on release-like (`isDebuggable = false`, but signed as the "benchmark" build type) builds for realistic numbers.

## Related

- [macrobenchmark-metrics.md](./macrobenchmark-metrics.md)
- [compilation-mode.md](./compilation-mode.md)
- [microbenchmark-rule.md](./microbenchmark-rule.md)
