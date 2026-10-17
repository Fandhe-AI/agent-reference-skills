---
source: https://v2.tauri.app/plugin/updater/
---

# Updater: Check and Install

Check for an update, download and install it with progress, and restart the app, from JavaScript or Rust.

JavaScript

```js
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

const update = await check();
if (update) {
  console.log(
    `found update ${update.version} from ${update.date} with notes ${update.body}`
  );
  let downloaded = 0;
  let contentLength = 0;
  // alternatively we could also call update.download() and update.install() separately
  await update.downloadAndInstall((event) => {
    switch (event.event) {
      case 'Started':
        contentLength = event.data.contentLength;
        console.log(`started downloading ${event.data.contentLength} bytes`);
        break;
      case 'Progress':
        downloaded += event.data.chunkLength;
        console.log(`downloaded ${downloaded} from ${contentLength}`);
        break;
      case 'Finished':
        console.log('download finished');
        break;
    }
  });

  console.log('update installed');
  await relaunch();
}
```

Rust (`src-tauri/src/lib.rs`)

```rust
use tauri_plugin_updater::UpdaterExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      #[cfg(desktop)]
      app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;

      let handle = app.handle().clone();
      tauri::async_runtime::spawn(async move {
        update(handle).await.unwrap();
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .unwrap();
}

async fn update(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
  if let Some(update) = app.updater()?.check().await? {
    let mut downloaded = 0;

    // alternatively we could also call update.download() and update.install() separately
    update
      .download_and_install(
        |chunk_length, content_length| {
          downloaded += chunk_length;
          println!("downloaded {downloaded} from {content_length:?}");
        },
        || {
          println!("download finished");
        },
      )
      .await?;

    println!("update installed");
    app.restart();
  }

  Ok(())
}
```

Custom timeout, proxy and headers

```js
import { check } from '@tauri-apps/plugin-updater';

const update = await check({
  proxy: '<proxy url>',
  timeout: 30000 /* milliseconds */,
  headers: {
    Authorization: 'Bearer <token>',
  },
});
```

```rust
use tauri_plugin_updater::UpdaterExt;
let update = app
  .updater_builder()
  .timeout(std::time::Duration::from_secs(30))
  .proxy("<proxy-url>".parse().expect("invalid URL"))
  .header("Authorization", "Bearer <token>")?
  .build()?
  .check()
  .await?;
```

## Notes

- Tauri updater plugin (`tauri-plugin-updater` / `@tauri-apps/plugin-updater`, desktop only); `pubkey` and `endpoints` are usually set in tauri.conf.json and can also be set at runtime with `updater_builder().pubkey(...)` / `.endpoints(...)`. Not Electron's `autoUpdater`; see the electron skill for Electron.
- On Windows the application exits automatically when the install step runs, due to a limitation of Windows installers; restarting right after install is optional elsewhere.
- A signing key pair (`tauri signer generate`) and an update endpoint are required for a working update check; see the updater reference page.
- Plugin registration (`tauri_plugin_updater::Builder`, and `tauri_plugin_process::init()` for JS `relaunch()`) is shown in the official setup step and is merged into `run()` here (the updater only; register the process plugin as in the official setup).
- `relaunch()` comes from the process plugin (`@tauri-apps/plugin-process`), which must be installed separately.
- `UpdaterBuilder::header` returns `Result<Self>`, so a `?` is added after `.header(...)` (missing in the official snippet).
- The official page also shows a command-with-channel variant (`fetch_update` / `install_update`) that reports download progress to the frontend; not reproduced here.
