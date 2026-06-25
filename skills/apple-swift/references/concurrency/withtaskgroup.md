# withTaskGroup(of:returning:isolation:body:)

Starts a new scope that can contain a dynamic number of child tasks.

## Signature

```swift
func withTaskGroup<ChildTaskResult, GroupResult>(
    of childTaskResultType: ChildTaskResult.Type = ChildTaskResult.self,
    returning returnType: GroupResult.Type = GroupResult.self,
    isolation: isolated (any Actor)? = #isolation,
    body: (inout TaskGroup<ChildTaskResult>) async -> GroupResult
) async -> GroupResult where ChildTaskResult : Sendable
```

## Parameters

| Name | Type | Description |
|---|---|---|
| `of` | `ChildTaskResult.Type` | Element type produced by child tasks |
| `returning` | `GroupResult.Type` | Return type of the group body closure |
| `isolation` | `isolated (any Actor)?` | Actor isolation context; defaults to `#isolation` |
| `body` | `(inout TaskGroup<ChildTaskResult>) async -> GroupResult` | Closure that adds and manages child tasks |

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Always waits for all child tasks before returning, even on early return or cancellation.
- Child tasks are non-throwing; use `withThrowingTaskGroup` if tasks can throw.
- The `TaskGroup` itself is an `AsyncSequence` — iterate with `for await result in group`.

## Usage

```swift
func loadAll(urls: [URL]) async -> [Data] {
    await withTaskGroup(of: Data.self) { group in
        for url in urls {
            group.addTask { await download(url) }
        }
        var results: [Data] = []
        for await data in group {
            results.append(data)
        }
        return results
    }
}
```

## Related

- [TaskGroup](./taskgroup.md)
- [withThrowingTaskGroup](./withthrowingtaskgroup.md)
