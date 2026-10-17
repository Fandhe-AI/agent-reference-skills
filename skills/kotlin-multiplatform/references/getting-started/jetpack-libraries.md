---
source: https://kotlinlang.org/docs/multiplatform/compose-multiplatform-jetpack-libraries.html
---

# How multiplatform Jetpack libraries are packaged

Many Jetpack libraries (like `androidx.annotation`) are published fully multiplatform by the Android team. Others, such as Compose itself, Navigation, Lifecycle, and ViewModel, need additional support to work in common code: the Compose Multiplatform team builds artifacts for non-Android platforms and publishes them together with the original Android artifacts under a single group ID. The Android distribution uses the Android artifact; other targets use artifacts built for their platforms. The Compose Multiplatform Gradle plugin maps platform-specific artifacts to distributions.

## Example: Navigation artifacts for iOS

```text
org.jetbrains.androidx.navigation.navigation-compose-uikitarm64
org.jetbrains.androidx.navigation.navigation-compose-uikitsimarm64
org.jetbrains.androidx.navigation.navigation-common-iosarm64
org.jetbrains.androidx.navigation.navigation-runtime-iossimulatorarm64
```

These, plus artifacts for other platforms and a reference to the original Android library (`androidx.navigation.navigation-compose`), are published as a group and accessed through the unifying `org.jetbrains.androidx.navigation.navigation-compose` dependency.

## Compose packages for multiplatform projects

| androidx library | Multiplatform artifact |
|------------------|------------------------|
| `androidx.compose.runtime` | Fully multiplatform; `org.jetbrains.compose.runtime` now serves as an alias |
| `androidx.compose.ui` | `org.jetbrains.compose.ui` |
| `androidx.compose.foundation` | `org.jetbrains.compose.foundation` |
| `androidx.compose.material3` | `org.jetbrains.compose.material3` |
| `androidx.compose.material` | `org.jetbrains.compose.material` |
| Material 3 adaptive | `org.jetbrains.compose.material3.adaptive:adaptive*` (standalone artifacts) |

## Additional libraries bundled with Compose Multiplatform

| Artifact / component | Purpose |
|----------------------|---------|
| Compose Multiplatform Gradle plugin | Gradle DSL for Compose Multiplatform projects; desktop / web distribution packages; makes resources available per target |
| `org.jetbrains.compose.components.resources` | Cross-platform resources |
| `org.jetbrains.compose.components.uiToolingPreview` | Compose UI previews for common code in IntelliJ IDEA and Android Studio |
| `org.jetbrains.compose.components.animatedimage` | Displaying animated images |
| `org.jetbrains.compose.components.splitpane` | Analog of Swing's JSplitPane |

## Notes

- Unlike the others, the Material 3 library is not coupled with Compose Multiplatform versions, so instead of the `material3` alias you can provide a direct dependency (for example an EAP version). The docs currently pin `org.jetbrains.compose.material3` at 1.12.0-alpha03 and `org.jetbrains.androidx.navigation` at 2.10.0-rc01; both are pre-release versions, not stable.
- The `runtime` change is described in the source as covered by the What's new in Compose Multiplatform 1.9.0 page (multiplatform targets in `androidx.compose.runtime`).
- Distance line: androidx Jetpack library APIs themselves (Navigation, Lifecycle, ViewModel) belong to android-navigation / android-architecture; this page only describes how JetBrains packages them.

## Related

- [Relationship between Compose Multiplatform and Jetpack Compose](./compose-and-jetpack-compose.md)
- [Compatibility and versions](../compatibility/compose-compatibility-and-versioning.md)
