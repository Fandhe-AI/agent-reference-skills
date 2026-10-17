---
source: https://api.flutter.dev/flutter/widgets/Navigator-class.html
---

# Navigator class

A widget that manages a set of child widgets with a stack discipline. (`StatefulWidget`; its state class is `NavigatorState`)

## Signature / Usage

Setting up with `MaterialApp` (its `home` becomes the route at the bottom of the stack):

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: MyAppHome()));
}
```

Pushing a route and popping it:

```dart
Navigator.push(context, MaterialPageRoute<void>(
  builder: (BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Page')),
      body: Center(
        child: TextButton(
          child: const Text('POP'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  },
));
```

```dart
Navigator.pop(context);
```

Named routes:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: const MyAppHome(), // becomes the route named '/'
    routes: <String, WidgetBuilder> {
      '/a': (BuildContext context) => const MyPage(title: Text('page A')),
      '/b': (BuildContext context) => const MyPage(title: Text('page B')),
      '/c': (BuildContext context) => const MyPage(title: Text('page C')),
    },
  ));
}
```

```dart
Navigator.pushNamed(context, '/b');
```

Routes can return a value:

```dart
bool? value = await Navigator.push(context, MaterialPageRoute<bool>(
  builder: (BuildContext context) {
    return Center(
      child: GestureDetector(
        child: const Text('OK'),
        onTap: () { Navigator.pop(context, true); }
      ),
    );
  }
));
```

Custom route with `PageRouteBuilder`:

```dart
Navigator.push(context, PageRouteBuilder<void>(
  opaque: false,
  pageBuilder: (BuildContext context, _, _) {
    return const Center(child: Text('My PageRoute'));
  },
  transitionsBuilder: (_, Animation<double> animation, _, Widget child) {
    return FadeTransition(
      opacity: animation,
      child: RotationTransition(
        turns: Tween<double>(begin: 0.5, end: 1.0).animate(animation),
        child: child,
      ),
    );
  }
));
```

## Options / Props

Constructor named parameters: `key`, `pages = const <Page<dynamic>>[]`, `onPopPage` (deprecated), `initialRoute`, `onGenerateInitialRoutes = Navigator.defaultGenerateInitialRoutes`, `onGenerateRoute`, `onUnknownRoute`, `transitionDelegate = const DefaultTransitionDelegate<dynamic>()`, `reportsRouteUpdateToEngine = false`, `clipBehavior = Clip.hardEdge`, `observers = const <NavigatorObserver>[]`, `requestFocus = true`, `restorationScopeId`, `routeTraversalEdgeBehavior = kDefaultRouteTraversalEdgeBehavior`, `routeDirectionalTraversalEdgeBehavior = kDefaultRouteDirectionalTraversalEdgeBehavior`, `onDidRemovePage`.

Static methods (take a `BuildContext context` as the first argument):

| Name | Signature | Description |
| --- | --- | --- |
| of | `NavigatorState of(BuildContext context, {bool rootNavigator = false})` | The state from the closest instance of this class that encloses the given context. |
| maybeOf | `NavigatorState? maybeOf(BuildContext context, {bool rootNavigator = false})` | The state from the closest instance of this class that encloses the given context, if any. |
| push | `Future<T?> push<T extends Object?>(BuildContext context, Route<T> route)` | Push the given route onto the navigator that most tightly encloses the given context. |
| pushNamed | `Future<T?> pushNamed<T extends Object?>(BuildContext context, String routeName, {Object? arguments})` | Push a named route onto the navigator. |
| pushReplacement | `Future<T?> pushReplacement<T extends Object?, TO extends Object?>(BuildContext context, Route<T> newRoute, {TO? result})` | Replace the current route by pushing the given route and then disposing the previous route once the new route has finished animating in. |
| pushReplacementNamed | `Future<T?> pushReplacementNamed<T extends Object?, TO extends Object?>(BuildContext context, String routeName, {TO? result, Object? arguments})` | Named-route variant of `pushReplacement`. |
| pushAndRemoveUntil | `Future<T?> pushAndRemoveUntil<T extends Object?>(BuildContext context, Route<T> newRoute, RoutePredicate predicate)` | Push the given route, and then remove all the previous routes until the `predicate` returns true. |
| pushNamedAndRemoveUntil | `Future<T?> pushNamedAndRemoveUntil<T extends Object?>(BuildContext context, String newRouteName, RoutePredicate predicate, {Object? arguments})` | Named-route variant of `pushAndRemoveUntil`. |
| pop | `void pop<T extends Object?>(BuildContext context, [T? result])` | Pop the top-most route off the navigator that most tightly encloses the given context. |
| popAndPushNamed | `Future<T?> popAndPushNamed<T extends Object?, TO extends Object?>(BuildContext context, String routeName, {TO? result, Object? arguments})` | Pop the current route and push a named route in its place. |
| popUntil | `void popUntil(BuildContext context, RoutePredicate predicate)` | Calls `pop` repeatedly until the predicate returns true. |
| popUntilWithResult | `void popUntilWithResult<T extends Object?>(BuildContext context, RoutePredicate predicate, T? result)` | Like `popUntil`, returning the `result` to the last popped route. |
| maybePop | `Future<bool> maybePop<T extends Object?>(BuildContext context, [T? result])` | Consults the current route's `Route.popDisposition` getter (or the deprecated `Route.willPop`), potentially popping the route; returns whether the pop request should be considered handled. |
| canPop | `bool canPop(BuildContext context)` | Whether the navigator that most tightly encloses the given context can be popped. |
| defaultGenerateInitialRoutes | `List<Route> defaultGenerateInitialRoutes(NavigatorState navigator, String initialRouteName)` | Turn a route name into a set of `Route` objects. |

## Notes

- Flutter widget API (Dart, `package:flutter/widgets.dart`) — distinct from Jetpack Compose / SwiftUI / WinUI / Ark UI / Chakra UI / fandhe-frontend components of the same name. Flutter's `Navigator` / `Router` are Dart, not React Router / TanStack Router (JS) or Jetpack Navigation (Android).
- Many apps have a navigator near the top of their widget hierarchy to display their logical history using an `Overlay` with the most recently visited pages visually on top of older ones; the same approach shows a dialog by positioning it above the current page.
- Two ways to manage the stack of `Route` objects: the declarative API `Navigator.pages`, or the imperative API `Navigator.push` / `Navigator.pop`.
- Pages API: if `Navigator.pages` is provided, the navigator converts it into a stack of `Route`s and updates the routes whenever `pages` changes. Create a `Page` subclass and define a list of `Page`s. `Navigator.onPopPage` is marked deprecated on the page (it is still required to clean up the input pages in case of a pop). By default `DefaultTransitionDelegate` decides how routes transition in or out; provide a `TransitionDelegate` subclass via `Navigator.transitionDelegate` to customize. For more information on the pages API, see the `Router` widget.
- Usually you do not create a navigator directly: use the navigator created by the `Router` which is created and configured by a `WidgetsApp` or `MaterialApp`, and refer to it with `Navigator.of`. The `MaterialApp`'s `home` becomes the route at the bottom of the stack.
- The route defines its widget with a builder function instead of a child widget because it is built and rebuilt in different contexts depending on when it's pushed and popped. A `Scaffold` automatically adds a back button to its `AppBar` that calls `Navigator.pop`; on Android, the system back button does the same.
- Named routes: route names by convention use a path-like structure (e.g., '/a/b/c'); the app's home page route is named '/' by default. `MaterialApp` can be created with a `Map<String, WidgetBuilder>` mapping route names to builders, which it uses to create the navigator's `onGenerateRoute` callback.
- Routes can return a value: methods that push a route return a `Future` that resolves when the route is popped, with the value of `pop`'s `result` parameter. If the user backs out (e.g., the Scaffold's back button), the value is null. When a route is used to return a value, the route's type parameter must match the type of `pop`'s result (e.g., `MaterialPageRoute<bool>`).
- Popup routes (`PopupRoute`) cover the screen with a `ModalRoute.barrierColor` that can be partially opaque; they are modal because they block input to widgets below. `showDialog`, `showMenu` and `showModalBottomSheet` create and show popup routes and return the pushed route's `Future`; `PopupMenuButton` and `DropdownButton` create internal `PopupRoute` subclasses.
- Custom routes: subclass `PopupRoute`, `ModalRoute` or `PageRoute` to control the animated transition, the modal barrier and other aspects; `PageRouteBuilder` defines a custom route in terms of callbacks. A page route is built in two parts, the "page" (typically built once) and the "transitions" (built on every frame for its duration). `opaque: false` keeps the route from obscuring the entire screen, just as a popup route does.
- Nesting navigators: an app can use more than one `Navigator`; nesting one below another creates an "inner journey" such as tabbed navigation, user registration, or store checkout. iOS apps typically give each tab its own `Navigator`; a "root" `Navigator` sits above the tab navigation for full-screen pages. In practice nested navigators for tabbed navigation sit in `WidgetsApp` and `CupertinoTabView` and do not need to be created explicitly. The page includes an example (DartPad sample `widgets.Navigator.1`, create locally with `flutter create --sample=widgets.Navigator.1 mysample`, then `cd mysample` and run with `flutter run --route=/signup`) that presents a standalone user registration journey with a nested `Navigator` built in `SignUpPage` (with `initialRoute: 'signup/personal_info'` and an `onGenerateRoute` returning `MaterialPageRoute<void>`); `Navigator.of(context).pop()` from inside refers to the top-level navigator because `SignUpPage` is above the nested one.
- `cd mysample` was added so the run command executes in the created project.
- `import 'package:flutter/material.dart';` added to the main() snippets; the API page shows it in a separate sample block.
- `Navigator.of` operates on the nearest ancestor `Navigator` from the given `BuildContext`; be sure to provide a context below the intended navigator (use `Builder` to obtain one).
- Finding the enclosing route: for a modal route, use `ModalRoute.of` from a build method; check `Route.isCurrent` on the returned route to see whether it is the active route.
- State restoration: with a `restorationScopeId` and a surrounding `RestorationScope`, the navigator restores its history stack and the routes' internal state. `Page`-based routes restore if `Page.restorationId` is provided; routes added with the classic imperative API (`push`, `pushNamed`, ...) can never restore their state; routes added with the restorable imperative API (`restorablePush`, `restorablePushNamed`, and other methods with "restorable" in their name) restore if all routes below them up to and including the first `Page`-based route below are restored (or, with no `Page`-based route below, all routes below restore theirs).

## Related

- [GestureDetector](./GestureDetector.md)
- [BuildContext](./BuildContext.md)
- [StatefulWidget](./StatefulWidget.md)
