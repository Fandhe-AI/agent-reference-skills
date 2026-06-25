# ColorPicker

A control used to select a color from the system color picker UI.

## Signature / Usage

```swift
nonisolated struct ColorPicker<Label> where Label : View
```

```swift
@State private var accentColor = Color.blue

ColorPicker("Accent Color", selection: $accentColor)

ColorPicker("Background", selection: $bgColor, supportsOpacity: false)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:selection:supportsOpacity:)` | Title string key + `Binding<Color>` + opacity toggle |
| `init(selection:supportsOpacity:label:)` | Custom label view builder |

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `selection` | `Binding<Color>` | The selected color |
| `supportsOpacity` | `Bool` | Show opacity controls (default `true`) |

## Notes

- Available on iOS 14.0+, macOS 11.0+, visionOS 1.0+. Not available on tvOS or watchOS.
- When `supportsOpacity: false`, opacity is stripped from the stored color as well as hidden in the UI.
- Opens the system-provided color picker panel; appearance differs per platform.

## Related

- [Picker](./picker.md)
- [Form](./form.md)
