---
source: https://developer.apple.com/documentation/appintents/audiocontext
---

# AudioContext

Specifies the type of audio activity to associate with a suggested entity, allowing the system to surface relevant suggestions at the right moment.

## Signature / Usage

```swift
struct AudioContext
```

```swift
static var nowPlaying: AudioContext
static var workout: AudioContext
static func workout(activityType: HKWorkoutActivityType) -> AudioContext
static func workout(intensityLevel: AudioContext.WorkoutIntensityLevel) -> AudioContext
```

## Options / Props

| Member | Description |
| --- | --- |
| `nowPlaying` | The Now Playing control or complication. |
| `workout` | A workout session of any type. |
| `workout(activityType:)` | A workout session of the given activity type (`HKWorkoutActivityType`). |
| `workout(intensityLevel:)` | A workout session of the given intensity level. |
| `AudioContext.WorkoutIntensityLevel` | The intensity level of a workout session (nested structure). |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Use with `AppEntityContext.audio(_:)` when donating entities through `RelevantEntities`.
- Conforms to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.

## Related

- [AppEntityContext](./appentitycontext.md)
- [RelevantEntities](./relevantentities.md)
