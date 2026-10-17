---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-swing-interoperability.html
---

# Swing interoperability

Using Swing components in a Compose Multiplatform application and vice versa, with the limitations and advantages of this interoperability. It aims to smooth the migration of Swing applications to Compose Multiplatform and to enhance Compose Multiplatform applications with Swing components when no Compose analogue exists.

## Signature / Usage

Compose Multiplatform in a Swing application: add a `ComposePanel` to the Swing layout and define the composition inside `setContent`:

```kotlin
fun main() = SwingUtilities.invokeLater {
    val window = JFrame()

    // Creates ComposePanel
    val composePanel = ComposePanel()
    window.defaultCloseOperation = WindowConstants.EXIT_ON_CLOSE
    window.title = "SwingComposeWindow"

    // Adds ComposePanel to JFrame
    window.contentPane.add(composePanel, BorderLayout.CENTER)

    // Sets the content
    composePanel.setContent {
        ComposeContent()
    }

    window.setSize(800, 600)
    window.isVisible = true
}
```

Swing in a Compose Multiplatform application: use the `factory` parameter of `SwingPanel` to create a Swing `JPanel`:

```kotlin
SwingPanel(
    background = Color.LightGray,
    modifier = Modifier.size(270.dp, 90.dp),
    factory = {
        JPanel().apply {
            layout = BoxLayout(this, BoxLayout.Y_AXIS)
            add(actionButton("1. Swing Button: decrement", dec))
            add(actionButton("2. Swing Button: decrement", dec))
            add(actionButton("3. Swing Button: decrement", dec))
        }
    }
)
```

Update a Swing component when Compose state changes with the `update: (T) -> Unit` callback:

```kotlin
SwingPanel(
    modifier = Modifier.fillMaxWidth().height(40.dp),
    factory = {
        JPanel().apply {
            add(swingLabel, BorderLayout.CENTER)
        }
    },
    update = {
        swingLabel.text = "SwingLabel clicks: ${clicks.value}"
    }
)
```

Experimental off-screen rendering for a `ComposePanel`:

```kotlin
val composePanel = ComposePanel(renderSettings = RenderSettings.SwingGraphics)
```

Experimental separate views for popups (`compose.layers.type = COMPONENT` requires off-screen rendering):

```kotlin
@OptIn(ExperimentalComposeUiApi::class)
fun main() = SwingUtilities.invokeLater {
    System.setProperty("compose.swing.render.on.graphics", "true")
    System.setProperty("compose.layers.type", "COMPONENT")

    val window = JFrame()
    window.defaultCloseOperation = WindowConstants.EXIT_ON_CLOSE

    val contentPane = JLayeredPane()
    contentPane.layout = null

    val composePanel = ComposePanel()
    composePanel.setBounds(200, 200, 200, 200)
    composePanel.setContent {
        ComposeContent()
    }

    // Uses the full window for dialogs
    composePanel.windowContainer = contentPane
    contentPane.add(composePanel)

    window.contentPane.add(contentPane)
    window.setSize(800, 600)
    window.isVisible = true
}
```

Experimental interop blending:

```kotlin
fun main() {
    System.setProperty("compose.interop.blending", "true")
    ...
}
```

Nested layout (Swing - Compose - Swing): a `SwingPanel` whose `factory` returns a `ComposePanel`, which contains another `SwingPanel` (excerpt):

```kotlin
SwingPanel(
    background = DarkGray.toCompose(),
    modifier = Modifier.fillMaxSize(),
    factory = {
        ComposePanel().apply {
            setContent {
                Box {
                    SwingPanel(
                        modifier = Modifier.fillMaxSize(),
                        factory = { SwingComponent() }
                    )
                    // ... overlay Box containing another SwingPanel { ComposePanel().apply { setContent { ComposeOverlay() } } }
                }
            }
        }
    }
)
```

## Options / Props

Experimental switches:

| Feature | How to enable | Description |
| --- | --- | --- |
| Off-screen rendering | `ComposePanel(renderSettings = RenderSettings.SwingGraphics)` or `-Dcompose.swing.render.on.graphics=true` (or `System.setProperty("compose.swing.render.on.graphics", "true")`) | Renders `ComposePanel` directly on Swing components; avoids transitional rendering issues on show/hide/resize and allows Swing components above or beneath a `ComposePanel`. Performance penalty grows with panel size versus default Skia rendering. Affects only `ComposePanel`, not `ComposeWindow` or `ComposeDialog`. |
| Separate views for popups | `compose.layers.type` system property: `WINDOW` or `COMPONENT` | `WINDOW` creates `Popup` and `Dialog` as separate undecorated windows. `COMPONENT` creates them as a separate Swing component in the same window (requires off-screen rendering, which works for `ComposePanel` only). Popups and dialogs still cannot draw outside their own bounds (for example the shadow of the topmost container). |
| Interop blending | `compose.interop.blending=true` (`-D` JVM argument or `System.setProperty()`, set before any Compose code runs) | Makes `clip` and `shadow` modifiers work with `SwingPanel` and allows drawing Compose content on top of a `SwingPanel`. |

## Notes

- All Compose Multiplatform components inside `ComposePanel`, including popups, tooltips, and context menus, are rendered within the panel and positioned and resized inside it.
- A Swing component in `SwingPanel` is always layered above Compose components, so anything beneath is clipped (unless interop blending is enabled). Prefer implementing the missing component in Compose where practical.
- `SwingPanel` suits apps that need no popups, tooltips, or context menus inside it, or where the panel stays in a fixed position. Nested combinations can cause rendering glitches.
- Off-screen rendering, separate views for popups, and interop blending are all Experimental; use for evaluation only. The popup views setting needs `@OptIn(ExperimentalComposeUiApi::class)` in the example.
- Distance line: this is the Compose-for-desktop (JVM) bridge to Swing/AWT. Native Windows interop (WPF/WinForms/Win32) belongs to windows-interop-modernize and native macOS AppKit to apple-appkit.

## Related

- [Top-level windows management](./windows-management.md)
- [Context menus](./context-menus.md)
- [Mouse event listeners](./mouse-events.md)
- [Native application entry points](../compose-ui/entry-points.md)
