# `android:autoVerify` and Digital Asset Links (`assetlinks.json`)

`android:autoVerify="true"` on an `<intent-filter>` tells Android to verify ownership of the linked website via a Digital Asset Links (`assetlinks.json`) file, turning a web link into a verified Android App Link.

## Signature / Usage

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="www.example.com" />
</intent-filter>
```

Hosted at `https://www.example.com/.well-known/assetlinks.json`:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example",
    "sha256_cert_fingerprints": [
      "14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"
    ]
  }
}]
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:autoVerify` | `Boolean` | `false` | Set on `<intent-filter>` to request Android App Links verification for its `http`/`https` hosts. |
| `package_name` | `String` | — | Application ID from `build.gradle`, must match the requesting app. |
| `sha256_cert_fingerprints` | `String[]` | — | SHA-256 fingerprint(s) of the app's signing certificate (get via `keytool -list -v -keystore ...`, or from Play Console if using Play App Signing). Must be **uppercase**. |
| `relation` | `String[]` | — | Always `["delegate_permission/common.handle_all_urls"]` for App Links. |
| `dynamic_app_link_components` (Android 15+) | array | — | Path (`"/"`), fragment (`"#"`), and query (`"?"`) matchers plus `"exclude": true`, evaluated in order (first match wins); cannot expand beyond the manifest's declared scope. |

## Notes

- Must be served over HTTPS as `application/json`, publicly accessible, with **no** redirects (`http`→`https` or `example.com`→`www.example.com` redirects make verification fail entirely — a security protection).
- Publish `assetlinks.json` on every domain used across your app's intent filters; multiple apps can be listed for one site, and one app can be listed on multiple sites (one file per site).
- On Android 11 and lower, if any declared host is non-verifiable, verification fails for **all** hosts in the app; Android 12+ allows partial per-host verification.
- Android 15+ periodically re-fetches `assetlinks.json` in the background; changes can take up to 7 days to propagate. Android 14 and lower only re-check on install/update.
- Debug-signed builds fail verification unless the debug certificate's fingerprint is also listed — a common cause of "works with release, fails with debug".

## Related

- [deep-link-types](./deep-link-types.md)
- [verify-app-links](./verify-app-links.md)
