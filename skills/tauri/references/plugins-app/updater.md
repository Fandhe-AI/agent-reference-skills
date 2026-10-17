---
source: https://v2.tauri.app/plugin/updater/
---

# Updater

In-app updates for Tauri applications: update automatically with an update server or a static JSON. Plugin `tauri-plugin-updater` 2.14.0 / `@tauri-apps/plugin-updater` (tag `updater-v2.14.0`).

## Signature / Usage

JavaScript:

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

Rust (`src-tauri/src/lib.rs`):

```rust
use tauri_plugin_updater::UpdaterExt;

pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      #[cfg(desktop)]
      app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;

      let handle = app.handle().clone();
      tauri::async_runtime::spawn(async move {
        if let Err(e) = update(handle).await {
          eprintln!("update failed: {e}");
        }
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

The JS example's `relaunch()` comes from the Process plugin: register `tauri_plugin_process::init()`, install `@tauri-apps/plugin-process` and grant `process:allow-restart` (included in `process:default`) in addition to `updater:default`.

Restarting immediately after installing is not required; you can wait for a manual restart or prompt the user. On Windows the application is automatically exited when the install step is executed, due to a limitation of Windows installers.

To notify the frontend of download progress, the official page suggests a command with a channel (`tauri::ipc::Channel<DownloadEvent>`; `fetch_update` stores the `Update` in managed state `PendingUpdate(Mutex<Option<Update>>)` and `install_update` calls `download_and_install`, sending `Started { content_length }`, `Progress { chunk_length }`, `Finished` events). See the official page for the full command listing.

Custom timeout, proxy and request headers:

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

### Setup

Automatic:

```sh
npm run tauri add updater
cargo tauri add updater
```

Manual:

1. Add the dependency from `src-tauri`:

```sh
cargo add tauri-plugin-updater --target 'cfg(any(target_os = "macos", windows, target_os = "linux"))'
```

2. Initialize in `lib.rs`:

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

3. `npm install @tauri-apps/plugin-updater`

### Supported Platforms

Minimum Rust version 1.90.

| Platform | Level | Notes |
| --- | --- | --- |
| Windows | Full support | |
| Linux | Full support | |
| macOS | Full support | |
| Android | No support | |
| iOS | No support | |

### Signing updates

Tauri's updater needs a signature to verify that the update is from a trusted source. This cannot be disabled. Two keys are needed:

1. The public key, set in `tauri.conf.json` to validate artifacts before installation. It can be shared safely as long as the private key is secure.
2. The private key, used to sign installer files. NEVER share it. If you lose it you will NOT be able to publish new updates to users who already have the app installed.

Generate the keys with the CLI:

```sh
npm run tauri signer generate -- -w ~/.tauri/myapp.key
cargo tauri signer generate -w ~/.tauri/myapp.key
```

While building update artifacts the private key must be in environment variables (`.env` files do not work):

```sh
export TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
# optionally also add a password
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
```

PowerShell:

```ps
$env:TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
<# optionally also add a password #>
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
```

Then run the Tauri build as usual. The generated files depend on `createUpdaterArtifacts`:

```json
{
  "bundle": {
    "createUpdaterArtifacts": true
  }
}
```

- Linux: the normal AppImage in `target/release/bundle/appimage/` is re-used by the updater; `myapp.AppImage.sig` is the signature.
- macOS: `myapp.app.tar.gz` (updater bundle) and `myapp.app.tar.gz.sig` in `target/release/bundle/macos/`.
- Windows: `myapp-setup.exe` + `.sig` and `myapp.msi` + `.sig` in `target/release/bundle/nsis` / `msi` (re-used by the updater).

With `"createUpdaterArtifacts": "v1Compatible"` (migrating from older Tauri): Linux creates `myapp.AppImage.tar.gz` + `.sig`; macOS `myapp.app.tar.gz` + `.sig`; Windows `myapp-setup.nsis.zip` / `myapp.msi.zip` + `.sig`.

### Server Support

Either a dynamic update server or a static JSON file (S3, GitHub gists, etc.).

Static JSON keys:

| Key | Description |
| --- | --- |
| `version` | Valid SemVer, with or without a leading `v`. |
| `notes` | Notes about the update. |
| `pub_date` | RFC 3339 formatted date if present. |
| `platforms` | Each platform key is `OS-ARCH`, `OS` one of `linux`, `darwin`, `windows`, `ARCH` one of `x86_64`, `aarch64`, `i686`, `armv7`. |
| `signature` | Content of the generated `.sig` file (a path or URL does not work). |

Required keys: `version`, `platforms.[target].url`, `platforms.[target].signature`. Tauri validates the whole file before checking the version field, so all platform configurations must be valid and complete. With custom targets, the target string is matched against the `platforms` key.

```json
{
  "version": "",
  "notes": "",
  "pub_date": "",
  "platforms": {
    "linux-x86_64": {
      "signature": "",
      "url": ""
    },
    "windows-x86_64": {
      "signature": "",
      "url": ""
    },
    "darwin-x86_64": {
      "signature": "",
      "url": ""
    }
  }
}
```

Dynamic update server: Tauri follows the server's instructions. Overwrite the plugin's `version_comparator` to install the version sent by the server (e.g. rollback). The server responds `204 No Content` if no update is available, otherwise `200 OK` with JSON (required keys `url`, `version`, `signature`; optional `notes`, `pub_date`):

```json
{
  "version": "",
  "pub_date": "",
  "url": "",
  "signature": "",
  "notes": ""
}
```

### Runtime Configuration

Some APIs are Rust only for security reasons. Values from the configuration are used as fallback when builder values are not set.

Endpoints (use double escapes `{{{{target}}}}` inside `format!`):

```rust
use tauri_plugin_updater::UpdaterExt;
let channel = if beta { "beta" } else { "stable" };
let update_url: url::Url = format!("https://{channel}.myserver.com/{{{{target}}}}-{{{{arch}}}}/{{{{current_version}}}}")
  .parse()
  .expect("invalid URL");

