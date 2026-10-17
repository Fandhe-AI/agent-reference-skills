---
source: https://developer.apple.com/documentation/appintents/actionbuttonarticle
---

# Respond to the Action Button on Apple Watch Ultra

Register a workout app's actions for the Action button: `StartWorkoutIntent` with an `AppEnum` workout type, suggested workouts, a donated next action, pause and resume, and a dive session.

```swift
// 1. Workout type enum
enum WorkoutEnum: String, AppEnum {
    
    // List the types of workout your app supports.
    case running

    static var typeDisplayRepresentation: TypeDisplayRepresentation = "Workout"

    // Define the display representation for each of the workouts your app supports.
    static var caseDisplayRepresentations: [WorkoutEnum: DisplayRepresentation] =
        [.running: DisplayRepresentation(title: "Running", subtitle: "outside run")]
}

// 2. Start workout intent
struct MyStartWorkoutIntent: StartWorkoutIntent {

    // Define the intent's title.
    static var title: LocalizedStringResource = "Start Workout"
    
    // Define a list of start workout intents that appear below the First Press settings when someone sets your app as the workout app in Settings > Action Button.

    static var suggestedWorkouts: [MyStartWorkoutIntent] = [MyStartWorkoutIntent()]

    // Define a parameter that specifies the type of workout that this intent starts.
    @Parameter(title: "Type of Workout")
    var workoutStyle: WorkoutEnum

    // Define an init method that sets the default workout type.
    init() {
        workoutStyle = .running
    }

    // Add the display representation, and the perform method here.
}

// 3. Display representation of the intent
var displayRepresentation: DisplayRepresentation {
    WorkoutEnum.caseDisplayRepresentations[workoutStyle] ??
    DisplayRepresentation(title: "Unknown")
}

// 4. Support multiple workout types
enum WorkoutEnum: String, AppEnum {

    // List the types of workout your app supports.
    case walking
    case running
    case swimming
    case cycling

    static var typeDisplayRepresentation: TypeDisplayRepresentation = "Workout"

    // Set the display representation here.
}

static var caseDisplayRepresentations: [WorkoutEnum: DisplayRepresentation] =
[.walking: DisplayRepresentation(title: "Walking", subtitle: "outside walk"),
 .running: DisplayRepresentation(title: "Running", subtitle: "outside run"),
 .swimming: DisplayRepresentation(title: "Swimming", subtitle: "lap swim"),
 .cycling: DisplayRepresentation(title: "Cycling", subtitle: "outside cycling")
]

static var suggestedWorkouts: [MyStartWorkoutIntent] =
[MyStartWorkoutIntent(style: .walking),
 MyStartWorkoutIntent(style: .running),
 MyStartWorkoutIntent(style: .swimming),
 MyStartWorkoutIntent(style: .cycling)]

// 5. Donate the next action for the Action button
logger.debug("==> Donate the mark lap intent as the Action button's next action.")
try await MyStartWorkoutIntent().donate(result: .result(actionButtonIntent: MyMarkLapIntent()))

struct MarkLapIntent: AppIntent {
    static var title: LocalizedStringResource = "Mark Lap"

    func perform() async throws -> some IntentResult {
        logger.debug("*** Perform a mark lap intent. ***")
        await MyWorkoutManager.shared.markLap(at: Date())
        return .result()
    }
}

// 6. Pause and resume
struct MyPauseWorkoutIntent: PauseWorkoutIntent {
    static var title: LocalizedStringResource = "Pause Workout"

    func perform() async throws -> some IntentResult {
        logger.debug("*** Performing a pause intent. ***")
        await MyWorkoutManager.shared.pauseWorkout()
        return .result()
    }
}

struct MyResumeWorkoutIntent: ResumeWorkoutIntent {
    static var title: LocalizedStringResource = "Resume Workout"

    func perform() async throws -> some IntentResult {
        logger.debug("*** Performing a resume intent. ***")
        await MyWorkoutManager.shared.resumeWorkout()
        return .result()
    }
}

// 7. Start a dive session
struct MyStartDiveSessionIntent: StartDiveIntent {

    static var title: LocalizedStringResource = "Starting a dive session."

    func perform() async throws -> some IntentResult {
        logger.debug("*** Starting a dive session. ***")

        await DiveManager.shared.start()
        return .result(actionButtonIntent: MyCollectSubmergedDataIntent())
    }
}

// 8. Pass data to the intents through app dependencies
struct MyStartWorkoutIntent: StartWorkoutIntent {
  @Dependency var workoutManager: MyWorkoutManager

  // Add remaining code here.
}

AppDependencyManager.shared.add { MyWorkoutManager() }
```

## Notes

- Source article: "Responding to the Action button on Apple Watch Ultra" (https://developer.apple.com/documentation/appintents/actionbuttonarticle). The article has 20 listings; the HealthKit workout-manager listings (`startWorkout(type:)`, `requestAuthorization()`, `startCollectingData()`, the `typesToRead` set, and the `perform()` bodies that call them) are not App Intents API and are omitted here, so the intents above are fragments, not a compilable project. Listing 3 is a member of `MyStartWorkoutIntent`.
- Target OS: the article metadata lists no versions. See references/feature-integrations/startworkoutintent.md, pauseworkoutintent.md, resumeworkoutintent.md, and startdiveintent.md for per-protocol availability.
- Listing 8 declares `@Dependency` because the article passes data to intents through `AppDependencyManager`; register the dependency at app launch.
- WidgetKit controls and Live Activity intents are separate; those use `ControlConfigurationIntent` and `LiveActivityIntent` (see references/feature-integrations/).
