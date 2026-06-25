# withThrowingTaskGroup(of:returning:isolation:body:)

Starts a new scope that can contain a dynamic number of throwing child tasks.

## Signature

```swift
func withThrowingTaskGroup<ChildTaskResult, GroupResult>(
    of childTaskResultType: ChildTaskResult.Type = ChildTaskResult.self,
    returning returnType: GroupResult.Type = GroupResult.self,
    isolation: isolated (any Actor)? = #isolation,
    body: (inout ThrowingTaskGroup<ChildTaskResult, any Error>) async throws -> GroupResult
) async rethrows -> GroupResult where ChildTaskResult : Sendable
```

## Parameters

| Name | Type | Description |
|---|---|---|
| `of` | `ChildTaskResult.Type` | Element type produced by child tasks |
| `returning` | `GroupResult.Type` | Return type of the group body closure |
| `isolation` | `isolated (any Actor)?` | Actor isolation context; defaults to `#isolation` |
| `body` | `(inout ThrowingTaskGroup<ChildTaskResult, any Error>) async throws -> GroupResult` | Closure that manages child tasks and may throw |

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Always waits for all child tasks before returning.
- If the body throws, all remaining child tasks are cancelled before the error propagates.
- Collect individual child results with `for try await result in group` or `group.nextResult()`.

## Usage

```swift
func fetchAll(urls: [URL]) async throws -> [Page] {
    try await withThrowingTaskGroup(of: Page.self) { group in
        for url in urls {
            group.addTask { try await fetchPage(url) }
        }
        var pages: [Page] = []
        for try await page in group {
            pages.append(page)
        }
        return pages
    }
}
```

## Related

- [ThrowingTaskGroup](./throwingtaskgroup.md)
- [withTaskGroup](./withtaskgroup.md)
