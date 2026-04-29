# Lighting

ZMK supports two independent lighting systems: RGB Underglow (addressable RGB LEDs) and Backlight (single-color parallel LEDs). The choice between them depends on the LED driver, not the physical LED position.

## Signature / Usage

```kconfig
# RGB Underglow
CONFIG_ZMK_RGB_UNDERGLOW=y

# Backlight
CONFIG_ZMK_BACKLIGHT=y
```

```dts
/* Set number of LEDs in the RGB strip */
&led_strip {
    chain-length = <21>;
};
```

## Options / Props

| Name | Description |
|------|-------------|
| `CONFIG_ZMK_RGB_UNDERGLOW` | Enables RGB underglow support |
| `CONFIG_ZMK_BACKLIGHT` | Enables single-color backlight support |
| `chain-length` | Devicetree property — number of LEDs in the RGB strip |

## Notes

- Supported RGB LED families: WS2812, APA102, LPD880x.
- For split keyboards, set `chain-length` to the LED count per half, not the total.
- Backlight cannot control individual LED brightness; all LEDs share the same power level.
- Full configuration options are documented at `/docs/config/lighting`.

## Related

- [config/lighting](../config/lighting.md)
- [led-indicators](./led-indicators.md)
