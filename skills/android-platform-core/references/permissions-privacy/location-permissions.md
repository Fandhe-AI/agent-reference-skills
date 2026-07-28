# Location Permissions

Location access is requested in stages: coarse (approximate), fine (precise), and — on Android 10 (API 29)+ — a separate background permission, each gated by its own runtime prompt.

## Signature / Usage

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<!-- Required only when requesting background location on API 29+ -->
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

```xml
<service
    android:name="MyNavigationService"
    android:foregroundServiceType="location" ... />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ACCESS_COARSE_LOCATION` | dangerous permission | — | Approximate location, accurate to roughly 3 km². |
| `ACCESS_FINE_LOCATION` | dangerous permission | — | Precise location, typically within ~50 m; the user can still downgrade the grant to approximate-only. |
| `ACCESS_BACKGROUND_LOCATION` | dangerous permission | — | Required on API 29+ to access location while the app is not in the foreground; must be requested only after foreground location is already granted. On API 28 and below, foreground grants imply background access. |

## Notes

- The app must function correctly even if the user grants only approximate location despite `ACCESS_FINE_LOCATION` being declared; offer an in-app upgrade path if precise data is truly required.
- Since Android 10 (API 29)+, requesting `ACCESS_BACKGROUND_LOCATION` in the same runtime dialog as foreground location is disallowed by the system — request it in a separate, later step and explain why. Google Play further restricts background location to apps whose core functionality requires it.
- A foreground service that accesses location on API 29+ must declare `android:foregroundServiceType="location"`.
- On Android 12+ (API 31+), check `getLocationPowerSaverMode()` to detect `LOCATION_MODE_FOREGROUND_ONLY` under Battery Saver.
- The system shows a periodic reminder notification the first time an app accesses background location after being granted, on API 29+.

## Related

- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
- [explaining-permission-access](./explaining-permission-access.md)
- [evaluating-permission-need](./evaluating-permission-need.md)
