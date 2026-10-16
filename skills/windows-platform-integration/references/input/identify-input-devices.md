# Identify input devices (KeyboardCapabilities / MouseCapabilities / TouchCapabilities / PointerDevice)

Identify the input devices connected to a Windows app device and read their capabilities and attributes with the `Windows.Devices.Input` classes.

## Signature / Usage

```csharp
private void GetMouseProperties()
{
    MouseCapabilities mouseCapabilities = new Windows.Devices.Input.MouseCapabilities();
    MousePresent.Text = mouseCapabilities.MousePresent != 0 ? "Yes" : "No";
    VertWheel.Text = mouseCapabilities.VerticalWheelPresent != 0 ? "Yes" : "No";
    HorzWheel.Text = mouseCapabilities.HorizontalWheelPresent != 0 ? "Yes" : "No";
    SwappedButtons.Text = mouseCapabilities.SwapButtons != 0 ? "Yes" : "No";
    NumButtons.Text = mouseCapabilities.NumberOfButtons.ToString();
}
```

Keyboard, touch, and pointer devices follow the same pattern:

```csharp
KeyboardCapabilities keyboardCapabilities = new Windows.Devices.Input.KeyboardCapabilities();
bool keyboard = keyboardCapabilities.KeyboardPresent != 0;

TouchCapabilities touchCapabilities = new Windows.Devices.Input.TouchCapabilities();
bool touch = touchCapabilities.TouchPresent != 0;
uint contacts = touchCapabilities.Contacts;

IReadOnlyList<PointerDevice> pointerDevices = Windows.Devices.Input.PointerDevice.GetPointerDevices();
```

## Options / Props

| Class | Member | Description |
|-------|--------|-------------|
| `MouseCapabilities` | `MousePresent` | Non-zero if at least one mouse is detected. |
| `MouseCapabilities` | `VerticalWheelPresent` / `HorizontalWheelPresent` | Non-zero if a mouse has a vertical / horizontal wheel. |
| `MouseCapabilities` | `SwapButtons` | Non-zero if mouse buttons are swapped. |
| `MouseCapabilities` | `NumberOfButtons` | Maximum number of buttons exposed by any one mouse. |
| `KeyboardCapabilities` | `KeyboardPresent` | Non-zero if a keyboard is connected. |
| `TouchCapabilities` | `TouchPresent` | Non-zero if a touch digitizer is connected. |
| `TouchCapabilities` | `Contacts` | Maximum number of simultaneous contacts exposed by any one digitizer. |
| `PointerDevice` | `PointerDevice.GetPointerDevices()` | Static; returns `IReadOnlyList<PointerDevice>` of detected pointer devices (touch, touchpad, mouse, pen). |
| `PointerDevice` | `PointerDeviceType` | Device type of the pointer device. |
| `PointerDevice` | `IsIntegrated` | Whether the device is integrated. |
| `PointerDevice` | `MaxContacts` | Maximum contacts supported. |
| `PointerDevice` | `PhysicalDeviceRect` / `ScreenRect` | Physical device and screen rectangles (`X`, `Y`, `Width`, `Height`). |

## Notes

- Namespace: `Windows.Devices.Input`. Important APIs listed by the source: `Windows.Devices.Input`, `Microsoft.UI.Input`, `Microsoft.UI.Xaml.Input`.
- Values reflect all detected devices of that kind: Boolean properties return non-zero if at least one device supports the capability; numeric properties return the maximum value exposed by any one device.
- In the source sample, the "Is External?" label is bound to `IsIntegrated`.

## Related

- [Pointer input](./pointer-input.md)
- [Keyboard input](./keyboard-input.md)
- [Pen and Windows Ink](./pen-and-ink.md)
