# samples

| Name | Description | Path |
|------|-------------|------|
| ChangeNotifier and ListenableBuilder | Hold state in a `ChangeNotifier` view model and rebuild the UI with `ListenableBuilder`, handling loading / error / data with a switch expression. | [change-notifier-listenable-builder.md](./change-notifier-listenable-builder.md) |
| Fetch and Parse JSON | Fetch JSON with the `http` package, convert it to a Dart object, show it with `FutureBuilder`, and parse large payloads in a background isolate with `compute`. | [fetch-and-parse-json.md](./fetch-and-parse-json.md) |
| Form Validation | Validate a `TextFormField` through a `Form` with a `GlobalKey<FormState>`, and submit only when valid. | [form-validation.md](./form-validation.md) |
| Gestures: Taps and Swipe to Dismiss | Handle taps with `GestureDetector` and remove list items by swiping with `Dismissible`. | [gestures-taps-dismissible.md](./gestures-taps-dismissible.md) |
| Hero and Page Route Animation | Animate a widget across screens with `Hero`, and customize a route transition with `PageRouteBuilder`, `Tween` and `SlideTransition`. | [hero-and-page-route-animation.md](./hero-and-page-route-animation.md) |
| Implicit Animation with AnimatedContainer | Animate size, color and border radius by rebuilding an `AnimatedContainer` with new values inside `setState`. | [implicit-animated-container.md](./implicit-animated-container.md) |
| Integration Test and Performance Profiling | Record a performance timeline during an `integration_test` scroll test and write a summary with `flutter drive --profile`. | [integration-test-and-profiling.md](./integration-test-and-profiling.md) |
| Layout with Scaffold, Column and Row | Structure a screen with `Scaffold` and `AppBar`, then build a grid by nesting `Row` widgets in a `Column` using collection-for. | [layout-row-column.md](./layout-row-column.md) |
| List and Grid | Show a short list with `ListView` and `ListTile`, and a grid with `GridView.count`. | [list-and-grid.md](./list-and-grid.md) |
| Long Lists with ListView.builder | Render a large list lazily; items are created only as they scroll onto the screen. | [long-lists-builder.md](./long-lists-builder.md) |
| Mocking with Mockito | Inject an `http.Client`, generate a mock with `mockito`, and unit test success and failure paths. | [mocking-with-mockito.md](./mocking-with-mockito.md) |
| MVVM Case Study (Compass App) | Structure a feature as a View plus a ViewModel that takes repositories by constructor, notifies via `ChangeNotifier`, and is tested with a fake repository. | [mvvm-case-study.md](./mvvm-case-study.md) |
| Named Routes and Arguments | Declare a `routes` table with `initialRoute`, push by name with `Navigator.pushNamed`, and pass arguments read through `ModalRoute.of` or `onGenerateRoute`. | [named-routes-and-arguments.md](./named-routes-and-arguments.md) |
| Navigation: Push, Pop and Return Data | Push a route with `Navigator.push`, close it with `Navigator.pop`, and receive a result through the returned `Future`. | [navigation-push-pop-and-return-data.md](./navigation-push-pop-and-return-data.md) |
| Send, Update and Delete Data | Create, update and delete remote data with `http.post`, `http.put` and `http.delete`, converting responses into a Dart object. | [send-update-delete-data.md](./send-update-delete-data.md) |
| Key-Value Storage and File Persistence | Persist small values with `shared_preferences`, and persist data in a file with `path_provider` plus `dart:io`. | [shared-preferences-and-files.md](./shared-preferences-and-files.md) |
| Slivers with a Floating App Bar | Put a `SliverAppBar` and a `SliverList` inside a `CustomScrollView` so the app bar shrinks as the list scrolls. | [slivers-floating-app-bar.md](./slivers-floating-app-bar.md) |
| SQLite Persistence | Insert, query, update and delete rows in a local SQLite database with the `sqflite` and `path` packages. | [sqlite-persistence.md](./sqlite-persistence.md) |
| Stateful Widget with setState | Convert a StatelessWidget to a StatefulWidget and trigger UI updates with `setState`, managing controller lifecycles in `State`. | [stateful-widget-setstate.md](./stateful-widget-setstate.md) |
| Text Input and Focus | Move focus to a text field programmatically with a `FocusNode`, and read a field's value with a `TextEditingController`. | [text-input-and-focus.md](./text-input-and-focus.md) |
| Theme and Custom Fonts | Share colors and text styles with `ThemeData`, override a theme for one subtree, and declare custom fonts in `pubspec.yaml`. | [theme-and-custom-fonts.md](./theme-and-custom-fonts.md) |
| WebSockets | Connect to a WebSocket server with `web_socket_channel`, listen with `StreamBuilder`, send through the sink, and close on dispose. | [web-sockets.md](./web-sockets.md) |
| Widget Test: Finders, Tap and Drag | Write a `testWidgets` test that finds widgets, enters text, taps, drags to dismiss, and rebuilds with `pump` / `pumpAndSettle`. | [widget-test-finders-tap-drag.md](./widget-test-finders-tap-drag.md) |
