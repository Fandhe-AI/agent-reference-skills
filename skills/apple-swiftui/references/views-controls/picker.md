# Picker

A control for selecting from a set of mutually exclusive values.

## Signature / Usage

```swift
nonisolated struct Picker<Label, SelectionValue, Content>
where Label : View, SelectionValue : Hashable, Content : View
```

```swift
enum Flavor { case vanilla, chocolate, strawberry }

@State private var selected = Flavor.vanilla

Picker("Flavor", selection: $selected) {
    Text("Vanilla").tag(Flavor.vanilla)
    Text("Chocolate").tag(Flavor.chocolate)
    Text("Strawberry").tag(Flavor.strawberry)
}
.pickerStyle(.segmented)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:selection:content:)` | Title string key + binding + content |
| `init(selection:content:label:)` | Custom label view builder |
| `init(_:systemImage:selection:content:)` | Title + SF Symbol |
| `init(_:image:selection:content:)` | Title + image resource |
| `init(_:sources:selection:content:)` | Multiple bindings from a collection |

### Key modifiers

| Modifier | Description |
|---|---|
| `pickerStyle(_:)` | `.automatic`, `.inline`, `.menu`, `.navigationLink`, `.palette`, `.radioGroup` (macOS), `.segmented`, `.wheel` |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- Each option must be tagged with `.tag(_:)` matching the `SelectionValue` type.
- `.palette` style (iOS 17+) shows a compact row of icons or colored chips.
- Use `init(_:sources:selection:content:)` to represent a mixed selection across multiple items.

## Related

- [Toggle](./toggle.md)
- [DatePicker](./datepicker.md)
- [ColorPicker](./colorpicker.md)
- [Form](./form.md)
