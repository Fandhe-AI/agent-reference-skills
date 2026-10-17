---
source: https://v2.tauri.app/plugin/deep-linking/
---

# Deep Linking

Set your Tauri application as the default handler for an URL. Plugin `tauri-plugin-deep-link` 2.6.2 / `@tauri-apps/plugin-deep-link` (tag `deep-link-v2.6.2`).

## Signature / Usage

JavaScript:

```javascript
import { getCurrent, onOpenUrl } from '@tauri-apps/plugin-deep-link';
// when using `"withGlobalTauri": true`, you may use
// const { getCurrent, onOpenUrl } = window.__TAURI__.deepLink;

const startUrls = await getCurrent();
if (startUrls) {
  // App was likely started via a deep link
  // Note that getCurrent's return value will also get updated every time onOpenUrl gets triggered.
}

await onOpenUrl((urls) => {
  console.log('deep link:', urls);
});
```

Rust (`src-tauri/src/lib.rs`):

```rust
use tauri_plugin_deep_link::DeepLinkExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .setup(|app| {
            // Note that get_current's return value will also get updated every time on_open_url gets triggered.
            let start_urls = app.deep_link().get_current()?;
            if let Some(urls) = start_urls {
                // app was likely started by a deep link
                println!("deep link URLs: {:?}", urls);
            }

            app.deep_link().on_open_url(|event| {
                println!("deep link URLs: {:?}", event.urls());
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

When a deep link triggers the running app, `onOpenUrl` / `on_open_url` is called. To detect whether the app was opened via a deep link, call `getCurrent` / `get_current` on app start. The open URL event carries a list of URLs (for compatibility with the macOS API); in most cases only one URL is received.

### Setup

Automatic:

```sh
npm run tauri add deep-link
cargo tauri add deep-link
```

Manual:

1. Add the dependency from `src-tauri`:

```sh
cargo add tauri-plugin-deep-link
```

2. Initialize in `src-tauri/src/lib.rs`:

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

3. Install the JavaScript Guest bindings:

```sh
npm install @tauri-apps/plugin-deep-link
```

### Supported Platforms

Minimum Rust version 1.90.

| Platform | Level | Notes |
| --- | --- | --- |
| Windows | Full support | |
| Linux | Full support | |
| macOS | Partial support | Deep links must be registered in config. Dynamic registration at runtime is not supported. |
| Android | Partial support | Deep links must be registered in config. Dynamic registration at runtime is not supported. |
| iOS | Partial support | Deep links must be registered in config. Dynamic registration at runtime is not supported. |

### Platform setup

#### Android

1. App Links (http/https + host, verified): needs a server with a `.well-known/assetlinks.json` endpoint returning a text response in this format:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "$APP_BUNDLE_ID",
      "sha256_cert_fingerprints": [
        $CERT_FINGERPRINT
      ]
    }
  }
]
```

`$APP_BUNDLE_ID` is `tauri.conf.json > identifier` with `-` replaced with `_`; `$CERT_FINGERPRINT` is a list of SHA256 fingerprints of the app's signing certificates.

2. Custom URI schemes (no host, no verification): for URIs like `myapp://...`, use the `scheme` field in the mobile configuration and omit `host`.

#### iOS

1. Universal Links (https + host, verified): needs a server with a `.well-known/apple-app-site-association` endpoint returning JSON (`Content-Type: application/json`, served over HTTPS):

```json
{
  "applinks": {
    "details": [
      {
        "appIDs": ["$DEVELOPMENT_TEAM_ID.$APP_BUNDLE_ID"],
        "components": [
          {
            "/": "/open/*",
            "comment": "Matches any URL whose path starts with /open/"
          }
        ]
      }
    ]
  }
}
```

`$DEVELOPMENT_TEAM_ID` is `tauri.conf.json > bundle > iOS > developmentTeam` or the `TAURI_APPLE_DEVELOPMENT_TEAM` environment variable. To test localhost use a self-signed TLS certificate installed on the iOS simulator or a service like ngrok. Verify the domain configuration:

```sh
HOST="your.website.com"
curl -v "https://app-site-association.cdn-apple.com/a/v1/${HOST}"
```

2. Custom URI schemes (no host, no verification): declare a custom scheme under mobile configuration with `"appLink": false` (or omit it). The plugin generates the `CFBundleURLTypes` entries in Info.plist.

#### Desktop

On Linux and Windows deep links are delivered as a command line argument to a new app process. For a unique app instance receiving the events, integrate with the single instance plugin: add the `deep-link` feature, and register the single instance plugin first.

```toml
[target."cfg(any(target_os = \"macos\", windows, target_os = \"linux\"))".dependencies]
tauri-plugin-single-instance = { version = "2.0.0", features = ["deep-link"] }
```

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|_app, argv, _cwd| {
          println!("a new app instance was opened with {argv:?} and the deep link event was already triggered");
          // when defining deep link schemes at runtime, you must also check `argv` here
        }));
    }

    builder = builder.plugin(tauri_plugin_deep_link::init());

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### Registering desktop deep links at runtime

On Linux and Windows, schemes can also be associated at runtime via `register`:

