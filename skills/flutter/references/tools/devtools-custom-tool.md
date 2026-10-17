---
source: https://docs.flutter.dev/tools/devtools/custom-tool
---

# Build custom tooling in Flutter and Dart DevTools

With the Dart & Flutter DevTools extensions framework, you can build developer tooling tightly integrated with the existing DevTools suite. Extensions are built using Flutter web and shipped as part of a pub package. Requirements: Flutter SDK >= 3.17 and Dart SDK >= 3.2.

## Signature / Usage

Add the `DevToolsExtension` widget in `lib/main.dart` of the extension web app:

```dart
import 'package:devtools_extensions/devtools_extensions.dart';
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const FooDevToolsExtension());
}

class FooDevToolsExtension extends StatelessWidget {
  const FooDevToolsExtension({super.key});

  @override
  Widget build(BuildContext context) {
    return const DevToolsExtension(
      child: Placeholder(), // Build your extension here
    );
  }
}
```

`DevToolsExtension` initializes all extensions required to interact with DevTools. Globals available anywhere in the extension web app: `extensionManager` (interacting with DevTools or the extensions framework), `serviceManager` (the connected VM service, if present), `dtdManager` (the Dart Tooling Daemon, if present).

## How it works

If a user depends on a package that provides an extension (for example `package:foo`), DevTools adds a "Foo" tab. Supported tools: companion tools for existing packages, new tools shipped as their own package, tools interacting with a running application, with project files opened in the IDE, or with the Analysis server. Users can use the tool in the browser, embedded in their IDE, and discover it from supported IDEs.

## Package hierarchy

Standalone extension (the package is added as a dev_dependency):

```yaml
my_new_tool
  extension/
    devtools/
      build/
        ...  # pre-compiled output of the Flutter web app under lib/
      config.yaml
  lib/  # source code for your extension Flutter web app
    src/
      ...
```

```console
flutter create --template app --platforms web my_new_tool
```

Companion extension (source outside the pub package to keep it small):

```yaml
foo/  # formerly the repository root of your pub package
  packages/
    foo/  # your pub package
      extension/
        devtools/
          build/
            ...  # pre-compiled output of foo_devtools_extension/lib
          config.yaml
    foo_devtools_extension/
      lib/  # source code for your extension Flutter web app
```

```console
flutter create --template app --platforms web foo_devtools_extension
flutter pub add devtools_extensions
flutter pub add devtools_app_shared
```

`extension/devtools/config.yaml` (exact file and field names required):

```yaml
name: foo
version: 0.0.1
issueTracker: <link_to_your_issue_tracker.com>
materialIconCodePoint: '0xe0b1'
requiresConnection: true  # optional field - defaults to true
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `name` | string (required) | The package name for this extension; used in the extension page title bar. |
| `version` | string (required) | The extension version; used in the extension page title bar. |
| `issueTracker` | URL (required) | Target of the **Report an issue** link in the DevTools UI. |
| `materialIconCodePoint` | string (required) | Codepoint of an icon from `material/icons.dart`, used for the extension's tab. |
| `requiresConnection` | bool (optional) | Whether the extension requires a connected Dart or Flutter app; defaults to `true`. |

## Debug your extension

Option A (recommended for development): the simulated DevTools environment, enabled by `use_simulated_environment`; gives hot restart and a faster cycle. In VS Code `launch.json`:

```json
{
    "name": "foo_devtools_extension + simulated environment",
    "cwd": "packages/foo_devtools_extension",
    "request": "launch",
    "type": "dart",
    "args": [
        "--dart-define=use_simulated_environment=true"
    ],
}
```

or from the command line:

```console
flutter run -d chrome --dart-define=use_simulated_environment=true
```

Option B: a real DevTools environment. Build and copy assets, then validate:

```console
cd your_extension_web_app;
flutter pub get;
dart run devtools_extensions build_and_copy --source=. --dest=path/to/your_pub_package/extension/devtools
dart run devtools_extensions validate --package=path/to/your_pub_package
```

Then add a `path` dependency on your local package in a test project and run `pub get`. If the extension requires a running app, run the app and open DevTools from the printed URI or IDE; otherwise open the test project in a supported IDE (VS Code or IntelliJ / Android Studio) and open DevTools from there. Enable or disable the extension from the **Extensions** menu in the upper right.

## Publish

The package must be published with the expected content in `your_pub_package/extension/devtools/`. Run `validate` and `build_and_copy` as above, then:

```console
flutter pub publish
```

`pub publish` warns if `config.yaml` is missing or the `build` directory is empty.

## Notes

- Corrected from the official docs: the original command-line example uses `-dart-define` (single hyphen); the flag is `--dart-define`, as in the launch.json example above.
- The `extension/devtools/` structure must be created exactly as shown, or the extension might fail to load.
- For the up-to-date `config.yaml` spec see `extension_config_spec.md` in `flutter/devtools` (`packages/devtools_extensions`).
- This DevTools extensions framework (Flutter web, pub packages) is unrelated to Claude Code plugins and Agent Skills.

## Related

- [DevTools extensions](./devtools-extensions.md)
- [Flutter and Dart DevTools](./devtools.md)
