---
source: https://docs.flutter.dev/tools/devtools/console
---

# Use the Debug console

The DevTools Debug console lets you watch an application's standard output (`stdout`), evaluate expressions for a paused or running app in debug mode, and analyze inbound and outbound references for objects. It is available from the Inspector, Debugger, and Memory views. The page states it is up to date for DevTools 2.23.0.

## Signature / Usage

Assign an evaluated object to a variable with `$0`, `$1` (through `$5`):

```dart
var x = $0
```

## Features

- Watch application output: the console shows `stdout`.
- Explore inspected widgets: clicking a widget on the **Inspector** screen displays its variable in the console.
- Evaluate expressions: for a paused or running application, assuming debug mode.
- Browse heap snapshot: go to **Devtools > Memory > Diff Snapshots**, record a heap snapshot, use the context menu `[⋮]` to view the number of **Instances** for a **Class**, then store a single instance as a console variable, or all currently alive instances. The Console screen shows live and static inbound and outbound references and field values.

## Notes

- Evaluation requires the app to run in debug mode.

## Related

- [Use the debugger](./devtools-debugger.md)
- [Use the Flutter inspector](./devtools-inspector.md)
- [Use the Memory view](./devtools-memory.md)
