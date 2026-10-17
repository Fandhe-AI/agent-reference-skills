---
source: https://docs.flutter.dev/tools/devtools/cli
---

# Run DevTools from the command line

Launch DevTools with the `dart devtools` command; `dart` must be on your path.

## Signature / Usage

```console
$ dart devtools
Serving DevTools at http://127.0.0.1:9100
```

Start an application to debug (a Flutter application or a Dart command-line application; a device must be connected or a simulator open):

```console
cd path/to/flutter/app
flutter run
```

```console
A Dart VM Service on macOS is available at:
http://127.0.0.1:51830/u37pq71Re0k=/
The Flutter DevTools debugger and profiler on macOS
is available at:
http://127.0.0.1:9100?uri=http://127.0.0.1:51830/u37pq71Re0k=/
```

Open the second link in Chrome. The URL contains a security token, so it differs on each run; after re-running the app, connect again with the new URL.

## Connect to a new app instance

If your app stops running or you opened DevTools manually, a **Connect** dialog appears; connect manually by pasting the link from running your app, such as `http://127.0.0.1:51830/u37pq71Re0k=/`.

## Notes

- To upgrade DevTools, upgrade Flutter. If a newer Dart SDK (included in the Flutter SDK) has a newer DevTools, `dart devtools` launches it automatically. If `which dart` points to a Dart SDK not included in your Flutter SDK, updating that Dart SDK won't update the Flutter version.

## Related

- [Flutter and Dart DevTools](./devtools.md)
- [flutter: The Flutter command-line tool](./flutter-cli.md)
