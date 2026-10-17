---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-menu-bar.html
---

# Menu bar

You can create a menu bar for a specific window using the `MenuBar()` composable. `MenuBar()` is available in the scope of the `Window()` composable, so each window can have its own menu bar.

## Signature / Usage

```kotlin
fun main() = application {
    var action by remember { mutableStateOf("Last action: None") }
    var isOpen by remember { mutableStateOf(true) }

    if (isOpen) {
        var isSubmenuShowing by remember { mutableStateOf(false) }

        Window(onCloseRequest = { isOpen = false }) {
            MenuBar {
                Menu("File", mnemonic = 'F') {
                    Item("Copy", onClick = { action = "Last action: Copy" }, shortcut = KeyShortcut(Key.C, ctrl = true))
                    Item(
                        "Paste",
                        onClick = { action = "Last action: Paste" },
                        shortcut = KeyShortcut(Key.V, ctrl = true)
                    )
                }
                Menu("Actions", mnemonic = 'A') {
                    CheckboxItem(
                        "Advanced settings",
                        checked = isSubmenuShowing,
                        onCheckedChange = {
                            isSubmenuShowing = !isSubmenuShowing
                        }
                    )
                    if (isSubmenuShowing) {
                        Menu("Settings") {
                            Item("Setting 1", onClick = { action = "Last action: Setting 1" })
                            Item("Setting 2", onClick = { action = "Last action: Setting 2" })
                        }
                    }
                    Separator()
                    Item("About", icon = AboutIcon, onClick = { action = "Last action: About" })
                    Item("Exit", onClick = { isOpen = false }, shortcut = KeyShortcut(Key.Escape), mnemonic = 'E')
                }
            }

            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(text = action)
            }
        }
    }
}
```

## Options / Props

Components available inside `MenuBar()`:

| Name | Description |
| --- | --- |
| `Menu()` | A menu or a submenu. |
| `Item()` | A clickable menu item. |
| `CheckboxItem()` | An item with a checkbox. |
| `RadioButtonItem()` | An item with a radio button. |
| `Separator()` | A horizontal line that separates groups of items. |

Common item parameters:

| Name | Type | Description |
| --- | --- | --- |
| `mnemonic` | `Char` | Character that opens the menu or triggers the item when pressed with Alt. The first occurrence in the text is underlined. |
| `shortcut` | `KeyShortcut` | Triggers the action without navigating the menu. Items only. |

## Notes

- Setting `ctrl = true` in `KeyShortcut` always maps to Ctrl, including on macOS. For the standard macOS shortcuts use `meta = true` for the Command key.
- Menu content is composable, so conditions and loops inside `MenuBar()` decide which items exist; the menu updates when the state they read changes (in the example the **Settings** submenu exists only while **Advanced settings** is checked).
- On Windows and Linux the menu bar is part of the window. On macOS it is displayed in the system menu bar at the top of the screen when the window is active.
- Distance line: for native macOS menu bars see apple-appkit, and for native Windows menu controls see windows-winui-ui; this skill covers only the Compose `MenuBar()` composable.

## Related

- [Tray and notifications](./tray.md)
- [Top-level windows management](./windows-management.md)
- [Keyboard events](./keyboard.md)
