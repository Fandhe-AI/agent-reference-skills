# Camera Capabilities and Privacy

Declaring the `webcam` and `microphone` app capabilities in the package manifest, and handling the Windows camera/microphone privacy setting for apps that use `MediaCapture` programmatically.

## Signature / Usage

```xml
<Package ...>
  <Capabilities>
    <DeviceCapability Name="webcam" />
    <DeviceCapability Name="microphone" />
  </Capabilities>
</Package>
```

```csharp
using Windows.Security.Authorization.AppCapabilityAccess;

var status = AppCapability.Create("Webcam").CheckAccess();

if (status != AppCapabilityAccessStatus.Allowed)
{
    await Windows.System.Launcher.LaunchUriAsync(new Uri("ms-settings:privacy-webcam"));
}
```

```csharp
try
{
    await mediaCapture.InitializeAsync(settings);
}
catch (UnauthorizedAccessException ex) when (ex.HResult == -2147024891) // E_ACCESSDENIED
{
    // direct user to ms-settings:privacy-webcam
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `webcam` | manifest `DeviceCapability` | Required for programmatic camera access via `MediaCapture`. Must NOT be declared when using `CameraCaptureUI`. |
| `microphone` | manifest `DeviceCapability` | Required for programmatic microphone access via `MediaCapture`. Must NOT be declared when using `CameraCaptureUI`. |
| `AppCapability.Create("Webcam").CheckAccess()` | `AppCapabilityAccessStatus` | Checks whether the app currently has camera access before initializing. |

## Notes

- Namespace: `Windows.Security.Authorization.AppCapabilityAccess` (WinRT), package manifest `Capabilities` element.
- Windows lets users grant/deny camera access globally, for all unpackaged apps, or per packaged app, under **Settings > Privacy & Security > Camera**. The equivalent URI for microphone is `ms-settings:privacy-microphone`.
- If access is denied, `MediaCapture.InitializeAsync` throws `UnauthorizedAccessException` with HRESULT `E_ACCESSDENIED` (`0x80070005`). Apps should catch this, direct the user to the privacy settings page, and retry initialization, or fall back to alternate functionality.
- `CameraCaptureUI` apps should NOT declare `webcam`/`microphone` capabilities — see the `CameraCaptureUI` page for details.

## Related

- [MediaCapture](./media-capture.md)
- [CameraCaptureUI](./camera-capture-ui.md)
