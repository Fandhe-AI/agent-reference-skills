# Tasks and back stack

A task is a collection of activities arranged in a LIFO back stack representing a user's workflow; `launchMode`, intent flags, and `taskAffinity` control how new activities associate with tasks.

## Signature / Usage

```xml
<activity
    android:name=".MyActivity"
    android:launchMode="singleTask">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

```kotlin
val intent = Intent(this, MyActivity::class.java)
intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
startActivity(intent)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:launchMode="standard"` | manifest attribute | default | A new instance is created for every intent; multiple instances allowed, possibly across different tasks. |
| `android:launchMode="singleTop"` | manifest attribute | — | If an existing instance is already at the top of the stack, it receives the intent via `onNewIntent()` instead of a new instance being created. |
| `android:launchMode="singleTask"` | manifest attribute | — | Created at the root of a new task, or reused from an existing task with the same affinity; activities above it in that task are destroyed and it receives the intent via `onNewIntent()`. |
| `android:launchMode="singleInstance"` | manifest attribute | — | Like `singleTask`, but never shares its task with any other activity. |
| `android:launchMode="singleInstancePerTask"` | manifest attribute | — | Can only be the root activity of a task; can have multiple instances across different tasks when combined with `FLAG_ACTIVITY_MULTIPLE_TASK` / `FLAG_ACTIVITY_NEW_DOCUMENT`. |
| `android:taskAffinity` | manifest attribute | app package name | Which task an activity "prefers" to belong to; used with `FLAG_ACTIVITY_NEW_TASK` to find or create a matching task. Combine with `android:allowTaskReparenting` to let an activity move to its affinity's task. |
| `FLAG_ACTIVITY_NEW_TASK` | Intent flag | — | Launches the activity in a new task (or an existing one with matching affinity); equivalent to `singleTask`. |
| `FLAG_ACTIVITY_SINGLE_TOP` | Intent flag | — | Routes to `onNewIntent()` if the activity is already at the top of the stack; equivalent to `singleTop`. |
| `FLAG_ACTIVITY_CLEAR_TOP` | Intent flag | — | Destroys all activities above the target activity in the current task; the target receives the intent via `onNewIntent()`. |
| `android:documentLaunchMode` | manifest attribute | `none` | `intoExisting` / `always` / `none` / `never` — controls whether the activity creates a new task entry in Recents per document. |
| `android:excludeFromRecents` | manifest attribute | `false` | Excludes the task from the Recents screen entirely. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Activities are never rearranged within a task's back stack — only pushed and popped. Pressing Back destroys the current activity and resumes the previous one; on Android 12+, root launcher activities move to the background instead of being destroyed.
- `alwaysRetainTaskState`, `clearTaskOnLaunch`, and `finishOnTaskLaunch` (all `<activity>` attributes on the root activity) further control whether a task's back stack survives being reopened.
- The Recents (Overview) screen lists recent tasks; `FLAG_ACTIVITY_NEW_DOCUMENT` and `FLAG_ACTIVITY_MULTIPLE_TASK` create separate Recents entries for a document-centric UI, and `finishAndRemoveTask()` removes the current task from Recents.
- Modifying default task/back-stack behavior can confuse users — use `singleTask` / `singleInstance` primarily for root launcher activities and test thoroughly.

## Related

- [Activity](./activity.md)
- [Intent](./intent.md)
- [Activity lifecycle](./activity-lifecycle.md)
