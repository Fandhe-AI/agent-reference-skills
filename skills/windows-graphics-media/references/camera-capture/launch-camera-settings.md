# Launch the camera settings page

Launch Windows Settings directly to the camera settings page with the `ms-settings:camera` URI, optionally targeting a specific camera via the `cameraId` query parameter.

## Signature / Usage

```csharp
// Outline assembled from the API names in the article (the article's full listing is a code include)
// 1. DeviceInformation is used to get the symbolic link name (Id) of the first video capture device
// 2. Escape it with Uri.EscapeDataString and append it as cameraId
var uri = new Uri("ms-settings:camera?cameraId=" + Uri.EscapeDataString(cameraSymbolicLinkName));
await Windows.System.Launcher.LaunchUriAsync(uri);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ms-settings:camera` | URI | Opens the camera settings page in Windows Settings. |
| `cameraId` | query string parameter | Symbolic link name of a camera, in escaped URI format; opens the settings page for that camera. |

## Notes

- Starting with Windows 11, Build 22000, `ms-settings:camera` navigates to the camera settings page. In previous versions of Windows, the same URI launched the default camera application.
- Launch is performed with `Launcher.LaunchUriAsync`.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/camera/launch-camera-settings

## Related

- [Device enumeration](./device-enumeration.md)
- [Camera capabilities and privacy](./camera-capabilities-privacy.md)
