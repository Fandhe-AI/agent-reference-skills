---
source: https://v2.tauri.app/develop/calling-rust/
---

# Command with State and Channel

Define a Tauri command that uses managed state and the invoking window, and stream progress to the frontend with a `Channel`.

Managed state in a command (`src-tauri/src/lib.rs`)

```rust
use std::sync::Mutex;
use tauri::{Builder, Manager, State};

#[derive(Default)]
struct AppState {
  counter: u32,
}

#[tauri::command]
fn increase_counter(state: State<'_, Mutex<AppState>>) -> u32 {
  let mut state = state.lock().unwrap();
  state.counter += 1;
  state.counter
}

fn main() {
  Builder::default()
    .setup(|app| {
      app.manage(Mutex::new(AppState::default()));
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![increase_counter])
    .run(tauri::generate_context!())
    .unwrap();
}
```

Window access, arguments and `Result` in one command

```rust
struct Database;

#[derive(serde::Serialize)]
struct CustomResponse {
	message: String,
	other_val: usize,
}

async fn some_other_function() -> Option<String> {
	Some("response".into())
}

#[tauri::command]
async fn my_custom_command(
	window: tauri::WebviewWindow,
	number: usize,
	database: tauri::State<'_, Database>,
) -> Result<CustomResponse, String> {
	println!("Called from {}", window.label());
	let result: Option<String> = some_other_function().await;
	if let Some(message) = result {
		Ok(CustomResponse {
			message,
			other_val: 42 + number,
		})
	} else {
		Err("No result".into())
	}
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.manage(Database {})
		.invoke_handler(tauri::generate_handler![my_custom_command])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
```

```javascript
import { invoke } from '@tauri-apps/api/core';

// Invocation from JavaScript
invoke('my_custom_command', {
  number: 42,
})
  .then((res) =>
    console.log(`Message: ${res.message}, Other Val: ${res.other_val}`)
  )
  .catch((e) => console.error(e));
```

Streaming with a Channel (Rust)

```rust
use tauri::{AppHandle, ipc::Channel};
use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase", rename_all_fields = "camelCase", tag = "event", content = "data")]
enum DownloadEvent<'a> {
  Started {
    url: &'a str,
    download_id: usize,
    content_length: usize,
  },
  Progress {
    download_id: usize,
    chunk_length: usize,
  },
  Finished {
    download_id: usize,
  },
}

#[tauri::command]
fn download(app: AppHandle, url: String, on_event: Channel<DownloadEvent>) {
  let content_length = 1000;
  let download_id = 1;

  on_event.send(DownloadEvent::Started {
    url: &url,
    download_id,
    content_length,
  }).unwrap();

  for chunk_length in [15, 150, 35, 500, 300] {
    on_event.send(DownloadEvent::Progress {
      download_id,
      chunk_length,
    }).unwrap();
  }

  on_event.send(DownloadEvent::Finished { download_id }).unwrap();
}
```

Streaming with a Channel (frontend)

```ts
import { invoke, Channel } from '@tauri-apps/api/core';

type DownloadEvent =
  | {
      event: 'started';
      data: {
        url: string;
        downloadId: number;
        contentLength: number;
      };
    }
  | {
      event: 'progress';
      data: {
        downloadId: number;
        chunkLength: number;
      };
    }
  | {
      event: 'finished';
      data: {
        downloadId: number;
      };
    };

const onEvent = new Channel<DownloadEvent>();
onEvent.onmessage = (message) => {
  console.log(`got download event ${message.event}`);
};

await invoke('download', {
  url: 'https://raw.githubusercontent.com/tauri-apps/tauri/dev/crates/tauri-schema-generator/schemas/config.schema.json',
  onEvent,
});
```

## Notes

- Tauri commands and IPC (Rust core to system WebView). Not Electron's `ipcMain` / `ipcRenderer`; see the electron skill for Electron. `State` here is Tauri's managed state, not a Rust web framework extractor (distinct from fandhe-backend).
- Argument keys passed from JavaScript are camelCase by default (`invokeMessage` for `invoke_message`); `#[tauri::command(rename_all = "snake_case")]` changes that.
- Using the wrong type for `State<'_, T>` compiles but fails at runtime (`state not managed for field ...`); if the managed value is `Mutex<AppState>`, the parameter must be `State<'_, Mutex<AppState>>`.
- Async commands cannot take borrowed arguments such as `&str` or `State<'_, T>` directly; either convert them to owned types (`String`) or return a `Result`.
- Channels are the recommended mechanism for streaming ordered data; plain events are simpler but not type safe and unsuitable for large data.
- The `Database` command in the second snippet is the official "Complete Example"; the state snippet combines the official state-management examples with an `invoke_handler` registration.