let update = app
  .updater_builder()
  .endpoints(vec![update_url])?
  .build()?
  .check()
  .await?;
```

Public key (key rotation), via the plugin builder or updater builder:

```rust
tauri_plugin_updater::Builder::new().pubkey("<your public key>").build()
```

Custom target:

```js
import { check } from '@tauri-apps/plugin-updater';

const update = await check({
  target: 'macos-universal',
});
```

```rust
tauri_plugin_updater::Builder::new().target("macos-universal").build()
```

The default `$target-$arch` key is available via `tauri_plugin_updater::target()` (`Option<String>`, `None` when the updater is unsupported on the platform). With a custom target you may drop `{{arch}}`; the target value is the key matched against the static JSON `platforms`.

Allowing downgrades (default comparison: `update.version > current`):

```rust
use tauri_plugin_updater::UpdaterExt;

let update = app
  .updater_builder()
  .version_comparator(|current, update| {
    // default comparison: `update.version > current`
    update.version != current
  })
  .build()?
  .check()
  .await?;
```

Windows before exit hook (Tauri quits the app before installing on Windows):

```rust
use tauri_plugin_updater::UpdaterExt;

let update = app
  .updater_builder()
  .on_before_exit(|| {
    println!("app is about to exit on Windows!");
  })
  .build()?
  .check()
  .await?;
```

### Permissions

`src-tauri/capabilities/default.json`:

```json
{
  "permissions": [
    ...,
    "updater:default",
  ]
}
```

Default permission set `updater:default`: the full workflow from checking for updates to installing them. It includes `allow-check`, `allow-download`, `allow-install`, `allow-download-and-install`.

| Identifier | Description |
| --- | --- |
| `updater:allow-check` | Enables the check command without any pre-configured scope. |
| `updater:allow-download` | Enables the download command without any pre-configured scope. |
| `updater:allow-download-and-install` | Enables the download_and_install command without any pre-configured scope. |
| `updater:allow-install` | Enables the install command without any pre-configured scope. |

Each `allow-*` has a matching `deny-*` (e.g. `updater:deny-check`).

## Options / Props

`tauri.conf.json` keys:

| Key | Description |
| --- | --- |
| `bundle.createUpdaterArtifacts` | Setting this to `true` tells the bundler to create updater artifacts. If migrating from an older Tauri version set `"v1Compatible"`. This setting will be removed in v3 so change it to `true` once all users are migrated to v2. |
| `plugins.updater.pubkey` | Public key generated from the Tauri CLI. It cannot be a file path! |
| `plugins.updater.endpoints` | Array of endpoint URL strings. TLS is enforced in production mode. Tauri only continues to the next URL if a non-2XX status code is returned! |
| `plugins.updater.dangerousInsecureTransportProtocol` | `true` allows the updater to accept non-HTTPS endpoints. Use with caution! |
| `plugins.updater.windows.installMode` | Windows install mode (`"passive"`, `"basicUi"`, `"quiet"`; see below). |

Endpoint URLs can contain dynamic variables: `{{current_version}}` (version of the requesting app), `{{target}}` (`linux`, `windows` or `darwin`), `{{arch}}` (`x86_64`, `i686`, `aarch64` or `armv7`). Custom variables are not supported, but you can define a custom `{{target}}`.

```json
{
  "bundle": {
    "createUpdaterArtifacts": true
  },
  "plugins": {
    "updater": {
      "pubkey": "CONTENT FROM PUBLICKEY.PEM",
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}",
        // or a static github json file
        "https://github.com/user/repo/releases/latest/download/latest.json"
      ]
    }
  }
}
```

Windows `installMode` (optional):

```json
{
  "plugins": {
    "updater": {
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

- `"passive"`: small window with a progress bar, no user interaction. Generally recommended and the default.
- `"basicUi"`: basic UI that requires user interaction to finish the installation.
- `"quiet"`: no progress feedback. The installer cannot request admin privileges by itself, so it only works in user-wide installations or when the app already runs with admin privileges. Generally not recommended.

## Notes

- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron's `autoUpdater` / electron-updater.
- Updater signatures are mandatory and cannot be disabled; a lost private key blocks future updates to installed apps.
- Tauri Action generates a static JSON file for CDNs such as GitHub Releases. CrabNebula Cloud offers a dynamic update server.
- Prefer setting `TAURI_SIGNING_PRIVATE_KEY` to the key file path (e.g. `"${HOME}/.tauri/myapp.key"`) or injecting it from a CI secret; pasting the key content into an interactive shell leaves it in shell history.
- Unlike the official snippet, the Rust example registers the updater plugin before use and logs update errors instead of unwrapping. The endpoint in the runtime-config snippet is parsed into a `Url` as in the official `fetch_update` example (the official runtime-config snippet passes a `String`).
- The upstream example omits `?` after `.header(...)`; `UpdaterBuilder::header` returns `Result<Self>` (updater-v2.14.0 src/updater.rs), so the error must be propagated before `.build()`.
- Source: `plugins-workspace@updater-v2.14.0` `plugins/updater/{Cargo.toml,permissions/autogenerated/reference.md}`.

## Related

- [Process](../plugins-core/process.md)
- [updater (JS API)](../plugin-js-api-app/updater.md)
- [Window State](./window-state.md)
