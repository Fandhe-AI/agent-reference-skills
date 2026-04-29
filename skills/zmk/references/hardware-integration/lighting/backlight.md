# Backlight

PWM-controlled single-color LED lighting for keyboards, configurable on both boards and shields.

## Signature / Usage

### Kconfig (`Kconfig.defconfig`)

```kconfig
if ZMK_BACKLIGHT
config PWM
    default y
config LED_PWM
    default y
endif # ZMK_BACKLIGHT
```

### Pin Control (nRF52 — `<board>-pinctrl.dtsi`)

For P1.13 (port 1, pin 13):

```devicetree
&pinctrl {
    pwm0_default: pwm0_default {
        group1 {
            psels = <NRF_PSEL(PWM_OUT0, 1, 13)>;
        };
    };
    pwm0_sleep: pwm0_sleep {
        group1 {
            psels = <NRF_PSEL(PWM_OUT0, 1, 13)>;
            low-power-enable;
        };
    };
};
```

### Devicetree (`.dts` or `.overlay`)

```devicetree
&pwm0 {
    status = "okay";
    pinctrl-0 = <&pwm0_default>;
    pinctrl-1 = <&pwm0_sleep>;
    pinctrl-names = "default", "sleep";
};

/ {
    backlight: pwmleds {
        compatible = "pwm-leds";
        pwm_led_0 {
            pwms = <&pwm0 0 PWM_MSEC(10) PWM_POLARITY_NORMAL>;
        };
    };

    chosen {
        zmk,backlight = &backlight;
    };
};
```

## Options / Props

### `pwm-leds` Child Node (`pwm_led_X`) Properties

| Property | Description |
|----------|-------------|
| `pwms` | `<&pwmN channel period polarity>` |
| `PWM_MSEC(10)` | PWM period; adjust for drive circuitry |
| `PWM_POLARITY_NORMAL` | N-channel MOSFET |
| `PWM_POLARITY_INVERTED` | P-channel MOSFET |

### nRF52 Pin Syntax

`NRF_PSEL(PWM_OUTX, Y, Z)` where X = PWM channel, Y = GPIO port, Z = pin number.

## Notes

- For multiple backlight LEDs, configure multiple PWM channels in pinctrl and add separate `pwm_led_X` nodes.
- Shield implementations require a `boards/` subdirectory with `<board>.defconfig` and `<board>.overlay` files.
- Pinctrl syntax and PWM peripheral names vary by MCU — consult Zephyr bindings for your SoC.

## Related

- [Lighting Overview](./overview.md)
- [Pinctrl](../pinctrl.md)
- [LED Indicators](./led-indicators.md)
