# UISceneAccessory

A type which can be used to register for a specific type of scene accessory presentation.

## Signature / Usage

```swift
@MainActor
class UISceneAccessory
```

Register an external non-interactive accessory on a view controller:

```swift
class PlayerViewController: UIViewController {
    var displayRegistration: UISceneAccessoryRegistration?

    override func viewDidLoad() {
        super.viewDidLoad()

        // Describe the scene to present, including the delegate that attaches its window.
        let configuration = UISceneConfiguration()
        configuration.delegateClass = ExternalDisplaySceneDelegate.self

        // Register the accessory so the system can present this content on an external display.
        let accessory = UISceneAccessory.externalNonInteractive(sceneConfiguration: configuration)
        displayRegistration = registerSceneAccessory(accessory)
    }
}
```

## Options / Props

| Symbol | Signature | Availability |
|--------|-----------|--------------|
| `UISceneAccessory` | `class UISceneAccessory` | iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+ |
| `externalNonInteractive(sceneConfiguration:)` | `class func externalNonInteractive(sceneConfiguration: UISceneConfiguration) -> Self` | 27.0+ |
| `externalNonInteractive(sceneConfiguration:userInfo:)` | `class func externalNonInteractive(sceneConfiguration: UISceneConfiguration, userInfo: Any) -> Self` | 27.0+ |
| `cameraCapture(sceneConfiguration:)` | `class func cameraCapture(sceneConfiguration: UISceneConfiguration) -> Self` | 27.1+ |
| `cameraCapture(sceneConfiguration:userInfo:)` | `class func cameraCapture(sceneConfiguration: UISceneConfiguration, userInfo: Any) -> Self` | 27.1+ |
| `UISceneAccessoryRegistration` | `class UISceneAccessoryRegistration` (`isAvailable: Bool`, `isEnabled: Bool`) | 27.0+ |
| `UIViewController.registerSceneAccessory(_:)` | `func registerSceneAccessory(_: UISceneAccessory) -> UISceneAccessoryRegistration` | 27.0+ |
| `UIViewController.unregisterSceneAccessory(_:)` | `func unregisterSceneAccessory(_: UISceneAccessoryRegistration)` | 27.0+ |
| `UISceneSession.Role.windowCameraCaptureAccessory` | `UIWindowSceneSessionRoleCameraCaptureAccessory` (Objective-C `extern UISceneSessionRole const`) | 27.1+ |

## Notes

- A scene accessory declares supplementary content that the system presents on the app's behalf when associated system functionality becomes available, for example when an external display is connected. The app declares what content to provide; the system decides when and where to present it. The app must remain fully functional without accessories.
- `sceneConfiguration` is a scene configuration value with a delegate type defined for it. `userInfo` passes additional context to the scene delegate upon connection.
- `registerSceneAccessory(_:)`: the delegate type the configuration defines is called for all life-cycle events associated with the accessory. The returned registration can be used to monitor changes or to unregister.
- `unregisterSceneAccessory(_:)`: if the accessory for the registration is currently being presented, it is dismissed.
- `UISceneAccessoryRegistration.isAvailable`: whether the accessory is available for display by the system. `isEnabled`: whether the content defined by the accessory should be displayed. Registration instances allow observing availability and controlling whether the content is displayed.
- `cameraCapture`: content may be presented while the app is in the foreground and has an active camera capture session. The system determines whether and where to present it; the content can be interactive. 27.1+ only (not 27.0).
- `UISceneSession.Role.windowCameraCaptureAccessory` (27.1+): assigned automatically by the system to scenes created from a camera capture scene accessory registration; clients do not set it directly.
- Supported on iOS, iPadOS and Mac Catalyst only. Starting in iOS 27 the external display (`windowExternalDisplayNonInteractive`) scene is received only after registering an `externalNonInteractive` accessory.
- Source: https://developer.apple.com/documentation/uikit/uisceneaccessory

## Related

- [Transitioning to the UIKit Scene-Based Life Cycle](./scene-based-life-cycle.md)
- [UIWindowScene](./uiwindowscene.md)
- [UIViewController](./uiviewcontroller.md)
