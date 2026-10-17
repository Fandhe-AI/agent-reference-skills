---
source: https://docs.expo.dev/eas-update/override/
---

# Override update configuration at runtime

Change the update URL and request headers at runtime to load a specific update by ID or switch the update channel without creating a new build.

## Signature / Usage

```js
import * as Updates from 'expo-updates';

Updates.setUpdateRequestHeadersOverride({ 'expo-channel-name': 'preview' });

// You can fetch and reload the update immediately, or wait for the next launch
await Updates.fetchUpdateAsync();
await Updates.reloadAsync();
```

### Override request headers

Available in Expo SDK 54 with `expo-updates` 0.29.0 and later. The primary use case is channel surfing: switching the `expo-channel-name` request header at runtime. For example, override it to point a production build at a `preview` channel. Another use case is giving different updates to different users (for example employees first).

Call `Updates.setUpdateRequestHeadersOverride`, then `fetchUpdateAsync()` and `reloadAsync()` (or wait for the next launch). To override `expo-channel-name`, the native build must include it: a build profile in **eas.json** that defines `channel` sets it automatically, while builds created outside EAS Build (for example `npx expo run:android`) must declare it in `updates.requestHeaders` in app config and be rebuilt. Any other header you override must also be declared in `updates.requestHeaders`. The object passed replaces all custom request headers from the build, so include every header the app still needs.

### Override both update URL and request headers

Available in Expo SDK 52 with `expo-updates` 0.27.0 and later.

1. `Updates.setUpdateURLAndRequestHeadersOverride({ updateUrl: string, requestHeaders: Object })` overrides the update URL and request headers specified in app.json / Expo.plist / AndroidManifest.xml.
2. `disableAntiBrickingMeasures` (app config) disables the built-in anti-bricking measures that ensure subsequent updates can always be published to fix a previously installed update. Changing this value requires a new build.

The override takes effect only after the app is completely closed and reopened; the update and its assets download while the user waits on the splash screen.

```js
function overrideUpdateURLAndHeaders() {
  Updates.setUpdateURLAndRequestHeadersOverride({
    updateUrl: 'https://u.expo.dev/{updateId}/group/{groupId}',
    requestHeaders: {},
  });

  alert('Close and re-open the app to load the latest version.');
}
```

```json
{
  "expo": {
    "updates": {
      "disableAntiBrickingMeasures": true
    }
  }
}
```

## Notes

- Use `disableAntiBrickingMeasures` only in preview builds; do not enable it in production. If the loaded update crashes, `expo-updates` cannot recover automatically because embedded updates are disabled; the user would need to reinstall the app.
- Security: with anti-bricking disabled, a compromised employee able to publish updates could change the update URL and headers to point to their own server and take over installations. Mitigate (not eliminate) with code signing and limited key access.
- Switching channels can cause compatibility issues when updates use different migrations or data shapes.
- Source modificationDate: October 01, 2026 (fetched 2026-10-17).

## Related

- [Updates](./updates.md)
- [Preview updates](./preview.md)
- [End-to-end code signing with EAS Update](./code-signing.md)
- [Downloading updates](./download-updates.md)
