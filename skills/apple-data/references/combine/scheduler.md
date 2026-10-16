# Scheduler / ImmediateScheduler

`Scheduler` is a protocol that defines when and how to execute a closure. `ImmediateScheduler` is a scheduler for performing synchronous actions.

## Signature / Usage

```swift
protocol Scheduler<SchedulerTimeType>

struct ImmediateScheduler   // conforms to Scheduler
static let shared: ImmediateScheduler
```

You can use a scheduler to execute code as soon as possible, or after a future date. Individual scheduler implementations use whatever time-keeping system makes sense for them, expressed as their `SchedulerTimeType`. Since this type conforms to `SchedulerTimeIntervalConvertible`, you can always express these times with convenience functions like `.milliseconds(500)`. Schedulers can accept options to control how they execute the actions passed to them (for example, which threads or dispatch queues execute the actions).

Schedulers are passed to timing and delivery operators, for example:

```swift
let cancellable = subject
    .debounce(for: .milliseconds(500), scheduler: RunLoop.main)
    .sink { print("Debounced: \($0)") }
```

### Scheduler members

| Name | Description |
|------|-------------|
| `SchedulerTimeType` | Associated type (`Strideable`) describing an instant in time for this scheduler. |
| `SchedulerOptions` | Associated type that defines options accepted by the scheduler. |
| `now` | This scheduler's definition of the current moment in time. |
| `minimumTolerance` | The minimum tolerance allowed by the scheduler (`SchedulerTimeType.Stride`). |
| `schedule(options:_:)` | Performs the action at the next possible opportunity. (required) |
| `schedule(_:)` | Performs the action at the next possible opportunity, without options. |
| `schedule(after:tolerance:options:_:)` | Performs the action at some time after the specified date. (required) |
| `schedule(after:tolerance:_:)` | Performs the action at some time after the specified date. |
| `schedule(after:_:)` | Performs the action at some time after the specified date, using the scheduler's minimum tolerance. |
| `schedule(after:interval:tolerance:options:_:) -> any Cancellable` | Performs the action at some time after the specified date, at the specified frequency, optionally taking into account tolerance if possible. (required) |
| `schedule(after:interval:tolerance:_:) -> any Cancellable` | Same, taking into account tolerance if possible. |
| `schedule(after:interval:_:) -> any Cancellable` | Same, using minimum tolerance possible for this scheduler. |

### ImmediateScheduler members

| Name | Description |
|------|-------------|
| `shared` | The shared instance of the immediate scheduler. |
| `SchedulerTimeType` | The time type used by the immediate scheduler (a struct). |
| `SchedulerOptions` | A type that defines options accepted by the immediate scheduler. |
| `now` | The immediate scheduler's definition of the current moment in time. |
| `minimumTolerance` | The minimum tolerance allowed by the immediate scheduler. |
| `schedule(options:_:)` | Performs the action at the next possible opportunity. |
| `schedule(after:tolerance:options:_:)` | Performs the action at some time after the specified date. |
| `schedule(after:interval:tolerance:options:_:)` | Performs the action at some time after the specified date, at the specified frequency. |

## Notes

- iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- `ImmediateScheduler` can only be used for immediate actions. If you attempt to schedule actions after a specific date, it ignores the date and performs them immediately.
- `ImmediateScheduler` is the only conforming type listed on the `Scheduler` page; other schedulers (such as `RunLoop` and `DispatchQueue`) are not covered by this page.

## Related

- [receive(on:options:)](./receive-on.md)
- [Timing Operators](./operators-timing.md)
- [Publisher](./publisher.md)
- [Cancellable](./cancellable.md)
