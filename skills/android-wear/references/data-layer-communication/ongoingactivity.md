# OngoingActivity

Pairs a long-running foreground notification (workout, timer, navigation) with a compact one-tap surface on the watch face and in the launcher's Recents section, so the user can jump back into the task without hunting for the notification. Required by the Wear OS App Quality guidelines for activities lasting more than a minute or that the user is likely to navigate away from.

## Signature / Usage

```kotlin
// build.gradle
dependencies {
    implementation "androidx.wear:wear-ongoing:1.1.0"
    implementation "androidx.core:core:1.19.0"
}
```

```kotlin
import androidx.wear.ongoing.OngoingActivity
import androidx.wear.ongoing.Status
import androidx.core.app.NotificationCompat

val notificationBuilder = NotificationCompat.Builder(this, CHANNEL_ID)
    .setContentTitle("Run")
    .setSmallIcon(R.drawable.animated_walk)
    .setCategory(NotificationCompat.CATEGORY_WORKOUT)
    .setContentIntent(pendingIntent)
    .setOngoing(true) // Important!

val ongoingActivity = OngoingActivity.Builder(applicationContext, NOTIFICATION_ID, notificationBuilder)
    // Icon shown on the watch face in active (interactive) mode.
    .setAnimatedIcon(R.drawable.animated_walk)
    // Icon shown on the watch face in ambient (always-on) mode.
    .setStaticIcon(R.drawable.ic_walk)
    // Tap target to bring the user back into the app.
    .setTouchIntent(pendingIntent)
    .build()

// Modifies notificationBuilder in place to attach the ongoing activity data.
ongoingActivity.apply(applicationContext)
startForeground(NOTIFICATION_ID, notificationBuilder.build())
```

Attaching dynamic status text (e.g. an elapsed-time stopwatch) shown in Recents:

```kotlin
import android.os.SystemClock

val status = Status.Builder()
    .addTemplate("#type# for #time#")
    .addPart("type", Status.TextPart("Run"))
    .addPart("time", Status.StopwatchPart(SystemClock.elapsedRealtime()))
    .build()

val ongoingActivity = OngoingActivity.Builder(applicationContext, NOTIFICATION_ID, notificationBuilder)
    .setAnimatedIcon(R.drawable.animated_walk)
    .setStaticIcon(R.drawable.ic_walk)
    .setTouchIntent(pendingIntent)
    .setStatus(status)
    .build()
```

Updating or recovering a reference later, and stopping:

```kotlin
ongoingActivity.update(context, newStatus)

// If the original OngoingActivity instance is no longer held (e.g. new process):
OngoingActivity.recoverOngoingActivity(context)?.update(context, newStatus)

// Stopping is just cancelling the underlying notification.
NotificationManagerCompat.from(context).cancel(NOTIFICATION_ID)
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `OngoingActivity.Builder(context, notificationId, notificationBuilder)` | — | Starts building an ongoing activity bound to a `NotificationCompat.Builder`. |
| `.setAnimatedIcon(resId)` | `Builder` | Icon for the interactive watch face state. |
| `.setStaticIcon(resId)` | `Builder` (required) | Black/white vector icon, transparent background, for ambient mode. |
| `.setTouchIntent(pendingIntent)` | `Builder` (required) | `PendingIntent` fired when the user taps the watch face/Recents surface. |
| `.setStatus(status: Status)` | `Builder` | Templated live status text (`Status.TextPart`, `Status.StopwatchPart`, `Status.TimerPart`). |
| `.build()` | `OngoingActivity` | Finalizes the builder. |
| `.apply(context)` | `Unit` | Attaches the ongoing-activity extras to the bound `notificationBuilder`. |
| `.update(context, status)` | `Unit` | Pushes an updated `Status` to an already-posted ongoing activity. |
| `OngoingActivity.recoverOngoingActivity(context)` | `OngoingActivity?` | Reconstructs a reference to the currently active ongoing activity when the original instance isn't available. |

## Notes

- A static icon and a touch intent are both required; the notification itself must call `setOngoing(true)` and typically be posted via `startForeground`.
- Package: `androidx.wear.ongoing` (artifact `androidx.wear:wear-ongoing`) — separate from `androidx.wear.compose.*`.
