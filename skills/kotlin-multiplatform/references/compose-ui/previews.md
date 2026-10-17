---
source: https://kotlinlang.org/docs/multiplatform/compose-previews.html
---

# Compose UI previews

Preview composables render your UI in the IDE (IntelliJ IDEA and Android Studio) without running an emulator. Compose Hot Reload additionally shows code changes in a live app on the desktop JVM target.

## Signature / Usage

Add the annotation dependency to `commonMain`, and the tooling dependency in the root `dependencies {}` block:

```kotlin
kotlin {
    sourceSets {
        commonMain.dependencies {
            // The new annotation, available in CMP 1.10.0 and later
            implementation("org.jetbrains.compose.ui:ui-tooling-preview:1.10.0")
            // To import the new annotation:
            // import androidx.compose.ui.tooling.preview.Preview

            // The old annotation, deprecated in CMP 1.10.0
            implementation("org.jetbrains.compose.components:components-ui-tooling-preview:1.10.0")
            // To import the old annotation:
            // import org.jetbrains.compose.ui.tooling.preview.Preview
        }
    }
}
```

With `com.android.application` or `com.android.library`:

```kotlin
dependencies {
    debugImplementation("org.jetbrains.compose.ui:ui-tooling:1.10.0")
}
```

With `com.android.kotlin.multiplatform.library`:

```kotlin
dependencies {
    androidRuntimeClasspath("org.jetbrains.compose.ui:ui-tooling:1.10.0")
}
```

## Options / Props

`@Preview` parameters supported in Compose Multiplatform:

| Name | Type | Description |
| --- | --- | --- |
| name | — | The display name of the preview |
| group | — | The group name, enabling logical organization and selective display of related previews |
| widthDp | — | The maximum width, in dp |
| heightDp | — | The maximum height, in dp |
| locale | — | The current locale of the application |
| showBackground | — | Whether to apply the default background color to the preview |
| backgroundColor | — | A 32-bit ARGB color integer defining the background color |

Available annotations:

| Annotation | Runtime dependency | Status |
| --- | --- | --- |
| `androidx.compose.ui.tooling.preview.Preview` | `org.jetbrains.compose.ui:ui-tooling-preview` | Original Android Jetpack annotation, made multiplatform in CMP 1.10; supports all Android parameters in common code; recommended |
| `org.jetbrains.compose.ui.tooling.preview.Preview` | `org.jetbrains.compose.components:components-ui-tooling-preview` | First multiplatform implementation with limited parameters; deprecated in CMP 1.10 |

## Notes

- Previews in common code require an Android target, since previews rely on Android libraries.
- The dependency versions in the source snippets are written as `1.10.0` (verbatim); the current Compose Multiplatform version in the docs is 1.12.2.
- Supported configurations: CMP 1.9 with the old annotation and `androidTarget {}`; CMP 1.10 with the old annotation and `androidTarget {}`; CMP 1.10 with the new annotation and `androidTarget {}`; CMP 1.10 with the new annotation and `androidLibrary {}` with AGP 9.0.
- AGP 8.x: use `com.android.application` or `com.android.library` with the `androidTarget {}` block. AGP 9.0: the new KMP Android library plugin (`com.android.kotlin.multiplatform.library`) introduces the `androidLibrary {}` block; using it with AGP 8.x has known issues and is not recommended.
- The source says AGP 9.0 support in IntelliJ IDEA was expected in Q1 2026 (as of the pinned docs commit; not re-verified).
- Migration (CMP 1.10): the original `@Preview` implementation of Compose Multiplatform was deprecated because the AndroidX annotation became fully multiplatform.
- Distance line: Android Studio preview features themselves are documented by android-compose-ui; this page covers the multiplatform setup (annotation artifacts, AGP 9 configuration).

## Related

- [Compose Hot Reload](../tooling/compose-hot-reload.md)
- [Updating multiplatform projects with Android apps to use AGP 9](../compatibility/agp-9-migration.md)
