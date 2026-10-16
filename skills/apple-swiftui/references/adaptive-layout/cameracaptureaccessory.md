# CameraCaptureAccessory

A scene accessory that presents content during camera capture.

## Signature / Usage

```swift
struct CameraRootView: View {
    @State private var model = TeleprompterModel()

    var body: some View {
        CameraView(model: model)
            .sceneAccessory {
                CameraCaptureAccessory {
                    TeleprompterView(model: model)
                }
            }
    }
}
```

```swift
nonisolated struct CameraCaptureAccessory<Content> where Content : View

nonisolated init(@ContentBuilder content: @escaping () -> Content)
nonisolated init(isEnabled: Binding<Bool>, @ContentBuilder content: @escaping () -> Content)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `content` | `() -> Content` | The scene's content |
| `isEnabled` | `Binding<Bool>` | Binding for whether the accessory should present if available |

## Notes

- Available: iOS 27.1+, iPadOS 27.1+. The page metadata lists only these platforms, while the declaration platform list also includes Mac Catalyst; treat iOS / iPadOS 27.1 as the documented availability
- May be presented while the app is in the foreground with an active camera capture session. The system determines whether and where to present it
- Unlike `ExternalNonInteractiveAccessory`, the content can be interactive
- Conforms to `SceneAccessoryContent`; attach it with `sceneAccessory`
- This page covers the SwiftUI accessory only. AVFoundation capture on iPhone Duo is covered by the apple-media skill
- Source: https://developer.apple.com/documentation/swiftui/cameracaptureaccessory

## Related

- [ArrangementView](./arrangementview.md)
