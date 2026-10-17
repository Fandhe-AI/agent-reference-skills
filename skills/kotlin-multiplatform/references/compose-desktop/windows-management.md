---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-top-level-windows-management.html
---

# Top-level windows management

Compose Multiplatform for desktop provides features for managing windows: hide them in the tray, make them draggable, adapt their size, change position, and so on. A new experimental window and dialog API v2 is also available.

## Signature / Usage

Create a regular window with `Window()` inside the `application` entry point. As a composable it changes its properties declaratively:

```kotlin
fun main() = application {
    var fileName by remember { mutableStateOf("Untitled") }

    Window(onCloseRequest = ::exitApplication, title = "$fileName - Editor") {
        Button(onClick = { fileName = "note.txt" }) {
            Text("Save")
        }
    }
}
```

Single-window application (wraps `application` and `Window()`):

```kotlin
fun main() = singleWindowApplication {
    // Content of the window
}
```

Ask for confirmation on close, closing declaratively through state:

```kotlin
fun main() = application {
    var isOpen by remember { mutableStateOf(true) }
    var isAskingToClose by remember { mutableStateOf(false) }

    if (isOpen) {
        Window(
            onCloseRequest = { isAskingToClose = true },
            title = "Important document"
        ) {
            if (isAskingToClose) {
                DialogWindow(
                    onCloseRequest = { isAskingToClose = false },
                    title = "Close without saving?"
                ) {
                    Button(
                        onClick = { isOpen = false }
                    ) {
                        Text("Yes")
                    }
                }
            }
        }
    }
}
```

Window state (`WindowState` holds placement, position, and size; changes trigger recomposition):

```kotlin
val state = rememberWindowState(placement = WindowPlacement.Maximized)

Window(onCloseRequest = ::exitApplication, state, title = "Window state") {
    // state.placement = WindowPlacement.Fullscreen / Floating / Maximized
    // state.isMinimized, state.position, state.size
}
```

Adapt window size to content:

```kotlin
Window(
    onCloseRequest = ::exitApplication,
    state = rememberWindowState(width = Dp.Unspecified, height = Dp.Unspecified),
    title = "Adaptive size",
    resizable = false
) {
    // content
}
```

Listen to state changes with `snapshotFlow()`:

```kotlin
LaunchedEffect(state) {
    snapshotFlow { state.size }
        .onEach(::onWindowResize)
        .launchIn(this)

    snapshotFlow { state.position }
        .filter { it.isSpecified }
        .onEach(::onWindowRelocate)
        .launchIn(this)
}
```

Multiple windows: keep an application state class and open/close windows in response to `mutableStateListOf` changes:

```kotlin
fun main() = application {
    val applicationState = remember { MyApplicationState() }

    for (window in applicationState.windows) {
        key(window) {
            MyWindow(window)
        }
    }
}

private class MyApplicationState {
    val windows = mutableStateListOf<MyWindowState>()

    init {
        windows += MyWindowState("Initial window")
    }

    fun openNewWindow() {
        windows += MyWindowState("Window ${windows.size}")
    }

    fun exit() {
        windows.clear()
    }
    // MyWindowState(...) factory and MyWindow() omitted; see the source page
}
```

Dialog with an experimental `modalityType`:

```kotlin
// Enables experimental modalityType
@OptIn(ExperimentalComposeUiApi::class)
fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "Main window"
    ) {
        var isDialogOpen by remember { mutableStateOf(false) }

        Button(onClick = { isDialogOpen = true }) {
            Text(text = "Open dialog")
        }

        if (isDialogOpen) {
            DialogWindow(
                onCloseRequest = { isDialogOpen = false },
                state = rememberDialogState(position = WindowPosition(Alignment.Center)),
                title = "Dialog",
                modalityType = DialogModalityType.ApplicationModal
            ) {
                Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
                    Text("This is a dialog")
                }
            }
        }
    }
}
```

Hide the window to the system tray by intercepting `onCloseRequest`:

```kotlin
fun main() = application {
    var isVisible by remember { mutableStateOf(true) }

    Window(
        // Hides the window instead of closing the app
        onCloseRequest = { isVisible = false },
        visible = isVisible,
        title = "Counter",
    ) {
        // content
    }

    if (!isVisible) {
        Tray(
            TrayIcon,
            tooltip = "Counter",
            onAction = { isVisible = true },
            menu = {
                Item("Exit", onClick = ::exitApplication)
            },
        )
    }
}
```

Draggable area for an undecorated window (call it with a `WindowScope` receiver from other composables):

```kotlin
fun main() = application {
    Window(onCloseRequest = ::exitApplication, undecorated = true) {
        WindowDraggableArea {
            Box(Modifier.fillMaxWidth().height(48.dp).background(Color.DarkGray))
        }
    }
}

@Composable
private fun WindowScope.AppWindowTitleBar() = WindowDraggableArea {
    Box(Modifier.fillMaxWidth().height(48.dp).background(Color.DarkGray))
}
```

Transparent window (`transparent = true` requires `undecorated = true`):

```kotlin
Window(
    onCloseRequest = { isOpen = false },
    title = "Transparent Window Example",
    transparent = true,
    // Transparent window must be undecorated
    undecorated = true,
) {
    Surface(
        modifier = Modifier.fillMaxSize().padding(5.dp).shadow(3.dp, RoundedCornerShape(20.dp)),
        color = Color.Transparent,
        // Window with rounded corners
        shape = RoundedCornerShape(20.dp)
    ) {
        Text("Hello World!", color = Color.White)
    }
}
```

