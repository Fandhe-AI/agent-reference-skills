# Application data storage locations (ApplicationData)

`ApplicationData` provides access to the per-user application data store: local, roaming, and temporary files and settings. Use `ApplicationData.Current` to get the app's instance, then read its folder properties to decide where to place files such as a SQLite database, cached downloads, or user documents.

## Signature / Usage

```csharp
Windows.Storage.StorageFolder localFolder = Windows.Storage.ApplicationData.Current.LocalFolder;
Windows.Storage.StorageFolder localCacheFolder = Windows.Storage.ApplicationData.Current.LocalCacheFolder;
Windows.Storage.StorageFolder temporaryFolder = Windows.Storage.ApplicationData.Current.TemporaryFolder;
Windows.Storage.ApplicationDataContainer localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;

// Example: database file path under LocalFolder
string dbPath = System.IO.Path.Combine(localFolder.Path, "app.db");
```

## Options / Props

| Property | Backed up / roams | Persists across app updates | Typical use |
|----------|--------------------|------------------------------|-------------|
| `LocalFolder` | Backed up to the cloud as part of device backup | Yes | User data that would be lost without backup (drawings, exercise history, SQLite database files, shopping lists). |
| `LocalCacheFolder` | Not backed up | Yes | Generated content needed across sessions but not worth backing up: caches, logs, auth tokens. |
| `TemporaryFolder` | Not backed up, not roamed | No — may be cleared by System Maintenance or Disk Cleanup at any time | Short-lived, easily-regenerated data during a single app session. |
| `RoamingFolder` / `RoamingSettings` | Roams across the user's devices | Limited — may not survive Microsoft Store updates | Small user preferences/customizations only. Deprecated as of Windows 11; prefer a cloud service (e.g. Azure App Service) for cross-device sync. |
| `LocalSettings` | Local, not roamed | Yes (recommended for settings that must survive updates) | Key/value app settings, including `ApplicationDataCompositeValue` for atomic composite settings. |
| `SharedLocalFolder` | Local | Yes | Persistent across all app users on the device; needs extra setup/permissions. |

## Notes

- `ApplicationData` APIs are designed for packaged apps; unpackaged apps should use direct file I/O or the registry instead.
- There is no general size restriction on `LocalFolder`/`LocalCacheFolder` data — use `LocalFolder` for large data sets that must survive reinstall/device switch, and `LocalCacheFolder` for large regenerable data that should not bloat cloud backups.
- SQLite database files should typically live under `LocalFolder` (durable user data) unless the database is purely a rebuildable cache, in which case `LocalCacheFolder` is more appropriate.
- App data is deleted entirely when the app is uninstalled — never use it for irreplaceable user data; prefer user libraries or a synced storage service for that.

## Related

- [SQLite data access (Microsoft.Data.Sqlite)](./sqlite-data-access.md)
- [Large data handling and caching strategy](./caching-strategy.md)
