# Restrict Interactions with Other Apps

Protects an app's own `Activity`/`Service`/`ContentProvider`/`BroadcastReceiver` components from other apps by pairing manifest `android:permission` attributes with runtime permission checks, per-`Uri` grants, and custom signature permissions for IPC between apps signed by the same developer.

## Signature / Usage

```xml
<!-- Require callers to hold a custom permission to start this Service -->
<service android:name=".MyService"
    android:permission="com.example.myapp.permission.BIND_MY_SERVICE" />

<!-- Split read/write access on a ContentProvider -->
<provider android:name=".MyContentProvider"
    android:readPermission="com.example.myapp.permission.READ_ONLY"
    android:writePermission="com.example.myapp.permission.WRITE_ONLY"
    android:grantUriPermissions="true">
    <grant-uri-permission android:pathPattern="/public/.*" />
</provider>
```

```kotlin
// Explicit per-Uri grant/revoke from code (as the data owner)
context.grantUriPermission(otherPackage, uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)
context.revokeUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)

// Check the calling app's permission inside a bound Service/Provider callback
val result = context.checkCallingPermission("com.example.myapp.permission.MY_PERMISSION")
val granted = result == PackageManager.PERMISSION_GRANTED
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:permission` (component attribute) | manifest string | — | On `<activity>`/`<service>`, enforced during `startActivity()`/`startService()`/`bindService()`; on `<receiver>`, checked after `sendBroadcast()` returns without throwing (delivery is just skipped). |
| `android:readPermission` / `android:writePermission` | manifest string | — | On `<provider>`, restrict `query()` vs `insert()`/`update()`/`delete()` independently; holding only the write permission does not grant read access. |
| `Context.checkCallingPermission(String)` | function → `Int` | — | Checks the permission of the process that made the current incoming Binder call; returns `PackageManager.PERMISSION_GRANTED`/`PERMISSION_DENIED`. Only meaningful inside an IPC callback, not in normal app code. |
| `Context.checkPermission(String, Int, Int)` | function → `Int` | — | Checks whether a given PID/UID has been granted a permission, without relying on an in-flight Binder call. |
| `PackageManager.checkPermission(String, String)` | function → `Int` | — | Checks whether a named package holds a permission, independent of any active call. |
| `Context.grantUriPermission(String, Uri, int)` / `revokeUriPermission(Uri, int)` | function | — | Grants/revokes temporary read/write access to a single `Uri` for a specific package, as an alternative to Intent-flag grants. |
| `Context.checkUriPermission(Uri, int, int, int)` | function | — | Checks whether a given PID/UID already holds a granted `Uri` permission. |
| `<permission android:protectionLevel="signature">` | manifest element | — | Defines a custom permission auto-granted only to apps signed with the same certificate; the standard way to lock down IPC between an app family without user-facing prompts. |

## Notes

- `<receiver>` permission checks fail silently (broadcast just isn't delivered) whereas `<activity>`/`<service>` checks raise `SecurityException` — design error handling accordingly.
- Prefer setting `Intent.FLAG_GRANT_READ_URI_PERMISSION`/`FLAG_GRANT_WRITE_URI_PERMISSION` on the outgoing `Intent` over calling `grantUriPermission()` directly when possible: Intent-flag grants auto-revoke when the receiving task finishes, while explicit `grantUriPermission()` calls do not expire on their own and must be revoked manually.
- On apps targeting Android 11+ (API 30+), granting a `Uri` permission to another app makes that app visible to you even under package-visibility (`<queries>`) restrictions.
- Defining a new custom permission is covered separately in defining-custom-permissions; this page focuses on using `android:permission` and signature permissions to guard components you already own.

## Related

- [permission-types-and-protection-levels](./permission-types-and-protection-levels.md)
- [defining-custom-permissions](./defining-custom-permissions.md)
- [declaring-permissions](./declaring-permissions.md)
