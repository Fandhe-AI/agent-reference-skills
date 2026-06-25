# Marker

A balloon-shaped annotation that marks a map location. The simplest way to add a pin-style callout to a `Map`.

## Signature / Usage

```swift
Map {
    Marker("San Francisco", coordinate: sfCoord)
        .tint(.orange)

    Marker("Library", systemImage: "books.vertical", coordinate: libraryCoord)

    Marker(item: mapItem)  // from MKMapItem
}
```

## Options / Props

| Initializer / Modifier | Description |
|------------------------|-------------|
| `init(_ title:coordinate:)` | Title string (or `LocalizedStringKey` / `LocalizedStringResource`) + coordinate |
| `init(_ title:systemImage:coordinate:)` | Adds an SF Symbol glyph inside the balloon |
| `init(_ title:image:coordinate:)` | Adds an asset catalog image glyph |
| `init(_ title:monogram:coordinate:)` | Adds a `Text` monogram (1–2 chars) glyph |
| `init(coordinate:label:)` | Fully custom label view |
| `init(item:)` | Creates from an `MKMapItem` using its name |
| `.tint(_:)` | Sets the balloon color |
| `.tag(_:)` | Associates a value used with `Map(selection:)` |

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Conforms to `MapContent`, `Sendable`.
- For fully custom content at a coordinate, use `Annotation` instead.

## Related

- [Annotation](./Annotation.md)
- [Map](./Map.md)
- [MKMapItem](./MKMapItem.md)
