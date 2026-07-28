# MediaFrameSourceGroup

Represents a group of media frame sources (e.g. color, depth, infrared) that can be used simultaneously by a `MediaCapture` object.

## Signature / Usage

```csharp
public sealed class MediaFrameSourceGroup
```

```csharp
var groups = await MediaFrameSourceGroup.FindAllAsync();
var group = groups.FirstOrDefault(g => g.SourceInfos.Any(
    info => info.SourceKind == MediaFrameSourceKind.Depth));

var settings = new MediaCaptureInitializationSettings
{
    SourceGroup = group,
    SharingMode = MediaCaptureSharingMode.ExclusiveControl,
    MemoryPreference = MediaCaptureMemoryPreference.Cpu,
    StreamingCaptureMode = StreamingCaptureMode.Video
};

await mediaCapture.InitializeAsync(settings);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DisplayName` | `String` | Human-readable name for the group. |
| `Id` | `String` | Unique identifier for the group. |
| `SourceInfos` | `IVectorView<MediaFrameSourceInfo>` | Describes each media frame source in the group (its `SourceKind`: `Color`, `Depth`, `Infrared`, etc). |

## Methods

| Name | Description |
|------|-------------|
| `FindAllAsync()` (static) | Asynchronously retrieves all available media frame source groups on the current device. |
| `FromIdAsync(String)` (static) | Asynchronously gets the group with the specified ID. |
| `GetDeviceSelector()` | Gets a device selector string usable with `DeviceWatcher` to detect changes in available groups. |

## Notes

- Namespace: `Windows.Media.Capture.Frames` (WinRT).
- Assign the selected group to `MediaCaptureInitializationSettings.SourceGroup` and pass it to `MediaCapture.InitializeAsync` to enable simultaneous access to multiple frame sources (e.g. RGB + depth + infrared) from a single camera.

## Related

- [MediaFrameReader](./media-frame-reader.md)
- [MediaCaptureInitializationSettings](./media-capture-initialization-settings.md)
