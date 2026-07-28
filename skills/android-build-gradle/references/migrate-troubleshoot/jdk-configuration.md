# JDK Configuration

The JDK used to run Gradle/AGP must meet the plugin's minimum version, and is configured separately from the Java/Kotlin source and target compatibility used to compile app code.

## Signature / Usage

```kotlin
// build.gradle.kts — Java toolchain (recommended for consistent builds across machines)
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

android {
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    // Kotlin < 2.2 only
    kotlinOptions {
        jvmTarget = "17"
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `org.gradle.java.home` | path (gradle.properties) | — | Explicit JDK path used to run the Gradle daemon. |
| `java.toolchain.languageVersion` | `JavaLanguageVersion` | — | Java toolchain version used to compile, independent of the JDK running Gradle. |
| `compileOptions.sourceCompatibility` | `JavaVersion` | — | Which Java language features are available during compilation. |
| `compileOptions.targetCompatibility` | `JavaVersion` | — | Java bytecode class-format version generated. |
| `kotlinOptions.jvmTarget` | string | — | JVM bytecode target for Kotlin compilation (Kotlin < 2.2; superseded by the Java toolchain in newer Kotlin). |

## Notes

- AGP 8.x requires JDK 17 to run; using a lower version fails with `Android Gradle plugin requires Java 17 to run. You are currently using Java 11.`
- Configure the Gradle JDK in Android Studio via **Settings > Build, Execution, Deployment > Build Tools > Gradle**; `GRADLE_LOCAL_JAVA_HOME` is the default for new projects and avoids requiring the project to already be open.
- Match JDK versions between local machines and CI/CD to avoid inconsistent builds.
- `compileSdk` determines available Java APIs independently of the JDK running the build (e.g. API 34 exposes Java 17 core libraries, API 33 exposes Java 11).
- Source: `developer.android.com/build/jdks`.

## Related

- [AGP / Gradle Version Compatibility](./agp-gradle-version-compatibility.md)
