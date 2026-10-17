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

A browser that supports WasmGC is required. Chromium and V8 support WasmGC since version 119. Chrome on iOS uses WebKit, which does not yet support WasmGC. The source links WebKit bug 247394 for WasmGC support, while the Safari entry below states WasmGC is now supported but blocked by WebKit bug 267291 (Flutter Wasm renderer compatibility).

- Firefox: versions 120 and later were previously able to run Flutter/Wasm but have a bug blocking compatibility with Flutter's Wasm renderer.
- Safari: now supports WasmGC but has a similar bug blocking compatibility with Flutter's Wasm renderer.

## Compatible JS interop libraries

Code using `dart:html` or `package:js` cannot compile to Wasm. Use:

- `package:web`, which replaces `dart:html` (and other web libraries)
- `dart:js_interop`, which replaces `package:js` and `dart:js`

Be aware of runtime differences in JS interop types (`is` / `as` type casts and Zone propagation in callbacks).

### Diagnosing Wasm compilation errors

1. Early detection: `flutter build web` without `--wasm` still performs a Wasm dry run and emits a non-fatal warning:

```console
Wasm dry run failed:
Found incompatibilities with WebAssembly.

package:my_app/main.dart 1:1 - dart:html unsupported (0)
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
- The source describes WebKit WasmGC status inconsistently (iOS Chrome entry vs. Safari entry); both are kept with their linked bugs.
- Flutter web compiled to Wasm cannot run on the iOS version of any browser: all browsers on iOS must use WebKit.
- Wasm compilation does not use deferred loading by default. Deferred loading in Wasm is experimental, enabled with `--enable-wasm-deferred-loading`. The source states it is available on the Flutter main branch and "will become generally available later this year in the 3.50 flutter stable release"; it is not part of Flutter 3.47.7 stable.
- Flutter Wasm here means Dart compiled with dart2wasm for Flutter web; it is distinct from Rust-to-Wasm toolchains (see the rust skill).

## Related

- [Flutter web app initialization](./initialization.md)
- [Build and release a web app](./deploy-web.md)
- [Web FAQ](./web-faq.md)
