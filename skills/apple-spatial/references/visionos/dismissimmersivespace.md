# dismissImmersiveSpace

An environment action that dismisses the currently active immersive space. Accessed via `@Environment(\.dismissImmersiveSpace)`.

## Signature / Usage

```swift
var dismissImmersiveSpace: DismissImmersiveSpaceAction { get }
```

```swift
struct DismissImmersiveSpaceButton: View {
    @Environment(\.dismissImmersiveSpace) private var dismissImmersiveSpace

    var body: some View {
        Button("Dismiss") {
            Task {
                await dismissImmersiveSpace()
            }
        }
    }
}
```

`DismissImmersiveSpaceAction.callAsFunction()` is async; the call returns after the system finishes dismissing the space.

## Notes

- visionOS 1.0+, macOS 26.0+.
- No parameters needed; only one space can be open at a time, so the target is unambiguous.
- On macOS, also dismisses `RemoteImmersiveSpace` declarations.

## Related

- [openImmersiveSpace](./openimmersivespace.md)
- [ImmersiveSpace](./immersivespace.md)
