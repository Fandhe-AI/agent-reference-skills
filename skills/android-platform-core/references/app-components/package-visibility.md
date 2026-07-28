# Package visibility

A privacy feature (Android 11 / API 30+) that limits which installed packages an app can query or interact with unless it declares its needs via `<queries>` in the manifest.

## Signature / Usage

```xml
<queries>
    <package android:name="com.example.app" />

    <intent>
        <action android:name="android.intent.action.SEND" />
        <mimeType android:mimeType="image/*" />
    </intent>

    <provider android:authorities="com.example.provider" />
</queries>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<package>` | `<queries>` child | — | Declares visibility of one specific package by name. |
| `<intent>` | `<queries>` child | — | Declares visibility of any package exposing a component matching the given intent filter shape. |
| `<provider>` | `<queries>` child | — | Declares visibility of a specific content provider by `authorities`. |
| `QUERY_ALL_PACKAGES` | `<uses-permission>` | — | Grants visibility of all installed packages; requires Google Play approval for legitimate use cases and should be a last resort. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Without a matching `<queries>` declaration (or automatic visibility, e.g. the app's own package, system apps, or packages matching your own declared `<intent-filter>`s), methods like `queryIntentActivities()`, `getPackageInfo()`, `getInstalledApplications()`, and `intent.resolveActivity()` return filtered/empty results for other apps.
- Package visibility affects both explicit interactions (starting another app's `Service`, querying its info) and implicit intent resolution — the same rule that backs the `resolveActivity()` guard used in [Intent](./intent.md) and [Common intents](./common-intents.md).

## Related

- [Intent](./intent.md)
- [Intent filters](./intent-filters.md)
- [Common intents](./common-intents.md)
