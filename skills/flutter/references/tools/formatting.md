---
source: https://docs.flutter.dev/tools/formatting
---

# Code formatting

Flutter's code formatter formats your code following recommended style guidelines. Teams are often more productive with a single, shared style enforced through automatic formatting.

## Signature / Usage

```console
$ dart format path1 path2 [...]
```

## Editor support

| Editor | How |
| --- | --- |
| VS Code | Install the `Flutter` extension. Right-click in the code window and select `Format Document` (you can add a keyboard shortcut). Set `editor.formatOnSave` to `true` to format on save. |
| Android Studio and IntelliJ | Install the `Dart` plugin. macOS: <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>L</kbd>; Windows and Linux: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>L</kbd>. The **Format code on save** checkbox is on the Flutter page in **Preferences** (macOS) or **Settings** (Windows and Linux). |
| CLI | `dart format` (see the dart.dev docs on `dart format`). |

## Related

- [Flutter fix](./flutter-fix.md)
- [flutter: The Flutter command-line tool](./flutter-cli.md)
