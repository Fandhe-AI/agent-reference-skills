---
source: https://docs.flutter.dev/platform-integration/web/initialization
---

# Flutter web app initialization

How Flutter web apps are initialized and how to customize it via `flutter_bootstrap.js` and `_flutter.loader`.

## Signature / Usage

`flutter build web` produces `flutter_bootstrap.js` in `build/web`. Reference it from `web/index.html`:

```html
<html>
  <body>
    <script src="flutter_bootstrap.js" async></script>
  </body>
</html>
```

Or inline it with the `{{flutter_bootstrap_js}}` template token (replaced when `index.html` is copied to `build/web`):

```html
<html>
  <body>
    <script>
      {{flutter_bootstrap_js}}
    </script>
  </body>
</html>
```

Minimal custom `web/flutter_bootstrap.js` (needs the `{{flutter_js}}` token, the `{{flutter_build_config}}` token, and a call to `_flutter.loader.load()`):

```js
{{flutter_js}}
{{flutter_build_config}}

_flutter.loader.load();
```

## Template tokens

Substituted in `flutter_bootstrap.js` or `index.html`:

| Token | Replaced with |
| --- | --- |
| `{{flutter_js}}` | The JavaScript code that makes the `FlutterLoader` object available in the `_flutter.loader` global variable. |
| `{{flutter_build_config}}` | A JavaScript statement that sets metadata produced by the build process, giving the `FlutterLoader` information needed to bootstrap the app. |
| `{{flutter_service_worker_version}}` | A unique number representing the build version for custom service worker configurations (Flutter no longer generates a service worker by default). |
| `{{flutter_bootstrap_js}}` | Inlines the contents of `flutter_bootstrap.js` into `index.html`. Usable only in `index.html`, not in `flutter_bootstrap.js` itself. |

## `_flutter.loader.load()` arguments

| Name | JS type | Description |
| --- | --- | --- |
| `config` | `Object` | The Flutter configuration of your app. |
| `onEntrypointLoaded` | `Function` | Called when the engine is ready to be initialized. Receives an `engineInitializer` object as its only parameter. |

### `config` fields (all optional)

| Name | Dart type | Description |
| --- | --- | --- |
| `assetBase` | `String` | Base URL of the `assets` directory. Add when Flutter loads from a different domain or subdirectory than the web app (embedding, CDN). |
| `canvasKitBaseUrl` | `String` | Base URL from where `canvaskit.wasm` is downloaded. |
| `canvasKitVariant` | `String` | `auto` (default; optimal variant for the browser), `full` (works in all browsers), `chromium` (smaller variant using Chromium compatible APIs; use only for Chromium-based browsers). |
| `canvasKitForceCpuOnly` | `bool` | When `true`, forces CPU-only rendering in CanvasKit (no WebGL). |
| `canvasKitMaximumSurfaces` | `double` | Maximum number of overlay surfaces the CanvasKit renderer can use. |
| `debugShowSemanticsNodes` | `bool` | If `true`, visibly renders the semantics tree onscreen (debugging). |
| `entrypointBaseUrl` | `String` | Base URL of the app's entrypoint. Defaults to "/". |
| `fontFallbackBaseUrl` | `String` | Base URL for downloading fallback fonts when bundled fonts lack required glyphs. Defaults to `"https://fonts.gstatic.com/s/"`. |
| `forceSingleThreadedSkwasm` | `bool` | Forces single-threaded SkWasm mode (only impacts apps compiled with `--wasm` when WebAssembly is selected at runtime). |
| `hostElement` | `HtmlElement` | HTML Element into which Flutter renders the app. When not set, Flutter web takes over the whole page. |
| `multiViewEnabled` | `bool` | Enables multi-view mode for embedding Flutter views into host DOM elements dynamically. |
| `nonce` | `String` | A CSP nonce string applied to inline scripts and styles created by the engine. |

`forceSingleThreadedSkwasm` is useful if the environment does not support multi-threaded WASM (for example `SharedArrayBuffer` is unavailable or required security headers are missing) or for maximum browser compatibility. `false` (default) allows multi-threaded rendering when supported.

```js
_flutter.loader.load({
  config: {
    forceSingleThreadedSkwasm: true,
  },
});
```

### Config from URL query parameters

```js
{{flutter_js}}
{{flutter_build_config}}

const searchParams = new URLSearchParams(window.location.search);
const forceSt = searchParams.has('force_st');
const userConfig = forceSt ? { forceSingleThreadedSkwasm: true } : {};
_flutter.loader.load({
  config: userConfig,
});
```

## onEntrypointLoaded stages

- Loading the entrypoint script: `load` calls `onEntrypointLoaded` once the main entrypoint script has been downloaded and run. Flutter also calls it on every hot restart during development.
- Initializing the engine: the callback receives an engine initializer; `initializeEngine()` sets run-time configuration (such as `multiViewEnabled: true`) and starts the engine.
- Running the app: `initializeEngine()` returns a `Promise` resolving to an app runner with a single method `runApp()`.
- Adding or removing views: `runApp()` returns a flutter app object; in multi-view mode `addView` and `removeView` manage views from the host app.

### Progress indicator example

```js
{{flutter_js}}
{{flutter_build_config}}

const loading = document.createElement('div');
document.body.appendChild(loading);
loading.textContent = "Loading Entrypoint...";
_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    loading.textContent = "Initializing engine...";
    // If you have a `config`, pass it here. The config given to `load()`
    // is not forwarded when you supply your own `onEntrypointLoaded`.
    const appRunner = await engineInitializer.initializeEngine();

    loading.textContent = "Running app...";
    await appRunner.runApp();
  }
});
```

## Notes

- When you provide your own `onEntrypointLoaded`, the `config` passed to `_flutter.loader.load()` is not forwarded to the engine automatically. Pass the configuration to `initializeEngine()` yourself, otherwise it is silently ignored:

```js
_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    const appRunner = await engineInitializer.initializeEngine({
      // Set your run-time configuration here.
      renderer: 'canvaskit',
    });
    await appRunner.runApp();
  },
});
```

- Warning "Local variable for "serviceWorkerVersion" is deprecated. Use "{{flutter_service_worker_version}}" template token instead.": delete `var serviceWorkerVersion = null;` from `web/index.html`.
- Warning "FlutterLoader.loadEntrypoint is deprecated. Use FlutterLoader.load instead.": occurs when an older `web/index.html` uses `_flutter.loader.loadEntrypoint()`. With default initialization, replace the legacy script block with `<script src="flutter_bootstrap.js" async></script>`; with custom logic, call `_flutter.loader.load()` instead.
- This is the Flutter web loader (`_flutter.loader`), unrelated to Next.js / React bootstrapping (nextjs-app, react skills).

## Related

- [Adding Flutter to any web application](./embedding-flutter-web.md)
- [Wasm](./wasm.md)
- [Web FAQ](./web-faq.md)
