# Camera capture accessory (iPhone Duo)

Provide content to the person in front of the camera (for example a teleprompter on the outer display) by registering a scene accessory alongside the capture interface. The system decides whether and where to present it.

## Signature / Usage

```swift
struct CameraView: View {

    @State private var script = ScriptModel()

    var body: some View {
        CameraPreview()
            .sceneAccessory {
                CameraCaptureAccessory {
                    ScriptView(model: script)
                }
            }
    }
}
```

UIKit:

```swift
let accessory = UISceneAccessory.cameraCapture(sceneConfiguration: configuration,
                                               userInfo: script)
registration = registerSceneAccessory(accessory)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CameraCaptureAccessory` (SwiftUI, iOS / iPadOS 27.1+) | `nonisolated struct CameraCaptureAccessory<Content> where Content : View` | — | Scene accessory presenting content during camera capture; content can be interactive. Initializers: `init(content:)`, `init(isEnabled:content:)` (binding for programmatic enablement) |
| `sceneAccessory(content:)` (iOS / iPadOS 27.0+) | `nonisolated func sceneAccessory<C>(@ContentBuilder content: () -> C) -> some View where C : SceneAccessoryContent` | — | Defines scene accessories associated with a view |
| `onAvailabilityChange(perform:)` | modifier on `SceneAccessoryContent` | — | Observes system-determined availability |
| `UISceneAccessory` (UIKit, iOS / iPadOS / Mac Catalyst 27.0+) | `@MainActor class UISceneAccessory` | — | Declares content the system presents when system functionality becomes available |
| `UISceneAccessory.cameraCapture(sceneConfiguration:userInfo:)` (27.1+) | `class func cameraCapture(sceneConfiguration: UISceneConfiguration, userInfo: Any) -> Self` | — | Camera capture accessory; `userInfo` is passed to the scene delegate. A variant `cameraCapture(sceneConfiguration:)` without `userInfo` also exists |
| `registerSceneAccessory(_:)` (UIViewController, 27.0+) | `func registerSceneAccessory(_ accessory: UISceneAccessory) -> UISceneAccessoryRegistration` | — | Registers the accessory on the view controller that shows the capture interface |
| `unregisterSceneAccessory(_:)` | UIViewController method | — | Call when the app stops offering the content, rather than hiding it |
| `UISceneAccessoryRegistration` (27.0+) | `@MainActor class` | Hold a strong reference. `isAvailable`: whether the system can present the content (set only by the system). `isEnabled`: whether the content should be displayed (on by default) |
| `connectionOptions.sceneAccessoryUserInfo` | `UIScene.ConnectionOptions` property | Read the `userInfo` object in `scene(_:willConnectTo:options:)` of the accessory's scene delegate |
| `UISceneSession.Role.windowCameraCaptureAccessory` (27.1+) | `static let windowCameraCaptureAccessory: UISceneSession.Role` | Role the system assigns to the accessory's scene; compare against it to identify this scene kind |

## Notes

- UIKit path (summary): create `UISceneAccessory.cameraCapture(sceneConfiguration:userInfo:)` with a `UISceneConfiguration` whose `delegateClass` is your scene delegate, pass it to `registerSceneAccessory(_:)`, keep the returned `UISceneAccessoryRegistration`, and read `isAvailable` (e.g. in `updateProperties()`) or set `isEnabled`.
- Camera capture accessory APIs (`CameraCaptureAccessory`, `cameraCapture(sceneConfiguration:userInfo:)`, `windowCameraCaptureAccessory`) are iOS 27.1+; the generic `sceneAccessory` / `UISceneAccessory` / `registerSceneAccessory` APIs are 27.0+.
- The system decides presentation: only while the app is in the foreground with an active capture session and the device open (capture interface on the inner display). Treat the content as an enhancement; the app must work with no outer display.
- Declare a kind of content only; pass no display, capture session, or camera reference. The system finds the active capture session itself.
- Register on the same view / view controller that shows the capture interface; content is presented only while it is onscreen. The system presents the top-most registration of a kind, so navigating to a view that registers its own content makes the previous one unavailable.
- Availability also follows the device and session: content goes away when capture stops, the app leaves the foreground, or the device is folded closed.
- Keep interaction minimal and all essential controls in the capture interface; the system can withdraw accessory content at any time.
- Share state by giving the accessory content the same model object as the capture interface (SwiftUI closure capture, or `userInfo` in UIKit). Keep a strong reference to the object; `userInfo` is not storage.
- A scene manifest entry for an accessory scene has no effect; accessory scenes have no project-level configuration. The system assigns the session role, never set it.
- Turning content off via `isEnabled` does not say anything about availability.
- Simulator has no camera; test on device.
- General SwiftUI / UIKit scene APIs belong to the apple-swiftui and apple-uikit skills.
- Source: developer.apple.com/documentation/avfoundation/registering-a-camera-capture-accessory-on-iphone-duo

## Related

- [AVCaptureSession](./avcapturesession.md)
- [AVCaptureDeviceDirectionCoordinator](./avcapturedevicedirectioncoordinator.md)
