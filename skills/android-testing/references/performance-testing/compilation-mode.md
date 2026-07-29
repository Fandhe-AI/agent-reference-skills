# CompilationMode

`CompilationMode` (`androidx.benchmark.macro.CompilationMode`), passed to `MacrobenchmarkRule.measureRepeated(compilationMode = ...)`, controls how much of the target app is pre-compiled from DEX bytecode to machine code (ART AOT compilation) before each measured run, letting a benchmark isolate JIT-compilation noise from the code path actually being measured.

## Signature / Usage

```kotlin
benchmarkRule.measureRepeated(
    packageName = "com.example.app",
    metrics = listOf(StartupTimingMetric()),
    iterations = 5,
    compilationMode = CompilationMode.Partial(baselineProfileMode = BaselineProfileMode.Require),
) {
    startActivityAndWait()
}
```

## Options / Props

| Mode | Description |
|------|-------------|
| `CompilationMode.DEFAULT` | Alias for `Partial(baselineProfileMode = Require)` — installs the app's Baseline Profile if present (Android 7+). |
| `CompilationMode.None()` | Resets compilation state and disables pre-compilation; JIT still compiles hot code during the run. Represents an unoptimized first install. |
| `CompilationMode.Partial(baselineProfileMode, warmupIterations)` | Pre-compiles via Baseline Profile (`baselineProfileMode`), warm-up iterations, or both. `baselineProfileMode` accepts `Require` / `Disable`. |
| `CompilationMode.Full()` | Fully AOT-compiles the whole APK ahead of measurement; not representative of real user devices but yields the lowest-noise, most stable numbers. |
| `CompilationMode.Ignore` | Skips Macrobenchmark's own compilation handling entirely, so compilation state can be controlled separately (e.g. by a prior test run). |

## Notes

- `CompilationMode.DEFAULT` is what most Baseline Profile validation benchmarks should use — it reflects the state a real end-user device reaches after Play Store install.
- `Full()` is useful to detect whether a regression is caused by JIT variance versus the code path itself, since it removes JIT noise almost entirely.
- Distinct from the Gradle `androidx.baselineprofile` plugin (covered in the android-build-gradle skill), which generates the `baseline-prof.txt` consumed here — `CompilationMode` only controls how that profile (or its absence) is applied during a benchmark run, it does not generate profiles.

## Related

- [macrobenchmark-rule.md](./macrobenchmark-rule.md)
- [macrobenchmark-metrics.md](./macrobenchmark-metrics.md)
