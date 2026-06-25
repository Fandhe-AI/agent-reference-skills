# ImmersionStyle

A protocol defining the styles available for an `ImmersiveSpace`. Use the static properties to configure immersion level.

## Signature / Usage

```swift
protocol ImmersionStyle
```

```swift
@main
struct SolarSystemApp: App {
    @State private var style: ImmersionStyle = .mixed

    var body: some Scene {
        ImmersiveSpace {
            SolarSystem()
        }
        .immersionStyle(selection: $style, in: .mixed, .progressive, .full)
    }
}
```

## Options / Props

| Style | Type | Description |
|-------|------|-------------|
| `.automatic` | `AutomaticImmersionStyle` | Platform-chosen default |
| `.mixed` | `MixedImmersionStyle` | Virtual content intermixed with passthrough video (default for `ImmersiveSpace`) |
| `.progressive` | `ProgressiveImmersionStyle` | Partially replaces passthrough; user-adjustable |
| `.full` | `FullImmersionStyle` | Completely replaces passthrough video |

`progressive(_:initialAmount:)` and `progressive(aspectRatio:)` allow fine-grained control.

## Notes

- visionOS 1.0+. Bind a `@State var style: ImmersionStyle` to `immersionStyle(selection:in:)` to allow runtime switching.
- In `.full` style, windows always render in front of immersive content.

## Related

- [ImmersiveSpace](./immersivespace.md)
