---
source: https://docs.flutter.dev/ui/navigation/url-strategies
---

# Configuring the URL strategy on the web

Use hash or path URL strategies on the web. Flutter web apps support two ways of configuring URL-based navigation.

## Signature / Usage

Add `flutter_web_plugins` as a Flutter SDK dependency in `pubspec.yaml` (you can't add it with `pub add`):

```yaml highlightLines=4-5
dependencies:
  flutter:
    sdk: flutter
  flutter_web_plugins:
    sdk: flutter
```

Then call `usePathUrlStrategy` before `runApp`:

```dart highlightLines=4
import 'package:flutter_web_plugins/url_strategy.dart';

void main() {
  usePathUrlStrategy();
  runApp(ExampleApp());
}
```

## Strategies

| Strategy | Behavior | Example |
|----------|----------|---------|
| Hash (default) | Paths are read and written to the hash fragment. | `flutterexample.dev/#/path/to/screen` |
| Path | Paths are read and written without a hash. | `flutterexample.dev/path/to/screen` |

Related API names linked from the page: `HashUrlStrategy`, `PathUrlStrategy`, `setUrlStrategy`, `usePathUrlStrategy` (library `flutter_web_plugins`).

## Configuring your web server

`PathUrlStrategy` uses the History API, which requires additional web server configuration: rewrite requests to `index.html` (check your web server's documentation for single-page apps). With Firebase Hosting, choose "Configure as a single-page app" when initializing the project. The local dev server created by `flutter run -d chrome` handles any path and falls back to the app's `index.html`.

## Hosting a Flutter app at a non-root location

Update the `<base href="/">` tag in `web/index.html` to the path where your app is hosted. For example, to host at `my_app.dev/flutter_app`, change it to `<base href="/flutter_app/">`.

## Notes

- Relative `base href` tags are supported for release builds but must take into account the full URL where the page was served from. A relative `base href` for a request to `/flutter_app/`, `/flutter_app/nested/route`, and `/flutter_app/nested/route/` will be different (for example `"."`, `".."`, and `"../.."` respectively).
- Flutter web URL strategy (Dart, `flutter_web_plugins`); distinct from the React Router / TanStack Router history and `basename` configuration and from Next.js routing in the other skills.

## Related

- [Navigation and routing](./navigation.md)
- [Deep linking](./deep-linking.md)
