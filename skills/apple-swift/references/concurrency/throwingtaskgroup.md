# ThrowingTaskGroup

A group that contains throwing, dynamically created child tasks.

## Signature

```swift
@frozen struct ThrowingTaskGroup<ChildTaskResult, Failure>
where ChildTaskResult : Sendable, Failure : Error
```

Conforms to `AsyncSequence`. Use `withThrowingTaskGroup(of:returning:isolation:body:)` to obtain an instance.

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- The group always waits for all child tasks before the enclosing `withThrowingTaskGroup` call returns.
- If an error is thrown from the group body, all remaining tasks are cancelled.
- Use `nextResult(isolation:)` to receive child results as `Result` values without propagating throws immediately.
- `addImmediateTaskUnlessCancelled(...)` starts the child task on the calling context and does not suspend; it returns `false` when the task was not added. Source: https://developer.apple.com/documentation/swift/throwingtaskgroup/addimmediatetaskunlesscancelled(name:priority:executorpreference:operation:) (fetched 2026-11-14)

### Adding tasks

| Method | Description |
|---|---|
| `addTask(name:priority:operation:)` | Adds a throwing child task |
| `addTaskUnlessCancelled(name:priority:operation:)` | Adds a task only if not cancelled |
| `addImmediateTask(name:priority:executorPreference:operation:)` | Adds a throwing task that starts immediately in the calling context (iOS 26.0+) |
| `addImmediateTaskUnlessCancelled(name:priority:executorPreference:operation:)` | Same, but only if the group is not cancelled (returns `Bool`; iOS 26.0+) |

### Collecting results

| Member | Description |
|---|---|
| `next()` | Awaits the next completed result; rethrows child errors |
| `nextResult(isolation:)` | Awaits next result as `Result<ChildTaskResult, Failure>` |
| `waitForAll()` | Awaits all remaining tasks |
| `isEmpty` | `true` when no child tasks remain |

### Cancellation

| Member | Description |
|---|---|
| `cancelAll()` | Sends cancellation signal to all child tasks |
| `isCancelled` | `true` if the group has been cancelled |

## Usage

```swift
let pages = try await withThrowingTaskGroup(of: Page.self) { group in
    for url in urls {
        group.addTask { try await fetchPage(url) }
    }
    var pages: [Page] = []
    for try await page in group {
        pages.append(page)
    }
    return pages
}
```

## Related

- [TaskGroup](./taskgroup.md)
- [withThrowingTaskGroup](./withthrowingtaskgroup.md)
- [Task](./task.md)
