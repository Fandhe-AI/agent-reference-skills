---
source: https://docs.flutter.dev/tools/hot-reload
---

# Hot reload

Hot reload works by injecting updated source code files into the Dart runtime. After the Dart runtime updates classes with the new versions of fields and functions, the Flutter framework automatically rebuilds the widget tree, allowing you to quickly view the effects of your changes.

## Signature / Usage

Run the app in debug mode from a supported editor or `flutter run`, edit a Dart file, then save (with hot reload on save) or enter `r` in the `flutter run` terminal. Successful output:

```console
Performing hot reload...
Reloaded 1 of 448 libraries in 978ms.
```

Enable hot reload on save in VS Code (`.vscode/settings.json`):

```json
"files.autoSave": "afterDelay",
"dart.flutterHotReloadOnSave": "all",
```

Android Studio and IntelliJ: open `Settings > Tools > Actions on Save` and select `Configure autosave options`, check `Save files if the IDE is idle for X seconds` (recommended: a small delay, for example 2 seconds); then open `Settings > Languages & Frameworks > Flutter` and check `Perform hot reload on save`.

## Hot reload vs hot restart vs full restart

| Action | Behavior | Shortcut |
| --- | --- | --- |
| Hot reload | Loads code changes into the VM or the browser and re-builds the widget tree, preserving the app state; it doesn't rerun `main()` or `initState()`. | `⌘\` in IntelliJ and Android Studio, `⌃F5` in VS Code |
| Hot restart | Loads code changes into the VM or the browser and restarts the Flutter app, losing the app state. On the web, this can restart the app without a full page refresh. | `⇧⌘\` in IntelliJ and Android Studio, `⇧⌘F5` in VS Code |
| Full restart | Restarts the iOS, Android, or web app. Takes longer because it also recompiles the Java / Kotlin / Objective-C / Swift / JavaScript code. On the web, it also restarts the Dart Development Compiler. | None; stop and start the run configuration |

## Special cases

### An app is killed

Hot reload can break when the app is killed, for example if the app was in the background for too long.

### Compilation errors

When a code change introduces a compilation error, hot reload generates an error message; correct the errors on the specified lines to keep using hot reload.

```plaintext
Hot reload was rejected:
'/path/to/project/lib/main.dart': warning: line 16 pos 38: unbalanced '{' opens here
  Widget build(BuildContext context) {
                                     ^
'/path/to/project/lib/main.dart': error: line 33 pos 5: unbalanced ')'
    );
    ^
```

### CupertinoTabView's builder

Hot reload won't apply changes made to a `builder` of a `CupertinoTabView` (Flutter issue 43574).

### Enumerated types

Hot reload doesn't work when enumerated types are changed to regular classes or regular classes are changed to enumerated types.

```dart
enum Color { red, green, blue }
```

```dart
class Color {
  Color(this.i, this.j);
  final int i;
  final int j;
}
```

### Generic types

Hot reload won't work when generic type declarations are modified.

```dart
class A<T> {
  T? i;
}
```

```dart
class A<T, V> {
  T? i;
  V? v;
}
```

### Native code

If you've changed native code (such as Kotlin, Java, Swift, or Objective-C), you must perform a full restart (stop and restart the app) to see the changes take effect.

### Previous state is combined with new code

Flutter's stateful hot reload preserves the state of your app. If code changes affect the state of your app (or its dependencies), the data your app has to work with might not be fully consistent with the data it would have if it executed from scratch. The result might be different behavior after a hot reload versus a hot restart.

### Recent code change is included but app state is excluded

In Dart, static fields are lazily initialized. Global variables and static fields are treated as state, and are therefore not reinitialized during hot reload. If you change initializers of global variables and static fields, a hot restart or restart the state where the initializers are held is necessary to see the changes.

```dart
const foo = 1;
final bar = foo;
void onClick() {
  print(foo);
  print(bar);
}
```

Changing to `const foo = 2;` hot reloads `foo` (const fields are treated like aliases instead of state) but the `final bar = foo;` initializer is not rerun. The Dart VM flags most initializer changes that need a hot restart, but not cases like `final bar = foo;`. To update `foo` and view the change after hot reload, redefine the field as `const` or use a getter:

```dart
const foo = 1;
const bar = foo; // Convert foo to a const...
void onClick() {
  print(foo);
  print(bar);
}
```

```dart
const foo = 1;
int get bar => foo; // ...or provide a getter.
void onClick() {
  print(foo);
  print(bar);
}
```

### Recent UI change is excluded

Even when a hot reload appears successful, some code changes might not be visible, commonly after changes to `main()` or `initState()`. As a general rule, if the modified code is downstream of the root widget's `build()` method, hot reload behaves as expected.

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(onTap: () => print('tapped'));
  }
}
```

After changing `main()` to `runApp(const Center(child: Text('Hello', textDirection: TextDirection.ltr)));`, a hot restart shows `Hello`, but a hot reload rebuilds the widget tree with the unchanged instance of `MyApp` as the root widget, so nothing visible changes.

## How it works

When hot reload is invoked, the host machine looks at the edited code since the last compilation. These libraries are recompiled: any libraries with changed code, the application's main library, and the libraries from the main library leading to affected libraries. The source code is compiled into kernel files and sent to the mobile device's Dart VM, which re-loads all libraries from the new kernel file. No code is re-executed at that point. The hot reload mechanism then causes the Flutter framework to trigger a rebuild/re-layout/repaint of all existing widgets and render objects.

## Notes

- Only Flutter apps in debug mode can be hot reloaded or hot restarted.
- A code change has a visible effect only if the modified Dart code is run again after the change. A hot reload causes all existing widgets to rebuild; `main()` and `initState()` are not run again.
- Flutter web supports hot restart and hot reload (see the web building page).
- If you use an AI coding assistant like Google Antigravity, the assistant can automatically hot reload your running application after making changes, or when asked to "Reload the app".
- This is Flutter's hot reload (Dart VM), distinct from the dev-server HMR of JavaScript tooling.

## Related

- [flutter: The Flutter command-line tool](./flutter-cli.md)
- [Flutter and Dart DevTools](./devtools.md)
- [Flutter Property Editor](./property-editor.md)
