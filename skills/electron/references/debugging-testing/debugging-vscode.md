---
source: https://www.electronjs.org/docs/latest/tutorial/debugging-vscode
---

# Debugging in VSCode

How to set up VSCode debugging for your own Electron project (main process) as well as for the native Electron codebase (Windows C++).

## Signature / Usage

Main process: open the project in VSCode and add `.vscode/launch.json`:

```sh
$ npx create-electron-app@latest my-app
$ code my-app
```

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args" : ["."],
      "outputCapture": "std"
    }
  ]
}
```

Set breakpoints in `main.js` and start debugging in the Debug View.

## Debugging the Electron codebase (Windows, C++)

For building Electron from source and modifying the native codebase. Electron's Build Tools (`github.com/electron/build-tools`) automates most of the build process.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(Windows) Launch",
      "type": "cppvsdbg",
      "request": "launch",
      "program": "${workspaceFolder}\\out\\your-executable-location\\electron.exe",
      "args": ["your-electron-project-path"],
      "stopAtEntry": false,
      "cwd": "${workspaceFolder}",
      "environment": [
          {"name": "ELECTRON_ENABLE_LOGGING", "value": "true"},
          {"name": "ELECTRON_ENABLE_STACK_DUMPING", "value": "true"},
          {"name": "ELECTRON_RUN_AS_NODE", "value": ""},
      ],
      "externalConsole": false,
      "sourceFileMap": {
          "o:\\": "${workspaceFolder}",
      },
    },
  ]
}
```

## Notes

- `cppvsdbg` requires the built-in C/C++ extension (`ms-vscode.cpptools`) to be enabled.
- In the C++ configuration, `${workspaceFolder}` is the full path to Chromium's `src` directory.
- `your-executable-location` is `Testing` (default settings of Build Tools or default build-from-source instructions), `Release` (for a Release build), or the directory name you specified if you changed the default.
- The `args` string `"your-electron-project-path"` should be the absolute path to either the directory or `main.js` file of the Electron project used for testing.
- Then set breakpoints in the `.cc` files of the native Electron C++ code and start debugging in the Debug View.

## Related

- [Debugging the Main Process](./debugging-main-process.md)
- [Application Debugging](./application-debugging.md)
