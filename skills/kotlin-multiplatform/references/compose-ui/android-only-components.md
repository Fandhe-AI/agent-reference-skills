---
source: https://kotlinlang.org/docs/multiplatform/compose-android-only-components.html
---

# Android-only components

Compose Multiplatform builds on Jetpack Compose. Most functionality is available on all platforms, but some APIs and libraries only work in the Android target, because they are Android-specific or have not been ported yet. Using them in `commonMain` makes the IDE report the API as unavailable.

## Signature / Usage

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        setContent {
            // Calling the common App() composable
            App()
        }
    }
}
```

## Options / Props

Android-only API (Android-specific, usually uses `android.*` classes; best kept in `androidMain`):

| API |
| --- |
| `android.content.Context` class |
| `LocalContext` and `LocalConfiguration` variables |
| `android.graphics.BitmapFactory` and `android.graphics.Bitmap` classes |
| `ImageBitmap.asAndroidBitmap()` function |
| `android.app.Activity` class and `ComponentActivity.setContent()` extension function (`androidx.activity.compose`) |
| `ComposeView` class |
| `LocalView` variable |
| `Modifier.pointerInteropFilter()` function |
| Hilt dependency injection library |

API with Android classes in signatures but applicable to other platforms (may be ported to `commonMain` depending on complexity and demand):

| API | Multiplatform counterpart |
| --- | --- |
| Resource management: `stringResource`, `animatedVectorResource`, `Font`, `*.R` class | Images and resources (compose-resources) |
| Navigation | Navigation and routing (compose-architecture) |
| `ViewModel` class | Multiplatform ViewModel (compose-architecture) |
| Paging library, `ConstraintLayout`, Maps library, `WebView` class | — |
| Preview tool and a plugin for previewing desktop applications | previews.md |
| Other Jetpack Compose libraries not yet ported | — |

API without Android classes in signatures, not available in `commonMain` in Compose Multiplatform 1.12.2:

| API |
| --- |
| `Modifier.imeNestedScroll()` |
| `Modifier.systemGestureExclusion()` |
| `Modifier.magnifier()` |
| `LocalOverscrollConfiguration` variable |
| `AnimatedImageVector.animatedVectorResource` API |
| material3-adaptive library |
| material3-window-size-class library |

## Notes

- Snippet quoted from the Native application entry points page (Android entry point using the Android-only `ComponentActivity.setContent()`); the source page itself has no code.
- The source page labels this class `android.context.Context`, but its link targets `android.content.Context`, the actual class name.
- The source page labels it `android.app.Activity.setContent()`, but it links to the `ComponentActivity.setContent()` extension from androidx.activity.compose.
- Permissions, devices (Bluetooth, GPS, Camera) and IO (network, files, databases) are out of scope of Compose Multiplatform.
- APIs in the last group are normally ported after they are introduced in Jetpack Compose for Android.
- For each API that can be ported there is an open issue in the Compose Multiplatform YouTrack project (CMP); if none exists you can create one.
- Distance line: these are common `androidx.compose.*` / Android platform APIs documented by android-compose-ui, android-platform-core and android-architecture; this page only states which are unavailable in common code.

## Related

- [Native application entry points](./entry-points.md)
- [Compose UI previews](./previews.md)
- [Adaptive layouts](./adaptive-layouts.md)
- [Navigation and routing](../compose-architecture/navigation-routing.md)
- [Multiplatform ViewModel](../compose-architecture/viewmodel.md)
