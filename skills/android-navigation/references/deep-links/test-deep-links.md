# Testing Deep Links and App Links

`adb` commands and tools to fire a deep link into a running app and to inspect App Links verification state on-device.

## Signature / Usage

```bash
# Fire a custom-scheme deep link
adb shell am start -W -a android.intent.action.VIEW -d "example://gizmos" com.example.android

# Fire an http/https link
adb shell am start -W -a android.intent.action.VIEW -d "https://www.example.com/gizmos" com.example.android

# Inspect link-handling policies for all packages
adb shell dumpsys package domain-preferred-apps
```

Escape ampersands when a link carries multiple query values for the same key:

```bash
adb shell am start -W -a android.intent.action.VIEW \
  -d "basepath?colors=red\&colors=blue" com.example.android
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `am start -a android.intent.action.VIEW -d "<uri>" <package>` | `adb` command | Launches the given URI as a `VIEW` intent, exercising the same intent-filter matching as a real click. |
| `dumpsys package domain-preferred-apps` (or `dumpsys package d`) | `adb` command | Lists, per package, which domains it handles and whether the status is `always` (verified via `autoVerify`) or a hex user-preference value. |
| Digital Asset Links API (`https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=...&relation=delegate_permission/common.handle_all_urls`) | HTTP GET | Confirms `assetlinks.json` is correctly hosted and parseable, independent of any device. |

## Notes

- Wait at least 20 seconds after install before checking verification status — the system verification agent runs asynchronously.
- Only `http`/`https` links participate in App Links verification; custom schemes are matched by intent filter only and are never "verified".
- Prefer a physical device over an emulator for verification testing, since system verification processes can behave differently on emulators.
- Android Studio's App Links Assistant and the Play Console's Deep Links page provide interactive alternatives to the raw `adb`/API flow.

## Related

- [verify-app-links](./verify-app-links.md)
- [intent-filter-deep-links](./intent-filter-deep-links.md)
