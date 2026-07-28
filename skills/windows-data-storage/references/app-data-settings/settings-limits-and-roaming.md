# Settings size limits and roaming deprecation

Size constraints on `ApplicationDataContainer` settings, and the deprecation of roaming app data/settings as of Windows 11.

## Signature / Usage

```csharp
// LocalSettings and RoamingSettings share the same limits.
var localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;
localSettings.Values["exampleSetting"] = "Hello Windows"; // simple setting, up to 8K bytes
```

## Options / Props

| Limit | Value |
|-------|-------|
| Setting name length | 255 characters max |
| Simple setting value size | 8K bytes max |
| Composite setting (`ApplicationDataCompositeValue`) size | 64K bytes max |
| Container nesting depth | 32 levels max |

## Notes

- These limits apply equally to `LocalSettings` and `RoamingSettings`.
- **Roaming data and settings are no longer supported as of Windows 11.** The recommended replacement for cross-device sync is Azure App Service (cross-platform, well documented, supports iOS/Android/web scenarios).
- Even on Windows 10, `RoamingSettings` data may not persist through Microsoft Store app updates; use `LocalSettings` for anything that must survive an app update.
- `LocalFolder` / `LocalCacheFolder` data has no general size restriction; the limits above apply only to settings (key/value pairs), not to files.
- `Microsoft.Windows.Storage.ApplicationData` (Windows App SDK) has no `RoamingFolder` / `RoamingSettings` members at all, reflecting this deprecation at the API surface level.

## Related

- [ApplicationDataContainer](./application-data-container.md)
- [ApplicationDataCompositeValue](./application-data-composite-value.md)
- [ApplicationData](./application-data.md)
- [Windows App SDK ApplicationData (Microsoft.Windows.Storage)](./windows-app-sdk-application-data.md)
