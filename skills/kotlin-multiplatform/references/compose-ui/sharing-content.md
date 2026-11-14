---
source: https://kotlinlang.org/docs/multiplatform/compose-share-feature.html
---

# Sharing content in Compose Multiplatform

Share text, URLs, files, and other content with the system or other apps, using community libraries or platform-specific APIs.

## Signature / Usage

Sharing capabilities differ across platforms: Android and iOS provide native system share dialogs, desktop applications generally have no universal share dialog (alternatives are the clipboard, opening files or URLs with the default application, or platform-specific APIs), and web applications can use the Web Share API depending on browser support.

### Community libraries

KMP Sharing provides a common API for the system share dialog on Android and iOS. It supports sharing text or a URL, optionally with file URIs:

```kotlin
val share = rememberShare()
val sharingOptions = SharingOptions(androidDialogTitle = "Share with")

Button(onClick = { share("https://kotlinlang.org", sharingOptions) }) {
    Text("Share link")
}

Button(onClick = { share("Kotlin programming language", sharingOptions) }) {
    Text("Share text")
}
```

FileKit provides cross-platform file picking, saving, and file operations with native dialogs. For example, pick files with FileKit and share them with KMP Sharing:

```kotlin
val share = rememberShare()
val sharingOptions = SharingOptions(androidDialogTitle = "Share with")

val photosPicker = rememberFilePickerLauncher(
    type = FileKitType.Image,
    mode = FileKitMode.Multiple(),
    onError = {},
    onResult = { photos ->
        photos?.takeIf { it.isNotEmpty() }?.let { selectedPhotos ->
            share(selectedPhotos.map(PlatformFile::sharingUri), sharingOptions)
        }
    },
)

Button(onClick = photosPicker::launch) {
    Text("Pick and share photos")
}
```

KMP Sharing expects file values as URIs. If you get a local path from FileKit, convert the `PlatformFile` path to a URI before sharing it. Define this helper at the top level in `commonMain`:

```kotlin
private fun PlatformFile.sharingUri(): String = path.let { filePath ->
    when {
        filePath.startsWith("content://") || filePath.startsWith("file://") -> filePath
        else -> "file://$filePath"
    }
}
```

### Android

In the `androidMain` source set, use an `ACTION_SEND` intent to share text, a URL, or a file. For text or URLs, pass the content with `Intent.EXTRA_TEXT`:

```kotlin
val intent = Intent(Intent.ACTION_SEND).apply {
    type = "text/plain"
    putExtra(Intent.EXTRA_TEXT, "https://kotlinlang.org")
}

context.startActivity(Intent.createChooser(intent, "Share with"))
```

To share a file, use a `content://` URI and grant temporary read permission:

```kotlin
val intent = Intent(Intent.ACTION_SEND).apply {
    type = "image/jpeg"
    putExtra(Intent.EXTRA_STREAM, contentUri)
    addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
}

context.startActivity(Intent.createChooser(intent, "Share with"))
```

For app-private files, expose the file through `FileProvider`, `MediaStore`, or another content provider. For multiple files, use `ACTION_SEND_MULTIPLE` with `Intent.EXTRA_STREAM` and pass an `ArrayList<Uri>`:

```kotlin
val intent = Intent(Intent.ACTION_SEND_MULTIPLE).apply {
    type = "image/jpeg"
    putParcelableArrayListExtra(Intent.EXTRA_STREAM, ArrayList(contentUris))
    addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
}

context.startActivity(Intent.createChooser(intent, "Share with"))
```

### iOS

For UIKit-based UIs, present a `UIActivityViewController` in the native `iosApp` project:

```swift
let items: [Any] = [URL(string: "https://kotlinlang.org")!]

let controller = UIActivityViewController(
    activityItems: items,
    applicationActivities: nil
)

viewController.present(controller, animated: true)
```

In the native app's SwiftUI code, you can use `ShareLink` for values supported by the `Transferable` protocol. For custom or large files, implement a `Transferable` representation or use `UIActivityViewController` with a platform bridge.

### Desktop

Desktop applications do not have a universal share dialog. Common approaches are copying content to the clipboard, opening a file with the default application, or using platform-specific APIs such as the `NSSharingServicePicker` class on macOS. For example, open a file in its associated application using `java.awt.Desktop`:

```kotlin
val file = java.io.File("/path/to/document.pdf")

if (java.awt.Desktop.isDesktopSupported()) {
    val desktop = java.awt.Desktop.getDesktop()
    if (desktop.isSupported(java.awt.Desktop.Action.OPEN)) {
        desktop.open(file)
    }
}
```

### Web

Web applications can use the Web Share API via JavaScript interop when supported by the browser and operating system. It usually requires HTTPS and a user gesture, such as a button click. Check for support before calling the API and provide a fallback, for example, copying the content to the clipboard:

```javascript
if (navigator.share) {
    await navigator.share({
        title: "Kotlin",
        text: "Kotlin programming language",
        url: "https://kotlinlang.org"
    })
} else {
    await navigator.clipboard.writeText("https://kotlinlang.org")
}
```

For files, check support with `navigator.canShare()`:

```javascript
if (navigator.canShare && navigator.canShare({ files })) {
    await navigator.share({
        files,
        title: "Photos"
    })
}
```

### Opening links

Compose Multiplatform provides `UriHandler` as a common API for asking the platform to open a URI: `https://` links, custom application schemes, `mailto:`, `geo:`, and others. Get the handler with `LocalUriHandler.current` and call `openUri()` from an event handler:

```kotlin
val uriHandler = LocalUriHandler.current

Button(onClick = { uriHandler.openUri("mailto:user@example.com?subject=Hello") }) {
    Text("Send email")
}
```

## Notes

- Sharing is not a Compose Multiplatform API: the docs recommend community libraries (KMP Sharing, FileKit; more on klibs.io) or the native APIs of each platform. The examples are verbatim from the official page and were not compiled here.
- The `sharingUri()` helper above builds `file://` URIs from raw paths, as in the official page. On Android, exposing a `file://` URI to another app can fail with `FileUriExposedException` (API 24 and later), and the Android section of the same page says to use `content://` URIs with a temporary read grant; prefer `content://` URIs for files on Android.
- The Web Share API calls are JavaScript; call them from Kotlin through JavaScript interop (language-level interop belongs to the kotlin skill).
- Other related features named on the page: drag and drop (see the drag-and-drop page) and the Jetpack Compose `Clipboard` interface, whose use from common code is limited (tracked as CMP-7624 in YouTrack).
- Android intents and chooser behavior belong to the `android-*` skills; `UIActivityViewController` and `ShareLink` belong to the `apple-*` skills. This page covers only the Compose Multiplatform side.
- Source: https://github.com/JetBrains/kotlin-multiplatform-dev-docs/blob/54ca714a853f25f193b016207b89e09edfded5e6/topics/compose-share-feature.md (pinned, fetched 2026-11-14). Page added after Compose Multiplatform 1.12.2.

## Related

- [Drag-and-drop operations](./drag-and-drop.md)
- [Display PDF files in a Compose Multiplatform app](./pdf.md)
