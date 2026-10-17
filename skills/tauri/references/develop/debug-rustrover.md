---
source: https://v2.tauri.app/develop/debug/rustrover/
---

# Debug in JetBrains IDEs

Set up JetBrains RustRover (mostly also applies to IntelliJ and CLion) for debugging the Core Process of a Tauri app.

## Signature / Usage

Tauri places the Rust project in the `src-tauri` subdirectory and creates a Cargo project in the root directory only if Rust is also used for frontend development. If there is no top-level `Cargo.toml`, attach the project manually: open the Cargo tool window (View | Tool Windows | Cargo), click `+` (Attach Cargo Project) and select `src-tauri/Cargo.toml`. Alternatively create a top-level Cargo workspace in the project root:

`Cargo.toml`

```toml
[workspace]
members = ["src-tauri"]
```

Make sure the project is fully loaded (the Cargo tool window shows all modules and targets of the workspace).

### Setting up Run Configurations

Two separate Run/Debug configurations are needed: one launching the Tauri app in debugging mode, another running the frontend development server.

#### Tauri App

1. Main menu: Run | Edit Configurations.
2. In Run/Debug Configurations, click `+` on the toolbar and select Cargo.
3. Configure Cargo to build the app without any default features (the `--no-default-features` flag). This makes Tauri use your development server instead of reading assets from disk. Normally the Tauri CLI passes this flag; since the CLI is sidestepped it must be passed manually.
4. Optionally rename the configuration (e.g. "Run Tauri App").

#### Development server

The configuration above uses Cargo directly and sidesteps the Tauri CLI, so `beforeDevCommand` and `beforeBuildCommand` are not executed; run the development server manually. Find the one in use in `src-tauri/tauri.conf.json`:

```json
    "beforeDevCommand": "pnpm dev"
```

- For `npm`, `pnpm` or `yarn` use the npm Run Configuration (check the Command, Scripts and Package Manager fields).
- For `trunk` (Rust-based WebAssembly frontend frameworks) use the generic Shell Script Run Configuration.

### Launching a debugging session

Run the development server first, then start debugging the Tauri App with the Debug button next to the Run Configurations Switcher. RustRover recognizes breakpoints in any Rust file of the project and stops on the first one hit; variables, stepping and runtime state can then be explored.

## Related

- [Debug](./debug-overview.md)
- Process Model
