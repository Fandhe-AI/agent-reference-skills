# Declaring Deep Links with `<intent-filter>`

Registers an `Activity` to respond to `VIEW` intents matching a custom scheme or web URL, via `AndroidManifest.xml`.

## Signature / Usage

```xml
<activity android:name="com.example.android.GizmosActivity">
    <!-- Custom scheme deep link -->
    <intent-filter android:label="@string/filter_view_example_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="example" android:host="gizmos" />
    </intent-filter>

    <!-- HTTP/HTTPS web link -->
    <intent-filter android:label="@string/filter_view_http_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="http" android:host="www.example.com" android:pathPrefix="/gizmos" />
    </intent-filter>
</activity>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android.intent.action.VIEW` | `<action>` | — | Required so the filter is reachable from browsers and Search. |
| `android.intent.category.DEFAULT` | `<category>` | — | Allows the activity to respond to implicit intents. |
| `android.intent.category.BROWSABLE` | `<category>` | — | Required to make the activity reachable from a web browser. |
| `android:scheme` | `<data>` attribute | — | Required. `http`, `https`, or a custom scheme. |
| `android:host` | `<data>` attribute | — | Domain name to match. |
| `android:pathPrefix` | `<data>` attribute | — | Path prefix; must start with `/`. |
| `android:path` | `<data>` attribute | — | Exact path match. |
| `android:pathPattern` | `<data>` attribute | — | Regex-style path pattern. |
| `android:port` | `<data>` attribute | — | Port number. |

## Notes

- Multiple `<data>` elements inside **the same** `<intent-filter>` are merged into every combination, not matched pairwise — e.g. `scheme="https" host="www.example.com"` plus `scheme="app" host="open.my.app"` in one filter also unintentionally matches `app://www.example.com` and `https://open.my.app`. Use separate `<intent-filter>` blocks per URI combination to avoid this.
- Even with a matching filter, users may still see a disambiguation dialog or have set a different default app; a matching intent filter does not guarantee your app handles the link (see [asset-links-verification](./asset-links-verification.md) for how App Links bypass this).
- On Android 12+, unverified `http`/`https` links generally open in the browser by default.

## Related

- [deep-link-types](./deep-link-types.md)
- [intent-action-view-launch-mode](./intent-action-view-launch-mode.md)
- [test-deep-links](./test-deep-links.md)
