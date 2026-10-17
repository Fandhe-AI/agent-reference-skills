---
source: https://v2.tauri.app/plugin/stronghold/
---

# Stronghold

Store secrets and keys using the IOTA Stronghold secret management engine.

## Supported Platforms

Windows, Linux, macOS, Android, iOS: full support (`stronghold-v2.4.0`).

## Setup

```sh
npm run tauri add stronghold
# or: cargo tauri add stronghold
```

Manual. From `src-tauri`:

```sh
cargo add tauri-plugin-stronghold
```

From the project root, install the JavaScript guest bindings:

```sh
npm install @tauri-apps/plugin-stronghold
```

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_stronghold::Builder::new(|password| {
            // Placeholder: return the 32-byte hash (Vec<u8>) derived from `password`
            todo!()
        }).build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Due to an upstream bug (plugins-workspace issue 2048) the docs also recommend adding this to `Cargo.toml`:

```toml
[profile.dev.package.scrypt]
opt-level = 3
```

## Signature / Usage

The plugin must be initialized with a password hash function, which takes the password string and must return a 32 bytes hash derived from it.

Initialize with the default argon2 password hash function:

```rust
use tauri::Manager;

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let salt_path = app
                .path()
                .app_local_data_dir()
                .expect("could not resolve app local data path")
                .join("salt.txt");
            app.handle().plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

Initialize with a custom password hash function via `tauri_plugin_stronghold::Builder::new`:

```rust
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_stronghold::Builder::new(|password| {
                // Hash the password here with e.g. argon2, blake2b or any other secure algorithm
                // Here is an example implementation using the `rust-argon2` crate for hashing the password
                use argon2::{hash_raw, Config, Variant, Version};

                let config = Config {
                    lanes: 4,
                    mem_cost: 10_000,
                    time_cost: 10,
                    variant: Variant::Argon2id,
                    version: Version::Version13,
                    ..Default::default()
                };
                let salt = "your-salt".as_bytes();
                let key = hash_raw(password.as_ref(), salt, &config).expect("failed to hash password");

                key.to_vec()
            })
            .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

JavaScript:

```javascript
import { Client, Stronghold } from '@tauri-apps/plugin-stronghold';
// when using `"withGlobalTauri": true`, you may use
// const { Client, Stronghold } = window.__TAURI__.stronghold;
import { appDataDir } from '@tauri-apps/api/path';
// when using `"withGlobalTauri": true`, you may use
// const { appDataDir } = window.__TAURI__.path;

const initStronghold = async () => {
	const vaultPath = `${await appDataDir()}/vault.hold`;
	const vaultPassword = 'vault password';
	const stronghold = await Stronghold.load(vaultPath, vaultPassword);

	let client: Client;
	const clientName = 'name your client';
	try {
		client = await stronghold.loadClient(clientName);
	} catch {
		client = await stronghold.createClient(clientName);
	}

	return {
		stronghold,
		client,
	};
};

// Insert a record to the store
async function insertRecord(store: any, key: string, value: string) {
	const data = Array.from(new TextEncoder().encode(value));
	await store.insert(key, data);
}

// Read a record from store
async function getRecord(store: any, key: string): Promise<string> {
	const data = await store.get(key);
	return new TextDecoder().decode(new Uint8Array(data));
}

const { stronghold, client } = await initStronghold();

const store = client.getStore();
const key = 'my_key';

// Insert a record to the store
await insertRecord(store, key, 'secret value');

// Read a record from store
const value = await getRecord(store, key);
console.log(value); // 'secret value'

// Save your updates
await stronghold.save();

// Remove a record from store
await store.remove(key);
```

## Permissions

```json
{
	...,
	"permissions": [
		"stronghold:default",
		"stronghold:allow-remove-store-record",
	]
}
```

`stronghold:default` enables all non-destructive operations: `allow-create-client`, `allow-get-store-record`, `allow-initialize`, `allow-execute-procedure`, `allow-load-client`, `allow-save-secret`, `allow-save-store-record`, `allow-save`.

| Identifier | Notes |
| --- | --- |
| `stronghold:allow-create-client` | create_client command |
| `stronghold:allow-destroy` | destroy (not in default) |
| `stronghold:allow-execute-procedure` | execute procedure |
| `stronghold:allow-get-store-record` | read store record |
| `stronghold:allow-initialize` | initialize |
| `stronghold:allow-load-client` | load client |
| `stronghold:allow-remove-secret` | remove secret (not in default) |
| `stronghold:allow-remove-store-record` | remove store record (not in default) |
| `stronghold:allow-save` | save |
| `stronghold:allow-save-secret` | save secret |
| `stronghold:allow-save-store-record` | save store record |

## Notes

- Tauri plugin (Rust core + system WebView). The password hash must contain exactly 32 bytes (a Stronghold requirement).
- `store.remove()` calls `remove_store_record`, which `stronghold:default` does not grant; `stronghold:allow-remove-store-record` is added to the capability example, and `insertRecord` is awaited (the official example omits both).
- The official Setup snippet passes an empty closure `|password| {}`, which does not return the required 32-byte `Vec<u8>`; the snippet here uses a `todo!()` placeholder, and a real build must return the hash as in the custom hash example (or use `Builder::with_argon2`).
- Source: `tauri-apps/plugins-workspace@stronghold-v2.4.0` `plugins/stronghold/Cargo.toml`, `plugins/stronghold/permissions/autogenerated/reference.md`; docs `plugin/stronghold.mdx` @ `32f68c5`.

## Related

- [store.md](./store.md)
- [../plugin-js-api-core/stronghold.md](../plugin-js-api-core/stronghold.md)
