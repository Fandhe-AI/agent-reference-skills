---
source: https://v2.tauri.app/learn/mobile-file-associations/
---

# File Associations on Mobile

Register the app as a handler for file types on Android and iOS and receive the opened file URLs in Rust and the frontend.

`src-tauri/tauri.conf.json`

```json
{
  "bundle": {
    "fileAssociations": [
      {
        "ext": ["png"],
        "mimeType": "image/png"
      },
      {
        "ext": ["jpg", "jpeg"],
        "mimeType": "image/jpeg"
      }
    ]
  }
}
```

Custom file type (Apple platforms need an `exportedType`)

```json
{
  "bundle": {
    "fileAssociations": [
      {
        "ext": ["mydata"],
        "mimeType": "application/octet-stream",
        "exportedType": {
          "identifier": "com.example.myapp.mydata",
          "conformsTo": ["public.data"]
        }
      }
    ]
  }
}
```

`src-tauri/src/lib.rs`

```rust
use std::sync::Mutex;
use tauri::Manager;

struct OpenedUrls(Mutex<Vec<tauri::Url>>);

#[tauri::command]
fn opened_urls(app: tauri::AppHandle) -> Vec<tauri::Url> {
    app.state::<OpenedUrls>().0.lock().unwrap().clone()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(OpenedUrls(Mutex::new(vec![])))
        .invoke_handler(tauri::generate_handler![opened_urls])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|app, event| {
            #[cfg(any(target_os = "macos", target_os = "ios", target_os = "android"))]
            if let tauri::RunEvent::Opened { urls } = event {
                use tauri::Emitter;
                app.state::<OpenedUrls>()
                    .0
                    .lock()
                    .unwrap()
                    .extend(urls.clone());
                app.emit("opened", urls).unwrap();
            }
        });
}
```

Frontend

```javascript
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';

// Cold start: URLs may already be in Rust state before the frontend loads
const initialUrls = await invoke('opened_urls');
if (initialUrls.length > 0) {
  handleFiles(initialUrls);
}

// Warm: Rust emits the "opened" event when RunEvent::Opened fires
await listen('opened', (event) => {
  handleFiles(event.payload);
});
```

## Notes

- `RunEvent::Opened` is available on macOS, iOS and Android; handle both the already-running case (event) and the launched-by-file case (stored URLs read through a command).
- `mimeType` is required on Android for intent filter matching; Tauri infers common MIME types from extensions when omitted.
- Other options: `role` (`Editor` default, `Viewer`, `Shell`, `QLGenerator`, `None`), `rank` (`Default`, `Owner`, `Alternate`, `None`), `name`, `androidIntentActionFilters` (`Send`, `SendMultiple`, `View`; all three by default).
- `handleFiles` in the frontend snippet is a placeholder for your own handler and is not defined on the official page.
