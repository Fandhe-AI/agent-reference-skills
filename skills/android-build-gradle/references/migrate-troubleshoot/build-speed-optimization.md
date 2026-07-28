# Build Speed Optimization

Techniques to speed up Gradle builds: Gradle daemon warm-up, parallel execution, and JVM heap tuning via `org.gradle.jvmargs`.

## Signature / Usage

```properties
# gradle.properties
org.gradle.jvmargs=-Xmx6g -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8 -XX:+UseParallelGC -XX:MaxMetaspaceSize=1g
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `org.gradle.jvmargs` | string (JVM args) | — | JVM arguments passed to the Gradle daemon, most commonly used to raise heap size (`-Xmx`). |
| `-XX:MaxMetaspaceSize` | JVM flag | — | Must be set explicitly (e.g. `256m` or `1g`) due to Gradle issue #19750; otherwise metaspace can grow unbounded. |
| `-XX:+UseParallelGC` | JVM flag | — | Optional parallel garbage collector; test before adopting. |

## Notes

- After the first clean build, the Gradle daemon has a warm-up period during which subsequent builds get progressively faster, similar to other JVM processes.
- Parallel project execution is more effective when the project is split into library modules; move custom build logic into Gradle tasks so it becomes eligible to run in parallel.
- If GC time exceeds 15% of total build time, increase heap size and test incrementally (4-8 GB range is a reasonable starting point).
- Use non-transitive R classes and non-constant R class fields (default since AGP 8.0.0) and keep dependency versions static (not dynamic) to reduce resolution overhead.
- Source: `developer.android.com/build/optimize-your-build`.

## Related

- [Build Cache and Configuration Cache](./build-cache-configuration-cache.md)
- [Build Analyzer](./build-analyzer.md)
