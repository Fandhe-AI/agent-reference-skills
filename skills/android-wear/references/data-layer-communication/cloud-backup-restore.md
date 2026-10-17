# Cloud backup and restore on Wear OS

On Wear OS 4 and higher, users can back up a watch to the cloud and restore it onto a new Wear OS device. Backup works like mobile app data backup, with Wear-specific automatic-backup conditions and size limits.

## Signature / Usage

The source page has no code listing; the Wear OS automatic backup conditions (all must be true) are:

```text
- The device is charging.
- The device is connected to a Wi-Fi network (required even if LTE-enabled).
- The device is signed into a Google Account.
- At least 24 hours have elapsed since the last backup.
```

To test with simulated cloud storage: enable backup in your app and follow "Control backup on Android 12 or higher" (the additional rule set for API level 29 or lower is not needed on Wear OS), connect the Wear OS 4+ device to your development machine over Wi-Fi, then follow the "test cloud backup and restore" guide.

## Options / Props

| Item | Detail |
| --- | --- |
| Backup location | Private folder in the user's Google Drive account |
| Size limit | 25 MB per app; a mobile app and its Wear OS app are stored separately and do not share the limit |
| DataStore | Data under Files > DataStore is backed up by default unless explicitly excluded |
| Idle requirement | Unlike other devices, Wear OS does not require the device to be idle |
| Automatically backed up | Tiles, complications and watch faces associated with the Wear OS app |

## Notes

- Partial backups are not supported: if total files and directories exceed 25 MB, no data from the Wear OS app is backed up.
- If you implement a custom `BackupAgent`, avoid calling the Data Layer inside the agent's methods; it may not work correctly there.
- Cloud backup/restore (restoring onto a new Wear OS device) differs from transferring Wear OS data to a new mobile device.
- Source: https://developer.android.com/training/wearables/data/cloud-backup-restore (page last updated 2026-10-14 UTC).

## Related

- [Transfer Wear OS data to a new mobile device](./transfer-to-new-mobile.md)
- [Data Layer API overview](./data-layer-overview.md)
