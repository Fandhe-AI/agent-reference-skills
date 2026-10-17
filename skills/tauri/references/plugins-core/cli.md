---
source: https://v2.tauri.app/plugin/cli/
---

# Command Line Interface (CLI) plugin

Gives your Tauri app a command line interface through clap. A CLI definition in `tauri.conf.json` defines the interface; argument matches are read in JavaScript and/or Rust. This is for the app's own CLI, not the `tauri` developer CLI.

## Signature / Usage

### Supported Platforms

| Platform | Level |
| --- | --- |
| Windows | full |
| Linux | full |
| macOS | full |
| Android | none |
| iOS | none |

(`cli-v2.5.0`.) On Windows, due to an OS limitation, production apps are not able to write text back to the calling console by default (see tauri issue 8305 for a workaround).

### Setup

```sh
npm run tauri add cli
# or: cargo tauri add cli
```

Manual (desktop only). From `src-tauri`:

```sh
cargo add tauri-plugin-cli --target 'cfg(any(target_os = "macos", windows, target_os = "linux"))'
```

From the project root, install the JavaScript guest bindings:

```sh
npm install @tauri-apps/plugin-cli
```

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_cli::init());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Usage

JavaScript:

```javascript
import { getMatches } from '@tauri-apps/plugin-cli';
// when using `"withGlobalTauri": true`, you may use
// const { getMatches } = window.__TAURI__.cli;

const matches = await getMatches();
if (matches.subcommand?.name === 'run') {
  // `./your-app run $ARGS` was executed
  const args = matches.subcommand.matches.args;
  if (args.debug?.value === true) {
    // `./your-app run --debug` was executed
  }
  if (args.release?.value === true) {
    // `./your-app run --release` was executed
  }
}
```

Rust:

```rust
#[cfg(desktop)]
use tauri_plugin_cli::CliExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
   tauri::Builder::default()
       .setup(|app| {
           #[cfg(desktop)]
           {
               app.handle().plugin(tauri_plugin_cli::init())?;
               match app.cli().matches() {
                   // `matches` here is a Struct with { args, subcommand }.
                   // `args` is `HashMap<String, ArgData>` where `ArgData` is a struct with { value, occurrences }.
                   // `subcommand` is `Option<Box<SubcommandMatches>>` where `SubcommandMatches` is a struct with { name, matches }.
                   Ok(matches) => {
                       println!("{:?}", matches)
                   }
                   Err(_) => {}
               }
           }
           Ok(())
       })
       .run(tauri::generate_context!())
       .expect("error while running tauri application");
}
```

### Permissions

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": ["cli:default"]
}
```

`cli:default` allows reading the CLI matches (`allow-cli-matches`). The permission identifiers are `cli:allow-cli-matches` and `cli:deny-cli-matches`.

## Options / Props

Base configuration under `plugins.cli` in `tauri.conf.json`:

```json
{
  "plugins": {
    "cli": {
      "description": "Tauri CLI Plugin Example",
      "args": [
        {
          "short": "v",
          "name": "verbose",
          "description": "Verbosity level"
        }
      ],
      "subcommands": {
        "run": {
          "description": "Run the application",
          "args": [
            {
              "name": "debug",
              "description": "Run application in debug mode"
            },
            {
              "name": "release",
              "description": "Run application in release mode"
            }
          ]
        }
      }
    }
  }
}
```

Argument kinds in the `args` array:

| Kind | Example config | Invocation / result |
| --- | --- | --- |
| Positional | `{ "name": "source", "index": 1, "takesValue": true }`, `{ "name": "destination", "index": 2, "takesValue": true }` | `./app tauri.txt dest.txt` gives `source` = `"tauri.txt"`, `destination` = `"dest.txt"` |
| Named | `{ "name": "type", "short": "t", "takesValue": true, "multiple": true, "possibleValues": ["foo", "bar"] }` | `./app --type foo bar`, `./app -t foo -t bar` or `./app --type=foo,bar` gives `type` = `["foo", "bar"]` |
| Flag | `{ "name": "verbose", "short": "v" }` | `./app -v -v -v`, `./app --verbose --verbose --verbose` or `./app -vvv` gives `verbose` = `true`, `occurrences = 3` |

Subcommands are nested interfaces in the `subcommands` object; each has the same configuration as the root (`description`, `longDescription`, `args`, ...):

```json
{
  "cli": {
    ...
    "subcommands": {
      "branch": {
        "args": []
      },
      "push": {
        "args": []
      }
    }
  }
}
```

## Notes

- Tauri plugin (Rust core + system WebView). It parses arguments for your own app; the `tauri` developer CLI (dev / build / android / ios) is in the `cli` category.
- The official page notes that the JSON configurations are samples with many other fields omitted, and that the list of available `args` configuration options is not documented there.
- The Usage snippet is gated with `#[cfg(desktop)]` to match the desktop-only dependency; the official one registers the plugin unconditionally.
- Source: `tauri-apps/plugins-workspace@cli-v2.5.0` `plugins/cli/Cargo.toml`, `plugins/cli/permissions/autogenerated/reference.md`; docs `plugin/cli.mdx` @ `32f68c5`.

## Related

- [../plugin-js-api-core/cli.md](../plugin-js-api-core/cli.md)
