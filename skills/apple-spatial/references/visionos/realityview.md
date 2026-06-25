# RealityView

A SwiftUI view that hosts RealityKit content, including entities authored in Reality Composer Pro.

## Signature / Usage

```swift
@MainActor @preconcurrency
struct RealityView<Content> where Content: View
```

```swift
struct ModelExample: View {
    var body: some View {
        RealityView { content in
            if let robot = try? await ModelEntity(named: "robot") {
                content.add(robot)
            }
        }
    }
}
```

With an update closure and placeholder:

```swift
RealityView { content in
    content.add(try await ModelEntity(named: "robot"))
} update: { content in
    // called when SwiftUI state affecting the view changes
} placeholder: {
    ProgressView()
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(make:update:)` | Basic; optional update closure |
| `init(make:update:placeholder:)` | With placeholder shown while `make` loads |
| `init(make:update:attachments:)` | With SwiftUI attachment views anchored to entities |
| `init(make:update:placeholder:attachments:)` | Full variant with attachments and placeholder |

- `make` closure is `async`; use `try await` to load assets from the bundle or a URL.
- `update` closure is called whenever relevant SwiftUI state changes.
- `RealityViewContent` (visionOS) / `RealityViewCameraContent` (iOS/macOS) is passed to both closures.

## Notes

- visionOS 1.0+; iOS 18.0+; macOS 15.0+.
- Has flexible size by default — it does not size itself based on RealityKit content bounds.
- Use `RealityViewLayoutOption` to control frame sizing and alignment.

## Related

- [Model3D](./model3d.md)
- [ImmersiveSpace](./immersivespace.md)
