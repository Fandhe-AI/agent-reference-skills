---
source: https://docs.flutter.dev/deployment/web
---

# Build and release a web app

Prepare and release a web app. During development `flutter run -d chrome` builds a debug version; this page covers release builds, content hashing and HTTP caching, production Wasm deployment, Firebase Hosting, and the mobile-browser viewport.

## Signature / Usage

```console
flutter build web
```

To build with WebAssembly (Wasm), pass the `--wasm` flag:

```console
flutter build web --wasm
```

Output (including assets) goes to the `/build/web` directory. To validate the release build, launch a web server (for example `python -m http.server 8000`, or the `dhttpd` package), serve `/build/web`, and open `localhost:8000`.

### Additional build flags

Pass `--release` (default), `--profile`, or `--debug` to `flutter build web`. To override the default compiler optimization level, pass `--optimization-level=LEVEL` (`-O0` through `-O4` for `dart2wasm`; `-O1` through `-O4` for `dart2js`).

### Source maps

```console
flutter build web --source-maps
```

Creates separate `.js.map` or `.wasm.map` files (or both) in `build/web` without adding binary overhead to the compiled output.

### Web content hashing

Requires Flutter 3.50 or later. Pass `--web-content-hash` to enable automatic content-based cache busting across deployments:

```console
flutter build web --wasm --web-content-hash
```

### precache_manifest.json

When `--web-content-hash` is enabled, `flutter build web` writes `build/web/precache_manifest.json` (a bill of materials) that custom PWA service workers or Workbox pipelines can consume:

```json
{
  "version": 1,
  "entries": [
    {
      "url": "flutter_bootstrap.js",
      "hash": "a1b2c3d4",
      "size": 10432,
      "urlHashed": false
    },
    {
      "url": "main.dart.f215ce97.wasm",
      "hash": "f215ce97",
      "size": 1842104,
      "urlHashed": true
    }
  ]
}
```

Pass `revision: entry.urlHashed ? null : entry.hash` to Workbox so URL-hashed files aren't double-cached with query parameters.

### Deploy WebAssembly in production

`flutter build web --wasm` produces a dual-target bundle in `build/web`: `main.dart.wasm` and its JS runtime module `main.dart.mjs` (`dart2wasm`), plus `main.dart.js` (`dart2js`) as the fallback. At startup `flutter_bootstrap.js` probes the browser's WebAssembly capabilities and falls back to `main.dart.js` when the browser lacks the required Wasm features or isn't enabled in `wasmAllowList`.

Inline the bootstrap script in `web/index.html` by replacing the external `<script src="flutter_bootstrap.js" async></script>` tag with an inline `<script>` containing `{{flutter_bootstrap_js}}`. Trim initial bundle weight with `--enable-wasm-deferred-loading`, and self-host engine binaries with `--no-web-resources-cdn`.

To serve assets from a CDN, configure `assetBase` and `entrypointBaseUrl` in `_flutter.loader.load({ config: ... })` (and `canvasKitBaseUrl` when self-hosting engine binaries), or reference the `$FLUTTER_STATIC_ASSETS_URL` placeholder in `web/index.html` and pass the CDN prefix with the trailing `/`:

Adapted (not in the official docs): the command is assembled from the page's prose (flag, example URL and trailing `/`).

```console
flutter build web --static-assets-url=https://cdn.example.com/
```

### Deploying to Firebase Hosting

Adapted (not in the official docs): the four commands are combined from separate blocks of the page.

```console
npm install -g firebase-tools
firebase experiments:enable webframeworks
firebase init hosting
firebase deploy
```

During `firebase init hosting`: answer yes to using a web framework; in an empty directory choose `Flutter Web`; choose the hosting source directory (possibly an existing Flutter app); select a region; choose whether to set up automatic builds and deploys with GitHub. `firebase deploy` automatically runs `flutter build web --release`.

### Mobile browser viewport

To render edge-to-edge on mobile browsers and populate `SafeArea` and `MediaQuery.paddingOf` from the browser's CSS `env(safe-area-inset-*)` insets, add `viewport-fit=cover` to `web/index.html` (included as a commented-out option in newly created templates):

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

## Options / Props

Build modes:

| Build mode | WebAssembly (`--wasm`) | JavaScript (default) | Purpose |
| --- | --- | --- | --- |
| `--release` (default) | `-O2` (minified, stripped symbols) | `-O4` (minified) | Production deployment |
| `--profile` | `-O2 --no-strip-wasm` (readable function and type names) | `-O4` (unminified symbols) | Performance and memory profiling |
| `--debug` | `-O0` (assertions enabled) | `-O1` (assertions enabled) | Development testing |

Minification:

| Type of web app build | Code minified? | Tree shaking performed? |
| --- | --- | --- |
| debug | No | No |
| profile | No | Yes |
| release | Yes | Yes |

