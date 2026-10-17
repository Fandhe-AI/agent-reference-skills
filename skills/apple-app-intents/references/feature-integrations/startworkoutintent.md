---
source: https://developer.apple.com/documentation/appintents/startworkoutintent
---

# StartWorkoutIntent

An App Intent for starting a workout.

## Signature / Usage

```swift
protocol StartWorkoutIntent : InstanceDisplayRepresentable, SystemIntent
```

```swift
struct MyStartWorkoutIntent: StartWorkoutIntent {

    // Define the intent's title.
    static var title: LocalizedStringResource = "Start Workout"

    // Define a list of start workout intents that appear below the First Press
    // settings when someone sets your app as the workout app in
    // Settings > Action Button.
    static var suggestedWorkouts: [MyStartWorkoutIntent] = [MyStartWorkoutIntent()]

    // Define a parameter that specifies the type of workout that this
    // intent starts.
    @Parameter(title: "Start Workout Entity")
    var workoutStyle: WorkoutEnum

    // Define an init method that sets the default workout type.
    init() {
        workoutStyle = .workout
    }

    // Set the display representation based on the current workout style.
    var displayRepresentation: DisplayRepresentation {
        WorkoutEnum.caseDisplayRepresentations[workoutStyle] ??
        DisplayRepresentation(title: "Unknown")
    }

    // Launch your app when the system triggers this intent.
    static var openAppWhenRun: Bool { true }

    // Define the method that the system calls when it triggers this event.
    func perform() async throws -> some IntentResult {
        let workoutManager = MyWorkoutManager.shared
        await workoutManager.requestAuthorization()
        await workoutManager.startWorkout()
        return .result()
    }
}
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `WorkoutStyle` | `associatedtype WorkoutStyle : AppValue` | The type to use for defining the intent's workout style. Required. |
| `workoutStyle` | `var workoutStyle: Self.WorkoutStyle` | The workout style for the intent. Required. |
| `suggestedWorkouts` | `static var suggestedWorkouts: [Self]` | A list of the supported workout styles. Required. |
| `init(style:)` | `init(style: Self.WorkoutStyle)` | Creates a new intent for the specified workout style. |
| `invalidateSuggestedWorkouts()` | `static func invalidateSuggestedWorkouts()` | Tells the system when the list of suggested workouts changes. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no `introducedAt` given in the source JSON)
- On Apple Watch Ultra, this intent registers a start-workout action for the Action button. After installing the app, the user selects it in Settings > Action Button by setting Action to Workout and App to the app.
- Implementations define: a `title` property, a `workoutStyle` property, a list of `suggestedWorkouts`, a `displayRepresentation` property, and a `perform()` method.
- Important: `workoutStyle` must adopt `AppEnum` or `AppEntity`, and must be declared with the `@Parameter` property wrapper.
- See the article "Responding to the Action button on Apple Watch Ultra" and "Configuring the runtime behavior of your app intents".
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [PauseWorkoutIntent](./pauseworkoutintent.md)
- [ResumeWorkoutIntent](./resumeworkoutintent.md)
- [StartDiveIntent](./startdiveintent.md)
- SystemIntent
