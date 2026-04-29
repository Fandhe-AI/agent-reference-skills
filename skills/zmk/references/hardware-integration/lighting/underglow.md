# RGB Underglow

Lighting system for RGB LED strips (e.g. WS2812). Configured at the board level because LED strip drivers rely on hardware-specific interfaces (SPI, I2S).

## Signature / Usage

### nRF52-Based Boards (SPI on `&spi3`)

```devicetree
&spi3 {
    compatible = "nordic,nrf-spim";
    status = "okay";
    pinctrl-0 = <&spi3_default>;
    pinctrl-1 = <&spi3_sleep>;
    pinctrl-names = "default", "sleep";

    led_strip: ws2812@0 {
        compatible = "worldsemi,ws2812-spi";
        reg = <0>;
        spi-max-frequency = <4000000>;
        chain-length = <10>;
        spi-one-frame = <0x70>;
        spi-zero-frame = <0x40>;
        color-mapping = <LED_COLOR_ID_GREEN
                         LED_COLOR_ID_RED
                         LED_COLOR_ID_BLUE>;
    };
};

/ {
    chosen {
        zmk,underglow = &led_strip;
    };
};
```

## Options / Props

### WS2812 SPI Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `compatible` | string | `"worldsemi,ws2812-spi"` |
| `chain-length` | int | Number of LEDs in the strip |
| `spi-max-frequency` | int | SPI clock, typically `4000000` |
| `spi-one-frame` | int | Bit pattern for logical `1` |
| `spi-zero-frame` | int | Bit pattern for logical `0` |
| `color-mapping` | array | LED color order (default: Green, Red, Blue) |

## Notes

- Shields requiring underglow should include a `boards/` directory with board-specific `.overlay` files.
- On nRF52, avoid low-frequency I/O pins — interference can degrade wireless performance.
- RP2040 boards may use PIO for SPI emulation; consult Zephyr docs and hardware datasheets.
- Other WS2812-compatible LED strips following the same protocol are also supported.

## Related

- [Lighting Overview](./overview.md)
- [Pinctrl](../pinctrl.md)
- [New Board](../new-board.md)
