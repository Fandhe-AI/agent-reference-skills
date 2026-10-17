---
source: https://v2.tauri.app/reference/javascript/os/
---

# @tauri-apps/plugin-os

Provides operating system-related utility methods and properties.

## Signature / Usage

```ts
import { platform, arch, locale } from '@tauri-apps/plugin-os';
const platformName = platform();
const archName = arch();
const loc = await locale();
if (loc) {
  // use the locale string here
}
```

```ts
type Platform = 'linux' | 'macos' | 'ios' | 'freebsd' | 'dragonfly' | 'netbsd' | 'openbsd' | 'solaris' | 'android' | 'windows'
type OsType = 'linux' | 'windows' | 'macos' | 'ios' | 'android'
type Arch = 'x86' | 'x86_64' | 'arm' | 'aarch64' | 'mips' | 'mips64' | 'powerpc' | 'powerpc64' | 'riscv64' | 's390x' | 'sparc64'
type Family = 'unix' | 'windows'

function eol(): string
function platform(): Platform
function version(): string
function family(): Family
function type(): OsType
function arch(): Arch
function exeExtension(): string
function locale(): Promise<string | null>
function hostname(): Promise<string | null>
```

All functions are `@since 2.0.0`.

## Options / Props

| Name | Returns | Description |
| --- | --- | --- |
| eol | `string` | Operating system-specific end-of-line marker: `\n` on POSIX, `\r\n` on Windows. |
| platform | `Platform` | The specific operating system in use. The value is set at compile time. |
| version | `string` | The current operating system version. |
| family | `Family` | The operating system family: `'unix'`, `'windows'`. |
| type | `OsType` | `'linux'` on Linux, `'macos'` on macOS, `'windows'` on Windows, `'ios'` on iOS and `'android'` on Android. |
| arch | `Arch` | The current operating system architecture. |
| exeExtension | `string` | File extension, if any, used for executable binaries on this platform: `'exe'` or `''` (empty string). |
| locale | `Promise<string \| null>` | A `BCP-47` language tag. If the locale couldn't be obtained, `null` is returned. |
| hostname | `Promise<string \| null>` | The host name of the operating system. |

## Notes

- Synchronous functions (`eol`, `platform`, `version`, `family`, `type`, `arch`, `exeExtension`) read values from `window.__TAURI_OS_PLUGIN_INTERNALS__`; `locale` and `hostname` are async IPC calls.
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@os-v2.4.0` `plugins/os/guest-js/index.ts`

## Related

- [OS Information plugin](../plugins-core/os-info.md)
