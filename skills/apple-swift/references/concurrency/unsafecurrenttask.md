# UnsafeCurrentTask / withUnsafeCurrentTask(body:)

An unsafe reference to the current task.

## Signature / Usage

```swift
struct UnsafeCurrentTask

func withUnsafeCurrentTask<T>(
    body: (UnsafeCurrentTask?) throws -> T
) rethrows -> T

func withUnsafeCurrentTask<T>(
    body: nonisolated(nonsending) (UnsafeCurrentTask?) async throws -> T
) async rethrows -> T
```

Conforms to `Equatable`, `Hashable`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| basePriority | `TaskPriority` | The current task's base priority |
| priority | `TaskPriority` | The current task's priority |
| isCancelled | `Bool` | Whether the current task was canceled |
| hasActiveCancellationShield | `Bool` | Whether this task is executing in a scope with a task cancellation shield activated by `withTaskCancellationShield(operation:)` |
| name | `String?` | The task's name, if it was set during its creation |
| unownedTaskExecutor | `UnownedTaskExecutor?` | The current `TaskExecutor` preference, if this task has one configured |
| cancel() | method | Cancel the current task |
| escalatePriority(to:) | method | Escalate the task priority of the passed in task to the new priority (`to: TaskPriority`) |

## Notes

- **Availability:** `UnsafeCurrentTask` and the synchronous `withUnsafeCurrentTask(body:)`: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+. The async `nonisolated(nonsending)` overload: iOS 18.0+.
- Get an instance by calling `withUnsafeCurrentTask(body:)`. Do not store an unsafe task reference for use outside that method's closure: storing it does not affect the task's actual life cycle, and the behavior of accessing it outside the closure is not defined.
- Only APIs on `UnsafeCurrentTask` that are also part of `Task` are safe to invoke from a task other than the task this instance refers to. Calling other APIs from another task is undefined behavior, breaks invariants in other parts of the program running on this task, and may lead to crashes or data loss.

## Related

- [Task](./task.md)
- [TaskPriority](./taskpriority.md)
- [TaskExecutor](./taskexecutor.md)
- [UnownedTaskExecutor](./unownedtaskexecutor.md)
