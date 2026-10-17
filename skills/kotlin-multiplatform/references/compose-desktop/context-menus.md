---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-context-menus.html
---

# Context menus

Compose Multiplatform for desktop provides out-of-the-box support for text context menus and allows you to tailor any context menus by adding more items, setting up themes, and customizing text.

## Signature / Usage

Use `ContextMenuArea` to define a container where a right mouse click triggers a context menu:

```kotlin
fun main() = singleWindowApplication(title = "Context menu") {
    ContextMenuArea(items = {
        listOf(
            ContextMenuItem("User-defined action") {
                // Custom action
            },
            ContextMenuItem("Another user-defined action") {
                // Another custom action
            }
        )
    }) {
        // Blue box where context menu will be available
        Box(modifier = Modifier.background(Color.Blue).height(100.dp).width(100.dp))
    }
}
```

Theming: set a suitable representation via `LocalContextMenuRepresentation`:

```kotlin
val contextMenuRepresentation = if (isSystemInDarkTheme()) {
    DarkDefaultContextMenuRepresentation
} else {
    LightDefaultContextMenuRepresentation
}
CompositionLocalProvider(LocalContextMenuRepresentation provides contextMenuRepresentation) {
    Surface(Modifier.fillMaxSize()) {
        Box {
            var value by remember { mutableStateOf("") }
            TextField(value, { value = it })
        }
    }
}
```

Make a `Text` component's context menu available by wrapping it in `SelectionContainer`:

```kotlin
SelectionContainer {
    Text("Hello World!")
}
```

Add custom items to text field and selectable text menus with `ContextMenuItem` and `ContextMenuDataProvider`:

```kotlin
ContextMenuDataProvider(
    items = {
        listOf(
            ContextMenuItem("User-defined action") {
                // Custom action
            },
            ContextMenuItem("Another user-defined action") {
                // Another custom action
            }
        )
    }
) {
    TextField(
        value = text.value,
        onValueChange = { text.value = it },
        label = { Text(text = "Input") }
    )

    Spacer(Modifier.height(16.dp))

    SelectionContainer {
        Text("Hello World!")
    }
}
```

Override the default text context menu by providing a `TextContextMenu` through `LocalTextContextMenu` (excerpt; reuses the original menu and adds one item):

```kotlin
@OptIn(ExperimentalFoundationApi::class)
@Composable
fun CustomTextMenuProvider(content: @Composable () -> Unit) {
    val textMenu = LocalTextContextMenu.current
    val uriHandler = LocalUriHandler.current
    CompositionLocalProvider(
        LocalTextContextMenu provides object : TextContextMenu {
            @Composable
            override fun Area(
                textManager: TextContextMenu.TextManager,
                state: ContextMenuState,
                content: @Composable () -> Unit
            ) {
                // Reuses original TextContextMenu and adds a new item
                ContextMenuDataProvider({
                    val shortText = textManager.selectedText.crop()
                    if (shortText.isNotEmpty()) {
                        val encoded = URLEncoder.encode(shortText, Charset.defaultCharset())
                        listOf(ContextMenuItem("Search $shortText") {
                            uriHandler.openUri("https://google.com/search?q=$encoded")
                        })
                    } else {
                        emptyList()
                    }
                }) {
                    textMenu.Area(textManager, state, content = content)
                }
            }
        },
        content = content
    )
}
```

Swing interoperability: `JPopupTextMenu` makes `LocalTextContextMenu` use Swing's `JPopupMenu` (excerpt):

```kotlin
CompositionLocalProvider(
    LocalTextContextMenu provides JPopupTextMenu(owner) { textManager, items ->
        JPopupMenu().apply {
            textManager.copy?.also {
                add(
                    swingItem(localization.copy, Color.GREEN, KeyEvent.VK_C, it)
                )
            }
            // Adds items that can be defined via ContextMenuDataProvider in other parts of the application
            for (item in items) {
                add(
                    JMenuItem(item.label).apply {
                        addActionListener { item.onClick() }
                    }
                )
            }
        }
    },
    content = content
)
```

## Notes

- `LightDefaultContextMenuRepresentation` and `DarkDefaultContextMenuRepresentation` are not applied to context menu colors automatically; set one via `LocalContextMenuRepresentation`.
- By default the context menu appears in the preferred language of the system settings. To force a language, set the default locale before running the application: `java.util.Locale.setDefault(java.util.Locale("en"))`.
- The default text field menu offers copy, cut, paste, and select all depending on cursor position and selection. It is available by default in material `TextField` (`androidx.compose.material.TextField` or `androidx.compose.material3.TextField`) and foundation `BasicTextField`. The default menu for plain `Text` includes only copy.
- Overriding `TextContextMenu` requires `@OptIn(ExperimentalFoundationApi::class)` in the source example.
- Use `JPopupTextMenu` when embedding Compose in an existing Swing application and the context menu should match the rest of the application.
- Distance line: `TextField`, `Text`, and `SelectionContainer` are common androidx.compose APIs covered by android-compose-ui / android-compose-components; the context menu APIs here are desktop-specific.

## Related

- [Tooltips](./tooltips.md)
- [Swing interoperability](./swing-interoperability.md)
- [Mouse event listeners](./mouse-events.md)
