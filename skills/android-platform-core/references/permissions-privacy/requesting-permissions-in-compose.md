# Requesting Permissions in Compose

Jetpack Compose UIs request runtime permissions with `rememberLauncherForActivityResult()`, the Compose-scoped equivalent of `registerForActivityResult()`. The third-party Accompanist Permissions library layers composable state on top of this API.

## Signature / Usage

```kotlin
val context = LocalContext.current
val permissionLauncher = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission()
) { isGranted ->
    if (isGranted) {
        // permission granted
    } else {
        // permission denied
    }
}

Button(onClick = {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        permissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
    }
}) {
    Text("Enable Notifications")
}
```

Accompanist Permissions (`com.google.accompanist:accompanist-permissions`, third-party):

```kotlin
val cameraPermissionState = rememberPermissionState(
    android.Manifest.permission.CAMERA
)
if (cameraPermissionState.status.isGranted) {
    // show camera feature
} else {
    // show rationale + a button that calls cameraPermissionState.launchPermissionRequest()
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `rememberLauncherForActivityResult(contract, callback)` | composable function | — | Returns an `ActivityResultLauncher`; safe to call directly in composition (handles lifecycle internally, unlike `registerForActivityResult()`). |
| `rememberPermissionState(permission)` | Accompanist composable function | — | Returns a `PermissionState` exposing `status.isGranted` and `launchPermissionRequest()`. Third-party (Accompanist), not part of AndroidX. |
| `rememberMultiplePermissionsState(permissions)` | Accompanist composable function | — | Same as above for a `List<String>` of permissions. |

## Notes

- `launchPermissionRequest()` (Accompanist) and `launcher.launch(...)` (AndroidX) must be invoked from a non-composable scope, such as a `Button` `onClick` lambda or a `LaunchedEffect`, never directly in the composable body.
- Accompanist Permissions is a third-party Google library (`google.github.io/accompanist`), separate from AndroidX; it cannot distinguish a first-time denial from a permanent ("don't ask again") denial — check `shouldShowRequestPermissionRationale` semantics apply the same way as in the View system.
- For `POST_NOTIFICATIONS`, guard the `launch()` call with `Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU` (API 33) since the permission does not exist on lower API levels.

## Related

- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
- [post-notifications-permission](./post-notifications-permission.md)
