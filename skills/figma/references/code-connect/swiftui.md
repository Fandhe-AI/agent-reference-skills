# Connecting SwiftUI Components

Connect SwiftUI components to Figma using the `FigmaConnect` protocol and property wrapper helpers.

## Signature / Usage

```swift
import Figma

struct Button_connection: FigmaConnect {
    let component = Button.self
    let figmaNodeUrl: String = "https://www.figma.com/file/..."

    @FigmaString("Label") var label: String = "Click me"
    @FigmaBoolean("Disabled") var disabled: Bool = false
    @FigmaEnum("Type", mapping: ["Primary": ButtonType.primary, "Secondary": ButtonType.secondary])
    var type: ButtonType = .primary

    var body: some View {
        Button(label, disabled: disabled, type: type)
    }
}

// Use as an Xcode preview
#Preview { Button_connection() }
```

## Options / Props

### Property wrappers

| Wrapper | Description |
|---------|-------------|
| `@FigmaString("PropName")` | Maps a Figma string property to a Swift `String` variable |
| `@FigmaBoolean("PropName")` | Maps a Figma boolean property to a Swift `Bool` variable |
| `@FigmaEnum("PropName", mapping:)` | Maps a Figma variant property to a Swift enum value using a dictionary |
| `@FigmaInstance("PropName")` | Maps an instance-swap property to a nested component |
| `@FigmaChildren("LayerName")` | Renders code snippets for nested instances not bound to instance-swap props |

### `@FigmaEnum` / `@FigmaBoolean` options

| Option | Description |
|--------|-------------|
| `hideDefault: true` | Conceals the property when it shows its default value in Dev Mode |

### Variant-specific connections

Use a separate struct with `let variant` to provide different code samples for specific component variants:

```swift
struct PrimaryButton_connection: FigmaConnect {
    let component = Button.self
    let figmaNodeUrl: String = "https://..."
    let variant = ["Type": "Primary"]

    var body: some View { PrimaryButton() }
}
```

### Conditional modifiers

```swift
// Apply a SwiftUI modifier conditionally based on a Figma property
@FigmaBoolean("Outlined") var outlined: Bool = false

var body: some View {
    Button(label)
        .figmaApply(outlined) { view in view.buttonStyle(.bordered) }
}
```

## Notes

- `@FigmaChildren` accepts the name of the instance layer, not a property name
- `figmaApply` accepts an optional `elseApply` trailing closure for the false branch
- Connection structs work directly as Xcode previews via `#Preview { MyComponent_connection() }`
- Set `xcodeprojPath` or `swiftPackagePath` in `figma.config.json` if auto-detection fails

## Related

- [Config File](./config-file.md)
- [CLI Reference](./cli-reference.md)
- [Comparing CLI and UI](./comparing-cc.md)
