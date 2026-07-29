# Macrobenchmark Metrics

`Metric` implementations passed to `MacrobenchmarkRule.measureRepeated(metrics = ...)` determine what a macrobenchmark captures from each iteration's system trace: startup timing, frame jank, custom trace sections, or device power draw.

## Signature / Usage

```kotlin
benchmarkRule.measureRepeated(
    packageName = "com.example.app",
    metrics = listOf(
        StartupTimingMetric(),
        FrameTimingMetric(),
        TraceSectionMetric("RV CreateView"),
    ),
    iterations = 5,
) {
    startActivityAndWait()
}
```

## Options / Props

| Metric | Constructor | Captures |
|--------|-------------|----------|
| `StartupTimingMetric` | `StartupTimingMetric()` | `timeToInitialDisplayMs` (launch intent → first frame), `timeToFullDisplayMs` (launch intent → `reportFullyDrawn()`, API 30+). |
| `FrameTimingMetric` | `FrameTimingMetric()` | `frameOverrunMs` (positive = dropped/janky frame, Android 12+ only), `frameDurationCpuMs` (UI thread + RenderThread time); reported as p50/p90/p95/p99. |
| `TraceSectionMetric` | `TraceSectionMetric(sectionName: String, targetPackageOnly: Boolean = true)` | Occurrence count and min/median/max duration of a named trace section (from `trace { }`, `Trace.beginSection`/`endSection`, or their async variants). Experimental. |
| `PowerMetric` | `PowerMetric(powerCategories: Set<PowerCategory>)` | System-wide `power<Category>Uw` / `energy<Category>Uws` for categories `CPU`, `DISPLAY`, `GPU`, `GPS`, `MEMORY`, `MACHINE_LEARNING`, `NETWORK`, `UNCATEGORIZED`. Experimental, Pixel 6+ only. |

## Notes

- `StartupTimingMetric` results should be read from the **median**, not min/max, since cold-start variance across iterations is high.
- `TraceSectionMetric` always measures the first matching section instance per iteration; use distinct section names per code path to isolate them.
- `PowerMetric` measures system-wide power, not per-app — background apps/accounts should be minimized to reduce measurement noise.

## Related

- [macrobenchmark-rule.md](./macrobenchmark-rule.md)
- [compilation-mode.md](./compilation-mode.md)
