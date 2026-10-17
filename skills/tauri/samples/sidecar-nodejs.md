---
source: https://v2.tauri.app/learn/sidecar-nodejs/
---

# Node.js as a Sidecar

Package a Node.js app into a self-contained binary with `pkg` and run it as a Tauri sidecar (desktop only).

`sidecar-app/index.js`

```js
const command = process.argv[2];

switch (command) {
  case 'hello':
    const message = process.argv[3];
    console.log(`Hello ${message}!`);
    break;
  default:
    console.error(`unknown command ${command}`);
    process.exit(1);
}
```

Install `pkg` in `sidecar-app` and add the build script to `sidecar-app/package.json`

```sh
npm add @yao-pkg/pkg --save-dev
```

```json
{
  "type": "module",
  "scripts": {
    "build": "pkg index.js --output my-sidecar"
  }
}
```

Create the destination directory (run from `sidecar-app`) before running `rename.js`

```sh
mkdir -p ../src-tauri/binaries
```

`sidecar-app/rename.js` (rename to the `<name>-<target-triple>` pattern and move into the Tauri project)

```js
import { execSync } from 'child_process';
import fs from 'fs';

const ext = process.platform === 'win32' ? '.exe' : '';

const targetTriple = execSync('rustc --print host-tuple').toString().trim();
if (!targetTriple) {
  console.error('Failed to determine platform target triple');
  process.exit(1);
}
fs.renameSync(
  `my-sidecar${ext}`,
  `../src-tauri/binaries/my-sidecar-${targetTriple}${ext}`
);
```

`src-tauri/capabilities/default.json`

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "opener:default",
    {
      "identifier": "shell:allow-execute",
      "allow": [
        {
          "args": true,
          "name": "binaries/my-sidecar",
          "sidecar": true
        }
      ]
    }
  ]
}
```

`src-tauri/tauri.conf.json`

```json
{
  "bundle": {
    "externalBin": ["binaries/my-sidecar"]
  }
}
```

Execute the sidecar (JavaScript)

```js
import { Command } from '@tauri-apps/plugin-shell';

const message = 'Tauri';

const command = Command.sidecar('binaries/my-sidecar', ['hello', message]);
const output = await command.execute();
// once everything is configured it should log "Hello Tauri" in the browser console.
console.log(output.stdout)
```

Execute the sidecar (Rust command; register it in `invoke_handler`)

```rust
use tauri_plugin_shell::ShellExt;

#[tauri::command]
async fn hello(app: tauri::AppHandle, cmd: String, message: String) -> String {
    let sidecar_command = app
        .shell()
        .sidecar("my-sidecar")
        .unwrap()
        .arg(cmd)
        .arg(message);
    let output = sidecar_command.output().await.unwrap();
    String::from_utf8(output.stdout).unwrap()
}
```

```js
import { invoke } from "@tauri-apps/api/core";

const message = "Tauri"
console.log(await invoke("hello", { cmd: 'hello', message }))
```

## Notes

- The shell plugin must be set up and initialized first; without it the example does not work.
- `rename.js` does not create `src-tauri/binaries`; the official page marks this with a TODO comment (omitted above), so create the directory first (see the `mkdir` step).
- The binary in `src-tauri/binaries/` must be named `my-sidecar-<target-triple>` (with `.exe` on Windows) for the CLI to bundle it.
- `rustc --print host-tuple` needs Rust 1.84.0+; for older versions the official page parses the output of `rustc -vV` instead.
- The official build script runs `pkg index.ts`; it is changed to `index.js` here to match the file created above.
- The official snippet shows only the permissions array; identifier and windows are added so the file loads as a complete capability.
- The official `rename.js` continues after a failed triple lookup and relies on ESM without setting it up; this sample exits on failure and sets `"type": "module"` in `package.json`.
- Each alternative IPC approach (localhost server, stdin/stdout, local sockets) has its own drawbacks and security concerns; this example is a short-lived process reading `process.argv`.
