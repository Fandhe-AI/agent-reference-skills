# winapp CLI: Package-Identity Debugging

Many Windows APIs (push notifications, background tasks, share target, startup tasks, Windows AI APIs) require an app to have **package identity**. `winapp run` and `winapp create-debug-identity` grant an unpackaged build output identity for local debug/test iteration, without producing a full MSIX installer each time. Aimed at VS Code, terminal-based workflows, and frameworks Visual Studio doesn't natively package (Rust, Flutter, Tauri, Electron, plain C++) — Visual Studio packaging projects already get identity, AUMID activation, and debugger attachment from F5 and don't need this.

## Signature / Usage

```powershell
# winapp run: registers the whole build folder as a loose layout package, then launches it
winapp run .\build\Debug

# create-debug-identity: registers a sparse package pointing at a single exe; launch it however you like
winapp create-debug-identity .\bin\Debug\myapp.exe
.\bin\Debug\myapp.exe   # or F5 in your IDE
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `winapp run <folder>` | command | Registers the entire folder as a loose layout package (full simulated MSIX install); launches via AUMID activation or execution alias |
| `--no-launch` | flag (`run`) | Register the package without launching, so an IDE can start it via AUMID/alias afterward |
| `--with-alias` | flag (`run`) | Keep stdin/stdout in the current terminal for console apps |
| `--debug-output` | flag (`run`) | Capture `OutputDebugString` and first-chance exceptions inline; auto-analyzes a minidump on crash (add `--symbols` for full native symbol resolution) |
| `winapp create-debug-identity <exe>` | command | Registers a sparse package (`Add-AppxPackage -ExternalLocation`) pointing directly at one exe; identity is tied to the exe, not the launch path |

## Notes

- **`winapp run` vs `create-debug-identity`**: `run` registers the whole folder and requires launching via AUMID/alias — simply double-clicking the exe in the build folder does **not** grant identity. `create-debug-identity` ties identity to the exe itself, so any launch method (terminal, IDE F5, script) has identity — the better choice for startup debugging or when the exe path differs from the build output (e.g. Electron's `electron.exe` under `node_modules/`).
- The **WinApp VS Code extension** adds a `winapp` debug type to `launch.json` for one-press F5 launch+attach with identity (`debuggerType`: `coreclr`/`cppvsdbg`/`node`); its "Create Debug Identity" command palette entry covers the startup-debugging case, and "Unregister Package" cleans up sideloaded dev packages.
- `--debug-output` attaches winapp itself as the process debugger — Windows allows only one debugger per process, so Visual Studio/VS Code/WinDbg cannot also be attached at the same time.
- Relevant to the sideloading/developer-mode prerequisite already covered for MSIX testing: both `run` and `create-debug-identity` register a package on the device, so Developer Mode must be enabled the same way as for sideloaded MSIX packages.

## Related

- [winapp CLI: UI Automation](./winapp-cli-ui-automation.md)
- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)
