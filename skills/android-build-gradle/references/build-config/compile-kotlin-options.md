# compileOptions, kotlinOptions, and kotlin { jvmToolchain() }

Controls which Java/Kotlin language version is used for compilation and which JDK toolchain runs the build.

## Signature / Usage

```kotlin
android {
    compileSdk = 36

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    // Kotlin 2.1 and lower only; Kotlin 2.2+ derives this from targetCompatibility
    kotlinOptions {
        jvmTarget = "17"
    }
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `compileOptions.sourceCompatibility` | `JavaVersion` | Java toolchain version | Java language features available at compile time. Does not affect Kotlin source. |
| `compileOptions.targetCompatibility` | `JavaVersion` | same as `sourceCompatibility` | Java bytecode class-file version emitted; must be ≥ `sourceCompatibility`. |
| `kotlinOptions.jvmTarget` | `String` | — | Kotlin compiler's JVM bytecode target (Kotlin ≤2.1 only). |
| `java.toolchain.languageVersion` | `JavaLanguageVersion` | — | JDK version Gradle locates (or downloads) to run the build; also provides the default for `sourceCompatibility`/`targetCompatibility`. |
| `compileSdk` | `Int` | — | Android SDK version used for compilation (declared directly in `android { }`, not inside `compileOptions`). |

## Notes

- Recommended: always declare `java { toolchain { } }` for consistent builds across machines; it auto-locates or downloads a matching JDK.
- Kotlin 2.2+ derives the JVM target automatically from `targetCompatibility`, making a separate `kotlinOptions.jvmTarget` unnecessary.
- AGP 8.x requires JDK 17+ to run the build itself (distinct from `compileSdk`/`sourceCompatibility`, which target the app's own code).

## Related

- [android {} block](./android-block.md)
