# hiltViewModel() Compose artifact/package split

Starting with Hilt 1.3.0, the `hiltViewModel()` APIs for Jetpack Compose moved out of `androidx.hilt:hilt-navigation-compose` into a dedicated artifact so that using `hiltViewModel()` no longer transitively pulls in `androidx.navigation`.

## Signature / Usage

```kotlin
// Before Hilt 1.3.0
// build.gradle.kts: implementation("androidx.hilt:hilt-navigation-compose:<version>")
import androidx.hilt.navigation.compose.hiltViewModel

// Hilt 1.3.0+
// build.gradle.kts: implementation("androidx.hilt:hilt-lifecycle-viewmodel-compose:<version>")
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `androidx.hilt:hilt-navigation-compose` | Gradle artifact (pre-1.3.0) | — | Original artifact providing `hiltViewModel()` for Compose (package `androidx.hilt.navigation.compose`); transitively depends on `androidx.navigation`. |
| `androidx.hilt:hilt-lifecycle-viewmodel-compose` | Gradle artifact (1.3.0+) | — | New artifact providing `hiltViewModel()` for Compose (package `androidx.hilt.lifecycle.viewmodel.compose`) without a transitive `androidx.navigation` dependency. |

## Notes

- Introduced in Hilt `1.3.0-alpha02` (July 2, 2025) and released as stable in `1.3.0` (September 10, 2025).
- Both the Gradle coordinate and the Kotlin package changed; upgrading requires updating the dependency declaration and the `hiltViewModel` import, not just a version bump.
- The `hiltViewModel()` behavior itself (scoping to the current navigation destination, `@HiltViewModel` requirement, Navigation 3 usage) is unchanged — only where it is published from changed. See `@HiltViewModel` / `hiltViewModel()`.

## Related

- [@HiltViewModel / hiltViewModel()](./hilt-view-model.md)
- [Use Hilt with other Jetpack libraries](./hilt-jetpack.md)
