# Point of Service (Windows.Devices.PointOfService)

Retail/hospitality peripheral APIs: `BarcodeScanner`, `MagneticStripeReader`, `PosPrinter` (with `ClaimedReceiptPrinter`/`ClaimedSlipPrinter`/`ClaimedJournalPrinter` stations), `CashDrawer`, and `LineDisplay`. All device types share the same create → claim → enable → use → release lifecycle, illustrated below with `BarcodeScanner`.

## Signature / Usage

```csharp
using Windows.Devices.PointOfService;

// 1. Create the device object (by default ID, or from an enumerated DeviceInformation.Id).
BarcodeScanner barcodeScanner = await BarcodeScanner.GetDefaultAsync();
// or: await BarcodeScanner.FromIdAsync(deviceInfo.Id);

if (barcodeScanner != null)
{
    // 2. Claim it for exclusive use.
    ClaimedBarcodeScanner claimedScanner = await barcodeScanner.ClaimScannerAsync();
    if (claimedScanner != null)
    {
        // Respond to another app's claim request so the OS doesn't revoke this one.
        claimedScanner.ReleaseDeviceRequested += (object sender, ClaimedBarcodeScanner myScanner) => myScanner.RetainDevice();

        // 3. Enable it for I/O.
        await claimedScanner.EnableAsync();

        // 4. Use it.
        claimedScanner.DataReceived += (sender, args) =>
        {
            // ScanDataLabel is an IBuffer; decode it via DataReader to get the string.
            var reader = Windows.Storage.Streams.DataReader.FromBuffer(args.Report.ScanDataLabel);
            string barcodeData = reader.ReadString(args.Report.ScanDataLabel.Length);
        };
    }
}
```

## Options / Props

| Device | Claim | Claimed type | Enable/Disable |
|------|-------------|-------------|-------------|
| `BarcodeScanner` | `ClaimScannerAsync()` | `ClaimedBarcodeScanner` | `EnableAsync()` / `DisableAsync()` |
| `MagneticStripeReader` | `ClaimReaderAsync()` | `ClaimedMagneticStripeReader` | `EnableAsync()` / `DisableAsync()` |
| `PosPrinter` | `ClaimPrinterAsync()` | `ClaimedPosPrinter` | `EnableAsync()` / `DisableAsync()` |
| `CashDrawer` | `ClaimDrawerAsync()` | `ClaimedCashDrawer` | `EnableAsync()` / `DisableAsync()` |
| `LineDisplay` | `ClaimAsync()` | `ClaimedLineDisplay` | Not applicable — enabling happens implicitly on I/O calls. |

### Key methods (common pattern)

| Name | Description |
|------|-------------|
| `<Device>.GetDefaultAsync()` | Gets the system default instance of the device type. |
| `<Device>.FromIdAsync(string)` | Creates the device object from a `DeviceInformation.Id` obtained via enumeration. |
| `<Device>.Claim*Async()` | Requests exclusive access; returns `null` on failure. |
| `Claimed<Device>.EnableAsync()` / `DisableAsync()` | Puts the claimed device into/out of an operational (I/O-capable) state. |
| `Claimed<Device>.RetainDevice()` | Called from `ReleaseDeviceRequested` to keep the claim when another app requests it. |
| `Claimed<Device>.Close()` | Releases the claim. |

### Events

| Name | Description |
|------|-------------|
| `Claimed<Device>.ReleaseDeviceRequested` | Raised when another app requests the claim; call `RetainDevice()` to keep it, otherwise the claim is revoked. |
| `ClaimedBarcodeScanner.DataReceived` | Raised when a barcode is scanned while enabled. |

## Notes

- Namespace: `Windows.Devices.PointOfService` (WinRT/UWP). Requires the `pointOfService` app capability in `Package.appxmanifest`.
- Claiming grants exclusive access but does **not** put the device in an operational state — `EnableAsync()` is still required before I/O (events fire, output methods succeed).
- Only one app at a time can hold a claim; if a second app requests the same device, the current holder gets `ReleaseDeviceRequested` and must call `RetainDevice()` immediately or lose the claim (also lost automatically if the app suspends and its device object is closed).
- Network- or Bluetooth-connected peripherals can be shared between multiple PCs rather than dedicated to one machine; see the official "Sharing peripherals with others" topic for the negotiation model.
- Named `PointOfService` in Windows APIs; distinct from Android's ML Kit `BarcodeScanner` / `BarcodeScanning` APIs (camera-based barcode detection), which is a different technology stack entirely.

## Related

- [DeviceInformation / DeviceInformation.FindAllAsync](./device-information.md)
- [DeviceWatcher / DeviceInformationKind / DeviceSelector](./device-watcher.md)
- [Printing (PrintManager / PrintDocument)](./printing.md)
