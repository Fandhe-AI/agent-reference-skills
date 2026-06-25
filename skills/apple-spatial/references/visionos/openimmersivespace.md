# openImmersiveSpace

An environment action that presents an immersive space. Accessed via `@Environment(\.openImmersiveSpace)`.

## Signature / Usage

```swift
var openImmersiveSpace: OpenImmersiveSpaceAction { get }
```

```swift
struct ShowPlanetButton: View {
    var planet: Planet
    @Environment(\.openImmersiveSpace) private var openImmersiveSpace

    var body: some View {
        Button("Show \(planet.name)") {
            Task {
                await openImmersiveSpace(value: planet.id)
            }
        }
    }
}
```

## Options / Props

`OpenImmersiveSpaceAction` is callable in three ways:

| Call pattern | Description |
|---|---|
| `openImmersiveSpace(id:)` | Open by string identifier |
| `openImmersiveSpace(value:)` | Open by value; space must handle that type |
| `openImmersiveSpace(id:value:)` | Open by both identifier and value |

Returns `OpenImmersiveSpaceAction.Result` asynchronously. Fails if a space is already open.

## Notes

- visionOS 1.0+, macOS 26.0+.
- Only one immersive space can be open at a time; always `await` and check the result.
- Use lightweight data (IDs) as values, not full model objects.

## Related

- [dismissImmersiveSpace](./dismissimmersivespace.md)
- [ImmersiveSpace](./immersivespace.md)
