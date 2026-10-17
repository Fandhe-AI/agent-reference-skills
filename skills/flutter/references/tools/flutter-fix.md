---
source: https://docs.flutter.dev/tools/flutter-fix
---

# Flutter fix

A tool that ships as part of Flutter and suggests changes to clean up deprecated APIs from your codebase. It is available from the command line (`dart fix`) and integrated into the IDE plugins for Android Studio and Visual Studio Code.

## Signature / Usage

See a full list of available changes:

```console
$ dart fix --dry-run
```

Apply all changes in bulk:

```console
$ dart fix --apply
```

## Applying individual fixes

- IntelliJ and Android Studio: when the analyzer detects a deprecated API, a light bulb appears on that line of code. Clicking it displays the suggested fix that updates the code to the new API.
- VS Code: when the analyzer detects a deprecated API it presents an error. Hover over the error and click **Quick Fix** (a filtered list showing only fixes), or put the caret in the code and click the light bulb icon, or press **Command+.** on macOS / **Control+.** elsewhere (a list of all actions, including refactors).

## Notes

- These automated updates are called quick-fixes in IntelliJ and Android Studio, and code actions in VS Code.
- For more on Flutter deprecations, see "Deprecation lifetime in Flutter" on the Flutter blog.

## Related

- [Code formatting](./formatting.md)
- [flutter: The Flutter command-line tool](./flutter-cli.md)
