---
source: https://developer.apple.com/documentation/appintents/pauseworkoutintent
---

# PauseWorkoutIntent

An App Intent that lets someone pause your app's current workout session.

## Signature / Usage

```swift
protocol PauseWorkoutIntent : SystemIntent
```

```swift
struct MyPauseWorkoutIntent: PauseWorkoutIntent {
   static var title: LocalizedStringResource = "Pause Workout"

   func perform() async throws -> some IntentResult {
       logger.debug("*** Performing a pause intent. ***")
       await MyWorkoutManager.shared.pauseWorkout()
       return .result()
   }
}
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no `introducedAt` given in the source JSON)
- On Apple Watch Ultra, someone can pause a workout by simultaneously pressing the Action button and the side button while the app is running a workout session.
- The intent needs a `title` property (localized description of the action) and a `perform()` method, which the system calls when it triggers the intent.
- See the article "Responding to the Action button on Apple Watch Ultra".
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [StartWorkoutIntent](./startworkoutintent.md)
- [ResumeWorkoutIntent](./resumeworkoutintent.md)
