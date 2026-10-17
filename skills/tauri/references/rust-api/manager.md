---
source: https://docs.rs/tauri/2.12.4/tauri/trait.Manager.html
---

# Manager trait

Manages a running application. Implemented by `App`, `AppHandle`, `Webview`, `WebviewWindow` and `Window`.

## Signature / Usage

```rust
pub trait Manager<R: Runtime>: ManagerBase<R> {
    // Required method
    fn resources_table(&self) -> MutexGuard<'_, ResourceTable>;

    // Provided methods
    fn app_handle(&self) -> &AppHandle<R> { ... }
    fn config(&self) -> &Config { ... }
    fn package_info(&self) -> &PackageInfo { ... }
    fn get_window(&self, label: &str) -> Option<Window<R>> { ... }
    fn get_focused_window(&self) -> Option<Window<R>> { ... }
    fn windows(&self) -> HashMap<String, Window<R>> { ... }
    fn get_webview(&self, label: &str) -> Option<Webview<R>> { ... }
    fn webviews(&self) -> HashMap<String, Webview<R>> { ... }
    fn get_webview_window(&self, label: &str) -> Option<WebviewWindow<R>> { ... }
    fn webview_windows(&self) -> HashMap<String, WebviewWindow<R>> { ... }
    fn manage<T>(&self, state: T) -> bool
       where T: Send + Sync + 'static { ... }
    fn unmanage<T>(&self) -> Option<T>
       where T: Send + Sync + 'static { ... }
    fn state<T>(&self) -> State<'_, T>
       where T: Send + Sync + 'static { ... }
    fn try_state<T>(&self) -> Option<State<'_, T>>
       where T: Send + Sync + 'static { ... }
    fn env(&self) -> Env { ... }
    fn asset_protocol_scope(&self) -> Scope { ... }
    fn path(&self) -> &PathResolver<R> { ... }
    fn add_capability(&self, capability: impl RuntimeCapability) -> Result<()> { ... }
}
```

```rust
use tauri::{Manager, State};

struct MyInt(isize);
struct MyString(String);

#[tauri::command]
fn int_command(state: State<MyInt>) -> String {
    format!("The stateful int is: {}", state.0)
}

tauri::Builder::default()
  .setup(|app| {
    app.manage(MyInt(0));
    app.manage(MyString("tauri".into()));
    // `MyInt` is already managed, so `manage()` returns false
    assert!(!app.manage(MyInt(1)));
    // read the `MyInt` managed state with the turbofish syntax
    let int = app.state::<MyInt>();
    assert_eq!(int.0, 0);
    // read the `MyString` managed state with the `State` guard
    let val: State<MyString> = app.state();
    assert_eq!(val.0, "tauri");
    Ok(())
  })
  .invoke_handler(tauri::generate_handler![int_command])
  // on an actual app, remove the string argument
  .run(tauri::generate_context!("test/fixture/src-tauri/tauri.conf.json"))
  .expect("error while running tauri application");
```

## Options / Props

### Methods

| Method | Availability | Description |
| --- | --- | --- |
| resources_table | required | Get a reference to the resources table of this manager. |
| app_handle | provided | The application handle associated with this manager. |
| config | provided | The `Config` the manager was created with. |
| package_info | provided | The `PackageInfo` the manager was created with. |
| get_window | feature `unstable` | Fetch a single window from the manager. |
| get_focused_window | feature `unstable` | Fetch the focused window; `None` if there is none. |
| windows | feature `unstable` | Fetch all managed windows. |
| get_webview | feature `unstable` | Fetch a single webview from the manager. |
| webviews | feature `unstable` | Fetch all managed webviews. |
| get_webview_window | provided | Fetch a single webview window from the manager. |
| webview_windows | provided | Fetch all managed webview windows. |
| manage | provided | Add `state` to the state managed by the application. Returns `false` (state unchanged) if state for `T` was already set, otherwise `true`. |
| unmanage | deprecated since 2.3.0 | Removes the state managed for `T`; returns the state if it was removed. |
| state | provided | Retrieves the managed state for `T`; panics if not managed. |
| try_state | provided | Attempts to retrieve the managed state for `T`; `None` if not managed. |
| env | provided | Gets the managed `Env`. |
| asset_protocol_scope | feature `protocol-asset` | Gets the scope for the asset protocol. |
| path | provided | The path resolver. |
| add_capability | feature `dynamic-acl` | Adds a capability to the app. |

`add_capability` example:

```rust
use tauri::Manager;

tauri::Builder::default()
  .setup(|app| {
    #[cfg(feature = "beta")]
    app.add_capability(include_str!("../capabilities/beta/cap.json"));

    #[cfg(feature = "stable")]
    app.add_capability(include_str!("../capabilities/stable/cap.json"));
    Ok(())
  });
```

## Notes

- Managed state can be retrieved by any command handler via the `State` guard: adding `State<T>` to the arguments instructs Tauri to retrieve the managed value of type `T`.
- Managed state is global and must be `Send` + `Sync`, so mutation happens through interior mutability (e.g. `Mutex`).
- `unmanage` is UNSAFE: previously obtained references through `Manager::state` and `State::inner` become dangling. It is deprecated and may be removed; to unmanage a state, wrap it with `std::sync::Mutex` and `Option::take` instead (tauri-apps/tauri#12721).
- `add_capability`: by default every capability file in `src-tauri/capabilities` is automatically enabled unless specific capabilities are configured in `tauri.conf.json > app > security > capabilities`; use a different directory for runtime-added capabilities (the docs example uses `./capabilities/app/*.json` via `tauri_build::Attributes::new().capabilities_path_pattern(...)`).
- The trait is not dyn compatible.
- Tauri capabilities / permissions (ACL) are documented in the security category; this page covers only the Rust method.
- Tauri `Manager` (Rust core), not Electron; see the electron skill.

## Related

- [State](./state.md)
- [App](./app.md)
- [AppHandle](./app-handle.md)
- [PathResolver](./path-resolver.md)
- [Events](./events.md)
