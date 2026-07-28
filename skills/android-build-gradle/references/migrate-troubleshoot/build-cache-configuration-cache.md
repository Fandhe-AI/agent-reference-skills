# Build Cache and Configuration Cache

`org.gradle.caching` reuses task outputs across builds; `org.gradle.configuration-cache` caches the result of the configuration phase itself for faster subsequent builds.

## Signature / Usage

```properties
# gradle.properties
org.gradle.caching=true
org.gradle.configuration-cache=true
# Use this flag carefully, in case some of the plugins are not fully compatible.
org.gradle.configuration-cache.problems=warn
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `org.gradle.caching` | boolean | `false` | Enables the Gradle build cache (local and/or remote) so task outputs can be reused instead of re-executed. |
| `org.gradle.configuration-cache` | boolean | `false` | Enables configuration caching, skipping the configuration phase on subsequent builds when nothing relevant changed. |
| `org.gradle.configuration-cache.problems` | `fail` \| `warn` | `fail` | Controls whether incompatible-plugin problems fail the build or only warn. |

## Notes

- Build output indicates cache status: first run logs "Calculating task graph as no configuration cache is available for tasks"; subsequent runs log "Reusing configuration cache".
- Configuration cache is the optimization with the most significant impact on subsequent build speed.
- Gradle 8.1 combined with AGP 8.1 introduced file API tracking that could trigger unnecessary cache invalidation on certain file operations; this was fixed in AGP 8.2-8.3.
- Build Analyzer can enable configuration caching directly from its warning panel and flags plugins that block it.
- For the general (non-Android-specific) build cache mechanics, see the Gradle userguide at `docs.gradle.org/current/userguide/build_cache.html`.
- Source: `developer.android.com/build/optimize-your-build`.

## Related

- [Build Speed Optimization](./build-speed-optimization.md)
- [Build Analyzer](./build-analyzer.md)
