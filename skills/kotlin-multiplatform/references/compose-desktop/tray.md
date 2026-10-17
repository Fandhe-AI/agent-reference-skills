---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-tray.html
---

# Tray and notifications

In Compose Multiplatform for desktop, you can add an application icon to the system tray and send system notifications through it.

## Signature / Usage

`Tray()` is available in the scope of `application()`, so it can be called next to the application windows or on its own:

```kotlin
fun main() = application {
    var count by remember { mutableStateOf(0) }
    var isOpen by remember { mutableStateOf(true) }

    if (isOpen) {
        val trayState = rememberTrayState()
        val notification = rememberNotification("Notification", "Message from MyApp!")

        Tray(
            state = trayState,
            icon = TrayIcon,
            menu = {
                Item(
                    "Increment value",
                    onClick = {
                        count++
                    }
                )
                Item(
                    "Send notification",
                    onClick = {
                        trayState.sendNotification(notification)
                    }
                )
                Item(
                    "Exit",
                    onClick = {
                        isOpen = false
                    }
                )
            }
        )

        Window(
            onCloseRequest = {
                isOpen = false
            },
            icon = MyAppIcon
        ) {
            // Window content:
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(text = "Value: $count")
            }
        }
    }
}

object TrayIcon : Painter() {
    override val intrinsicSize = Size(256f, 256f)

    override fun DrawScope.onDraw() {
        drawOval(Color(0xFFFFA500))
    }
}
```

Tray without a window (the application runs entirely in the system tray):

```kotlin
fun main() = application {
    Tray(
        icon = TrayIcon,
        menu = {
            Item(
                "Exit",
                onClick = ::exitApplication
            )
        }
    )
}
```

## Options / Props

`Tray()` parameters:

| Name | Type | Description |
| --- | --- | --- |
| `icon` | `Painter` | Draws the tray icon. |
| `menu` | content | Contents of the tray menu. Opens on a right-click on Windows and on a left-click on macOS. If you add no items, the menu does not appear. |
| `state` | `TrayState` | Used to send notifications. |
| `tooltip` | `String` | Hint shown when the user hovers over the icon. |
| `onAction` | callback | Triggered by clicking the icon: a double click on Windows and a right-click on macOS. |

## Notes

- Not every desktop environment has a system tray. If the platform does not support one, `Tray()` outputs an error to the standard error stream instead of throwing. Check the `isTraySupported` property before showing tray-related options.
- Without a window there is nothing to close, so call `exitApplication()` from a menu item.
- Notifications: create with `rememberNotification()` and pass to `TrayState.sendNotification()`. They are delivered through the `TrayState` passed to a `Tray()`; if the state is not attached to a tray, the notification is lost.
- A notification has a title, a message, and a type that defines the icon and sound: `None` (default), `Info`, `Warning`, `Error`. Specific assets depend on the platform.
- To test notifications on macOS, the app must be packaged; otherwise notifications are not shown.
- Distance line: system tray and notifications on desktop JVM; for native Windows shell APIs see windows-winui-ui / windows-platform-integration, and for the native macOS status bar see apple-appkit. This skill covers only the Compose `Tray()` composable.

## Related

- [Menu bar](./menu-bar.md)
- [Images and in-app icons](./images.md)
- [Top-level windows management](./windows-management.md)
