---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-360
---

# Breaking API Changes (36.0)

All breaking changes listed for Electron 36.0, verbatim from the official document.

## Breaking API Changes (36.0)

### Behavior Changes: `app.commandLine`

`app.commandLine` will convert upper-cases switches and arguments to lowercase.

`app.commandLine` was only meant to handle chromium switches (which aren't case-sensitive) and switches passed via `app.commandLine` will not be passed down to any of the child processes.

If you were using `app.commandLine` to control the behavior of the main process, you should do this via `process.argv`.

### Deprecated: `NativeImage.getBitmap()`

`NativeImage.toBitmap()` returns a newly-allocated copy of the bitmap. `NativeImage.getBitmap()` was originally an alternative function that returned the original instead of a copy. This changed when sandboxing was introduced, so both return a copy and are functionally equivalent.

Client code should call `NativeImage.toBitmap()` instead:

```js
// Deprecated
bitmap = image.getBitmap()
// Use this instead
bitmap = image.toBitmap()
```

### Removed: `isDefault` and `status` properties on `PrinterInfo`

These properties have been removed from the PrinterInfo Object
because they have been removed from upstream Chromium.

### Removed: `quota` type `syncable` in `Session.clearStorageData(options)`

When calling `Session.clearStorageData(options)`, the `options.quota` type
`syncable` is no longer supported because it has been
[removed](https://chromium-review.googlesource.com/c/chromium/src/+/6309405)
from upstream Chromium.

### Deprecated: `null` value for `session` property in `ProtocolResponse`

Previously, setting the ProtocolResponse.session property to `null`
would create a random independent session. This is no longer supported.

Using single-purpose sessions here is discouraged due to overhead costs;
however, old code that needs to preserve this behavior can emulate it by
creating a random session with `session.fromPartition(some_random_string)`
and then using it in `ProtocolResponse.session`.

### Deprecated: `quota` property in `Session.clearStorageData(options)`

When calling `Session.clearStorageData(options)`, the `options.quota`
property is deprecated. Since the `syncable` type was removed, there
is only one type left -- `'temporary'` -- so specifying it is unnecessary.

### Deprecated: Extension methods and events on `session`

`session.loadExtension`, `session.removeExtension`, `session.getExtension`,
`session.getAllExtensions`, 'extension-loaded' event, 'extension-unloaded'
event, and 'extension-ready' events have all moved to the new
`session.extensions` class.

### Removed: `systemPreferences.isAeroGlassEnabled()`

The `systemPreferences.isAeroGlassEnabled()` function has been removed without replacement.
It has been always returning `true` since Electron 23, which only supports Windows 10+, where DWM composition can no longer be disabled.

https://learn.microsoft.com/en-us/windows/win32/dwm/composition-ovw#disabling-dwm-composition-windows7-and-earlier

### Changed: GTK 4 is default when running GNOME

After an [upstream change](https://chromium-review.googlesource.com/c/chromium/src/+/6310469), GTK 4 is now the default when running GNOME.

In rare cases, this may cause some applications or configurations to [error](https://github.com/electron/electron/issues/46538) with the following message:

```stderr
Gtk-ERROR **: 11:30:38.382: GTK 2/3 symbols detected. Using GTK 2/3 and GTK 4 in the same process is not supported
```

Affected users can work around this by specifying the `gtk-version` command-line flag:

```shell
$ electron --gtk-version=3   # or --gtk-version=2
```

The same can be done with the [`app.commandLine.appendSwitch`](https://www.electronjs.org/docs/latest/api/command-line#commandlineappendswitchswitch-value) function.

## Notes

- Affected API areas: `app.commandLine`; `NativeImage.getBitmap()`; `PrinterInfo` (`isDefault`, `status` removed); `Session.clearStorageData` (`quota`); `ProtocolResponse.session`; `session` extension methods/events (moved to `session.extensions`); `systemPreferences.isAeroGlassEnabled()` (removed in 36.0, deprecated in 35.0); GTK 4 default on GNOME.
- `ProtocolResponse` / `session` entries concern Electron's Chromium sessions and custom protocols. Authentication sessions and cookies in app auth flows (with an Electron integration) are covered by better-auth; server-side HTTP by fastify and hono.

## Related

- [Breaking API Changes (37.0)](./breaking-changes-v37.md)
- [Breaking API Changes (35.0)](./breaking-changes-v35.md)
