# AVCaptureDeviceDirectionCoordinator

An AVKit object that tracks the direction each camera faces in relation to one view, so an app on a multi-display device (iPhone Duo) can follow cameras as the device is opened, closed, or turned. Also covers `AVCaptureDeviceDirectionMap` and `AVCaptureDeviceDescriptor`.

## Signature / Usage

```swift
import AVKit

@MainActor
final class DirectionObserver {

    private var coordinator: AVCaptureDeviceDirectionCoordinator?

    func startObserving(previewView: UIView) {
        coordinator = AVCaptureDeviceDirectionCoordinator(
            view: previewView,
            deviceTypes: [.builtInOuterUltraWideCamera, .builtInInnerUltraWideCamera]
        ) { [weak self] deviceDirections in
            // Capture from the first camera that faces the person using the app.
            guard let descriptor = deviceDirections.forwardFacingDeviceDescriptors.first else { return }
            self?.selectCamera(with: descriptor)
        }
    }
}
```

## Options / Props

### AVCaptureDeviceDirectionCoordinator (class, iOS / iPadOS / Mac Catalyst 27.1+)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `init(view:deviceTypes:changeHandler:)` | `init(view: UIView, deviceTypes: [AVCaptureDevice.DeviceType], changeHandler: ((AVCaptureDeviceDirectionMap) -> Void)? = nil)` | `changeHandler`: `nil` | Creates a coordinator that reports camera direction in relation to `view`. Initialize only on the main actor |
| `deviceDirections` | `AVCaptureDeviceDirectionMap { get }` | — | Current direction of each monitored camera. Empty map until the change handler is first called |

### AVCaptureDeviceDirectionMap (class, iOS / iPadOS / Mac Catalyst 27.1+)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `forwardFacingDeviceDescriptors` | `[AVCaptureDeviceDescriptor]` | — | Cameras that face the same direction as the view (toward the person looking at it) |
| `backwardFacingDeviceDescriptors` | `[AVCaptureDeviceDescriptor]` | — | Cameras that face away from the view (toward the scene beyond it) |

### AVCaptureDeviceDescriptor (class, Sendable, iOS / iPadOS / Mac Catalyst 27.1+)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `uniqueID` | `String` | — | Identifier that uniquely identifies the device's camera |
| `localizedName` | `String` | — | Name suitable for display in the interface |
| `deviceType` | `AVCaptureDevice.DeviceType` | — | Kind of camera, such as wide-angle or telephoto |
| `mediaTypes` | `Set<AVMediaType>` | — | Kinds of media the camera captures |
| `position` | `AVCaptureDevice.Position` | — | Physical position of the camera on the device |

## Notes

- You do not create an `AVCaptureDeviceDirectionMap` directly. Either array can be empty when no camera is available or applicable for the current configuration.
- An `AVCaptureDeviceDescriptor` identifies a camera without being one; you do not create it directly.
- This is an AVKit class (`import AVKit`), not AVFoundation. Availability: iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+.
- Create the coordinator on the main actor; the handler runs on the main actor soon after creation, then on every change. The first call passes the starting configuration.
- Hold a strong reference to the coordinator as long as its view stays onscreen. The view is the frame of reference, not something the coordinator draws into.
- One coordinator per preview view: if the app shows a preview on more than one display, each coordinator reports direction relative to its own view, so the same camera can be forward facing to one and backward facing to the other.
- List every built-in camera the app captures from, including rear cameras (a rear camera can face the person after opening or closing the device). Only built-in types are reported; external, Continuity Camera, and Desk View cameras have no effect.
- Virtual front camera is left out because the system moves it for you. List the two physical front cameras, `.builtInOuterUltraWideCamera` and `.builtInInnerUltraWideCamera`, instead.
- `AVCaptureDevice.position` is a fixed hardware characteristic and does not describe direction; two cameras with different positions can face the same way. Use the coordinator for direction.
- Do not call AVFoundation from the change handler. Pass the descriptor to the actor that owns the capture session and resolve it there with `AVCaptureDevice(uniqueID:)`; handle a `nil` result because the set of cameras can change while dispatching.
- Decide preview mirroring from the direction map, not from `position`: set `automaticallyAdjustsVideoMirroring = false` on the connection before assigning `isVideoMirrored` (assigning while automatic adjustment is on raises an exception). Re-apply after each new map and after connecting a new device.
- Create a new `AVCaptureDevice.RotationCoordinator` each time you switch cameras.
- On a single-display iPhone, front cameras arrive in the forward-facing array and back cameras in the backward-facing array; cameras with unspecified position arrive in neither. Directions never change, so the handler fires once.
- Source article: Choosing a camera by the direction it faces (developer.apple.com/documentation/avkit/choosing-a-camera-by-the-direction-it-faces).

## Related

- [AVCaptureDevice](./avcapturedevice.md)
- [AVCaptureDevice.DiscoverySession](./avcapturedevice-discoverysession.md)
- [AVCaptureDeviceInput](./avcapturedeviceinput.md)
- [AVCaptureSession](./avcapturesession.md)
- [Camera capture accessory (iPhone Duo)](./camera-capture-accessory.md)
