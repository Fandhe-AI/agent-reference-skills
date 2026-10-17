# debugging-testing

| Name | Description | Path |
|------|-------------|------|
| Application Debugging | Overview of tools for finding coding errors, performance bottlenecks, or optimization opportunities in an Electron app. | [application-debugging.md](./application-debugging.md) |
| Automated Testing | End-to-end test automation for Electron apps. Electron does not maintain its own testing solution. | [automated-testing.md](./automated-testing.md) |
| contentTracing | Collect tracing data from Chromium to find performance bottlenecks and slow operations. Process: Main. | [content-tracing.md](./content-tracing.md) |
| crashReporter | Submit crash reports to a remote server. Process: Main, Renderer. | [crash-reporter.md](./crash-reporter.md) |
| Crash Reporting guide | How native crashes are captured by crashReporter as Crashpad minidumps, annotated, received, and symbolicated. | [crash-reporting.md](./crash-reporting.md) |
| Debugging the Main Process | DevTools in a browser window only debug that window; main-process JavaScript needs an external debugger launched with `--inspect` or `--inspect-brk`. | [debugging-main-process.md](./debugging-main-process.md) |
| Debugging in VSCode | How to set up VSCode debugging for your own Electron project (main process) and for the native Electron codebase (Windows C++). | [debugging-vscode.md](./debugging-vscode.md) |
| DevTools Extension | Electron supports Chrome DevTools extensions, which extend Chrome's developer tools for debugging popular web frameworks. | [devtools-extension.md](./devtools-extension.md) |
| Process metric structures | ProcessMetric, CPUUsage, MemoryInfo, MemoryUsageDetails, ProcessMemoryInfo and GPUFeatureStatus structures returned by the app and process metric APIs. | [metrics-structures.md](./metrics-structures.md) |
| REPL | Interactive Read-Eval-Print-Loop for the main process (via the Node.js `repl` module) and for renderers (via DevTools Console). | [repl.md](./repl.md) |
| Testing on Headless CI Systems | Electron requires a display driver; on headless CI, use a virtual display driver such as Xvfb. | [testing-on-headless-ci.md](./testing-on-headless-ci.md) |
</content>
