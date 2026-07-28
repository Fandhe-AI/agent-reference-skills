# Windows Studio Effects

Standardized, hardware-level AI camera and microphone effects (Background Blur, Eye Contact, Auto Framing, Voice Focus, Portrait Light, Creative Filters) that run on a device NPU and are exposed to apps as Kernel Streaming (KS) properties on the camera/microphone.

## Signature / Usage

```csharp
// Windows Studio Effects are applied at the driver/hardware level as KS properties.
// Apps interact with them indirectly through camera KS properties (e.g. via
// VideoDeviceController.GetDeviceProperty/SetDeviceProperty) or by deep-linking
// to Camera Settings for the user to configure.

string symlink = mediaCapture.VideoDeviceController.Id; // or DeviceInformation.Id

await Windows.System.Launcher.LaunchUriAsync(
    new Uri("ms-settings:camera?cameraId=" + Uri.EscapeDataString(symlink)));
```

## Options / Props

| Effect | Applies to | Description |
|--------|-----------|-------------|
| Background Blur (Standard / Portrait) | Camera | Blurs the background behind the subject. |
| Eye Contact (Standard / Teleprompter) | Camera | Corrects the user's gaze toward the camera lens. |
| Automatic Framing | Camera | Detects and crops/zooms to keep the subject framed. |
| Portrait Light | Camera | Improves subject lighting in poorly lit environments. |
| Creative Filters | Camera | Stylized video filters. |
| Voice Focus | Microphone | Filters background noise from the microphone signal. |

## Notes

- Namespace: no dedicated WinRT namespace — Windows Studio Effects are exposed as Kernel Streaming (KS) properties on the camera/microphone driver, queried/set through `Windows.Media.Devices.VideoDeviceController` device property APIs or configured by the user via **Settings > Bluetooth & devices > Cameras**.
- Requires Windows 11 version 22H2+ (build 22623.885 or later) and a device with a supported NPU whose OEM has opted in and installed the Windows Studio Effects driver.
- Effects are applied at the hardware/driver level once enabled, so they affect the camera/microphone stream for every app using it, even apps unaware of Windows Studio Effects.
- If an app implements its own equivalent effect (e.g. in-app background blur), check for the corresponding KS property to avoid double-applying the effect (e.g. double blur) — see the official sample at the `microsoft/Windows-Camera` GitHub repository (`Samples/WindowsStudio`) for KS property names and access patterns.
- Deep link to per-camera settings with `ms-settings:camera?cameraId=<symbolic link, URI-escaped>`; the general Camera Settings page is `ms-settings:camera`.

## Related

- [MediaCapture](./media-capture.md)
- [VideoDeviceController](./video-device-controller.md)
