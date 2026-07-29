# Metric style notifications

`Notification.MetricStyle` presents up to three labeled numeric metrics (with an optional unit each) plus up to three action buttons, without body/context text. Introduced in Android 17 for health/fitness, timer, and travel use cases, and as one of the styles supported for Live Updates.

## Signature / Usage

```kotlin
val notification = Notification.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_run)
    .setContentTitle("Run in progress")
    .setSubText("Outdoor run")
    .setStyle(Notification.MetricStyle() /* .addMetric(...) per-metric, see Notes */)
    .addAction(pauseAction)
    .build()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Notification.Metric` | class | Base type for a single metric; requires a label, a value, and an optional unit. |
| `Notification.Metric.FixedFloat` / `FixedInt` | class | Metric backed by a static float/int value. |
| `Notification.Metric.FixedTime` / `TimeDifference` | class | Metric backed by a fixed timestamp or an elapsed-time-since-start calculation. |
| `Notification.Metric.MetricValue` | class | Common value type shared by the fixed metric subclasses. |
| `setContentTitle(CharSequence)` | method | Optional when used as a Live Update — the first metric's value is shown in place of a title if omitted, falling back further to the app name. |
| `setSubText(CharSequence)` | method | Shown in the header line rather than wrapping to a new line. |
| `addAction(Notification.Action)` | method | Up to 3 action buttons; rendered as pills when the notification is also a Live Update. |

## Notes

- Supports at most 3 metrics and 3 action buttons; does **not** show separate context/body text — all information is conveyed through the metric labels/values and the optional subtext.
- **Expanded state**: each metric gets equal horizontal space, with its unit appended to the label. **Collapsed state**: metrics are concatenated onto a single second line, omitting units; the 2nd and 3rd metrics are shown only if they fit in full.
- As a Live Update, `setContentTitle()` is not required (the metric value substitutes for it), and action buttons render as pills instead of standard buttons.
- No API level number is published for this feature at the time of writing — the official guide states only "Android 17".
- The exact method used to attach a `Metric` to `MetricStyle` (and the constructor signatures of `FixedFloat` / `FixedInt` / `FixedTime` / `TimeDifference`) is not shown in the rendered guide; the Android API reference has dedicated pages for `Notification.MetricStyle` and each `Notification.Metric` subclass (and matching `androidx.core.app.NotificationCompat.Metric.*` pages, suggesting a Compat counterpart exists), but their bodies could not be retrieved in full at time of writing — confirm exact signatures against the reference site or IDE autocomplete before shipping code against this API.

## Related

- [notification-progress](./notification-progress.md)
- [live-update](./live-update.md)
- [expanded-notifications](./expanded-notifications.md)
