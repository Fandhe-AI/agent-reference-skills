---
source: https://docs.expo.dev/eas-update/download-updates/
---

# Downloading updates

Strategies for downloading and launching updates so users adopt the latest version quickly without slow loading screens.

## Signature / Usage

Check for updates in the foreground, download, and reload:

```ts
const update = await Updates.checkForUpdateAsync();
if (update.isAvailable) {
  await Updates.fetchUpdateAsync();
  await Updates.reloadAsync();
}
```

### Strategies

The strategies are not mutually exclusive.

- **Default (asynchronous on startup)**: the app checks for an update on cold boot and downloads it if available, without blocking app load. The user loads the update only on a later cold boot. Safe, but adoption is slower. Always blocking startup until the latest update downloads is not recommended because of the poor user experience. Disable the default by setting `checkAutomatically` to `NEVER` in the `updates` configuration.
- **Foreground**: `Updates.checkForUpdateAsync()` resolves to an `UpdateCheckResult` with `isAvailable` and `manifest`; then `Updates.fetchUpdateAsync()` and `Updates.reloadAsync()`. The `useUpdates()` hook monitors library state from a component. Check when the app is foregrounded or at an interval, or at launch with a custom loading screen.
- **Background**: use `expo-background-task` to run the same check and fetch methods inside a background task. Register the task at startup by calling `setupBackgroundUpdates` in the top-level component:

Adapted (not verbatim): returns `BackgroundTaskResult` as required by the expo-background-task reference; the official guide returns `Promise.resolve()`.

```ts
import * as TaskManager from 'expo-task-manager';
import * as BackgroundTask from 'expo-background-task';
import * as Updates from 'expo-updates';

const BACKGROUND_TASK_NAME = 'task-run-expo-update';

export const setupBackgroundUpdates = async () => {
  TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error('Background update failed', error);
      return BackgroundTask.BackgroundTaskResult.Failed;
    }
    return BackgroundTask.BackgroundTaskResult.Success;
  });

  await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_NAME, {
    minimumInterval: 60 * 24,
  });
};

setupBackgroundUpdates();
```

- **Critical/mandatory updates**: no first-class support in `expo-updates`; implement your own logic (the `expo/UpdatesAPIDemo` repository shows one approach).
- **Client-side control**: override the update URL and request headers at runtime with `Updates.setUpdateURLAndRequestHeadersOverride()` (see [Override update configuration at runtime](./override.md)).
- **Monitoring adoption**: an update's details page shows the number of users who ran it and the number of failed installs; the deployments page shows a table and chart per channel and runtime version.

## Notes

- All information applies only to release builds and debug builds with `EX_UPDATES_NATIVE_DEBUG` enabled.
- Support for calling `Updates.reloadAsync()` while the app is backgrounded is experimental; monitor for crashes when first enabled. Downloading an update in the background is safe. Unless you persist and restore state, the user will experience a cold boot on reopening.
- The background task example is adapted: the official guide returns `Promise.resolve()`, while the expo-background-task reference requires tasks to return `BackgroundTaskResult.Success` or `Failed`.
- Source modificationDate: July 21, 2026 (fetched 2026-10-17).

## Related

- [Updates](./updates.md)
- [Override update configuration at runtime](./override.md)
- [Bundle diffing for EAS Update](./bundle-diffing.md)
- [Deploy updates](./deployment.md)
