# Dependency Configurations

Configurations (`implementation`, `api`, `compileOnly`, etc.) that determine how a dependency is added to the compile classpath, build output, and other modules.

## Signature / Usage

```kotlin
dependencies {
    implementation("com.example.android:app-magic:12.3")
    api("com.example.android:public-lib:1.0")
    compileOnly("com.example.android:provided-lib:1.0")
    runtimeOnly("org.slf4j:slf4j-simple:2.0.9")
    ksp("androidx.room:room-compiler:2.6.1")
    kapt("com.google.dagger:dagger-compiler:2.51")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `implementation` | configuration | — | Adds to compile classpath and packages into build output. Does not leak to other modules at compile time. Recommended for most app/test modules; improves build time. |
| `api` | configuration | — | Adds to compile classpath and build output, and transitively exports the dependency to modules that depend on this module (both compile and runtime). Changing the API recompiles all dependents; can significantly increase build time. |
| `compileOnly` | configuration | — | Adds to compile classpath only, not packaged into build output. For compile-time-only annotations. Cannot be used with AAR dependencies; library must include its own runtime presence check. |
| `runtimeOnly` | configuration | — | Adds to build output only, not to compile classpath. Rarely used on Android; common for supplying a logging implementation at runtime. |
| `ksp` | configuration | — | Supplies a Kotlin Symbol Processing (KSP) annotation/symbol processor, run by the Kotlin compiler. Preferred over `kapt`. |
| `kapt` | configuration | — | Supplies a kapt (Kotlin Annotation Processing Tool) processor that generates Java stubs from Kotlin files before processing. |
| `annotationProcessor` | configuration | — | Supplies a Java annotation processor, run before compilation, separate from the compile classpath. |
| `lintChecks` | configuration | — | Includes a library of custom lint checks to run when building the app. AARs with a bundled `lint.jar` run their checks automatically without this. |
| `lintPublish` | configuration | — | Used in Android library projects: compiles lint checks into the published AAR's `lint.jar` so consumers automatically apply them. |
| `testImplementation` | configuration | — | Adds a dependency only for local (JVM) unit tests. |
| `androidTestImplementation` | configuration | — | Adds a dependency only for instrumented tests (the test APK). |

## Notes

- AGP produces a build error if an annotation processor is found on the plain compile classpath instead of `annotationProcessor`/`kapt`/`ksp`.
- Build-variant-prefixed forms exist for all configurations, e.g. `debugImplementation`, `freeImplementation` — see [variant-specific-dependencies.md](./variant-specific-dependencies.md).
- Version-independent, applies across current AGP/Gradle releases as documented at `developer.android.com/build/dependencies`.

## Related

- [ksp-vs-kapt.md](./ksp-vs-kapt.md)
- [variant-specific-dependencies.md](./variant-specific-dependencies.md)
- [dependency-coordinates.md](./dependency-coordinates.md)
