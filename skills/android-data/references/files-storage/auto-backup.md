# Auto Backup for Apps

Automatically backs up an app's shared preferences, internal storage files, and databases to the user's Google Drive (25 MB free quota, most-recent copy only) so data survives reinstall or device transfer, without writing a custom `BackupAgent`.

## Signature / Usage

```xml
<!-- AndroidManifest.xml -->
<application
    android:allowBackup="true"
    android:dataExtractionRules="@xml/data_extraction_rules"
    android:fullBackupContent="@xml/backup_rules">
    ...
</application>
```

```xml
<!-- res/xml/data_extraction_rules.xml (API 31+, Android 12+) -->
<data-extraction-rules>
    <cloud-backup>
        <include domain="sharedpref" path="."/>
        <exclude domain="sharedpref" path="device.xml"/>
    </cloud-backup>
    <device-transfer>
        <include domain="database" path="."/>
    </device-transfer>
</data-extraction-rules>
```

```xml
<!-- res/xml/backup_rules.xml (API 30 and lower) -->
<full-backup-content>
    <include domain="sharedpref" path="."/>
    <exclude domain="sharedpref" path="device.xml"/>
</full-backup-content>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:allowBackup` | manifest attribute | `true` | Master switch for participating in Auto Backup / key-value backup. |
| `android:dataExtractionRules` | manifest attribute | — | Points to the `<data-extraction-rules>` XML used on API 31+; supersedes `fullBackupContent` on those versions. |
| `android:fullBackupContent` | manifest attribute | — | Points to the `<full-backup-content>` XML used on API 30 and lower. |
| `domain` | attribute (`root` \| `file` \| `database` \| `sharedpref` \| `external` \| `device_*`) | — | Storage area an `<include>`/`<exclude>` rule applies to. |
| `<include>` / `<exclude>` | XML element | — | If any `<include>` is present, only matching paths are backed up; `<exclude>` removes paths and takes precedence. |
| `BackupAgent.onQuotaExceeded(backupDataBytes, quotaBytes)` | method (override) | — | Called when the app's data exceeds the 25 MB quota; no cloud backup occurs until data shrinks below it. |
| `BackupAgent.onRestoreFinished()` | method (override) | — | Notification fired after a restore completes. |
| `android:fullBackupOnly` + `android:backupAgent` | manifest attributes | — | Registers a custom `BackupAgent` subclass for file-based (non key-value) backup logic. |

## Notes

- Backed up automatically: shared preferences, `getFilesDir()` / `getDir()` files, `SQLiteOpenHelper`/database files, `getExternalFilesDir()` files. Never backed up: `getCacheDir()`, `getCodeCacheDir()`, `getNoBackupFilesDir()`.
- A custom `BackupAgent` (`onBackup`/`onRestore`/`onFullBackup`) is only needed for key-value backup or custom logic beyond what the XML rules express; most apps only need the manifest + XML configuration above.
- Backups run roughly nightly when the device is idle, on Wi-Fi, and ≥24 hours since the last backup — never guaranteed on a fixed schedule.
- The `android:allowBackup` attribute itself is also listed (without the Auto Backup XML rules) in the android-platform-core skill's `application` element reference.

## Related

- [App-specific storage](./app-specific-storage.md)
- [SharedPreferences](./shared-preferences.md)
- [Cache management and StorageManager](./cache-management.md)
