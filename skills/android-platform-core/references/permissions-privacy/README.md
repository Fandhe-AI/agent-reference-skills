# permissions-privacy

| Name | Description | Path |
|------|-------------|------|
| Advertising ID and App Set ID | Two user-resettable device identifiers with distinct privacy scopes for ad targeting and cross-app analytics. | [advertising-and-app-set-id.md](./advertising-and-app-set-id.md) |
| Automatic Permission Reset for Unused Apps | If an app targets Android 11 or higher and is unused for months, the system resets runtime permissions. | [automatic-permission-reset.md](./automatic-permission-reset.md) |
| Data Safety Section and Privacy Policy (Overview) | Google Play requires disclosure of collected data and linking a privacy policy in the Data safety section. | [data-safety-and-privacy-policy.md](./data-safety-and-privacy-policy.md) |
| Declaring Permissions in the Manifest | Permissions must be declared with `<uses-permission>` before being checked or requested at runtime. | [declaring-permissions.md](./declaring-permissions.md) |
| Permissions Used Only in Default Handlers | Some permissions are granted only to the app set as default handler for call/SMS functions. | [default-handler-permissions.md](./default-handler-permissions.md) |
| Defining Custom Permissions | Declares a brand-new permission with the `<permission>` manifest element for other apps to request. | [defining-custom-permissions.md](./defining-custom-permissions.md) |
| Evaluating Whether a Permission Is Needed | Before requesting a permission, evaluate privacy-preserving alternatives like intents and system services. | [evaluating-permission-need.md](./evaluating-permission-need.md) |
| Explaining Permission Access to Users | Guidance for telling users why a permission is needed in-app and via the system Privacy Dashboard. | [explaining-permission-access.md](./explaining-permission-access.md) |
| Location Button | A system-rendered button widget that grants session-scoped location access without a runtime dialog. | [location-button.md](./location-button.md) |
| Location Permissions | Location access is requested in stages: coarse, fine, and (API 29+) background, each with its own prompt. | [location-permissions.md](./location-permissions.md) |
| MANAGE_EXTERNAL_STORAGE (All-Files Access) | Special permission that grants read/write access to shared storage outside the app's sandbox. | [manage-external-storage.md](./manage-external-storage.md) |
| Media Permissions | Granular runtime permissions for reading other apps' media from shared storage, split by media type. | [media-permissions.md](./media-permissions.md) |
| Permission Groups and One-Time Permission | Related permissions are bundled into groups; sensitive data permissions offer a one-time grant option. | [permission-groups-and-one-time-permission.md](./permission-groups-and-one-time-permission.md) |
| Permission Types and Protection Levels | Android permissions are grouped into install-time, runtime, and special permissions with different grant behaviors. | [permission-types-and-protection-levels.md](./permission-types-and-protection-levels.md) |
| POST_NOTIFICATIONS Runtime Permission | Runtime permission introduced in Android 13 that gates whether an app can post non-exempt notifications. | [post-notifications-permission.md](./post-notifications-permission.md) |
| Requesting Permissions in Compose | Jetpack Compose UIs request runtime permissions with `rememberLauncherForActivityResult()`. | [requesting-permissions-in-compose.md](./requesting-permissions-in-compose.md) |
| Requesting Runtime Permissions | The standard flow for requesting dangerous permissions on Android 6.0 and higher using activity result APIs. | [requesting-runtime-permissions.md](./requesting-runtime-permissions.md) |
| Restrict Interactions with Other Apps | Protects app components from other apps via manifest permissions, runtime checks, and signature permissions. | [restrict-interactions-with-other-apps.md](./restrict-interactions-with-other-apps.md) |
| Special Permissions Overview | Special permissions guard powerful actions never granted through a runtime dialog but via settings. | [special-permissions-overview.md](./special-permissions-overview.md) |
| SYSTEM_ALERT_WINDOW (Display Over Other Apps) | Special permission that lets an app draw a window on top of other apps, requiring explicit system settings. | [system-alert-window.md](./system-alert-window.md) |
