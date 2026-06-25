# NavigationPath

A type-erased list of data representing the content of a navigation stack, enabling heterogeneous element types in a single path.

## Signature / Usage

```swift
@State private var path = NavigationPath()

NavigationStack(path: $path) {
    List(items) { item in
        NavigationLink(item.name, value: item)
    }
    .navigationDestination(for: Item.self) { item in
        ItemDetail(item: item)
    }
}

// Programmatic push / pop
path.append(someItem)      // push
path.removeLast()          // pop one
path.removeLast(path.count) // pop to root
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init()` | — | Creates an empty path. |
| `init(_ codable: NavigationPath.CodableRepresentation)` | — | Restores a path from its serializable form. |
| `isEmpty` | `Bool` | `true` when no elements are present. |
| `count` | `Int` | Number of elements in the path. |
| `append(_:)` | `(D: Hashable) -> Void` | Pushes a new value onto the path. |
| `removeLast(_ k: Int = 1)` | `-> Void` | Pops the last `k` elements. |
| `codable` | `CodableRepresentation?` | Serializable snapshot; `nil` if any element is not `Codable`. |

## Notes

- Available: iOS 16+, iPadOS 16+, macOS 13+, tvOS 16+, watchOS 9+, visionOS 1+
- Use instead of `[SomeType]` when the path must hold values of multiple different types.
- Persist `path.codable` via `JSONEncoder` to restore navigation state across app launches.
- Each type appended to the path must have a matching `navigationDestination(for:)` registered in the stack.

## Related

- [NavigationStack](./navigationstack.md)
- [navigationDestination](./navigationdestination.md)
