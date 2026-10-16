---
source: https://developer.apple.com/documentation/foundationmodels/dynamicinstructions, https://developer.apple.com/documentation/foundationmodels/dynamicinstructionsbuilder
---

# DynamicInstructions

A type that represents dynamic instructions. Dynamic instructions provide a declarative approach to assembling instructions and tools that a `LanguageModelSession` uses.

## Signature / Usage

```swift
protocol DynamicInstructions
```

```swift
struct PresentationInstructions: DynamicInstructions {
    // The data source for conditional instructions.
    var isEditingImage = true

    var body: some DynamicInstructions {
        // The instructions and tools that remain the same across any use of this type.
        Instructions {
            "Help people improve their presentation."
        }
        ListPhotosTool()
        AddPhotoTool()

        // Depending on the state of the app, include additional instructions
        // that provide the model with more task-specific instructions and tools.
        if isEditingImage {
            ImageEditingInstructions()
        }
    }
}
```

### Members

| Name | Declaration | Description |
| --- | --- | --- |
| body | `@DynamicInstructionsBuilder var body: Self.Body { get }` | The content of the dynamic instructions. |
| Body | `associatedtype Body : DynamicInstructions` | The type of dynamic instructions that represent these instructions. |
| DynamicInstructions.ForEach | `typealias ForEach = DynamicInstructionsForEach` | A shorthand for producing content for each element of a collection. |
| DynamicInstructions.SessionProperty | `typealias SessionProperty = LanguageModelSession.SessionProperty` | A property wrapper that provides access to a session property within dynamic instructions. |

### DynamicInstructionsBuilder

```swift
@resultBuilder struct DynamicInstructionsBuilder
```

A result builder that combines tools and other content into dynamic instructions.

| Method | Description |
| --- | --- |
| `buildBlock()` | Creates a builder with an empty block. |
| `buildBlock(_:)` | Creates a builder with a block. |
| `buildEither(first:)` | Creates a builder with the first component. |
| `buildEither(second:)` | Creates a builder with the second component. |
| `buildExpression(_:)` | Creates a builder with a list of tools expression. |
| `buildOptional(_:)` | Creates a builder with an optional component. |
| `buildLimitedAvailability(_:)` | Creates a builder with limited availability dynamic instructions. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+ (`DynamicInstructions` and `DynamicInstructionsBuilder`).
- The framework evaluates dynamic instructions before every request to the model, so the body can contain conditional logic that is based on current app state.
- The builder's supporting types (`EmptyDynamicInstructions`, `ConditionalDynamicInstructions`, `AnyDynamicInstructions`, `TupleDynamicInstructions`) are on the dynamic-instructions-types page.

## Related

- [DynamicInstructionsForEach](./dynamic-instructions-for-each.md)
- [Builder helper types](./dynamic-instructions-types.md)
- [LanguageModelSession.DynamicProfile](./dynamic-profile.md)
- [LanguageModelSession.Profile](./profile.md)
