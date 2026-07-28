# Requesting Runtime Permissions

The standard flow for requesting a dangerous (runtime) permission on Android 6.0 (API 23) and higher, using `ContextCompat.checkSelfPermission()` and the AndroidX Activity Result API.

## Signature / Usage

```kotlin
private val requestPermissionLauncher = registerForActivityResult(
    ActivityResultContracts.RequestPermission()
) { isGranted: Boolean ->
    if (isGranted) {
        performAction()
    } else {
        showFeatureUnavailable()
    }
}

when {
    ContextCompat.checkSelfPermission(
        context, Manifest.permission.CAMERA
    ) == PackageManager.PERMISSION_GRANTED -> {
        performAction()
    }
    ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.CAMERA) -> {
        showInContextUI { requestPermissionLauncher.launch(Manifest.permission.CAMERA) }
    }
    else -> {
        requestPermissionLauncher.launch(Manifest.permission.CAMERA)
    }
}
```

For more than one permission at a time, use `ActivityResultContracts.RequestMultiplePermissions()`, whose callback receives a `Map<String, Boolean>`:

```kotlin
private val requestMultiplePermissionsLauncher = registerForActivityResult(
    ActivityResultContracts.RequestMultiplePermissions()
) { permissions: Map<String, Boolean> ->
    when {
        permissions.getOrDefault(Manifest.permission.CAMERA, false) -> { /* granted */ }
        permissions.getOrDefault(Manifest.permission.RECORD_AUDIO, false) -> { /* granted */ }
        else -> { /* denied */ }
    }
}

requestMultiplePermissionsLauncher.launch(
    arrayOf(Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO)
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ContextCompat.checkSelfPermission(context, permission)` | function | — | Returns `PackageManager.PERMISSION_GRANTED` or `PERMISSION_DENIED`. |
| `ActivityCompat.shouldShowRequestPermissionRationale(activity, permission)` | function | — | Returns `true` if the user previously denied the permission once (not "don't ask again"); used to decide whether to show educational UI before the system prompt. |
| `ActivityResultContracts.RequestPermission()` | contract | — | Requests a single permission; callback receives `Boolean`. |
| `ActivityResultContracts.RequestMultiplePermissions()` | contract | — | Requests several permissions at once; callback receives `Map<String, Boolean>`. |
| `registerForActivityResult(contract, callback)` | function | — | Must be called and stored as a property before the Activity/Fragment reaches `STARTED`, not inside a click handler. |

## Notes

- Requires `androidx.activity:activity` 1.2.0+ and, for Fragments, `androidx.fragment:fragment` 1.3.0+.
- Always call `checkSelfPermission()` before every protected operation — never cache a "granted" result, since the user (or the system's automatic reset) can revoke a permission at any time.
- Request permissions in context, tied to the user action that needs them, rather than in bulk at app startup.
- For Jetpack Compose UIs use `rememberLauncherForActivityResult()` instead of `registerForActivityResult()`; see [requesting-permissions-in-compose](./requesting-permissions-in-compose.md).
- ADB helpers for testing: `adb shell pm grant/revoke PACKAGE PERMISSION`, `adb shell dumpsys package PACKAGE_NAME` (shows `USER_SET` / `USER_FIXED` flags), `adb shell pm clear-permission-flags PACKAGE PERMISSION user-set user-fixed`.

## Related

- [requesting-permissions-in-compose](./requesting-permissions-in-compose.md)
- [explaining-permission-access](./explaining-permission-access.md)
- [permission-groups-and-one-time-permission](./permission-groups-and-one-time-permission.md)
- [declaring-permissions](./declaring-permissions.md)
