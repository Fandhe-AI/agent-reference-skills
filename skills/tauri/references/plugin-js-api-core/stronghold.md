---
source: https://v2.tauri.app/reference/javascript/stronghold/
---

# @tauri-apps/plugin-stronghold

Store secrets and keys using the IOTA Stronghold encrypted database and secure runtime.

## Signature / Usage

```ts
import { Stronghold } from '@tauri-apps/plugin-stronghold';
import { appDataDir } from '@tauri-apps/api/path';

const stronghold = await Stronghold.load(`${await appDataDir()}/vault.hold`, 'password');
const client = await stronghold.createClient('my-client');
const data = Array.from(new TextEncoder().encode('Hello, World!'));
await client.getStore().insert('my-key', data);
await stronghold.save();
```

```ts
class Stronghold {                                    // @since 2.0.0
  path: string
  static load(path: string, password: string): Promise<Stronghold>
  unload(): Promise<void>
  loadClient(client: ClientPath): Promise<Client>
  createClient(client: ClientPath): Promise<Client>
  save(): Promise<void>
}

class Client {                                        // @since 2.0.0
  path: string
  name: ClientPath
  constructor(path: string, name: ClientPath)
  getVault(name: VaultPath): Vault
  getStore(): Store
}

class Store {                                         // @since 2.0.0
  path: string
  client: ClientPath
  constructor(path: string, client: ClientPath)
  get(key: StoreKey): Promise<Uint8Array | null>
  insert(key: StoreKey, value: number[], lifetime?: Duration): Promise<void>
  remove(key: StoreKey): Promise<Uint8Array | null>
}

class Vault extends ProcedureExecutor {               // @since 2.0.0
  path: string
  client: ClientPath
  name: VaultPath
  constructor(path: string, client: ClientPath, name: VaultPath)
  insert(recordPath: RecordPath, secret: number[]): Promise<void>
  remove(location: Location): Promise<void>
  // inherited from ProcedureExecutor:
  generateSLIP10Seed(outputLocation: Location, sizeBytes?: number): Promise<Uint8Array>
  deriveSLIP10(chain: number[], source: 'Seed' | 'Key', sourceLocation: Location, outputLocation: Location): Promise<Uint8Array>
  recoverBIP39(mnemonic: string, outputLocation: Location, passphrase?: string): Promise<Uint8Array>
  generateBIP39(outputLocation: Location, passphrase?: string): Promise<Uint8Array>
  getEd25519PublicKey(privateKeyLocation: Location): Promise<Uint8Array>   // @since 2.0.0
  signEd25519(privateKeyLocation: Location, msg: string): Promise<Uint8Array>   // @since 2.0.0
}

class Location {                                      // @since 2.0.0
  type: string
  payload: Record<string, unknown>
  constructor(type: string, payload: Record<string, unknown>)
  static generic(vault: VaultPath, record: RecordPath): Location
  static counter(vault: VaultPath, counter: number): Location
}

type ClientPath = string | Iterable<number> | ArrayLike<number> | ArrayBuffer
type VaultPath = string | Iterable<number> | ArrayLike<number> | ArrayBuffer
type RecordPath = string | Iterable<number> | ArrayLike<number> | ArrayBuffer
type StoreKey = string | Iterable<number> | ArrayLike<number> | ArrayBuffer

interface Duration { secs: number; nanos: number }
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Stronghold.load(path, password) | `string`, `string` | Load the snapshot if it exists (password must match), or start a fresh stronghold instance otherwise. |
| unload() | — | Saves the snapshot and removes this instance from the cache. |
| loadClient(client) | `ClientPath` | Loads an existing client from the snapshot. Rejects if the client does not exist in the snapshot or was already loaded. |
| createClient(client) | `ClientPath` | Creates a new empty client on this stronghold. |
| save() | — | Persists the stronghold state to the snapshot. |
| Client.getVault(name) | `VaultPath` | Handle to a vault; the vault is created on the Rust side when the first secret is written. |
| Client.getStore() | — | Handle to the key-value store of the client. |
| Store.get / insert / remove | `StoreKey` (+ `number[]`, `Duration`) | Read, write (optional `lifetime` after which the record expires) and delete store records. Unlike a vault, values can be read back directly. |
| Vault.insert(recordPath, secret) | `RecordPath`, `number[]` | Writes a secret to this vault. |
| Vault.remove(location) | `Location` | Deletes a secret from this vault. Only the record path of the given location is used, the vault is always this one. |
| generateSLIP10Seed | `Location`, `number?` | Generate a SLIP10 seed for the given location (`sizeBytes` is the seed size). |
| deriveSLIP10 | `number[]`, `'Seed' \| 'Key'`, `Location`, `Location` | Derive a SLIP10 private key using a seed or key (chain path, source type, source location, output location). Always performed on the Ed25519 curve. The source location must be the `outputLocation` of a previous `generateSLIP10Seed` or `deriveSLIP10` call. |
| recoverBIP39 | `string`, `Location`, `string?` | Store a BIP39 mnemonic (with optional passphrase). |
| generateBIP39 | `Location`, `string?` | Generate a BIP39 seed. The mnemonic is generated in English. |
| getEd25519PublicKey | `Location` | Gets the Ed25519 public key of a SLIP10 private key (must be the `outputLocation` of a previous `deriveSLIP10`). |
| signEd25519 | `Location`, `string` | Creates an Ed25519 signature from a private key for the message. |

## Notes

- A `Vault` is a key-value storage that allows create, update and delete operations but does not allow reading the data; use one of the procedures to manipulate the stored data.
- Store and vault writes are only persisted when `Stronghold.save()` is called.
- The store commands read the key as a string on the Rust side, so string keys are the safe choice for `StoreKey`.
- `NetworkConfig`, `ConnectionLimits`, `PeerAddress`, `AddressInfo`, `ClientAccess`, `Permissions` are exported interfaces mirroring the IOTA Stronghold networking options; the plugin does not currently expose a command that consumes them, so they are only useful as type definitions.
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@stronghold-v2.4.0` `plugins/stronghold/guest-js/index.ts`

## Related

- [Stronghold plugin](../plugins-core/stronghold.md)
- [Store plugin JS API](./store.md)
