---
source: https://docs.flutter.dev/ui/navigation
---

# Navigation and routing

Overview of Flutter's navigation and routing: the imperative `Navigator` stack, named routes (not recommended), and the declarative `Router` used with routing packages such as go_router.

## Signature / Usage

The `Navigator` widget displays screens as a stack. Access it through the route's `BuildContext` and call imperative methods such as `push()` or `pop()`:

```dart
child: const Text('Open second screen'),
onPressed: () {
  Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (context) => const SecondScreen(),
    ),
  );
},
```

Named routes (declared in `MaterialApp.routes`):

```dart
child: const Text('Open second screen'),
onPressed: () {
  Navigator.pushNamed(context, '/second');
},
```

Router with a routing package (switch to the `router` constructor on `MaterialApp` or `CupertinoApp`):

```dart
child: const Text('Open second screen'),
onPressed: () => context.go('/second'),
```

### Using the Navigator

`Navigator` keeps a stack of `Route` objects (the history stack). `push()` takes a `Route`; `MaterialPageRoute` is a subclass of `Route` that specifies the transition animations for Material Design.

### Using named routes

- Applications with simple navigation and deep linking requirements can use `Navigator` with the `MaterialApp.routes` parameter.
- Limitations: named routes handle deep links, but the behavior is always the same and can't be customized. When a new deep link is received by the platform, Flutter pushes a new `Route` onto the Navigator regardless of where the user currently is. Flutter also doesn't support the browser forward button for applications using named routes.

### Using the Router

Apps with advanced navigation and routing requirements (such as a web app with direct links to each screen, or an app with multiple `Navigator` widgets) should use a routing package such as go_router that can parse the route path and configure the `Navigator` whenever the app receives a new deep link. Packages like go_router are _declarative_, so they always display the same screen(s) when a deep link is received.

For full control without a routing package, override `RouteInformationParser` and `RouterDelegate`. When app state changes, control the stack precisely by providing a list of `Page` objects using the `Navigator.pages` parameter. See the `Router` API documentation.

### Using Router and Navigator together

- Navigating via the `Router` (or a declarative routing package) makes each route on the Navigator _page-backed_: created from a `Page` using the `pages` argument on the `Navigator` constructor.
- Any `Route` created by calling `Navigator.push` or `showDialog` adds a _pageless_ route.
- With a routing package, page-backed routes are always deep-linkable, whereas pageless routes are not.
- When a page-backed `Route` is removed from the `Navigator`, all of the pageless routes after it (up until the next page-backed route) are also removed.

### Web support

Apps using the `Router` class integrate with the browser History API. Whenever you navigate using the `Router`, a History API entry is added to the browser's history stack. Pressing the browser **back** button uses _reverse chronological navigation_: the user is taken to the previously visited location shown using the `Router`. If the user pops a page from the `Navigator` and then presses the browser **back** button, the previous page is pushed back onto the stack.

## Notes

- We don't recommend using named routes for most applications. Instead, use go_router (or another routing package) or use `Navigator` with `MaterialPageRoute`.
- You can't prevent navigation from page-backed screens using `PopScope` or the deprecated `WillPopScope`. Consult your routing package's API documentation instead. For guidelines on migrating to `PopScope`, see the Android predictive back migration guide (`/release/breaking-changes/android-predictive-back` on docs.flutter.dev).
- Flutter `Navigator` / `Router` (Dart, `package:flutter/widgets.dart`); distinct from React Router and TanStack Router (JS route trees and loaders) and from Jetpack Navigation (`NavHost` / `NavController`) in the other skills.

## Related

- [Deep linking](./deep-linking.md)
- [Configuring the URL strategy on the web](./url-strategies.md)
