# Camera profiles (MediaCaptureVideoProfile)

Camera profiles let you discover and select the exact combination of resolution, frame rate, HDR support, and simultaneous multi-camera capability a device supports before initializing `MediaCapture`, instead of trial-and-error configuration. A profile is represented by a `MediaCaptureVideoProfile` object, which groups supported `MediaCaptureVideoProfileMediaDescription` entries for photo, video-record, and preview streams.

## Signature / Usage

```csharp
// 1. Confirm the device supports video profiles
DeviceInformationCollection devices = await DeviceInformation.FindAllAsync(DeviceClass.VideoCapture);
string videoDeviceId = devices.FirstOrDefault(d => MediaCapture.IsVideoProfileSupported(d.Id))?.Id;

// 2. Find a profile matching a desired resolution/frame rate
IReadOnlyList<MediaCaptureVideoProfile> profiles = MediaCapture.FindAllVideoProfiles(videoDeviceId);

var match = (from profile in profiles
             from desc in profile.SupportedRecordMediaDescription
             where desc.Width == 640 && desc.Height == 480 && Math.Round(desc.FrameRate) == 30
             select new { profile, desc }).FirstOrDefault();

var settings = new MediaCaptureInitializationSettings { VideoDeviceId = videoDeviceId };
if (match != null)
{
    settings.VideoProfile = match.profile;
    settings.RecordMediaDescription = match.desc;
}
else
{
    settings.VideoProfile = profiles[0];
}

await mediaCapture.InitializeAsync(settings);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MediaCapture.IsVideoProfileSupported(String)` | static method | Returns whether the video capture device with the given `DeviceInformation.Id` supports camera profiles. |
| `MediaCapture.FindAllVideoProfiles(String)` | static method → `IReadOnlyList<MediaCaptureVideoProfile>` | Lists all camera profiles supported by the given device. |
| `MediaCapture.FindKnownVideoProfiles(String, KnownVideoProfile)` | static method → `IReadOnlyList<MediaCaptureVideoProfile>` | Lists profiles for a device (or `MediaFrameSourceGroup.Id`) that support a well-known scenario (e.g. `HighQualityPhoto`, `BalancedVideoAndPhoto`, HDR, variable photo sequence). |
| `MediaCaptureVideoProfile.SupportedRecordMediaDescription` | `IReadOnlyList<MediaCaptureVideoProfileMediaDescription>` | Media descriptions supported for video recording. |
| `MediaCaptureVideoProfile.SupportedPhotoMediaDescription` | `IReadOnlyList<MediaCaptureVideoProfileMediaDescription>` | Media descriptions supported for photo capture. |
| `MediaCaptureVideoProfileMediaDescription.Width` / `.Height` / `.FrameRate` | numeric properties | The resolution and frame rate described by this entry. |
| `MediaCaptureInitializationSettings.VideoProfile` | `MediaCaptureVideoProfile` | The selected profile, assigned before calling `InitializeAsync`. |
| `MediaCaptureInitializationSettings.RecordMediaDescription` / `PhotoMediaDescription` | `MediaCaptureVideoProfileMediaDescription` | The specific media description within the profile to use. |

## Notes

- Namespace: `Windows.Media.Capture` (WinRT).
- A profile that has at least one entry in both `SupportedPhotoMediaDescription` and `SupportedRecordMediaDescription` supports simultaneous photo and video capture.
- `MediaFrameSourceGroup` (used for multi-camera/depth scenarios, see `MediaCaptureInitializationSettings.SourceGroup`) can also be queried with `MediaCapture.FindKnownVideoProfiles(sourceGroup.Id, ...)` to select a profile before initializing `MediaCapture`.
- If no device on the target panel supports video profiles, initialize `MediaCapture` without a profile instead.

## Related

- [MediaCaptureInitializationSettings](./media-capture-initialization-settings.md)
- [MediaFrameSourceGroup and MediaFrameReader](./media-frame-reader.md)
- [Camera device enumeration](./device-enumeration.md)