Artifacts with `--web-content-hash` (an 8-character truncated SHA-256 content hash is embedded in compiled entrypoints and all files under `build/web/assets/**`, and the hashed paths are recorded in `flutter_bootstrap.js` as `_flutter.buildConfig`):

| Artifact group | Files in `build/web` | Recommended `Cache-Control` |
| --- | --- | --- |
| Hashed immutable files | `main.dart.<hash>.js`, `main.dart.<hash>.wasm`, `main.dart.<hash>.mjs` (plus `.js.map` and `.mjs.map`), and all files under `assets/**` (`AssetManifest.<hash>.bin`, `FontManifest.<hash>.json`, `NOTICES.<hash>`, fonts, images, and `shaders/**`) | `public, max-age=31536000, immutable` |
| Unhashed bootstrap and root files | `index.html`, `flutter_bootstrap.js`, `flutter.js`, `manifest.json`, `version.json`, `404.html`, `icons/**`, bundled `canvaskit/**` (with `--no-web-resources-cdn`), and `main.dart.wasm.map` (with `--source-maps`) | `no-cache` (or `max-age=0, must-revalidate`) |

Server configuration for production Wasm:

| Need | Configuration |
| --- | --- |
| Multi-threaded rendering | `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: credentialless` (or `require-corp`) on the document response (enables `SharedArrayBuffer`) |
| Wasm MIME type | `Content-Type: application/wasm` for all `.wasm` files (`main.dart.wasm` and self-hosted engine binaries) |
| Static pre-compression | Brotli (`br`) and Gzip (`gzip`) for `.wasm`, `.mjs`, `.js`, fonts, and `assets/**` manifests |

## Notes

- Exclude source maps from public hosting: standard deployment tools upload all files in `build/web/`. If source maps are public, browser DevTools download them automatically, exposing un-minified symbol names, class hierarchies, and local file paths. Upload `.map` files to your private error-monitoring service (such as Sentry or Datadog) during CI/CD and exclude `*.map` from public hosting (for example `"ignore": ["**/*.map"]` in `firebase.json`, or strip them before deployment).
- `--web-content-hash` does not yet support deferred imports (`deferred as`) in either JavaScript (`dart2js`) or WebAssembly (`dart2wasm` / `--enable-wasm-deferred-loading`) builds. The page also states `--enable-wasm-deferred-loading` is incompatible with `--web-content-hash`.
- Overlay deployments: when release `N` is deployed, open tabs still running `N-1` may lazily fetch assets carrying `N-1` hashes. Retain at least the previous release's hashed `main.dart.*` and `assets/**` files alongside release `N` (or prune old hashes after a 24-72 hour grace window), update `index.html` and `flutter_bootstrap.js` atomically last, and exclude `/assets/**`, `/canvaskit/**`, `/icons/**`, and `/main.dart.*` from SPA `/index.html` catch-all rewrites so missing assets return a genuine `404` instead of `200 text/html`.
- With `--no-web-resources-cdn`, Flutter's rendering engine files are bundled into `build/web/canvaskit/` instead of fetched from `gstatic.com`; with `--web-content-hash` those files stay unhashed and need revalidating cache headers. With `--enable-wasm-deferred-loading` and custom asset routing, provide a `wasmDeferredModulesLoader` callback to fetch deferred `.wasm` modules from the CDN.
- Render an HTML loading shell in `web/index.html` (or update the DOM from the `onEntrypointLoaded` callback in `flutter_bootstrap.js`) so users get feedback while the engine initializes. Release builds tree-shake font icons automatically (`--no-tree-shake-icons` only when debugging dynamic icon code points).
- Adapted from the official docs: the `--static-assets-url` command line is assembled from the page's prose (flag, example URL and trailing-`/` requirement are verbatim), and the Firebase commands are combined from separate blocks.
- For a complete `firebase.json` caching example see the Web FAQ page ("How do I configure my cache headers?").
- An existing app whose `web/index.html` already has `viewport-fit=cover` is honored in Flutter 3.50 and later (the app renders behind cutouts unless wrapped in `SafeArea`); see the viewport-fit-cover breaking change page. In 3.50 and later, route strings passed to `SystemNavigator.routeInformationUpdated` preserve percent-encoded sequences (such as `%2F`, `%26`, `%23`, `%20`) in the browser URL bar and history instead of decoding them with `Uri.decodeComponent`.
- Other hosting options named in the source: GitHub Pages and Google Cloud Hosting.
- `npm install -g firebase-tools` modifies the global npm environment; run it in a disposable or trusted environment.
- This covers deploying Flutter web builds (static output in `build/web`); it is distinct from Vercel (vercel skill) and Next.js (nextjs-app skill) deployment.
- Source: https://docs.flutter.dev/deployment/web (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Wasm](./wasm.md)
- [Customize app initialization](./initialization.md)
- [Web images](./web-images.md)
- [Adding Flutter to any web application](./embedding-flutter-web.md)
- [Web FAQ](./web-faq.md)
- [Web viewport-fit=cover SafeArea support](../release/viewport-fit-cover-safe-area.md)
