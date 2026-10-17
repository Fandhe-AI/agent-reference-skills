---
source: https://kotlinlang.org/docs/multiplatform/compose-multiplatform-resources-usage.html
---

# Using multiplatform resources in your app

After setup, build the project to generate the `Res` class and accessors; rebuild or re-import the project to regenerate them.

## Signature / Usage

Import the generated class and accessors (`project` = project name, `shared` = module holding the resource directories, `Res` = default class name, `example_image` = file `composeResources/drawable/example_image.png`):

```kotlin
import project.shared.generated.resources.Res
import project.shared.generated.resources.example_image
```

```kotlin
Image(
    painter = painterResource(Res.drawable.my_image),
    contentDescription = null
)
```

### Customizing accessor class generation

```kotlin
compose.resources {
    publicResClass = false
    packageOfResClass = "me.sample.library.resources"
    generateResClass = auto
}
```

| Name | Type | Description |
|------|------|-------------|
| publicResClass | Boolean | `true` makes the generated `Res` class public. Default: internal. |
| packageOfResClass | String | Assigns the `Res` class to a package. Default: `{group name}.{module name}.generated.resources`. |
| generateResClass | `auto` / `always` | `always` unconditionally generates `Res` (useful when the resource library is only available transitively). Default `auto`: generates only if the project has an explicit `implementation` or `api` dependency on the resource library. |

### Images

Drawable resources as simple images, rasterized images, or XML vectors. SVG is supported on all platforms except Android.

```kotlin
@Composable
fun painterResource(resource: DrawableResource): Painter {...}

@Composable
fun imageResource(resource: DrawableResource): ImageBitmap {...}

@Composable
fun vectorResource(resource: DrawableResource): ImageVector {...}
```

- `painterResource()` loads a `BitmapPainter` for `.png`, `.jpg`, `.bmp`, `.webp`, or a `VectorPainter` for Android XML vector drawables (same format as Android, without external references to Android resources). It works synchronously on all targets except web, where it returns an empty `Painter` for the first recomposition and the loaded image in subsequent ones.

Drawing on a canvas (offsets and sizes in a `DrawScope` are in pixels):

```kotlin
val myImageRaster = imageResource(Res.drawable.my_image_raster)
val myImageVectorPainter = rememberVectorPainter(vectorResource(Res.drawable.my_image_vector))

Canvas(modifier = Modifier.fillMaxSize()) {
    // Inside the lambda, `this` is an instance of `DrawScope`, which provides `drawImage()` and `translate()`
    drawImage(image = myImageRaster, topLeft = Offset(20f, 20f))
    translate(left = 20f, top = myImageRaster.height + 40f) {
        // The `Painter.draw()` function uses both the `DrawScope` and `Painter` as receivers
        with(myImageVectorPainter) {
            draw(Size(200f, 200f))
        }
    }
}
```

### Icons

Vector Android XML icons from Material Symbols: download from Google Fonts Icons (Android tab), add the XML to `drawable`, set `android:fillColor` to `#000000`, and remove Android-specific color attributes such as `android:tint`. Then build.

```xml
<vector xmlns:android="http://schemas.android.com/apk/res/android"
     android:width="24dp"
     android:height="24dp"
     android:viewportWidth="960"
     android:viewportHeight="960">
     <path
         android:fillColor="#000000"
         android:pathData="..."/>
</vector>
```

```kotlin
Image(
    painter = painterResource(Res.drawable.ic_sample_icon),
    contentDescription = "Sample icon",
    modifier = Modifier.size(24.dp),
    colorFilter = ColorFilter.tint(Color.Blue)
)
```

### Strings

String resources live in XML files in `composeResources/values`; a static accessor is generated for each item. Supported escapes: `\n`, `\t`, `\uXXXX`. Special XML characters like `@` or `?` need no escaping (unlike Android strings).

```xml
<resources>
    <string name="app_name">My awesome app</string>
    <string name="title">Some title</string>
</resources>
```

