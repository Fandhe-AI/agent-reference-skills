---
source: https://docs.flutter.dev/packages-and-plugins/using-packages
---

# Using packages

Flutter supports using shared packages contributed by other developers to the Flutter and Dart ecosystems. This page discusses using both packages and plugins. To write a new package, see Developing packages & plugins.

## Signature / Usage

Add a dependency from inside the project directory, then import it in Dart code.

```console
flutter pub add english_words
```

```yaml
dependencies:
  url_launcher: ^5.4.0    # Good, any version >= 5.4.0 but < 6.0.0
  image_picker: '5.4.3'   # Not as good, only version 5.4.3 works.
```

Remove a dependency with `flutter pub remove english_words`.

### Dependency declaration

Add under `dependencies` in `pubspec.yaml`, then run `flutter pub get` (terminal), **Get Packages** (VS Code) or **Pub get** (Android Studio/IntelliJ):

```yaml
dependencies:
  flutter:
    sdk: flutter
  url_launcher: ^5.4.0
```

Version constraints (ranged, or caret syntax which means the same):

```yaml
dependencies:
  url_launcher: '>=5.4.0 <6.0.0'
  collection: '^5.4.0'
```

### Conflict resolution

If two packages depend on different incompatible versions of the same package but actually use it compatibly, force a version in the app's `pubspec.yaml`:

```yaml
dependencies:
  some_package:
  another_package:
dependency_overrides:
  url_launcher: '5.4.0'
```

For an Android-specific library such as `guava`, add the override in Gradle build logic instead (`android/app/build.gradle.kts` for Kotlin, `android/app/build.gradle` for Groovy):

```kotlin
configurations.all {
    resolutionStrategy {
        force("com.google.guava:guava:28.0-android")
    }
}
```

```groovy
configurations.all {
    resolutionStrategy {
        force 'com.google.guava:guava:28.0-android'
    }
}
```

### Dependencies on unpublished packages

```yaml
dependencies:
  packageA:
    path: ../packageA/          # path dependency (relative to pubspec.yaml, or absolute)
  packageB:
    git:
      url: https://github.com/flutter/packageA.git   # git dependency
  packageC:
    git:
      url: git@github.com:flutter/packageA.git       # git over SSH
  packageD:
    git:
      url: https://github.com/flutter/packages.git
      path: packages/packageA                         # package in a folder
```

Use the `ref` argument to pin the dependency to a specific git commit, branch, or tag.

### Example: english_words

```dart
import 'package:english_words/english_words.dart';
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: DemoPage());
  }
}

class DemoPage extends StatelessWidget {
  const DemoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text(generateWordPairs().first.asPascalCase)),
    );
  }
}
```

### Install AI skills from packages

Many `pub.dev` packages bundle official **package skills** that teach AI coding assistants how to use their APIs and follow recommended patterns. If your project dependencies include skills, install them into your local workspace:

```bash
dart run skills@ get
```

## Notes

- As of Flutter 3.47 the stylized widget libraries are available as standalone packages (opt-in; in-framework package:flutter/material.dart is not yet deprecated). The examples import package:material_ui/material_ui.dart, which requires adding material_ui as a dependency (e.g. flutter pub add material_ui); otherwise use package:flutter/material.dart.
- If a package brings platform-specific code (Kotlin/Java for Android, Swift/Objective-C for iOS), that code must be built into your app. Hot reload and hot restart only update the Dart code, so a full restart might be required to avoid errors like `MissingPluginException`.
- To upgrade a package, run `flutter pub upgrade`: it retrieves the highest version allowed by the constraint in `pubspec.yaml` and records it in `pubspec.lock`. This is a different command from `flutter upgrade` or `flutter update-packages`, which both update Flutter itself.
- CocoaPods doesn't currently offer dependency override functionality.
- Package skills here are the Dart/pub.dev mechanism (`dart run skills@ get`); distinct from Claude Code Agent Skills (SKILL.md) documented by the anthropic-claude-code-extend skill.

## Related

- [Developing packages & plugins](./developing-packages.md)
- [Package dependency management](./dependency-management.md)
