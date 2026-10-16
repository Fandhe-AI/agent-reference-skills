# Choose the right API to keep the device awake

Decision guide for keeping an Android device awake: use the most lightweight approach possible, and reach for a wake lock only when no other API does what the app needs.

## Signature / Usage

APIs named by the guide that keep the device awake without an app-held wake lock:

```text
ExoPlayer.setWakeMode()     // Media3 ExoPlayer sets the wake lock for you
Sensor.isWakeUpSensor       // check whether a sensor is a wake-up sensor (via SensorManager)
WorkManager / JobScheduler / DownloadManager   // system or library acquires a wake lock attributed to your app
```

## Notes

- Decision flow:
  - Needs the screen on: see [Keep the screen on](./keep-screen-on.md). A special-purpose API may fit (e.g. the Android telecom framework for a phone-call UI keeps the screen on when needed); otherwise use `keepScreenOn`.
  - No foreground service running: no need to keep the device awake. While the user interacts with the app the device stays awake; otherwise let it suspend, and use background tasks documentation for work that must finish while the user is away.
  - Foreground service running: first confirm a foreground service is really needed; a special-purpose API may replace it (e.g. the geofencing API instead of a `location` foreground service).
  - If suspend during the foreground service with the screen off would not hurt the user experience (e.g. updating notifications), do not use a wake lock; the action resumes once the user engages with the device.
  - If suspend would be detrimental, a wake lock may be needed, but first check whether an API or action already declares a wake lock on your behalf.
- Actions that keep the device awake without your own wake lock:
  - Playing audio: the audio system sets and manages a wake lock.
  - Task scheduling APIs or libraries such as WorkManager, `JobScheduler`, `DownloadManager`: the system or library acquires a wake lock attributed to your app.
  - Media3 ExoPlayer: use `ExoPlayer.setWakeMode()`.
  - Wake-up sensors: use `SensorManager`; check with `Sensor.isWakeUpSensor`.
  - Scheduling an alarm: the device wakes when the alarm goes off, even if the app is not running. This applies only to the wake-up alarm types (`RTC_WAKEUP` / `ELAPSED_REALTIME_WAKEUP`); `RTC` and `ELAPSED_REALTIME` alarms do not wake the device (see [Alarm types](./alarm-types.md)).
- Wake locks can quickly drain the battery; use one only if there is no other option, and release it as soon as possible.
- Source: https://developer.android.com/develop/background-work/background-tasks/awake

## Related

- [WakeLock and PowerManager](./wakelock.md)
- [Identify wake lock use cases](./wakelock-identify-use-cases.md)
- [Keep the screen on](./keep-screen-on.md)
- [AlarmManager](./alarmmanager.md)
- [Alarm types](./alarm-types.md)
