---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-380
---

# Breaking API Changes (38.0)

All breaking changes listed for Electron 38.0, verbatim from the official document.

## Signature / Usage

The 38.0 section of the source contains no fenced code. The replacements it names are shown below as plain signatures; only names that appear in the section are used.

```js
// Deprecated: webFrame.routingId  ->  use webFrame.frameToken
// Deprecated: webFrame.findFrameByRoutingId(routingId)  ->  use:
webFrame.findFrameByToken(frameToken)
```

## Breaking API Changes (38.0)

### Removed: `ELECTRON_OZONE_PLATFORM_HINT` environment variable

The default value of the `--ozone-platform` flag [changed to `auto`](https://chromium-review.googlesource.com/c/chromium/src/+/6775426).

Electron now defaults to running as a native Wayland app when launched in a Wayland session (when `XDG_SESSION_TYPE=wayland`).
Users can force XWayland by passing `--ozone-platform=x11`.

### Removed: `ORIGINAL_XDG_CURRENT_DESKTOP` environment variable

Previously, Electron changed the value of `XDG_CURRENT_DESKTOP` internally to `Unity`, and stored the original name of the desktop session
in a separate variable. `XDG_CURRENT_DESKTOP` is no longer overridden and now reflects the actual desktop environment.

### Removed: macOS 11 support

macOS 11 (Big Sur) is no longer supported by [Chromium](https://chromium-review.googlesource.com/c/chromium/src/+/6594615).

Older versions of Electron will continue to run on Big Sur, but macOS 12 (Monterey)
or later will be required to run Electron v38.0.0 and higher.

### Removed: `plugin-crashed` event

The `plugin-crashed` event has been removed from `webContents`.

### Deprecated: `webFrame.routingId` property

The `routingId` property will be removed from `webFrame` objects.

You should use `webFrame.frameToken` instead.

### Deprecated: `webFrame.findFrameByRoutingId(routingId)`

The `webFrame.findFrameByRoutingId(routingId)` function will be removed.

You should use `webFrame.findFrameByToken(frameToken)` instead.

## Notes

- The snippet under Signature / Usage restates names from this section (no code exists in the 38.0 source section).
- Affected API areas: environment variables (`ELECTRON_OZONE_PLATFORM_HINT`, `ORIGINAL_XDG_CURRENT_DESKTOP` removed); `--ozone-platform`; `webContents` `plugin-crashed` event (removed); `webFrame` `routingId` / `findFrameByRoutingId` (deprecated); macOS 11 support.

## Related

- [Breaking API Changes (39.0)](./breaking-changes-v39.md)
- [Breaking API Changes (37.0)](./breaking-changes-v37.md)
