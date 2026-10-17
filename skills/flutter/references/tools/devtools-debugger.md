---
source: https://docs.flutter.dev/tools/devtools/debugger
---

# Use the debugger

DevTools includes a full source-level debugger, supporting breakpoints, stepping, and variable inspection. DevTools hides the Debugger tab if the app was launched from VS Code because VS Code has a built-in debugger.

## Signature / Usage

Open the Debugger tab; the source of the app's main entry-point is loaded. Click **Libraries** (top right) or press Ctrl / Cmd + P to search other source files. Click the line-number ruler to set a breakpoint (click again to remove); breakpoints also appear in the **Breakpoints** area.

```console
$ dart devtools
Serving DevTools at http://127.0.0.1:9100
```

## Features

| Feature | Description |
| --- | --- |
| Call stack and Variables | When paused at a breakpoint, `Call stack` shows the paused isolate's stack and `Variables` shows the selected frame's locals. Toggle objects open to see fields; hovering calls `toString()` and displays the result. |
| Step in | Step into a method invocation, stopping at the first executable line in the invoked method. |
| Step over | Step over a method invocation; steps through source lines in the current method. |
| Step out | Step out of the current method without stopping at intermediary lines. |
| Resume | Continues regular execution. |
| Console output | `stdout` and `stderr` appear in the console below the source area, and in the Logging view. |
| Breaking on exceptions | Toggle the **Ignore** dropdown at the top. Breaking on unhandled exceptions only pauses if the exception is considered uncaught by application code; breaking on all exceptions pauses whether or not it was caught. |

## Notes

- The launch command above comes from the related official page https://docs.flutter.dev/tools/devtools/cli (see "Run DevTools from the command line"); the debugger page itself shows no code.
- Known issue: when performing a hot restart for a Flutter application, user breakpoints are cleared.
- Flutter DevTools debugger (Dart VM) is distinct from React DevTools (react skill).

## Related

- [Use the Logging view](./devtools-logging.md)
- [Use the Debug console](./devtools-console.md)
- [Flutter and Dart DevTools](./devtools.md)
