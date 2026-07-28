# AGP / Gradle Version Compatibility and Wrapper Update

Each Android Gradle plugin (AGP) version requires a minimum Gradle version. Update the Gradle Wrapper with the `gradle wrapper --gradle-version` command.

## Signature / Usage

```bash
# Preferred: update via the Gradle Wrapper (run twice to fully upgrade)
gradle wrapper --gradle-version 9.5.0
gradle wrapper --gradle-version 9.5.0
```

```properties
# Manual fallback: gradle/wrapper/gradle-wrapper.properties
distributionUrl = https\://services.gradle.org/distributions/gradle-9.5.0-bin.zip
```

## Options / Props

| Plugin version | Minimum required Gradle version | Description |
|------|------|-------------|
| 9.3 | 9.5.0 | Requires JDK 17, SDK Build Tools 36.0.0, max API level 37. |
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
- Table values are current as of AGP 9.3; check `developer.android.com/build/releases/gradle-plugin` for the latest release's table before relying on older entries.
- Source: `developer.android.com/build/releases/about-agp`, `developer.android.com/build/releases/gradle-plugin`.

## Related

- [AGP Upgrade Assistant](./agp-upgrade-assistant.md)
- [JDK Configuration](./jdk-configuration.md)
