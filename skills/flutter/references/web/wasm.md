---
source: https://docs.flutter.dev/platform-integration/web/wasm
---

# Support for WebAssembly (Wasm)

Flutter and Dart support WebAssembly as a compilation target when building applications for the web.

## Signature / Usage

```console
$ flutter run -d chrome --wasm
$ flutter build web --wasm
```

Output goes to `build/web`, as with `flutter build web`.

Steps to try Wasm:

- Switch to Flutter 3.24 or higher (`flutter upgrade`).
- Use the default template sample app or an app migrated to be compatible with Wasm.
- Make sure `web/index.html` uses the latest Flutter web app initialization (Flutter 3.22 and later). To get the latest template without losing custom files, commit or back up `web/` first, generate a fresh web template in a separate directory (for example `flutter create --platforms web /tmp/web_template`), and merge only the needed parts of its `web/index.html` (and `flutter_bootstrap.js` if used) into your project's `web/`.

Enabling Wasm compilation does not use deferred loading by default. Deferred loading in Wasm is available in Flutter 3.50 and later and can be enabled with the `--enable-wasm-deferred-loading` flag:

```console
$ flutter build web --wasm --enable-wasm-deferred-loading
```

To customize how deferred `.wasm` modules are downloaded at runtime, provide a `wasmDeferredModulesLoader` callback in your Flutter web app initialization configuration.

## Production debugging

By default Wasm release builds strip debug symbols and omit source maps to minimize binary size.

- Error monitoring (recommended): `--source-maps` generates `main.dart.wasm.map` for symbolication.
- Staging or QA builds: `--no-strip-wasm` preserves Wasm function names in browser console stack traces, at an approximate 47% increase in Wasm binary size.

```console
# Generate source maps for production error tracking:
$ flutter build web --wasm --source-maps

# Preserve Wasm function names for staging/QA debugging:
$ flutter build web --wasm --no-strip-wasm
```

## Verify the app runs with Wasm

Even with `--wasm`, Flutter still compiles the application to JavaScript. If WasmGC support is not detected at runtime, the JavaScript output is used. Check the `dart2wasm` environment variable (preferred):

```dart
const isRunningWithWasm = bool.fromEnvironment('dart.tool.dart2wasm');
```

Alternatively, test the native (Wasm) number representation:

```dart
final isRunningWithWasm = identical(double.nan, double.nan);
```

## Serving headers

Flutter web WebAssembly can use multiple threads, which requires specific HTTP response headers:

| Name | Value |
| --- | --- |
| `Cross-Origin-Embedder-Policy` | `credentialless` or `require-corp` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

## Browser compatibility

In Flutter 3.50 and later, running a Flutter app compiled to WebAssembly (`dart2wasm`) requires a browser that supports WasmGC, JS String Builtins (`wasm:js-string`), and Phase 4 Exception Handling (`try_table` and `exnref`). At startup, `flutter_bootstrap.js` probes the browser's WebAssembly engine for these features and checks the `wasmAllowList` configuration before selecting the Wasm build. When a browser does not support these features or is not enabled in `wasmAllowList`, Flutter falls back to the JavaScript (`dart2js`) and CanvasKit build produced by `flutter build web --wasm`.

| Browser engine | Minimum version for Wasm | Default behavior in Flutter 3.50 (`--wasm`) | How to enable Wasm |
| --- | --- | --- | --- |
| Chromium (Chrome, Edge, Opera, Brave) | 137+ (Desktop & Android) | Runs WebAssembly (`dart2wasm`) by default; Chrome `< 137` falls back to `dart2js` + CanvasKit. | Enabled by default (`wasmAllowList.blink: true`). |
| WebKit (Safari macOS & iOS, all iOS browsers) | Safari 26.2+ (macOS & iOS 26.2+) | Falls back to `dart2js` + CanvasKit by default (`wasmAllowList.webkit: false`). | Set `wasmAllowList: { webkit: true }` in Flutter web app initialization. Safari `<= 26.1` falls back via runtime feature detection. |
| Gecko (Firefox) | Firefox 147+ | Falls back to `dart2js` + CanvasKit by default (`wasmAllowList.gecko: false`). | Set `wasmAllowList: { gecko: true }` in Flutter web app initialization. Firefox `< 147` falls back automatically. |

## Compatible JS interop libraries

Code using `dart:html` or `package:js` cannot compile to Wasm. Use:

- `package:web`, which replaces `dart:html` (and other web libraries)
- `dart:js_interop`, which replaces `package:js` and `dart:js`

Legacy Dart SDK web and JS interop libraries (`dart:html`, `dart:js`, `dart:js_util`, `dart:indexed_db`, `dart:svg`, `dart:web_audio`, `dart:web_gl`) are deprecated and planned for removal from the Dart SDK in an upcoming release; neither they nor the deprecated `package:js` are supported when compiling to Wasm.

Be aware of runtime differences in JS interop types (`is` / `as` type casts and Zone propagation in callbacks).

### Diagnosing Wasm compilation errors

1. Early detection: `flutter build web` without `--wasm` still performs a Wasm dry run (pass `--no-wasm-dry-run` to suppress it) and emits a non-fatal warning:

```console
Wasm dry run failed:
Found incompatibilities with WebAssembly.

package:my_app/main.dart 1:1 - dart:html unsupported (0)
```

In Flutter 3.50 and later you can also enforce modern JS interop across JavaScript (`dart2js` and `ddc`) builds. Pass `--no-deprecated-js-interop` to `flutter build web`, `flutter run`, `flutter drive`, or `flutter test --platform chrome`; imports of deprecated `dart:*` web libraries (and packages that import them, such as `package:js`) then fail at compile time, and `dart.library.html`, `dart.library.js`, and `dart.library.js_util` evaluate to `false` in conditional imports:

```console
$ flutter build web --no-deprecated-js-interop
```

2. Isolate the dependency tree: when `flutter build web --wasm` fails, ignore the long stack trace (for example `Target dart2wasm failed...`) and scroll up to the structured `Context` tree:

```console
Context: The unavailable library 'dart:html' is imported through these packages:

    main.dart => package:my_app => dart:html

Detailed import paths for (some of) these imports:

    main.dart => package:my_app/main.dart => dart:html
```

3. Migrate legacy imports: replace `dart:html` with `package:web`, and `dart:js` / `package:js` with `dart:js_interop`. To support both during migration, use conditional imports checking `dart.library.js_interop`:

```dart
import 'fallback.dart'
  if (dart.library.js) 'legacy_web_interop.dart'
  if (dart.library.js_interop) 'wasm_web_interop.dart';
```

## Notes

- The source suggests deleting the contents of `web/` and running `flutter create . --platforms web`; this page instead regenerates the template in a separate directory and merges it, so custom bootstrap code, JavaScript, icons and uncommitted changes in `web/` are not lost.
- Updated to Flutter 3.50 against the docs.flutter.dev Markdown twin (2026-11-14). The pre-3.50 WasmGC / WebKit bug-based compatibility text was replaced by the 3.50 browser table; deferred loading is no longer experimental in 3.50.
- Not covered here yet: the 3.50 pages on deploying Wasm in production (`/deployment/web#deploy-webassembly-in-production`), host-page `CustomEvent` messaging and User Timing API snippets at the end of the official page.
- Flutter Wasm here means Dart compiled with dart2wasm for Flutter web; it is distinct from Rust-to-Wasm toolchains (see the rust skill).

## Related

- [Flutter web app initialization](./initialization.md)
- [Build and release a web app](./deploy-web.md)
- [Web FAQ](./web-faq.md)
