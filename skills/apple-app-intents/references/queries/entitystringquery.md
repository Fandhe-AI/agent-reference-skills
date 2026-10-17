---
source: https://developer.apple.com/documentation/appintents/entitystringquery
---

# EntityStringQuery

An interface that locates entities using arbitrary string input.

## Signature / Usage

```swift
protocol EntityStringQuery : EntityQuery
```

```swift
func entities(matching: String) async throws -> Self.Result
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `entities(matching:)` | `func entities(matching: String) async throws -> Self.Result` (required) | Retrieves instances by string. |

## Notes

- Platforms: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- `EntityStringQuery` adds to an `EntityQuery` the ability to query instances by `String`. The string value typically represents the name a user would use to refer to a particular instance.
- The code snippet above is the member declaration only; the official page has no code listing for this protocol.

## Related

- [EntityQuery](./entityquery.md)
- [EntityPropertyQuery](./entitypropertyquery.md)
