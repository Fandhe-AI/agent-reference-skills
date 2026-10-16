# Connect to remote cameras

Watch for network cameras with a `DeviceWatcher` and obtain a `MediaFrameSourceGroup` for each, so frames can be read with `MediaFrameReader`. Available starting with Windows 10, version 1903.

## Signature / Usage

```csharp
// AQS string for network camera devices (from the article)
string aqs = @"System.Devices.InterfaceClassGuid:=""{B8238652-B500-41EB-B4F3-4234F7F5AE99}"" AND System.Devices.InterfaceEnabled:=System.StructuredQueryType.Boolean#True";

DeviceWatcher watcher = DeviceInformation.CreateWatcher(aqs);
// Added gives a DeviceInformation, Removed gives a DeviceInformationUpdate; both have an Id
// In Added: MediaFrameSourceGroup group = await MediaFrameSourceGroup.FromIdAsync(info.Id);
watcher.Start();
// ...
watcher.Stop();
```

## Notes

- Available starting with Windows 10, version 1903.
- `DeviceWatcher.Start` raises `Added` for every network camera currently available; until `Stop` is called, `Added` fires for new cameras and `Removed` when a camera becomes unavailable.
- `MediaFrameSourceGroup.GetDeviceSelector` returns an AQS string covering both locally connected and remote network cameras. To monitor only network cameras, use the AQS string above.
- The article's helper class updates an `ObservableCollection` of `MediaFrameSourceGroup` objects for data binding, on the UI thread via the app's `DispatcherQueue` (`Microsoft.UI.Dispatching`). It also handles `DeviceWatcher.Updated` by removing the camera and adding it back. Typical apps wrap the group in a custom model class.
- For pairing with devices, see the "Pair devices" article in the official docs.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/camera/connect-to-remote-cameras (ms.date 10/10/2024).

## Related

- [MediaFrameSourceGroup](./media-frame-source-group.md)
- [MediaFrameReader](./media-frame-reader.md)
- [Device enumeration](./device-enumeration.md)
