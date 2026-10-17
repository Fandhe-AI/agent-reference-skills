---
source: https://v2.tauri.app/develop/debug/vscode/
---

# Debug in VS Code

Set up VS Code for debugging the Core Process of a Tauri app, either with the `vscode-lldb` extension (all platforms) or the Visual Studio Windows Debugger (Windows only).

## Signature / Usage

### All platforms with vscode-lldb

Install the `vscode-lldb` extension, then create `.vscode/launch.json`:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      // task for the `beforeDevCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--features=tauri/custom-protocol", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      // task for the `beforeBuildCommand` if used, must be configured in `.vscode/tasks.json`
      "preLaunchTask": "ui:build"
    }
  ]
}
```

This uses `cargo` directly to build the Rust application in development and production modes. It does not use the Tauri CLI, so exclusive CLI features are not executed. The `beforeDevCommand` and `beforeBuildCommand` scripts must be executed beforehand or configured as a task in `preLaunchTask`. Example `.vscode/tasks.json`:

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // a background `problemMatcher` is required for a background `preLaunchTask`
      "problemMatcher": {
        "owner": "custom",
        "pattern": { "regexp": "^$" },
        "background": {
          "activeBegins": true,
          "beginsPattern": ".",
          // replace with a regex matching your dev server's ready output (e.g. Vite's `Local:` line)
          "endsPattern": "Local:"
        }
      },
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      // change this to your `beforeBuildCommand`:
      "command": "yarn",
      "args": ["build"]
    }
  ]
}
```

Set breakpoints in `src-tauri/src/main.rs` or any other Rust file and press `F5`.

### Visual Studio Windows Debugger on Windows

A Windows-only debugger that is generally faster than `vscode-lldb` with better support for some Rust features such as enums. Install the C/C++ extension (`ms-vscode.cpptools`) and the Visual Studio Windows Debugger (prerequisites at https://code.visualstudio.com/docs/cpp/config-msvc#_prerequisites).

`.vscode/launch.json`

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch App Debug",
      "type": "cppvsdbg",
      "request": "launch",
      // change the exe name to your actual exe name
      // (to debug release builds, change `target/debug` to `release/debug`)
      "program": "${workspaceRoot}/src-tauri/target/debug/your-app-name-here.exe",
      "cwd": "${workspaceRoot}",
      "preLaunchTask": "ui:dev"
    }
  ]
}
```

It does not use the Tauri CLI either. `tasks.json` is the same as with `lldb`, except you add a config group and target your `preLaunchTask` at it to always compile before launching. Example running a dev server (equivalent of `beforeDevCommand`) and `cargo build` as a group; change `preLaunchTask` in `launch.json` to `dev` (or whatever you named the group):

`.vscode/tasks.json`

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build:debug",
      "type": "cargo",
      "command": "build",
      "options": {
        "cwd": "${workspaceRoot}/src-tauri"
      }
    },
    {
      "label": "ui:dev",
      "type": "shell",
      // `dev` keeps running in the background
      // ideally you should also configure a `problemMatcher`
      // see https://code.visualstudio.com/docs/editor/tasks#_can-a-background-task-be-used-as-a-prelaunchtask-in-launchjson
      "isBackground": true,
      // a background `problemMatcher` is required for a background `preLaunchTask`
      "problemMatcher": {
        "owner": "custom",
        "pattern": { "regexp": "^$" },
        "background": {
          "activeBegins": true,
          "beginsPattern": ".",
          // replace with a regex matching your dev server's ready output (e.g. Vite's `Local:` line)
          "endsPattern": "Local:"
        }
      },
      // change this to your `beforeDevCommand`:
      "command": "yarn",
      "args": ["dev"]
    },
    {
      "label": "dev",
      "dependsOn": ["build:debug", "ui:dev"],
      "group": {
        "kind": "build"
      }
    }
  ]
}
```

## Notes

- `custom-protocol` is a feature managed by the Tauri CLI; when invoking cargo directly for a production build, enable `tauri/custom-protocol` or the app keeps using `devUrl` (upstream example omits it).
- Upstream tasks.json examples set only `isBackground: true`; a background `problemMatcher` (beginsPattern / endsPattern) was added because VS Code needs it to know when a background preLaunchTask is ready. The `endsPattern` value `Local:` is a placeholder assuming Vite output; adjust it to your dev server.

## Related

- [Debug](./debug-overview.md)
- Process Model
