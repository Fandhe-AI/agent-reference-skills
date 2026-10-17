---
source: https://api.flutter.dev/flutter/widgets/runApp.html
---

# runApp function

Inflate the given widget and attach it to the view.

## Signature / Usage

```dart
void runApp(Widget app)
```

Implementation (from the API page):

```dart
void runApp(Widget app) {
  final WidgetsBinding binding = WidgetsFlutterBinding.ensureInitialized();
  _runWidget(binding.wrapWithDefaultView(app), binding, 'runApp');
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| app | Widget | required | The root widget to render into the implicit view. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name.
- `runApp` renders `app` into `PlatformDispatcher.implicitView` by wrapping it in a `View` widget, which bootstraps the render tree. Apps that want to control which `FlutterView` they render into can use `runWidget` instead.
- The widget is given constraints during layout that force it to fill the entire view. To align it to one side (e.g., the top) use `Align`; to center it use `Center`.
- Calling `runApp` again detaches the previous root widget from the view and attaches the given widget in its place. The new widget tree is compared against the previous widget tree and any differences are applied to the underlying render tree, similar to a `StatefulWidget` rebuilding after `State.setState`.
- Initializes the binding using `WidgetsFlutterBinding` if necessary.
- Application shutdown: the widget tree is not torn down when the application shuts down, because there is no way to predict when that will happen. Applications are responsible for being well-behaved in the face of rapid unscheduled termination. To listen for platform shutdown messages (and other lifecycle changes), consider `AppLifecycleListener`. To artificially dispose the entire widget tree, call `runApp` with a widget such as `SizedBox.shrink`.
- Dismissing Flutter UI via platform native methods: if non-Flutter methods remove Flutter-based UI (e.g., manipulating the platform native navigation stack), the framework does not know whether to free resources eagerly; the widget tree remains mounted and ready to render. To release resources more eagerly, establish a platform channel and use it to call `runApp` with a widget such as `SizedBox.shrink`.

## Related

- [StatelessWidget](./StatelessWidget.md)
- [StatefulWidget](./StatefulWidget.md)
- [SizedBox](./SizedBox.md)
