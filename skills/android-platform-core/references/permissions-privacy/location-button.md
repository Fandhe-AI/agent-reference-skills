# Location Button

A first-party, system-rendered button widget (`androidx.core:core-locationbutton`) that grants session-scoped precise location access with a single tap, without a runtime permission dialog or the app ever seeing the raw permission state — a privacy-preserving alternative to requesting `ACCESS_FINE_LOCATION` outright for one-off, in-the-moment location needs.

## Signature / Usage

```kotlin
import androidx.core.locationbutton.compose.LocationButton
import androidx.core.locationbutton.compose.LocationButtonTextType

@Composable
fun NearMeButton(onGranted: () -> Unit, onDenied: () -> Unit) {
    LocationButton(
        onPermissionResult = { isGranted -> if (isGranted) onGranted() else onDenied() },
        textType = LocationButtonTextType.UsePreciseLocation,
    )
}
```

```xml
<!-- Standard location permissions, plus the system permission required to render the button -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.USE_LOCATION_BUTTON" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onPermissionResult` | `(Boolean) -> Unit` | required | Callback invoked with the grant/denial outcome after the button is tapped. |
| `textType` | `LocationButtonTextType` | — | Predefined label: `PreciseLocation`, `UsePreciseLocation`, `SharePreciseLocation`, `NearMyPreciseLocation`, or `None`. |
| `backgroundColor` / `textColor` / `iconTint` | `Color` | system default | Visual customization; the location icon itself and font size are fixed/system-managed and cannot be replaced. |
| `cornerRadius` / `pressedCornerRadius` | `Dp` | system default | Corner radius in resting and pressed states. |
| `strokeColor` / `strokeWidth` | `Color` / `Dp` | system default | Outline styling. |
| `clickablePadding` | `PaddingValues` | system default | Extra touch-target padding, system-coerced to a 4-8dp range. |

## Notes

- Requires the `android.permission.USE_LOCATION_BUTTON` manifest declaration in addition to the standard coarse/fine location permissions; the button itself is rendered by the system rather than the app's own UI layer.
- Apps can additionally declare `android:usesPermissionFlags="onlyForLocationButton"` on `ACCESS_FINE_LOCATION` to restrict that permission to only ever being grantable through this button.
- Starting with target API 37 (Android 17), Google Play policy requires apps that only need session-based location access to use this button instead of the standard runtime permission flow.
- On Android 16 (API 36) and lower, the library falls back to a locally-rendered component that preserves the same visual layout but reverts to the standard runtime location permission prompt.
- The library was in alpha at the time of writing; API surface may change.

## Related

- [evaluating-permission-need](./evaluating-permission-need.md)
- [location-permissions](./location-permissions.md)