```kotlin
@Composable
fun stringResource(resource: StringResource): String {...}

@Composable
fun stringResource(resource: StringResource, vararg formatArgs: Any): String {...}

suspend fun getString(resource: StringResource): String

suspend fun getString(resource: StringResource, vararg formatArgs: Any): String
```

```kotlin
Text(stringResource(Res.string.app_name))

coroutineScope.launch {
    val appName = getString(Res.string.app_name)
}
```

**String templates.** Arguments have basic support. Use `%<number>` with a `$d` or `$s` suffix; the two suffixes behave identically and no others are supported (`%1$s` can display a fractional number).

```xml
<resources>
    <string name="str_template">Hello, %2$s! You have %1$d new messages.</string>
</resources>
```

```kotlin
Text(stringResource(Res.string.str_template, 100, "User_name"))
```

**String arrays** (accessed as `List<String>`):

```xml
<string-array name="str_arr">
    <item>item ★</item>
    <item>item ⌘</item>
    <item>item ½</item>
</string-array>
```

```kotlin
@Composable
fun stringArrayResource(resource: StringArrayResource): List<String> {...}

suspend fun getStringArray(resource: StringArrayResource): List<String>
```

```kotlin
val arr = stringArrayResource(Res.array.str_arr)
if (arr.isNotEmpty()) Text(arr[0])
```

**Plurals.** Same concept and base implementation as Android quantity strings. Variants: `zero`, `one`, `two`, `few`, `many`, `other` (not all are considered for every language; for example `zero` is ignored for English). A `plurals` collection is referenced by its `name` attribute (not the XML file name) and can share a `<resources>` element with other simple resources.

```xml
<plurals name="new_message">
    <item quantity="one">%1$d new message</item>
    <item quantity="other">%1$d new messages</item>
</plurals>
```

```kotlin
@Composable
fun pluralStringResource(resource: PluralStringResource, quantity: Int): String {...}

@Composable
fun pluralStringResource(resource: PluralStringResource, quantity: Int, vararg formatArgs: Any): String {...}

suspend fun getPluralString(resource: PluralStringResource, quantity: Int): String

suspend fun getPluralString(resource: PluralStringResource, quantity: Int, vararg formatArgs: Any): String
```

```kotlin
Text(pluralStringResource(Res.plurals.new_message, 1, 1))
```

### Fonts

Store fonts in `composeResources/font`. TTF, OTF, TTC, and variable fonts are supported on all platforms; WOFF and WOFF2 on web and macOS only.

```kotlin
@Composable
fun Font(
    resource: FontResource,
    weight: FontWeight = FontWeight.Normal,
    style: FontStyle = FontStyle.Normal
): Font
```

```kotlin
val interFont = FontFamily(
    Font(Res.font.Inter_24pt_Regular, FontWeight.Normal),
    Font(Res.font.Inter_24pt_SemiBold, FontWeight.Bold),
)
```

Because `Font` is a composable, dependent components such as `TextStyle` and `Typography` must also be composable.

### Raw files

Raw files go in `composeResources/files` with any hierarchy:

```kotlin
suspend fun readBytes(path: String): ByteArray
```

```kotlin
var bytes by remember {
    mutableStateOf(ByteArray(0))
}
LaunchedEffect(Unit) {
    bytes = Res.readBytes("files/myDir/someFile.bin")
}
Text(bytes.decodeToString())
```

Convert byte arrays into images (bitmap: JPEG, PNG, BMP, WEBP; or XML vector); SVG to `Painter` on every platform except Android:

```kotlin
// bytes = Res.readBytes("files/example.png")
Image(bytes.decodeToImageBitmap(), null)

// bytes = Res.readBytes("files/example.xml")
Image(bytes.decodeToImageVector(LocalDensity.current), null)

// bytes = Res.readBytes("files/example.svg")
Image(bytes.decodeToSvgPainter(LocalDensity.current), null)
```

### Generated maps for resources and string IDs

