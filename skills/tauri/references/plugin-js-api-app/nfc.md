---
source: https://v2.tauri.app/reference/javascript/nfc/
---

# @tauri-apps/plugin-nfc

Read and write NFC tags on Android and iOS. This plugin is mobile only; the APIs reject on desktop platforms.

## Signature / Usage

```typescript
import { scan } from '@tauri-apps/plugin-nfc';
const tag = await scan({ type: 'tag' });
```

```typescript
function scan(kind: ScanKind, options?: ScanOptions): Promise<Tag>          // since 2.0.0
function write(records: NFCRecord[], options?: WriteOptions): Promise<void> // since 2.0.0
function isAvailable(): Promise<boolean>                                     // since 2.0.0
function record(format: NFCTypeNameFormat, kind: string | number[], id: string | number[], payload: string | number[]): NFCRecord  // since 2.0.0
function textRecord(text: string, id?: string | number[], language: string = 'en'): NFCRecord  // since 2.0.0
function uriRecord(uri: string, id?: string | number[]): NFCRecord           // since 2.0.0
const RTD_TEXT = [0x54]   // "T", since 2.0.0
const RTD_URI = [0x55]    // "U", since 2.0.0

type ScanKind =
  | { type: 'tag'; uri?: UriFilter; mimeType?: string }
  | { type: 'ndef'; uri?: UriFilter; mimeType?: string; techLists?: TechKind[][] }

interface NFCRecord { format: NFCTypeNameFormat; kind: number[]; id: number[]; payload: number[] }
interface Tag { id: number[]; kind: string[]; records: TagRecord[] }
interface TagRecord { tnf: NFCTypeNameFormat; kind: number[]; id: number[]; payload: number[] }
```

## Options / Props

`ScanOptions`:

| Name | Type | Description |
| --- | --- | --- |
| keepSessionAlive | `boolean` | Keep the connection to the scanned tag open so a following `write` writes to that tag instead of scanning a new one. Defaults to `false`. |
| message | `string` | Message displayed in the UI. iOS only. |
| successMessage | `string` | Message displayed in the UI when the message has been read. iOS only. |

`WriteOptions`:

| Name | Type | Description |
| --- | --- | --- |
| kind | `ScanKind` | Kind of scan to find the tag to write to. Required on Android unless a `scan` session is kept alive. |
| message | `string` | Message displayed in the UI when reading the tag. iOS only. |
| successfulReadMessage | `string` | Message displayed when the tag has been read. iOS only. |
| successMessage | `string` | Message displayed when the message has been written. iOS only. |

`UriFilter` (all optional; Android only, ignored on iOS): `scheme` (e.g. `https`), `host` (authority, e.g. `tauri.app`), `pathPrefix` (e.g. `/docs`).

`ScanKind` fields: `mimeType` (e.g. `text/plain`; Android only), `uri` (Android only), `techLists` (`ndef` only; each tech-list is considered independently and any single matching tech-list matches the tag, giving AND / OR semantics).

`TechKind` enum (Android only): `IsoDep`, `MifareClassic`, `MifareUltralight`, `Ndef`, `NdefFormatable`, `NfcA`, `NfcB`, `NfcBarcode`, `NfcF`, `NfcV` (mirror the `android.nfc.tech` classes).

`NFCTypeNameFormat` enum:

| Member | Value | Description |
| --- | --- | --- |
| Empty | 0 | Type, identifier and payload must be empty. |
| NfcWellKnown | 1 | NFC Forum well known type, defined by an RTD such as `RTD_TEXT` / `RTD_URI`. |
| Media | 2 | MIME media type (RFC 2046), e.g. `text/plain`. |
| AbsoluteURI | 3 | Absolute URI (RFC 3986). |
| NfcExternal | 4 | NFC Forum external type. |
| Unknown | 5 | Type must be empty; payload interpretation left to the application. |
| Unchanged | 6 | Middle or last chunk of a chunked record; inherits the type of the first chunk. |

## Notes

- `scan` with `type: 'tag'` matches any discovered tag; `type: 'ndef'` only matches tags carrying an NDEF message.
- `write` first scans the tag if `scan` was not previously called with `keepSessionAlive: true`.
- `isAvailable` resolves to `false` on Android when the device has no NFC adapter or NFC is disabled, and on iOS when the `NFCReaderUsageDescription` entry is missing from `Info.plist` or NFC tag reading is unavailable.
- Strings passed to `record` are encoded as UTF-8 byte arrays. `uriRecord` uses the NDEF URI abbreviation scheme (a known prefix such as `https://` is replaced by an identifier code byte).
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@nfc-v2.4.2` `plugins/nfc/guest-js/index.ts`.

```typescript
import { uriRecord, write } from '@tauri-apps/plugin-nfc';
await write([uriRecord('https://tauri.app')], { kind: { type: 'ndef' } });
```

## Related

- [nfc plugin](../plugins-app/nfc.md)
