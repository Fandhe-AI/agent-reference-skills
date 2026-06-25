# ImmersiveSpaceContent

A protocol for types that can serve as the content of an `ImmersiveSpace`.

## Signature / Usage

```swift
@preconcurrency @MainActor
protocol ImmersiveSpaceContent
```

```swift
struct MySkybox: ImmersiveSpaceContent {
    var body: some ImmersiveSpaceContent {
        RealityView { content in
            // add entities
        }
    }
}
```

## Options / Props

| Requirement | Description |
|-------------|-------------|
| `Body` | Associated type conforming to `ImmersiveSpaceContent` |
| `body` | Returns the content instance of type `Body` |

Conforming types:
- `ImmersiveSpaceViewContent` — SwiftUI view hierarchy as immersive content (created automatically by `ImmersiveSpace`)
- `CompositorContentBuilder.Content` — compositor-based content

## Notes

- visionOS 1.0+. Conforms `@preconcurrency @MainActor` by default; opt out by declaring conformance in an `extension`.
- You rarely conform to this protocol directly; SwiftUI creates `ImmersiveSpaceViewContent` when you use `ImmersiveSpace { ... }`.

## Related

- [ImmersiveSpace](./immersivespace.md)
- [RealityView](./realityview.md)
