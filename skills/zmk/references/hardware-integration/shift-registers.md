# Shift Registers

Expands GPIO pin count for keyboards with more keys than available MCU pins, using SIPO 74HC595 shift registers via SPI.

## Signature / Usage

### Step 1: Enable SPI (`<device>.defconfig`)

```kconfig
config SPI
    default y
```

### Step 2: Shift Register SPI Device Node

```devicetree
&xiao_spi {
    status = "okay";
    cs-gpios = <&xiao_d 9 GPIO_ACTIVE_LOW>;

    shifter: 595@0 {
        compatible = "zmk,gpio-595";
        status = "okay";
        gpio-controller;
        spi-max-frequency = <200000>;
        reg = <0>;
        #gpio-cells = <2>;
        ngpios = <8>;
    };
};
```

### Step 3: Kscan Using Shift Register Pins

```devicetree
kscan0: kscan_0 {
    compatible = "zmk,kscan-gpio-matrix";
    diode-direction = "col2row";
    col-gpios
        = <&shifter 7 GPIO_ACTIVE_HIGH>
        , <&shifter 6 GPIO_ACTIVE_HIGH>
        , <&shifter 5 GPIO_ACTIVE_HIGH>
        ;
};
```

## Options / Props

### `zmk,gpio-595` Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `compatible` | string | `"zmk,gpio-595"` |
| `gpio-controller` | - | Marks node as GPIO controller |
| `spi-max-frequency` | int | SPI clock frequency in Hz |
| `reg` | int | CS-GPIO pin index (matches `@N` in node name) |
| `#gpio-cells` | int | Must be `<2>` |
| `ngpios` | int | Total GPIO count: `8`, `16`, `24`, or `32` |

## Notes

- MCU inputs should remain connected directly to MCU pins — shift registers should only be used for outputs (matrix columns). Using them for inputs requires PISO models and degrades battery efficiency.
- Data and clock pins must be high-frequency / SPI-capable. On RP2040, they must share the same SPI bus. On nRF52840, this is optional but recommended.
- Up to four shift registers can be daisy-chained (`ngpios = <32>` for four).
- Increase `spi-max-frequency` for daisy-chained registers to prevent missed keypresses.
- Matrix reorganization (e.g. 9×5 → 16×3) can maximize the benefit of shift registers.
- Multiple SPI devices may share the same bus.

## Related

- [New Shield](./new-shield.md)
- [Pinctrl](./pinctrl.md)
