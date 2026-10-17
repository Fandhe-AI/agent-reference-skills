---
source: https://docs.flutter.dev/tools/devtools/logging
---

# Use the Logging view

The logging view displays events from the Dart runtime, application frameworks (like Flutter), and application-level logging events. It works with all Flutter and Dart applications.

## Signature / Usage

Logging from your own code is described in the "Debugging Flutter apps programmatically" page (logging section). To clear entries, click **Clear logs**.

```console
$ flutter logs
```

(`flutter logs` shows log output for running Flutter apps from the command line; see "flutter: The Flutter command-line tool".)

## Standard logging events

By default, the logging view shows:

- Garbage collection events from the Dart runtime
- Flutter framework events, like frame creation events
- `stdout` and `stderr` from applications
- Custom logging events from applications

## Notes

- Flutter DevTools logging view is distinct from the pino logger (pino skill) and server log tooling.

## Related

- [Use the debugger](./devtools-debugger.md)
- [Flutter and Dart DevTools](./devtools.md)
