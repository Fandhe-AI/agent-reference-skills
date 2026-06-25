# Section

A container view that you can use to add hierarchy within certain views.

## Signature / Usage

```swift
struct Section<Parent, Content, Footer>
```

```swift
List {
    Section("Fruits") {
        Text("Apple")
        Text("Banana")
    }
    Section {
        Text("Carrot")
    } header: {
        Text("Vegetables")
    } footer: {
        Text("Eat your greens.")
    }
}
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(content:)` | Content only (no header/footer) |
| `init(_:content:)` | Title string key as header |
| `init(content:header:)` | Custom header view builder |
| `init(content:footer:)` | Custom footer view builder |
| `init(content:header:footer:)` | Both header and footer |
| `init(_:isExpanded:content:)` | Collapsible section with `Binding<Bool>` |
| `init(isExpanded:content:header:)` | Collapsible with custom header |

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `isExpanded` | `Binding<Bool>` | Controls expanded/collapsed state |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- Used primarily inside `List`, `Form`, `Picker`, and `Table`.
- Collapsible sections (`isExpanded:`) show a disclosure indicator when the list uses `.sidebar` style.
- Also conforms to `TableRowContent` for use inside `Table`.

## Related

- [List](./list.md)
- [Form](./form.md)
- [ForEach](./foreach.md)
