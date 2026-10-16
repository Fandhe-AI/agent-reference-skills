# Call style notifications (NotificationCompat.CallStyle)

On Android 12 (API level 31) and later, the `CallStyle` template distinguishes incoming, ongoing, and screening call notifications from other notifications, with caller information and required actions.

## Signature / Usage

```kotlin
// Create a new call, setting incoming caller.
val incomingCaller = Person.Builder()
    .setName("Jane Doe")
    .setImportant(true)
    .build()
```

Incoming call:

```kotlin
// For demonstrative purposes only, should use a well-defined Intents.
val contentIntent =
    PendingIntent.getActivity(context, 0, Intent(), PendingIntent.FLAG_IMMUTABLE)
val declineIntent =
    PendingIntent.getActivity(context, 0, Intent(), PendingIntent.FLAG_IMMUTABLE)
val hangupIntent = PendingIntent.getActivity(context, 0, Intent(), PendingIntent.FLAG_IMMUTABLE)
val answerIntent = PendingIntent.getActivity(context, 0, Intent(), PendingIntent.FLAG_IMMUTABLE)
// Create a call style notification for an incoming call.
val builderForIncomingCall = NotificationCompat.Builder(context, CHANNEL_ID)
    .setContentIntent(contentIntent)
    .setSmallIcon(R.drawable.ic_logo)
    .setStyle(
        NotificationCompat.CallStyle.forIncomingCall(incomingCaller, declineIntent, answerIntent))
    .addPerson(incomingCaller)
```

Ongoing call:

```kotlin
val builderForOngoingCall = NotificationCompat.Builder(context, CHANNEL_ID)
    .setContentIntent(contentIntent)
    .setSmallIcon(R.drawable.ic_logo)
    .setStyle(
        NotificationCompat.CallStyle.forOngoingCall(callerAtOtherEnd, hangupIntent))
    .addPerson(caller)
```

Screening a call:

```kotlin
val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setContentIntent(contentIntent)
    .setSmallIcon(R.drawable.ic_logo)
    .setStyle(
        NotificationCompat.CallStyle.forScreeningCall(caller, hangupIntent, answerIntent))
    .addPerson(caller)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CallStyle.forIncomingCall(person, declineIntent, answerIntent)` | factory | Incoming call; Answer and Decline actions. |
| `CallStyle.forOngoingCall(person, hangupIntent)` | factory | Ongoing call; Hang up action. |
| `CallStyle.forScreeningCall(person, hangupIntent, answerIntent)` | factory | Call screening; Answer and Hang up actions. |

## Notes

- Actions render as buttons with system-provided icons and text; manual labeling of the buttons is not supported.
- Incoming and ongoing calls are high-priority events and receive top priority in the notification shade, which also lets the system forward them to other devices.
- The action intents are `PendingIntent` tokens managed by the system; handing one to another app grants permission to perform that operation (e.g. answer or decline) even if the creating app is not running.
- Starting in Android 14 (API level 34), call notifications can be non-dismissible: use `CallStyle` with `Notification.FLAG_ONGOING_EVENT` via `Notification.Builder#setOngoing(true)`.
- Compatibility for API 30 and earlier: associate the notification with a foreground service to get the high rank given on API 31+, or approximate it by marking the notification colorized with `setColorized()`.
- Use the Telecom APIs together with `CallStyle` notifications (see the Telecom framework overview: https://developer.android.com/develop/connectivity/telecom).
- The snippet's `Intent()` / request code `0` is for demonstration only (the official code comment says to use well-defined Intents). `PendingIntent`s with the same request code and `Intent.filterEquals`-equal intents resolve to the same token, so in a real app give answer / decline / hangup distinct explicit intents (different action, or different request code) targeting a `BroadcastReceiver` or `Service`. (The identity rule is general PendingIntent behavior, not stated on the call-style page.)
- Source: https://developer.android.com/develop/ui/compose/notifications/call-style (fetched 2026-10-17)

## Related

- [notification-builder](./notification-builder.md)
- [full-screen-intent](./full-screen-intent.md)
- [bubbles](./bubbles.md)
