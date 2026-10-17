---
source: https://docs.flutter.dev/deployment/web
---

# Build and release a web app

Prepare and release a web app. During development `flutter run -d chrome` builds a debug version; this page covers release builds.

## Signature / Usage

```console
flutter build web
flutter build web --wasm
```

Output (including assets) goes to the `/build/web` directory. To validate the release build, launch a web server (for example `python -m http.server 8000`, or the `dhttpd` package), serve `/build/web`, and open `localhost:8000`.

### Additional build flags

Pass `--profile` or `--debug` to `flutter build web`. Profile builds are specialized for performance profiling with Chrome DevTools; debug builds can configure dart2js to respect assertions and change the optimization level (`-O` flag).

### Source maps

```console
flutter build web --source-maps
```

Creates separate `.js.map` or `.wasm.map` files (or both) in `build/web` without adding binary overhead to the compiled output.

### Deploying to Firebase Hosting

```console
npm install -g firebase-tools
firebase experiments:enable webframeworks
firebase init hosting
firebase deploy
```

During `firebase init hosting`: answer yes to using a web framework; in an empty directory choose `Flutter Web`; choose the hosting source directory (possibly an existing Flutter app); select a region; choose whether to set up automatic builds and deploys with GitHub. `firebase deploy` automatically runs `flutter build web --release`.

## Minification

The compiler reduces compiled code size by tree shaking and by renaming symbols to shorter strings:

| Type of web app build | Code minified? | Tree shaking performed? |
| --- | --- | --- |
| debug | No | No |
| profile | No | Yes |
| release | Yes | Yes |

## Notes

- Exclude source maps from public hosting: standard deployment tools upload all files in `build/web/`. If source maps are public, browser DevTools download them automatically, exposing un-minified symbol names, class hierarchies, and local file paths. Upload `.map` files to your private error-monitoring service (such as Sentry or Datadog) during CI/CD and exclude `*.map` from public hosting (for example `"ignore": ["**/*.map"]` in `firebase.json`, or strip them before deployment).
- WebAssembly builds can render with multiple threads; multi-threaded rendering requires the server to return `Cross-Origin-Embedder-Policy: credentialless` (or `require-corp`) and `Cross-Origin-Opener-Policy: same-origin`. Without these headers the app runs single-threaded (see `forceSingleThreadedSkwasm` on the initialization page). See the Wasm page.
- The official deployment page states these headers are required for all Wasm builds; this page follows the Wasm page, which scopes them to multi-threaded rendering.
- Other hosting options named in the source: GitHub Pages and Google Cloud Hosting.
- `npm install -g firebase-tools` modifies the global npm environment; run it in a disposable or trusted environment.
- This covers deploying Flutter web builds (static output in `build/web`); it is distinct from Vercel (vercel skill) and Next.js (nextjs-app skill) deployment.

## Related

- [Wasm](./wasm.md)
- [Customize app initialization](./initialization.md)
- [Web images](./web-images.md)
- [Adding Flutter to any web application](./embedding-flutter-web.md)
- [Web FAQ](./web-faq.md)
