# withThrowingDiscardingTaskGroup(returning:isolation:body:)

Starts a new scope that can contain a dynamic number of throwing child tasks whose results are discarded as they complete.

## Signature

```swift
func withThrowingDiscardingTaskGroup<GroupResult>(
    returning returnType: GroupResult.Type = GroupResult.self,
    isolation: isolated (any Actor)? = #isolation,
    body: (inout ThrowingDiscardingTaskGroup<any Error>) async throws -> GroupResult
) async throws -> GroupResult
```

## Parameters

| Name | Type | Description |
|---|---|---|
| `returning` | `GroupResult.Type` | Return type of the group body closure |
| `isolation` | `isolated (any Actor)?` | Actor isolation context; defaults to `#isolation` |
| `body` | `(inout ThrowingDiscardingTaskGroup<any Error>) async throws -> GroupResult` | Closure that adds and manages throwing child tasks |

## Notes

- **Availability:** iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+ (back-deployed before macOS 15.0, iOS 18.0, watchOS 11.0, tvOS 18.0, visionOS 2.0)
- Child task results are discarded immediately upon completion instead of being retained, preventing accumulation in memory.
- Always waits for all child tasks to complete before returning, even cancelled ones.
- When any child task throws, the group implicitly cancels itself; the first error thrown is retained and rethrown from the function.
- Catch errors inside a child task body to prevent them from cancelling the group.

## Usage

```swift
try await withThrowingDiscardingTaskGroup { group in
    for url in urls {
        group.addTask { try await validate(url) }
    }
}
```

## Related

- [ThrowingDiscardingTaskGroup](./throwingdiscardingtaskgroup.md)
- [withDiscardingTaskGroup](./withdiscardingtaskgroup.md)
- [withThrowingTaskGroup](./withthrowingtaskgroup.md)
