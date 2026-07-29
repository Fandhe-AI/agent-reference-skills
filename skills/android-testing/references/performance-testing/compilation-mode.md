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
| `CompilationMode.DEFAULT` | Alias for `Partial(baselineProfileMode = BaselineProfileMode.UseIfAvailable, warmupIterations = 0)` — installs the app's Baseline Profile if present (Android 7+), but does **not** fail the benchmark when no profile is available (unlike `Require`). |
| `CompilationMode.None()` | Resets compilation state and disables pre-compilation; JIT still compiles hot code during the run. Represents an unoptimized first install. |
| `CompilationMode.Partial(baselineProfileMode, warmupIterations)` | Pre-compiles via Baseline Profile (`baselineProfileMode`), warm-up iterations, or both. `baselineProfileMode` accepts `Require` (default for this constructor; fails the benchmark if no profile installs) / `UseIfAvailable` (used by `DEFAULT`; proceeds without failing) / `Disable`. |
| `CompilationMode.Full()` | Fully AOT-compiles the whole APK ahead of measurement; not representative of real user devices but yields the lowest-noise, most stable numbers. |
| `CompilationMode.Ignore()` | Skips Macrobenchmark's own compilation handling entirely, so compilation state can be controlled separately (e.g. by a prior test run). Requires `@OptIn(ExperimentalMacrobenchmarkApi::class)` — unlike `None()` / `Partial(...)` / `Full()`, which are stable. |

## Notes

- Prefer explicitly passing `Partial(BaselineProfileMode.Require)` over relying on `CompilationMode.DEFAULT` to avoid ambiguity when validating that an app's Baseline Profile is actually being used — `Require` fails the benchmark if the profile doesn't install, while `DEFAULT`'s `UseIfAvailable` silently proceeds either way.
- `Full()` is useful to detect whether a regression is caused by JIT variance versus the code path itself, since it removes JIT noise almost entirely.
- Distinct from the Gradle `androidx.baselineprofile` plugin (covered in the android-build-gradle skill), which generates the `baseline-prof.txt` consumed here — `CompilationMode` only controls how that profile (or its absence) is applied during a benchmark run, it does not generate profiles.
- `Ignore()` is gated behind `@ExperimentalMacrobenchmarkApi` and requires an explicit opt-in annotation to use, unlike the other three modes.

## Related

- [macrobenchmark-rule.md](./macrobenchmark-rule.md)
- [macrobenchmark-metrics.md](./macrobenchmark-metrics.md)
