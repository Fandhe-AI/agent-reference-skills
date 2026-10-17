---
source: https://developer.apple.com/documentation/appintentstesting/viewannotation
---

# ViewAnnotation

The onscreen context you provide to the system by annotating a view with an app entity.

## Signature / Usage

```swift
struct ViewAnnotation
```

Use `ViewAnnotation` to test whether the currently visible user interface and its views have the expected entity view annotations you created to provide onscreen context to the system. Retrieve visible view annotations using `AppEntityDefinition.viewAnnotations()`, then inspect their selection state and which entities are visible on-screen.

```swift
func viewAnnotations() async throws -> [ViewAnnotation]
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `entity` | `let entity: AnyAppEntity` | The underlying app entity data. |
| `isSelected` | `let isSelected: Bool` | A Boolean value that indicates whether the entity's associated view is selected. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Equatable`, `Sendable`, `SendableMetatype`.
- `viewAnnotations()` is a member of `AppEntityDefinition` ("Provides the currently visible onscreen entities."); the snippet above is its declaration as listed on the `ViewAnnotation` page references.

## Related

- [AnyAppEntity](./anyappentity.md)
- [IntentDefinitions](./intentdefinitions.md)
