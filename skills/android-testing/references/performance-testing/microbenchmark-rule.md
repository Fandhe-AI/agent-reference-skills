# BenchmarkRule (Microbenchmark)

`BenchmarkRule` is a JUnit `@Rule` from `androidx.benchmark:benchmark-junit4` for benchmarking small, hot code paths (data conversions, `RecyclerView` layout, algorithm loops) in-process, inside an instrumented test. It repeats the measured block enough times to produce a stable result, handling warm-up, thermal-throttling detection, and optional CPU clock locking automatically.

## Signature / Usage

```kotlin
@RunWith(AndroidJUnit4::class)
class SampleBenchmark {
    @get:Rule
    val benchmarkRule = BenchmarkRule()

    @Test
    fun benchmarkSomeWork() {
        benchmarkRule.measureRepeated {
            doSomeWork()
        }
    }
}
```

```java
// Java: the equivalent explicit loop
@RunWith(AndroidJUnit4.class)
class SampleBenchmark {
    @Rule
    public BenchmarkRule benchmarkRule = new BenchmarkRule();

    @Test
    public void benchmarkSomeWork() {
        final BenchmarkState state = benchmarkRule.getState();
        while (state.keepRunning()) {
            doSomeWork();
        }
    }
}
```

```kotlin
// Module setup
dependencies {
    androidTestImplementation("androidx.benchmark:benchmark-junit4:1.3.3")
}

android {
    defaultConfig {
        testInstrumentationRunner = "androidx.benchmark.junit4.AndroidBenchmarkRunner"
    }
    buildTypes {
        release {
            isDebuggable = false
        }
    }
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `benchmarkRule.measureRepeated { }` | Kotlin entry point; runs the lambda repeatedly, excluding JIT warm-up from the reported result. |
| `BenchmarkState.keepRunning()` | Java loop-condition entry point obtained via `benchmarkRule.getState()`; returns `false` once enough iterations have run. |
| `runWithTimingDisabled { }` | Kotlin — excludes setup code (e.g. copying test fixtures) from the measured block's timing. |
| `state.pauseTiming()` / `state.resumeTiming()` | Java equivalent of `runWithTimingDisabled` for excluding setup from timing. |

## Notes

- Vary input parameters across iterations for benchmarks that involve caching (e.g. view layout) — otherwise the benchmark measures only the cache hit path, not real work.
- Rooted devices can lock CPU clocks via `./gradlew lockClocks` for the most stable results; unrooted devices rely on `Window.setSustainedPerformanceMode()` plus automatic thermal-throttling detection, both enabled by default through the benchmark test runner.
- Since Benchmark `1.3.0-beta01` + AGP `8.4.0+`, the microbenchmark APK is fully AOT-compiled by default (equivalent to Macrobenchmark's `CompilationMode.Full`); opt out with `androidx.benchmark.forceaotcompilation=false` in `gradle.properties`.
- Distinct from Macrobenchmark's `MacrobenchmarkRule`: Microbenchmark measures in-process code directly, while Macrobenchmark launches the target app as a separate process and measures end-to-end scenarios via UI Automator.

## Related

- [macrobenchmark-rule.md](./macrobenchmark-rule.md)