```rust
use tauri_plugin_deep_link::DeepLinkExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .setup(|app| {
            #[cfg(any(windows, target_os = "linux"))]
            app.deep_link().register("my-app")?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

By default the deep link is only registered when the app is installed. `register_all` force-registers all statically configured deep links at runtime (also for development mode):

```rust
#[cfg(any(target_os = "linux", all(debug_assertions, windows)))]
{
  use tauri_plugin_deep_link::DeepLinkExt;
  app.deep_link().register_all()?;
}
```

### Testing

- Desktop: deep links are only triggered for installed applications; on Linux and Windows use `register_all` (above) to register all configured schemes to trigger the current executable.
- Windows: open `myapp://url` in the browser or run `start myapp://url` (replace `myapp` with your scheme).
- Linux: open `myapp://url` in the browser or run `xdg-open myapp://url`.
- iOS simulator: `xcrun simctl openurl booted https://your.website.com/path`
- Android emulator: `adb shell am start -a android.intent.action.VIEW -d https://your.website.com/path com.example.app` (the last argument is your bundle identifier)

### Permissions

`src-tauri/capabilities/default.json`:

```json
{
  "$schema": "../gen/schemas/mobile-schema.json",
  "identifier": "mobile-capability",
  "windows": ["main"],
  "platforms": ["iOS", "android"],
  "permissions": [
    // Usually you will need core:event:default to listen to the deep-link event
    "core:event:default",
    "deep-link:default"
  ]
}
```

Default permission set `deep-link:default`: allows reading the opened deep link via the get_current command. It includes `allow-get-current`.

| Identifier | Description |
| --- | --- |
| `deep-link:allow-get-current` | Enables the get_current command without any pre-configured scope. |
| `deep-link:allow-is-registered` | Enables the is_registered command without any pre-configured scope. |
| `deep-link:allow-register` | Enables the register command without any pre-configured scope. |
| `deep-link:allow-unregister` | Enables the unregister command without any pre-configured scope. |

Each `allow-*` has a matching `deny-*` (e.g. `deep-link:deny-register`).

## Options / Props

Configure under `tauri.conf.json > plugins > deep-link` (mobile domains/schemes and desktop schemes).

Custom scheme on mobile (no server required), registers `ovi://*` on Android and iOS:

```json
{
  "plugins": {
    "deep-link": {
      "mobile": [
        {
          "scheme": ["ovi"],
          "appLink": false
        }
      ]
    }
  }
}
```

App Link / Universal Link (verified https + host), registers `https://your.website.com/open/*`:

```json
{
  "plugins": {
    "deep-link": {
      "mobile": [
        {
          "scheme": ["https"],
          "host": "your.website.com",
          "pathPrefix": ["/open"],
          "appLink": true
        }
      ]
    }
  }
}
```

Desktop custom schemes:

```json
{
  "plugins": {
    "deep-link": {
      "desktop": {
        "schemes": ["something", "my-tauri-app"]
      }
    }
  }
}
```

| Key | Used in | Description |
| --- | --- | --- |
| `mobile[].scheme` | mobile | List of schemes (e.g. `["ovi"]`, `["https"]`) |
| `mobile[].host` | mobile | Host for verified App Links / Universal Links; omit for custom schemes |
| `mobile[].pathPrefix` | mobile | Path prefixes (e.g. `["/open"]`) |
| `mobile[].appLink` | mobile | `true` for verified App/Universal Link; `false` (or omitted) for a custom URI scheme |
| `desktop.schemes` | desktop | Schemes associated with the app |

## Notes

- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron's `app.setAsDefaultProtocolClient` / `open-url`.
- Security: the user could trigger a fake deep link manually by including the URL as an argument. Tauri matches the command line argument against the configured schemes, but you should still check that the URL matches the format you expect. Tauri only handles deep links for statically configured schemes; schemes registered at runtime must be checked manually using `Env::args_os`.
- Registering deep links at runtime is not possible on macOS; deep links can only be tested on the bundled application, which must be installed in the `/Applications` directory.
- Installing an AppImage with deep link support on Linux requires an AppImage launcher; `register_all` supports deep links without external tools. Moving the AppImage invalidates the deep link (absolute path), so runtime registration matters.
- The official page writes the AASA check as `curl -v https://app-site-association.cdn-apple.com/a/v1/<host>`; here the placeholder is a quoted `${HOST}` variable so the command is copy-paste safe. The Testing placeholders (`<scheme>`, `<host>`, `<bundle-identifier>`) are replaced with dummy values for the same reason.
- The official manual step pins `cargo add tauri-plugin-deep-link@2.0.0`; this page documents deep-link-v2.6.2, so the version is omitted here.
- The `.run(...)` call missing from the official single-instance integration snippet is added. The runtime `register` call is gated to Windows/Linux (the official snippet uses `#[cfg(desktop)]`) because runtime registration is not supported on macOS.
- Source: `plugins-workspace@deep-link-v2.6.2` `plugins/deep-link/{Cargo.toml,permissions/autogenerated/reference.md}`.

## Related

- [Single Instance](./single-instance.md)
- [deep-link (JS API)](../plugin-js-api-app/deep-link.md)
