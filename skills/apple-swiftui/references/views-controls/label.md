# Label

A standard label for user interface items, consisting of an icon with a title.

## Signature / Usage

```swift
nonisolated struct Label<Title, Icon> where Title : View, Icon : View
```

```swift
Label("Lightning", systemImage: "bolt.fill")
Label("Profile", image: "avatar")
Label {
    Text("Custom Title")
} icon: {
    Circle().fill(.blue).frame(width: 24, height: 24)
}
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:systemImage:)` | Title string key + SF Symbol name |
| `init(_:image:)` | Title string key + image resource name |
| `init(title:icon:)` | Custom `Title` and `Icon` view builders |
| `init(_:)` | Create from a `LabelStyleConfiguration` |

### Key modifier

| Modifier | Description |
|---|---|
| `labelStyle(_:)` | `.titleAndIcon` (default), `.titleOnly`, `.iconOnly` |

## Notes

- Available on iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+.
- Commonly used in `List`, `Menu`, and toolbar items where icon+title pairing is expected.
- Custom styles are implemented via `LabelStyle` protocol.

## Related

- [Text](./text.md)
- [Image](./image.md)
- [Button](./button.md)
