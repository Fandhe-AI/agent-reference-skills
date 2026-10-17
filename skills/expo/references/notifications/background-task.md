---
source: https://docs.expo.dev/versions/v58.0.0/sdk/background-task/
---

# BackgroundTask

`expo-background-task` runs deferrable background tasks in a way that optimizes battery and power consumption. It uses `WorkManager` on Android and `BGTaskScheduler` on iOS, and runs JavaScript tasks through `expo-task-manager`.

## Signature / Usage

```sh
npx expo install expo-background-task
```

```tsx
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_TASK_IDENTIFIER = 'background-task';

// Must be called in the global scope, not in a React component.
TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
  try {
    const now = Date.now();
    console.log(`Got background task call at date: ${new Date(now).toISOString()}`);
  } catch (error) {
    console.error('Failed to execute the background task:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
  return BackgroundTask.BackgroundTaskResult.Success;
});

// Can be called inside React components.
async function registerBackgroundTaskAsync() {
  return BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

async function unregisterBackgroundTaskAsync() {
  return BackgroundTask.unregisterTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}
```

### Configuration (iOS Info.plist)

To run background tasks on iOS, add the `processing` value to the `UIBackgroundModes` array and the `BGTaskSchedulerPermittedIdentifiers` array with the `com.expo.modules.backgroundtask.processing` identifier. With CNG, prebuild applies both automatically. Without CNG:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>processing</string>
</array>
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
  <string>com.expo.modules.backgroundtask.processing</string>
</array>
```

## Options / Props

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `BackgroundTask.getStatusAsync()` | Android, iOS, tvOS | `Promise<BackgroundTaskStatus>` | Returns the status of the Background Task API. On web it always returns `BackgroundTaskStatus.Restricted`, on native platforms `BackgroundTaskStatus.Available`. |
| `BackgroundTask.registerTaskAsync(taskName, options)` | Android, iOS, tvOS | `Promise<void>` | Registers a background task with the given name. The task must be defined first with `TaskManager.defineTask`. Registered tasks are saved in persistent storage and restored once the app is initialized. |
| `BackgroundTask.triggerTaskWorkerForTestingAsync()` | Android, iOS, tvOS | `Promise<boolean>` | Triggers running the background tasks. Only works for apps built in debug mode (development mode only, not production builds). |
| `BackgroundTask.unregisterTaskAsync(taskName)` | Android, iOS, tvOS | `Promise<void>` | Unregisters a background task so the app no longer executes it. |
| `BackgroundTask.addExpirationListener(listener)` | iOS | `{ remove: () => void }` | Adds a listener (`() => void`) called when the background executor expires. Use it to clean up resources or save state. When the expiry handler is called, the main task runner is rescheduled automatically. |

### registerTaskAsync parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `taskName` | `string` | Name of the task to register. The task needs to be defined first with `TaskManager.defineTask`. |
| `options` (optional) | `BackgroundTaskOptions` | An object containing the background task options. Default: `{}` |

### BackgroundTaskOptions

| Property | Type | Description |
| --- | --- | --- |
| `minimumInterval` (optional) | `number` | Inexact interval in minutes between subsequent repeats of the background tasks. The final interval may differ from the specified one to minimize wakeups and battery usage. Defaults to once every 12 hours (the minimum interval is 15 minutes). The system treats the value as a minimum delay; on iOS, short intervals are often ignored and the system typically runs background tasks during specific windows, such as overnight. |

### Enums

| Enum | Members |
| --- | --- |
| `BackgroundTaskResult` | `Success = 1` (task finished successfully), `Failed = 2` (task failed) |
| `BackgroundTaskStatus` | `Restricted = 1` (background tasks are unavailable), `Available = 2` (background tasks are available for the app) |

## Notes

- Platforms (frontmatter): android, ios, tvos, expo-go. Source code: `https://github.com/expo/expo/tree/sdk-58/packages/expo-background-task`. Page modificationDate: September 15, 2026.
- A task may not run immediately after it is scheduled. It runs only if the battery has enough charge (or the device is plugged in) and the network is available.
- Android: the `WorkManager` minimum interval is 15 minutes. iOS: `BGTaskScheduler` decides the best time to launch the task based on battery level, network availability, and user usage patterns.
- Background tasks stop if the user kills the app and resume when the app is restarted. If the system stops the app or the device reboots, tasks resume and the app is restarted. On Android, removing an app from the recent apps list doesn't completely stop it, whereas on iOS swiping it away in the app switcher fully terminates it; Android behavior varies by device vendor.
- Known limitation (iOS): the Background Tasks API is unavailable on iOS simulators; use a physical device.
- Multiple background tasks: Expo Background Task uses a single worker on both platforms. Multiple JavaScript background tasks can be defined, but they all run through this single worker. The last registered background task determines the minimum interval.
- Debugging on Android: `adb shell dumpsys jobscheduler | grep -A 40 -m 1 -E "JOB #.* <package-name>"` inspects scheduled jobs; `adb shell cmd jobscheduler run -f <package-name> <JOB_ID>` forces a job to run (move the app to the background first).
- Debugging on iOS: use `triggerTaskWorkerForTestingAsync` in debug mode. The Xcode console error `No task request with identifier com.expo.modules.backgroundtask.processing has been scheduled` means prebuild must be run to apply the configuration, and that a background task must be defined and registered.
- Distance line: this is Expo's `expo-background-task` module; for APNs / FCM push delivery see `apple-app-services` and `android-platform-core`. Android `WorkManager` itself is covered by `android-background-work`.

## Related

- [TaskManager](./task-manager.md)
- [Notifications](./notifications.md)
