---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-clock
---

# Clock domain

Make your clock app's actions available to Apple Intelligence and Siri by adopting schemas for common alarm and timer actions.

## Signature / Usage

```swift
@AppIntent(schema: .clock.createAlarm)
struct CreateAlarmIntent {
    var time: DateComponents
    var label: String?
    var recurrenceDays: Calendar.RecurrenceRule?
    var canSnooze: Bool

    func perform() async throws -> some ReturnsValue<<#AlarmEntity#>> {
        <#code#>
    }
}
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `createAlarm` | Intent (`AppSchema.ClockIntent`) | Creates an alarm. | "Set an alarm." / "Wake me up at 7 AM." |
| `updateAlarm` | Intent (`AppSchema.ClockIntent`) | Updates the alarm, for example, turn on / off the alarm, change the label, time, or repeating schedule. | "Change my alarm." / "Change the 7 AM alarm to 8 AM." |
| `snoozeAlarm` | Intent (`AppSchema.ClockIntent`) | Snoozes the firing alarm. | "Snooze." / "Give me 5 more minutes." |
| `dismissAlarm` | Intent (`AppSchema.ClockIntent`) | Dismisses a firing or snoozed alarm. | "Dismiss the alarm." / "Stop the alarm." |
| `deleteAlarm` | Intent (`AppSchema.ClockIntent`) | Deletes the alarms. | "Delete my alarm." / "Remove the 7 AM alarm." |
| `createTimer` | Intent (`AppSchema.ClockIntent`) | Creates a timer. | "Set a timer." / "Timer for 5 minutes." |
| `updateTimer` | Intent (`AppSchema.ClockIntent`) | Updates the timer's attributes. | "Add 5 minutes to the timer." / "Change the timer to 10 minutes." |
| `pauseTimer` | Intent (`AppSchema.ClockIntent`) | Pauses a timer. | "Pause the timer." |
| `resumeTimer` | Intent (`AppSchema.ClockIntent`) | Resumes a timer. | "Resume the timer." / "Start the timer again." |
| `cancelTimer` | Intent (`AppSchema.ClockIntent`) | Cancels timers. | "Cancel the timer." / "Stop the timer." |
| `alarm` | Entity (`AppSchema.ClockEntity`) | An entity schema for an alarm. | — |
| `timer` | Entity (`AppSchema.ClockEntity`) | An entity schema for a timer. | — |
| `alarmTriggerState` | Enum (`AppSchema.ClockEnum`) | Alarm trigger state parameter. | — |
| `timerState` | Enum (`AppSchema.ClockEnum`) | Timer state parameter. | — |

## Notes

- The `.clock` domain: protocols `AppSchema.ClockIntent`, `AppSchema.ClockEntity`, `AppSchema.ClockEnum`. Entities are "Content and parameter types"; enums are "Types for static parameters".
- `AppSchema.ClockIntent` and `createAlarm`: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+. Domain page itself carries no platform metadata.
- Xcode generates a template implementation when you type `clock_` and select a schema from the suggestions list.
- Use-case group (alarm): the `dismissAlarm` and `updateAlarm` schemas form a use-case group. Xcode reports a build warning if your app supports one and not the other. To integrate with Apple Intelligence and bring the app to Siri AI, adopt both.
- Related sample article: "Integrating your music app with Apple Intelligence" (audio and clock schemas).
- Distinct from timer / alarm APIs in other frameworks (for example AlarmKit, WidgetKit Live Activities); this page only declares the App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [Audio domain](./domain-audio.md)
