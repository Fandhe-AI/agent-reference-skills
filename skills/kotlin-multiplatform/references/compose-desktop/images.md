---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-images.html
---

# Images and in-app icons

Compose Multiplatform for desktop loads images from the multiplatform resources library, just like other platforms. Desktop applications can also read images from the file system or the network with JVM APIs and use images as window and tray icons.

## Signature / Usage

Create a `Painter` by passing the generated accessor to `painterResource()`, then pass it to `Image()`:

```kotlin
fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "Resource image",
        state = WindowState(size = DpSize(500.dp, 250.dp))
    ) {
        Image(
            painter = painterResource(Res.drawable.kotlin_logo),
            contentDescription = "Kotlin logo",
            modifier = Modifier.fillMaxSize().padding(24.dp)
        )
    }
}
```

Imports used: `androidx.compose.foundation.Image`, `org.jetbrains.compose.resources.painterResource`, and the generated `com.example.composeapp.generated.resources.Res` / `kotlin_logo`.

Window icon: pass a `Painter` as the `icon` parameter of `Window()`:

```kotlin
fun main() = application {
    val icon = painterResource(Res.drawable.compose_logo)

    Window(
        onCloseRequest = ::exitApplication,
        title = "Window icon",
        icon = icon,
        state = WindowState(size = DpSize(400.dp, 300.dp))
    ) {
        Box(Modifier.fillMaxSize().paint(icon, contentScale = ContentScale.Fit))
    }
}
```

`singleWindowApplication()` evaluates `icon` outside composition, where `painterResource()` is not available. Read the resource with `Res.readBytes()` and decode it into a `BitmapPainter`:

```kotlin
fun main() {
    val iconBytes = runBlocking { Res.readBytes("drawable/kotlin-logo.png") }
    val icon = BitmapPainter(iconBytes.decodeToImageBitmap())

    singleWindowApplication(icon = icon, title = "Single window icon") {
        Text("Hello, World!")
    }
}
```

Tray icon: pass a `Painter` as the `icon` parameter of `Tray()`:

```kotlin
Tray(
    icon = icon,
    tooltip = "Compose Multiplatform",
    menu = {
        Item("Exit", onClick = ::exitApplication)
    }
)
```

## Options / Props

Decoding functions for images that are not application resources (read the bytes with any JVM API first):

| Image format | Decoding function | Result |
| --- | --- | --- |
| Bitmap | `decodeToImageBitmap()` | `ImageBitmap` |
| XML vector | `decodeToImageVector()` | `ImageVector` |
| SVG | `decodeToSvgPainter()` | `Painter` |

## Notes

- `painterResource()` supports rasterized formats such as `.png`, `.jpg`, `.bmp`, and `.webp`, as well as the Android XML vector drawable format.
- Resources do not have to be in the common source set. Any source set or module can use its own `composeResources` directory. To use resources declared in another module, make that module's generated `Res` class public.
- Reading a file or a network response blocks the calling thread, so perform these operations outside the UI thread (the source example loads in `Dispatchers.IO` inside a `produceState` based `AsyncImage()` composable). File paths in the example are resolved against the working directory of the application.
- Window icon location depends on the OS: on Windows and Linux it is the icon of the window and its taskbar entry; on macOS the application icon comes from the application bundle, so set the Dock icon in the distribution configuration (see native-distribution.md).
- On macOS the tray icon appears in the menu bar.
- Distance line: `Image`, `Painter`, and `Modifier` are common androidx.compose APIs documented by android-compose-ui / android-compose-components / android-compose-graphics-animation; this skill covers the `org.jetbrains.compose` resources library and the desktop-specific usage.

## Related

- [Tray and notifications](./tray.md)
- [Native distributions](./native-distribution.md)
- [Top-level windows management](./windows-management.md)
- [Setup and configuration for multiplatform resources](../compose-resources/resources-setup.md)
- [Using multiplatform resources in your app](../compose-resources/resources-usage.md)
