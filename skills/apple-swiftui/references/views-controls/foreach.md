# ForEach

A structure that computes views on demand from an underlying collection of identified data.

## Signature / Usage

```swift
struct ForEach<Data, ID, Content> where Data : RandomAccessCollection, ID : Hashable
```

```swift
// Identifiable data
ForEach(items) { item in
    Text(item.name)
}

// Non-identifiable data with key path
ForEach(0..<5, id: \.self) { index in
    Text("Row \(index)")
}

// With edit actions
ForEach(items, editActions: [.delete, .move]) { item in
    Text(item.name)
}
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:content:)` | `Identifiable` collection + content builder |
| `init(_:id:content:)` | Collection + key path for ID |
| `init(_:editActions:content:)` | `Identifiable` collection + edit action set |
| `init(_:id:editActions:content:)` | Collection + key path ID + edit actions |
| `init(sections:content:)` | Iterate over `ForEach` section views |
| `init(subviews:content:)` | Iterate over subviews of a container |

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `Data` | `RandomAccessCollection` | The data collection |
| `ID` | `Hashable` | Identifier type (inferred from `Identifiable` or key path) |
| `editActions` | `EditActions` | `.delete`, `.move`, or both |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- `ForEach` is not a scroll container; embed in `List` or `ScrollView` for scrollable output.
- Attach `.onDelete(perform:)` and `.onMove(perform:)` to `ForEach` (not the enclosing `List`) to enable row editing.
- Use stable, unique identifiers to avoid unnecessary view recreation during updates.

## Related

- [List](./list.md)
- [Section](./section.md)
