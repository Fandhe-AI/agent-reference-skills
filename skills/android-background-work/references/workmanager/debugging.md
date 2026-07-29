# Debug WorkManager / Background Task Inspector

Android Studio's Background Task Inspector lists, cancels, and graphs `WorkManager` workers (and Jobs/Alarms/Wakelocks) running on a connected device or emulator.

## Signature / Usage

```text
1. Run the app on an emulator/device running API 26+, with androidx.work:work-runtime 2.5.0+.
2. View > Tool Windows > App Inspection.
3. Select the "Background Task Inspector" tab, then the running app process.
4. Enqueued/running workers appear automatically in the table.
```

## Options / Props

| Name | Description |
|------|-------------|
| Table view | Lists every worker's class name, current status, start time, and retry count. |
| Work Details panel | Click a worker to see its class/package/tags/UUID, constraints, state, and (for chains) its `WorkContinuation` position with clickable links to related UUIDs. |
| Graph view | Visualizes dependency relationships between chained workers; toggle back to "Show List View". |
| Cancel Selected Worker | Cancels the selected running or enqueued worker directly from the inspector. |
| Jobs / Alarms / Wakelocks tabs | The same inspector surfaces `JobScheduler` jobs, `AlarmManager` alarms, and wake locks under their own headings, alongside WorkManager workers. |

## Notes

- Requires API level 26+ and WorkManager 2.5.0+; there is no documented `adb`/`dumpsys` command as a substitute — the inspector is the primary supported tool.
- This inspector superseded the deprecated Background Task Inspector integration in the old Energy Profiler.
- Package/tooling: Android Studio App Inspection (`View > Tool Windows > App Inspection`), not an `androidx.work` API.

## Related

- [WorkInfo and monitoring](./workinfo.md)
- [Testing WorkManager](./testing.md)
