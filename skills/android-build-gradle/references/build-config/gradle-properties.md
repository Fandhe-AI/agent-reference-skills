# gradle.properties

Project-wide file (not part of the Kotlin/Groovy DSL) that configures the Gradle daemon's execution environment: JVM heap/GC settings, caching, and Android-specific build flags.

## Signature / Usage

```properties
org.gradle.jvmargs=-Xmx6g -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8 -XX:+UseParallelGC -XX:MaxMetaspaceSize=1g
org.gradle.configuration-cache=true
org.gradle.configuration-cache.problems=warn
android.enableJetifier=false
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `org.gradle.jvmargs` | JVM args string | — | JVM heap size and garbage collector flags used by the Gradle daemon. Due to a known Gradle issue, `-XX:MaxMetaspaceSize` and `-XX:+HeapDumpOnOutOfMemoryError` should be set explicitly whenever this property is overridden. |
| `org.gradle.configuration-cache` | `Boolean` | `false` | Enables the configuration cache, reusing the calculated task graph across builds. |
| `org.gradle.configuration-cache.problems` | `String` | — | Controls whether configuration-cache incompatibilities fail (`fail`) or only warn (`warn`) the build. |
| `android.enableJetifier` | `Boolean` | `false` (planned for removal in AGP 10) | Disables (when `false`) automatic rewriting of legacy support-library references to AndroidX, improving build performance when unneeded. |
| `android.useAndroidX` | `Boolean` | `true` (AGP 9.0.0+; `false` on earlier AGP) | Makes the Android plugin use AndroidX libraries instead of the legacy Support Library. Planned to no longer be settable to `false` in AGP 10. |
| `android.newDsl.optOut` | module path list (e.g. `:example-lib1`) | — | AGP 9.4: temporarily opts specific modules out of the new Variant API, which is mandatory for all projects from AGP 10. |
| `android.enforceDynamicFeatureVariantMatching` | `Boolean` | warning mode | AGP 9.4: `true` promotes the strict 1:1 flavor-dimension parity check between app and dynamic feature modules from build warnings to an execution error; enforced by default from AGP 10.0. |
| `android.settings.executionProfile` | `String` | — | Overrides the default R8 execution profile declared via the settings plugin (`android { execution { profiles { ... } } }`). |

## Notes

- `gradle.properties` also commonly holds temporary Android-specific feature flags that are added and later removed across AGP releases.

## Related

- [local.properties](./local-properties.md)
