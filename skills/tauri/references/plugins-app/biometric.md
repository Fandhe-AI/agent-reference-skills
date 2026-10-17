---
source: https://v2.tauri.app/plugin/biometric/
---

# Biometric

Prompt the user for biometric authentication on Android and iOS. Plugin `tauri-plugin-biometric` 2.5.0 / `@tauri-apps/plugin-biometric` (tag `biometric-v2.5.0`).

## Signature / Usage

Check status (availability and supported biometric types):

```javascript
import { checkStatus } from '@tauri-apps/plugin-biometric';

const status = await checkStatus();
if (status.isAvailable) {
  console.log('Yes! Biometric Authentication is available');
} else {
  console.log(
    'No! Biometric Authentication is not available due to ' + status.error
  );
}
```

```rust
use tauri_plugin_biometric::BiometricExt;

fn check_biometric(app_handle: tauri::AppHandle) {
    let status = app_handle.biometric().status().unwrap();
    if status.is_available {
        println!("Yes! Biometric Authentication is available");
    } else {
        println!("No! Biometric Authentication is not available due to: {}", status.error.unwrap());
    }
}
```

Authenticate with `authenticate()`:

```javascript
import { authenticate } from '@tauri-apps/plugin-biometric';

const options = {
  // Set true if you want the user to be able to authenticate using phone password
  allowDeviceCredential: false,
  cancelTitle: "Feature won't work if Canceled",

  // iOS only feature
  fallbackTitle: 'Sorry, authentication failed',

  // Android only features
  title: 'Tauri feature',
  subtitle: 'Authenticate to access the locked Tauri function',
  confirmationRequired: true,
};

try {
  await authenticate('This feature is locked', options);
  console.log(
    'Hooray! Successfully Authenticated! We can now perform the locked Tauri function!'
  );
} catch (err) {
  console.log('Oh no! Authentication failed because ' + err.message);
}
```

```rust
use tauri_plugin_biometric::{BiometricExt, AuthOptions};

fn bio_auth(app_handle: tauri::AppHandle) {

    let options = AuthOptions {
        // Set True if you want the user to be able to authenticate using phone password
        allow_device_credential:false,
        cancel_title: Some("Feature won't work if Canceled".to_string()),

        // iOS only feature
        fallback_title: Some("Sorry, authentication failed".to_string()),

        // Android only features
        title: Some("Tauri feature".to_string()),
        subtitle: Some("Authenticate to access the locked Tauri function".to_string()),
        confirmation_required: Some(true),
    };

    // if the authentication was successful, the function returns Result::Ok()
    // otherwise returns Result::Error()
    match app_handle.biometric().authenticate("This feature is locked".to_string(), options) {
        Ok(_) => {
            println!("Hooray! Successfully Authenticated! We can now perform the locked Tauri function!");
        }
        Err(e) => {
            println!("Oh no! Authentication failed because : {e}");
        }
    }
}
```

## Setup

Automatic:

```sh
npm run tauri add biometric
cargo tauri add biometric
```

Manual:

1. Add the dependency from `src-tauri`:

```sh
cargo add tauri-plugin-biometric --target 'cfg(any(target_os = "android", target_os = "ios"))'
```

2. Initialize in `src-tauri/src/lib.rs`:

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(mobile)]
            app.handle().plugin(tauri_plugin_biometric::Builder::new().build());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

3. `npm install @tauri-apps/plugin-biometric`

## Supported Platforms

Minimum Rust version 1.90.

| Platform | Level | Notes |
| --- | --- | --- |
| Windows | No support | |
| Linux | No support | |
| macOS | Full support | |
| Android | Full support | |
| iOS | Full support | |

The crate description lists Android, iOS, and macOS; the official page text names Android and iOS (see Notes).

## Configuration

On iOS the plugin requires the `NSFaceIDUsageDescription` Info.plist value. In `src-tauri/Info.ios.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>NSFaceIDUsageDescription</key>
		<string>Authenticate with biometric</string>
	</dict>
</plist>
```

## Permissions

`src-tauri/capabilities/default.json`:

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": ["biometric:default"]
}
```

Default permission set `biometric:default`: allows checking the biometric status and prompting for authentication. Encrypting and decrypting data with `biometric_cipher` is not included and must be enabled explicitly with `biometric:allow-biometric-cipher`. It includes `allow-authenticate`, `allow-status`.

| Identifier | Description |
| --- | --- |
| `biometric:allow-authenticate` | Enables the authenticate command without any pre-configured scope. |
| `biometric:allow-biometric-cipher` | Enables the biometric_cipher command without any pre-configured scope. |
| `biometric:allow-status` | Enables the status command without any pre-configured scope. |

Each `allow-*` has a matching `deny-*` (e.g. `biometric:deny-status`).

## Notes

- `fallbackTitle` is iOS and macOS only; `title`, `subtitle`, `confirmationRequired` (and `maxAttemps`, `dataToEncrypt`/`dataToDecrypt`) are Android-only.
- The official setup targets only Android/iOS (`--target` android/ios, `#[cfg(mobile)]`); biometric-v2.5.0 `Cargo.toml` also declares full macOS support, so using it on macOS requires including macOS in the dependency target and a registration not gated by `#[cfg(mobile)]`.
- `biometric_cipher` (encrypt/decrypt with biometric-protected keys) is Android-only per the plugin README; iOS has no biometric cryptography.
- Register under `#[cfg(mobile)]` as in the official setup.
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron (`systemPreferences.promptTouchID`).
- Source: `plugins-workspace@biometric-v2.5.0` `plugins/biometric/{Cargo.toml,permissions/autogenerated/reference.md}`.

## Related

- [biometric (JS API)](../plugin-js-api-app/biometric.md)
