# Profile Your Build (gradle-profiler)

Profile how long Gradle spends in each build phase and task, using the standalone `gradle-profiler` tool or the Gradle `--profile` option.

## Signature / Usage

```bash
# Benchmark a fully up-to-date build; HTML report is written under profile-out/
gradle-profiler --benchmark --project-dir <root-project> :app:assembleDebug

# Run scenarios from a file
gradle-profiler --benchmark --project-dir <root-project> --scenario-file scenarios.txt
```

```
# <root-project>/scenarios.txt
clean_build_2gb_4workers {
    tasks = [":app:assembleDebug"]
    gradle-args = ["--max-workers=4"]
    jvm-args = ["-Xmx2048m"]
    cleanup-tasks = ["clean"]
}
non_abi_change {
    tasks = [":app:assembleDebug"]
    apply-non-abi-change-to = ["app/src/main/java/com/example/your_app/your_code_file.java",
                              "app/src/main/java/com/example/your_app/your_code_file.kt"]
}
layout_change {
    tasks = [":app:assembleDebug"]
    apply-android-layout-change-to = "app/src/main/res/your_layout_file.xml"
}
string_resource_change {
    tasks = [":app:assembleDebug"]
    apply-android-resource-value-change-to = "app/src/main/res/values/strings.xml"
}
```

Gradle `--profile` option:

```bash
gradlew clean
gradlew --profile --offline --rerun-tasks assembleFlavorDebug
# report: project-root/build/reports/profile/profile-timestamp.html
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tasks` | list | Tasks to run, e.g. `[":app:assembleDebug"]` |
| `gradle-args` | list | Extra Gradle args, e.g. `["--max-workers=4"]` |
| `jvm-args` | list | JVM args, e.g. `["-Xmx2048m"]`, `["-XX:+UseParallelGC"]` |
| `cleanup-tasks` | list | Tasks run before each build, e.g. `["clean"]` (clean build scenario) |
| `apply-non-abi-change-to` | file list | Change a method body in the listed sources |
| `apply-abi-change-to` | file list | Add a new method to the listed sources |
| `apply-android-layout-change-to` | file | Change a layout resource |
| `apply-android-resource-value-change-to` | file | Change a string resource value |
| `versions` | list | Gradle version(s), e.g. `["6.7"]` |
| `system-properties` | block | System properties passed to the build (e.g. `agpVersion`, `kotlinVersion`) |

`--profile` flags:

| Flag | Description |
|------|-------------|
| `--profile` | Enables profiling |
| `--offline` | Prevents dependency fetching from skewing results; build once first so dependencies are cached |
| `--rerun-tasks` | Forces all tasks to rerun, ignoring task optimizations |

## Notes

- In Android Studio 4.0+, the Build Analyzer is the recommended way to investigate build performance; `gradle-profiler` and `--profile` are the options outside Studio.
- Benchmarking mode (`--benchmark`) collects clean and incremental build times; profiling mode collects granular data including CPU snapshots. Scenarios run multiple times to reduce variance.
- Setup configurations worth benchmarking: plugin versions, Gradle versions, JVM settings (heap size, garbage collection), `org.gradle.workers.max`, per-plugin options.
- To compare AGP/Kotlin versions, make them injectable from the scenario via system properties in the root `build.gradle` (the source example uses `providers.systemProperty("agpVersion")` and `kotlinVersion`), then set them under `system-properties` in each scenario (the source writes `System-properties` (capitalized), but gradle-profiler scenario keys are case-sensitive and the correct key is `system-properties`). The source example uses old versions (AGP 4.1.0 / Kotlin 1.4.0) and `forUseAtConfigurationTime()`; the scenario snippets in the source are not syntactically clean (the `apply-non-abi-change-to` example above is corrected: the source omits a closing quote after `.java`), so verify against the gradle-profiler docs before use.
- The source writes the Gradle version key as `version = ["6.7"]`, but the correct gradle-profiler scenario key is `versions` (as in the table above).
- Run `clean` between profiled builds; otherwise Gradle skips up-to-date tasks and later builds look faster.
- Optional step: rerun without `--rerun-tasks` to spot tasks that run when they should be `UP-TO-DATE` (e.g. `:app:processDevUniversalDebugManifest` not up-to-date suggests a dynamically updated manifest; `:app:checkDevDebugManifest` legitimately runs each build).
- Large `mergeDevDebugResources` time may suggest converting images to WebP or disabling PNG crunching; long configuration time suggests moving custom build logic out of the configuration phase.
- Effects of settings vary by project and machine (e.g. code shrinking helps large projects but may hurt small ones; larger `org.gradle.jvmargs` heap can hurt low-memory machines). Re-profile after each change.
- Gradle profiler can take a long time on large codebases, especially for clean builds.
- Source: https://developer.android.com/build/profile-your-build (local copy fetched 2026-10).

## Related

- [Build Analyzer](./build-analyzer.md)
- [Build Speed Optimization](./build-speed-optimization.md)
- [Custom Build Logic](./custom-build-logic.md)
- [Build Cache / Configuration Cache](./build-cache-configuration-cache.md)
