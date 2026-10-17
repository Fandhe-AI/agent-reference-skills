---
source: https://v2.tauri.app/reference/javascript/log/
---

# @tauri-apps/plugin-log

Configure the Tauri application log system, and access the JavaScript-side log functions.

## Signature / Usage

```ts
import { error, attachConsole } from '@tauri-apps/plugin-log';

const err_info = "No connection";
const port = 22;

error(`Error: ${err_info} on port ${port}`);

const detach = await attachConsole();
// detach the listener later
detach();
```

```ts
function error(message: string, options?: LogOptions): Promise<void>   // @since 2.0.0
function warn(message: string, options?: LogOptions): Promise<void>    // @since 2.0.0
function info(message: string, options?: LogOptions): Promise<void>    // @since 2.0.0
function debug(message: string, options?: LogOptions): Promise<void>   // @since 2.0.0
function trace(message: string, options?: LogOptions): Promise<void>   // @since 2.0.0
function attachLogger(fn: (payload: { level: LogLevel; message: string }) => void): Promise<UnlistenFn>   // @since 2.0.0
function attachConsole(): Promise<UnlistenFn>                          // @since 2.0.0

enum LogLevel { Trace = 1, Debug, Info, Warn, Error }

interface LogOptions {
  file?: string
  line?: number
  keyValues?: Record<string, string | undefined>
}
```

## Options / Props

`LogOptions`

| Name | Type | Description |
| --- | --- | --- |
| file | `string` | The name of the file that emitted the log entry. Included in the log record's target when set. |
| line | `number` | The line number in `file` that emitted the log entry. |
| keyValues | `Record<string, string \| undefined>` | Additional structured key-value pairs to attach to the log entry. |

`LogLevel` (matches the levels of the Rust `log` crate)

| Name | Value | Description |
| --- | --- | --- |
| Trace | 1 | Very low priority, often extremely verbose, information. |
| Debug | 2 | Lower priority information. |
| Info | 3 | Useful information. |
| Warn | 4 | Hazardous situations. |
| Error | 5 | Very serious errors. |

## Notes

- `attachLogger(fn)` calls `fn` for every log entry emitted by the Rust side (it listens to the `log://log` event) and strips ANSI escape codes from the message; it resolves to a function to cancel the listener.
- `attachConsole()` writes log entries to the console as they come in (`Trace` uses `console.log`, `Debug` uses `console.debug`, `Info` `console.info`, `Warn` `console.warn`, `Error` `console.error`).
- Tauri plugin that routes logs through the Rust `log` crate. It is not a standalone logger library (see the pino skill for pino).
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@log-v2.10.1` `plugins/log/guest-js/index.ts`

## Related

- [Logging plugin](../plugins-core/logging.md)
