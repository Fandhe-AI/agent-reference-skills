# Notification progress indicators

Shows an in-notification progress bar. The classic `NotificationCompat.Builder.setProgress()` method covers determinate/indeterminate bars on all supported API levels; Android 16 (API level 36) adds `Notification.ProgressStyle` for a richer, journey-tracking presentation.

## Signature / Usage

```kotlin
// Classic determinate/indeterminate progress
NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_logo)
    .setContentTitle("Download")
    .setContentText("File downloading...")
    .setProgress(100, 65, false) // max, progress, indeterminate
    .build()

// Remove the progress bar once finished
builder.setProgress(0, 0, false)
```

```kotlin
// Android 16+ ProgressStyle (journey-tracking template)
val ps = Notification.ProgressStyle()
    .setStyledByProgress(false)
    .setProgress(456)
    .setProgressSegments(
        listOf(
            Notification.ProgressStyle.Segment(41).setColor(Color.BLACK),
            Notification.ProgressStyle.Segment(552).setColor(Color.YELLOW)
        )
    )
    .setProgressPoints(
        listOf(Notification.ProgressStyle.Point(60).setColor(Color.RED))
    )
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setProgress(max, progress, indeterminate)` | `(Int, Int, Boolean)` | — | `max`/`progress` define a determinate bar (commonly `max = 100`, `progress` as percent complete); `indeterminate = true` shows a continuous animation and ignores the first two values. |
| `ProgressStyle#setStyledByProgress(Boolean)` | `Boolean` | — | Whether to render styling driven by the progress value. |
| `ProgressStyle#setProgress(Int)` | `Int` | — | Current position along the journey. |
| `ProgressStyle#setProgressSegments(List<Segment>)` | `List<Segment>` | — | Colored segments representing journey states/durations. |
| `ProgressStyle#setProgressPoints(List<Point>)` | `List<Point>` | — | Milestone markers along the progress track. |
| `ProgressStyle#setProgressTrackerIcon(Icon)` | `Icon` | — | Icon that moves along the track to represent current position. |

## Notes

- Call `setProgress(0, 0, false)` to remove the progress bar once an operation completes, and update the notification text accordingly.
- `ProgressStyle` (`Notification.ProgressStyle`) is an **Android 16 (API level 36)+** addition intended for user-initiated journeys (e.g. rideshare, delivery tracking) with elevated visibility in system surfaces; it is not part of `androidx.core` `NotificationCompat` at the time of writing.
- Artifact: `androidx.core:core` for `NotificationCompat.Builder.setProgress()`.

## Related

- [notification-builder](./notification-builder.md)
- [expanded-notifications](./expanded-notifications.md)
