---
source: https://kotlinlang.org/docs/multiplatform/compose-multiplatform-and-jetpack-compose.html
---

# Relationship between Compose Multiplatform and Jetpack Compose

Compose Multiplatform is a cross-platform UI toolkit developed by JetBrains. It extends Google's Jetpack Compose toolkit for Android to additional target platforms, making compose APIs available from common Kotlin code that can run on Android, iOS, desktop, and web.

|  | Compose Multiplatform | Jetpack Compose |
|--|-----------------------|-----------------|
| Platforms | Android, iOS, desktop, web | Android |
| Supported by | JetBrains | Google |

## Dependency mapping

```text
compose.material3
  Android target : androidx.compose.material3:material3
  other targets  : org.jetbrains.compose.material3:material3
```

This is chosen automatically from Gradle Module Metadata in the multiplatform artifacts (the mapping above restates the source's `compose.material3` example).

## Availability of components and APIs

| Component / API | Compose Multiplatform | Jetpack Compose |
|-----------------|-----------------------|-----------------|
| Compose Animation | Yes | Yes |
| Compose Compiler | Yes | Yes |
| Compose Foundation | Yes | Yes |
| Compose Material | Yes | Yes |
| Compose Material 3 | Yes | Yes |
| Compose Runtime | Yes, except `androidx.compose.runtime.rxjava2` and `androidx.compose.runtime.rxjava3` | Yes |
| Compose UI | Yes | Yes |
| Jetpack Lifecycle | Yes | Yes |
| Jetpack ViewModel | Yes | Yes |
| Jetpack Navigation Compose | Yes | Yes |
| Resources | Compose Multiplatform resources library using the `Res` class | Android resource system using the `R` class |
| Maps Compose | No | Yes |
| Third-party UI / navigation / architecture libraries | Compose Multiplatform libraries | Jetpack Compose and Compose Multiplatform libraries |

## Notes

- Compose Multiplatform shares the Compose compiler and runtime with Jetpack Compose and uses the same APIs: `@Composable` functions, `remember`, layout components, modifiers, animation support.
- APIs closely tied to Android are not available from common code; see android-only-components in compose-ui. Window handling for desktop and UIKit compatibility for iOS exist only on their respective platforms.
- When built for Android, the app uses Jetpack Compose artifacts published by Google. JetBrains maintains multiplatform versions of Foundation, Material, etc. (source: github.com/JetBrains/compose-multiplatform-core) published for non-Android targets.
- A library published with Compose Multiplatform can be consumed by Jetpack-Compose-only apps, which use its Android artifacts. Libraries with compose APIs can be published as Kotlin Multiplatform libraries.
- Distance line: the common androidx.compose API (Column, Modifier, Material3, Image) is covered by android-compose-ui / android-compose-components / android-compose-graphics-animation; this skill covers the org.jetbrains.compose artifacts and multiplatform-specific differences.

## Related

- [How multiplatform Jetpack libraries are packaged](./jetpack-libraries.md)
- [Default UI behavior on different platforms](./platform-differences.md)
- [Lifecycle](../compose-architecture/lifecycle.md)
- [Multiplatform ViewModel](../compose-architecture/viewmodel.md)
- [Navigation and routing](../compose-architecture/navigation-routing.md)
- [Setup and configuration for multiplatform resources](../compose-resources/resources-setup.md)
- [Compatibility and versions](../compatibility/compose-compatibility-and-versioning.md)
