# develop

| Name | Description | Path |
|------|-------------|------|
| Calling the Frontend from Rust | The Rust side calls the frontend through the event system, channels, or direct JavaScript evaluation. | [calling-frontend.md](./calling-frontend.md) |
| Calling Rust from the Frontend | Type-safe `command` primitive for calling Rust functions from the web app, plus an event system. | [calling-rust.md](./calling-rust.md) |
| Configuration Files | Files that configure a Tauri project: `tauri.conf.json`, `Cargo.toml` and `package.json`. | [configuration-files.md](./configuration-files.md) |
| CrabNebula DevTools | Free DevTools app for Tauri that shows logs, spans, commands and events in real time. | [crabnebula-devtools.md](./crabnebula-devtools.md) |
| Debug in Neovim | Debug Tauri Rust code in Neovim with `nvim-dap`, `nvim-dap-ui` and `overseer.nvim`. | [debug-neovim.md](./debug-neovim.md) |
| Debug | Where error details are printed and the debugging tools Tauri provides. | [debug-overview.md](./debug-overview.md) |
| Debug in JetBrains IDEs | Set up JetBrains RustRover (also IntelliJ and CLion) to debug the Core Process. | [debug-rustrover.md](./debug-rustrover.md) |
| Debug in VS Code | Set up VS Code to debug the Core Process with `vscode-lldb` or the Visual Studio Windows Debugger. | [debug-vscode.md](./debug-vscode.md) |
| Environment Variables | All environment variables used by the Tauri core crates and the Tauri CLI. | [environment-variables.md](./environment-variables.md) |
| App Icons | Generate all platform app icons from one input file with the `icon` command. | [icons.md](./icons.md) |
| Linux graphics debugging | Troubleshoot WebKitGTK rendering problems on Linux, most often with NVIDIA GPUs. | [linux-graphics.md](./linux-graphics.md) |
| Mobile Plugin Development | Plugins with native Kotlin (or Java) and Swift code, called from Rust. | [mobile-plugin-development.md](./mobile-plugin-development.md) |
| Mock Tauri APIs | Mock Tauri APIs in frontend tests with `mockIPC`, `mockWindows` and `clearMocks`. | [mocking.md](./mocking.md) |
| Develop | Running the dev server, desktop and mobile development, source watching and DevTools. | [overview.md](./overview.md) |
| Plugin Development | Build a Tauri plugin: a Cargo crate plus optional NPM bindings and mobile projects. | [plugin-development.md](./plugin-development.md) |
| Embedding Additional Files | Bundle non-frontend files with `bundle.resources` and resolve their paths at runtime. | [resources.md](./resources.md) |
| Embedding External Binaries | Embed an external executable via `bundle.externalBin` so users need no extra runtime. | [sidecar.md](./sidecar.md) |
| State Management | Manage app state with the `Manager` API (`manage` / `state`) and read it in commands. | [state-management.md](./state-management.md) |
| Tests | Unit, integration and end-to-end testing techniques for Tauri apps, including WebDriver. | [tests-overview.md](./tests-overview.md) |
| Continuous Integration (WebDriver) | Run `tauri-driver` WebDriver tests on CI, using the WebdriverIO example on GitHub Actions. | [webdriver-ci.md](./webdriver-ci.md) |
| WebDriver Manual Setup | Drive `tauri-driver` directly without the WebdriverIO service (Selenium, custom harness). | [webdriver-manual-setup.md](./webdriver-manual-setup.md) |
| WebDriver | Standardized interface for automated web testing; recommended via `@wdio/tauri-service`. | [webdriver-overview.md](./webdriver-overview.md) |
