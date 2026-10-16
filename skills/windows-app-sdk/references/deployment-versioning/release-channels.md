# Release Channels

The three Windows App SDK release channels — Stable, Preview, and Experimental — their support status, cadence, and the servicing lifecycle policy for versions.

## Signature / Usage

| Channel | Description | Release cadence | Supported? | Latest release (as of the page's 2026-09-29 update) |
|---|---|---|---|---|
| Stable | Production-ready; stable/supported APIs only. | Major release ≤ every 6 months, plus minor/patch servicing | Yes | 2.5.1 (09/16/2026) |
| Preview | Early look at the next Stable release; may include breaking API changes before stabilization. | At least one preview per Stable release | No | 2.0 Preview2 (`2.0.0-preview2`, 03/31/2026) |
| Experimental | Early-stage features under active development; APIs may change, be removed, or never ship. | Published as needed for prototype/design feedback | No | 2.5 Experimental (`2.5.4-experimental`, 09/29/2026) |

## Options / Props

### Release lifecycle / support level

| Support level | Description |
|---|---|
| Current | Latest stable release; receives fixes most frequently (crashes, severe perf issues, functional bugs, new OS support). |
| Maintenance | No longer latest stable; still receives critical fixes, with a higher bar than Current. |
| Out of Support | No more fixes/updates; use is strongly discouraged. |

### Release lifecycle by version

| Windows App SDK version | Original release | Latest patch | Support level | End of servicing |
|---|---|---|---|---|
| 2.0 (2.x line) | 04/29/2026 | 2.5.1 (09/16/2026) | Current | 04/29/2027 |
| 1.8 | 09/09/2025 | 1.8.260921001 (09/24/2026) | Maintenance | 09/24/2026 |
| 1.7 | 03/18/2025 | 1.7.260224002 (03/10/2026) | Out of Support | 03/18/2026 |
| 1.6 and earlier (1.0 – 1.6, 0.5, 0.8) | — | — | Out of Support | — (see source page for per-version dates) |

## Notes

- Starting with 2.0 (stable GA 04/29/2026, `2.0.1`), releases use SemVer-style versions (`2.5.1`, `2.4.0`, ...); 1.x versions used the `1.x.<yyMMdd><nnn>` build-style patch numbers (e.g. `1.8.260921001`). The lifecycle table lists the whole 2.x line as one row ("2.0").
- App Content Search entered the Stable channel in 2.5.1 as a Limited Access Feature (apps must obtain a token); it is not available in Preview.
- All release-channel quality is the same — only the servicing time frame differs between Current and Maintenance.
- Windows App SDK is governed by the Microsoft Modern Lifecycle; supported only on Windows releases still in support, even though it's backward compatible to Windows 10 version 1809.
- Support requires the latest Windows App SDK patch and a supported OS.
- File bugs/feature requests via the `microsoft/WindowsAppSDK` GitHub Issues; use GitHub Discussions for questions.
- Source: https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/release-channels
- Source (App Content Search): https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/release-notes/windows-app-sdk-2-0

## Related

- [Downloads](./downloads.md)
- [System Requirements](./system-requirements.md)
