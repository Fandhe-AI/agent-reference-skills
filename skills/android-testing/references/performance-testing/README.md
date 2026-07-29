# performance-testing

| Name | Description | Path |
|------|-------------|------|
| CompilationMode | Controls how much of the target app is pre-compiled from DEX bytecode to machine code (ART AOT) before each measured run. | [compilation-mode.md](./compilation-mode.md) |
| Macrobenchmark Metrics | `Metric` implementations determine what a macrobenchmark captures from each iteration's system trace. | [macrobenchmark-metrics.md](./macrobenchmark-metrics.md) |
| MacrobenchmarkRule | JUnit `@Rule` for measuring large-scale, end-to-end use cases (startup, scrolling, animations). | [macrobenchmark-rule.md](./macrobenchmark-rule.md) |
| BenchmarkRule (Microbenchmark) | JUnit `@Rule` for benchmarking small, hot code paths in-process inside an instrumented test. | [microbenchmark-rule.md](./microbenchmark-rule.md) |
