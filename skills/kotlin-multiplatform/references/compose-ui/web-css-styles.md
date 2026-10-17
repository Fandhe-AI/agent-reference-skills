---
source: https://kotlinlang.org/docs/multiplatform/compose-css-styles.html
---

# Setting up the viewport

Compose Multiplatform for web uses `ComposeViewport` to render the UI onto an HTML canvas. It does not inject global CSS styles, so you must apply explicit CSS to the host container; otherwise the canvas may not resize correctly or fill the intended space.

## Signature / Usage

A standard `styles.css` to fill the entire screen:

```css
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
```

Initialize the entry point in the `main` function of the web source set:

```kotlin
@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    ComposeViewport(viewportContainerId = "webApp") {
        App()
    }
}
```

## Notes

- Deprecated: `CanvasBasedWindow` automatically inserted CSS styles into the page's HTML elements to force the canvas to fill the browser window; `ComposeViewport` instead relies on standard CSS-based layout management, which makes embedding Compose into existing web layouts easier.
- The web entry point requires the `ExperimentalComposeUiApi` opt-in.
- Distance line: Kotlin/Wasm and Kotlin/JS language and tooling topics belong to the kotlin skill; this page covers only the Compose Multiplatform viewport setup.

## Related

- [Native application entry points](./entry-points.md)
- [Handling web resources](../compose-resources/web-resources.md)
