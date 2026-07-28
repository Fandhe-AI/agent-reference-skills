# uses-sdk element

Declares the minimum, target, and maximum API levels the app supports.

## Signature / Usage

```xml
<uses-sdk android:minSdkVersion="21"
          android:targetSdkVersion="34" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:minSdkVersion` | Integer | `"1"` if omitted | Minimum API level required to run. Prevents installation on incompatible devices; if omitted the system assumes API level 1 and the app may crash at runtime using unavailable APIs. |
| `android:targetSdkVersion` | Integer | equals `minSdkVersion` | API level the app is tested against. Introduced API level 4. Disables forward-compatibility behaviors for lower levels; app can still run down to `minSdkVersion`. |
| `android:maxSdkVersion` | Integer | — | Maximum API level the app is designed to run on. Introduced API level 4. **Not recommended**: Android is backward-compatible, and Google Play uses this as a download filter; setting it can cause automatic app removal after a device OS update. |

## Notes

- Contained in: `<manifest>`.
- Deprecated in favor of `build.gradle`/`build.gradle.kts` `minSdkVersion` / `targetSdkVersion` settings, which take precedence and are the modern configuration surface.
- Build configuration (Gradle) is the authoritative source when both the manifest and Gradle declare these values.

## Related

- [manifest element](./manifest-element.md)
- [uses-feature element](./uses-feature-element.md)
