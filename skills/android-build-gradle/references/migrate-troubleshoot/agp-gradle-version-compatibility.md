# AGP / Gradle Version Compatibility and Wrapper Update

Each Android Gradle plugin (AGP) version requires a minimum Gradle version. Update the Gradle Wrapper with the `gradle wrapper --gradle-version` command.

## Signature / Usage

```bash
# Preferred: update via the Gradle Wrapper (run twice to fully upgrade)
gradle wrapper --gradle-version 9.6.0
gradle wrapper --gradle-version 9.6.0
```

```properties
# Manual fallback: gradle/wrapper/gradle-wrapper.properties
distributionUrl = https\://services.gradle.org/distributions/gradle-9.6.0-bin.zip
```

## Options / Props

| Plugin version | Minimum required Gradle version | Description |
|------|------|-------------|
| 9.4 | 9.6.0 | Requires JDK 17, SDK Build Tools 36.0.0, max API level 37. |
| 9.3 | 9.5.0 | — |
| 9.2 | 9.4.1 | — |
| 9.1 | 9.3.1 | — |
| 9.0 | 9.1.0 | — |
| 8.13 | 8.13 | — |
| 8.12 | 8.13 | — |
| 8.11 | 8.13 | — |

## Notes

- Running `gradle wrapper --gradle-version <version>` must be executed twice to upgrade both Gradle itself and the wrapper scripts.
- If the wrapper command fails (e.g. right after bumping AGP to an incompatible version), edit `gradle/wrapper/gradle-wrapper.properties` directly.
- The Gradle version can also be set via Android Studio's **File > Project Structure > Project** menu.
- Best practice: use the latest possible combination of Gradle and AGP for best performance.
- AGP 9.5 is in preview (alpha) at the time of writing; its release notes list the same minimums (Gradle 9.6.0, SDK Build Tools 36.0.0, JDK 17, max API level 37).
- Minimum Android Studio / AGP versions by Android API level (about-agp): API 37.0 needs Android Studio Panda 3 (2025.3.3 Patch 1) / AGP 9.1.1; 36.1 needs Narwhal 3 Feature Drop (2025.1.3) / AGP 8.13.0; 36 needs Meerkat (2024.3.1 Patch 1) / AGP 8.9.1; 35 needs Koala Feature Drop (2024.2.1) / AGP 8.6.0; 34 needs Hedgehog (2023.1.1) / AGP 8.1.1; 33 needs Flamingo (2022.2.1) / AGP 7.2.
- Table values are current as of AGP 9.4; check `developer.android.com/build/releases/gradle-plugin` for the latest release's table before relying on older entries.
- Source: `developer.android.com/build/releases/about-agp`, `developer.android.com/build/releases/gradle-plugin`.

## Related

- [AGP Upgrade Assistant](./agp-upgrade-assistant.md)
- [JDK Configuration](./jdk-configuration.md)
