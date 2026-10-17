---
source: https://docs.flutter.dev/tools/devtools/cpu-profiler
---

# Use the CPU profiler view

Record and profile a session from your Dart or Flutter application. The Dart VM collects CPU samples (snapshots of the CPU call stack) and sends them to DevTools for visualization. Works with Dart CLI and mobile apps only; use Chrome DevTools to analyze performance of a web app.

## Signature / Usage

Click **Record**, then **Stop**; data is shown in the Call tree, Bottom up, Method table, and Flame chart views. **Load all CPU samples** pulls all samples the VM has stored. By default the sample buffer is a ring buffer; to discard samples collected after it becomes full, pass `--profile-startup`:

```console
$ flutter run --profile-startup
```

(also valid with `dart run`). For Flutter applications use a profile build.

## Views

| View | Description |
| --- | --- |
| Bottom up | Each top-level method is the top method in the call stack of one or more samples (a leaf of the call tree); expand to show its callers. Useful for identifying expensive methods (high self time). |
| Call tree | Top-down; each top-level method is a root of one or more samples; expand to show callees. Useful for identifying expensive paths (high total time). |
| Method table | CPU statistics per method with total and self time; selecting a method shows a call graph of callers and callees with percentages. |
| Flame chart | Graphical representation of the Call tree; width represents time on the call stack. |

Columns: **Total time** is time spent executing a method's own code plus methods it called; **Self time** is time executing only its own code.

## CPU sampling rate

Default: 1 sample / 250 μs, shown as "Cpu sampling rate: medium". The **low**, **medium**, and **high** rates are 1,000 Hz, 4,000 Hz, and 20,000 Hz.

| Rate | Trade-off |
| --- | --- |
| Higher | More fine-grained profile with more samples; may affect app performance and overflows the VM's sample buffer sooner, so samples from the beginning might be lost. |
| Lower | Coarser profile with fewer samples; affects the app less and the buffer fills more slowly. |

## Filtering and guidelines

Filter by library, method name, or `UserTag`. The **Display guidelines** option adds vertical guidelines between parent and child in deep trees.

## Notes

- CPU profiles are not indicative of release performance unless a Flutter app is run in profile mode.
- Flutter DevTools CPU profiler (Dart VM samples) is distinct from browser profilers and React DevTools (react skill).

## Related

- [Use the Performance view](./devtools-performance.md)
- [Flutter and Dart DevTools](./devtools.md)
