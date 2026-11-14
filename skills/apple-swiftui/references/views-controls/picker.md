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
| `pickerStyle(_:)` | `.automatic`, `.inline`, `.menu`, `.navigationLink`, `.palette`, `.radioGroup` (macOS), `.segmented`, `.tabs` (27.0+), `.wheel` |

## Notes

- Available on iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+.
- Each option must be tagged with `.tag(_:)` matching the `SelectionValue` type.
- `.palette` style (iOS 17+) shows a compact row of icons or colored chips.
- Use `init(_:sources:selection:content:)` to represent a mixed selection across multiple items.

### TabsPickerStyle (27.0+)

- `.tabs` (`TabsPickerStyle`, `init()`) is "a picker style that presents options as segmented tabs." On macOS it produces a segmented picker whose visual treatment distinguishes tab navigation from value selection; on iOS, tvOS, and visionOS it looks like `.segmented`. On all platforms VoiceOver announces the options as tabs. Use it for pickers that represent tab-based navigation and content selection.
- Source: https://developer.apple.com/documentation/swiftui/tabspickerstyle (DocC JSON fetched 2026-11-14)

```swift
Picker("View", selection: $view) {
    Text("Events").tag(Views.events)
    Text("Reminders").tag(Views.reminders)
}
.pickerStyle(.tabs)
```

## Related

- [Toggle](./toggle.md)
- [DatePicker](./datepicker.md)
- [ColorPicker](./colorpicker.md)
- [Form](./form.md)
