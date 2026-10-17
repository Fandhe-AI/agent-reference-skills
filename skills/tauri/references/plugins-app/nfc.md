---
source: https://v2.tauri.app/plugin/nfc/
---

# NFC

Read and write NFC tags on Android and iOS. Plugin `tauri-plugin-nfc` 2.4.2 / `@tauri-apps/plugin-nfc` (tag `nfc-v2.4.2`).

## Signature / Usage

Check whether NFC is supported before using scan and write:

```javascript
import { isAvailable } from '@tauri-apps/plugin-nfc';

const canScanNfc = await isAvailable();
```

```rust
tauri::Builder::default()
  .setup(|app| {
    #[cfg(mobile)]
    {
      use tauri_plugin_nfc::NfcExt;

      app.handle().plugin(tauri_plugin_nfc::init());

      let can_scan_nfc = app.nfc().is_available()?;
    }
    Ok(())
  })
```

Scan generic tags or NDEF (NFC Data Exchange Format) tags:

```javascript
import { scan } from '@tauri-apps/plugin-nfc';

const scanType = {
  type: 'ndef', // or 'tag',
};

const options = {
  keepSessionAlive: false,
  // configure the messages displayed in the "Scan NFC" dialog on iOS
  message: 'Scan a NFC tag',
  successMessage: 'NFC tag successfully scanned',
};

const tag = await scan(scanType, options);
```

```rust
tauri::Builder::default()
  .setup(|app| {
    #[cfg(mobile)]
    {
      use tauri_plugin_nfc::NfcExt;

      app.handle().plugin(tauri_plugin_nfc::init());

      let tag = app
        .nfc()
        .scan(tauri_plugin_nfc::ScanRequest {
            kind: tauri_plugin_nfc::ScanKind::Ndef {
                mime_type: None,
                uri: None,
                tech_list: None,
            },
            keep_session_alive: false,
        })?
        .tag;
    }
    Ok(())
  })
```

Filters (Android only): the scan only detects tags matching URI format, mime type or NFC tag technologies.

```javascript
import { scan, TechKind } from '@tauri-apps/plugin-nfc';

const techLists = [
  // capture anything using NfcF
  [TechKind.NfcF],
  // capture all MIFARE Classics with NDEF payloads
  [TechKind.NfcA, TechKind.MifareClassic, TechKind.Ndef],
];

const tag = await scan({
  type: 'ndef', // or 'tag'
  mimeType: 'text/plain',
  uri: {
    scheme: 'https',
    host: 'my.domain.com',
    pathPrefix: '/app',
  },
  techLists,
});
```

```rust
tauri::Builder::default()
  .setup(|app| {
    #[cfg(mobile)]
    {
      use tauri_plugin_nfc::NfcExt;

      app.handle().plugin(tauri_plugin_nfc::init());

      let tag = app
        .nfc()
        .scan(tauri_plugin_nfc::ScanRequest {
            kind: tauri_plugin_nfc::ScanKind::Ndef {
                mime_type: Some("text/plain".to_string()),
                uri: Some(tauri_plugin_nfc::UriFilter {
                  scheme: Some("https".to_string()),
                  host: Some("my.domain.com".to_string()),
                  path_prefix: Some("/app".to_string()),
                }),
                tech_list: Some(vec![
                  vec![tauri_plugin_nfc::TechKind::Ndef],
                ]),
            },
            keep_session_alive: false,
        })?
        .tag;
    }
    Ok(())
  })
```

Write a payload (if there is no scanned tag with `keepSessionAlive: true`, the app first scans a tag):

```javascript
import { write, textRecord, uriRecord } from '@tauri-apps/plugin-nfc';

const payload = [uriRecord('https://tauri.app'), textRecord('some payload')];

const options = {
  // the kind is only required if you do not have a scanned tag session alive
  // its format is the same as the argument provided to scan()
  kind: {
    type: 'ndef',
  },
  // configure the messages displayed in the "Scan NFC" dialog on iOS
  message: 'Scan a NFC tag',
  successfulReadMessage: 'NFC tag successfully scanned',
  successMessage: 'NFC tag successfully written',
};

await write(payload, options);
```

