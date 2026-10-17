---
source: https://kotlinlang.org/docs/multiplatform/compose-web-resources.html
---

# Handling web resources

Preloading resources using browser features and the preload API, automatic font fallback, and caching of web resources.

## Signature / Usage

Web resources (fonts, images) are loaded asynchronously via the Fetch API, which can cause visual glitches such as FOUT or placeholders. Preload with browser features, the Compose Multiplatform preload API, or both.

### Preload using browser features

Use a `<link>` tag with the `rel="preload"` attribute:

1. Build the web distribution: `./gradlew :shared:wasmJsBrowserDistribution`
2. Find the resource in the generated `dist` directory and save its path.
3. In `wasmJsMain/resources/index.html`, add a `<link>` inside `<head>` with `href` set to the resource path.

```html
<link rel="preload" href="./composeResources/username.shared.generated.resources/font/FiraMono-Regular.ttf" as="fetch" type="font/ttf" crossorigin/>
```

### Preload using the Compose Multiplatform preload API

Browser-preloaded resources are cached as raw bytes that still need conversion to `FontResource` / `DrawableResource`. Compose Multiplatform has its own internal cache for these higher-level representations, which can be preloaded. Compose Multiplatform 1.8.0 introduced an experimental API for fonts and images on web targets: `preloadFont()`, `preloadImageBitmap()`, and `preloadImageVector()`.

To control which fallback font is used, specify it manually with `FontFamily.Resolver.preload()`. Web targets support TTF, OTF, TTC, variable, and WOFF/WOFF2 fonts.

```kotlin
@OptIn(ExperimentalComposeUiApi::class, ExperimentalResourceApi::class)
@Composable
fun App() {
    val icon by preloadImageVector(Res.drawable.heavy_vector_icon)

    if (icon != null) {
        MainScreen()
    } else {
        Box(modifier = Modifier.fillMaxSize()) {
            CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
        }
    }
}

@Composable
fun MainScreen() {
    // The icon is loaded from the cache
    Image(painter = painterResource(Res.drawable.heavy_vector_icon), contentDescription = null)
}
```

### Automatic font fallback

By default, characters not covered by loaded fonts show as replacement glyphs (tofu). Starting with 1.12.0, Compose Multiplatform monitors unresolved characters during rendering and downloads the required Noto font subsets on demand, then recomposes the affected text. Tofu may briefly appear during the download. For CJK characters, the font variant is selected from the browser's language setting.

### Caching web resources

Compose Multiplatform uses the Web Cache API to cache successful responses and avoid redundant HTTP revalidations. The cache is cleared globally on every app launch and page refresh, to avoid outdated or incompatible resources across sessions. Each request is guarded by a per-resource mutex: parallel requests for different resources are allowed, duplicate requests for the same path are serialized.

## Notes

- Experimental: the preload API (`preloadFont()`, `preloadImageBitmap()`, `preloadImageVector()`), automatic font fallback (since 1.12.0), and web resource caching.
- Web-only; `wasmJs` browser targets. Kotlin/Wasm and Kotlin/JS language topics belong to the kotlin skill.

## Related

- [Setup and configuration for multiplatform resources](./resources-setup.md)
- [Using multiplatform resources in your app](./resources-usage.md)
- [Manage local resource environment](./resource-environment.md)
- [Working with RTL languages](./rtl-languages.md)
