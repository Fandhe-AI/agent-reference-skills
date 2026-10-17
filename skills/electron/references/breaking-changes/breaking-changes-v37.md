---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-370
---

# Breaking API Changes (37.0)

All breaking changes listed for Electron 37.0, verbatim from the official document.

## Signature / Usage

From "Utility Process unhandled rejection behavior change" (37.0), to restore the previous behavior:

```js
process.on('unhandledRejection', () => {
  process.exit(1)
})
```

## Breaking API Changes (37.0)

### Utility Process unhandled rejection behavior change

Utility Processes will now warn with an error message when an unhandled
rejection occurs instead of crashing the process.

To restore the previous behavior, you can use:

```js
process.on('unhandledRejection', () => {
  process.exit(1)
})
```

### Behavior Changed: `process.exit()` kills utility process synchronously

Calling `process.exit()` in a utility process will now kill the utility process synchronously.
This brings the behavior of `process.exit()` in line with Node.js behavior.

Please refer to the
[Node.js docs](https://nodejs.org/docs/latest-v22.x/api/process.html#processexitcode) and
[PR #45690](https://github.com/electron/electron/pull/45690) to understand the potential
implications of that, e.g., when calling `console.log()` before `process.exit()`.

### Behavior Changed: WebUSB and WebSerial Blocklist Support

[WebUSB](https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API) and [Web Serial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) now support the [WebUSB Blocklist](https://wicg.github.io/webusb/#blocklist) and [Web Serial Blocklist](https://wicg.github.io/serial/#blocklist) used by Chromium and outlined in their respective specifications.

To disable these, users can pass `disable-usb-blocklist` and `disable-serial-blocklist` as command line flags.

### Removed: `null` value for `session` property in `ProtocolResponse`

This deprecated feature has been removed.

Previously, setting the `ProtocolResponse.session` property to `null`
would create a random independent session. This is no longer supported.

Using single-purpose sessions here is discouraged due to overhead costs;
however, old code that needs to preserve this behavior can emulate it by
creating a random session with `session.fromPartition(some_random_string)`
and then using it in `ProtocolResponse.session`.

### Behavior Changed: `BrowserWindow.IsVisibleOnAllWorkspaces()` on Linux

`BrowserWindow.IsVisibleOnAllWorkspaces()` will now return false on Linux if the
window is not currently visible.

## Notes

- Affected API areas: `utilityProcess` (unhandled rejection, `process.exit()`); WebUSB / Web Serial blocklists (command line flags `disable-usb-blocklist`, `disable-serial-blocklist`); `ProtocolResponse.session` (`null` removed); `BrowserWindow.isVisibleOnAllWorkspaces()` on Linux.
- The `ProtocolResponse` entry concerns Electron's custom protocol handlers (`protocol`); it is unrelated to server-side HTTP frameworks such as fastify and hono.

## Related

- [Breaking API Changes (38.0)](./breaking-changes-v38.md)
- [Breaking API Changes (36.0)](./breaking-changes-v36.md)