```rust
tauri::Builder::default()
  .setup(|app| {
    #[cfg(mobile)]
    {
      use tauri_plugin_nfc::NfcExt;

      app.handle().plugin(tauri_plugin_nfc::init());

      app
        .nfc()
        .write(vec![
          tauri_plugin_nfc::NfcRecord {
            format: tauri_plugin_nfc::NFCTypeNameFormat::NfcWellKnown,
            kind: vec![0x55], // URI record
            id: vec![],
            payload: vec![], // insert payload here
          }
        ])?;
    }
    Ok(())
  })
```

## Setup

Automatic:

```sh
npm run tauri add nfc
cargo tauri add nfc
```

Manual:

1. Add the dependency from `src-tauri`:

```sh
cargo add tauri-plugin-nfc --target 'cfg(any(target_os = "android", target_os = "ios"))'
```

2. Initialize in `src-tauri/src/lib.rs`:

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(mobile)]
            app.handle().plugin(tauri_plugin_nfc::init());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

3. `npm install @tauri-apps/plugin-nfc`

## Supported Platforms

Minimum Rust version 1.90.

| Platform | Level | Notes |
| --- | --- | --- |
| Windows | No support | |
| Linux | No support | |
| macOS | No support | |
| Android | Full support | |
| iOS | Full support | |

## Configuration (iOS)

The NFC plugin requires native configuration for iOS: the target iOS version, a usage description in Info.plist, and the NFC capability.

Target iOS version: the plugin requires iOS 14+ (default for apps created with Tauri CLI v2.8 and above). In `src-tauri/gen/apple/<project-name>.xcodeproj/project.pbxproj`, set all `IPHONEOS_DEPLOYMENT_TARGET` properties to `14.0` (or set Xcode `General > Minimum Deployments > iOS`):

```pbxproj
/* Begin XCBuildConfiguration section */
		1234567890ABCDEF12345678 /* release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				/* ... */
				IPHONEOS_DEPLOYMENT_TARGET = 14.0;
			};
			name = release;
		};
```

Info.plist (`src-tauri/Info.ios.plist`), describing why your app scans or writes NFC tags:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>NFCReaderUsageDescription</key>
		<string>Read and write various NFC tags</string>
	</dict>
</plist>
```

NFC capability: add "Near Field Communication Tag Reading" in Xcode's "Signing & Capabilities" tab, or add this to `gen/apple/<app-name>_iOS/<app-name>_iOS.entitlements`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.nfc.readersession.formats</key>
	<array>
		<string>TAG</string>
	</array>
</dict>
</plist>
```

## Permissions

`src-tauri/capabilities/default.json`:

```json
{
  "permissions": [
    ...,
    "nfc:default",
  ]
}
```

Default permission set `nfc:default`: checking if NFC functionality is available and scanning nearby tags is allowed. Writing to tags needs to be manually enabled (`nfc:allow-write`). It includes `allow-is-available`, `allow-scan`.

| Identifier | Description |
| --- | --- |
| `nfc:allow-is-available` | Enables the is_available command without any pre-configured scope. |
| `nfc:allow-scan` | Enables the scan command without any pre-configured scope. |
| `nfc:allow-write` | Enables the write command without any pre-configured scope. |

Each `allow-*` has a matching `deny-*` (e.g. `nfc:deny-write`).

## Notes

- The official filter example omits `keep_session_alive` from `ScanRequest`; it is added here so the struct literal compiles.
- The `keepSessionAlive` option lets you write directly to the scanned tag later; without it the session is recreated on the next `write()` call and the app tries to rescan the tag.
- Filtering is only available on Android, so always check the scanned tag contents. The mime type is case sensitive and must be lower case.
- The Rust API currently only provides a low level interface for writing NFC payloads; the official page says it will be enhanced.
- Mobile only (Android / iOS); register under `#[cfg(mobile)]`.
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron (it has no mobile targets).
- Source: `plugins-workspace@nfc-v2.4.2` `plugins/nfc/{Cargo.toml,permissions/autogenerated/reference.md}`.

## Related

- [nfc (JS API)](../plugin-js-api-app/nfc.md)
