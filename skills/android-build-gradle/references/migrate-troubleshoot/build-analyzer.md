# Build Analyzer

Android Studio tool (**Build window > Build Analyzer** tab) that inspects the most recent build and surfaces the tasks/plugins/warnings most responsible for total build duration.

## Signature / Usage

```text
1. Build > Make Project (or Build Bundle(s)/APK(s))
2. View > Tool Windows > Build
3. Open the Build Analyzer tab
```

## Notes

- Overview page lists: plugins with tasks impacting build duration, tasks impacting build duration, all detected warnings, and download impact.
- For AGP 8.0+, the tasks breakdown groups tasks by category by default.
- Downloads view surfaces time spent downloading dependencies per repository, useful for catching dynamic-version-triggered unexpected downloads.
- On Windows, Build Analyzer can warn that antivirus software is slowing the build and recommend directory exclusions.
- Warning types include: **Always Run Tasks** (outputs not declared, or `upToDateWhen` forced false), **Task Setup Issues** (two tasks declaring the same output directory), **Non-Incremental Annotation Processor**, **Configuration Cache** (not enabled — can be enabled directly from this warning), and **Check Jetifier** (`android.enableJetifier=true` still set, safe to remove and improve performance).
- The official page does not document `--scan` or `--profile` CLI flags; Build Analyzer generates its report automatically on every build without extra flags.
- Source: `developer.android.com/studio/build/build-analyzer`.

## Related

- [Build Speed Optimization](./build-speed-optimization.md)
- [Build Cache and Configuration Cache](./build-cache-configuration-cache.md)
