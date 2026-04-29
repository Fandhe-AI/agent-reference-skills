# Pin Control (pinctrl)

Configuration of MCU pins for advanced peripherals (displays, shift registers) that use SPI, I2C, or UART. Always defined for a board, never for a shield directly.

## Signature / Usage

Pin control uses two components:
1. A pin definition file (`<board>-pinctrl.dtsi`) grouping pins for drivers.
2. Driver/bus node assignments applying those groups to peripherals.

### nRF52840 — SPI Example

```devicetree
/* <board>-pinctrl.dtsi */
&pinctrl {
    spi0_default: spi0_default {
        group1 {
            psels = <NRF_PSEL(SPIM_SCK,  0, 1)>,
                    <NRF_PSEL(SPIM_MOSI, 0, 2)>,
                    <NRF_PSEL(SPIM_MISO, 0, 3)>;
        };
    };
    spi0_sleep: spi0_sleep {
        group1 {
            psels = <NRF_PSEL(SPIM_SCK,  0, 1)>,
                    <NRF_PSEL(SPIM_MOSI, 0, 2)>,
                    <NRF_PSEL(SPIM_MISO, 0, 3)>;
            low-power-enable;
        };
    };
};

/* .dts or .overlay */
&spi0 {
    compatible = "nordic,nrf-spim";
    pinctrl-0 = <&spi0_default>;
    pinctrl-1 = <&spi0_sleep>;
    pinctrl-names = "default", "sleep";
};
```

### RP2040 — SPI Example

```devicetree
#include <dt-bindings/pinctrl/rpi-pico-rp2040-pinctrl.h>

&pinctrl {
    spi0_default: spi0_default {
        group1 {
            pinmux = <SPI0_SCK_P18>, <SPI0_TX_P19>;
        };
        group2 {
            pinmux = <SPI0_RX_P16>;
            input-enable;
        };
    };
};

&spi0 {
    pinctrl-0 = <&spi0_default>;
    pinctrl-names = "default";
};
```

### nRF52840 — I2C Example

```devicetree
&i2c0 {
    compatible = "nordic,nrf-twim";
    status = "okay";
    pinctrl-0 = <&i2c0_default>;
    pinctrl-1 = <&i2c0_sleep>;
    pinctrl-names = "default", "sleep";
    clock-frequency = <I2C_BITRATE_FAST>;
};
```

## Options / Props

### nRF52840 Pin Properties

| Property | Description |
|----------|-------------|
| `bias-disable` | Disable pull resistor |
| `bias-pull-up` | Enable pull-up |
| `bias-pull-down` | Enable pull-down |
| `low-power-enable` | Enable low-power mode (sleep state) |

### RP2040 Pin Properties

| Property | Description |
|----------|-------------|
| `bias-disable` / `bias-pull-up` / `bias-pull-down` | Pull resistor control |
| `input-enable` | Enable input buffer |
| `input-schmitt-enable` | Enable Schmitt trigger on input |
| `drive-strength` | Output drive: 2, 4, 8, or 12 mA |
| `slew-rate` | `0` = slow, `1` = fast |

### Standard Interconnect Labels

| Shield Type | I2C | SPI | UART |
|-------------|-----|-----|------|
| Arduino Uno Rev3 | `&arduino_i2c` | `&arduino_spi` | `&arduino_serial` |
| BlackPill | `&blackpill_i2c` | `&blackpill_spi` | `&blackpill_serial` |
| Pro Micro | `&pro_micro_i2c` | `&pro_micro_spi` | `&pro_micro_serial` |
| Seeed XIAO | `&xiao_i2c` | `&xiao_spi` | `&xiao_serial` |

## Notes

- Shields that need pin control create a `boards/` subdirectory with `<board>.overlay` files per supported MCU board.
- nRF52840: avoid low-frequency pins for I2C, UART, and SPI — frequencies above 10 kHz can cause BLE antenna interference.
- RP2040: pins must be on the correct bus (SPI0/SPI1, I2C0/I2C1, UART0/UART1) and fulfill all required functions.
- RP2040: for wired split UART with async DMA, override with `compatible = "nordic,nrf-uarte"`.
- RP2040 PIO can emulate SPI; Zephyr does not currently support PIO-based I2C.
- Always set `status = "okay"` to enable peripheral nodes.
- SPI child device nodes require `compatible`, `reg`, and `spi-max-frequency` properties.

## Related

- [New Board](./new-board.md)
- [Shift Registers](./shift-registers.md)
- [Pointing Devices](./pointing.md)
- [Lighting — Backlight](./lighting/backlight.md)
