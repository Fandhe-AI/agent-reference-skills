---
source: https://docs.flutter.dev/platform-integration/web/building
---

# Building a web application with Flutter

Overview of how to configure, run, and build a web application using Flutter. Requires the Flutter SDK and a web browser.

## Signature / Usage

```console
$ flutter create my_app
$ flutter create . --platforms web
$ flutter run -d chrome
$ flutter run -d chrome --wasm
$ flutter build web
$ flutter build web --wasm
```

`flutter create . --platforms web` creates a `web/` directory containing the web assets used to bootstrap and run the app.

## Run

- Select Chrome as the target device (`-d chrome`). Use the `edge` device type on Windows, or `web-server` to navigate to a local URL in the browser of your choice.
- Pass `--wasm` to run with WebAssembly.

### Disable hot reload in VS Code

Update `launch.json` with the flag `--no-web-experimental-hot-reload`:

```plaintext
"configurations": [
    ...
    {
      "name": "Flutter for web (hot reload disabled)",
      "type": "dart",
      "request": "launch",
      "program": "lib/main.dart",
      "args": [
        "-d",
        "chrome",
        "--no-web-experimental-hot-reload",
      ]
    }
  ]
```

### Disable hot reload from the command line

```console
flutter run -d chrome --no-web-experimental-hot-reload
```

### DartPad

Hot reload is also enabled in DartPad with a "Reload" button. The feature is only available if Flutter is detected in the running application.

## Build

`flutter build web` generates a release build; `flutter build web --wasm` builds with WebAssembly. Both populate `build/web` with built files, including an `assets` directory, which need to be served together.

## Debugging and testing

- Flutter DevTools: debugging, logging, Flutter inspector.
- Chrome DevTools: event timeline, performance analysis (use a profile build).
- Testing: widget tests or integration tests; integration tests can run in a browser.

## Notes

- Hot reload on the web: as of the Flutter 3.35 release, hot reload is enabled by default on the web. Hot restart is still available. Issues are filed with the Web Hot Reload issue template in the Dart SDK repository.
- For Wasm compile errors, see "Diagnosing Wasm compilation errors" in the Wasm page.
- Flutter web (Dart) build and dev-server workflow is distinct from the Next.js / React toolchains (nextjs-app, react skills) and from Vercel deployment (vercel skill).

## Related

- [Wasm](./wasm.md)
- [Web development configuration file](./web-dev-config-file.md)
- [Build and release a web app](./deploy-web.md)
- [Web FAQ](./web-faq.md)
