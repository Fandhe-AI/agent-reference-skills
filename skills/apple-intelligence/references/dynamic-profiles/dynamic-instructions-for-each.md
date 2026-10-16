---
source: https://developer.apple.com/documentation/foundationmodels/dynamicinstructionsforeach
---

# DynamicInstructionsForEach

Dynamic instructions that produce content for each element of a collection.

## Signature / Usage

```swift
struct DynamicInstructionsForEach<Data, ID, Content> where Data : RandomAccessCollection, ID : Hashable, Content : DynamicInstructions
```

Initializers:

```swift
init(_ data: Data, @DynamicInstructionsBuilder content: @escaping (Data.Element) -> Content)
init(_ data: Data, id: KeyPath<Data.Element, ID>, @DynamicInstructionsBuilder content: @escaping (Data.Element) -> Content)
```

## Options / Props

| Name | Description |
| --- | --- |
| `init(_:content:)` | Creates dynamic instructions that produce content for each element of an identifiable collection. |
| `init(_:id:content:)` | Creates dynamic instructions that produce content for each element of a collection. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Don't use this type directly. Instead, use `DynamicInstructions.ForEach` within the `body` of your `DynamicInstructions`.

## Related

- [DynamicInstructions](./dynamic-instructions.md)
- [LanguageModelSession.DynamicProfile](./dynamic-profile.md)
