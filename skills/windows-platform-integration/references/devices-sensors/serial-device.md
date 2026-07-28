# SerialDevice / Windows.Devices.SerialCommunication

Represents a serial port. Provides methods and properties to find serial ports and read/write data through `Windows.Storage.Streams` input/output streams.

## Signature / Usage

```csharp
using Windows.Devices.Enumeration;
using Windows.Devices.SerialCommunication;
using Windows.Storage.Streams;

DeviceInformationCollection infos = await DeviceInformation.FindAllAsync(SerialDevice.GetDeviceSelector());
SerialDevice serialDevice = await SerialDevice.FromIdAsync(infos[0].Id);

serialDevice.BaudRate = 9600;
serialDevice.DataBits = 8;
serialDevice.Parity = SerialParity.None;
serialDevice.StopBits = SerialStopBitCount.One;

var reader = new DataReader(serialDevice.InputStream);
var writer = new DataWriter(serialDevice.OutputStream);
writer.WriteByte(0x42);
await writer.StoreAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `BaudRate` | `uint` | Baud rate for the connection. |
| `DataBits` | `ushort` | Number of data bits per character (excludes parity/stop bits). |
| `Parity` | `SerialParity` | Parity bit for error checking. |
| `StopBits` | `SerialStopBitCount` | Number of stop bits per byte. |
| `PortName` | `string` | Serial port name (e.g. `COM3`). |
| `Handshake` | `SerialHandshake` | Flow-control handshaking protocol. |
| `ReadTimeout` / `WriteTimeout` | `TimeSpan` | Timeout for read/write operations. |
| `InputStream` / `OutputStream` | `IInputStream` / `IOutputStream` | Streams for reading/writing serial data. |
| `IsDataTerminalReadyEnabled` / `IsRequestToSendEnabled` | `bool` | DTR / RTS signal control. |
| `UsbVendorId` / `UsbProductId` | `ushort` | USB VID/PID when the port is a USB-to-serial device. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDeviceSelector()` | Gets an AQS string matching all serial devices. |
| `GetDeviceSelector(string portName)` | Gets an AQS string matching a serial device by port name. |
| `GetDeviceSelectorFromUsbVidPid(ushort, ushort)` | Gets an AQS string matching a USB-to-serial device by VID/PID. |
| `FromIdAsync(string)` | Creates a `SerialDevice` from a `DeviceInformation.Id`. |
| `Close()` / `Dispose()` | Releases the `SerialDevice` reference. |

### Events

| Name | Description |
|------|-------------|
| `ErrorReceived` | Raised when an error occurs on the serial port. |
| `PinChanged` | Raised when a signal/line state changes on the serial port. |

## Notes

- Namespace: `Windows.Devices.SerialCommunication` (WinRT/UWP). Requires the `serialCommunication` `DeviceCapability`, typically scoped to a VID/PID pair for USB-to-serial adapters. Distinct from Android `UsbSerialPort` (third-party) and Apple `IOKit` serial APIs.

## Related

- [UsbDevice](./usb-device.md)
- [Device capabilities manifest declarations](./device-capabilities-manifest.md)
