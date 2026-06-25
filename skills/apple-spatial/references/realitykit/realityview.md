# RealityView

A SwiftUI view that hosts RealityKit 3D content.

## Signature / Usage

```swift
@MainActor @preconcurrency struct RealityView<Content> where Content: View

// visionOS — async make closure, optional update closure
RealityView { content in
    if let robot = try? await ModelEntity(named: "robot") {
        content.add(robot)
    }
} update: { content in
    // Called when SwiftUI state changes
}

// With attachments (visionOS)
RealityView { content, attachments in
    if let plate = attachments.entity(for: "label") {
        content.add(plate)
    }
} update: { _, _ in
} attachments: {
    Attachment(id: "label") {
        Text("Hello")
    }
}

// iOS / macOS — uses RealityViewCameraContent
RealityView { content in
    let box = ModelEntity(mesh: .generateBox(size: 0.1))
    content.add(box)
}
```

## Options / Props

| Parameter | Description |
|-----------|-------------|
| `make` | Async closure called once to build initial content |
| `update` | Optional closure called on every SwiftUI state change |
| `placeholder` | Optional view shown while `make` is executing |
| `attachments` | `@AttachmentContentBuilder` closure providing SwiftUI views as `Attachment` items |

## Notes

- Available: iOS 18.0+, iPadOS 18.0+, macOS 15.0+, Mac Catalyst 18.0+, tvOS 26.0+, visionOS 1.0+
- On visionOS, `make` receives `RealityViewContent`; on iOS/macOS, it receives `RealityViewCameraContent`.
- Avoid heavy work in `update`; it is called frequently.
- Use `System` for per-frame logic instead of the `update` closure.

## Related

- [Scene](./scene.md)
- [Entity](./entity.md)
- [ModelEntity](./modelentity.md)
- [System](./system.md)
