# Android 17 (API 37) Platform Changes

Behavior changes and new platform features of Android 17 (API level 37) that touch app components, intents, the manifest, SMS permissions, and notifications. Items marked "all apps" apply regardless of `targetSdkVersion`; items marked "target 37" apply only to apps targeting API 37 or higher.

## Signature / Usage

```kotlin
// Detect implicit URI permission grants (ACTION_SEND / ACTION_SEND_MULTIPLE / ACTION_IMAGE_CAPTURE)
val policy = StrictMode.VmPolicy.Builder()
    .detectImplicitUriPermissionGrant()
    .penaltyLog()
    .build()
StrictMode.setVmPolicy(policy)
```

```kotlin
// Grant explicitly: ACTION_SEND / ACTION_SEND_MULTIPLE
intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)

// Grant explicitly: ACTION_IMAGE_CAPTURE
intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
```

## Options / Props

| Change | Scope | Developer action |
|--------|-------|------------------|
| Implicit URI grants for `ACTION_SEND`, `ACTION_SEND_MULTIPLE`, `ACTION_IMAGE_CAPTURE` | all apps (system stops auto-granting starting in Android 18) | Add `FLAG_GRANT_READ_URI_PERMISSION` (and `FLAG_GRANT_WRITE_URI_PERMISSION` for `ACTION_IMAGE_CAPTURE`) explicitly; detect with `StrictMode.VmPolicy.Builder.detectImplicitUriPermissionGrant()` or `adb logcat \| grep "Please set the grant explicitly in the app"`. |
| `android:usesCleartextTraffic` deprecation plan | all apps (planned for a future release) | Move to a network security configuration file (API 24+); if `minSdk` is below 24, set `usesCleartextTraffic="true"` and also use the network configuration file. |
| IME visibility not restored after an unhandled configuration change | all apps | Set `android:windowSoftInputMode` to `stateAlwaysVisible`, or request the soft keyboard in `onCreate()` / `onConfigurationChanged()`. |
| SMS OTP protection extended to WebOTP-format messages | all apps | `SMS_RECEIVED_ACTION` is withheld and SMS provider queries are filtered for 3 hours for apps that are not the intended recipient; migrate to SMS Retriever or SMS User Consent APIs. |
| OTP protection for standard SMS messages | target 37 | Same 3-hour delay applies to standard SMS messages containing an OTP; migrate to SMS Retriever or SMS User Consent APIs. |
| Background activity launch hardening for `IntentSender` | target 37 | Migrate away from `MODE_BACKGROUND_ACTIVITY_START_ALLOWED` to granular modes such as `MODE_BACKGROUND_ACTIVITY_START_ALLOW_IF_VISIBLE`. |
| Orientation, resizability, aspect-ratio restrictions ignored on large screens (sw >= 600dp) | target 37 (the opt-out available when targeting SDK 36 is no longer available) | Support all orientations and resizable windows. |
| `ACCESS_LOCAL_NETWORK` runtime permission | target 37 | See the Nearby Devices Permissions page. |
| Handoff | new feature | Call `setHandoffEnabled()` on the activity and implement `onHandoffActivityDataRequested()` returning a `HandoffActivityData`. |
| Live Update semantic color API | new feature | See the Live Update page. |

## Notes

- Source: https://developer.android.com/about/versions/17/behavior-changes-all (fetched 2026-11-14).
- Source: https://developer.android.com/about/versions/17/behavior-changes-17 (fetched 2026-11-14).
- Source: https://developer.android.com/about/versions/17/features (fetched 2026-11-14).
- The official behavior-changes page spells the heading "usesClearTraffic deprecation plan" while the text refers to `usesCleartextTraffic`; the manifest attribute is `android:usesCleartextTraffic`.
- The official text for the implicit URI grant change says the system stops granting automatically "starting in Android 18"; Android 17 itself still grants.
- The official features page for Handoff names only `setHandoffEnabled()`, `onHandoffActivityDataRequested()`, and `HandoffActivityData`; no code sample is published there.
- Certain apps (for example the default SMS app and connected device companion apps) are exempt from the SMS OTP delay.
- Other Android 17 behavior changes (memory limits, keystore limits, cross-profile loopback traffic, background audio hardening, Bluetooth, ECH) are outside this skill's scope.

## Related

- [intent](./intent.md)
- [common-intents](./common-intents.md)
- [configuration-changes](./configuration-changes.md)
- [background-activity-launch](./background-activity-launch.md)