```kotlin
val Res.allDrawableResources: Map<String, DrawableResource>
val Res.allStringResources: Map<String, StringResource>
val Res.allStringArrayResources: Map<String, StringArrayResource>
val Res.allPluralStringResources: Map<String, PluralStringResource>
val Res.allFontResources: Map<String, FontResource>
```

```kotlin
Image(painterResource(Res.allDrawableResources["compose_multiplatform"]!!), null)
```

### Resources as Android assets

Starting with Compose Multiplatform 1.7.0, all multiplatform resources are packed into Android assets, enabling Android Studio previews for composables in Android source sets and direct access from WebViews and media players via `Res.getUri("files/index.html")`.

```kotlin
// androidMain/kotlin/com/example/webview/App.kt
@OptIn(ExperimentalResourceApi::class)
@Composable
@Preview
fun App() {
    MaterialTheme {
        val uri = Res.getUri("files/webview/index.html")

        // Adding a WebView inside AndroidView with layout as full screen.
        AndroidView(factory = {
            WebView(it).apply {
                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
            }
        }, update = {
            it.loadUrl(uri)
        })
    }
}
```

### Accessing resources from external libraries

`Res.getUri()` returns a platform-specific absolute path that external libraries can use:

```kotlin
val uri = Res.getUri("files/my_video.mp4")
```

### Remote files

Only files that are part of the application are considered resources. Load remote files with libraries such as Compose ImageLoader, Kamel, or Ktor client, and convert manually downloaded bytes with the decoding functions above.

### Using Java resources

Java resources do not get generated accessors, multimodule support, or localization. With Compose Multiplatform 1.7.0 the resources API in the `compose.ui` package is deprecated; to keep working with Java resources, copy this implementation into your project:

```kotlin
@Composable
internal fun painterResource(
    resourcePath: String
): Painter = when (resourcePath.substringAfterLast(".")) {
    "svg" -> rememberSvgResource(resourcePath)
    "xml" -> rememberVectorXmlResource(resourcePath)
    else -> rememberBitmapResource(resourcePath)
}

@Composable
internal fun rememberBitmapResource(path: String): Painter {
    return remember(path) { BitmapPainter(readResourceBytes(path).decodeToImageBitmap()) }
}

@Composable
internal fun rememberVectorXmlResource(path: String): Painter {
    val density = LocalDensity.current
    val imageVector = remember(density, path) { readResourceBytes(path).decodeToImageVector(density) }
    return rememberVectorPainter(imageVector)
}

@Composable
internal fun rememberSvgResource(path: String): Painter {
    val density = LocalDensity.current
    return remember(density, path) { readResourceBytes(path).decodeToSvgPainter(density) }
}

private object ResourceLoader
private fun readResourceBytes(resourcePath: String) =
    ResourceLoader.javaClass.classLoader.getResourceAsStream(resourcePath).use { it.readAllBytes() }
```

## Notes

- The Kotlin Multiplatform IDE plugin supports Emmet-like shorthand in string XML (for example `test{Example}` expands to `<string name="test">Example</string>`; `1s` / `2d` expand to `%1$s` / `%2$d`; `string-array` / `sa` / `p.test` generate arrays and plurals).
- Android Studio previews of multiplatform composables work only in Android source sets and require one of AGP 8.5.2, 8.6.0-rc01, or 8.7.0-alpha04 (as stated by the docs for 1.7.0). This is the CMP 1.7.0-era statement; since CMP 1.10 the AndroidX `@Preview` works in common code too (an Android target is still required), see previews.md.
- The official snippet calls readAllBytes() without closing the stream; it is wrapped in use { } here so the InputStream is closed even on exceptions.
- Preloading, automatic font fallback, and caching for web targets are covered in the web-resources page.
- `painterResource` here is the `org.jetbrains.compose.resources` function taking a `DrawableResource`; it is not the androidx `painterResource(id: Int)` documented in android-compose-ui (common `androidx.compose` API belongs to that skill).

## Related

- [Setup and configuration for multiplatform resources](./resources-setup.md)
- [Manage local resource environment](./resource-environment.md)
- [Handling web resources](./web-resources.md)
- [Localizing strings](./localize-strings.md)
