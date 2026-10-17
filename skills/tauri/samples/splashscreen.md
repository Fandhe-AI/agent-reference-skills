---
source: https://v2.tauri.app/learn/splashscreen/
---

# Splashscreen

Show a splashscreen window while frontend and backend setup tasks run, then close it and show the main window.

`src-tauri/tauri.conf.json` (the `main` window is hidden, the `splashscreen` window is shown directly)

```json
{
    "app": {
        "windows": [
            {
                "label": "main",
                "visible": false
            },
            {
                "label": "splashscreen",
                "url": "/splashscreen"
            }
        ]
    }
}
```

`/splashscreen.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/src/styles.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tauri App</title>
</head>
<body>
    <div class="container">
        <h1>Tauri used Splash!</h1>
        <div class="row">
            <h5>It was super effective!</h5>
        </div>
    </div>
</body>
</html>
```

Add Tokio (run where `Cargo.toml` is)

```sh
cd src-tauri
cargo add tokio -F time
```

`src/main.ts` (append below the existing code)

```javascript
import { invoke } from '@tauri-apps/api/core';

// Utility function to implement a sleep function in TypeScript
function sleep(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Setup function
async function setup() {
    // Fake perform some really heavy setup task
    console.log('Performing really heavy frontend setup task...')
    await sleep(3);
    console.log('Frontend setup task complete!')
    // Set the frontend task as being completed
    await invoke('set_complete', {task: 'frontend'}).catch(console.error)
}

// Effectively a JavaScript main function
window.addEventListener("DOMContentLoaded", () => {
    setup()
});
```

`src-tauri/src/lib.rs`

```rust
use std::sync::Mutex;
use tauri::async_runtime::spawn;
use tauri::{AppHandle, Manager, State};
use tokio::time::{sleep, Duration};

// Create a struct we'll use to track the completion of
// setup related tasks
struct SetupState {
    frontend_task: bool,
    backend_task: bool,
}

// Our main entrypoint in a version 2 mobile compatible app
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Don't write code before Tauri starts, write it in the
    // setup hook instead!
    tauri::Builder::default()
        // Register a `State` to be managed by Tauri
        // We need write access to it so we wrap it in a `Mutex`
        .manage(Mutex::new(SetupState {
            frontend_task: false,
            backend_task: false,
        }))
        // Add a command we can use to check
        .invoke_handler(tauri::generate_handler![greet, set_complete])
        // Use the setup hook to execute setup related tasks
        // Runs before the main loop, so no windows are yet created
        .setup(|app| {
            // Spawn setup as a non-blocking task so the windows can be
            // created and ran while it executes
            spawn(setup(app.handle().clone()));
            // The hook expects an Ok result
            Ok(())
        })
        // Run the app
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: String) -> String {
    format!("Hello {name} from Rust!")
}

// A custom task for setting the state of a setup task
#[tauri::command]
async fn set_complete(
    app: AppHandle,
    state: State<'_, Mutex<SetupState>>,
    task: String,
) -> Result<(), ()> {
    // Lock the state without write access
    let mut state_lock = state.lock().unwrap();
    match task.as_str() {
        "frontend" => state_lock.frontend_task = true,
        "backend" => state_lock.backend_task = true,
        _ => return Err(()),
    }
    // Check if both tasks are completed
    if state_lock.backend_task && state_lock.frontend_task {
        // Setup is complete, we can close the splashscreen
        // and unhide the main window!
        if let (Some(splash_window), Some(main_window)) = (
            app.get_webview_window("splashscreen"),
            app.get_webview_window("main"),
        ) {
            let _ = splash_window.close();
            let _ = main_window.show();
        }
    }
    Ok(())
}

// An async function that does some heavy setup task
async fn setup(app: AppHandle) -> Result<(), ()> {
    // Fake performing some heavy action for 3 seconds
    println!("Performing really heavy backend setup task...");
    sleep(Duration::from_secs(3)).await;
    println!("Backend setup task completed!");
    // Set the backend task as being completed
    // Commands can be ran as regular functions as long as you take
    // care of the input arguments yourself
    set_complete(
        app.clone(),
        app.state::<Mutex<SetupState>>(),
        "backend".to_string(),
    )
    .await?;
    Ok(())
}
```

## Notes

- Do not use `std::thread::sleep` in async functions; it blocks every task scheduled on that thread and freezes the app. Use `tokio::time::sleep`.
- The official snippet puts `windows` at the top level of tauri.conf.json; in Tauri 2 the array lives under `app.windows`, so it is wrapped in `app` here.
- The official page notes that a splashscreen is often unnecessary; a spinner in the main window is usually preferable.
- The official command panics on an unknown task and unwraps window lookups; this sample returns `Err` and skips missing windows. The official `src/main.ts` also omits the `invoke` import and the `await` / `catch`; both are added.
