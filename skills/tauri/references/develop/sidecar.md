---
source: https://v2.tauri.app/develop/sidecar/
---

# Embedding External Binaries

A `sidecar` is an external executable (written in any language, e.g. a `pyinstaller`-bundled Python CLI or API server) embedded into the app via `bundle.externalBin`, so users do not need to install extra dependencies such as Node.js or Python.

## Signature / Usage

`src-tauri/tauri.conf.json`

```json
{
  "bundle": {
    "externalBin": [
      "/absolute/path/to/sidecar",
      "../relative/path/to/binary",
      "binaries/my-sidecar"
    ]
  }
}
```

`externalBin` takes a list of strings with absolute or relative paths. Relative paths are relative to `tauri.conf.json` in `src-tauri`, so `binaries/my-sidecar` is `<PROJECT ROOT>/src-tauri/binaries/my-sidecar`.

For each supported architecture a binary with the same name and a `-$TARGET_TRIPLE` suffix must exist at that path. For `"externalBin": ["binaries/my-sidecar"]` this means `src-tauri/binaries/my-sidecar-x86_64-unknown-linux-gnu` on Linux or `src-tauri/binaries/my-sidecar-aarch64-apple-darwin` on macOS with Apple Silicon.

Find the current platform's target triple:

```sh
rustc --print host-tuple
```

The `--print host-tuple` flag was added in Rust 1.84.0. For older versions parse `rustc -Vv`:

```sh
# Unix (Linux/macOS)
rustc -Vv | grep host | cut -f2 -d' '

# Windows PowerShell
rustc -Vv | Select-String "host:" | ForEach-Object {$_.Line.split(" ")[1]}
```

Node.js script to append the target triple to a binary (does not work when compiling for a different architecture than the one it runs on; use it as a starting point):

```javascript
import { execSync } from 'child_process';
import fs from 'fs';

const extension = process.platform === 'win32' ? '.exe' : '';

const targetTriple = execSync('rustc --print host-tuple').toString().trim();
if (!targetTriple) {
  console.error('Failed to determine platform target triple');
}
fs.renameSync(
  `src-tauri/binaries/sidecar${extension}`,
  `src-tauri/binaries/sidecar-${targetTriple}${extension}`
);
```

### Running it from Rust

Set up and initialize the shell plugin first; without it the example does not work. Import the `tauri_plugin_shell::ShellExt` trait and call `shell().sidecar()` on the AppHandle:

```rust
use tauri_plugin_shell::ShellExt;
use tauri_plugin_shell::process::CommandEvent;
use tauri::Emitter;

let sidecar_command = app.shell().sidecar("my-sidecar").unwrap();
let (mut rx, mut child) = sidecar_command
  .spawn()
  .expect("Failed to spawn sidecar");

tauri::async_runtime::spawn(async move {
  // read events such as stdout
  while let Some(event) = rx.recv().await {
    if let CommandEvent::Stdout(line_bytes) = event {
      let line = String::from_utf8_lossy(&line_bytes);
      app
        .emit("message", Some(format!("'{}'", line)))
        .expect("failed to emit event");
      // write to stdin
      child.write("message from Rust\n".as_bytes()).unwrap();
    }
  }
});
```

`sidecar()` expects just the filename, NOT the whole path configured in `externalBin`. With:

```json
{
  "bundle": {
    "externalBin": ["binaries/app", "my-sidecar", "../scripts/sidecar"]
  }
}
```

call `app.shell().sidecar(name)` where `name` is `"app"`, `"my-sidecar"` or `"sidecar"`, not `"binaries/app"`.

The code can be placed inside a Tauri command to receive the AppHandle, or a reference to the AppHandle can be stored in the builder script.

### Running it from JavaScript

Grant permission to run `execute` or `spawn` on the child process in `<PROJECT ROOT>/src-tauri/capabilities/default.json`, naming the sidecar according to the relative path:

```json
{
  "permissions": [
    "core:default",
    {
      "identifier": "shell:allow-execute",
      "allow": [
        {
          "name": "binaries/my-sidecar",
          "sidecar": true
        }
      ]
    }
  ]
}
```

`shell:allow-execute` is used because the child process is started with `command.execute()`. For `command.spawn()` change the identifier to `shell:allow-spawn` or add another entry with that identifier.

```javascript
import { Command } from '@tauri-apps/plugin-shell';
const command = Command.sidecar('binaries/my-sidecar');
const output = await command.execute();
```

The string passed to `Command.sidecar` must match one of the strings in the `externalBin` array.

### Passing arguments

Arguments are passed like a normal `std::process::Command`. They can be static (e.g. `-o`, `serve`) or dynamic (e.g. `<file_path>`, `localhost:<PORT>`, defined with a regular expression). A value of `true` allows any arguments; `false` disables all arguments. Otherwise define the arguments in the exact order they are called.

`src-tauri/capabilities/default.json`

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    {
      "identifier": "shell:allow-execute",
      "allow": [
        {
          "args": [
            "arg1",
            "-a",
            "--arg2",
            {
              "validator": "\\S+"
            }
          ],
          "name": "binaries/my-sidecar",
          "sidecar": true
        }
      ]
    }
  ]
}
```

Then pass all the arguments as an array. Rust:

```rust
use tauri_plugin_shell::ShellExt;
#[tauri::command]
async fn call_my_sidecar(app: tauri::AppHandle) {
  let sidecar_command = app
    .shell()
    .sidecar("my-sidecar")
    .unwrap()
    .args(["arg1", "-a", "--arg2", "any-string-that-matches-the-validator"]);
  let (mut _rx, mut _child) = sidecar_command.spawn().unwrap();
}
```

JavaScript:

```javascript
import { Command } from '@tauri-apps/plugin-shell';
// notice that the args array matches EXACTLY what is specified in `capabilities/default.json`.
const command = Command.sidecar('binaries/my-sidecar', [
  'arg1',
  '-a',
  '--arg2',
  'any-string-that-matches-the-validator',
]);
const output = await command.execute();
```

## Notes

- Upstream capability example allows `binaries/app` while the JavaScript code runs `binaries/my-sidecar`; the name was unified to `binaries/my-sidecar`.
- Migrating from Tauri v1: the `migrate` command of the Tauri v2 CLI handles the argument configuration conversion.
- Environment variable `TAURI_SKIP_SIDECAR_SIGNATURE_CHECK` skips signing sidecars (see Environment Variables).

## Related

- Shell plugin
- [Embedding Additional Files](./resources.md)
- [Environment Variables](./environment-variables.md)
