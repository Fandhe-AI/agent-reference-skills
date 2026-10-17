---
source: https://v2.tauri.app/plugin/logging/
---

# Logging

Configurable logging for your Tauri app, from Rust (the `log` crate) and from the frontend.

## Supported Platforms

Windows, Linux, macOS, Android, iOS: full support (`log-v2.10.1`).

## Setup

```sh
npm run tauri add log
# or: cargo tauri add log
```

Manual:

From `src-tauri`:

```sh
cargo add tauri-plugin-log
```

From the project root, install the JavaScript guest bindings:

```sh
npm install @tauri-apps/plugin-log
```

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

## Signature / Usage

JavaScript APIs:

```javascript
import {
  warn,
  debug,
  trace,
  info,
  error,
  attachConsole,
  attachLogger,
} from '@tauri-apps/plugin-log';
// when using `"withGlobalTauri": true`, you may use
// const { warn, debug, trace, info, error, attachConsole, attachLogger } = window.__TAURI__.log;
```

Produce log records from JavaScript:

```js
import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';

trace('Trace');
info('Info');
error('Error');
```

Forward all `console` messages to the log plugin:

```ts
import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';

function forwardConsole(
  fnName: 'log' | 'debug' | 'info' | 'warn' | 'error',
  logger: (message: string) => Promise<void>
) {
  const original = console[fnName];
  console[fnName] = (message) => {
    original(message);
    logger(message);
  };
}

forwardConsole('log', trace);
forwardConsole('debug', debug);
forwardConsole('info', info);
forwardConsole('warn', warn);
forwardConsole('error', error);
```

Rust side uses the `log` crate (add `log = "0.4"` to `Cargo.toml`):

```rust
log::error!("something bad happened!");
log::info!("Tauri is awesome!");
```

## Log targets

The builder's `targets` function configures destinations. By default the plugin logs to stdout and to a file in the application logs directory. To only use your own targets, call `clear_targets`:

```rust
tauri_plugin_log::Builder::new()
.clear_targets()
.build()
```

Terminal (`Stdout` or `Stderr`; enabled by default):

```rust
tauri_plugin_log::Builder::new()
  .target(tauri_plugin_log::Target::new(
    tauri_plugin_log::TargetKind::Stdout,
  ))
  .build()
```

Webview console: enable the `Webview` target and run `attachConsole` in the frontend:

```rust
tauri_plugin_log::Builder::new()
  .target(tauri_plugin_log::Target::new(
    tauri_plugin_log::TargetKind::Webview,
  ))
  .build()
```

```js
import { attachConsole } from '@tauri-apps/plugin-log';
const detach = await attachConsole();
// call detach() if you do not want to print logs to the console anymore
```

Persisting logs with `LogDir` (recommended log directory) or `Folder` (custom location; default `file_name` is the application name):

```rust
tauri_plugin_log::Builder::new()
  .target(tauri_plugin_log::Target::new(
    tauri_plugin_log::TargetKind::LogDir {
      file_name: Some("logs".to_string()),
    },
  ))
  .build()
```

```rust
tauri_plugin_log::Builder::new()
  .target(tauri_plugin_log::Target::new(
    tauri_plugin_log::TargetKind::Folder {
      path: std::path::PathBuf::from("/path/to/logs"),
      file_name: None,
    },
  ))
  .build()
```

`LogDir` locations:

| Platform | Value | Example |
| --- | --- | --- |
| Linux | `$XDG_DATA_HOME/{bundleIdentifier}/logs` or `$HOME/.local/share/{bundleIdentifier}/logs` | `/home/alice/.local/share/com.tauri.dev/logs` |
| macOS | `{homeDir}/Library/Logs/{bundleIdentifier}` | `/Users/Alice/Library/Logs/com.tauri.dev` |
| Windows | `{FOLDERID_LocalAppData}/{bundleIdentifier}/logs` | `C:\Users\Alice\AppData\Local\com.tauri.dev\logs` |

Log file behavior. By default the log file is discarded when it reaches the maximum size; configure with `max_file_size`, or rotate with `rotation_strategy`:

```rust
tauri_plugin_log::Builder::new()
  .max_file_size(50_000 /* bytes */)
  .build()
```

```rust
tauri_plugin_log::Builder::new()
  .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll)
  .build()
```

## Filtering

By default all logs are processed. Maximum log level, and per-module levels:

```rust
tauri_plugin_log::Builder::new()
  .level(log::LevelFilter::Info)
  // verbose logs only for the commands module
  .level_for("my_crate_name::commands", log::LevelFilter::Trace)
  .build()
```

Target filter by metadata:

```rust
tauri_plugin_log::Builder::new()
  // exclude logs with target `"hyper"`
  .filter(|metadata| metadata.target() != "hyper")
  .build()
```

## Formatting

Records are formatted as `DATE[TARGET][LEVEL] MESSAGE`. Custom format function:

```rust
tauri_plugin_log::Builder::new()
  .format(|out, message, record| {
    out.finish(format_args!(
      "[{} {}] {}",
      record.level(),
      record.target(),
      message
    ))
  })
  .build()
```

Per-target format with `Target::format`; call `clear_format` on the builder to remove the default formatter:

```rust
tauri_plugin_log::Builder::new()
    .clear_format()
    .targets([
        tauri_plugin_log::Target::new(
            tauri_plugin_log::TargetKind::Stdout
        )
        .format(move |out, message, record| {
            // custom formatter for stdout
        }),
        tauri_plugin_log::Target::new(
            tauri_plugin_log::TargetKind::LogDir { file_name: None }
        )
        .format(move |out, message, record| {
            // custom formatter for log files
        }),
    ])
    .build(),
```

Dates use UTC by default; use the local timezone with `timezone_strategy`:

```rust
tauri_plugin_log::Builder::new()
  .timezone_strategy(tauri_plugin_log::TimezoneStrategy::UseLocal)
  .build()
```

## Permissions

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": ["log:default"]
}
```

`log:default` allows the log command (`allow-log`). The permission identifiers are `log:allow-log` and `log:deny-log`.

## Notes

- Tauri plugin (Rust core + system WebView) built on the Rust `log` crate. It is not a standalone logger library: for the Node.js logger see the pino skill (also Fastify's built-in logger), and for Rust language-level logging crates see the rust skill.
- Source: `tauri-apps/plugins-workspace@log-v2.10.1` `plugins/log/Cargo.toml`, `plugins/log/permissions/autogenerated/reference.md`; docs `plugin/logging.mdx` @ `32f68c5`.

## Related

- [../plugin-js-api-core/log.md](../plugin-js-api-core/log.md)
