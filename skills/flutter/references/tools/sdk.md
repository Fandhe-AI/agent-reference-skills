---
source: https://docs.flutter.dev/tools/sdk
---

# Flutter SDK overview

The Flutter SDK has the packages and command-line tools that you need to develop Flutter apps across platforms.

## Signature / Usage

```console
$ flutter/bin/flutter --version
$ flutter/bin/dart --version
```

The `flutter` CLI tool is `flutter/bin/flutter`; the `dart` CLI tool is available with the Flutter SDK at `flutter/bin/dart`.

## What's in the Flutter SDK

- Dart SDK
- Heavily optimized, mobile-first 2D rendering engine with excellent support for text
- Modern react-style framework
- Rich set of widgets implementing Material Design and iOS styles
- APIs for unit and integration tests
- Interop and plugin APIs to connect to the system and 3rd-party SDKs
- Headless test runner for running tests on Windows, Linux, and Mac
- Flutter DevTools for testing, debugging, and profiling your app
- `flutter` and `dart` command-line tools for creating, building, testing, and compiling your apps

## Notes

- SDK support for Flutter developer tools: the IDE tooling for Flutter (Android Studio and IntelliJ plugins, VS Code extensions) supports Flutter SDK versions going back two years. Tools might still function with older SDKs but will no longer provide fixes for issues specific to those versions.
- "react-style" describes the declarative framework design; it is unrelated to the React library.

## Related

- [flutter: The Flutter command-line tool](./flutter-cli.md)
- [Flutter and Dart DevTools](./devtools.md)
