# Lighting Overview

ZMK supports two LED lighting systems (underglow and backlight) and one HID state indicator system. The physical LED location does not determine which system to use — choose based on LED hardware type.

## Signature / Usage

Three lighting systems are available:

| System | Description |
|--------|-------------|
| [RGB Underglow](./underglow.md) | Controls strips of RGB LEDs (e.g. WS2812) |
| [Backlight](./backlight.md) | Controls arrays of single-color LEDs via PWM |
| [LED Indicators](./led-indicators.md) | Indicates HID states (Caps Lock, Num Lock, etc.) |

## Notes

- The names "underglow" and "backlight" do **not** imply physical position — selection is based on the LED hardware type and driver support.
- Underglow (LED strip drivers) relies on hardware-specific interfaces (SPI, I2S) and must be configured at the board level.
- Backlight uses PWM-driven single-color LEDs.
- LED Indicators map HID specification states to individual LEDs.

## Related

- [Underglow](./underglow.md)
- [Backlight](./backlight.md)
- [LED Indicators](./led-indicators.md)
- [Pinctrl](../pinctrl.md)
