# ImageScanner

Represents a locally-attached document/image scanner (installed via a Windows Image Acquisition (WIA) driver), and drives flatbed, feeder, or auto-configured scans to a folder or stream. Pairs with `printing.md`'s document-printing coverage as the scan-side counterpart.

## Signature / Usage

```csharp
using Windows.Devices.Enumeration;
using Windows.Devices.Scanners;
using Windows.Storage;

// Enumerate/pick a scanner via DeviceInformation, filtered to DeviceClass.ImageScanner.
DeviceInformation scannerDeviceInfo = /* from FindAllAsync(DeviceClass.ImageScanner) or DevicePicker */;
ImageScanner scanner = await ImageScanner.FromIdAsync(scannerDeviceInfo.Id);

StorageFolder folder = await KnownFolders.PicturesLibrary.CreateFolderAsync(
    "Scans", CreationCollisionOption.OpenIfExists);

if (scanner.IsScanSourceSupported(ImageScannerScanSource.AutoConfigured))
{
    ImageScannerScanResult result = await scanner.ScanFilesToFolderAsync(
        ImageScannerScanSource.AutoConfigured, folder);
}
else
{
    ImageScannerScanResult result = await scanner.ScanFilesToFolderAsync(
        ImageScannerScanSource.Default, folder);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DefaultScanSource` | `ImageScannerScanSource` | The scanner's default scan source; equivalent to passing `ImageScannerScanSource.Default`. |
| `FlatbedConfiguration` | `ImageScannerFlatbedConfiguration` | Settings for the flatbed scan source. |
| `FeederConfiguration` | `ImageScannerFeederConfiguration` | Settings for the document-feeder scan source. |
| `AutoConfiguration` | `ImageScannerAutoConfiguration` | Settings for the auto-configured scan source. |

### ImageScannerScanSource values

| Value | Meaning |
|------|-------------|
| `Default` | The scanner's own default source. |
| `Flatbed` | Flatbed glass. |
| `Feeder` | Document feeder (ADF). |
| `AutoConfigured` | Device chooses optimal settings (color mode, resolution) per job; requires the device to support it and to not have both flatbed and feeder present. |

### Key methods

| Name | Description |
|------|-------------|
| `FromIdAsync(string)` | Creates an `ImageScanner` from a `DeviceInformation.Id`. |
| `IsScanSourceSupported(ImageScannerScanSource)` | Checks whether a given scan source is available on this device. |
| `IsPreviewSupported(ImageScannerScanSource)` | Checks whether a preview scan is supported for a given source. |
| `ScanFilesToFolderAsync(ImageScannerScanSource, StorageFolder)` | Performs a scan and writes the resulting file(s) into the destination folder. |
| `ScanPreviewToStreamAsync(ImageScannerScanSource, IRandomAccessStream)` | Performs a low-resolution preview scan into a stream for UI display before committing to a full scan. |

## Notes

- Namespace: `Windows.Devices.Scanners` (WinRT/UWP), used together with `Windows.Devices.Enumeration` (`DeviceInformation`, `DeviceClass.ImageScanner`, `DevicePicker`) for device discovery.
- Only scanners with a locally-installed WIA driver are enumerable/usable through this API.
- Scanning to the Pictures library requires declaring the *Pictures Library* capability in the app manifest; scanning to an arbitrary user-picked folder via `FolderPicker` does not.
- Always check `IsScanSourceSupported`/`IsPreviewSupported` before using a non-`Default` source or requesting a preview — not all scanners support every source or preview scanning.

## Related

- [Printing (PrintManager / PrintDocument)](./printing.md)
- [DeviceInformation / DeviceInformation.FindAllAsync](./device-information.md)
- [DeviceWatcher / DeviceInformationKind / DeviceSelector](./device-watcher.md)
