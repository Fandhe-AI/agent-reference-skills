# withDiscardingTaskGroup(returning:isolation:body:)

Starts a new scope that can contain a dynamic number of child tasks whose results are discarded as they complete.

## Signature

```swift
func withDiscardingTaskGroup<GroupResult>(
    returning returnType: GroupResult.Type = GroupResult.self,
    isolation: isolated (any Actor)? = #isolation,
    body: (inout DiscardingTaskGroup) async -> GroupResult
) async -> GroupResult
```

## Parameters

| Name | Type | Description |
|---|---|---|
| `returning` | `GroupResult.Type` | Return type of the group body closure |
| `isolation` | `isolated (any Actor)?` | Actor isolation context; defaults to `#isolation` |
| `body` | `(inout DiscardingTaskGroup) async -> GroupResult` | Closure that adds and manages child tasks |

## Notes

- **Availability:** iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+ (back-deployed before macOS 15.0, iOS 18.0, watchOS 11.0, tvOS 18.0, visionOS 2.0)
- Unlike `withTaskGroup`, child tasks and their results are discarded immediately upon completion instead of being retained for consumption — best for side-effect-only child tasks.
- Always waits for all child tasks to complete before returning; the group is automatically torn down afterward.
- Use `withThrowingDiscardingTaskGroup(returning:isolation:body:)` for child tasks that can throw.

## Usage

```swift
await withDiscardingTaskGroup { group in
    for url in urls {
        group.addTask { await prefetch(url) }
    }
}
```

## Related

- [DiscardingTaskGroup](./discardingtaskgroup.md)
- [withThrowingDiscardingTaskGroup](./withthrowingdiscardingtaskgroup.md)
- [withTaskGroup](./withtaskgroup.md)
