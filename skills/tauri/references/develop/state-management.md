---
source: https://v2.tauri.app/develop/state-management/
---

# State Management

Manage application state with the `Manager` API (`manage` / `state`) and read it in commands via `tauri::State`.

## Signature / Usage

```rust
use tauri::{Builder, Manager};

struct AppData {
  welcome_message: &'static str,
}

fn main() {
  Builder::default()
    .setup(|app| {
      app.manage(AppData {
        welcome_message: "Welcome to Tauri!",
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .unwrap();
}
```

Access it with any type implementing `Manager`, e.g. the `App` instance:

```rust
let data = app.state::<AppData>();
```

## Mutability

State shared between threads cannot be mutated directly; use interior mutability such as the standard library `Mutex`.

```rust
use std::sync::Mutex;

use tauri::{Builder, Manager};

#[derive(Default)]
struct AppState {
  counter: u32,
}

fn main() {
  Builder::default()
    .setup(|app| {
      app.manage(Mutex::new(AppState::default()));
      Ok(())
    })
    .run(tauri::generate_context!())
    .unwrap();
}
```

```rust
let state = app.state::<Mutex<AppState>>();

// Lock the mutex to get mutable access:
let mut state = state.lock().unwrap();

// Modify the state:
state.counter += 1;
```

The mutex unlocks when the `MutexGuard` is dropped.

- When to use an async mutex: quoting the Tokio docs, the standard library `Mutex` is fine and often preferred in async code; an async mutex is mainly for shared mutable access to IO resources such as a database connection, or when the `MutexGuard` must be held across await points.
- `Arc` is not needed for things stored in `State`; Tauri does this for you. If lifetime requirements prevent moving state into a thread, move an `AppHandle` (cheap to clone) into the thread and retrieve the state from it.

## Accessing state

In commands:

```rust
#[tauri::command]
fn increase_counter(state: State<'_, Mutex<AppState>>) -> u32 {
  let mut state = state.lock().unwrap();
  state.counter += 1;
  state.counter
}
```

Async commands with Tokio's async `Mutex` (the return type must be `Result` because of the borrowed `State<'_, T>` argument):

```rust
#[tauri::command]
async fn increase_counter(state: State<'_, Mutex<AppState>>) -> Result<u32, ()> {
  let mut state = state.lock().await;
  state.counter += 1;
  Ok(state.counter)
}
```

Outside commands, via the `Manager` trait (e.g. in `on_window_event`):

```rust
use std::sync::Mutex;
use tauri::{Builder, Window, WindowEvent, Manager};

#[derive(Default)]
struct AppState {
  counter: u32,
}

// In an event handler:
fn on_window_event(window: &Window, _event: &WindowEvent) {
    // Get a handle to the app so we can get the global state.
    let app_handle = window.app_handle();
    let state = app_handle.state::<Mutex<AppState>>();

    // Lock the mutex to mutably access the state.
    let mut state = state.lock().unwrap();
    state.counter += 1;
}

fn main() {
  Builder::default()
    .setup(|app| {
      app.manage(Mutex::new(AppState::default()));
      Ok(())
    })
    .on_window_event(on_window_event)
    .run(tauri::generate_context!())
    .unwrap();
}
```

## Mismatching types

A wrong type in the `State` parameter gives no compile-time error. Invoking the command fails at runtime: the frontend `invoke` is rejected with a `state not managed for field ...` error. `Manager::state()` on an unmanaged type panics. Using a type alias prevents the mistake (do not wrap the alias in a `Mutex` a second time):

```rust
use std::sync::Mutex;

#[derive(Default)]
struct AppStateInner {
  counter: u32,
}

type AppState = Mutex<AppStateInner>;
```

## Notes

- Tauri's `State` / `Manager` is the application state API of the Tauri Rust crate; it is not the state or router type of fandhe-backend (HTTP server framework) or fandhe-frontend.

## Related

- [Calling Rust from the Frontend](./calling-rust.md)
