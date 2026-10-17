---
source: https://developer.apple.com/documentation/appintents/resumeworkoutintent
---

# ResumeWorkoutIntent

An App Intent that lets someone resume your app's paused workout session.

## Signature / Usage

```swift
protocol ResumeWorkoutIntent : SystemIntent
```

```swift
struct MyResumeWorkoutIntent: ResumeWorkoutIntent {
    static var title: LocalizedStringResource = "Resume Workout"

    func perform() async throws -> some IntentResult {
        logger.debug("*** Performing a resume intent. ***")
        await MyWorkoutManager.shared.resumeWorkout()
        return .result()
    }
}
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no `introducedAt` given in the source JSON)
- On Apple Watch Ultra, someone can resume a workout by simultaneously pressing the Action button and the side button when the app has a paused workout session.
- The intent needs a `title` property (localized description of the action) and a `perform()` method, which the system calls when it triggers the intent.
- See the article "Responding to the Action button on Apple Watch Ultra".
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [StartWorkoutIntent](./startworkoutintent.md)
- [PauseWorkoutIntent](./pauseworkoutintent.md)
