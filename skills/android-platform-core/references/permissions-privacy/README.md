# permissions-privacy

| Name | Description | Path |
|------|-------------|------|
| Permission Types and Protection Levels | Install-time, runtime, and special permissions; normal/signature/dangerous/appop protection levels. | [permission-types-and-protection-levels.md](./permission-types-and-protection-levels.md) |
| Declaring Permissions | `<uses-permission>`, `maxSdkVersion`, `<uses-permission-sdk-23>` in the manifest. | [declaring-permissions.md](./declaring-permissions.md) |
| Requesting Runtime Permissions | `checkSelfPermission`, `registerForActivityResult`, `RequestPermission`/`RequestMultiplePermissions`, `shouldShowRequestPermissionRationale`. | [requesting-runtime-permissions.md](./requesting-runtime-permissions.md) |
| Requesting Permissions in Compose | `rememberLauncherForActivityResult` and Accompanist Permissions (`rememberPermissionState`). | [requesting-permissions-in-compose.md](./requesting-permissions-in-compose.md) |
| Evaluating Permission Need | Privacy-preserving alternatives (Photo Picker, intents, SMS Retriever) before requesting a permission. | [evaluating-permission-need.md](./evaluating-permission-need.md) |
| Explaining Permission Access | In-context rationale UI and the Privacy Dashboard rationale activity (`VIEW_PERMISSION_USAGE`). | [explaining-permission-access.md](./explaining-permission-access.md) |
| Permission Groups and One-Time Permission | How permission groups bundle dialogs; the "Only this time" one-time grant. | [permission-groups-and-one-time-permission.md](./permission-groups-and-one-time-permission.md) |
| Automatic Permission Reset | Unused-app runtime permission auto-reset (API 30+) and standby-bucket thresholds. | [automatic-permission-reset.md](./automatic-permission-reset.md) |
| Special Permissions Overview | General flow for `appop`-level permissions; `canScheduleExactAlarms()` example. | [special-permissions-overview.md](./special-permissions-overview.md) |
| SYSTEM_ALERT_WINDOW | Draw-over-other-apps overlay permission via `Settings.ACTION_MANAGE_OVERLAY_PERMISSION`. | [system-alert-window.md](./system-alert-window.md) |
| MANAGE_EXTERNAL_STORAGE | All-files access special permission via `ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION`. | [manage-external-storage.md](./manage-external-storage.md) |
| POST_NOTIFICATIONS Runtime Permission | Notification-posting runtime permission introduced in API 33. | [post-notifications-permission.md](./post-notifications-permission.md) |
| Location Permissions | `ACCESS_COARSE_LOCATION` / `ACCESS_FINE_LOCATION` / `ACCESS_BACKGROUND_LOCATION` staged requests. | [location-permissions.md](./location-permissions.md) |
| Media Permissions | `READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO` / `READ_MEDIA_AUDIO` / `READ_MEDIA_VISUAL_USER_SELECTED`. | [media-permissions.md](./media-permissions.md) |
| Advertising ID and App Set ID | AAID (`AdvertisingIdClient`) vs App Set ID scope, resettability, and privacy rules. | [advertising-and-app-set-id.md](./advertising-and-app-set-id.md) |
| Data Safety Section and Privacy Policy | Play Console disclosure requirements tied to declared permissions (overview only). | [data-safety-and-privacy-policy.md](./data-safety-and-privacy-policy.md) |
