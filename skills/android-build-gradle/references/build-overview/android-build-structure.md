# Android Build Structure

Typical files and directories in an Android Gradle project and what content belongs in each.

## Signature / Usage

```text
.gradle/
.idea/
build.gradle(.kts)
gradle.properties
gradlew, gradlew.bat
local.properties
settings.gradle(.kts)
gradle/
  libs.versions.toml
  wrapper/
    gradle-wrapper.jar
    gradle-wrapper.properties
app/
  build.gradle(.kts)
  src/
    main/
      java/ (or kotlin/)
      res/
      AndroidManifest.xml
    androidTest/
    test/
  proguard-rules.pro
```

## Options / Props

| Folder/File | Use |
|-------------|-----|
| `.gradle/` | Gradle project cache directory. Managed by Gradle; contains the downloaded Gradle distribution, project cache, and configuration files. Don't change files here. |
| `.idea/` | Android Studio project metadata. Don't change files here. |
| `build.gradle(.kts)` | Root build file. Should only contain plugin declarations to set up a common plugin classpath across subprojects. Other code belongs in settings or nested project-level build files. |
| `gradle.properties` | Gradle execution configuration: heap size, caching, parallel execution. Some temporary Android properties are defined here to reduce AGP DSL changes as they are added and later removed. |
| `gradlew` (Linux, Mac) / `gradlew.bat` (Windows) | Gradle wrapper; bootstraps the build by downloading a Gradle distribution and forwarding commands to it, so Gradle need not be preinstalled. |
| `local.properties` | Local machine configuration, such as the Android SDK location. Exclude from source control. |
| `settings.gradle(.kts)` | Gradle build initialization: project name, list of subprojects to include, repository specifications for plugins and dependencies, external Version Catalog imports. |
| `gradle/libs.versions.toml` | Version Catalog. Defines variables for dependencies and plugins so versions are consistent across subprojects. |
| `gradle/wrapper/gradle-wrapper.jar` | Gradle bootstrapping executable. Downloads the specified Gradle distribution if missing and runs it with the given arguments. |
| `gradle/wrapper/gradle-wrapper.properties` | Wrapper configuration: where to download the Gradle distribution and which version. |
| `app/` | Subproject directory (a "module" in Android Studio). `app` is the conventional, not required, name for a top-level application subproject. Any directory can be a subproject if it has at least a `build.gradle(.kts)` and is included via `settings.gradle(.kts)`. |
| `app/build.gradle(.kts)` | Subproject-level build file. Contains plugins used to build the subproject, configuration blocks required by plugins, and dependencies (libraries and platforms). Do not include build logic (Kotlin function definitions, conditions) or task declarations. |
| `app/src/` | Subproject source files grouped into source sets. `main` holds files common to all variants; other source sets hold files unique to a variant. |
| `app/src/main/` | Main source set: code and resources common across all build variants; more specific source sets add to or override it. |
| `app/src/main/java/`, `kotlin/` | Kotlin and Java source. `java` can contain mixed Kotlin and Java; if the subproject is Kotlin only, it can be renamed `kotlin`. |
| `app/src/main/res/` | Android resource files (XML, images, launcher icons, layouts, menus). Compose applications use String resources defined here. |
| `app/src/main/AndroidManifest.xml` | Application metadata read by the Android package manager: components, necessary permissions, device compatibility, platform restrictions. |
| `app/src/androidTest/` | Device test source set: tests run on a device or emulator with a real Android environment; slower than host tests. All `main` source is available. |
| `app/src/test/` | Host test source set: tests run locally in a JVM; much faster, but system calls (including lifecycles) must be mocked, faked, or stubbed. All `main` source is available. |
| `app/proguard-rules.pro` | R8 configuration rules controlling shrinking, optimization, and obfuscation. |

## Notes

- When a file name looks like `build.gradle(.kts)`, the Kotlin version ends in `.kts`; the Groovy version omits it.
- Use a declarative approach: build logic and task definitions should appear only in plugins, so build files are data declarations. Future versions may include an alternative specification such as Declarative Gradle, which will prevent build logic in the files.
- Best practices evolve; these descriptions may not match a project you inherited or downloaded.
- Android is a Kotlin-first platform: Java is supported, but new APIs target Kotlin. Kotlin is recommended for all new code and major updates.

## Related

- [Gradle Build Overview](./gradle-build-overview.md)
- [settings.gradle.kts](../build-config/settings-gradle.md)
- [Root build.gradle.kts](../build-config/root-build-gradle.md)
- [Module build.gradle.kts](../build-config/module-build-gradle.md)
- [gradle.properties](../build-config/gradle-properties.md)
- [local.properties](../build-config/local-properties.md)
- [source sets](../build-config/source-sets.md)
