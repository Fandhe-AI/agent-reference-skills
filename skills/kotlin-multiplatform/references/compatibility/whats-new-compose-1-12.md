---
source: https://kotlinlang.org/docs/multiplatform/whats-new-compose-112.html
---

# What's new in Compose Multiplatform 1.12.2

Highlights of the 1.12.2 feature release: automatic font fallback for web, an MCP server for AI agents in Compose Hot Reload, and the window and dialog API v2 for desktop.

## Signature / Usage

Open a desktop window centered on the screen with a fixed size using the v2 API (`androidx.compose.ui.window.v2`):

```kotlin
import androidx.compose.material.Text
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.application
import androidx.compose.ui.window.v2.Window
import androidx.compose.ui.window.v2.WindowBoundsProvider
import androidx.compose.ui.window.v2.WindowPositionProvider
import androidx.compose.ui.window.v2.WindowSizeProvider
import androidx.compose.ui.window.v2.rememberWindowState

@OptIn(ExperimentalComposeUiApi::class)
fun main() = application {
    val windowState = rememberWindowState(
        initialBoundsProvider = WindowBoundsProvider(
            positionProvider = WindowPositionProvider.CenteredOnScreen,
            sizeProvider = WindowSizeProvider.Fixed(DpSize(400.dp, 200.dp))
        )
    )

    Window(
        onCloseRequest = ::exitApplication,
        state = windowState,
    ) {
        Text("Hello, World!", fontSize = 48.sp)
    }
}
```

## Options / Props

Dependencies for this release:

| Library | Maven coordinates | Based on Jetpack version |
|---------|-------------------|--------------------------|
| Runtime | `org.jetbrains.compose.runtime:runtime*:1.12.2` | Runtime 1.12.1 |
| UI | `org.jetbrains.compose.ui:ui*:1.12.2` | UI 1.12.1 |
| Foundation | `org.jetbrains.compose.foundation:foundation*:1.12.2` | Foundation 1.12.1 |
| Material | `org.jetbrains.compose.material:material*:1.12.2` | Material 1.12.1 |
| Material3 | `org.jetbrains.compose.material3:material3*:1.12.0-alpha03` | Material3 1.5.0-alpha22 |
| Material3 Adaptive | `org.jetbrains.compose.material3.adaptive:adaptive*:1.3.0` | Material3 Adaptive 1.3.0 |
| Lifecycle | `org.jetbrains.androidx.lifecycle:lifecycle-*:2.11.0` | Lifecycle 2.11.0 |
| Navigation | `org.jetbrains.androidx.navigation:navigation-*:2.10.0-rc01` | Navigation 2.10.0 |
| Navigation3 | `org.jetbrains.androidx.navigation3:navigation3-*:1.2.0-rc01` | Navigation3 1.2.0 |
| Navigation Event | `org.jetbrains.androidx.navigationevent:navigationevent-compose:1.1.0` | Navigation Event 1.1.1 |
| Savedstate | `org.jetbrains.androidx.savedstate:savedstate*:1.4.0` | Savedstate 1.4.0 |
| WindowManager Core | `org.jetbrains.androidx.window:window-core:1.5.1` | WindowManager 1.5.1 |

## Notes

- Breaking changes and deprecations: the `LocalSystemTheme` property for managing the app theme is deprecated. It remains temporarily available under the `@InternalComposeUiApi` annotation and will be replaced in a future release.
- Across platforms: Skia (via Skiko) updated to Milestone 150 (Compose Multiplatform 1.11 used Milestone 144); this also resolves duplicate symbol conflicts on iOS for apps that already bundle their own Skia library (for example Chromium-based apps).
- iOS: improved lazy layout scrolling performance; list item deactivations run outside the drawing phase.
- Web, automatic font fallback (Experimental): characters not covered by loaded fonts are no longer shown as replacement glyphs ("tofu"); the required Noto font subsets are downloaded on demand and affected text is recomposed. Tofu may briefly appear until the font is fetched.
- Desktop, MCP server for AI agents in Compose Hot Reload (Experimental): lets AI coding agents trigger reloads, take screenshots, inspect the semantic tree, simulate clicks and input, and read application logs. The tool list and connection steps are on the compose-hot-reload page ("MCP server for AI agents").
- Desktop, Window and dialog API v2 (Experimental): new `WindowState` / `DialogState` API in the `androidx.compose.ui.window.v2` subpackage. It lets you select the screen, provide custom positioning and sizing logic (including from the content's intrinsic size), set minimum and maximum window sizes, and position dialogs relative to the parent window; it separates requested state from actual state. Details are on the windows-management page.
- The full list of changes is in the GitHub release notes for v1.12.0. Docs pinned at commit 3ad4b02 (fetched 2026-10-16). Material3 1.12.0-alpha03 and Navigation 2.10.0-rc01 / Navigation3 1.2.0-rc01 are the pre-release versions this release pins; they are not stable.
- Distance line: the underlying androidx.compose API belongs to android-compose-ui / android-compose-components and `androidx.window` to android-platform-core; this page covers org.jetbrains.compose / org.jetbrains.androidx artifacts for Compose Multiplatform.

## Related

- [Compatibility and versions](./compose-compatibility-and-versioning.md)
- Compose Hot Reload
- [Top-level windows management](../compose-desktop/windows-management.md)