Swing components (`ComposeWindow`, `AwtWindow`):

```kotlin
fun main() = SwingUtilities.invokeLater {
    ComposeWindow().apply {
        size = Dimension(300, 300)
        defaultCloseOperation = JFrame.DISPOSE_ON_CLOSE
        setContent {
            // Content of the window
        }
        isVisible = true
    }
}
```

```kotlin
@Composable
private fun FileDialog(
    parent: Frame? = null,
    onCloseRequest: (result: String?) -> Unit
) = AwtWindow(
    create = {
        object : FileDialog(parent, "Choose a file", LOAD) {
            override fun setVisible(value: Boolean) {
                super.setVisible(value)
                if (value) {
                    onCloseRequest(file)
                }
            }
        }
    },
    dispose = FileDialog::dispose
)
```

Window and dialog API v2 (`androidx.compose.ui.window.v2`):

```kotlin
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

Request state changes and observe the actual state (v2):

```kotlin
windowState.requestScreen { defaultScreen }
windowState.requestSize(DpSize(1024.dp, 768.dp))
windowState.requestPosition(DpOffset(100.dp, 100.dp))

windowState.requestBounds(
    WindowBoundsProvider(
        positionProvider = WindowPositionProvider.CenteredOnScreen,
        sizeProvider = WindowSizeProvider.Fixed(DpSize(1024.dp, 768.dp))
    )
)

if (windowState.isInitialized) {
    Text("Current screen: ${windowState.screenId}")
    Text("Current bounds: ${windowState.bounds}")
}
```

## Options / Props

`DialogModalityType` values (experimental `modalityType` parameter of `DialogWindow()`):

| Value | Behavior |
| --- | --- |
| `Modeless` | Does not block any other windows. |
| `DocumentModal` | Blocks the parent top-level window and any other windows attached to it, except for the dialog's own descendants. |
| `ApplicationModal` | Blocks all other windows in the same application. |

Window v2 position providers (`WindowPositionProvider`):

| Name | Description |
| --- | --- |
| `Default` | Applies the operating system's standard cascading behavior. |
| `Current` | Maintains the current position of the window. |
| `CenteredOnScreen` | Centers the window within the screen. |
| `CenteredInParentWindow` | Centers the window within its parent window. |
| `Absolute()` | Places the window starting corner at specified `x` and `y` coordinates. |
| `AlignedToScreen()` | Aligns the window relative to the screen; optional `offset` (for example `alignment = Alignment.Center, offset = DpOffset(x = 16.dp, y = 16.dp)`). |
| `AlignedToParentWindow()` | Anchors the window to the parent window, typically for dialogs (`anchor = Alignment.TopStart, alignment = Alignment.Center`). |

Window v2 size providers (`WindowSizeProvider`):

| Name | Description |
| --- | --- |
| `Fixed()` | A specific window size. |
| `Default` | The standard 800x600 dp size. |
| `Unconstrained` | Calculates the content's size, adds the window insets, and caps the result at the available screen size. Content using `fillMaxSize()` still expands if the user resizes the window. |
| `WindowSizeProvider { ... }` | Custom lambda with access to screen metrics and, for dialogs, `parentWindowMetrics` (for example `DpSize(300.dp, parentWindowMetrics!!.bounds.height)`). |

## Notes

- Window and dialog API v2 is Experimental: available since Compose Multiplatform 1.12.0 in the `androidx.compose.ui.window.v2` subpackage, with `@OptIn(ExperimentalComposeUiApi::class)` in the source examples. It is available alongside the existing API so individual windows can be migrated gradually.
- v2 separates requesting a state (`requestScreen()`, `requestSize()`, `requestPosition()`, `requestBounds()`, `initialScreenProvider`, `initialBoundsProvider`) from observing the actual state (`WindowState.screenId`, `WindowState.bounds`, `isInitialized`). Applying a request is asynchronous and the windowing system may adjust it. The same model exists for dialogs via `DialogState` and `rememberDialogState()`.
- v2 `Window()` and `DialogWindow()` accept `minSize` and `maxSize` where the window manager supports it.
- Setting one or both dimensions to `Dp.Unspecified` makes Compose Multiplatform adjust the initial window size to fit the content.
- `WindowDraggableArea()` works only inside `singleWindowApplication()`, `Window()`, and `DialogWindow()` (or a `WindowScope` receiver).
- A transparent window must be undecorated because a transparent window cannot be decorated.
- By default, closing the window exits the application; intercept `onCloseRequest` to change that.
- `DialogWindow()` is a separate OS-level window with its own title bar; for overlay UI inside the current window (dropdowns, tooltips, custom overlays) use the multiplatform `Popup()` composable.
- Distance line: top-level windows here are Compose for Desktop (JVM/Swing) windows. Native Windows windowing (AppWindow, WinUI) belongs to windows-winui-ui and native macOS windows (NSWindow) to apple-appkit.

## Related

- [Tray and notifications](./tray.md)
- [Menu bar](./menu-bar.md)
- [Swing interoperability](./swing-interoperability.md)
- [Keyboard events](./keyboard.md)
- Popups
