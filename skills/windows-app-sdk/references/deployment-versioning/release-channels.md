# Release Channels

The three Windows App SDK release channels — Stable, Preview, and Experimental — their support status, cadence, and the servicing lifecycle policy for versions.

## Signature / Usage

| Channel | Description | Release cadence | Supported? |
|---|---|---|---|
| Stable | Production-ready; stable/supported APIs only. | Major release ≤ every 6 months, plus minor/patch servicing | Yes |
| Preview | Early look at the next Stable release; may include breaking API changes before stabilization. | At least one preview per Stable release | No |
| Experimental | Early-stage features under active development; APIs may change, be removed, or never ship. | Published as needed for prototype/design feedback | No |

## Options / Props

### Release lifecycle / support level

| Support level | Description |
|---|---|
| Current | Latest stable release; receives fixes most frequently (crashes, severe perf issues, functional bugs, new OS support). |
| Maintenance | No longer latest stable; still receives critical fixes, with a higher bar than Current. |
| Out of Support | No more fixes/updates; use is strongly discouraged. |

## Notes

- All release-channel quality is the same — only the servicing time frame differs between Current and Maintenance.
- Windows App SDK is governed by the Microsoft Modern Lifecycle; supported only on Windows releases still in support, even though it's backward compatible to Windows 10 version 1809.
- Support requires the latest Windows App SDK patch and a supported OS.
- File bugs/feature requests via the `microsoft/WindowsAppSDK` GitHub Issues; use GitHub Discussions for questions.

## Related

- [Downloads](./downloads.md)
- [System Requirements](./system-requirements.md)
