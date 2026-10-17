---
source: https://docs.rs/tauri/2.12.4/tauri/struct.State.html
---

# State

A guard for a state value. See `Manager::manage` for usage examples.

## Signature / Usage

```rust
pub struct State<'r, T>(/* private fields */);
```

```rust
use std::{collections::HashMap, sync::Mutex};
use tauri::State;
// here we use Mutex to achieve interior mutability
struct Storage {
  store: Mutex<HashMap<u64, String>>,
}
struct Connection;
struct DbConnection {
  db: Mutex<Option<Connection>>,
}

#[tauri::command]
fn connect(connection: State<DbConnection>) {
  // initialize the connection, mutating the state with interior mutability
  *connection.db.lock().unwrap() = Some(Connection {});
}

#[tauri::command]
fn storage_insert(key: u64, value: String, storage: State<Storage>) {
  // mutate the storage behind the Mutex
  storage.store.lock().unwrap().insert(key, value);
}

tauri::Builder::default()
  .manage(Storage { store: Default::default() })
  .manage(DbConnection { db: Default::default() })
  .invoke_handler(tauri::generate_handler![connect, storage_insert])
  // on an actual app, remove the string argument
  .run(tauri::generate_context!("test/fixture/src-tauri/tauri.conf.json"))
  .expect("error while running tauri application");
```

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| inner | `pub fn inner(&self) -> &'r T` | Retrieve a borrow to the underlying value with lifetime `'r`. Typically unnecessary since `State` implements `Deref<Target = T>`. |

Trait implementations: `Clone`, `CommandArg<'de, R>` (`from_command` "will never fail"), `Debug`, `Deref` (`Target = T`), `PartialEq`, `FunctionArg` (feature `specta`).

## Notes

- Managed state must be `Send` + `Sync`; mutate through interior mutability (e.g. `Mutex`).
- `Manager::unmanage` is deprecated since 2.3.0 because it can leave references obtained from `State::inner` dangling.
- This is Tauri's managed-state guard, not a state-management or dependency-injection facility of the fandhe-backend / fandhe-frontend Rust frameworks.

## Related

- [Manager](./manager.md)
- [Builder](./builder.md)
- [Command macros](./command-macros.md)
