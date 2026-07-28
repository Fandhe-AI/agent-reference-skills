# alarms-broadcasts

| Name | Description | Path |
|------|-------------|------|
| AlarmManager | System service scheduling time-based operations via set/setExact/setInexactRepeating/setAlarmClock/cancel. | [alarmmanager.md](./alarmmanager.md) |
| Alarm types | RTC / RTC_WAKEUP / ELAPSED_REALTIME / ELAPSED_REALTIME_WAKEUP clock bases for alarms. | [alarm-types.md](./alarm-types.md) |
| Exact alarm permissions | SCHEDULE_EXACT_ALARM / USE_EXACT_ALARM / canScheduleExactAlarms and Android 12+ restrictions. | [exact-alarm-permissions.md](./exact-alarm-permissions.md) |
| PendingIntent | Token wrapping an Intent for later execution by the system; getBroadcast/getActivity/getService, FLAG_IMMUTABLE. | [pendingintent.md](./pendingintent.md) |
| Doze and App Standby | Power-management states that defer alarms/network/jobs; setAndAllowWhileIdle behavior. | [doze-app-standby.md](./doze-app-standby.md) |
| BroadcastReceiver | Component receiving system/app broadcasts; onReceive lifecycle and goAsync(). | [broadcastreceiver.md](./broadcastreceiver.md) |
| Registering broadcast receivers | Manifest-declared vs context-registered receivers; RECEIVER_EXPORTED/RECEIVER_NOT_EXPORTED. | [registering-receivers.md](./registering-receivers.md) |
| Implicit broadcast restrictions | Android 8+ limits on manifest-declared receivers for implicit broadcasts, and exceptions. | [implicit-broadcast-restrictions.md](./implicit-broadcast-restrictions.md) |
| Sending broadcasts | sendBroadcast / sendOrderedBroadcast, LocalBroadcastManager deprecation. | [sending-broadcasts.md](./sending-broadcasts.md) |
| Rescheduling alarms on BOOT_COMPLETED | Persisting alarms across reboot via a toggled ACTION_BOOT_COMPLETED receiver. | [boot-completed.md](./boot-completed.md) |
| JobScheduler | Platform job scheduling API (JobInfo/JobService) and when to prefer WorkManager. | [jobscheduler.md](./jobscheduler.md) |
