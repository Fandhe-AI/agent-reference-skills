---
source: https://docs.expo.dev/versions/v58.0.0/sdk/task-manager/
---

# TaskManager

`expo-task-manager` manages long-running tasks, in particular tasks that can run while the app is in the background. Other Expo SDK libraries (Location, BackgroundTask, BackgroundFetch, Notifications) use it under the hood.

## Signature / Usage

```sh
npx expo install expo-task-manager
```

```jsx
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

// Define the task at module scope so the background runtime can find it.
// This needs to be called in the global scope, not in a React component.
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    // do something with the locations captured in the background
  }
});

await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
  accuracy: Location.Accuracy.Balanced,
});
```

## Options / Props

| Method | Returns | Description |
| --- | --- | --- |
| `TaskManager.defineTask(taskName, taskExecutor)` | `void` | Defines the task function. Must be called in the global scope of the JavaScript bundle, not inside a React component. `taskName` must match the name used when registering the task; `taskExecutor` is a `TaskManagerTaskExecutor<T>`. |
| `TaskManager.getRegisteredTasksAsync()` | `Promise<TaskManagerTask[]>` | Provides information about tasks registered in the app. |
| `TaskManager.getTaskOptionsAsync(taskName)` | `Promise<TaskOptions>` | Retrieves the `options` passed to the function that registered the task (e.g. `Location.startLocationUpdatesAsync`); `null` if the task couldn't be found. |
| `TaskManager.isAvailableAsync()` | `Promise<boolean>` | Whether the `TaskManager` API can be used in this app. With Expo Go, `TaskManager` is not available on Android and does not support background execution on iOS; use a development build. On web it always returns `false`. |
| `TaskManager.isTaskDefined(taskName)` | `boolean` | Checks whether the task is already defined. |
| `TaskManager.isTaskRegisteredAsync(taskName)` | `Promise<boolean>` | Whether the task is registered. Registered tasks are stored in persistent storage and preserved between sessions. |
| `TaskManager.unregisterAllTasksAsync()` | `Promise<void>` | Unregisters all tasks registered for the running app (e.g. on user sign-out). |
| `TaskManager.unregisterTaskAsync(taskName)` | `Promise<void>` | Unregisters the task so the app no longer receives updates for it. Using methods specialized by the module that registered the task is recommended, e.g. `Location.stopLocationUpdatesAsync`. |

All methods are supported on Android, iOS, tvOS.

### TaskManagerTaskBody

| Property | Type | Description |
| --- | --- | --- |
| `data` | `T` | Data passed to the task executor. Its properties depend on the type of the task. |
| `error` | `TaskManagerError \| null` | Error object if the task failed, otherwise `null`. |
| `executionInfo` | `TaskManagerTaskBodyExecutionInfo` | Additional details containing the unique ID of the task event and the name of the task. |

### TaskManagerTaskBodyExecutionInfo

| Property | Type | Description |
| --- | --- | --- |
| `appState` (optional) | `'active' \| 'background' \| 'inactive'` | iOS only. State of the application. |
| `eventId` | `string` | Unique ID of the task event. |
| `taskName` | `string` | Name of the task. |

### TaskManagerError

| Property | Type | Description |
| --- | --- | --- |
| `code` | `string \| number` | - |
| `message` | `string` | - |

### TaskManagerTask

| Property | Type | Description |
| --- | --- | --- |
| `options` | `any` | The `options` that the task was registered with. |
| `taskName` | `string` | Name that the task is registered with. |
| `taskType` | `string` | Type of the task, depending on how it was registered. Standard values emitted by Expo SDK libraries are `'location'` and `'geofencing'` (`expo-location`), `'backgroundFetch'` (`expo-background-fetch`), `'expo-background-task'` on Android or `'backgroundTask'` on iOS (`expo-background-task`), and `'remote-notification'` (`expo-notifications`). User-registered tasks may have any string value. |

### TaskManagerTaskExecutor(body)

Type of a task executor: a function that handles the task. Parameter `body: TaskManagerTaskBody<T>`; returns `Promise<any>`.

## Notes

- Platforms (frontmatter): android, ios, tvos, expo-go. Source code: `https://github.com/expo/expo/tree/sdk-58/packages/expo-task-manager`. Page modificationDate: September 15, 2026.
- `TaskManager.defineTask` must be called at module scope, not inside a React component; when the app is launched in the background no components are mounted. In Expo Router projects, move it to a separate file (for example `tasks.ts`) and import that file at the top of the root layout (`app/_layout.tsx`) so the task is registered before any navigation runs.
- Standalone apps need extra configuration: on iOS each background feature requires a special key in the `UIBackgroundModes` array in Info.plist. See the reference for each library that uses `TaskManager`.
- `TaskManager` can be tested in Expo Go, but check each library's documentation to confirm whether it supports Expo Go.

## Related

- [BackgroundTask](./background-task.md)
- [Notifications](./notifications.md)
