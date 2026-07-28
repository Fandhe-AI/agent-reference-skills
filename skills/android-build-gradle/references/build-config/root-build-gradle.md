# Root build.gradle.kts

The build file at the project root. Its role is limited to declaring the common plugin classpath (with `apply false`) shared across subprojects; it should not contain build logic or task definitions.

## Signature / Usage

```kotlin
plugins {
    id("com.android.application") version "9.3.0" apply false
    id("com.android.library") version "9.3.0" apply false
    id("org.jetbrains.kotlin.android") version "2.3.21" apply false
}
```

## Notes

- Should **only contain plugin declarations**. Other logic belongs in `settings.gradle.kts` or module-level `build.gradle.kts` files.
- `apply false` registers the plugin version for subprojects without applying it to the root project itself.
- Recommended (declarative) approach: build files are data declarations; build logic (Kotlin function definitions, conditionals) belongs inside plugins, not directly in the build file.

## Related

- [settings.gradle.kts](./settings-gradle.md)
- [Module build.gradle.kts](./module-build-gradle.md)
- [plugins {} block and AGP plugin IDs](./plugins-block.md)
