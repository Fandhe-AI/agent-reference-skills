# Watch Face Designer export and publishing to Google Play

Export options for a Watch Face Designer watch face: Google Play (.aab), Android Studio project, one-click deploy, APK, raw resources, and Watch Face Studio.

## Signature / Usage

Install an exported APK on a watch connected over USB or Wi-Fi:

```bash
adb install <exported>.apk
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Google Play | export | Produces an `.aab` (Android App Bundle). Recommended for designers who create watch faces on Wear OS. |
| Android Studio | export | Saves a ZIP to extract as a Gradle project; allows editing as code and using Watch Face Format features not supported in Watch Face Designer. Recommended for developers. |
| One-click deploy | export | macOS only. Connect the watch over USB, press **Export** > **One-click deploy**, open the saved file and press **Play**; deploys and sets the face as current favorite. |
| APK | export | Installable package; deploy with ADB (`adb install`) over USB or Wi-Fi. |
| Raw resources | export | Uncompiled package with `AndroidManifest.xml` and `res/`; use with a tool like AAPT2 for custom signing keys and certificates. |
| Watch Face Studio (experimental) | export | Creates a project for Samsung's Watch Face Studio; some Figma features might not appear as expected. |

## Notes

- Publishing to Play follows the separate Google Play publishing instructions page (https://developer.android.com/training/wearables/watch-face-designer/publish); that page is not covered here.
- One-click deploy on Windows, Linux or ChromeOS is unavailable; use APK export. A permissions dialog may appear; **Always Allow** avoids repeating it.
- On Pixel Watch 2 and 3 the included charging cable provides USB; for devices without direct USB (such as Pixel Watch 1) use wireless debugging.
- Source: https://developer.android.com/training/wearables/watch-face-designer/export (page last updated 2026-09-22 UTC per the site footer; fetched 2026-10).

## Related

- [watch-face-designer](./watch-face-designer.md)
- [watch-face-designer-advanced](./watch-face-designer-advanced.md)
- [build-and-debug](./build-and-debug.md)
