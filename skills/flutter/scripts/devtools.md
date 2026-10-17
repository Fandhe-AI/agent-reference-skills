---
source: https://docs.flutter.dev/tools/devtools/cli
---

# DevTools

Commands for launching Flutter and Dart DevTools from the command line and connecting them to a running app.

## Launch DevTools

Source: https://docs.flutter.dev/tools/devtools/cli

```sh
dart devtools
```

Requires `dart` on your path. Output looks like `Serving DevTools at http://127.0.0.1:9100`. To upgrade DevTools, upgrade Flutter; if `which dart` points to a Dart SDK not included in the Flutter SDK, updating that SDK does not update the Flutter version.

## Start an app to debug

Source: https://docs.flutter.dev/tools/devtools/cli

```sh
cd path/to/flutter/app
flutter run
```

A device must be connected or a simulator open. The terminal prints a DevTools URL containing a security token that changes on every run; open it in Chrome, or paste the VM service link into the **Connect** dialog.

## Open the app size tool

Source: https://docs.flutter.dev/perf/app-size

```sh
dart devtools
```

Select `Open app size tool` and upload the `*-code-size-analysis_*.json` file produced by `--analyze-size` builds (see the build and release file).

## Add DevTools extension packages

Source: https://docs.flutter.dev/tools/devtools/custom-tool

```sh
flutter create --template app --platforms web foo_devtools_extension
cd foo_devtools_extension
flutter pub add devtools_extensions
flutter pub add devtools_app_shared
flutter pub add material_ui
```

The official page shows these commands separately; `cd` into the extension app is added here so they run in the right project. `flutter pub add material_ui` is also added: the official extension code imports `package:material_ui/material_ui.dart` (an opt-in package as of Flutter 3.47) but never adds the dependency.
