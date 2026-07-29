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
| `FrameTimingMetric` | `FrameTimingMetric()` | `frameOverrunMs` (positive = dropped/janky frame, Android 12+ only), `frameDurationCpuMs` (UI thread + RenderThread time), `frameCount` (number of frames sampled); reported as p50/p90/p95/p99. |
| `TraceSectionMetric` | `TraceSectionMetric(sectionName: String, mode: Mode = Mode.Sum, label: String = sectionName, targetPackageOnly: Boolean = true)` | Duration of a named trace section (from `trace { }`, `Trace.beginSection`/`endSection`, or their async variants), combined across matching instances per iteration according to `mode`. Only `Mode.Sum` emits both a duration (`SumMs`) and an occurrence count (`Count`); `Mode.Min` / `Mode.Max` / `Mode.Average` / `Mode.First` each emit a single duration only (`MinMs` / `MaxMs` / `AverageMs` / `FirstMs`), and `Mode.Count` emits only the count — there is no median mode. Experimental. |
| `PowerMetric` | `PowerMetric(type: PowerMetric.Type)`, where `Type` is `Power(categories: Map<PowerCategory, PowerCategoryDisplayLevel> = emptyMap())`, `Energy(categories: ... = emptyMap())`, or `Battery()` | System-wide `power<Category>Uw` / `energy<Category>Uws` for categories `CPU`, `DISPLAY`, `GPU`, `GPS`, `MEMORY`, `MACHINE_LEARNING`, `NETWORK`, `UNCATEGORIZED`. Requires API 29+. Experimental. |

## Notes

- `StartupTimingMetric` results should be read from the **median**, not min/max, since cold-start variance across iterations is high.
- `TraceSectionMetric` combines multiple matching section instances per iteration according to `mode` (default `Sum`); pass `Mode.First` to measure only the first instance, or use distinct section names per code path to isolate them.
- `PowerMetric` measures system-wide power, not per-app — background apps/accounts should be minimized to reduce measurement noise.

## Related

- [macrobenchmark-rule.md](./macrobenchmark-rule.md)
- [compilation-mode.md](./compilation-mode.md)
